import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    // Basic lead metrics
    const [totalLeads] = await sql`SELECT COUNT(*)::int as count FROM leads`;
    const [wonLeads] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE status = 'won'`;
    const [lostLeads] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE status = 'lost'`;
    
    // Assignment metrics
    const [assignedLeads] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE assigned_partner_id IS NOT NULL`;
    const [unassignedLeads] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE assigned_partner_id IS NULL AND status NOT IN ('won', 'lost', 'cancelled')`;

    // Priority metrics
    const priorityBreakdown = await sql`
      SELECT priority, COUNT(*)::int as count 
      FROM leads 
      GROUP BY priority
      ORDER BY count DESC
    `;

    // Partner Conversion metrics
    const partnerPerformance = await sql`
      SELECT 
        p.id, p.company_name, 
        COUNT(l.id)::int as total_assigned,
        COUNT(CASE WHEN l.status = 'won' THEN 1 END)::int as won,
        COUNT(CASE WHEN l.status = 'lost' THEN 1 END)::int as lost
      FROM partners p
      JOIN leads l ON p.id = l.assigned_partner_id
      GROUP BY p.id, p.company_name
      ORDER BY total_assigned DESC
      LIMIT 10
    `;

    // Spam metrics
    const [spamLeads] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE spam_status = 'spam'`;

    return NextResponse.json({ 
      success: true, 
      metrics: {
        totalLeads: totalLeads.count,
        wonLeads: wonLeads.count,
        lostLeads: lostLeads.count,
        assignedLeads: assignedLeads.count,
        unassignedLeads: unassignedLeads.count,
        spamLeads: spamLeads.count
      },
      priorityBreakdown,
      partnerPerformance
    });
  } catch (err) {
    console.error('[ops analytics GET]', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
