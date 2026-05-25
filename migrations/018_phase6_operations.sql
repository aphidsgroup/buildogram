-- Migration 018: Phase 6 Operations (Lead Unification, Activities, Notifications)
-- Run via: GET /api/ops/run-migration?file=018
-- Safe additive migration

-- ──────────────────────────────────────────────────────────────
-- 1. UPGRADE LEADS TABLE
-- ──────────────────────────────────────────────────────────────

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS assigned_partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  ADD COLUMN IF NOT EXISTS spam_status TEXT DEFAULT 'Not Spam' CHECK (spam_status IN ('Not Spam', 'Spam')),
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS partner_notes TEXT,
  ADD COLUMN IF NOT EXISTS requirement TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check;
ALTER TABLE leads ADD CONSTRAINT leads_lead_type_check CHECK (lead_type IN (
  'construction', 'boq_audit', 'plan_review', 'material_quote', 'partner_application',
  'rental_listing', 'resale_listing', 'property_passport', 'maintenance', 'general',
  'partner_enquiry', 'property_inquiry', 'property_listing'
));

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check CHECK (status IN (
  'new', 'New', 'contacted', 'Contacted', 'qualified', 'proposal', 'won', 'Won', 'lost', 'Lost', 
  'site_visit', 'Site Visit', 'quotation_sent', 'Quotation Sent', 'negotiation', 'Negotiation', 'Assigned'
));

CREATE INDEX IF NOT EXISTS idx_leads_assigned_partner ON leads(assigned_partner_id);
CREATE INDEX IF NOT EXISTS idx_leads_partner ON leads(partner_id);
CREATE INDEX IF NOT EXISTS idx_leads_spam_status ON leads(spam_status);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON leads(follow_up_date);

-- ──────────────────────────────────────────────────────────────
-- 2. MIGRATE EXISTING PARTNER ENQUIRIES TO LEADS
-- ──────────────────────────────────────────────────────────────

-- This is a one-time migration to move existing partner_enquiries into leads safely
INSERT INTO leads (
  partner_id, name, phone, email, requirement, locality, rough_budget, 
  message, source_page, source, status, internal_notes, category, lead_type, created_at, updated_at
)
SELECT 
  partner_id, customer_name, phone, email, requirement, location, NULL, -- Budget range in partner_enquiries is TEXT, rough_budget is numeric. We'll store budget in metadata or skip it.
  message, source_page, source_type, status, notes, category, 'partner_enquiry', created_at, updated_at
FROM partner_enquiries
WHERE NOT EXISTS (
  SELECT 1 FROM leads l WHERE l.phone = partner_enquiries.phone AND l.created_at = partner_enquiries.created_at
);

-- ──────────────────────────────────────────────────────────────
-- 3. LEAD ACTIVITIES TIMELINE
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  actor_type TEXT NOT NULL CHECK (actor_type IN ('ops_admin', 'partner', 'system')),
  actor_id UUID, -- Can be users.id or partners.id
  actor_name TEXT,
  action TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  note TEXT,
  is_partner_visible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created ON lead_activities(created_at DESC);

-- ──────────────────────────────────────────────────────────────
-- 4. NOTIFICATIONS
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_partner ON notifications(partner_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read) WHERE is_read = FALSE;

