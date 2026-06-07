import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const where = {};
    if (category) {
      where.category = category;
    }

    const proofAssets = await prisma.proof_assets.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(proofAssets);
  } catch (error) {
    console.error('Error fetching proof assets:', error);
    return NextResponse.json({ error: 'Failed to fetch proof assets' }, { status: 500 });
  }
}

export async function POST(request) {
  await requirePermission('manage_content');
  try {
    const body = await request.json();
    const {
      slug, title, category, area, description, before_after_notes, 
      methods_used, materials_used, media, privacy_status,
      approved_for_website, approved_for_gbp, approved_for_social,
      linked_case_study_id, linked_partner_id, linked_service_url, seo_metadata
    } = body;

    const newProof = await prisma.proof_assets.create({
      data: {
        slug, title, category, area, description, before_after_notes, 
        methods_used, materials_used, media, privacy_status,
        approved_for_website, approved_for_gbp, approved_for_social,
        linked_case_study_id, linked_partner_id, linked_service_url, seo_metadata
      }
    });

    return NextResponse.json(newProof);
  } catch (error) {
    console.error('Error creating proof asset:', error);
    return NextResponse.json({ error: 'Failed to create proof asset' }, { status: 500 });
  }
}
