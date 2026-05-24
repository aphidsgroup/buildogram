import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const orders = await sql`
      SELECT p.*, i.invoice_number 
      FROM payment_orders p
      LEFT JOIN invoice_records i ON p.invoice_id = i.id
      WHERE p.client_user_id = ${u.id}
      ORDER BY p.created_at DESC
    `;
    return NextResponse.json({ success: true, orders });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
