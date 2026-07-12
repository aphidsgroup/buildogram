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
    const [existing] = await sql`SELECT id FROM partner_documents WHERE id = ${(await params).id} AND partner_id = ${u.partner_id}`;
    if (!existing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const b = await request.json();
    await sql`UPDATE partner_documents SET document_name=COALESCE(${b.documentName||null}, document_name), document_type=${b.documentType||null}, file_url=${b.fileUrl||null}, status=${b.status||'Draft'}, version=${b.version||'1.0'}, uploaded_date=${b.uploadedDate||null} WHERE id=${(await params).id}`;
    return ok({ message: 'Document updated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
