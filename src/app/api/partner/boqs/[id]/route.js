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
    const [boq] = await sql`SELECT * FROM partner_boqs WHERE id = ${params.id} AND partner_id = ${u.partner_id}`;
    if (!boq) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const items = await sql`SELECT * FROM partner_boq_items WHERE boq_id = ${params.id} ORDER BY created_at ASC`;
    return ok({ boq: { id: boq.id, title: boq.title, packageType: boq.package_type, totalInternalCost: boq.total_internal_cost, totalClientQuote: boq.total_client_quote, estimatedProfit: boq.estimated_profit, status: boq.status, items } });
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
    const [existing] = await sql`SELECT id FROM partner_boqs WHERE id = ${params.id} AND partner_id = ${u.partner_id}`;
    if (!existing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const b = await request.json();
    await sql`UPDATE partner_boqs SET title=${b.title||null}, package_type=${b.packageType||'standard'}, total_internal_cost=${b.totalInternalCost||0}, total_client_quote=${b.totalClientQuote||0}, estimated_profit=${b.estimatedProfit||0}, status=${b.status||'Draft'}, updated_at=NOW() WHERE id=${params.id}`;
    return ok({ message: 'BOQ updated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
