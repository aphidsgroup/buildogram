import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Fetch active projects (already handled by /api/projects mostly, but we can do a quick check)
    const projects = await sql`SELECT id, name, status, completion_pct, pm_name, start_date, total_contract_value, city, locality, plot_area_sqft, floors FROM projects WHERE client_id = ${u.id}`;

    // 2. Passports Count
    const passportsRes = await sql`SELECT COUNT(id) FROM properties WHERE owner_user_id = ${u.id}`;
    
    // 3. Maintenance Requests Count
    const maintenanceRes = await sql`SELECT COUNT(id) FROM client_maintenance_requests WHERE client_id = ${u.id}`;

    // 4. BOQ Reports (Ready to share)
    const boqRes = await sql`SELECT COUNT(id) FROM leads WHERE lead_type = 'boq_audit' AND metadata->>'client_user_id' = ${u.id} AND metadata->'reviewed_boq_report'->>'status' = 'ready_to_share'`;

    // 5. Active general requests (Leads)
    const requestsRes = await sql`SELECT COUNT(id) FROM leads WHERE metadata->>'client_user_id' = ${u.id} AND status != 'lost' AND status != 'won'`;

    return NextResponse.json({
      success: true,
      data: {
        projects,
        counts: {
          passports: parseInt(passportsRes[0].count),
          maintenance: parseInt(maintenanceRes[0].count),
          boq_reports: parseInt(boqRes[0].count),
          active_requests: parseInt(requestsRes[0].count)
        }
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
