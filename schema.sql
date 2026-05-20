-- Buildogram Full Database Schema
-- Run this against your Neon DB to initialize all tables

-- Users (all roles: client, ops_admin, ops_pm, ops_engineer, partner_contractor, partner_supplier)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client','ops_admin','ops_pm','ops_engineer','partner_contractor','partner_supplier')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cost Config (per city x spec level rate tables for estimator)
CREATE TABLE IF NOT EXISTS cost_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  spec_level TEXT NOT NULL CHECK (spec_level IN ('basic','standard','premium')),
  rate_per_sqft_min NUMERIC NOT NULL,
  rate_per_sqft_max NUMERIC NOT NULL,
  structure_pct NUMERIC DEFAULT 50,
  finishes_pct NUMERIC DEFAULT 35,
  others_pct NUMERIC DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL DEFAULT 'Chennai',
  locality TEXT,
  plot_area_sqft NUMERIC,
  floors TEXT,
  spec_level TEXT,
  rough_budget NUMERIC,
  estimated_cost_min NUMERIC,
  estimated_cost_max NUMERIC,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','proposal','won','lost')),
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  client_id UUID REFERENCES users(id) NOT NULL,
  pm_id UUID REFERENCES users(id),
  site_engineer_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT DEFAULT 'Chennai',
  locality TEXT,
  plot_area_sqft NUMERIC,
  built_up_area_sqft NUMERIC,
  floors TEXT,
  spec_level TEXT,
  start_date DATE,
  expected_end_date DATE,
  actual_end_date DATE,
  status TEXT DEFAULT 'design' CHECK (status IN ('design','boq_approval','execution','handover','complete','on_hold')),
  total_contract_value NUMERIC,
  completion_pct NUMERIC DEFAULT 0,
  cover_image_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOQ Items
CREATE TABLE IF NOT EXISTS boq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  activity TEXT NOT NULL,
  unit TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 0,
  rate NUMERIC NOT NULL DEFAULT 0,
  amount NUMERIC GENERATED ALWAYS AS (quantity * rate) STORED,
  spec_level TEXT,
  version_no INTEGER DEFAULT 1,
  is_approved BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_no INTEGER NOT NULL,
  planned_date DATE,
  actual_date DATE,
  completion_pct NUMERIC DEFAULT 0,
  payment_trigger_pct NUMERIC DEFAULT 0,
  payment_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','qc_pending','complete')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  client_id UUID REFERENCES users(id),
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','initiated','paid','failed','refunded')),
  payment_method TEXT,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  description TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QC Templates
CREATE TABLE IF NOT EXISTS qc_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QC Submissions
CREATE TABLE IF NOT EXISTS qc_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES qc_templates(id),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  submitted_by UUID REFERENCES users(id),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  results JSONB NOT NULL DEFAULT '[]',
  overall_pass BOOLEAN DEFAULT FALSE,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  review_notes TEXT
);

-- Progress Logs
CREATE TABLE IF NOT EXISTS progress_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  logged_by UUID REFERENCES users(id),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  photos JSONB DEFAULT '[]',
  geo_lat NUMERIC,
  geo_lng NUMERIC,
  weather TEXT,
  workers_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Issues
CREATE TABLE IF NOT EXISTS issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  raised_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','critical')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  photos JSONB DEFAULT '[]',
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents (drawings, approvals, contracts)
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('floor_plan','elevation','structural','electrical','plumbing','contract','boq','approval','other')),
  file_url TEXT NOT NULL,
  public_id TEXT,
  uploaded_by UUID REFERENCES users(id),
  version INTEGER DEFAULT 1,
  is_shared_with_client BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contractors (partner profiles)
CREATE TABLE IF NOT EXISTS contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  company_name TEXT,
  gst_number TEXT,
  license_number TEXT,
  specializations TEXT[] DEFAULT '{}',
  city TEXT DEFAULT 'Chennai',
  rating NUMERIC DEFAULT 0,
  total_projects INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','verified','suspended')),
  documents JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Contractors (many-to-many)
CREATE TABLE IF NOT EXISTS project_contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  contractor_id UUID REFERENCES contractors(id),
  role TEXT,
  assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Materials
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  rate NUMERIC NOT NULL,
  supplier TEXT,
  brand TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchase Orders
CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  supplier_id UUID REFERENCES users(id),
  po_number TEXT UNIQUE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','sent','confirmed','delivered','cancelled')),
  items JSONB NOT NULL DEFAULT '[]',
  total_amount NUMERIC DEFAULT 0,
  expected_delivery DATE,
  actual_delivery DATE,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES users(id),
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Projects (public case studies)
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  title TEXT NOT NULL,
  description TEXT,
  city TEXT DEFAULT 'Chennai',
  project_type TEXT,
  area_sqft NUMERIC,
  floors TEXT,
  spec_level TEXT,
  images JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AMC (Annual Maintenance Contracts)
CREATE TABLE IF NOT EXISTS amc_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES users(id),
  plan TEXT CHECK (plan IN ('basic','standard','premium')),
  start_date DATE,
  end_date DATE,
  annual_fee NUMERIC,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','expired','cancelled')),
  services JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Warranty Claims
CREATE TABLE IF NOT EXISTS warranty_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  photos JSONB DEFAULT '[]',
  status TEXT DEFAULT 'open' CHECK (status IN ('open','under_review','in_progress','resolved','rejected')),
  assigned_to UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info','success','warning','error','payment','qc','progress')),
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed: Cost Config for Chennai
INSERT INTO cost_config (city, spec_level, rate_per_sqft_min, rate_per_sqft_max) VALUES
  ('Chennai', 'basic', 1600, 1900),
  ('Chennai', 'standard', 1900, 2400),
  ('Chennai', 'premium', 2400, 3500),
  ('Coimbatore', 'basic', 1500, 1800),
  ('Coimbatore', 'standard', 1800, 2200),
  ('Coimbatore', 'premium', 2200, 3200),
  ('Madurai', 'basic', 1400, 1700),
  ('Madurai', 'standard', 1700, 2100),
  ('Madurai', 'premium', 2100, 3000)
ON CONFLICT DO NOTHING;

-- Seed: Default Ops Admin
INSERT INTO users (name, email, phone, password_hash, role) VALUES
  ('Buildogram Admin', 'admin@buildogram.in', '9999999999',
   '$2b$10$rQnVMqRGKJLFqOLVLQIFuO5GQqBpRk3kKkMpGdPHjk1EGiGgPGMkK', -- password: Admin@1234
   'ops_admin')
ON CONFLICT (email) DO NOTHING;
