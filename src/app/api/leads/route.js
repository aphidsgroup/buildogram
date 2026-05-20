import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const [lead] = await sql`INSERT INTO leads(name,phone,email,city,locality,plot_area_sqft,floors,spec_level,rough_budget,estimated_cost_min,estimated_cost_max,source)
      VALUES(${body.name},${body.phone},${body.email || null},${body.city || 'Chennai'},${body.locality || null},${body.plot_area_sqft || null},${body.floors || null},${body.spec_level || null},${body.rough_budget || null},${body.estimated_cost_min || null},${body.estimated_cost_max || null},${body.source || 'website'})
      RETURNING id`;
    return NextResponse.json({ success: true, id: lead.id });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const leads = await sql`SELECT l.*,u.name as assigned_name FROM leads l LEFT JOIN users u ON u.id=l.assigned_to ORDER BY l.created_at DESC`;
  return NextResponse.json({ leads });
}
