import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'ops_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const [lead] = await sql`SELECT * FROM leads WHERE id=${id}`;
    return NextResponse.json({ lead });
  }
  const leads = await sql`SELECT l.*,u.name as assigned_name FROM leads l LEFT JOIN users u ON u.id=l.assigned_to ORDER BY l.created_at DESC`;
  return NextResponse.json({ leads });
}

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  const b = await req.json();
  await sql`UPDATE leads SET status=COALESCE(${b.status || null},status),assigned_to=COALESCE(${b.assigned_to || null}::uuid,assigned_to),notes=COALESCE(${b.notes || null},notes),updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ success: true });
}
