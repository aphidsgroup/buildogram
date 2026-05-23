# BUILDOGRAM FULL ECOSYSTEM DEVELOPER EXECUTION BACKLOG

# Purpose

This document converts the full Buildogram ecosystem plan into a developer-ready execution backlog.

It is designed for:

- Product owner
- Full-stack developers
- Frontend developers
- Backend developers
- UI/UX designer
- QA tester
- Technical lead
- Founder/product reviewer

This is not an MVP-only backlog.

It supports the full Buildogram ecosystem from Day 1, while allowing manual fulfillment behind the scenes where automation is not ready.

Core principle:

**Build the platform foundation so every lead, property, project, partner, material request and service request can be captured, tracked and converted.**

---

# Development Philosophy

Buildogram should be built in layers.

The first version should not wait for every advanced automation.

But the data model and route structure should support the full ecosystem from the beginning.

This means:

- All lead types should exist from Day 1
- All service verticals should have public pages from Day 1
- CRM should support all verticals from Day 1
- Property should be a core entity from Day 1
- Project, Passport, materials, partners and listings should connect to property
- Manual review workflows should exist before AI automation
- Admin should be able to operate every vertical internally

---

# Backlog Priority Levels

## P0: Launch Critical

Required before public launch.

## P1: Early Operations

Required within first 30 to 45 days.

## P2: Ecosystem Expansion

Required within 60 to 120 days.

## P3: Automation And Scaling

Required after workflows are proven.

---

# Development Tracks

Buildogram development should be organized into 12 tracks:

1. Foundation and Auth
2. Public Website and Lead Capture
3. Unified CRM
4. Project and Construction Operations
5. BOQ and Advisory
6. BQS Quality System
7. Material Marketplace
8. Partner Ecosystem
9. Property Registry and Property Passport
10. 360 Rental/Resale Listings
11. Maintenance and Warranty
12. AI, Analytics and Automation

---

# TRACK 1: FOUNDATION AND AUTH

# Epic 1.1: Project Foundation

## Priority

P0

## Goal

Prepare the base application structure.

## Tasks

- Set up Next.js application structure
- Configure TypeScript
- Configure Tailwind CSS
- Configure global layout
- Configure public layout
- Configure dashboard layout
- Configure environment variables
- Configure database connection
- Configure error handling
- Configure loading states
- Configure reusable components folder
- Configure API response utility
- Configure validation utility
- Configure logging utility

## Acceptance Criteria

- App runs locally
- Public pages can render
- Dashboard pages can render
- Database connection works
- Environment variables are separated
- Basic error handling exists

---

# Epic 1.2: Authentication

## Priority

P0

## Goal

Create secure login and session flow.

## Tasks

- Create users table
- Create roles table
- Create permissions table
- Create user_roles table
- Implement login API
- Implement logout API
- Implement current user API
- Implement password hashing
- Implement secure JWT/session cookie
- Implement middleware protection
- Implement role-based redirect
- Implement inactive user blocking
- Add login page
- Add admin user seed

## Acceptance Criteria

- User can login
- User can logout
- Protected routes are blocked without login
- Role-based dashboards route correctly
- JWT/session is verified securely
- Inactive user cannot access dashboard

---

# Epic 1.3: RBAC

## Priority

P0

## Goal

Allow different roles to access only permitted modules.

## Roles

- super_admin
- ops_admin
- sales_user
- project_manager
- site_engineer
- customer
- partner
- supplier
- property_owner
- finance_user
- content_user

## Tasks

- Create permissions list
- Create permission checking helper
- Add route-level permission checks
- Add API-level permission checks
- Add UI permission guard
- Add role management in admin
- Add user creation in admin
- Add user role assignment

## Acceptance Criteria

- Super admin can access all modules
- Role users see only allowed menu items
- APIs reject unauthorized users
- Admin can create and assign roles

---

# TRACK 2: PUBLIC WEBSITE AND LEAD CAPTURE

# Epic 2.1: Public Website Core Pages

## Priority

P0

## Goal

Launch full ecosystem public website.

## Required Pages

- Home
- About
- Construction
- BOQ Audit
- Plan Review
- Materials
- Property Passport
- 360 Properties
- Rent
- Buy
- Partners
- Maintenance
- AI Tools
- Contact

## Tasks

- Create page layout system
- Create hero component
- Create service card component
- Create CTA section
- Create FAQ component
- Create testimonial/proof section
- Create ecosystem diagram section
- Create footer
- Create mobile navigation
- Add SEO metadata for each page

## Acceptance Criteria

- All key public pages exist
- Website is mobile responsive
- Every page has CTA
- Every service has lead capture path
- SEO title and description exist

---

# Epic 2.2: Lead Forms

## Priority

P0

## Goal

Capture all service inquiries into one lead system.

## Forms

- Construction consultation
- BOQ upload
- Plan review
- Material quote
- Partner application
- Property listing
- Property Passport request
- Maintenance request
- General contact

## Tasks

- Create reusable lead form component
- Create file upload field where needed
- Create lead creation API
- Store lead type
- Store source page
- Store customer contact details
- Store requirement details
- Send confirmation message
- Show thank-you screen
- Add spam protection
- Add validation

## Acceptance Criteria

- Every form creates a CRM lead
- Lead type is correctly stored
- Source page is tracked
- Validation prevents incomplete submissions
- Admin can view submitted leads

---

# Epic 2.3: Cost Calculator

## Priority

P0

## Goal

Create lead magnet for construction customers.

## Tasks

- Create cost calculator page
- Add inputs for location, area, floors, package, scope
- Calculate approximate range
- Show assumptions
- Capture phone/email before full result if desired
- Create lead automatically
- Add CTA for BOQ consultation

## Acceptance Criteria

- User can calculate approximate cost
- Result shows disclaimer
- Lead is created
- Admin can see calculator inputs

---

# TRACK 3: UNIFIED CRM

# Epic 3.1: CRM Lead Management

## Priority

P0

## Goal

Manage all leads across all verticals.

## Lead Types

- construction
- boq_audit
- plan_review
- material_quote
- partner_application
- rental_listing
- resale_listing
- property_passport
- maintenance
- it_promotion
- general

## Lead Stages

- new
- contacted
- qualified
- consultation_booked
- proposal_pending
- proposal_sent
- negotiation
- won
- lost
- nurture

## Tasks

- Create leads table
- Create lead_notes table
- Create lead_followups table
- Create lead_files table
- Build lead list page
- Build lead detail page
- Add filters
- Add status update
- Add lead assignment
- Add note creation
- Add follow-up date
- Add lost reason
- Add lead source tracking
- Add export option

## Acceptance Criteria

- Admin/sales can view all leads
- Lead can be filtered by type/status/source
- Lead owner can be assigned
- Notes and follow-ups work
- Lead history is visible

---

# Epic 3.2: CRM Conversion Actions

## Priority

P1

## Goal

Convert leads into relevant business records.

## Conversion Types

- Lead to project
- Lead to property
- Lead to partner
- Lead to material request
- Lead to maintenance request
- Lead to BOQ review
- Lead to Passport request

## Tasks

- Add conversion action menu
- Create conversion APIs
- Create linked record automatically
- Preserve lead history
- Add converted status
- Link new entity to lead

## Acceptance Criteria

- Lead can be converted without data loss
- New record is linked to lead
- CRM shows converted entity link

---

# TRACK 4: PROJECT AND CONSTRUCTION OPERATIONS

# Epic 4.1: Project Management Base

## Priority

P1

## Goal

Create and manage construction/PMC projects.

## Tasks

- Create projects table
- Create project_users table
- Create project_milestones table
- Create project_status enum
- Build project list page
- Build project detail page
- Assign customer
- Assign project manager
- Assign site engineer
- Add project location
- Add project scope
- Add project timeline
- Add project budget
- Link project to property

## Acceptance Criteria

- Admin can create project
- Project has customer and internal owners
- Milestones can be added
- Project can link to property
- Project status can be tracked

---

# Epic 4.2: Customer Portal

## Priority

P1

## Goal

Give customers visibility into their project.

## Tasks

- Create customer dashboard
- Show active projects
- Show project timeline
- Show progress logs
- Show documents
- Show issues
- Show quality summary
- Show payment milestones later
- Add customer-friendly status labels

## Acceptance Criteria

- Customer can login
- Customer sees only their project
- Customer can view progress and documents
- Customer cannot access internal notes

---

# Epic 4.3: Progress Logs

## Priority

P1

## Goal

Capture daily/weekly construction proof.

## Tasks

- Create progress_logs table
- Create progress_media table
- Build progress log form
- Allow image/video upload
- Add work completed field
- Add worker count
- Add materials used
- Add weather/site notes
- Add customer visibility toggle
- Add PM approval field

## Acceptance Criteria

- Engineer can submit progress log
- Media is uploaded
- PM can review
- Customer-visible logs show in portal

---

# Epic 4.4: Issues

## Priority

P1

## Goal

Track construction and customer issues.

## Tasks

- Create issues table
- Create issue_comments table
- Create issue_media table
- Add severity
- Add status
- Add assigned owner
- Add due date
- Add resolution notes
- Add reopen option

## Acceptance Criteria

- Issue can be created and assigned
- Issue can be tracked to closure
- Issue history is visible

---

# TRACK 5: BOQ AND ADVISORY

# Epic 5.1: BOQ Review Workflow

## Priority

P1

## Goal

Manage paid or free BOQ review requests.

## Tasks

- Create boq_reviews table
- Store uploaded BOQ files
- Add project/property context
- Add review status
- Add reviewer assignment
- Add risk categories
- Add missing item list
- Add final summary
- Add customer-facing report field

## Acceptance Criteria

- BOQ review request can be created
- Reviewer can add findings
- Final report can be saved
- Lead/customer can be linked

---

# Epic 5.2: BOQ Project Module

## Priority

P1

## Goal

Manage BOQ versions for active projects.

## Tasks

- Create boq_versions table
- Create boq_items table
- Add item category
- Add description
- Add quantity
- Add unit
- Add rate
- Add amount
- Add approval status
- Add version locking
- Add BOQ comparison view

## Acceptance Criteria

- BOQ versions can be created
- Items calculate total
- Approved BOQ can be locked
- Versions can be compared

---

# TRACK 6: BQS QUALITY SYSTEM

# Epic 6.1: Quality Checklist Templates

## Priority

P1

## Goal

Create reusable BQS checklist templates.

## Tasks

- Create quality_templates table
- Create quality_template_items table
- Add stage field
- Add item description
- Add evidence requirement
- Add severity
- Add pass/fail/not applicable options
- Build admin template UI

## Acceptance Criteria

- Admin can create checklist template
- Checklist items can be reused by project stage
- Evidence requirements are defined

---

# Epic 6.2: Quality Inspections

## Priority

P1

## Goal

Capture quality inspections at project sites.

## Tasks

- Create quality_inspections table
- Create quality_inspection_items table
- Link inspection to project/stage
- Assign engineer
- Capture pass/fail
- Capture evidence media
- Add engineer notes
- Auto-create issue for failed critical item
- Calculate quality score

## Acceptance Criteria

- Engineer can submit inspection
- Failed items are visible
- Critical failures create issue
- Quality score is generated

---

# TRACK 7: MATERIAL MARKETPLACE

# Epic 7.1: Material Catalog

## Priority

P1

## Goal

Create base material category and product structure.

## Tasks

- Create material_categories table
- Create materials table
- Add brand
- Add grade/specification
- Add unit
- Add description
- Add active status
- Build admin catalog UI

## Acceptance Criteria

- Admin can manage material categories
- Materials can be listed and searched

---

# Epic 7.2: Material Requests

## Priority

P1

## Goal

Capture and manage material quote requests.

## Tasks

- Create material_requests table
- Create material_request_items table
- Link to lead/project/property/partner
- Add delivery location
- Add required date
- Add quantity
- Add preferred brand
- Add status
- Assign material coordinator

## Acceptance Criteria

- Material quote lead creates material request
- Coordinator can update request
- Request can have multiple items

---

# Epic 7.3: Supplier Quotes And PO

## Priority

P2

## Goal

Compare supplier quotes and create purchase orders.

## Tasks

- Create suppliers table
- Create supplier_quotes table
- Create supplier_quote_items table
- Create purchase_orders table
- Create purchase_order_items table
- Add selected supplier
- Add quote comparison view
- Add commission estimate
- Add delivery status

## Acceptance Criteria

- Supplier quote can be recorded
- Quotes can be compared
- PO can be created
- Commission can be tracked

---

# TRACK 8: PARTNER ECOSYSTEM

# Epic 8.1: Partner Profiles

## Priority

P1

## Goal

Onboard and manage ecosystem partners.

## Tasks

- Create partners table
- Create partner_categories table
- Create partner_services table
- Add verification status
- Add service areas
- Add portfolio media
- Add documents
- Add public profile slug
- Build partner admin page
- Build partner public profile page

## Acceptance Criteria

- Partner can be created
- Verification status can be updated
- Public profile can be published
- Partner category/service areas are visible

---

# Epic 8.2: Partner Packages And Billing

## Priority

P2

## Goal

Track partner subscriptions and service packages.

## Tasks

- Create partner_packages table
- Create partner_subscriptions table
- Create partner_service_orders table
- Add package pricing
- Add subscription status
- Add renewal date
- Add content/service deliverables

## Acceptance Criteria

- Partner can be assigned a package
- Subscription status can be tracked
- Service orders can be managed

---

# TRACK 9: PROPERTY REGISTRY AND PROPERTY PASSPORT

# Epic 9.1: Property Registry

## Priority

P1

## Goal

Create central property entity.

## Tasks

- Create properties table
- Add owner linkage
- Add location fields
- Add property type
- Add plot/built-up area
- Add status
- Add verification status
- Add source lead
- Add project linkage
- Build property list page
- Build property detail page

## Acceptance Criteria

- Property can be created
- Property can link to owner/project/lead
- Property detail stores core information

---

# Epic 9.2: Property Passport Base

## Priority

P1

## Goal

Create Property Passport structure.

## Tasks

- Create property_passports table
- Create passport_sections table
- Create passport_documents table
- Create passport_scores table
- Link documents
- Link BOQ
- Link materials
- Link quality
- Link progress media
- Link maintenance
- Add completion score
- Build passport detail page

## Acceptance Criteria

- Passport can be created for property
- Sections can show completion status
- Related records can be linked
- Completion score is visible

---

# TRACK 10: 360 RENTAL/RESALE LISTINGS

# Epic 10.1: 360 Tour Records

## Priority

P2

## Goal

Store and link 360 property tours.

## Tasks

- Create property_tours table
- Add tour provider
- Add tour URL/embed code
- Add scenes
- Add hotspots later
- Link to property/listing/passport
- Add approval status

## Acceptance Criteria

- Tour can be added to property
- Tour can be displayed on listing
- Tour can be linked to Passport

---

# Epic 10.2: Rental Listings

## Priority

P2

## Goal

Create rental listing system for ToLetBoardChennai integration.

## Tasks

- Create rental_listings table
- Add rent amount
- Add deposit
- Add furnishing status
- Add availability
- Add amenities
- Add listing status
- Add inquiry form
- Link property and tour
- Build public listing page

## Acceptance Criteria

- Rental listing can be published
- Tenant inquiry creates lead
- 360 tour can be shown

---

# Epic 10.3: Resale Listings

## Priority

P2

## Goal

Create resale listing system for RealPropRealty integration.

## Tasks

- Create resale_listings table
- Add asking price
- Add property condition
- Add document status
- Add availability
- Add listing status
- Add inquiry form
- Link property and tour
- Build public listing page

## Acceptance Criteria

- Resale listing can be published
- Buyer inquiry creates lead
- Passport summary can be shown

---

# TRACK 11: MAINTENANCE AND WARRANTY

# Epic 11.1: Maintenance Requests

## Priority

P2

## Goal

Capture and manage property maintenance requests.

## Tasks

- Create maintenance_requests table
- Add property linkage
- Add customer linkage
- Add category
- Add issue description
- Add urgency
- Add status
- Add assigned vendor
- Add quote amount
- Add before/after media
- Add closure notes

## Acceptance Criteria

- Customer/admin can create request
- Request can be assigned
- Work can be closed with proof
- Passport can show maintenance record

---

# Epic 11.2: Warranty Claims

## Priority

P2

## Goal

Track warranty claims for Buildogram projects.

## Tasks

- Create warranty_records table
- Create warranty_claims table
- Add warranty period
- Add claim category
- Add status
- Add resolution notes
- Link to project/property/passport

## Acceptance Criteria

- Warranty can be attached to project/property
- Claims can be created and resolved
- Passport shows warranty history

---

# TRACK 12: AI, ANALYTICS AND AUTOMATION

# Epic 12.1: AI Request Logging

## Priority

P2

## Goal

Create infrastructure for all AI modules.

## Tasks

- Create ai_requests table
- Create ai_prompt_versions table
- Create ai_reviews table
- Create ai_generated_actions table
- Build internal AI request viewer
- Store input/output JSON
- Store risk level
- Store human review status

## Acceptance Criteria

- AI requests can be logged
- Prompt version can be tracked
- Human review can be recorded
- Output can be attached to lead/project/property

---

# Epic 12.2: Cost Estimator AI

## Priority

P2

## Goal

Generate educational cost estimate with disclaimer.

## Tasks

- Create AI cost estimate prompt
- Connect calculator inputs
- Generate structured output
- Store AI request
- Show customer-friendly output
- Create CRM lead

## Acceptance Criteria

- AI estimate is generated
- Disclaimer is shown
- Lead is created
- Output is stored

---

# Epic 12.3: BOQ Audit AI Draft

## Priority

P3

## Goal

Generate AI-assisted BOQ audit draft for human reviewer.

## Tasks

- Parse uploaded BOQ text
- Send to BOQ audit prompt
- Generate missing items/risks
- Mark human review required
- Allow reviewer edits
- Save final output

## Acceptance Criteria

- AI output is not directly sent to customer
- Reviewer can approve/edit
- Final output is stored

---

# Epic 12.4: Analytics Dashboards

## Priority

P2

## Goal

Give founder and teams business visibility.

## Dashboards

- Founder dashboard
- Sales dashboard
- Project dashboard
- Material dashboard
- Partner dashboard
- Property dashboard
- Finance dashboard
- Content dashboard

## Tasks

- Create analytics views
- Create dashboard cards
- Add filters
- Add revenue by stream
- Add lead by source
- Add project health
- Add material order value
- Add partner count
- Add property listing count

## Acceptance Criteria

- Founder can see key metrics
- Each department has relevant dashboard
- Data updates from operational modules

---

# Cross-Cutting Requirements

# File Upload

Must support:

- BOQ files
- Plans
- Property documents
- Quality evidence
- Progress media
- Material invoices
- Partner portfolio
- 360 tour references
- Maintenance proof

---

# Notifications

Must support events:

- New lead
- Follow-up due
- Lead assigned
- BOQ review assigned
- Project update added
- QC failed
- Material request received
- Supplier quote added
- Partner application received
- Property inquiry received
- Maintenance request created

---

# Audit Logs

Track:

- User login
- Lead updates
- Project changes
- BOQ changes
- Document uploads
- Quality approvals
- Material PO changes
- Partner verification changes
- Passport changes
- Listing publication
- Payment/revenue changes

---

# QA Checklist

Every module should be tested for:

- Create
- Read
- Update
- Delete if allowed
- Role access
- Form validation
- File upload
- Mobile responsiveness
- Empty state
- Error state
- Unauthorized access
- Data linkage
- Audit log creation

---

# Release Plan

# Release 1: Public Launch + CRM

Includes:

- Public website
- Lead forms
- CRM
- Auth
- Admin dashboard
- Cost calculator
- Basic content pages

---

# Release 2: Operations Core

Includes:

- Projects
- Customer portal
- Progress logs
- Issues
- BOQ review
- Basic documents

---

# Release 3: Proof Layer

Includes:

- BQS quality
- Material requests
- Property registry
- Property Passport base

---

# Release 4: Ecosystem Commerce

Includes:

- Partner profiles
- Supplier quotes
- Purchase orders
- Commission tracking
- Partner packages

---

# Release 5: Property Lifecycle

Includes:

- 360 tours
- Rental listings
- Resale listings
- Maintenance
- Warranty

---

# Release 6: AI And Analytics

Includes:

- AI request logging
- Cost estimator AI
- BOQ audit AI draft
- Founder dashboard
- Department dashboards
- Automation reminders

---

# Final Developer Principle

The developer team should not build isolated features.

Every feature should connect to at least one of these core entities:

- Lead
- User
- Property
- Project
- Partner
- Supplier
- Material
- Document
- Media
- Passport
- Revenue record

Final statement:

**Buildogram technology should turn every customer action into structured data, every data point into proof, and every proof point into revenue and trust.**
