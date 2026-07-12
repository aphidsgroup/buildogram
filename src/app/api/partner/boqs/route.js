import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;
  try {
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return ok({ boqs: [] });
    const rows = await sql`
      SELECT b.*, COALESCE((SELECT COUNT(*)::int FROM partner_boq_items i WHERE i.boq_id = b.id), 0) as item_count
      FROM partner_boqs b WHERE b.partner_id = ${u.partner_id} ORDER BY b.created_at DESC`;
    const boqs = rows.map(r => ({ id: r.id, title: r.title, packageType: r.package_type, totalInternalCost: r.total_internal_cost, totalClientQuote: r.total_client_quote, estimatedProfit: r.estimated_profit, status: r.status, itemCount: r.item_count, createdAt: r.created_at }));
    return ok({ boqs });
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
    if (!b.title) return fail('title required');
    const [row] = await sql`
      INSERT INTO partner_boqs (partner_id, project_id, title, package_type, status)
      VALUES (${u.partner_id}, ${b.projectId||null}, ${b.title}, ${b.packageType||'standard'}, ${b.status||'Draft'})
      RETURNING id, title`;
    return ok({ boq: { id: row.id, title: row.title } }, 201);
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
