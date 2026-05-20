import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');
  const items = await sql`SELECT * FROM boq_items WHERE project_id=${project_id} ORDER BY category,activity`;
  return NextResponse.json({ items });
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  const [item] = await sql`INSERT INTO boq_items(project_id,category,activity,unit,quantity,rate,spec_level,notes)
    VALUES(${b.project_id},${b.category},${b.activity},${b.unit},${b.quantity},${b.rate},${b.spec_level || null},${b.notes || null}) RETURNING *`;
  return NextResponse.json({ item });
}
