-- Migration 001: Upgrade leads table for full ecosystem
-- Safe additive migration - no existing columns removed or changed
-- Run against Neon DB

-- Add lead_type to categorize all ecosystem inquiries
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'construction'
    CHECK (lead_type IN (
      'construction',
      'boq_audit',
      'plan_review',
      'material_quote',
      'partner_application',
      'rental_listing',
      'resale_listing',
      'property_passport',
      'maintenance',
      'general'
    ));

-- Add message field for open-ended inquiry text
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS message TEXT;

-- Track which page the lead was submitted from
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS source_page TEXT;

-- Flexible JSONB for type-specific metadata (plot size, material list, etc.)
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- CRM follow-up scheduling
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS follow_up_date DATE;

-- Track why a lead was lost
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS lost_reason TEXT;

-- Backfill existing rows: all existing leads are construction type
UPDATE leads SET lead_type = 'construction' WHERE lead_type IS NULL;
