import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return ok({ documents: [] });
    const rows = await sql`SELECT d.*, pp.project_name FROM partner_documents d LEFT JOIN partner_projects pp ON d.project_id = pp.id WHERE d.partner_id = ${u.partner_id} ORDER BY d.created_at DESC`;
    const documents = rows.map(r => ({ id: r.id, projectId: r.project_id, projectName: r.project_name, documentName: r.document_name, documentType: r.document_type, fileUrl: r.file_url, status: r.status, version: r.version, uploadedDate: r.uploaded_date, createdAt: r.created_at }));
    return ok({ documents });
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
    if (!b.documentName) return fail('documentName required');
    const [row] = await sql`
      INSERT INTO partner_documents (partner_id, project_id, document_name, document_type, file_url, status, version, uploaded_date)
      VALUES (${u.partner_id}, ${b.projectId||null}, ${b.documentName}, ${b.documentType||null}, ${b.fileUrl||null}, ${b.status||'Draft'}, ${b.version||'1.0'}, ${b.uploadedDate||new Date().toISOString().slice(0,10)})
      RETURNING id, document_name`;
    return ok({ document: { id: row.id, documentName: row.document_name } }, 201);
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
