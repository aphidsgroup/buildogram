import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

/* â”€â”€â”€ GET â€” List all properties with filters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const passportStatus = searchParams.get('passport_status');
  const listingType    = searchParams.get('listing_type');
  const city           = searchParams.get('city');
  const search         = searchParams.get('search');

  try {
    let properties;

    if (passportStatus || listingType || city || search) {
      properties = await sql`
        SELECT p.*, u.name AS assigned_name
        FROM properties p
        LEFT JOIN users u ON u.id = p.assigned_to
        WHERE
          (${passportStatus}::text IS NULL OR p.passport_status = ${passportStatus})
          AND (${listingType}::text IS NULL OR p.listing_type = ${listingType})
          AND (${city}::text IS NULL OR p.city ILIKE ${'%' + (city || '') + '%'})
          AND (
            ${search}::text IS NULL
            OR p.owner_name ILIKE ${'%' + (search || '') + '%'}
            OR p.owner_phone ILIKE ${'%' + (search || '') + '%'}
            OR p.title ILIKE ${'%' + (search || '') + '%'}
          )
        ORDER BY p.created_at DESC
      `;
    } else {
      properties = await sql`
        SELECT p.*, u.name AS assigned_name
        FROM properties p
        LEFT JOIN users u ON u.id = p.assigned_to
        ORDER BY p.created_at DESC
      `;
    }

    return NextResponse.json({ success: true, properties });
  } catch (e) {
    console.error('[properties GET]', e.message);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/* â”€â”€â”€ POST â€” Create new property record â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const b = await req.json();
    if (!b.title || !b.owner_name || !b.owner_phone) {
      return NextResponse.json({ success: false, error: 'title, owner_name, owner_phone are required' }, { status: 400 });
    }

    // Calculate completeness score based on boolean flags
    const flags = [
      'has_legal_docs', 'has_drawings', 'has_boq',
      'has_materials', 'has_quality_checks', 'has_progress_media',
      'has_warranty', 'has_maintenance_history',
    ];
    const completeness = Math.round(
      (flags.filter(f => b[f]).length / flags.length) * 100
    );

    const [property] = await sql`
      INSERT INTO properties (
        title, property_type, owner_name, owner_phone, owner_email,
        address, locality, city, pincode,
        plot_area_sqft, built_up_area_sqft, floors, bedrooms, bathrooms, facing,
        project_id, spec_level, construction_year, handover_date,
        passport_status, passport_completeness,
        has_legal_docs, has_drawings, has_boq,
        has_materials, has_quality_checks, has_progress_media,
        has_warranty, has_maintenance_history,
        listing_type, listing_status, listing_price, listing_rent_monthly,
        cover_image_url, assigned_to, notes, tags
      ) VALUES (
        ${b.title}, ${b.property_type || 'home'}, ${b.owner_name}, ${b.owner_phone}, ${b.owner_email || null},
        ${b.address || null}, ${b.locality || null}, ${b.city || 'Chennai'}, ${b.pincode || null},
        ${b.plot_area_sqft || null}, ${b.built_up_area_sqft || null}, ${b.floors || null},
        ${b.bedrooms || null}, ${b.bathrooms || null}, ${b.facing || null},
        ${b.project_id || null}, ${b.spec_level || null},
        ${b.construction_year || null}, ${b.handover_date || null},
        ${b.passport_status || 'pending'}, ${completeness},
        ${!!b.has_legal_docs}, ${!!b.has_drawings}, ${!!b.has_boq},
        ${!!b.has_materials}, ${!!b.has_quality_checks}, ${!!b.has_progress_media},
        ${!!b.has_warranty}, ${!!b.has_maintenance_history},
        ${b.listing_type || 'none'}, ${b.listing_status || 'unlisted'},
        ${b.listing_price || null}, ${b.listing_rent_monthly || null},
        ${b.cover_image_url || null}, ${b.assigned_to || null}, ${b.notes || null},
        ${b.tags || []}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, property });
  } catch (e) {
    console.error('[properties POST]', e.message);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
