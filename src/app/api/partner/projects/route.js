import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return ok({ projects: [] });
    const rows = await sql`SELECT * FROM partner_projects WHERE partner_id = ${u.partner_id} ORDER BY created_at DESC`;
    const projects = rows.map(r => ({
      id: r.id, partnerId: r.partner_id, projectName: r.project_name,
      clientName: r.client_name, location: r.location, projectType: r.project_type,
      startDate: r.start_date, targetCompletion: r.target_completion,
      currentStage: r.current_stage, progress: r.progress_percent,
      budget: r.budget, status: r.status, notes: r.notes,
      createdAt: r.created_at, updatedAt: r.updated_at,
    }));
    return ok({ projects });
  } catch (e) {
    console.error('[GET /api/partner/projects]', e.message);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile linked', 403);
    const b = await request.json();
    if (!b.projectName) return fail('projectName is required');
    const [row] = await sql`
      INSERT INTO partner_projects (partner_id, project_name, client_name, location, project_type, start_date, target_completion, current_stage, progress_percent, budget, status, notes)
      VALUES (${u.partner_id}, ${b.projectName}, ${b.clientName || null}, ${b.location || null}, ${b.projectType || null}, ${b.startDate || null}, ${b.targetCompletion || null}, ${b.currentStage || null}, ${b.progress || 0}, ${b.budget || null}, ${b.status || 'Planning'}, ${b.notes || null})
      RETURNING *`;
    return ok({ project: { id: row.id, projectName: row.project_name } }, 201);
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
