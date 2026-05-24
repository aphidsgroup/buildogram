ALTER TABLE documents ADD COLUMN IF NOT EXISTS requires_consent BOOLEAN DEFAULT FALSE;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS consent_status TEXT DEFAULT 'pending' CHECK (consent_status IN ('pending', 'approved', 'rejected'));
ALTER TABLE documents ADD COLUMN IF NOT EXISTS consented_at TIMESTAMPTZ;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS consented_by UUID REFERENCES users(id);
