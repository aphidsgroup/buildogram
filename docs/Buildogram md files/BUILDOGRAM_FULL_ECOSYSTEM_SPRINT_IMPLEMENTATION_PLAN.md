# BUILDOGRAM FULL ECOSYSTEM SPRINT IMPLEMENTATION PLAN

# Purpose

This document converts the Buildogram developer execution backlog into a practical sprint-wise implementation plan.

It is designed for:

- Founder/product owner
- Project manager
- Developers
- UI/UX designer
- QA tester
- Operations team
- Sales/CRM team

This is not an MVP-only sprint plan.

It is a full ecosystem implementation plan where Buildogram launches publicly as a complete property transparency platform while automation depth improves sprint by sprint.

Core principle:

**Launch the full ecosystem story early, but build the system in disciplined technical layers.**

---

# Implementation Philosophy

Buildogram should be implemented in a way that balances:

- Public brand completeness
- Lead capture speed
- CRM control
- Operational readiness
- Data foundation
- Future scalability
- Manual fulfillment where needed
- Automation after workflow validation

The first release should not try to automate everything.

But it must capture all important data from day one.

---

# Sprint Duration

Recommended sprint duration:

```txt
2 weeks per sprint
```

For urgent launch:

```txt
1-week sprint cycles for the first 4 weeks
```

For stable execution:

```txt
2-week sprint cycles after launch
```

---

# Team Assumption

## Lean Build Team

- 1 product owner/founder
- 1 full-stack developer
- 1 frontend developer
- 1 UI/UX designer
- 1 QA tester/support
- 1 operations reviewer

## Faster Build Team

- 1 product owner
- 1 tech lead
- 2 full-stack developers
- 1 backend developer
- 1 frontend developer
- 1 UI/UX designer
- 1 QA tester
- 1 DevOps/support engineer

---

# Sprint Priority Logic

## Build First

- Website
- Lead forms
- CRM
- Admin dashboard
- Auth
- Core database
- Content/SEO base

## Build Second

- Projects
- Customer portal
- Progress logs
- BOQ review
- Documents

## Build Third

- BQS quality
- Material requests
- Partner profiles
- Property registry
- Property Passport

## Build Fourth

- 360 rental/resale
- Maintenance
- Supplier/partner portals
- Analytics

## Build Fifth

- AI
- Automation
- Advanced reports
- Scale features

---

# Release Milestones

## Release 1: Public Launch Control

Goal:

Website + CRM + lead capture.

## Release 2: Construction Operations Control

Goal:

Projects + BOQ + progress + customer visibility.

## Release 3: Proof Layer

Goal:

BQS + materials + Property Passport base.

## Release 4: Ecosystem Expansion

Goal:

Partners + property listings + maintenance.

## Release 5: Intelligence Layer

Goal:

AI + analytics + automation.

---

# SPRINT 0: Product And Technical Setup

## Duration

1 week

## Objective

Prepare project structure, environment and final implementation base.

## Owner

Tech lead / full-stack developer

## Tasks

### Product

- [ ] Confirm full ecosystem module list
- [ ] Confirm public website sitemap
- [ ] Confirm lead types
- [ ] Confirm user roles
- [ ] Confirm first launch pages
- [ ] Confirm brand colors and typography
- [ ] Confirm core CTAs

### Technical

- [ ] Set up repository structure
- [ ] Configure environment variables
- [ ] Configure database connection
- [ ] Configure Tailwind/design tokens
- [ ] Configure base layout
- [ ] Configure dashboard layout
- [ ] Configure reusable UI components
- [ ] Configure API response structure
- [ ] Configure validation library
- [ ] Configure file upload strategy
- [ ] Configure deployment environment

## Deliverables

- Project runs locally
- Database connected
- Base layouts ready
- Design system base ready
- Sprint 1 development can start

## Acceptance Criteria

- Developer can run project without errors
- App has public and dashboard layouts
- Database connection tested
- Environment variables documented

---

# SPRINT 1: Authentication, Roles And Admin Base

## Duration

2 weeks

## Objective

Create secure login and admin access foundation.

## Tasks

### Database

- [ ] Create users table
- [ ] Create roles table
- [ ] Create permissions table
- [ ] Create user_roles table
- [ ] Create audit_logs table
- [ ] Seed super admin
- [ ] Seed core roles

### Backend

- [ ] Login API
- [ ] Logout API
- [ ] Current user API
- [ ] Password hashing
- [ ] JWT/session cookie
- [ ] Middleware route protection
- [ ] Permission checking helper
- [ ] API auth guard

### Frontend

- [ ] Login page
- [ ] Dashboard shell
- [ ] Role-based sidebar
- [ ] Admin dashboard placeholder
- [ ] User management page
- [ ] Create user form
- [ ] Assign role UI

### QA

- [ ] Test login
- [ ] Test logout
- [ ] Test protected route
- [ ] Test role-based menu
- [ ] Test inactive user block

## Deliverables

- Secure admin login
- Role-based dashboard access
- User management base

## Acceptance Criteria

- Super admin can login
- Unauthorized users cannot access dashboard
- Admin can create users
- Roles can be assigned
- Middleware protects routes

---

# SPRINT 2: Public Website Core

## Duration

2 weeks

## Objective

Build public website pages for full ecosystem positioning.

## Pages

- [ ] Home
- [ ] About
- [ ] Construction
- [ ] BOQ Audit
- [ ] Plan Review
- [ ] Materials
- [ ] Property Passport
- [ ] 360 Properties
- [ ] Partners
- [ ] Maintenance
- [ ] Contact

## Components

- [ ] Hero section
- [ ] Ecosystem section
- [ ] Service cards
- [ ] Trust/proof section
- [ ] CTA block
- [ ] FAQ block
- [ ] Footer
- [ ] Mobile navigation
- [ ] WhatsApp floating CTA

## SEO

- [ ] Page titles
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Basic schema placeholders
- [ ] Sitemap route
- [ ] Robots.txt

## Deliverables

- Public website ready for review
- Full ecosystem positioning visible
- Mobile responsive pages

## Acceptance Criteria

- All core pages load
- Mobile UI works
- CTA visible on all pages
- SEO metadata present
- No broken navigation

---

# SPRINT 3: Lead Forms And Unified CRM Base

## Duration

2 weeks

## Objective

Capture all ecosystem inquiries into one CRM.

## Database

- [ ] leads table
- [ ] lead_notes table
- [ ] lead_followups table
- [ ] lead_files table
- [ ] lead_sources enum
- [ ] lead_type enum
- [ ] lead_status enum

## Public Forms

- [ ] Construction consultation form
- [ ] BOQ upload form
- [ ] Plan review form
- [ ] Material quote form
- [ ] Partner application form
- [ ] Property listing form
- [ ] Property Passport form
- [ ] Maintenance request form
- [ ] General contact form

## CRM

- [ ] Lead list page
- [ ] Lead detail page
- [ ] Lead filters
- [ ] Lead assignment
- [ ] Add note
- [ ] Add follow-up
- [ ] Update status
- [ ] Lost reason
- [ ] Source tracking

## Deliverables

- Public forms create CRM leads
- Admin can manage leads
- Sales can track follow-ups

## Acceptance Criteria

- Every form creates a lead
- Lead type/source saved correctly
- Admin can update status and owner
- Follow-up date can be added
- Lead notes are stored

---

# SPRINT 4: Cost Calculator And Launch Readiness

## Duration

1 to 2 weeks

## Objective

Prepare public launch with first lead magnet and launch QA.

## Cost Calculator

- [ ] Calculator page
- [ ] Area/floor/specification inputs
- [ ] Approximate range output
- [ ] Disclaimer
- [ ] Lead capture
- [ ] CTA to BOQ consultation

## Launch Readiness

- [ ] Test all forms
- [ ] Test mobile website
- [ ] Test CRM workflow
- [ ] Add Google Analytics/Search Console
- [ ] Add Google Business links
- [ ] Add WhatsApp CTAs
- [ ] Add thank-you pages/messages
- [ ] Add first blog/learn page
- [ ] Add basic privacy policy
- [ ] Add terms page

## Deliverables

- Website ready for public launch
- CRM ready for lead handling
- Calculator ready for campaign use

## Acceptance Criteria

- Launch checklist passed
- All forms tested
- CRM receives all test leads
- Calculator lead is captured
- Public site ready to share

---

# RELEASE 1: PUBLIC LAUNCH CONTROL

## Target Outcome

Buildogram can publicly launch as a full ecosystem.

## Included

- Website
- Lead forms
- CRM
- Auth
- Admin dashboard
- Cost calculator
- Basic SEO
- WhatsApp CTA

## Business Capability

The team can start:

- Construction lead capture
- BOQ audit lead capture
- Material inquiry capture
- Partner onboarding lead capture
- Property listing lead capture
- Maintenance lead capture

---

# SPRINT 5: Project Management Base

## Duration

2 weeks

## Objective

Create construction/project control system.

## Database

- [ ] projects table
- [ ] project_users table
- [ ] project_milestones table
- [ ] project_documents table
- [ ] project_status enum

## Features

- [ ] Project list
- [ ] Project detail
- [ ] Create project
- [ ] Assign customer
- [ ] Assign project manager
- [ ] Assign site engineer
- [ ] Add milestones
- [ ] Link project to lead
- [ ] Link project to property placeholder
- [ ] Project status update

## Deliverables

- Admin can create and manage projects
- Projects can be assigned to team members

## Acceptance Criteria

- Project can be created from CRM lead
- Project has assigned customer and PM
- Milestones can be created
- Project status is visible

---

# SPRINT 6: Customer Portal And Documents

## Duration

2 weeks

## Objective

Give customers controlled visibility.

## Customer Portal

- [ ] Customer dashboard
- [ ] My projects page
- [ ] Project timeline view
- [ ] Documents view
- [ ] Project summary card
- [ ] Issue summary placeholder
- [ ] Quality summary placeholder

## Documents

- [ ] documents table
- [ ] Upload document
- [ ] Document category
- [ ] Visibility control
- [ ] Link to lead/project/property
- [ ] Customer-visible toggle

## Deliverables

- Customer can login and see their project
- Documents can be uploaded and shared

## Acceptance Criteria

- Customer sees only own project
- Internal documents can be hidden
- Shared documents are visible
- Role-based access works

---

# SPRINT 7: Progress Logs And Issues

## Duration

2 weeks

## Objective

Capture construction proof and site issues.

## Progress Logs

- [ ] progress_logs table
- [ ] progress_media table
- [ ] Engineer progress form
- [ ] Work completed field
- [ ] Worker count
- [ ] Material used
- [ ] Site notes
- [ ] Photo/video upload
- [ ] Customer visibility toggle
- [ ] PM approval

## Issues

- [ ] issues table
- [ ] issue_comments table
- [ ] issue_media table
- [ ] Severity
- [ ] Due date
- [ ] Assigned owner
- [ ] Status
- [ ] Resolution notes

## Deliverables

- Engineers can upload progress
- PM can review
- Issues can be tracked

## Acceptance Criteria

- Progress log appears in project detail
- Customer-visible logs appear in customer portal
- Issue can be created and closed
- Media upload works

---

# SPRINT 8: BOQ Review And BOQ Project Module

## Duration

2 weeks

## Objective

Support advisory and project BOQ workflows.

## BOQ Review

- [ ] boq_reviews table
- [ ] Upload BOQ file
- [ ] Assign reviewer
- [ ] Add findings
- [ ] Add missing items
- [ ] Add risk summary
- [ ] Add final customer report

## BOQ Project

- [ ] boq_versions table
- [ ] boq_items table
- [ ] Item category
- [ ] Quantity/unit/rate
- [ ] Auto amount calculation
- [ ] Version approval
- [ ] Version lock

## Deliverables

- BOQ advisory can be managed
- Project BOQ can be stored

## Acceptance Criteria

- BOQ review can link to lead/customer
- BOQ findings can be saved
- BOQ items calculate total
- Approved version can be locked

---

# RELEASE 2: CONSTRUCTION OPERATIONS CONTROL

## Target Outcome

Buildogram can manage construction projects internally and show customers controlled progress.

## Included

- Project management
- Customer portal
- Documents
- Progress logs
- Issues
- BOQ review
- BOQ versions

---

# SPRINT 9: BQS Quality Templates

## Duration

2 weeks

## Objective

Create BQS checklist infrastructure.

## Tasks

- [ ] quality_templates table
- [ ] quality_template_items table
- [ ] Stage field
- [ ] Item description
- [ ] Severity
- [ ] Evidence requirement
- [ ] Admin template UI
- [ ] Seed basic stage templates

## BQS Stages

- [ ] Site preparation
- [ ] Foundation
- [ ] Steel reinforcement
- [ ] Concrete
- [ ] Masonry
- [ ] Waterproofing
- [ ] Electrical
- [ ] Plumbing
- [ ] Finishing
- [ ] Handover

## Deliverables

- Admin can create BQS templates
- Basic stage-wise checklists available

## Acceptance Criteria

- Checklist template can be created
- Items can be added
- Templates can be assigned to stage

---

# SPRINT 10: BQS Inspections And Quality Score

## Duration

2 weeks

## Objective

Capture real quality checks with evidence.

## Tasks

- [ ] quality_inspections table
- [ ] quality_inspection_items table
- [ ] Assign inspection to project/stage
- [ ] Engineer inspection form
- [ ] Pass/fail/NA status
- [ ] Evidence upload
- [ ] Engineer notes
- [ ] Auto-create issue for failed critical item
- [ ] Quality score calculation
- [ ] Customer quality summary

## Deliverables

- Engineers can submit quality inspections
- Quality score visible in project

## Acceptance Criteria

- Inspection can be submitted
- Evidence can be uploaded
- Failed critical check creates issue
- Quality score is calculated

---

# SPRINT 11: Material Requests And Catalog

## Duration

2 weeks

## Objective

Start material marketplace operations.

## Tasks

- [ ] material_categories table
- [ ] materials table
- [ ] material_requests table
- [ ] material_request_items table
- [ ] Material quote form integration
- [ ] Material coordinator assignment
- [ ] Delivery location
- [ ] Required date
- [ ] Preferred brand
- [ ] Status tracking

## Deliverables

- Material requests can be captured and managed
- Material categories and products exist

## Acceptance Criteria

- Material lead creates request
- Request can have multiple items
- Coordinator can update status
- Material catalog can be managed

---

# SPRINT 12: Property Registry And Passport Base

## Duration

2 weeks

## Objective

Create the central property and Passport structure.

## Property Registry

- [ ] properties table
- [ ] Owner linkage
- [ ] Location
- [ ] Property type
- [ ] Area details
- [ ] Verification status
- [ ] Source lead
- [ ] Project linkage

## Property Passport

- [ ] property_passports table
- [ ] passport_sections table
- [ ] passport_documents table
- [ ] Completion score
- [ ] Link documents
- [ ] Link BOQ
- [ ] Link quality
- [ ] Link materials
- [ ] Link progress media

## Deliverables

- Property can be created
- Passport can be created
- Passport can link major records

## Acceptance Criteria

- Project can link to property
- Passport can link to property
- Sections show completion status
- Documents can be linked

---

# RELEASE 3: PROOF LAYER

## Target Outcome

Buildogram can now create proof through quality records, material records and Property Passport.

## Included

- BQS templates
- BQS inspections
- Material requests
- Property registry
- Passport base

---

# SPRINT 13: Partner Profiles

## Duration

2 weeks

## Objective

Build partner ecosystem base.

## Tasks

- [ ] partners table
- [ ] partner_categories table
- [ ] partner_services table
- [ ] Verification status
- [ ] Service areas
- [ ] Portfolio upload
- [ ] Partner admin page
- [ ] Public partner profile page
- [ ] Partner lead conversion from CRM

## Deliverables

- Partners can be onboarded
- Public profiles can be created

## Acceptance Criteria

- Partner profile can be created
- Verification status can be updated
- Public profile can be published
- Partner can link to lead

---

# SPRINT 14: Supplier Quotes, PO And Commission

## Duration

2 weeks

## Objective

Add procurement and commission tracking.

## Tasks

- [ ] suppliers table
- [ ] supplier_quotes table
- [ ] supplier_quote_items table
- [ ] purchase_orders table
- [ ] purchase_order_items table
- [ ] Quote comparison view
- [ ] Selected supplier
- [ ] Commission estimate
- [ ] Delivery status
- [ ] Commission ledger base

## Deliverables

- Supplier quotes can be compared
- POs can be created
- Commission can be tracked

## Acceptance Criteria

- Supplier quote can be entered
- Quotes compare clearly
- PO can be generated
- Commission is recorded

---

# SPRINT 15: 360 Tour And Rental Listings

## Duration

2 weeks

## Objective

Enable ToLetBoardChennai rental flow inside Buildogram.

## 360 Tour

- [ ] property_tours table
- [ ] Tour URL/embed
- [ ] Tour status
- [ ] Link to property
- [ ] Link to Passport

## Rental

- [ ] rental_listings table
- [ ] Rent amount
- [ ] Deposit
- [ ] Furnishing
- [ ] Amenities
- [ ] Availability
- [ ] Public listing page
- [ ] Tenant inquiry form
- [ ] Lead creation

## Deliverables

- Rental properties can be listed
- 360 tour can be displayed
- Tenant inquiries enter CRM

## Acceptance Criteria

- Rental listing can be published
- Tour displays on listing
- Inquiry creates CRM lead

---

# SPRINT 16: Resale Listings And Property Inquiry

## Duration

2 weeks

## Objective

Enable RealPropRealty resale flow inside Buildogram.

## Tasks

- [ ] resale_listings table
- [ ] Asking price
- [ ] Property condition
- [ ] Document status
- [ ] Availability
- [ ] Public resale page
- [ ] Buyer inquiry form
- [ ] Passport summary block
- [ ] Inquiry dashboard

## Deliverables

- Resale properties can be listed
- Buyer inquiries can be captured

## Acceptance Criteria

- Resale listing can be published
- Buyer inquiry creates CRM lead
- Passport summary can be displayed

---

# RELEASE 4: ECOSYSTEM EXPANSION

## Target Outcome

Buildogram now supports partners, material commerce and property listings.

## Included

- Partner profiles
- Supplier quotes
- Purchase orders
- Commission tracking
- 360 tours
- Rental listings
- Resale listings

---

# SPRINT 17: Maintenance And Warranty

## Duration

2 weeks

## Objective

Support post-handover property lifecycle.

## Maintenance

- [ ] maintenance_requests table
- [ ] Category
- [ ] Issue description
- [ ] Urgency
- [ ] Assigned vendor
- [ ] Quote
- [ ] Before/after media
- [ ] Closure notes
- [ ] Rating

## Warranty

- [ ] warranty_records table
- [ ] warranty_claims table
- [ ] Claim category
- [ ] Claim status
- [ ] Resolution notes
- [ ] Passport linkage

## Deliverables

- Maintenance requests can be tracked
- Warranty claims can be managed

## Acceptance Criteria

- Maintenance request can be created
- Vendor can be assigned
- Closure proof can be uploaded
- Passport shows maintenance record

---

# SPRINT 18: Revenue And Finance Tracking

## Duration

2 weeks

## Objective

Track money across all revenue streams.

## Tasks

- [ ] revenue_records table
- [ ] payment_records table
- [ ] commission_records table
- [ ] Revenue stream enum
- [ ] Link revenue to lead/project/property/partner/material
- [ ] Basic invoice reference
- [ ] Collection status
- [ ] Finance dashboard cards

## Revenue Streams

- [ ] Construction
- [ ] PMC
- [ ] BOQ audit
- [ ] Plan review
- [ ] Material commission
- [ ] Partner subscription
- [ ] Partner IT/promotion
- [ ] Property Passport
- [ ] 360 listing
- [ ] Maintenance
- [ ] AMC

## Deliverables

- Revenue can be recorded by stream
- Founder can see basic revenue dashboard

## Acceptance Criteria

- Revenue record can be linked to source
- Commission can be tracked
- Dashboard shows revenue by stream

---

# SPRINT 19: Analytics Dashboards

## Duration

2 weeks

## Objective

Give founder and teams visibility.

## Dashboards

- [ ] Founder dashboard
- [ ] Sales dashboard
- [ ] Project dashboard
- [ ] Quality dashboard
- [ ] Material dashboard
- [ ] Partner dashboard
- [ ] Property dashboard
- [ ] Finance dashboard
- [ ] Content dashboard

## Metrics

- [ ] Leads by source
- [ ] Leads by type
- [ ] Conversion rate
- [ ] Active projects
- [ ] Project health
- [ ] Quality failures
- [ ] Material order value
- [ ] Partner count
- [ ] Property listing count
- [ ] Revenue by stream

## Deliverables

- Dashboard views for leadership
- Department-specific metrics

## Acceptance Criteria

- Founder dashboard loads key metrics
- Filters work by date range
- Metrics match database records

---

# SPRINT 20: AI Request Infrastructure

## Duration

2 weeks

## Objective

Prepare AI foundation safely.

## Tasks

- [ ] ai_requests table
- [ ] ai_prompt_versions table
- [ ] ai_reviews table
- [ ] ai_generated_actions table
- [ ] AI request logging utility
- [ ] Prompt version management
- [ ] Human review workflow
- [ ] AI output viewer
- [ ] Risk level tagging

## Deliverables

- AI outputs can be logged
- Human review flow exists

## Acceptance Criteria

- AI request stores input/output
- Prompt version is recorded
- High-risk output can be marked for review
- Reviewer can approve/edit

---

# RELEASE 5: INTELLIGENCE LAYER FOUNDATION

## Target Outcome

Buildogram has analytics, finance visibility and AI safety infrastructure.

## Included

- Maintenance
- Warranty
- Revenue tracking
- Analytics dashboards
- AI logging
- Human review workflow

---

# SPRINT 21: Low-Risk AI Tools

## Duration

2 weeks

## Objective

Launch AI tools that support growth and operations.

## AI Tools

- [ ] Content/Reels Assistant
- [ ] Partner Profile Generator
- [ ] CRM Lead Scorer
- [ ] Cost Estimate Assistant
- [ ] Project Summary Generator

## Tasks

- [ ] Add prompts
- [ ] Add input forms
- [ ] Generate structured output
- [ ] Store output in ai_requests
- [ ] Allow copy/export
- [ ] Add disclaimers

## Deliverables

- Internal AI tools help team work faster

## Acceptance Criteria

- AI output generated successfully
- Output stored in database
- Disclaimers shown where needed
- CRM/project records can use AI summary

---

# SPRINT 22: Human-Reviewed AI Tools

## Duration

2 weeks

## Objective

Launch higher-risk AI tools with review process.

## AI Tools

- [ ] BOQ Audit Draft
- [ ] Plan Review Draft
- [ ] Material Advisor
- [ ] Property Passport Assistant
- [ ] Rental Readiness Checker

## Tasks

- [ ] Add AI input forms
- [ ] Generate draft output
- [ ] Mark human review required
- [ ] Reviewer approval screen
- [ ] Save final reviewed output
- [ ] Attach to lead/property/project

## Deliverables

- AI can assist high-value workflows safely

## Acceptance Criteria

- Customer cannot see unapproved high-risk output
- Reviewer can edit and approve
- Final output is stored

---

# SPRINT 23: Automation And Notifications

## Duration

2 weeks

## Objective

Reduce manual follow-up misses.

## Automations

- [ ] Follow-up due reminder
- [ ] Lead unassigned alert
- [ ] Missing site report alert
- [ ] QC failure alert
- [ ] Material delivery reminder
- [ ] Payment due reminder
- [ ] Partner renewal reminder
- [ ] Passport incomplete reminder
- [ ] Maintenance overdue alert

## Notification Channels

- [ ] In-app notifications
- [ ] Email optional
- [ ] WhatsApp later

## Deliverables

- Teams receive reminders for critical actions

## Acceptance Criteria

- Notifications are created for configured triggers
- Users see in-app notification
- Admin can view notification log

---

# SPRINT 24: Security, Performance And Production Hardening

## Duration

2 weeks

## Objective

Prepare for stable production use.

## Security

- [ ] RBAC audit
- [ ] API permission testing
- [ ] File access testing
- [ ] Customer data isolation
- [ ] Partner data isolation
- [ ] Input validation audit
- [ ] Rate limit sensitive APIs
- [ ] Audit log coverage
- [ ] Secrets review

## Performance

- [ ] Database indexes
- [ ] Image/file optimization
- [ ] Page load improvements
- [ ] Dashboard query optimization
- [ ] Error monitoring

## Backup

- [ ] Database backup policy
- [ ] File backup policy
- [ ] Restore test

## Deliverables

- Production-ready platform

## Acceptance Criteria

- Security checklist passed
- Critical bugs closed
- Backups configured
- Performance acceptable on mobile and dashboard

---

# Final Release: Full Ecosystem Platform V1

## Included

- Public full ecosystem website
- Unified CRM
- Construction/project ops
- Customer portal
- BOQ/advisory
- BQS quality
- Material marketplace
- Partner ecosystem
- Property registry
- Property Passport
- 360 rental/resale listings
- Maintenance/warranty
- Revenue tracking
- Analytics
- AI infrastructure
- Selected AI tools
- Automation reminders

---

# Parallel Non-Technical Work During Sprints

While tech team builds, business team must run:

## Sales

- Lead follow-up
- Consultation calls
- BOQ audit offers
- Construction proposal pipeline

## Partners

- Partner outreach
- Verification
- Partner profile collection
- Reels collaboration

## Materials

- Supplier list
- Rate collection
- Brother's shop routing process
- Commission agreements

## Content

- Daily reels
- Weekly blogs
- SEO pages
- Partner/property showcases

## Operations

- SOP creation
- Team training
- Daily review rhythm
- Customer communication formats

---

# Sprint Review Format

At the end of each sprint, review:

## Product

- What was planned?
- What was completed?
- What changed?
- What is blocked?

## Quality

- What bugs were found?
- What critical bugs remain?
- Was QA completed?

## Business

- Does this sprint unlock revenue?
- Does this sprint improve operations?
- Does this sprint improve customer trust?
- Does this sprint support full ecosystem positioning?

## Next Sprint

- Confirm priorities
- Confirm dependencies
- Confirm owners

---

# Acceptance Rule For Every Sprint

A sprint is not complete unless:

- Feature works
- UI is usable
- Role access is tested
- Data is stored correctly
- Error state is handled
- Mobile view is checked
- Basic QA is done
- Founder/product owner reviews it

---

# Final Sprint Principle

Buildogram should not build random features.

Every sprint must strengthen one of the following:

- Lead capture
- Customer trust
- Operational control
- Proof creation
- Partner growth
- Material revenue
- Property Passport
- Long-term property lifecycle

Final statement:

**Sprint by sprint, Buildogram should become the operating system for property ownership.**
