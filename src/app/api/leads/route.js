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
  const partnerId = searchParams.get('partner_id');

  try {
    let conditions = [];
    let args = [];

    if (leadType && leadType !== 'all') {
      conditions.push(`l.lead_type = $${args.length + 1}`);
      args.push(leadType);
    }
    if (status && status !== 'all') {
      conditions.push(`l.status = $${args.length + 1}`);
      args.push(status);
    }
    if (partnerId) {
      conditions.push(`l.assigned_partner_id = $${args.length + 1}`);
      args.push(partnerId);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Using sql.query for dynamic building
    const result = await sql.query(`
      SELECT 
        l.*, 
        u.name AS assigned_name,
        p.company_name AS assigned_partner_name,
        p.slug AS assigned_partner_slug
      FROM leads l
      LEFT JOIN users u ON u.id = l.assigned_to
      LEFT JOIN partners p ON p.id = l.assigned_partner_id
      ${whereClause}
      ORDER BY l.created_at DESC
    `, args);

    return NextResponse.json({ success: true, leads: result.rows || result });
  } catch (e) {
    console.error('[leads GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, status, priority, spam_status, assigned_partner_id, internal_notes } = body;

    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

    const updates = [];
    const args = [];

    if (status !== undefined) {
      updates.push(`status = $${args.length + 1}`);
      args.push(status);
    }
    if (priority !== undefined) {
      updates.push(`priority = $${args.length + 1}`);
      args.push(priority);
    }
    if (spam_status !== undefined) {
      updates.push(`spam_status = $${args.length + 1}`);
      args.push(spam_status);
    }
    if (assigned_partner_id !== undefined) {
      updates.push(`assigned_partner_id = $${args.length + 1}`);
      args.push(assigned_partner_id === '' ? null : assigned_partner_id);
    }
    if (internal_notes !== undefined) {
      updates.push(`internal_notes = $${args.length + 1}`);
      args.push(internal_notes);
    }

    if (updates.length === 0) return NextResponse.json({ success: true });

    args.push(id);
    const result = await sql.query(`
      UPDATE leads 
      SET ${updates.join(', ')}, updated_at = NOW() 
      WHERE id = $${args.length}
      RETURNING id, status, assigned_partner_id
    `, args);

    if (!result.rows || result.rows.length === 0) {
       // Support neon returning array directly
       const row = Array.isArray(result) ? result[0] : null;
       if (!row) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[leads PATCH]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
