-- Migration 005: Add JSONB column for detailed Property Passport sections
-- Run: node --env-file=.env.local migrations/run_005.js

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS passport_sections_data JSONB DEFAULT '{}';
