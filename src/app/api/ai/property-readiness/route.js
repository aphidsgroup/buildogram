import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { generateRentalReadiness, generateResaleReadiness } from '@/lib/ai';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const input = await req.json();
    const type = input.readiness_type || 'rental'; // 'rental' or 'resale'

    let result;
    if (type === 'resale') {
      result = await generateResaleReadiness(input);
    } else {
      result = await generateRentalReadiness(input);
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    await sql`
      INSERT INTO ai_requests (
        user_id, prompt_type, input_payload, output_payload, 
        provider_used, model_used, is_successful, needs_human_review, risk_level
      ) VALUES (
        ${u.id}, ${'property_' + type + '_readiness'}, ${JSON.stringify(input)}, ${JSON.stringify(result.data)}, 
        ${result.provider_used}, ${result.model_used}, true, true, 'Low'
      )
    `;

    return NextResponse.json({ success: true, advice: result.data });
  } catch (error) {
    console.error('Property Readiness API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
