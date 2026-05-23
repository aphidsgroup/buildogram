import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const { id } = await params;
  const [lead] = await sql`SELECT l.*, u.name AS assigned_name FROM leads l LEFT JOIN users u ON u.id = l.assigned_to WHERE l.id = ${id}`;
  if (!lead) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, lead });
}

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  const { id } = await params;
  const b = await req.json();

  await sql`
    UPDATE leads SET
      status       = COALESCE(${b.status      || null}, status),
      assigned_to  = COALESCE(${b.assigned_to || null}::uuid, assigned_to),
      notes        = COALESCE(${b.notes       || null}, notes),
      follow_up_date = COALESCE(${b.follow_up_date || null}::date, follow_up_date),
      lost_reason  = COALESCE(${b.lost_reason || null}, lost_reason),
      updated_at   = NOW()
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}
