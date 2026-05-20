import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const b = await req.json();
  const [issue] = await sql`INSERT INTO issues(project_id,raised_by,title,description,priority,photos)
    VALUES(${b.project_id},${u.id},${b.title},${b.description || null},${b.priority || 'medium'},${JSON.stringify(b.photos || [])}) RETURNING *`;
  return NextResponse.json({ issue });
}

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');
  const issues = await sql`SELECT i.*,u.name as raised_by_name FROM issues i LEFT JOIN users u ON u.id=i.raised_by WHERE i.project_id=${project_id} ORDER BY i.created_at DESC`;
  return NextResponse.json({ issues });
}
