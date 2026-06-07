import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { evaluateFollowUpRules } from '@/lib/ai-tools/followUpRules';

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      toolName, 
      name, 
      phone, 
      email, 
      inputData, 
      outputData, 
      sourcePage,
      attribution 
    } = body;

    const enrichedRules = evaluateFollowUpRules(toolName, outputData || {});

    const submission = await prisma.ai_tool_submissions.create({
      data: {
        tool_name: toolName,
        name,
        phone,
        email,
        input_data: inputData || {},
        output_data: outputData || {},
        source_page: sourcePage,
        status: "submitted",
        // attribution
        first_landing_page: attribution?.first_landing_page || null,
        conversion_page: attribution?.conversion_page || sourcePage || null,
        referrer: attribution?.referrer || null,
        utm_source: attribution?.utm_source || null,
        utm_medium: attribution?.utm_medium || null,
        utm_campaign: attribution?.utm_campaign || null,
        utm_content: attribution?.utm_content || null,
        utm_term: attribution?.utm_term || null,
        gclid: attribution?.gclid || null,
        session_id: attribution?.session_id || null,
        device_type: attribution?.device_type || null,
        page_category: attribution?.page_category || null,
        attribution_json: attribution || {},
        // enriched follow-up rules
        ...enrichedRules
      }
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error('Error saving AI tool submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
