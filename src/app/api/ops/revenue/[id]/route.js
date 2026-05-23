import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = params;

  try {
    const b = await req.json();
    const { 
      amount_expected, amount_received, commission_expected, commission_received,
      status, payment_mode, received_date, notes 
    } = b;

    const [current] = await sql`SELECT amount_expected, amount_received FROM revenue_records WHERE id = ${id}`;
    if (!current) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    const expected = amount_expected !== undefined ? amount_expected : current.amount_expected;
    const received = amount_received !== undefined ? amount_received : current.amount_received;
    const pending = Number(expected) - Number(received);

    const [record] = await sql`
      UPDATE revenue_records SET
        amount_expected = COALESCE(${amount_expected}, amount_expected),
        amount_received = COALESCE(${amount_received}, amount_received),
        amount_pending = ${pending},
        commission_expected = COALESCE(${commission_expected}, commission_expected),
        commission_received = COALESCE(${commission_received}, commission_received),
        status = COALESCE(${status}, status),
        payment_mode = COALESCE(${payment_mode}, payment_mode),
        received_date = COALESCE(${received_date}, received_date),
        notes = COALESCE(${notes}, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, record });
  } catch (e) {
    console.error('[revenue PUT]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
