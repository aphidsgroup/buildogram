-- Migration 002: Properties table for Property Passport™ records
-- Run: node migrations/run_002.js

-- Properties table (the core of Property Passport™)
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  title TEXT NOT NULL,                        -- e.g. "2400 sqft G+1 Home, Porur"
  property_type TEXT NOT NULL CHECK (property_type IN (
    'home', 'villa', 'apartment', 'commercial', 'plot', 'other'
  )),
  owner_name TEXT NOT NULL,
  owner_phone TEXT NOT NULL,
  owner_email TEXT,

  -- Location
  address TEXT,
  locality TEXT,
  city TEXT DEFAULT 'Chennai',
  pincode TEXT,

  -- Physical specs
  plot_area_sqft NUMERIC,
  built_up_area_sqft NUMERIC,
  floors TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  facing TEXT,

  -- Construction linkage
  project_id UUID REFERENCES projects(id),    -- linked to construction project if built by Buildogram
  spec_level TEXT,
  construction_year INTEGER,
  handover_date DATE,

  -- Passport status
  passport_status TEXT DEFAULT 'pending' CHECK (passport_status IN (
    'pending', 'collecting', 'verifying', 'active', 'archived'
  )),
  passport_completeness INTEGER DEFAULT 0,    -- 0-100 completeness score

  -- Record sections (what's documented)
  has_legal_docs BOOLEAN DEFAULT FALSE,
  has_drawings BOOLEAN DEFAULT FALSE,
  has_boq BOOLEAN DEFAULT FALSE,
  has_materials BOOLEAN DEFAULT FALSE,
  has_quality_checks BOOLEAN DEFAULT FALSE,
  has_progress_media BOOLEAN DEFAULT FALSE,
  has_warranty BOOLEAN DEFAULT FALSE,
  has_maintenance_history BOOLEAN DEFAULT FALSE,

  -- Listing status
  listing_type TEXT CHECK (listing_type IN ('none', 'rental', 'resale')),
  listing_status TEXT DEFAULT 'unlisted' CHECK (listing_status IN (
    'unlisted', 'listed', 'under_negotiation', 'rented', 'sold'
  )),
  listing_price NUMERIC,
  listing_rent_monthly NUMERIC,

  -- Media
  cover_image_url TEXT,
  images JSONB DEFAULT '[]',

  -- Admin
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_properties_owner_phone ON properties(owner_phone);
CREATE INDEX IF NOT EXISTS idx_properties_passport_status ON properties(passport_status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
