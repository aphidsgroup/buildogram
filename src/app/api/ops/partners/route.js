import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireOps, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// ── GET all partners (ops view — includes all statuses) ───────────────────
export async function GET(request) {
  const { user, error } = requireOps(request);
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let partners;
    if (category && status) {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.category = ${category} AND p.approval_status = ${status}
        ORDER BY p.created_at DESC
      `;
    } else if (category) {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.category = ${category}
        ORDER BY p.created_at DESC
      `;
    } else if (status) {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.approval_status = ${status}
        ORDER BY p.created_at DESC
      `;
    } else if (search) {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.company_name ILIKE ${'%' + search + '%'}
           OR p.slug ILIKE ${'%' + search + '%'}
           OR p.contact_person ILIKE ${'%' + search + '%'}
        ORDER BY p.created_at DESC
      `;
    } else {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        ORDER BY p.created_at DESC
      `;
    }

    const mapped = partners.map(p => ({
      id: p.id,
      slug: p.slug,
      companyName: p.company_name,
      category: p.category,
      shortDescription: p.short_description,
      logoUrl: p.logo_url,
      coverUrl: p.cover_url,
      location: p.location,
      serviceAreas: p.service_areas,
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
      approvalStatus: p.approval_status,
      isActive: p.active,
      isFeatured: p.featured,
      profileCompletion: p.profile_completion || 0,
      enquiryCount: p.enquiry_count || 0,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }));

    return ok({ partners: mapped });
  } catch (e) {
    console.error('[GET /api/ops/partners]', e.message);
    return NextResponse.json({ success: false, message: 'Database error: ' + e.message }, { status: 500 });
  }
}

// ── POST create partner ───────────────────────────────────────────────────
export async function POST(request) {
  const { user, error } = requireOps(request);
  if (error) return error;

  try {
    const b = await request.json();

    // Validation
    if (!b.slug || !b.companyName || !b.category) {
      return fail('slug, companyName, and category are required');
    }
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(b.slug)) return fail('Slug must be lowercase letters, numbers, and hyphens only');

    // Unique slug check
    const existing = await sql`SELECT id FROM partners WHERE slug = ${b.slug}`;
    if (existing.length > 0) return fail('A partner with this slug already exists');

    const VALID_CATEGORIES = ['Builder', 'Architect', 'Interior Designer', 'Material Supplier', 'Home Automation', 'Solar', 'Elevators', 'Waterproofing'];
    if (!VALID_CATEGORIES.includes(b.category)) return fail('Invalid category');

    const [partner] = await sql`
      INSERT INTO partners (
        slug, company_name, category, short_description, full_description,
        logo_url, cover_url, location, service_areas, years_experience,
        contact_person, phone, email, whatsapp, website,
        services, specializations, certifications, brands_handled, project_types,
        approval_status, active, featured
      ) VALUES (
        ${b.slug}, ${b.companyName}, ${b.category},
        ${b.shortDescription || null}, ${b.fullDescription || null},
        ${b.logoUrl || null}, ${b.coverUrl || null},
        ${b.location || null}, ${b.serviceAreas || null},
        ${b.yearsExperience ? parseInt(b.yearsExperience) : null},
        ${b.contactPerson || null}, ${b.phone || null}, ${b.email || null},
        ${b.whatsapp || null}, ${b.website || null},
        ${b.services || []}, ${b.specializations || []},
        ${b.certifications || []}, ${b.brands || []}, ${b.projectTypes || []},
        ${b.approvalStatus || 'Pending Review'},
        ${b.isActive === true || false}, ${b.isFeatured === true || false}
      )
      RETURNING *
    `;

    return ok({ partner: { id: partner.id, slug: partner.slug, companyName: partner.company_name } }, 201);
  } catch (e) {
    console.error('[POST /api/ops/partners]', e.message);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
