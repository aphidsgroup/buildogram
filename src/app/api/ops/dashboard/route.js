import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const [leadsCount] = await sql`SELECT COUNT(*)::int as count FROM leads`;
    const [newLeadsMonth] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE created_at >= date_trunc('month', current_date)`;
    
    // Revenue metrics from JSONB (Only if role allows)
    const canViewRevenue = roleCan(u.role, 'view_revenue');
    let matOrderVal = { total: 0 }, matComm = { total: 0 };
    let referralExpected = { total: 0 }, referralPaid = { total: 0 };
    
    if (canViewRevenue) {
      [matOrderVal] = await sql`SELECT SUM(CAST(NULLIF(metadata->>'estimated_order_value', '') AS numeric)) as total FROM leads WHERE lead_type='material_quote'`;
      [matComm] = await sql`SELECT SUM(CAST(NULLIF(metadata->>'expected_commission', '') AS numeric)) as total FROM leads WHERE lead_type='material_quote'`;
      [referralExpected] = await sql`SELECT SUM(CAST(NULLIF(metadata->>'referral_commission_expected', '') AS numeric)) as total FROM leads`;
      [referralPaid] = await sql`SELECT SUM(CAST(NULLIF(metadata->>'referral_commission_paid', '') AS numeric)) as total FROM leads`;
    }
    // Referral Metrics
    const [referredLeads] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE metadata->>'referral_partner_lead_id' IS NOT NULL`;
    const [convertedReferrals] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE metadata->>'referral_status'='converted'`;
    
    let publishedListings = { count: 0 }, activePassports = { count: 0 }, avgCompleteness = { avg: 0 }, propertyInquiries = { count: 0 };
    try {
      [publishedListings] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='property_listing' AND metadata->>'public_status'='published'`;
      [propertyInquiries] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='property_inquiry'`;
    } catch(e) {}
    try {
      [activePassports] = await sql`SELECT COUNT(*)::int as count FROM properties WHERE passport_status='active'`;
      [avgCompleteness] = await sql`SELECT AVG(passport_completeness)::int as avg FROM properties WHERE passport_status='active'`;
    } catch(e) {}
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
    let pendingPartners = { count: 0 };
    try {
      [pendingPartners] = await sql`SELECT COUNT(*)::int as count FROM users WHERE role='partner' AND verification_status='pending'`;
    } catch(e) {}

    // 2. Revenue Totals
    let rev = { actual_received: 0, total_pending: 0, commission_received: 0 };
    let inv = { total_invoiced: 0, total_paid: 0, total_due: 0 };
    if (canViewRevenue) {
      try {
        const [revData] = await sql`
          SELECT 
            SUM(amount_received) as actual_received,
            SUM(amount_pending) as total_pending,
            SUM(commission_received) as commission_received
          FROM revenue_records
          WHERE status != 'cancelled'
        `;
        if (revData) rev = revData;
      } catch (e) {
        console.error('Revenue table not ready or error:', e.message);
      }
      
      try {
        const [invData] = await sql`
          SELECT 
            SUM(total_amount) as total_invoiced,
            SUM(amount_paid) as total_paid,
            SUM(amount_due) as total_due
          FROM invoice_records
          WHERE status != 'cancelled'
        `;
        if (invData) inv = invData;
      } catch (e) {
        console.error('Invoices table not ready or error:', e);
      }
    }

    // 3. Alerts
    let urgentMaintenance = { count: 0 }, draftListings = { count: 0 }, overdueFollowups = { count: 0 };
    try {
      [urgentMaintenance] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='maintenance' AND metadata->>'urgency' IN ('emergency', 'high') AND metadata->>'maintenance_status' NOT IN ('completed', 'closed', 'cancelled')`;
      [draftListings] = await sql`SELECT COUNT(*)::int as count FROM leads WHERE lead_type='property_listing' AND metadata->>'public_status'='draft'`;
      [overdueFollowups] = await sql`SELECT COUNT(*)::int as count FROM lead_activities WHERE type = 'follow_up' AND follow_up_at < NOW()`;
    } catch(e) {}

    // 4. Notification Queue Metrics
    let pendingQueueApprovals = { count: 0 }, failedQueueMessages = { count: 0 }, sentQueueMessagesMonth = { count: 0 };
    try {
      [pendingQueueApprovals] = await sql`SELECT COUNT(*)::int as count FROM notification_queue WHERE status='pending_review'`;
      [failedQueueMessages] = await sql`SELECT COUNT(*)::int as count FROM notification_queue WHERE status='failed'`;
      [sentQueueMessagesMonth] = await sql`SELECT COUNT(*)::int as count FROM notification_queue WHERE status='sent' AND sent_at >= date_trunc('month', current_date)`;
    } catch(e) {}

    // 4. Follow-up Actions
    const activeLeadStatus = ['new', 'contacted', 'qualified', 'proposal', 'inspection_scheduled', 'work_started', 'approved', 'quoted'];
    
    // Using a single CTE/query to get all relevant follow-ups to save DB hits
    let rawFollowUps = [];
    let scheduledActivities = [];
    try {
      rawFollowUps = await sql`
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
        WHERE l.status = ANY(${activeLeadStatus})
          AND a.type = 'follow_up'
          AND a.follow_up_at >= date_trunc('day', NOW())
          AND a.follow_up_at < date_trunc('day', NOW() + INTERVAL '7 days')
        ORDER BY a.follow_up_at ASC
      `;
      scheduledActivities = rawFollowUps.map(row => ({
        id: row.activity_id,
        title: row.title,
        description: row.description,
        follow_up_at: row.follow_up_at,
        lead_id: row.lead_id,
        lead_name: row.lead_name,
        lead_phone: row.lead_phone,
        lead_type: row.lead_type,
        lead_status: row.lead_status,
      }));
    } catch(e) {}

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
        referredLeads: referredLeads.count,
        convertedReferrals: convertedReferrals.count,
        referralExpected: referralExpected.total || 0,
        referralPaid: referralPaid.total || 0,
        propertyInquiries: propertyInquiries.count,
      },
      breakdowns: {
        leadTypes: leadTypeBreakdown,
        statuses: statusBreakdown,
      },
      revenue: rev,
      invoices: inv,
      alerts: {
        pendingPartners: pendingPartners.count,
        urgentMaintenance: urgentMaintenance.count,
        draftListings: draftListings.count,
        overdueFollowups: overdueFollowups.count,
        pendingQueueApprovals: pendingQueueApprovals.count,
        failedQueueMessages: failedQueueMessages.count,
        overdueFollowUps: followUps.overdue.length,
        todayFollowUps: followUps.today.length,
      },
      queue: {
        sentThisMonth: sentQueueMessagesMonth.count
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
    console.error('[ops dashboard GET]', e.message, e.stack);
    return NextResponse.json({ success: false, error: e.message, stack: e.stack }, { status: 500 });
  }
}
