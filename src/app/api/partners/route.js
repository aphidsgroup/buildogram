import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let partners;
    if (category && featured) {
      partners = await sql`
        SELECT p.*, 
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.approval_status = 'Approved' AND p.active = true
          AND p.category = ${category} AND p.featured = true
        ORDER BY p.featured DESC, p.created_at DESC LIMIT 100
      `;
    } else if (category) {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.approval_status = 'Approved' AND p.active = true
          AND p.category = ${category}
        ORDER BY p.featured DESC, p.created_at DESC LIMIT 100
      `;
    } else {
      partners = await sql`
        SELECT p.*,
          COALESCE((SELECT COUNT(*)::int FROM partner_enquiries pe WHERE pe.partner_id = p.id), 0) as enquiry_count
        FROM partners p
        WHERE p.approval_status = 'Approved' AND p.active = true
        ORDER BY p.featured DESC, p.created_at DESC LIMIT 100
      `;
    }

    // Attach gallery (first 3 images per partner for card view)
    const partnerIds = partners.map(p => p.id);
    let gallery = [];
    if (partnerIds.length > 0) {
      gallery = await sql`
        SELECT id, partner_id, url, alt
        FROM partner_gallery
        WHERE partner_id = ANY(${partnerIds})
        ORDER BY sort_order ASC, created_at ASC
      `;
    }

    const galleryByPartner = {};
    gallery.forEach(img => {
      if (!galleryByPartner[img.partner_id]) galleryByPartner[img.partner_id] = [];
      galleryByPartner[img.partner_id].push(img);
    });

    const result = partners.map(p => ({
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
      services: p.services || [],
      isFeatured: p.featured,
      isActive: p.active,
      approvalStatus: p.approval_status,
      enquiryCount: p.enquiry_count || 0,
      galleryImages: (galleryByPartner[p.id] || []).slice(0, 3),
    }));

    return ok({ partners: result });
  } catch (e) {
    console.error('[GET /api/partners]', e.message);
    // Graceful DB unavailable
    return ok({ partners: [], message: 'Database unavailable — showing fallback data.' });
  }
}
