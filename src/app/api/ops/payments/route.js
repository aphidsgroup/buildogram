import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_invoices')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const orders = await sql`
      SELECT p.*, i.invoice_number, c.name as client_name
      FROM payment_orders p
      LEFT JOIN invoice_records i ON p.invoice_id = i.id
      LEFT JOIN users c ON p.client_user_id = c.id
      ORDER BY p.created_at DESC
    `;
    return NextResponse.json({ success: true, orders });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
