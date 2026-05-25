import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { user } = await requirePartner(req);
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u || !u.partner_id) return ok({ notifications: [] });

    const notifications = await sql`
      SELECT * FROM notifications 
      WHERE partner_id = ${u.partner_id}
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    return ok({ notifications });
  } catch (err) {
    console.error('[partner/notifications GET]', err);
    return fail('Internal Server Error', 500);
  }
}

export async function PATCH(req) {
  try {
    const { user } = await requirePartner(req);
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u || !u.partner_id) return fail('Not a partner', 403);

    const body = await req.json();
    const { id, mark_all_read } = body;

    if (mark_all_read) {
      await sql`UPDATE notifications SET is_read = TRUE WHERE partner_id = ${u.partner_id}`;
      return ok({ success: true });
    }

    if (!id) return fail('ID required', 400);
    
    await sql`UPDATE notifications SET is_read = TRUE WHERE id = ${id} AND partner_id = ${u.partner_id}`;
    return ok({ success: true });
  } catch (err) {
    console.error('[partner/notifications PATCH]', err);
    return fail('Internal Server Error', 500);
  }
}
