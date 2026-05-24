import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'view_revenue')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const sourceId = searchParams.get('source_id');

    let records;
    if (sourceId) {
      records = await sql`
        SELECT r.*, u.name as created_by_name
        FROM revenue_records r
        LEFT JOIN users u ON r.created_by = u.id
        WHERE r.source_id = ${sourceId}
        ORDER BY r.created_at DESC
      `;
    } else {
      records = await sql`
        SELECT r.*, u.name as created_by_name
        FROM revenue_records r
        LEFT JOIN users u ON r.created_by = u.id
        ORDER BY r.created_at DESC
        LIMIT 100
      `;
    }

    const [totals] = await sql`
      SELECT 
        SUM(amount_expected) as total_amount_expected,
        SUM(amount_received) as total_amount_received,
        SUM(amount_pending) as total_amount_pending,
        SUM(commission_expected) as total_commission_expected,
        SUM(commission_received) as total_commission_received
      FROM revenue_records
      WHERE status != 'cancelled'
    `;

    return NextResponse.json({ success: true, records, totals });
  } catch (e) {
    console.error('[revenue GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'view_revenue')) { // Assuming they can add revenue if they can view it in v1
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const b = await req.json();
    const { 
      source_type, source_id, revenue_category, title, customer_name,
      amount_expected = 0, amount_received = 0, commission_expected = 0, commission_received = 0,
      status = 'expected', payment_mode, received_date, notes
    } = b;

    const amount_pending = Number(amount_expected) - Number(amount_received);

    const [record] = await sql`
      INSERT INTO revenue_records (
        source_type, source_id, revenue_category, title, customer_name,
        amount_expected, amount_received, amount_pending,
        commission_expected, commission_received,
        status, payment_mode, received_date, notes, created_by
      ) VALUES (
        ${source_type}, ${source_id || null}, ${revenue_category}, ${title}, ${customer_name},
        ${amount_expected}, ${amount_received}, ${amount_pending},
        ${commission_expected}, ${commission_received},
        ${status}, ${payment_mode || null}, ${received_date || null}, ${notes || null}, ${u.id}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, record });
  } catch (e) {
    console.error('[revenue POST]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
