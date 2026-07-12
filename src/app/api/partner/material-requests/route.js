import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return ok({ requests: [] });
    const rows = await sql`SELECT mr.*, pp.project_name FROM partner_material_requests mr LEFT JOIN partner_projects pp ON mr.project_id = pp.id WHERE mr.partner_id = ${u.partner_id} ORDER BY mr.created_at DESC`;
    const requests = rows.map(r => ({ id: r.id, projectId: r.project_id, projectName: r.project_name, materialName: r.material_name, quantity: r.quantity, unit: r.unit, requiredDate: r.required_date, priority: r.priority, status: r.status, vendorQuoteStatus: r.vendor_quote_status, bestRateRequest: r.best_rate_request, notes: r.notes, createdAt: r.created_at }));
    return ok({ requests });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile', 403);
    const b = await request.json();
    if (!b.materialName) return fail('materialName required');
    const [row] = await sql`
      INSERT INTO partner_material_requests (partner_id, project_id, material_name, quantity, unit, required_date, priority, status, best_rate_request, notes)
      VALUES (${u.partner_id}, ${b.projectId||null}, ${b.materialName}, ${b.quantity||0}, ${b.unit||'Nos'}, ${b.requiredDate||null}, ${b.priority||'Medium'}, ${b.status||'Requested'}, ${b.bestRateRequest||false}, ${b.notes||null})
      RETURNING id, material_name`;
    return ok({ request: { id: row.id, materialName: row.material_name } }, 201);
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
