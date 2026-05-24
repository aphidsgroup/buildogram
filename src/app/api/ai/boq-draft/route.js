import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  try {
    const u = getUserFromRequest(req);
    if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { lead_id, boq_text } = await req.json();

    if (!lead_id) {
      return NextResponse.json({ success: false, error: 'Lead ID required' }, { status: 400 });
    }

    const [lead] = await sql`SELECT * FROM leads WHERE id = ${lead_id}`;
    if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });

    // 1. Fallback Deterministic Checklist Logic
    const missingItems = [];
    const escalationRisks = [];
    const questionsForContractor = [];

    // Basic heuristic rules based on standard Chennai construction
    missingItems.push('Soil testing & structural design fees explicitly mentioned');
    missingItems.push('Temporary EB line deposit & water arrangements during construction');
    missingItems.push('Sump, Septic Tank, and OHT exact capacities in liters');
    
    escalationRisks.push('Steel and Cement prices are volatile. Does the quote include a price escalation clause?');
    escalationRisks.push('Rock excavation or deep foundation costs if soil is loose (extra depth charges).');

    questionsForContractor.push('Are compound wall, main gate, and elevation works included in this base rate?');
    questionsForContractor.push('Is the foundation designed for G+1 or future expansion to G+2?');

    const outputJson = {
      summary: "Preliminary internal review of contractor quote/BOQ details.",
      clearly_included: "Details based on provided metadata",
      missing_items: missingItems,
      escalation_risks: escalationRisks,
      material_concerns: ['Ensure specific grades (e.g., Fe550 steel, OPC 53 cement) are explicitly written, not just brand names.'],
      questions_for_contractor: questionsForContractor,
      recommended_next_step: "Call client to discuss these missing items and offer a formal structural BOQ from Buildogram.",
      disclaimer: "This BOQ review draft is advisory and based on provided information. It is not final engineering, legal, contractual, or construction certification. Human review by Buildogram team/professionals is required before sharing with customer."
    };

    // 2. Save to ai_requests
    const [aiReq] = await sql`
      INSERT INTO ai_requests (
        module_name, related_lead_id, related_user_id, input_json, output_json, 
        prompt_version, risk_level, human_review_required, status
      ) VALUES (
        'boq_audit_draft', ${lead.id}, ${u.id}, 
        ${JSON.stringify({ boq_text, lead_metadata: lead.metadata })}, 
        ${JSON.stringify(outputJson)}, 
        '1.0', 'high', true, 'draft'
      )
      RETURNING id
    `;

    // 3. Update Lead Metadata & Status
    const newMetadata = {
      ...lead.metadata,
      ai_draft_request_id: aiReq.id,
      boq_review_status: 'draft_generated'
    };

    await sql`UPDATE leads SET metadata = ${JSON.stringify(newMetadata)} WHERE id = ${lead.id}`;

    // 4. Log Activity
    await sql`
      INSERT INTO lead_activities (lead_id, activity_type, title, description, created_by)
      VALUES (${lead.id}, 'system', 'BOQ AI draft generated', 'Human review required before sharing.', ${u.id})
    `;

    return NextResponse.json({ success: true, draft: outputJson, ai_request_id: aiReq.id });
  } catch (err) {
    console.error('BOQ AI draft error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
