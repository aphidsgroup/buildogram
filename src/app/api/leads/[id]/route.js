import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

/* ─── Helpers ─────────────────────────────────────────────── */

/**
 * Build a property title from lead data.
 * e.g. "2400 sqft G+1 Home — Porur, Chennai"
 */
function buildPropertyTitle(lead) {
  const parts = [];
  if (lead.plot_area_sqft) parts.push(`${lead.plot_area_sqft} sqft`);
  if (lead.floors) parts.push(lead.floors);
  const typeMap = {
    property_passport: 'Property',
    construction:      'Home',
    boq_audit:         'Property',
    plan_review:       'Property',
  };
  parts.push(typeMap[lead.lead_type] || 'Property');
  const location = [lead.locality, lead.city].filter(Boolean).join(', ');
  return parts.join(' ') + (location ? ` — ${location}` : '');
}

/**
 * Auto-create a property record from a won lead.
 * Returns the new property's id.
 */
async function autoCreateProperty(lead) {
  // Determine property type from lead metadata or lead_type
  const meta = lead.metadata || {};
  const propertyType = meta.property_type || 'home';
  const title = buildPropertyTitle(lead);

  const [property] = await sql`
    INSERT INTO properties (
      title, property_type,
      owner_name, owner_phone, owner_email,
      city, locality,
      plot_area_sqft, floors,
      spec_level,
      passport_status, passport_completeness,
      listing_type, listing_status, listing_price, listing_rent_monthly,
      notes
    ) VALUES (
      ${title},
      ${propertyType},
      ${lead.name},
      ${lead.phone},
      ${lead.email || null},
      ${lead.city || 'Chennai'},
      ${lead.locality || null},
      ${lead.plot_area_sqft || meta.property_size_sqft || null},
      ${lead.floors || null},
      ${lead.spec_level || null},
      'collecting',
      0,
      ${meta.listing_type || 'none'},
      ${meta.listing_type ? 'listed' : 'unlisted'},
      ${meta.listing_type === 'resale' ? meta.expected_price : null},
      ${meta.listing_type === 'rent' || meta.listing_type === 'lease' ? meta.expected_price : null},
      ${`Auto-created from lead #${lead.id} (${lead.lead_type}). Original message: ${lead.message || '—'}`}
    )
    RETURNING id, title
  `;
  return property;
}

/* ─── GET ─────────────────────────────────────────────────── */
export async function GET(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const { id } = await params;
  const [lead] = await sql`
    SELECT l.*,
           u.name  AS assigned_name,
           p.title AS property_title,
           p.passport_status AS property_passport_status,
           p.passport_completeness AS property_completeness
    FROM leads l
    LEFT JOIN users      u ON u.id = l.assigned_to
    LEFT JOIN properties p ON p.id = l.property_id
    WHERE l.id = ${id}
  `;
  if (!lead) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, lead });
}

/* ─── PUT ─────────────────────────────────────────────────── */
export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const { id } = await params;
  const b = await req.json();

  // Fetch current lead state
  const [lead] = await sql`SELECT * FROM leads WHERE id = ${id}`;
  if (!lead) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

  const isBeingWon = b.status === 'won' && lead.status !== 'won';

  /* ── Auto-create property on win ── */
  let autoCreatedProperty = null;

  const PASSPORT_TYPES = ['property_passport', 'construction', 'boq_audit', 'plan_review', 'property_listing'];

  if (isBeingWon && PASSPORT_TYPES.includes(lead.lead_type) && !lead.property_id) {
    try {
      autoCreatedProperty = await autoCreateProperty(lead);
    } catch (e) {
      console.error('[auto-create property]', e.message);
      // Non-fatal — still update the lead
    }
  }

  // Compute property_id to store on lead
  const propertyId = autoCreatedProperty?.id || b.property_id || null;
  const convertedAt = isBeingWon ? new Date().toISOString() : null;

  // Extract metadata if present
  let newMetadata = b.metadata;
  if (newMetadata && Object.keys(newMetadata).length > 0) {
    // Merge new metadata with existing
    newMetadata = { ...lead.metadata, ...newMetadata };
  }

  // Update the lead
  await sql`
    UPDATE leads SET
      status         = COALESCE(${b.status          ?? null}, status),
      assigned_to    = COALESCE(${b.assigned_to     ?? null}::uuid, assigned_to),
      notes          = COALESCE(${b.notes           ?? null}, notes),
      follow_up_date = COALESCE(${b.follow_up_date  ?? null}::date, follow_up_date),
      lost_reason    = COALESCE(${b.lost_reason     ?? null}, lost_reason),
      property_id    = COALESCE(${propertyId        ?? null}::uuid, property_id),
      converted_at   = COALESCE(${convertedAt       ?? null}::timestamptz, converted_at),
      metadata       = COALESCE(${newMetadata ? JSON.stringify(newMetadata) : null}::jsonb, metadata),
      updated_at     = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({
    success: true,
    auto_created_property: autoCreatedProperty
      ? { id: autoCreatedProperty.id, title: autoCreatedProperty.title }
      : null,
  });
}
