import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { generateCompletion } from '@/lib/ai';

export async function POST(req) {
  try {
    const user = getUserFromRequest(req);
    if (!user || !['ops_admin', 'ops_pm'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { leadId, details } = await req.json();
    if (!leadId) return NextResponse.json({ error: 'Lead ID required' }, { status: 400 });

    const systemPrompt = `You are a highly experienced Lead Architect and Construction Consultant for Buildogram. 
Your task is to review the following project details and architectural plan constraints, and provide an advisory review.

IMPORTANT DIRECTIVES:
- Do NOT make structural engineering claims.
- Do NOT make government approval claims.
- Phrase suggestions as "observations" or "recommendations to discuss with your architect."
- Focus on space optimization, natural lighting, practicality, and cost impact.

Output EXACTLY as valid JSON matching this schema:
{
  "summary": "String",
  "strengths": ["String"],
  "practical_concerns": ["String"],
  "space_usage_observations": ["String"],
  "cost_impact_areas": ["String"],
  "ventilation_lighting_observations": ["String"],
  "parking_access_observations": ["String"],
  "rental_resale_suitability": "String",
  "questions_for_architect": ["String"],
  "buildogram_recommendation": "String",
  "next_step": "String",
  "confidence_level": "High|Medium|Low"
}`;

    const userPrompt = `Review these plan constraints:
Project Type: ${details.project_type || 'Unknown'}
Intended Use: ${details.intended_use || 'Unknown'}
Plot Size: ${details.plot_size || 'Unknown'}
Built-up Area: ${details.built_up_area || 'Unknown'}
Floors: ${details.floors || 'Unknown'}
Main Concern: ${details.main_concern || 'Unknown'}
Client Questions: ${details.message || 'None'}`;

    let parsed = null;
    let fallbackUsed = false;
    let providerUsed = process.env.AI_PROVIDER || 'fallback';

    try {
      if (process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY) {
        const textRes = await generateCompletion(systemPrompt, userPrompt);
        parsed = JSON.parse(textRes);
      } else {
        throw new Error('No AI provider configured, using fallback.');
      }
    } catch (e) {
      console.warn('AI failed or not configured, using deterministic fallback:', e.message);
      fallbackUsed = true;
      providerUsed = 'deterministic_fallback';
      parsed = {
        summary: `Deterministic review based on ${details.project_type} constraints.`,
        strengths: ["Standard lot utilization", "Clear intended use"],
        practical_concerns: ["Ensure local setbacks are met", "Verify structural load paths"],
        space_usage_observations: ["Optimize corridor space to maximize usable room area."],
        cost_impact_areas: ["Multi-story foundations", "Premium facade finishes"],
        ventilation_lighting_observations: ["Ensure minimum 15% window-to-floor area ratio."],
        parking_access_observations: ["Verify turning radius for typical vehicles."],
        rental_resale_suitability: "Highly dependent on local market demand for this layout.",
        questions_for_architect: ["What is the specific structural system proposed?", "How are plumbing stacks aligned?"],
        buildogram_recommendation: "Review the attached comments and consult your registered architect.",
        next_step: "Schedule a plan review meeting.",
        confidence_level: "Medium"
      };
    }

    // Add required metadata
    parsed.disclaimer = "This plan review is advisory and based on the information provided. It is not structural approval, architectural certification, legal approval, or government approval. Final decisions should be reviewed by qualified architects, structural engineers, and relevant approval authorities.";
    parsed.provider_used = providerUsed;
    parsed.fallback_used = fallbackUsed;

    // Log the AI request
    await sql`
      INSERT INTO ai_requests (
        module_name, risk_level, human_review_required, status, request_payload, response_payload, created_by
      ) VALUES (
        'plan_review_draft', 'high', true, 'draft', ${JSON.stringify({ leadId, details })}, ${JSON.stringify(parsed)}, ${user.id}
      )
    `;

    // Save draft back to lead metadata
    await sql`
      UPDATE leads 
      SET metadata = coalesce(metadata, '{}'::jsonb) || jsonb_build_object('ai_plan_draft', ${JSON.stringify(parsed)}::jsonb)
      WHERE id = ${leadId}
    `;

    return NextResponse.json({ success: true, draft: parsed });
  } catch (error) {
    console.error('Plan Review Draft API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
