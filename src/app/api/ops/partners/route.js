import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// ── GET all partners (ops view — includes all statuses) ───────────────────
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where = {};
    if (category && category !== 'All') where.partner_type = category;
    if (status && status !== 'All') where.verification_status = status;
    if (search) {
      where.OR = [
        { company_name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { contact_person: { contains: search, mode: 'insensitive' } }
      ];
    }

    const partners = await prisma.partners.findMany({
      where,
      include: {
        _count: {
          select: { partner_lead_assignments: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    const mapped = partners.map(p => ({
      id: p.id,
      slug: p.slug,
      companyName: p.company_name,
      category: p.partner_type,
      shortDescription: p.short_description,
      logoUrl: p.logo_url,
      coverUrl: p.cover_url,
      location: p.location,
      serviceAreas: p.service_areas?.join(', ') || '',
      yearsExperience: p.years_experience,
      contactPerson: p.contact_person,
      phone: p.phone,
      email: p.email,
      whatsapp: p.whatsapp,
      website: p.website,
      services: p.services || [],
      specializations: p.specializations || [],
      certifications: p.certifications || [],
      brands: p.brands_handled || [],
      projectTypes: p.project_types || [],
      approvalStatus: p.verification_status,
      isActive: p.public_profile_enabled,
      isFeatured: p.featured,
      profileCompletion: p.profile_completion || 0,
      enquiryCount: p._count.partner_lead_assignments || 0,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));

    return NextResponse.json({ success: true, partners: mapped });
  } catch (e) {
    console.error('[GET /api/ops/partners]', e.message);
    return NextResponse.json({ success: false, message: 'Database error: ' + e.message }, { status: 500 });
  }
}

// ── POST create partner ───────────────────────────────────────────────────
export async function POST(request) {
  await requirePermission('manage_partners');
  try {
    const b = await request.json();

    // Validation
    if (!b.slug || !b.companyName || !b.category) {
      return NextResponse.json({ success: false, message: 'slug, companyName, and category are required' }, { status: 400 });
    }
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(b.slug)) return NextResponse.json({ success: false, message: 'Slug must be lowercase letters, numbers, and hyphens only' }, { status: 400 });

    const existing = await prisma.partners.findUnique({ where: { slug: b.slug } });
    if (existing) return NextResponse.json({ success: false, message: 'A partner with this slug already exists' }, { status: 400 });

    const partner = await prisma.partners.create({
      data: {
        slug: b.slug,
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
        public_profile_enabled: b.isActive === true || false,
        featured: b.isFeatured === true || false
      }
    });

    return NextResponse.json({ success: true, partner: { id: partner.id, slug: partner.slug, companyName: partner.company_name } }, { status: 201 });
  } catch (e) {
    console.error('[POST /api/ops/partners]', e.message);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

