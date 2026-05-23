-- Migration 006: Add strict owner_user_id to properties
-- Run: node --env-file=.env.local migrations/run_006.js

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS owner_user_id UUID REFERENCES users(id);

CREATE INDEX IF NOT EXISTS idx_properties_owner_user_id ON properties(owner_user_id);
