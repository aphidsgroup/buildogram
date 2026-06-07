import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let where = {};
    if (status) {
      where.status = status;
    }

    const caseStudies = await prisma.case_studies.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ success: true, caseStudies });
  } catch (error) {
    console.error('[Case Studies GET Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await req.json();
    
    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const newCaseStudy = await prisma.case_studies.create({
      data: {
        slug: data.slug,
        title: data.title,
        category: data.category,
        location_area: data.location_area,
        property_type: data.property_type,
        scope_of_work: data.scope_of_work,
        starting_problem: data.starting_problem,
        process: data.process,
        tools_used: data.tools_used || [],
        materials_used: data.materials_used || [],
        observations: data.observations,
        proof_records: data.proof_records || [],
        outcome: data.outcome,
        timeline: data.timeline,
        related_services: data.related_services || [],
        status: data.status || 'draft',
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        property_passport_id: data.property_passport_id,
        media: data.media || []
      }
    });

    return NextResponse.json({ success: true, caseStudy: newCaseStudy });
  } catch (error) {
    console.error('[Case Studies POST Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
