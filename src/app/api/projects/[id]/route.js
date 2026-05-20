import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const [p] = await sql`SELECT p.*,c.name as client_name,c.email as client_email,c.phone as client_phone,pm.name as pm_name,pm.phone as pm_phone,se.name as engineer_name FROM projects p LEFT JOIN users c ON c.id=p.client_id LEFT JOIN users pm ON pm.id=p.pm_id LEFT JOIN users se ON se.id=p.site_engineer_id WHERE p.id=${id}`;
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const milestones = await sql`SELECT * FROM milestones WHERE project_id=${id} ORDER BY order_no`;
  const logs = await sql`SELECT pl.*,u.name as logged_by_name FROM progress_logs pl LEFT JOIN users u ON u.id=pl.logged_by WHERE pl.project_id=${id} ORDER BY pl.log_date DESC LIMIT 20`;
  const issues = await sql`SELECT i.*,u.name as raised_by_name FROM issues i LEFT JOIN users u ON u.id=i.raised_by WHERE i.project_id=${id} ORDER BY i.created_at DESC`;
  const documents = await sql`SELECT * FROM documents WHERE project_id=${id} ORDER BY created_at DESC`;
  return NextResponse.json({ project: p, milestones, logs, issues, documents });
}

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const b = await req.json();
  await sql`UPDATE projects SET status=COALESCE(${b.status || null},status),completion_pct=COALESCE(${b.completion_pct != null ? b.completion_pct : null}::numeric,completion_pct),pm_id=COALESCE(${b.pm_id || null}::uuid,pm_id),cover_image_url=COALESCE(${b.cover_image_url || null},cover_image_url),notes=COALESCE(${b.notes || null},notes),updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ success: true });
}
