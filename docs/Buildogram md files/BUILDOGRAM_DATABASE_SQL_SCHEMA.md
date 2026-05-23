# BUILDOGRAM DATABASE SQL SCHEMA

# Purpose

This document provides PostgreSQL-ready schema definitions for Buildogram.

It covers the first major platform build:

- Users and roles
- Leads and CRM
- Projects
- BOQ
- Milestones
- Progress logs
- Issues
- Quality system
- Materials and suppliers
- Purchase orders
- Documents
- Payments
- Property Passport
- AI records
- Partners
- Notifications
- Audit logs

---

# Important Notes

This schema is a strong starting point.

Before production implementation:

- Review naming conventions with the development team
- Add migration tooling
- Add seed data
- Add row-level security if needed
- Add backups
- Add archival strategy
- Add soft-delete where required

---

# PostgreSQL Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

---

# 1. ENUM TYPES

```sql
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'ops_admin',
  'sales_manager',
  'project_manager',
  'site_engineer',
  'customer',
  'contractor',
  'architect',
  'supplier',
  'finance',
  'auditor',
  'content_manager'
);

CREATE TYPE user_status AS ENUM (
  'active',
  'inactive',
  'suspended',
  'pending'
);

CREATE TYPE lead_type AS ENUM (
  'construction',
  'boq_audit',
  'plan_review',
  'material',
  'partner',
  'rental',
  'resale',
  'maintenance'
);

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'qualified',
  'consultation_scheduled',
  'consultation_completed',
  'site_visit_scheduled',
  'site_visit_completed',
  'proposal_pending',
  'proposal_sent',
  'negotiation',
  'won',
  'lost',
  'dormant'
);

CREATE TYPE project_status AS ENUM (
  'planning',
  'active',
  'on_hold',
  'delayed',
  'completed',
  'cancelled'
);

CREATE TYPE approval_status AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'superseded'
);

CREATE TYPE inspection_result AS ENUM (
  'pass',
  'fail',
  'not_applicable',
  'needs_rework'
);

CREATE TYPE issue_severity AS ENUM (
  'low',
  'medium',
  'high',
  'critical'
);

CREATE TYPE issue_status AS ENUM (
  'open',
  'in_progress',
  'resolved',
  'closed',
  'reopened'
);

CREATE TYPE document_visibility AS ENUM (
  'internal',
  'customer_visible',
  'partner_visible',
  'public'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'due',
  'paid',
  'overdue',
  'cancelled'
);

CREATE TYPE verification_status AS ENUM (
  'unverified',
  'basic_verified',
  'verified',
  'preferred',
  'rejected'
);
```

---

# 2. USERS AND ACCESS CONTROL

## users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  status user_status NOT NULL DEFAULT 'active',
  preferred_language VARCHAR(20) DEFAULT 'en',
  profile_image_url TEXT,
  mfa_enabled BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## permissions

```sql
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  permission_key VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## role_permissions

```sql
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission_id)
);
```

## user_permissions

```sql
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  granted_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, permission_id)
);
```

---

# 3. CRM TABLES

## leads

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(100),
  locality VARCHAR(150),
  lead_type lead_type NOT NULL,
  status lead_status DEFAULT 'new',
  source VARCHAR(100),
  campaign_id VARCHAR(100),
  requirement TEXT,
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  plot_area NUMERIC(12,2),
  built_up_area NUMERIC(12,2),
  project_stage VARCHAR(100),
  lead_score INTEGER DEFAULT 0,
  assigned_to UUID REFERENCES users(id),
  next_followup_at TIMESTAMPTZ,
  lost_reason TEXT,
  converted_project_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## lead_activities

```sql
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  notes TEXT,
  next_followup_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## lead_documents

```sql
CREATE TABLE lead_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  document_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 4. PROJECT TABLES

## projects

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_code VARCHAR(50) UNIQUE,
  project_name VARCHAR(200) NOT NULL,
  lead_id UUID REFERENCES leads(id),
  customer_id UUID REFERENCES users(id),
  project_type VARCHAR(100),
  construction_type VARCHAR(100),
  property_use VARCHAR(100),
  city VARCHAR(100),
  locality VARCHAR(150),
  address TEXT,
  plot_area NUMERIC(12,2),
  built_up_area NUMERIC(12,2),
  floors VARCHAR(50),
  status project_status DEFAULT 'planning',
  project_manager_id UUID REFERENCES users(id),
  site_engineer_id UUID REFERENCES users(id),
  planned_start_date DATE,
  planned_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,
  total_budget NUMERIC(14,2),
  quality_score NUMERIC(5,2),
  progress_score NUMERIC(5,2),
  budget_health_score NUMERIC(5,2),
  delay_risk_score NUMERIC(5,2),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## project_users

```sql
CREATE TABLE project_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_role VARCHAR(100) NOT NULL,
  assigned_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id, project_role)
);
```

## project_health_snapshots

```sql
CREATE TABLE project_health_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  progress_score NUMERIC(5,2),
  quality_score NUMERIC(5,2),
  budget_score NUMERIC(5,2),
  schedule_score NUMERIC(5,2),
  risk_score NUMERIC(5,2),
  notes TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 5. MILESTONES

```sql
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  planned_start_date DATE,
  planned_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  progress_percentage NUMERIC(5,2) DEFAULT 0,
  payment_percentage NUMERIC(5,2),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 6. BOQ TABLES

## boq_versions

```sql
CREATE TABLE boq_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  version_no INTEGER NOT NULL,
  version_name VARCHAR(150),
  total_amount NUMERIC(14,2) DEFAULT 0,
  status approval_status DEFAULT 'draft',
  notes TEXT,
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, version_no)
);
```

## boq_items

```sql
CREATE TABLE boq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  boq_version_id UUID REFERENCES boq_versions(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL,
  work_package VARCHAR(150),
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  unit VARCHAR(50) NOT NULL,
  quantity NUMERIC(14,3) NOT NULL DEFAULT 0,
  rate NUMERIC(14,2) NOT NULL DEFAULT 0,
  amount NUMERIC(14,2) GENERATED ALWAYS AS (quantity * rate) STORED,
  material_brand VARCHAR(150),
  material_grade VARCHAR(100),
  wastage_percentage NUMERIC(5,2) DEFAULT 0,
  tax_percentage NUMERIC(5,2) DEFAULT 0,
  supplier_id UUID,
  market_rate_reference NUMERIC(14,2),
  variance_reason TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## boq_ai_audits

```sql
CREATE TABLE boq_ai_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  boq_version_id UUID REFERENCES boq_versions(id) ON DELETE CASCADE,
  trust_score NUMERIC(5,2),
  risk_score NUMERIC(5,2),
  missing_items JSONB DEFAULT '[]'::jsonb,
  overpriced_items JSONB DEFAULT '[]'::jsonb,
  underpriced_risks JSONB DEFAULT '[]'::jsonb,
  duplicate_items JSONB DEFAULT '[]'::jsonb,
  quantity_anomalies JSONB DEFAULT '[]'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  generated_by UUID REFERENCES users(id),
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 7. PROGRESS AND MEDIA

## progress_logs

```sql
CREATE TABLE progress_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  log_date DATE NOT NULL,
  work_completed TEXT,
  progress_percentage NUMERIC(5,2),
  worker_count INTEGER,
  materials_used TEXT,
  next_day_plan TEXT,
  blockers TEXT,
  safety_notes TEXT,
  visibility document_visibility DEFAULT 'customer_visible',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## construction_media

```sql
CREATE TABLE construction_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  progress_log_id UUID REFERENCES progress_logs(id) ON DELETE SET NULL,
  media_type VARCHAR(50) NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  captured_by UUID REFERENCES users(id),
  captured_at TIMESTAMPTZ,
  geo_lat NUMERIC(10,7),
  geo_lng NUMERIC(10,7),
  visibility document_visibility DEFAULT 'customer_visible',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 8. ISSUES

```sql
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  severity issue_severity DEFAULT 'medium',
  status issue_status DEFAULT 'open',
  raised_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,
  customer_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## issue_media

```sql
CREATE TABLE issue_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  media_id UUID REFERENCES construction_media(id) ON DELETE CASCADE,
  media_stage VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 9. QUALITY SYSTEM

## quality_categories

```sql
CREATE TABLE quality_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## quality_checkpoints

```sql
CREATE TABLE quality_checkpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES quality_categories(id) ON DELETE CASCADE,
  checkpoint_code VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  standard_reference TEXT,
  severity issue_severity DEFAULT 'medium',
  evidence_required JSONB DEFAULT '[]'::jsonb,
  applicable_project_type VARCHAR(100),
  customer_visible BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## quality_inspections

```sql
CREATE TABLE quality_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  category_id UUID REFERENCES quality_categories(id),
  inspector_id UUID REFERENCES users(id),
  inspection_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  overall_score NUMERIC(5,2),
  notes TEXT,
  submitted_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## quality_inspection_items

```sql
CREATE TABLE quality_inspection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id UUID REFERENCES quality_inspections(id) ON DELETE CASCADE,
  checkpoint_id UUID REFERENCES quality_checkpoints(id),
  result inspection_result DEFAULT 'not_applicable',
  remarks TEXT,
  corrective_action TEXT,
  customer_visible BOOLEAN DEFAULT TRUE,
  rework_required BOOLEAN DEFAULT FALSE,
  rework_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## quality_evidence

```sql
CREATE TABLE quality_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_item_id UUID REFERENCES quality_inspection_items(id) ON DELETE CASCADE,
  media_id UUID REFERENCES construction_media(id) ON DELETE SET NULL,
  document_id UUID,
  evidence_type VARCHAR(50),
  notes TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## quality_scores

```sql
CREATE TABLE quality_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category_id UUID REFERENCES quality_categories(id),
  category_score NUMERIC(5,2),
  overall_score NUMERIC(5,2),
  failed_critical_count INTEGER DEFAULT 0,
  rework_count INTEGER DEFAULT 0,
  evidence_completeness_score NUMERIC(5,2),
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 10. MATERIALS AND SUPPLIERS

## material_catalog

```sql
CREATE TABLE material_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  product_name VARCHAR(255) NOT NULL,
  brand VARCHAR(150),
  grade VARCHAR(100),
  specification TEXT,
  unit VARCHAR(50) NOT NULL,
  base_rate NUMERIC(14,2),
  gst_percentage NUMERIC(5,2),
  city VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## supplier_profiles

```sql
CREATE TABLE supplier_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  company_name VARCHAR(200) NOT NULL,
  contact_person VARCHAR(150),
  phone VARCHAR(20),
  email VARCHAR(255),
  gst_number VARCHAR(50),
  address TEXT,
  service_locations JSONB DEFAULT '[]'::jsonb,
  material_categories JSONB DEFAULT '[]'::jsonb,
  verification_status verification_status DEFAULT 'unverified',
  rating NUMERIC(3,2),
  performance_score NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## material_requests

```sql
CREATE TABLE material_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  requested_by UUID REFERENCES users(id),
  material_category VARCHAR(100) NOT NULL,
  brand_preference VARCHAR(150),
  grade VARCHAR(100),
  quantity NUMERIC(14,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  delivery_location TEXT,
  required_date DATE,
  status VARCHAR(50) DEFAULT 'open',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## supplier_quotes

```sql
CREATE TABLE supplier_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_request_id UUID REFERENCES material_requests(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES supplier_profiles(id),
  rate NUMERIC(14,2) NOT NULL,
  delivery_charge NUMERIC(14,2) DEFAULT 0,
  gst_percentage NUMERIC(5,2),
  total_amount NUMERIC(14,2),
  availability VARCHAR(100),
  delivery_date DATE,
  payment_terms TEXT,
  quote_status VARCHAR(50) DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## purchase_orders

```sql
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number VARCHAR(50) UNIQUE NOT NULL,
  project_id UUID REFERENCES projects(id),
  material_request_id UUID REFERENCES material_requests(id),
  supplier_id UUID REFERENCES supplier_profiles(id),
  selected_quote_id UUID REFERENCES supplier_quotes(id),
  total_amount NUMERIC(14,2),
  status VARCHAR(50) DEFAULT 'draft',
  delivery_date DATE,
  payment_terms TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## purchase_order_items

```sql
CREATE TABLE purchase_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
  material_id UUID REFERENCES material_catalog(id),
  item_name VARCHAR(255) NOT NULL,
  brand VARCHAR(150),
  grade VARCHAR(100),
  quantity NUMERIC(14,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  rate NUMERIC(14,2) NOT NULL,
  amount NUMERIC(14,2) GENERATED ALWAYS AS (quantity * rate) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## material_deliveries

```sql
CREATE TABLE material_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID REFERENCES purchase_orders(id),
  project_id UUID REFERENCES projects(id),
  supplier_id UUID REFERENCES supplier_profiles(id),
  delivered_quantity NUMERIC(14,3),
  vehicle_number VARCHAR(50),
  delivery_date TIMESTAMPTZ DEFAULT NOW(),
  received_by UUID REFERENCES users(id),
  checked_by UUID REFERENCES users(id),
  verification_status VARCHAR(50) DEFAULT 'pending',
  geo_lat NUMERIC(10,7),
  geo_lng NUMERIC(10,7),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## material_quality_checks

```sql
CREATE TABLE material_quality_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID REFERENCES material_deliveries(id) ON DELETE CASCADE,
  brand_verified BOOLEAN,
  grade_verified BOOLEAN,
  quantity_verified BOOLEAN,
  test_certificate_verified BOOLEAN,
  physical_condition VARCHAR(100),
  result VARCHAR(50),
  checked_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## material_commissions

```sql
CREATE TABLE material_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID REFERENCES purchase_orders(id),
  supplier_id UUID REFERENCES supplier_profiles(id),
  project_id UUID REFERENCES projects(id),
  gross_order_value NUMERIC(14,2),
  commission_percentage NUMERIC(5,2),
  commission_amount NUMERIC(14,2),
  status VARCHAR(50) DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 11. DOCUMENTS

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  uploaded_by UUID REFERENCES users(id),
  document_type VARCHAR(100),
  title VARCHAR(255),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255),
  file_size BIGINT,
  mime_type VARCHAR(100),
  visibility document_visibility DEFAULT 'internal',
  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,
  is_deleted BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 12. PAYMENTS AND FINANCE

## payments

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES milestones(id),
  payment_title VARCHAR(200),
  amount NUMERIC(14,2) NOT NULL,
  due_date DATE,
  status payment_status DEFAULT 'pending',
  paid_amount NUMERIC(14,2) DEFAULT 0,
  paid_at TIMESTAMPTZ,
  invoice_url TEXT,
  receipt_url TEXT,
  tax_breakup JSONB DEFAULT '{}'::jsonb,
  approval_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## payment_approvals

```sql
CREATE TABLE payment_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
  approved_by UUID REFERENCES users(id),
  approval_status approval_status DEFAULT 'submitted',
  approval_notes TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 13. PROPERTY PASSPORT

## property_passports

```sql
CREATE TABLE property_passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_code VARCHAR(50) UNIQUE NOT NULL,
  project_id UUID REFERENCES projects(id),
  owner_id UUID REFERENCES users(id),
  property_name VARCHAR(200),
  property_type VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  locality VARCHAR(150),
  pin_code VARCHAR(20),
  geo_lat NUMERIC(10,7),
  geo_lng NUMERIC(10,7),
  plot_area NUMERIC(12,2),
  built_up_area NUMERIC(12,2),
  floors VARCHAR(50),
  facing VARCHAR(50),
  road_width VARCHAR(50),
  status VARCHAR(100),
  trust_score NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## property_lifecycle_events

```sql
CREATE TABLE property_lifecycle_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID REFERENCES property_passports(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  event_title VARCHAR(200),
  event_description TEXT,
  event_date DATE,
  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## passport_share_links

```sql
CREATE TABLE passport_share_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID REFERENCES property_passports(id) ON DELETE CASCADE,
  share_code VARCHAR(100) UNIQUE NOT NULL,
  visibility_config JSONB DEFAULT '{}'::jsonb,
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## property_tours

```sql
CREATE TABLE property_tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID REFERENCES property_passports(id) ON DELETE CASCADE,
  tour_title VARCHAR(200),
  tour_type VARCHAR(100),
  tour_url TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## tour_hotspots

```sql
CREATE TABLE tour_hotspots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES property_tours(id) ON DELETE CASCADE,
  hotspot_title VARCHAR(200),
  hotspot_type VARCHAR(100),
  x_position NUMERIC(10,4),
  y_position NUMERIC(10,4),
  linked_media_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 14. AI TABLES

## ai_requests

```sql
CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  module VARCHAR(100) NOT NULL,
  input_type VARCHAR(100),
  input_reference TEXT,
  prompt TEXT,
  response JSONB,
  tokens_used INTEGER,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## ai_insights

```sql
CREATE TABLE ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  passport_id UUID REFERENCES property_passports(id),
  insight_type VARCHAR(100),
  insight_title VARCHAR(255),
  insight_body TEXT,
  confidence_score NUMERIC(5,2),
  severity issue_severity,
  action_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## project_risk_predictions

```sql
CREATE TABLE project_risk_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  risk_type VARCHAR(100),
  probability NUMERIC(5,2),
  impact VARCHAR(100),
  recommendation TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 15. PARTNER TABLES

## partner_profiles

```sql
CREATE TABLE partner_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  partner_type VARCHAR(100) NOT NULL,
  company_name VARCHAR(200),
  contact_person VARCHAR(150),
  phone VARCHAR(20),
  email VARCHAR(255),
  city VARCHAR(100),
  service_locations JSONB DEFAULT '[]'::jsonb,
  experience_years INTEGER,
  verification_status verification_status DEFAULT 'unverified',
  tier VARCHAR(50) DEFAULT 'listed',
  performance_score NUMERIC(5,2),
  profile_slug VARCHAR(200) UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## partner_leads

```sql
CREATE TABLE partner_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partner_profiles(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'assigned',
  commission_percentage NUMERIC(5,2),
  commission_amount NUMERIC(14,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 16. NOTIFICATIONS

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  notification_type VARCHAR(100),
  channel VARCHAR(50) DEFAULT 'in_app',
  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 17. CONTENT AND SEO

## content_pages

```sql
CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  page_type VARCHAR(100),
  seo_title VARCHAR(255),
  meta_description TEXT,
  content TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  city VARCHAR(100),
  locality VARCHAR(150),
  target_keyword VARCHAR(255),
  schema_json JSONB DEFAULT '{}'::jsonb,
  author_id UUID REFERENCES users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## faqs

```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES content_pages(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 18. AUDIT LOGS

```sql
CREATE TABLE system_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id),
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  action VARCHAR(100) NOT NULL,
  old_value JSONB,
  new_value JSONB,
  ip_address VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 19. INDEXES

```sql
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_type ON leads(lead_type);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_created_at ON leads(created_at);

CREATE INDEX idx_projects_customer ON projects(customer_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_pm ON projects(project_manager_id);
CREATE INDEX idx_projects_engineer ON projects(site_engineer_id);
CREATE INDEX idx_projects_city_locality ON projects(city, locality);

CREATE INDEX idx_milestones_project ON milestones(project_id);

CREATE INDEX idx_boq_versions_project ON boq_versions(project_id);
CREATE INDEX idx_boq_items_version ON boq_items(boq_version_id);
CREATE INDEX idx_boq_items_project ON boq_items(project_id);

CREATE INDEX idx_progress_project ON progress_logs(project_id);
CREATE INDEX idx_progress_date ON progress_logs(log_date);

CREATE INDEX idx_media_project ON construction_media(project_id);
CREATE INDEX idx_media_type ON construction_media(media_type);

CREATE INDEX idx_issues_project ON issues(project_id);
CREATE INDEX idx_issues_status ON issues(status);
CREATE INDEX idx_issues_severity ON issues(severity);

CREATE INDEX idx_quality_inspections_project ON quality_inspections(project_id);
CREATE INDEX idx_quality_items_inspection ON quality_inspection_items(inspection_id);

CREATE INDEX idx_material_catalog_category ON material_catalog(category);
CREATE INDEX idx_material_catalog_brand ON material_catalog(brand);
CREATE INDEX idx_material_requests_project ON material_requests(project_id);
CREATE INDEX idx_purchase_orders_project ON purchase_orders(project_id);

CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_type ON documents(document_type);

CREATE INDEX idx_payments_project ON payments(project_id);
CREATE INDEX idx_payments_status ON payments(status);

CREATE INDEX idx_passports_owner ON property_passports(owner_id);
CREATE INDEX idx_passports_project ON property_passports(project_id);
CREATE INDEX idx_passports_code ON property_passports(property_code);

CREATE INDEX idx_ai_requests_user ON ai_requests(user_id);
CREATE INDEX idx_ai_requests_project ON ai_requests(project_id);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

CREATE INDEX idx_content_slug ON content_pages(slug);
CREATE INDEX idx_content_page_type ON content_pages(page_type);
CREATE INDEX idx_content_city_locality ON content_pages(city, locality);

CREATE INDEX idx_audit_entity ON system_audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_actor ON system_audit_logs(actor_id);
```

---

# 20. UPDATED_AT TRIGGER

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Apply to important tables:

```sql
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_boq_versions_updated_at
BEFORE UPDATE ON boq_versions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issues_updated_at
BEFORE UPDATE ON issues
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_property_passports_updated_at
BEFORE UPDATE ON property_passports
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

# 21. RECOMMENDED SEED DATA

Seed initial roles and permissions.

Example permissions:

```sql
INSERT INTO permissions (permission_key, description) VALUES
('leads.view', 'View leads'),
('leads.create', 'Create leads'),
('leads.update', 'Update leads'),
('projects.view', 'View projects'),
('projects.create', 'Create projects'),
('projects.update', 'Update projects'),
('boq.view', 'View BOQ'),
('boq.create', 'Create BOQ'),
('boq.approve', 'Approve BOQ'),
('quality.inspect', 'Perform quality inspections'),
('materials.view', 'View materials'),
('materials.order', 'Create material orders'),
('payments.view', 'View payments'),
('payments.approve', 'Approve payments'),
('documents.upload', 'Upload documents'),
('passport.view', 'View Property Passport'),
('passport.share', 'Share Property Passport');
```

---

# Final Schema Principle

This schema should help Buildogram store not only business transactions, but construction proof.

The database must become the memory of every property.

That memory becomes Buildogram's long-term competitive moat.
