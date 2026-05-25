import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return ok({ logs: [] });
    const rows = await sql`SELECT sl.*, pp.project_name FROM partner_site_logs sl LEFT JOIN partner_projects pp ON sl.project_id = pp.id WHERE sl.partner_id = ${u.partner_id} ORDER BY sl.log_date DESC, sl.created_at DESC`;
    const logs = rows.map(r => ({ id: r.id, projectId: r.project_id, projectName: r.project_name, logDate: r.log_date, workCompleted: r.work_completed, labourCount: r.labour_count, materialsReceived: r.materials_received, issuesFaced: r.issues_faced, tomorrowPlan: r.tomorrow_plan, photoUrl: r.photo_url, videoUrl: r.video_url, clientVisible: r.client_visible, createdAt: r.created_at }));
    return ok({ logs });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile', 403);
    const b = await request.json();
    const [row] = await sql`
      INSERT INTO partner_site_logs (partner_id, project_id, log_date, work_completed, labour_count, materials_received, issues_faced, tomorrow_plan, photo_url, video_url, client_visible)
      VALUES (${u.partner_id}, ${b.projectId||null}, ${b.logDate||new Date().toISOString().slice(0,10)}, ${b.workCompleted||null}, ${b.labourCount||0}, ${b.materialsReceived||null}, ${b.issuesFaced||null}, ${b.tomorrowPlan||null}, ${b.photoUrl||null}, ${b.videoUrl||null}, ${b.clientVisible !== false})
      RETURNING id, log_date`;
    return ok({ log: { id: row.id, logDate: row.log_date } }, 201);
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
