import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// â”€â”€ GET single partner (ops detail) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function GET(request, { params }) {
  try {
    const partner = await prisma.partners.findUnique({
      where: { id: (await params).id },
      include: {
        partner_gallery: { orderBy: { sort_order: 'asc' } },
        partner_videos: { orderBy: { sort_order: 'asc' } },
        partner_portfolio: { orderBy: { completion_year: 'desc' } },
        partner_documents: true,
        partner_lead_assignments: {
          take: 20,
          orderBy: { created_at: 'desc' },
          include: {
            lead: true, // Need polymorphic relation resolver or just fetch basic info if possible
          }
        }
      }
    });

    if (!partner) return NextResponse.json({ success: false, message: 'Partner not found' }, { status: 404 });

    return NextResponse.json({ success: true, partner });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// â”€â”€ PUT update partner (full update) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function PUT(request, { params }) {
  await requirePermission('manage_partners');
  try {
    const b = await request.json();
    if (!b.companyName || !b.category) return NextResponse.json({ success: false, message: 'companyName and category required' }, { status: 400 });

    const updated = await prisma.partners.update({
      where: { id: (await params).id },
      data: {
        company_name: b.companyName,
        partner_type: b.category,
        short_description: b.shortDescription || null,
        full_description: b.fullDescription || null,
        logo_url: b.logoUrl || null,
        cover_url: b.coverUrl || null,
        location: b.location || null,
        service_areas: b.serviceAreas ? b.serviceAreas.split(',').map(s => s.trim()) : [],
        years_experience: b.yearsExperience ? parseInt(b.yearsExperience) : null,
        contact_person: b.contactPerson || null,
        phone: b.phone || null,
        email: b.email || null,
        whatsapp: b.whatsapp || null,
        website: b.website || null,
        services: b.services || [],
        specializations: b.specializations || [],
        certifications: b.certifications || [],
        brands_handled: b.brands || [],
        project_types: b.projectTypes || [],
        verification_status: b.approvalStatus || 'pending_review',
        public_profile_enabled: b.isActive === true,
        featured: b.isFeatured === true,
      }
    });

    return NextResponse.json({ success: true, partner: updated });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// â”€â”€ DELETE soft-delete (deactivate) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function DELETE(request, { params }) {
  await requirePermission('manage_partners');
  try {
    await prisma.partners.update({
      where: { id: (await params).id },
      data: {
        public_profile_enabled: false,
        verification_status: 'suspended'
      }
    });
    return NextResponse.json({ success: true, message: 'Partner deactivated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
