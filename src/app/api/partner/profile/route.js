import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const [profile] = await sql`
      SELECT *
      FROM leads
      WHERE lead_type = 'partner_application'
        AND metadata->>'partner_user_id' = ${u.id}
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    return NextResponse.json({ success: true, profile: profile || null });
  } catch (e) {
    console.error('[partner profile GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const b = await req.json();

    // 1. Fetch current profile to ensure it exists and belongs to user
    const [existing] = await sql`
      SELECT *
      FROM leads
      WHERE lead_type = 'partner_application'
        AND metadata->>'partner_user_id' = ${u.id}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (!existing) {
      return NextResponse.json({ success: false, error: 'No partner profile linked to this account.' }, { status: 404 });
    }

    // 2. Safe merge of only allowed fields
    const safeUpdates = {
      business_name: b.business_name,
      service_areas: b.service_areas,
      services_offered: b.services_offered,
      website_url: b.website_url,
      instagram_url: b.instagram_url,
      portfolio_links: b.portfolio_links,
      // Intentionally NOT allowing verification_status or public_status or partner_user_id to be updated here!
    };

    const newMetadata = { ...existing.metadata, ...safeUpdates };

    // 3. Update DB
    const [updated] = await sql`
      UPDATE leads
      SET metadata = ${newMetadata}::jsonb
      WHERE id = ${existing.id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, profile: updated });

  } catch (e) {
    console.error('[partner profile POST]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
