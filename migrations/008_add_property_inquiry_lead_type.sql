-- Migration 008: Update lead_type constraint to include 'property_inquiry'

-- 1. Drop existing constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_lead_type_check;

-- 2. Add new constraint with 'property_inquiry'
ALTER TABLE leads ADD CONSTRAINT leads_lead_type_check CHECK (
  lead_type IN (
    'construction',
    'boq_audit',
    'plan_review',
    'material_quote',
    'partner_application',
    'rental_listing',
    'resale_listing',
    'property_passport',
    'maintenance',
    'general',
    'property_listing',
    'property_inquiry'
  )
);
