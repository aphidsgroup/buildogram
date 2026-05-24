import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { generateDelayPrediction } from '@/lib/ai';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const input = await req.json();
    const result = await generateDelayPrediction(input);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Delay probability often comes back as Low/Medium/High
    const riskLevel = result.data.delay_probability || 'Medium';

    await sql`
      INSERT INTO ai_requests (
        user_id, prompt_type, input_payload, output_payload, 
        provider_used, model_used, is_successful, needs_human_review, risk_level
      ) VALUES (
        ${u.id}, 'delay_prediction', ${JSON.stringify(input)}, ${JSON.stringify(result.data)}, 
        ${result.provider_used}, ${result.model_used}, true, true, ${riskLevel}
      )
    `;

    return NextResponse.json({ success: true, prediction: result.data });
  } catch (error) {
    console.error('Delay Prediction API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
