import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile', 403);
    const [row] = await sql`SELECT * FROM partner_projects WHERE id = ${params.id} AND partner_id = ${u.partner_id} LIMIT 1`;
    if (!row) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    return ok({ project: { id: row.id, projectName: row.project_name, clientName: row.client_name, location: row.location, projectType: row.project_type, startDate: row.start_date, targetCompletion: row.target_completion, currentStage: row.current_stage, progress: row.progress_percent, budget: row.budget, status: row.status, notes: row.notes } });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile', 403);
    const [existing] = await sql`SELECT id FROM partner_projects WHERE id = ${params.id} AND partner_id = ${u.partner_id}`;
    if (!existing) return NextResponse.json({ success: false, message: 'Not found or access denied' }, { status: 404 });
    const b = await request.json();
    await sql`UPDATE partner_projects SET project_name=${b.projectName||null}, client_name=${b.clientName||null}, location=${b.location||null}, project_type=${b.projectType||null}, start_date=${b.startDate||null}, target_completion=${b.targetCompletion||null}, current_stage=${b.currentStage||null}, progress_percent=${b.progress||0}, budget=${b.budget||null}, status=${b.status||'Planning'}, notes=${b.notes||null}, updated_at=NOW() WHERE id=${params.id}`;
    return ok({ message: 'Updated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
