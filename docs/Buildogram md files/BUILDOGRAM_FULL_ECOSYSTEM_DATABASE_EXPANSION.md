# BUILDOGRAM FULL ECOSYSTEM DATABASE EXPANSION

# Purpose

This document expands the Buildogram database beyond construction MVP thinking.

It supports the full Day 1 ecosystem:

- Construction projects
- Property Passport
- Material marketplace
- Partner ecosystem
- 360 rental platform
- 360 resale platform
- Property owner portal
- Maintenance and warranty
- IT and promotion services for partners
- Social media collaboration engine
- Full ecosystem revenue tracking
- Property lifecycle intelligence

Core database principle:

**Every property, project, material, partner, media asset, service and transaction should become connected data.**

---

# Why Database Expansion Is Needed

A normal construction database stores:

- Leads
- Customers
- Projects
- Payments
- Documents

Buildogram needs more.

Buildogram must store:

- Verified properties
- 360 tours
- Rental listings
- Resale listings
- Property owners
- Buyer/tenant inquiries
- Maintenance history
- Partner services
- Social media collaborations
- Material commissions
- Property Passport records
- Ecosystem revenue streams

This allows Buildogram to become a property lifecycle platform.

---

# Core Entity Relationship

The full ecosystem should connect around one central object:

## Property

A property can have:

- Owner
- Construction project
- Property Passport
- 360 tour
- Rental listing
- Resale listing
- Maintenance history
- Material records
- Quality records
- Documents
- Media
- Leads
- Transactions

This creates a permanent property memory.

---

# Main Database Domains

1. Property Registry
2. Property Owners
3. Property Passport Expansion
4. 360 Tour System
5. Rental Listing System
6. Resale Listing System
7. Property Lead System
8. Maintenance System
9. Warranty System
10. Partner IT/Promotion Services
11. Social Media Collaboration System
12. Ecosystem Revenue Tracking
13. Property Verification System
14. Property Analytics

---

# 1. PROPERTY REGISTRY

## properties

This is the master property table.

```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_code VARCHAR(50) UNIQUE NOT NULL,
  owner_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  passport_id UUID REFERENCES property_passports(id),

  property_name VARCHAR(200),
  property_type VARCHAR(100),
  usage_type VARCHAR(100),

  address TEXT,
  city VARCHAR(100),
  locality VARCHAR(150),
  pin_code VARCHAR(20),
  landmark TEXT,

  geo_lat NUMERIC(10,7),
  geo_lng NUMERIC(10,7),

  plot_area NUMERIC(12,2),
  built_up_area NUMERIC(12,2),
  carpet_area NUMERIC(12,2),
  floor_count VARCHAR(50),
  floor_number VARCHAR(50),
  bedrooms INTEGER,
  bathrooms INTEGER,
  balconies INTEGER,
  parking_count INTEGER,

  facing VARCHAR(50),
  road_width VARCHAR(50),
  age_of_property VARCHAR(100),
  furnishing_status VARCHAR(100),

  property_status VARCHAR(100) DEFAULT 'draft',
  verification_status verification_status DEFAULT 'unverified',

  rental_ready BOOLEAN DEFAULT FALSE,
  resale_ready BOOLEAN DEFAULT FALSE,
  maintenance_required BOOLEAN DEFAULT FALSE,

  trust_score NUMERIC(5,2),
  rental_readiness_score NUMERIC(5,2),
  resale_readiness_score NUMERIC(5,2),

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## property_ownership_records

Stores owner history.

```sql
CREATE TABLE property_ownership_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id),
  ownership_type VARCHAR(100),
  ownership_start_date DATE,
  ownership_end_date DATE,
  is_current_owner BOOLEAN DEFAULT TRUE,
  document_id UUID REFERENCES documents(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## property_specifications

Stores detailed specifications.

```sql
CREATE TABLE property_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,

  structure_type VARCHAR(100),
  foundation_type VARCHAR(100),
  wall_type VARCHAR(100),
  roof_type VARCHAR(100),
  flooring_type VARCHAR(100),
  door_window_type VARCHAR(100),

  electrical_phase VARCHAR(50),
  water_source VARCHAR(100),
  drainage_type VARCHAR(100),
  power_backup BOOLEAN DEFAULT FALSE,
  lift_available BOOLEAN DEFAULT FALSE,
  security_available BOOLEAN DEFAULT FALSE,

  amenities JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 2. PROPERTY OWNER PORTAL

## property_owner_profiles

```sql
CREATE TABLE property_owner_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  owner_type VARCHAR(100) DEFAULT 'individual',
  company_name VARCHAR(200),
  gst_number VARCHAR(50),
  pan_number VARCHAR(50),
  preferred_contact_method VARCHAR(50),
  city VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## owner_service_requests

For property owners requesting services.

```sql
CREATE TABLE owner_service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id),
  property_id UUID REFERENCES properties(id),
  service_type VARCHAR(100) NOT NULL,

  request_title VARCHAR(200),
  request_description TEXT,
  urgency VARCHAR(50),
  preferred_date DATE,
  status VARCHAR(50) DEFAULT 'new',

  assigned_to UUID REFERENCES users(id),
  estimated_amount NUMERIC(14,2),
  final_amount NUMERIC(14,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Service types:

- rental_listing
- resale_listing
- 360_tour
- property_passport
- maintenance
- renovation
- verification
- valuation
- legal_document_review

---

# 3. PROPERTY PASSPORT EXPANSION

## passport_sections

Defines dynamic passport sections.

```sql
CREATE TABLE passport_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID REFERENCES property_passports(id) ON DELETE CASCADE,
  section_key VARCHAR(100) NOT NULL,
  section_title VARCHAR(200) NOT NULL,
  completion_percentage NUMERIC(5,2) DEFAULT 0,
  visibility VARCHAR(50) DEFAULT 'private',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(passport_id, section_key)
);
```

---

## passport_records

Flexible record storage for passport events.

```sql
CREATE TABLE passport_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID REFERENCES property_passports(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),
  section_key VARCHAR(100),
  record_type VARCHAR(100),

  title VARCHAR(255),
  description TEXT,
  record_date DATE,

  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,

  trust_impact NUMERIC(5,2),
  visibility VARCHAR(50) DEFAULT 'private',

  metadata JSONB DEFAULT '{}'::jsonb,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## passport_scores_history

Stores score changes over time.

```sql
CREATE TABLE passport_scores_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passport_id UUID REFERENCES property_passports(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),

  overall_score NUMERIC(5,2),
  document_score NUMERIC(5,2),
  quality_score NUMERIC(5,2),
  material_score NUMERIC(5,2),
  maintenance_score NUMERIC(5,2),
  rental_score NUMERIC(5,2),
  resale_score NUMERIC(5,2),

  score_reason JSONB DEFAULT '{}'::jsonb,

  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 4. 360 TOUR SYSTEM

## property_360_tours

```sql
CREATE TABLE property_360_tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  passport_id UUID REFERENCES property_passports(id),

  tour_title VARCHAR(200),
  tour_slug VARCHAR(255) UNIQUE,
  tour_provider VARCHAR(100),
  tour_url TEXT,
  embed_code TEXT,

  capture_date DATE,
  captured_by UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'draft',

  is_public BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,

  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## property_360_scenes

```sql
CREATE TABLE property_360_scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES property_360_tours(id) ON DELETE CASCADE,

  scene_name VARCHAR(200),
  scene_type VARCHAR(100),
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Scene types:

- exterior
- living_room
- bedroom
- kitchen
- bathroom
- balcony
- parking
- terrace
- commercial_floor
- warehouse_area
- office_area

---

## property_360_hotspots

```sql
CREATE TABLE property_360_hotspots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scene_id UUID REFERENCES property_360_scenes(id) ON DELETE CASCADE,

  hotspot_title VARCHAR(200),
  hotspot_type VARCHAR(100),
  description TEXT,

  x_position NUMERIC(10,4),
  y_position NUMERIC(10,4),

  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,
  linked_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Hotspot types:

- material_info
- quality_proof
- room_detail
- defect_note
- maintenance_note
- document_link
- warranty_info

---

## tour_capture_requests

```sql
CREATE TABLE tour_capture_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  owner_id UUID REFERENCES users(id),

  request_type VARCHAR(100) DEFAULT '360_tour',
  preferred_date DATE,
  preferred_time_slot VARCHAR(100),
  property_access_notes TEXT,

  assigned_photographer_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'requested',

  quoted_amount NUMERIC(14,2),
  final_amount NUMERIC(14,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 5. RENTAL LISTING SYSTEM

## rental_listings

```sql
CREATE TABLE rental_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id),

  listing_code VARCHAR(50) UNIQUE NOT NULL,
  listing_title VARCHAR(255),
  listing_slug VARCHAR(255) UNIQUE,

  monthly_rent NUMERIC(14,2),
  security_deposit NUMERIC(14,2),
  maintenance_charges NUMERIC(14,2),

  available_from DATE,
  preferred_tenant_type VARCHAR(100),
  furnishing_status VARCHAR(100),
  lease_duration VARCHAR(100),

  listing_status VARCHAR(50) DEFAULT 'draft',
  verification_status verification_status DEFAULT 'unverified',

  tour_id UUID REFERENCES property_360_tours(id),
  passport_id UUID REFERENCES property_passports(id),

  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,

  seo_title VARCHAR(255),
  meta_description TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## rental_listing_features

```sql
CREATE TABLE rental_listing_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_listing_id UUID REFERENCES rental_listings(id) ON DELETE CASCADE,
  feature_key VARCHAR(100),
  feature_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Examples:

- pet_allowed
- family_allowed
- bachelor_allowed
- parking
- lift
- power_backup
- water_supply
- gated_community
- nearby_metro
- nearby_school

---

## rental_inquiries

```sql
CREATE TABLE rental_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_listing_id UUID REFERENCES rental_listings(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),

  tenant_name VARCHAR(150),
  tenant_phone VARCHAR(20),
  tenant_email VARCHAR(255),

  move_in_date DATE,
  tenant_type VARCHAR(100),
  message TEXT,

  inquiry_status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),

  lead_id UUID REFERENCES leads(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## rental_site_visits

```sql
CREATE TABLE rental_site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_inquiry_id UUID REFERENCES rental_inquiries(id) ON DELETE CASCADE,
  rental_listing_id UUID REFERENCES rental_listings(id),

  visit_date DATE,
  visit_time TIME,
  visit_type VARCHAR(50) DEFAULT 'physical',

  status VARCHAR(50) DEFAULT 'scheduled',
  feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 6. RESALE LISTING SYSTEM

## resale_listings

```sql
CREATE TABLE resale_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id),

  listing_code VARCHAR(50) UNIQUE NOT NULL,
  listing_title VARCHAR(255),
  listing_slug VARCHAR(255) UNIQUE,

  asking_price NUMERIC(16,2),
  negotiable BOOLEAN DEFAULT TRUE,
  expected_price_range_min NUMERIC(16,2),
  expected_price_range_max NUMERIC(16,2),

  ownership_type VARCHAR(100),
  legal_status VARCHAR(100),
  loan_available BOOLEAN DEFAULT FALSE,

  listing_status VARCHAR(50) DEFAULT 'draft',
  verification_status verification_status DEFAULT 'unverified',

  tour_id UUID REFERENCES property_360_tours(id),
  passport_id UUID REFERENCES property_passports(id),

  resale_readiness_score NUMERIC(5,2),
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,

  seo_title VARCHAR(255),
  meta_description TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## resale_inquiries

```sql
CREATE TABLE resale_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resale_listing_id UUID REFERENCES resale_listings(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),

  buyer_name VARCHAR(150),
  buyer_phone VARCHAR(20),
  buyer_email VARCHAR(255),

  budget_range VARCHAR(100),
  purchase_timeline VARCHAR(100),
  loan_required BOOLEAN,
  message TEXT,

  inquiry_status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),

  lead_id UUID REFERENCES leads(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## resale_site_visits

```sql
CREATE TABLE resale_site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resale_inquiry_id UUID REFERENCES resale_inquiries(id) ON DELETE CASCADE,
  resale_listing_id UUID REFERENCES resale_listings(id),

  visit_date DATE,
  visit_time TIME,
  visit_type VARCHAR(50) DEFAULT 'physical',

  status VARCHAR(50) DEFAULT 'scheduled',
  feedback TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## property_valuation_reports

```sql
CREATE TABLE property_valuation_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  resale_listing_id UUID REFERENCES resale_listings(id),

  estimated_value_min NUMERIC(16,2),
  estimated_value_max NUMERIC(16,2),
  recommended_asking_price NUMERIC(16,2),

  valuation_method VARCHAR(100),
  comparable_properties JSONB DEFAULT '[]'::jsonb,
  factors JSONB DEFAULT '{}'::jsonb,

  generated_by UUID REFERENCES users(id),
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 7. PROPERTY VERIFICATION SYSTEM

## property_verification_checks

```sql
CREATE TABLE property_verification_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,

  check_type VARCHAR(100) NOT NULL,
  check_title VARCHAR(200),
  result VARCHAR(50) DEFAULT 'pending',
  remarks TEXT,

  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,

  evidence_document_id UUID REFERENCES documents(id),
  evidence_media_id UUID REFERENCES construction_media(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Check types:

- ownership
- address
- property_condition
- legal_document
- rental_readiness
- resale_readiness
- 360_tour_verified
- amenities_verified
- maintenance_required

---

## property_condition_reports

```sql
CREATE TABLE property_condition_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,

  report_title VARCHAR(200),
  overall_condition_score NUMERIC(5,2),

  structural_condition VARCHAR(100),
  electrical_condition VARCHAR(100),
  plumbing_condition VARCHAR(100),
  waterproofing_condition VARCHAR(100),
  painting_condition VARCHAR(100),
  flooring_condition VARCHAR(100),

  repair_required BOOLEAN DEFAULT FALSE,
  estimated_repair_cost NUMERIC(14,2),

  report_status VARCHAR(50) DEFAULT 'draft',
  inspected_by UUID REFERENCES users(id),
  inspected_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 8. MAINTENANCE SYSTEM

## maintenance_requests

```sql
CREATE TABLE maintenance_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  owner_id UUID REFERENCES users(id),
  customer_id UUID REFERENCES users(id),

  request_code VARCHAR(50) UNIQUE NOT NULL,
  service_category VARCHAR(100),
  service_title VARCHAR(200),
  description TEXT,

  urgency VARCHAR(50) DEFAULT 'normal',
  preferred_date DATE,
  preferred_time_slot VARCHAR(100),

  status VARCHAR(50) DEFAULT 'new',
  assigned_vendor_id UUID REFERENCES partner_profiles(id),
  assigned_engineer_id UUID REFERENCES users(id),

  estimated_amount NUMERIC(14,2),
  approved_amount NUMERIC(14,2),
  final_amount NUMERIC(14,2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## maintenance_work_orders

```sql
CREATE TABLE maintenance_work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  maintenance_request_id UUID REFERENCES maintenance_requests(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),

  work_order_code VARCHAR(50) UNIQUE NOT NULL,
  vendor_id UUID REFERENCES partner_profiles(id),
  assigned_to UUID REFERENCES users(id),

  scope_of_work TEXT,
  planned_start_date DATE,
  planned_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,

  status VARCHAR(50) DEFAULT 'created',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## maintenance_service_logs

```sql
CREATE TABLE maintenance_service_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES maintenance_work_orders(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),

  service_date DATE,
  work_completed TEXT,
  materials_used TEXT,
  before_media_id UUID REFERENCES construction_media(id),
  after_media_id UUID REFERENCES construction_media(id),

  customer_feedback TEXT,
  rating NUMERIC(3,2),

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## amc_plans

```sql
CREATE TABLE amc_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name VARCHAR(200),
  property_type VARCHAR(100),
  description TEXT,
  services_included JSONB DEFAULT '[]'::jsonb,
  visit_frequency VARCHAR(100),
  price NUMERIC(14,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## property_amc_contracts

```sql
CREATE TABLE property_amc_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  owner_id UUID REFERENCES users(id),
  amc_plan_id UUID REFERENCES amc_plans(id),

  contract_start_date DATE,
  contract_end_date DATE,
  contract_amount NUMERIC(14,2),
  status VARCHAR(50) DEFAULT 'active',

  next_service_date DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 9. WARRANTY SYSTEM

## warranty_records

```sql
CREATE TABLE warranty_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  project_id UUID REFERENCES projects(id),
  passport_id UUID REFERENCES property_passports(id),

  warranty_type VARCHAR(100),
  warranty_title VARCHAR(200),
  description TEXT,

  covered_from DATE,
  covered_until DATE,
  coverage_terms TEXT,
  exclusions TEXT,

  issued_by UUID REFERENCES users(id),
  document_id UUID REFERENCES documents(id),

  status VARCHAR(50) DEFAULT 'active',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## warranty_claims

```sql
CREATE TABLE warranty_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warranty_id UUID REFERENCES warranty_records(id),
  property_id UUID REFERENCES properties(id),

  claim_code VARCHAR(50) UNIQUE NOT NULL,
  claim_title VARCHAR(200),
  claim_description TEXT,

  status VARCHAR(50) DEFAULT 'submitted',
  assigned_to UUID REFERENCES users(id),

  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 10. PARTNER IT AND PROMOTION SERVICES

## partner_service_packages

```sql
CREATE TABLE partner_service_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_name VARCHAR(200),
  service_category VARCHAR(100),

  description TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,

  price NUMERIC(14,2),
  billing_cycle VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Service categories:

- website
- seo
- reels
- social_media
- crm
- whatsapp_automation
- google_business_profile
- 360_showcase
- portfolio_page
- lead_generation

---

## partner_service_orders

```sql
CREATE TABLE partner_service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partner_profiles(id),
  package_id UUID REFERENCES partner_service_packages(id),

  order_code VARCHAR(50) UNIQUE NOT NULL,
  service_title VARCHAR(200),
  scope TEXT,

  order_amount NUMERIC(14,2),
  status VARCHAR(50) DEFAULT 'new',

  assigned_to UUID REFERENCES users(id),
  start_date DATE,
  due_date DATE,
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## partner_service_deliverables

```sql
CREATE TABLE partner_service_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID REFERENCES partner_service_orders(id) ON DELETE CASCADE,

  deliverable_type VARCHAR(100),
  title VARCHAR(200),
  description TEXT,
  file_url TEXT,
  live_url TEXT,

  status VARCHAR(50) DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 11. SOCIAL MEDIA COLLABORATION ENGINE

## social_content_projects

```sql
CREATE TABLE social_content_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,

  partner_id UUID REFERENCES partner_profiles(id),
  project_id UUID REFERENCES projects(id),
  property_id UUID REFERENCES properties(id),

  content_title VARCHAR(200),
  content_type VARCHAR(100),
  platform VARCHAR(100),

  concept TEXT,
  script TEXT,
  shoot_date DATE,
  publish_date DATE,

  status VARCHAR(50) DEFAULT 'idea',

  assigned_creator_id UUID REFERENCES users(id),
  assigned_editor_id UUID REFERENCES users(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Content types:

- reel
- short_video
- carousel
- case_study
- project_walkthrough
- partner_showcase
- material_education
- quality_check_video
- property_tour

---

## social_content_assets

```sql
CREATE TABLE social_content_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_project_id UUID REFERENCES social_content_projects(id) ON DELETE CASCADE,

  asset_type VARCHAR(100),
  file_url TEXT,
  caption TEXT,
  version_no INTEGER DEFAULT 1,

  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## social_content_performance

```sql
CREATE TABLE social_content_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_project_id UUID REFERENCES social_content_projects(id) ON DELETE CASCADE,

  platform VARCHAR(100),
  post_url TEXT,
  published_at TIMESTAMPTZ,

  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,

  recorded_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 12. ECOSYSTEM REVENUE TRACKING

## revenue_streams

```sql
CREATE TABLE revenue_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_key VARCHAR(100) UNIQUE NOT NULL,
  stream_name VARCHAR(200),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Revenue streams:

- construction_execution
- pmc
- boq_audit
- plan_review
- material_commission
- supplier_subscription
- partner_subscription
- partner_lead_commission
- partner_it_services
- social_media_services
- property_passport_creation
- rental_listing_fee
- rental_success_fee
- resale_listing_fee
- resale_success_fee
- maintenance_service
- amc
- property_verification
- 360_tour_capture

---

## ecosystem_revenue_records

```sql
CREATE TABLE ecosystem_revenue_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  revenue_stream_id UUID REFERENCES revenue_streams(id),
  linked_entity_type VARCHAR(100),
  linked_entity_id UUID,

  customer_id UUID REFERENCES users(id),
  partner_id UUID REFERENCES partner_profiles(id),
  supplier_id UUID REFERENCES supplier_profiles(id),
  property_id UUID REFERENCES properties(id),
  project_id UUID REFERENCES projects(id),

  revenue_title VARCHAR(200),
  gross_amount NUMERIC(14,2),
  cost_amount NUMERIC(14,2),
  net_amount NUMERIC(14,2),
  commission_percentage NUMERIC(5,2),
  commission_amount NUMERIC(14,2),

  status VARCHAR(50) DEFAULT 'pending',
  invoice_id UUID,
  payment_id UUID REFERENCES payments(id),

  revenue_date DATE DEFAULT CURRENT_DATE,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

# 13. PROPERTY LEAD UNIFICATION

## property_leads

```sql
CREATE TABLE property_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  property_id UUID REFERENCES properties(id),

  lead_context VARCHAR(100),
  listing_type VARCHAR(100),

  rental_listing_id UUID REFERENCES rental_listings(id),
  resale_listing_id UUID REFERENCES resale_listings(id),

  name VARCHAR(150),
  phone VARCHAR(20),
  email VARCHAR(255),

  requirement TEXT,
  budget_range VARCHAR(100),
  timeline VARCHAR(100),

  status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Lead contexts:

- tenant_inquiry
- buyer_inquiry
- owner_listing_request
- passport_request
- maintenance_request
- verification_request
- 360_tour_request

---

# 14. PROPERTY ANALYTICS TABLES

## property_view_events

```sql
CREATE TABLE property_view_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  rental_listing_id UUID REFERENCES rental_listings(id),
  resale_listing_id UUID REFERENCES resale_listings(id),
  tour_id UUID REFERENCES property_360_tours(id),

  visitor_id VARCHAR(100),
  source VARCHAR(100),
  device_type VARCHAR(100),
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## property_engagement_events

```sql
CREATE TABLE property_engagement_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),

  event_type VARCHAR(100),
  event_metadata JSONB DEFAULT '{}'::jsonb,

  visitor_id VARCHAR(100),
  user_id UUID REFERENCES users(id),

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Event types:

- tour_viewed
- inquiry_submitted
- passport_viewed
- document_requested
- site_visit_requested
- whatsapp_clicked
- call_clicked

---

# 15. ADDITIONAL INDEXES

```sql
CREATE INDEX idx_properties_owner ON properties(owner_id);
CREATE INDEX idx_properties_project ON properties(project_id);
CREATE INDEX idx_properties_passport ON properties(passport_id);
CREATE INDEX idx_properties_city_locality ON properties(city, locality);
CREATE INDEX idx_properties_status ON properties(property_status);
CREATE INDEX idx_properties_verification ON properties(verification_status);

CREATE INDEX idx_tours_property ON property_360_tours(property_id);
CREATE INDEX idx_tours_slug ON property_360_tours(tour_slug);
CREATE INDEX idx_tours_public ON property_360_tours(is_public);

CREATE INDEX idx_rental_property ON rental_listings(property_id);
CREATE INDEX idx_rental_owner ON rental_listings(owner_id);
CREATE INDEX idx_rental_slug ON rental_listings(listing_slug);
CREATE INDEX idx_rental_status ON rental_listings(listing_status);
CREATE INDEX idx_rental_city_search ON properties(city, locality);

CREATE INDEX idx_resale_property ON resale_listings(property_id);
CREATE INDEX idx_resale_owner ON resale_listings(owner_id);
CREATE INDEX idx_resale_slug ON resale_listings(listing_slug);
CREATE INDEX idx_resale_status ON resale_listings(listing_status);

CREATE INDEX idx_maintenance_property ON maintenance_requests(property_id);
CREATE INDEX idx_maintenance_owner ON maintenance_requests(owner_id);
CREATE INDEX idx_maintenance_status ON maintenance_requests(status);

CREATE INDEX idx_partner_service_partner ON partner_service_orders(partner_id);
CREATE INDEX idx_partner_service_status ON partner_service_orders(status);

CREATE INDEX idx_social_content_partner ON social_content_projects(partner_id);
CREATE INDEX idx_social_content_project ON social_content_projects(project_id);
CREATE INDEX idx_social_content_property ON social_content_projects(property_id);
CREATE INDEX idx_social_content_status ON social_content_projects(status);

CREATE INDEX idx_revenue_stream ON ecosystem_revenue_records(revenue_stream_id);
CREATE INDEX idx_revenue_project ON ecosystem_revenue_records(project_id);
CREATE INDEX idx_revenue_property ON ecosystem_revenue_records(property_id);
CREATE INDEX idx_revenue_partner ON ecosystem_revenue_records(partner_id);
CREATE INDEX idx_revenue_status ON ecosystem_revenue_records(status);

CREATE INDEX idx_property_leads_property ON property_leads(property_id);
CREATE INDEX idx_property_leads_status ON property_leads(status);
CREATE INDEX idx_property_leads_context ON property_leads(lead_context);
```

---

# 16. ECOSYSTEM DATA CONNECTIONS

## Construction To Property Passport

When project is created:

- Create property record
- Create passport record
- Link project to property
- Link BOQ to passport
- Link progress to passport
- Link quality to passport
- Link materials to passport

---

## Property Passport To Rental

When owner wants to rent:

- Use property record
- Use passport trust score
- Add 360 tour
- Create rental listing
- Capture tenant leads

---

## Property Passport To Resale

When owner wants to sell:

- Use property record
- Use passport records
- Add resale readiness score
- Add 360 tour
- Create resale listing
- Capture buyer leads

---

## Materials To Passport

Every verified material delivery should become:

- Material record
- Supplier record
- Invoice record
- Passport record
- Quality traceability record

---

## Partner To Revenue

Every partner can generate:

- Subscription revenue
- Lead commission
- IT service revenue
- Social media revenue
- Material commission
- Project commission

---

# 17. MIGRATION PRIORITY

## Priority 1

Create:

- properties
- property_owners
- property_360_tours
- rental_listings
- resale_listings
- maintenance_requests
- ecosystem_revenue_records

## Priority 2

Create:

- property_verification_checks
- property_condition_reports
- partner_service_orders
- social_content_projects
- property_leads

## Priority 3

Create:

- detailed tour scenes/hotspots
- AMC tables
- warranty expansion
- engagement analytics
- valuation reports

---

# 18. FINAL DATABASE PRINCIPLE

The database should not only support today's transactions.

It should build Buildogram's long-term data moat.

Every project creates a property.
Every property creates a passport.
Every passport improves rental and resale trust.
Every material order improves price intelligence.
Every partner action improves ecosystem intelligence.
Every 360 tour improves property visibility.
Every maintenance record improves future value.

This is how Buildogram becomes the operating system of property ownership.
