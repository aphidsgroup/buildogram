import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { slug } = await params;
  if (!slug) return fail('Slug required', 400);

  try {
    const [partner] = await sql`
      SELECT * FROM partners
      WHERE slug = ${slug} AND approval_status = 'Approved' AND active = true
      LIMIT 1
    `;

    if (!partner) {
      return NextResponse.json({ success: false, message: 'Partner not found' }, { status: 404 });
    }

    // Fetch related data
    const [gallery, videos, portfolio] = await Promise.all([
      sql`SELECT id, url, alt, caption FROM partner_gallery WHERE partner_id = ${partner.id} ORDER BY sort_order ASC, created_at ASC`,
      sql`SELECT id, title, url, video_type FROM partner_videos WHERE partner_id = ${partner.id} ORDER BY sort_order ASC, created_at ASC`,
      sql`SELECT id, title, location, description, image_url, video_url, completion_year FROM partner_portfolio WHERE partner_id = ${partner.id} ORDER BY completion_year DESC NULLS LAST, created_at DESC`,
    ]);

    const result = {
      id: partner.id,
      slug: partner.slug,
      companyName: partner.company_name,
      category: partner.category,
      shortDescription: partner.short_description,
      fullDescription: partner.full_description,
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
      services: partner.services || [],
      specializations: partner.specializations || [],
      certifications: partner.certifications || [],
      brands: partner.brands_handled || [],
      projectTypes: partner.project_types || [],
      isFeatured: partner.featured,
      isActive: partner.active,
      galleryImages: gallery,
      videoGallery: videos,
      portfolio: portfolio,
    };

    return ok({ partner: result });
  } catch (e) {
    console.error('[GET /api/partners/[slug]]', e.message);
    return NextResponse.json({ success: false, message: 'Database unavailable' }, { status: 503 });
  }
}
