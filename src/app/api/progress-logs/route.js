import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const b = await req.json();
  const [log] = await sql`INSERT INTO progress_logs(project_id,milestone_id,logged_by,log_date,notes,photos,workers_count,weather)
    VALUES(${b.project_id},${b.milestone_id || null},${u.id},${b.log_date || new Date().toISOString().split('T')[0]},${b.notes || null},${JSON.stringify(b.photos || [])},${b.workers_count || 0},${b.weather || null}) RETURNING *`;
  return NextResponse.json({ log });
}

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const project_id = searchParams.get('project_id');
  const logs = await sql`SELECT pl.*,u.name as logged_by_name FROM progress_logs pl LEFT JOIN users u ON u.id=pl.logged_by WHERE pl.project_id=${project_id} ORDER BY pl.log_date DESC`;
  return NextResponse.json({ logs });
}
