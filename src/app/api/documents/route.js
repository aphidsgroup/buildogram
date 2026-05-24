import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const b = await req.json();
  const [doc] = await sql`
    INSERT INTO documents(project_id, name, type, file_url, public_id, uploaded_by, is_shared_with_client, requires_consent)
    VALUES(${b.project_id}, ${b.name}, ${b.type}, ${b.file_url}, ${b.public_id || null}, ${u.id}, ${b.is_shared_with_client || false}, ${b.requires_consent || false})
    RETURNING *
  `;
  return NextResponse.json({ document: doc });
}
