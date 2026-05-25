-- Migration 017: Link users table to partners
-- Safe additive migration — adds partner_id FK to existing users table

ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES partners(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_users_partner_id ON users(partner_id);
