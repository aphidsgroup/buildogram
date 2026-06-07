import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const proof = await prisma.proof_assets.findUnique({
      where: { id }
    });
    if (!proof) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(proof);
  } catch (error) {
    console.error('Error fetching proof asset:', error);
    return NextResponse.json({ error: 'Failed to fetch proof asset' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await requirePermission('manage_content');
  try {
    const { id } = params;
    const body = await request.json();
    
    // Extract updateable fields
    const {
      slug, title, category, area, description, before_after_notes, 
      methods_used, materials_used, media, privacy_status,
      approved_for_website, approved_for_gbp, approved_for_social,
      linked_case_study_id, linked_partner_id, linked_service_url, seo_metadata
    } = body;

    const updated = await prisma.proof_assets.update({
      where: { id },
      data: {
        slug, title, category, area, description, before_after_notes, 
        methods_used, materials_used, media, privacy_status,
        approved_for_website, approved_for_gbp, approved_for_social,
        linked_case_study_id, linked_partner_id, linked_service_url, seo_metadata,
        updated_at: new Date()
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating proof asset:', error);
    return NextResponse.json({ error: 'Failed to update proof asset' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await requirePermission('manage_content');
  try {
    const { id } = params;
    await prisma.proof_assets.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting proof asset:', error);
    return NextResponse.json({ error: 'Failed to delete proof asset' }, { status: 500 });
  }
}
