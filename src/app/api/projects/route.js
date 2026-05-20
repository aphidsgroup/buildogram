import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let projects;
  if (u.role === 'client') {
    projects = await sql`SELECT p.*,pm.name as pm_name FROM projects p LEFT JOIN users pm ON pm.id=p.pm_id WHERE p.client_id=${u.id} ORDER BY p.created_at DESC`;
  } else {
    projects = await sql`SELECT p.*,c.name as client_name,pm.name as pm_name FROM projects p LEFT JOIN users c ON c.id=p.client_id LEFT JOIN users pm ON pm.id=p.pm_id ORDER BY p.created_at DESC`;
  }
  return NextResponse.json({ projects });
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  const [p] = await sql`INSERT INTO projects(lead_id,client_id,pm_id,site_engineer_id,name,address,city,locality,plot_area_sqft,built_up_area_sqft,floors,spec_level,start_date,expected_end_date,total_contract_value,status)
    VALUES(${b.lead_id || null},${b.client_id},${b.pm_id || null},${b.site_engineer_id || null},${b.name},${b.address || null},${b.city || 'Chennai'},${b.locality || null},${b.plot_area_sqft || null},${b.built_up_area_sqft || null},${b.floors || null},${b.spec_level || null},${b.start_date || null},${b.expected_end_date || null},${b.total_contract_value || null},'design')
    RETURNING *`;
  return NextResponse.json({ project: p });
}
