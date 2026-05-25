import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// GET — partner fetches own profile
export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;

  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) {
      return ok({ profile: null, message: 'No partner profile linked to this account.' });
    }

    const [partner] = await sql`SELECT * FROM partners WHERE id = ${u.partner_id} LIMIT 1`;
    if (!partner) return ok({ profile: null });

    const [gallery, videos, portfolio] = await Promise.all([
      sql`SELECT id, url, alt, caption FROM partner_gallery WHERE partner_id = ${partner.id} ORDER BY sort_order, created_at`,
      sql`SELECT id, title, url, video_type FROM partner_videos WHERE partner_id = ${partner.id} ORDER BY sort_order, created_at`,
      sql`SELECT id, title, location, description, image_url, video_url, completion_year FROM partner_portfolio WHERE partner_id = ${partner.id} ORDER BY completion_year DESC NULLS LAST`,
    ]);

    return ok({
      profile: {
        id: partner.id,
        slug: partner.slug,
        companyName: partner.company_name,
        category: partner.category,
        description: partner.full_description,
        shortDescription: partner.short_description,
        logoUrl: partner.logo_url,
        coverUrl: partner.cover_url,
        location: partner.location,
        serviceAreas: partner.service_areas,
        yearsExperience: partner.years_experience,
        contactPerson: partner.contact_person,
        phone: partner.phone,
        email: partner.email,
        whatsapp: partner.whatsapp,
        website: partner.website,
        services: (partner.services || []).join(', '),
        certifications: (partner.certifications || []).join(', '),
        brands: (partner.brands_handled || []).join(', '),
        specializations: (partner.specializations || []).join(', '),
        approvalStatus: partner.approval_status,
        isActive: partner.active,
        isFeatured: partner.featured,
        partnerSlug: partner.slug,
        galleryImages: gallery,
        videoGallery: videos,
        portfolio: portfolio,
      }
    });
  } catch (e) {
    console.error('[GET /api/partner/profile]', e.message);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// PUT — partner updates own profile (safe fields only)
export async function PUT(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;

  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile linked to this account', 404);

    const b = await request.json();

    // Safe fields only — partner cannot change approvalStatus, active, featured
    const toArr = v => v ? String(v).split(',').map(s => s.trim()).filter(Boolean) : [];

    await sql`
      UPDATE partners SET
        company_name      = COALESCE(${b.companyName || null}, company_name),
        category          = COALESCE(${b.category || null}, category),
        short_description = ${b.shortDescription || b.description?.slice(0, 200) || null},
        full_description  = ${b.fullDescription || b.description || null},
        logo_url          = ${b.logoUrl || null},
        cover_url         = ${b.coverUrl || null},
        location          = ${b.location || null},
        service_areas     = ${b.serviceAreas || null},
        years_experience  = ${b.yearsExperience ? parseInt(b.yearsExperience) : null},
        contact_person    = ${b.contactPerson || null},
        phone             = ${b.phone || null},
        email             = ${b.email || null},
        whatsapp          = ${b.whatsapp || null},
        website           = ${b.website || null},
        services          = ${toArr(b.services)},
        certifications    = ${toArr(b.certifications)},
        brands_handled    = ${toArr(b.brands)},
        updated_at        = NOW()
      WHERE id = ${u.partner_id}
    `;

    return ok({ message: 'Profile updated successfully' });
  } catch (e) {
    console.error('[PUT /api/partner/profile]', e.message);
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// Keep backward-compatible POST alias
export async function POST(request) {
  return PUT(request);
}
