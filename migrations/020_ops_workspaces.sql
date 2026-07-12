CREATE TABLE IF NOT EXISTS project_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  requirement_type TEXT,
  project_location TEXT,
  current_stage TEXT DEFAULT 'Requirement Collected',
  plot_size TEXT,
  budget_range TEXT,
  scope_summary TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_project_requirements_lead ON project_requirements(lead_id);

CREATE TABLE IF NOT EXISTS boq_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  review_status TEXT NOT NULL DEFAULT 'under_review',
  project_type TEXT,
  built_up_area TEXT,
  drawing_status TEXT,
  boq_status TEXT,
  engineer_summary TEXT,
  risk_items TEXT,
  missing_items TEXT,
  cost_observation TEXT,
  review_notes TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_boq_reviews_lead ON boq_reviews(lead_id);

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  proposal_type TEXT,
  proposal_status TEXT NOT NULL DEFAULT 'draft',
  summary TEXT,
  scope_of_work TEXT,
  estimated_value TEXT,
  timeline TEXT,
  payment_terms TEXT,
  exclusions TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_proposals_lead ON proposals(lead_id);

CREATE TABLE IF NOT EXISTS lead_document_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  requirement_id UUID REFERENCES project_requirements(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL CHECK (file_size > 0 AND file_size <= 10485760),
  file_url TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'ops_only' CHECK (visibility IN ('ops_only', 'partner_only', 'client_visible')),
  status TEXT NOT NULL DEFAULT 'uploaded',
  uploaded_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_lead_document_assets_lead ON lead_document_assets(lead_id);

CREATE TABLE IF NOT EXISTS partner_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  partner_type TEXT,
  match_status TEXT NOT NULL DEFAULT 'shortlisted',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_partner_matches_lead_partner UNIQUE (lead_id, partner_id)
);
CREATE INDEX IF NOT EXISTS idx_partner_matches_lead ON partner_matches(lead_id);
