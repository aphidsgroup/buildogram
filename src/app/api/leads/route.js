import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

const VALID_LEAD_TYPES = [
  'construction', 'boq_audit', 'plan_review', 'material_quote',
  'partner_application', 'rental_listing', 'resale_listing',
  'property_passport', 'maintenance', 'general', 'property_listing'
];

export async function POST(req) {
  try {
    const body = await req.json();

    // Validation
    if (!body.name || !body.phone) {
      return NextResponse.json({ success: false, error: 'Name and phone are required' }, { status: 400 });
    }

    const leadType = VALID_LEAD_TYPES.includes(body.lead_type) ? body.lead_type : 'construction';
    const metadata = body.metadata && typeof body.metadata === 'object' ? body.metadata : {};

    const [lead] = await sql`
      INSERT INTO leads (
        name, phone, email,
        city, locality,
        plot_area_sqft, floors, spec_level,
        rough_budget, estimated_cost_min, estimated_cost_max,
        source, lead_type, message, source_page, metadata
      ) VALUES (
        ${body.name},
        ${body.phone},
        ${body.email || null},
        ${body.city || 'Chennai'},
        ${body.locality || null},
        ${body.plot_area_sqft || null},
        ${body.floors || null},
        ${body.spec_level || null},
        ${body.rough_budget || null},
        ${body.estimated_cost_min || null},
        ${body.estimated_cost_max || null},
        ${body.source || 'website'},
        ${leadType},
        ${body.message || null},
        ${body.source_page || null},
        ${JSON.stringify(metadata)}
      )
      RETURNING id, lead_type
    `;

    return NextResponse.json({ success: true, id: lead.id, lead_type: lead.lead_type });
  } catch (e) {
    console.error('[leads POST]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const leadType = searchParams.get('lead_type');
  const status = searchParams.get('status');

  // Dynamic filter: support filtering by lead_type and/or status
  let leads;
  if (leadType && status) {
    leads = await sql`
      SELECT l.*, u.name AS assigned_name
      FROM leads l
      LEFT JOIN users u ON u.id = l.assigned_to
      WHERE l.lead_type = ${leadType} AND l.status = ${status}
      ORDER BY l.created_at DESC
    `;
  } else if (leadType) {
    leads = await sql`
      SELECT l.*, u.name AS assigned_name
      FROM leads l
      LEFT JOIN users u ON u.id = l.assigned_to
      WHERE l.lead_type = ${leadType}
      ORDER BY l.created_at DESC
    `;
  } else if (status) {
    leads = await sql`
      SELECT l.*, u.name AS assigned_name
      FROM leads l
      LEFT JOIN users u ON u.id = l.assigned_to
      WHERE l.status = ${status}
      ORDER BY l.created_at DESC
    `;
  } else {
    leads = await sql`
      SELECT l.*, u.name AS assigned_name
      FROM leads l
      LEFT JOIN users u ON u.id = l.assigned_to
      ORDER BY l.created_at DESC
    `;
  }

  return NextResponse.json({ success: true, leads });
}
