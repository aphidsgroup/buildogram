import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';

async function run() {
  const queries = [
    { name: "leadsCount", q: sql`SELECT COUNT(*)::int as count FROM leads` },
    { name: "newLeadsMonth", q: sql`SELECT COUNT(*)::int as count FROM leads WHERE created_at >= date_trunc('month', current_date)` },
    { name: "matOrderVal", q: sql`SELECT SUM(CAST(NULLIF(metadata->>'estimated_order_value', '') AS numeric)) as total FROM leads WHERE lead_type='material_quote'` },
    { name: "matComm", q: sql`SELECT SUM(CAST(NULLIF(metadata->>'expected_commission', '') AS numeric)) as total FROM leads WHERE lead_type='material_quote'` },
    { name: "referralExpected", q: sql`SELECT SUM(CAST(NULLIF(metadata->>'referral_commission_expected', '') AS numeric)) as total FROM leads` },
    { name: "referralPaid", q: sql`SELECT SUM(CAST(NULLIF(metadata->>'referral_commission_paid', '') AS numeric)) as total FROM leads` },
    { name: "referredLeads", q: sql`SELECT COUNT(*)::int as count FROM leads WHERE metadata->>'referral_partner_lead_id' IS NOT NULL` },
    { name: "convertedReferrals", q: sql`SELECT COUNT(*)::int as count FROM leads WHERE metadata->>'referral_status'='converted'` },
    { name: "leadTypeBreakdown", q: sql`
      SELECT lead_type, COUNT(*)::int as count 
      FROM leads 
      GROUP BY lead_type
      ORDER BY count DESC
    ` },
    { name: "statusBreakdown", q: sql`
      SELECT status, COUNT(*)::int as count 
      FROM leads 
      GROUP BY status
      ORDER BY count DESC
    ` },
    { name: "recentMaterialQuotes", q: sql`
      SELECT id, name, created_at, metadata->>'material_category' as category, status 
      FROM leads 
      WHERE lead_type='material_quote' 
      ORDER BY created_at DESC LIMIT 5
    ` },
    { name: "recentPartners", q: sql`
      SELECT id, name, created_at, metadata->>'partner_category' as category, metadata->>'verification_status' as v_status 
      FROM leads 
      WHERE lead_type='partner_application' 
      ORDER BY created_at DESC LIMIT 5
    ` },
    { name: "recentMaintenance", q: sql`
      SELECT id, name, created_at, metadata->>'issue_category' as category, metadata->>'maintenance_status' as m_status 
      FROM leads 
      WHERE lead_type='maintenance' 
      ORDER BY created_at DESC LIMIT 5
    ` },
    { name: "recentListings", q: sql`
      SELECT id, name, created_at, metadata->>'listing_type' as type, metadata->>'public_status' as p_status 
      FROM leads 
      WHERE lead_type='property_listing' 
      ORDER BY created_at DESC LIMIT 5
    ` }
  ];

  for (const query of queries) {
    try {
      await query.q;
      console.log(`✅ ${query.name}`);
    } catch(e) {
      console.error(`❌ ${query.name} FAILED:`, e.message);
    }
  }

  process.exit(0);
}

run();
