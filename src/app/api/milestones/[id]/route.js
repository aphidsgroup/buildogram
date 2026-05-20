import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const b = await req.json();
  await sql`UPDATE milestones SET status=COALESCE(${b.status || null},status),completion_pct=COALESCE(${b.completion_pct != null ? b.completion_pct : null}::numeric,completion_pct),actual_date=COALESCE(${b.actual_date || null}::date,actual_date),updated_at=NOW() WHERE id=${id}`;
  return NextResponse.json({ success: true });
}
