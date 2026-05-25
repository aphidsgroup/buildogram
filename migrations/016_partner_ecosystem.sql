-- Migration 016: Partner Ecosystem Tables
-- Run via: GET /api/ops/run-migration?file=016
-- Safe additive migration - creates new tables, does NOT modify existing ones

-- ──────────────────────────────────────────────────────────────
-- 1. PARTNERS (core registry)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT UNIQUE NOT NULL,
  company_name     TEXT NOT NULL,
  category         TEXT NOT NULL CHECK (category IN (
    'Builder', 'Architect', 'Interior Designer', 'Material Supplier',
    'Home Automation', 'Solar', 'Elevators', 'Waterproofing'
  )),
  short_description TEXT,
  full_description  TEXT,
  logo_url          TEXT,
  cover_url         TEXT,
  location          TEXT,
  service_areas     TEXT,
  years_experience  INTEGER,
  contact_person    TEXT,
  phone             TEXT,
  email             TEXT,
  whatsapp          TEXT,
  website           TEXT,
  services          TEXT[],
  specializations   TEXT[],
  certifications    TEXT[],
  brands_handled    TEXT[],
  project_types     TEXT[],
  approval_status   TEXT NOT NULL DEFAULT 'Pending Review' CHECK (approval_status IN (
    'Pending Review', 'Approved', 'Rejected', 'Suspended'
  )),
  active            BOOLEAN DEFAULT FALSE,
  featured          BOOLEAN DEFAULT FALSE,
  profile_completion INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partners_slug ON partners(slug);
CREATE INDEX IF NOT EXISTS idx_partners_category ON partners(category);
CREATE INDEX IF NOT EXISTS idx_partners_approval ON partners(approval_status);
CREATE INDEX IF NOT EXISTS idx_partners_featured ON partners(featured);

-- ──────────────────────────────────────────────────────────────
-- 2. PARTNER PORTFOLIO PROJECTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_portfolio (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id       UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  location         TEXT,
  description      TEXT,
  image_url        TEXT,
  video_url        TEXT,
  completion_year  INTEGER,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_portfolio_partner ON partner_portfolio(partner_id);

-- ──────────────────────────────────────────────────────────────
-- 3. PARTNER GALLERY IMAGES
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_gallery (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id  UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt         TEXT,
  caption     TEXT,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_gallery_partner ON partner_gallery(partner_id);

-- ──────────────────────────────────────────────────────────────
-- 4. PARTNER VIDEOS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_videos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id  UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  title       TEXT,
  url         TEXT NOT NULL,
  video_type  TEXT DEFAULT 'youtube',
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_videos_partner ON partner_videos(partner_id);

-- ──────────────────────────────────────────────────────────────
-- 5. PARTNER ENQUIRIES (public contact form)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_enquiries (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id     UUID REFERENCES partners(id) ON DELETE SET NULL,
  partner_slug   TEXT,
  partner_name   TEXT,
  category       TEXT,
  customer_name  TEXT NOT NULL,
  phone          TEXT NOT NULL,
  email          TEXT,
  requirement    TEXT,
  location       TEXT,
  budget_range   TEXT,
  message        TEXT,
  source_page    TEXT DEFAULT 'partner_profile',
  source_type    TEXT DEFAULT 'web',
  status         TEXT DEFAULT 'New' CHECK (status IN (
    'New', 'Assigned', 'Contacted', 'Site Visit',
    'Quotation Sent', 'Negotiation', 'Won', 'Lost'
  )),
  follow_up_date DATE,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_enquiries_partner ON partner_enquiries(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_enquiries_status ON partner_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_partner_enquiries_created ON partner_enquiries(created_at DESC);

-- ──────────────────────────────────────────────────────────────
-- 6. PARTNER PROJECTS (Partner OS projects)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_projects (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id           UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  project_name         TEXT NOT NULL,
  client_name          TEXT,
  location             TEXT,
  project_type         TEXT,
  start_date           DATE,
  target_completion    DATE,
  current_stage        TEXT,
  progress_percent     INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
  budget               NUMERIC,
  status               TEXT DEFAULT 'Planning' CHECK (status IN (
    'Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'
  )),
  notes                TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_projects_partner ON partner_projects(partner_id);

-- ──────────────────────────────────────────────────────────────
-- 7. BOQ (Bill of Quantities)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_boqs (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id         UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  project_id         UUID REFERENCES partner_projects(id) ON DELETE SET NULL,
  title              TEXT NOT NULL,
  package_type       TEXT DEFAULT 'standard',
  total_internal_cost NUMERIC DEFAULT 0,
  total_client_quote  NUMERIC DEFAULT 0,
  estimated_profit    NUMERIC DEFAULT 0,
  status             TEXT DEFAULT 'Draft' CHECK (status IN (
    'Draft', 'Sent to Client', 'Approved', 'Rejected', 'Revised'
  )),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_boqs_partner ON partner_boqs(partner_id);

-- ──────────────────────────────────────────────────────────────
-- 8. BOQ ITEMS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_boq_items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boq_id           UUID NOT NULL REFERENCES partner_boqs(id) ON DELETE CASCADE,
  category         TEXT,
  item_name        TEXT NOT NULL,
  quantity         NUMERIC DEFAULT 0,
  unit             TEXT DEFAULT 'sqft',
  material_cost    NUMERIC DEFAULT 0,
  labour_cost      NUMERIC DEFAULT 0,
  equipment_cost   NUMERIC DEFAULT 0,
  wastage_percent  NUMERIC DEFAULT 0,
  margin_percent   NUMERIC DEFAULT 0,
  gst_percent      NUMERIC DEFAULT 18,
  total_amount     NUMERIC DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_boq_items_boq ON partner_boq_items(boq_id);

-- ──────────────────────────────────────────────────────────────
-- 9. SITE LOGBOOK
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_site_logs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id        UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  project_id        UUID REFERENCES partner_projects(id) ON DELETE SET NULL,
  log_date          DATE NOT NULL DEFAULT CURRENT_DATE,
  work_completed    TEXT,
  labour_count      INTEGER DEFAULT 0,
  materials_received TEXT,
  issues_faced      TEXT,
  tomorrow_plan     TEXT,
  photo_url         TEXT,
  video_url         TEXT,
  client_visible    BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_site_logs_partner ON partner_site_logs(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_site_logs_date ON partner_site_logs(log_date DESC);

-- ──────────────────────────────────────────────────────────────
-- 10. MATERIAL REQUESTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_material_requests (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id          UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  project_id          UUID REFERENCES partner_projects(id) ON DELETE SET NULL,
  material_name       TEXT NOT NULL,
  quantity            NUMERIC DEFAULT 0,
  unit                TEXT DEFAULT 'Nos',
  required_date       DATE,
  priority            TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  status              TEXT DEFAULT 'Requested' CHECK (status IN (
    'Requested', 'Approved', 'Ordered', 'Delivered', 'Used', 'Cancelled'
  )),
  vendor_quote_status TEXT DEFAULT 'Pending',
  best_rate_request   BOOLEAN DEFAULT FALSE,
  notes               TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_material_requests_partner ON partner_material_requests(partner_id);

-- ──────────────────────────────────────────────────────────────
-- 11. DOCUMENTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partner_documents (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id     UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  project_id     UUID REFERENCES partner_projects(id) ON DELETE SET NULL,
  document_name  TEXT NOT NULL,
  document_type  TEXT,
  file_url       TEXT,
  status         TEXT DEFAULT 'Draft' CHECK (status IN (
    'Draft', 'Sent to Client', 'Viewed', 'Approved', 'Rejected', 'Revision Requested'
  )),
  version        TEXT DEFAULT '1.0',
  uploaded_date  DATE DEFAULT CURRENT_DATE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_documents_partner ON partner_documents(partner_id);

-- ──────────────────────────────────────────────────────────────
-- TRIGGER: auto-update updated_at timestamps
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_partners_updated_at') THEN
    CREATE TRIGGER trg_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_partner_enquiries_updated_at') THEN
    CREATE TRIGGER trg_partner_enquiries_updated_at BEFORE UPDATE ON partner_enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_partner_projects_updated_at') THEN
    CREATE TRIGGER trg_partner_projects_updated_at BEFORE UPDATE ON partner_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;
