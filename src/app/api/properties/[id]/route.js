import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

/* ─── GET — Single property ───────────────────────────────── */
export async function GET(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const [property] = await sql`
      SELECT p.*, u.name AS assigned_name
      FROM properties p
      LEFT JOIN users u ON u.id = p.assigned_to
      WHERE p.id = ${params.id}
    `;
    if (!property) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, property });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

/* ─── PUT — Update property ──────────────────────────────── */
export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const b = await req.json();

    // Recompute completeness if any flag changed
    const flags = [
      'has_legal_docs', 'has_drawings', 'has_boq',
      'has_materials', 'has_quality_checks', 'has_progress_media',
      'has_warranty', 'has_maintenance_history',
    ];
    const anyFlagSent = flags.some(f => f in b);

    let completeness = null;
    if (anyFlagSent) {
      // Fetch current values, merge with update
      const [current] = await sql`SELECT * FROM properties WHERE id = ${params.id}`;
      const merged = { ...current, ...b };
      completeness = Math.round((flags.filter(f => merged[f]).length / flags.length) * 100);
    }

    const [updated] = await sql`
      UPDATE properties SET
        title               = COALESCE(${b.title ?? null}, title),
        property_type       = COALESCE(${b.property_type ?? null}, property_type),
        owner_name          = COALESCE(${b.owner_name ?? null}, owner_name),
        owner_phone         = COALESCE(${b.owner_phone ?? null}, owner_phone),
        owner_email         = COALESCE(${b.owner_email ?? null}, owner_email),
        owner_user_id       = COALESCE(${b.owner_user_id === null ? null : b.owner_user_id ?? null}, owner_user_id),
        address             = COALESCE(${b.address ?? null}, address),
        locality            = COALESCE(${b.locality ?? null}, locality),
        city                = COALESCE(${b.city ?? null}, city),
        passport_status     = COALESCE(${b.passport_status ?? null}, passport_status),
        passport_completeness = COALESCE(${completeness}, passport_completeness),
        has_legal_docs      = COALESCE(${b.has_legal_docs ?? null}, has_legal_docs),
        has_drawings        = COALESCE(${b.has_drawings ?? null}, has_drawings),
        has_boq             = COALESCE(${b.has_boq ?? null}, has_boq),
        has_materials       = COALESCE(${b.has_materials ?? null}, has_materials),
        has_quality_checks  = COALESCE(${b.has_quality_checks ?? null}, has_quality_checks),
        has_progress_media  = COALESCE(${b.has_progress_media ?? null}, has_progress_media),
        has_warranty        = COALESCE(${b.has_warranty ?? null}, has_warranty),
        has_maintenance_history = COALESCE(${b.has_maintenance_history ?? null}, has_maintenance_history),
        listing_type        = COALESCE(${b.listing_type ?? null}, listing_type),
        listing_status      = COALESCE(${b.listing_status ?? null}, listing_status),
        listing_price       = COALESCE(${b.listing_price ?? null}, listing_price),
        listing_rent_monthly= COALESCE(${b.listing_rent_monthly ?? null}, listing_rent_monthly),
        notes               = COALESCE(${b.notes ?? null}, notes),
        assigned_to         = COALESCE(${b.assigned_to ?? null}, assigned_to),
        passport_sections_data = COALESCE(${b.passport_sections_data ? JSON.stringify(b.passport_sections_data) : null}::jsonb, passport_sections_data),
        updated_at          = NOW()
      WHERE id = ${params.id}
      RETURNING *
    `;
    return NextResponse.json({ success: true, property: updated });
  } catch (e) {
    console.error('[properties PUT]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
