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
    const [existing] = await sql`SELECT id FROM partner_material_requests WHERE id = ${params.id} AND partner_id = ${u.partner_id}`;
    if (!existing) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    const b = await request.json();
    await sql`UPDATE partner_material_requests SET material_name=COALESCE(${b.materialName||null}, material_name), quantity=${b.quantity||0}, unit=${b.unit||'Nos'}, required_date=${b.requiredDate||null}, priority=${b.priority||'Medium'}, status=${b.status||'Requested'}, vendor_quote_status=${b.vendorQuoteStatus||null}, best_rate_request=${b.bestRateRequest||false}, notes=${b.notes||null}, updated_at=NOW() WHERE id=${params.id}`;
    return ok({ message: 'Material request updated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
