import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['client', 'client_user'].includes(u.role)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Fetch active projects
    const projects = await sql`
      SELECT 
        p.id, 
        p.name, 
        p.status, 
        p.completion_pct, 
        pm.name as pm_name, 
        p.start_date, 
        p.total_contract_value, 
        p.city, 
        p.locality, 
        p.plot_area_sqft, 
        p.floors 
      FROM projects p
      LEFT JOIN users pm ON p.pm_id = pm.id
      WHERE p.client_id = ${u.id}
    `;

    // 2. Passports Count
    const passportsRes = await sql`SELECT COUNT(id) FROM properties WHERE owner_user_id = ${u.id}`;
    
    // 3. Maintenance Requests Count
    const maintenanceRes = await sql`SELECT COUNT(id) FROM leads WHERE lead_type IN ('maintenance', 'property_support') AND (metadata->>'client_user_id' = ${u.id} OR metadata->>'client_id' = ${u.id})`;

    // 4. BOQ Reports (Ready to share)
    const boqRes = await sql`SELECT COUNT(id) FROM leads WHERE lead_type = 'boq_audit' AND metadata->>'client_user_id' = ${u.id} AND metadata->'reviewed_boq_report'->>'status' = 'ready_to_share'`;

    // 5. Active general requests (Leads)
    const requestsRes = await sql`SELECT COUNT(id) FROM leads WHERE metadata->>'client_user_id' = ${u.id} AND status != 'lost' AND status != 'won'`;

    return NextResponse.json({
      success: true,
      data: {
        projects,
        counts: {
          passports: parseInt(passportsRes[0]?.count || 0),
          maintenance: parseInt(maintenanceRes[0]?.count || 0),
          boq_reports: parseInt(boqRes[0]?.count || 0),
          active_requests: parseInt(requestsRes[0]?.count || 0)
        }
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
