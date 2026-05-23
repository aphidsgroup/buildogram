import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    // 1. KPI Queries
    const [[leadsCount]] = await sql`SELECT COUNT(*)::int as count FROM leads`;
    const [[newLeadsMonth]] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE created_at >= date_trunc('month', current_date)`;
    
    // Revenue metrics from JSONB
    const [[matOrderVal]] = await sql`SELECT SUM(CAST(NULLIF(metadata->>'estimated_order_value', '') AS numeric)) as total FROM leads WHERE lead_type='material_quote'`;
    const [[matComm]] = await sql`SELECT SUM(CAST(NULLIF(metadata->>'expected_commission', '') AS numeric)) as total FROM leads WHERE lead_type='material_quote'`;
    
    const [[publishedListings]] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='property_listing' AND metadata->>'public_status'='published'`;
    const [[activePassports]] = await sql`SELECT COUNT(*)::int as count FROM properties WHERE passport_status='active'`;
    const [[avgCompleteness]] = await sql`SELECT AVG(passport_completeness)::int as avg FROM properties WHERE passport_status='active'`;
    
    // Breakdown by lead type
    const leadTypeBreakdown = await sql`
      SELECT lead_type, COUNT(*)::int as count 
      FROM leads 
      GROUP BY lead_type
      ORDER BY count DESC
    `;

    // Breakdown by status
    const statusBreakdown = await sql`
      SELECT status, COUNT(*)::int as count 
      FROM leads 
      GROUP BY status
      ORDER BY count DESC
    `;

    // 2. Recent Activity (Latest 5 items of each important category)
    const recentMaterialQuotes = await sql`
      SELECT id, name, created_at, metadata->>'material_category' as category, status 
      FROM leads 
      WHERE lead_type='material_quote' 
      ORDER BY created_at DESC LIMIT 5
    `;

    const recentPartners = await sql`
      SELECT id, name, created_at, metadata->>'partner_category' as category, metadata->>'verification_status' as v_status 
      FROM leads 
      WHERE lead_type='partner_application' 
      ORDER BY created_at DESC LIMIT 5
    `;

    const recentMaintenance = await sql`
      SELECT id, name, created_at, metadata->>'issue_category' as category, metadata->>'maintenance_status' as m_status 
      FROM leads 
      WHERE lead_type='maintenance' 
      ORDER BY created_at DESC LIMIT 5
    `;

    const recentListings = await sql`
      SELECT id, name, created_at, metadata->>'listing_type' as type, metadata->>'public_status' as p_status 
      FROM leads 
      WHERE lead_type='property_listing' 
      ORDER BY created_at DESC LIMIT 5
    `;

    // 3. Alerts Data
    const [[pendingPartners]] = await sql`SELECT COUNT(*)::int as count FROM users WHERE role='partner' AND verification_status='pending'`;

    // 2. Revenue Totals
    const [rev] = await sql`
      SELECT 
        SUM(amount_received) as actual_received,
        SUM(amount_pending) as total_pending,
        SUM(commission_received) as commission_received
      FROM revenue_records
      WHERE status != 'cancelled'
    `;

    // 3. Alerts
    const [[urgentMaintenance]] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='maintenance' AND metadata->>'urgency' IN ('emergency', 'high') AND metadata->>'maintenance_status' NOT IN ('completed', 'closed', 'cancelled')`;
    const [[draftListings]] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='property_listing' AND metadata->>'public_status'='draft'`;

    // 4. Follow-up Actions
    const activeLeadStatus = ['new', 'contacted', 'qualified', 'proposal', 'inspection_scheduled', 'work_started', 'approved', 'quoted'];
    
    // Using a single CTE/query to get all relevant follow-ups to save DB hits
    const rawFollowUps = await sql`
      SELECT 
        a.id as activity_id, 
        a.title, 
        a.description, 
        a.follow_up_at,
        l.id as lead_id, 
        l.name as lead_name, 
        l.phone as lead_phone, 
        l.lead_type, 
        l.status as lead_status
      FROM lead_activities a
      JOIN leads l ON a.lead_id = l.id
      WHERE a.follow_up_at IS NOT NULL
        AND l.status NOT IN ('won', 'lost', 'closed', 'cancelled')
        AND a.follow_up_at <= CURRENT_DATE + INTERVAL '7 days'
      ORDER BY a.follow_up_at ASC
    `;

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const followUps = {
      overdue: [],
      today: [],
      upcoming: []
    };

    rawFollowUps.forEach(f => {
      const fDate = new Date(f.follow_up_at);
      const fDateStr = fDate.toISOString().split('T')[0];

      if (fDateStr === todayStr) {
        followUps.today.push(f);
      } else if (fDate < now) {
        followUps.overdue.push(f);
      } else {
        followUps.upcoming.push(f);
      }
    });

    return NextResponse.json({ 
      success: true, 
      kpis: {
        totalLeads: leadsCount.count,
        newLeadsMonth: newLeadsMonth.count,
        revenueReceived: rev?.actual_received || 0,
        revenuePending: rev?.total_pending || 0,
        commissionReceived: rev?.commission_received || 0,
        publishedListings: publishedListings.count,
        activePassports: activePassports.count,
        avgCompleteness: avgCompleteness.avg || 0,
      },
      breakdowns: {
        leadTypes: leadTypeBreakdown,
        statuses: statusBreakdown,
      },
      alerts: {
        pendingPartners: pendingPartners.count,
        urgentMaintenance: urgentMaintenance.count,
        draftListings: draftListings.count,
        overdueFollowUps: followUps.overdue.length,
        todayFollowUps: followUps.today.length,
      },
      followUps,
      recent: {
        materials: recentMaterialQuotes,
        partners: recentPartners,
        maintenance: recentMaintenance,
        listings: recentListings
      }
    });

  } catch (e) {
    console.error('[ops dashboard GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
