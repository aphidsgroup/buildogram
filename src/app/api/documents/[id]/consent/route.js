import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') {
    return NextResponse.json({ error: 'Forbidden. Only clients can sign off documents.' }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json(); // 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  // Ensure the document belongs to a project owned by this client
  const [doc] = await sql`
    UPDATE documents d
    SET consent_status = ${status},
        consented_at = NOW(),
        consented_by = ${u.id}
    FROM projects p
    WHERE d.project_id = p.id
      AND d.id = ${id}
      AND p.client_id = ${u.id}
    RETURNING d.*
  `;

  if (!doc) {
    return NextResponse.json({ error: 'Document not found or access denied' }, { status: 404 });
  }

  return NextResponse.json({ success: true, document: doc });
}
