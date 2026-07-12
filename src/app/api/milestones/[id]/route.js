import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { PROJECT_MUTATION_ROLES } from '@/lib/roles';

const STATUSES = new Set(['pending', 'in_progress', 'completed', 'blocked']);

export async function PUT(req, { params }) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!PROJECT_MUTATION_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const status = body.status ?? null;
  const completion = body.completion_pct == null ? null : Number(body.completion_pct);
  if (status !== null && !STATUSES.has(status)) {
    return NextResponse.json({ error: 'Invalid milestone status' }, { status: 400 });
  }
  if (completion !== null && (!Number.isFinite(completion) || completion < 0 || completion > 100)) {
    return NextResponse.json({ error: 'Completion must be between 0 and 100' }, { status: 400 });
  }

  const [updated] = await sql`
    UPDATE milestones SET
      status = COALESCE(${status}, status),
      completion_pct = COALESCE(${completion}::numeric, completion_pct),
      actual_date = COALESCE(${body.actual_date || null}::date, actual_date),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, project_id, status, completion_pct, actual_date, updated_at
  `;
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, milestone: updated });
}
