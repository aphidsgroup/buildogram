import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile', 403);
    const [existing] = await sql`SELECT id FROM partner_site_logs WHERE id = ${(await params).id} AND partner_id = ${u.partner_id}`;
    if (!existing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const b = await request.json();
    await sql`UPDATE partner_site_logs SET work_completed=${b.workCompleted||null}, labour_count=${b.labourCount||0}, materials_received=${b.materialsReceived||null}, issues_faced=${b.issuesFaced||null}, tomorrow_plan=${b.tomorrowPlan||null}, photo_url=${b.photoUrl||null}, video_url=${b.videoUrl||null}, client_visible=${b.clientVisible!==false} WHERE id=${(await params).id}`;
    return ok({ message: 'Log updated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
