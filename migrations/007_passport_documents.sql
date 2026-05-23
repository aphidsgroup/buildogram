-- Migration 007: Passport Documents Table
-- Run: node --env-file=.env.local migrations/run_007.js

CREATE TABLE IF NOT EXISTS passport_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  visibility TEXT DEFAULT 'ops_only' CHECK (visibility IN ('ops_only', 'client_visible')),
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_passport_docs_property ON passport_documents(property_id);
CREATE INDEX IF NOT EXISTS idx_passport_docs_section ON passport_documents(section_key);
