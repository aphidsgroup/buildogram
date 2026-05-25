require('dotenv').config({ path: '../.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Running Migration 018...');
  
  const stmts = [
    `ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS assigned_partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
      ADD COLUMN IF NOT EXISTS spam_status TEXT DEFAULT 'Not Spam' CHECK (spam_status IN ('Not Spam', 'Spam')),
      ADD COLUMN IF NOT EXISTS internal_notes TEXT,
      ADD COLUMN IF NOT EXISTS partner_notes TEXT,
      ADD COLUMN IF NOT EXISTS requirement TEXT,
      ADD COLUMN IF NOT EXISTS category TEXT`,
      
    `ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check`,
    
    `ALTER TABLE leads ADD CONSTRAINT leads_lead_type_check CHECK (lead_type IN (
      'construction', 'boq_audit', 'plan_review', 'material_quote', 'partner_application',
      'rental_listing', 'resale_listing', 'property_passport', 'maintenance', 'general',
      'partner_enquiry', 'property_inquiry', 'property_listing'
    ))`,
    
    `ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check`,
    
    `ALTER TABLE leads ADD CONSTRAINT leads_status_check CHECK (status IN (
      'new', 'New', 'contacted', 'Contacted', 'qualified', 'proposal', 'won', 'Won', 'lost', 'Lost', 
      'site_visit', 'Site Visit', 'quotation_sent', 'Quotation Sent', 'negotiation', 'Negotiation', 'Assigned'
    ))`,
    
    `CREATE INDEX IF NOT EXISTS idx_leads_assigned_partner ON leads(assigned_partner_id)`,
    `CREATE INDEX IF NOT EXISTS idx_leads_partner ON leads(partner_id)`,
    `CREATE INDEX IF NOT EXISTS idx_leads_spam_status ON leads(spam_status)`,
    `CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority)`,
    `CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads(follow_up_date)`,
    
    `INSERT INTO leads (
      partner_id, name, phone, email, requirement, locality, rough_budget, 
      message, source_page, source, status, internal_notes, category, lead_type, created_at, updated_at
    )
    SELECT 
      partner_id, customer_name, phone, email, requirement, location, NULL,
      message, source_page, source_type, status, notes, category, 'partner_enquiry', created_at, updated_at
    FROM partner_enquiries
    WHERE NOT EXISTS (
      SELECT 1 FROM leads l WHERE l.phone = partner_enquiries.phone AND l.created_at = partner_enquiries.created_at
    )`,
    
    `CREATE TABLE IF NOT EXISTS lead_activities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
      actor_type TEXT NOT NULL CHECK (actor_type IN ('ops_admin', 'partner', 'system')),
      actor_id UUID,
      actor_name TEXT,
      action TEXT NOT NULL,
      old_value TEXT,
      new_value TEXT,
      note TEXT,
      is_partner_visible BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    `CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id)`,
    `CREATE INDEX IF NOT EXISTS idx_lead_activities_created ON lead_activities(created_at DESC)`,
    
    `CREATE TABLE IF NOT EXISTS notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    `ALTER TABLE notifications 
      ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
      ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'info',
      ADD COLUMN IF NOT EXISTS title TEXT DEFAULT 'Notification',
      ADD COLUMN IF NOT EXISTS link TEXT`,
    
    `CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_notifications_partner ON notifications(partner_id)`,
    `CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read) WHERE is_read = FALSE`
  ];

  for (let i = 0; i < stmts.length; i++) {
    try {
      console.log(`Executing ${i+1}/${stmts.length}...`);
      await sql.query(stmts[i]);
    } catch (e) {
      console.error(`Error on stmt ${i+1}:`, e.message);
      process.exit(1);
    }
  }

  console.log('Migration 018 complete!');
}

run().catch(console.error);
