import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { user } = await requirePartner(req);
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u || !u.partner_id) return ok({ leads: [] });

    const leads = await sql`
      SELECT 
        id, 
        name,
        phone,
        email,
        city, 
        locality, 
        lead_type, 
        status,
        priority,
        category,
        requirement,
        message,
        partner_notes,
        created_at, 
        follow_up_date
      FROM leads
      WHERE assigned_partner_id = ${u.partner_id}
      ORDER BY created_at DESC
    `;

    return ok({ leads });
  } catch (err) {
    console.error('[partner/leads GET]', err);
    return fail('Internal Server Error', 500);
  }
}

export async function PATCH(req) {
  try {
    const { user } = await requirePartner(req);
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u || !u.partner_id) return fail('Not a partner', 403);

    const body = await req.json();
    const { id, status, partner_notes } = body;

    if (!id) return fail('ID required', 400);

    const updates = [];
    const args = [];

    if (status !== undefined) {
      updates.push(`status = $${args.length + 1}`);
      args.push(status);
    }
    if (partner_notes !== undefined) {
      updates.push(`partner_notes = $${args.length + 1}`);
      args.push(partner_notes);
    }

    if (updates.length === 0) return ok({});

    args.push(id, u.partner_id);

    const result = await sql.query(`
      UPDATE leads 
      SET ${updates.join(', ')}, updated_at = NOW() 
      WHERE id = $${args.length - 1} AND assigned_partner_id = $${args.length}
      RETURNING id, status
    `, args);

    const row = Array.isArray(result) ? result[0] : (result.rows && result.rows[0]);
    if (!row) return fail('Not found or unauthorized', 404);

    return ok({ lead: row });
  } catch (err) {
    console.error('[partner/leads PATCH]', err);
    return fail('Internal Server Error', 500);
  }
}
