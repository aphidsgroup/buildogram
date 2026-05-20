import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  const [m] = await sql`INSERT INTO milestones(project_id,name,description,order_no,planned_date,payment_trigger_pct,payment_amount)
    VALUES(${b.project_id},${b.name},${b.description || null},${b.order_no || 1},${b.planned_date || null},${b.payment_trigger_pct || 0},${b.payment_amount || 0}) RETURNING *`;
  return NextResponse.json({ milestone: m });
}

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');
  const milestones = await sql`SELECT * FROM milestones WHERE project_id=${project_id} ORDER BY order_no`;
  return NextResponse.json({ milestones });
}
