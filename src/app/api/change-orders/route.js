import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');
  
  if (!project_id) return NextResponse.json({ error: 'project_id required' }, { status: 400 });

  const changeOrders = await sql`
    SELECT c.*, u.name as created_by_name 
    FROM change_orders c 
    LEFT JOIN users u ON u.id = c.created_by 
    WHERE c.project_id=${project_id} 
    ORDER BY c.created_at DESC
  `;
  return NextResponse.json({ changeOrders });
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const b = await req.json();
  const [co] = await sql`
    INSERT INTO change_orders(project_id, title, description, amount, created_by)
    VALUES(${b.project_id}, ${b.title}, ${b.description || null}, ${b.amount}, ${u.id})
    RETURNING *
  `;
  return NextResponse.json({ changeOrder: co });
}
