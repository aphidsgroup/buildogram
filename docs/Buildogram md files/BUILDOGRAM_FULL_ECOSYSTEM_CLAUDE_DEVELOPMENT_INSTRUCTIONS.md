# BUILDOGRAM FULL ECOSYSTEM CLAUDE DEVELOPMENT INSTRUCTIONS

# Purpose

This file is the master instruction document for developing the existing Buildogram project inside Antigravity IDE using Claude Sonnet 4.6 or any coding AI assistant.

Use this file as the first document to read before modifying the codebase.

Core instruction:

**Do not rebuild Buildogram from scratch. Modify and expand the existing Buildogram project carefully using the provided Markdown documentation.**

---

# Project Identity

Buildogram is not just a construction company website.

Buildogram is:

```txt
India's Property Transparency Platform
```

Main promise:

```txt
Build with proof, not promises.
```

Ecosystem scope:

```txt
Buy. Build. Track. Rent. Sell. Maintain.
```

Buildogram should cover:

- Construction execution
- PMC
- BOQ audit
- Plan review
- Material marketplace
- BQS quality framework
- Property Passport
- Partner ecosystem
- 360 rental/resale listings
- Maintenance and warranty
- AI-assisted workflows
- CRM and operations
- Content/SEO growth engine

---

# Existing Project Context

The current Buildogram app already exists.

Do not delete existing working features unless explicitly required.

Current known stack:

```txt
Next.js 16
React 19
PostgreSQL / Neon DB
JWT cookie auth
Role-based middleware
```

Existing project has:

- Public pages
- Login
- Client dashboard
- Partner dashboard
- Ops dashboard
- Leads
- Projects
- BOQ
- Milestones
- Payments
- QC templates
- QC submissions
- Progress logs
- Issues
- Documents
- Contractors
- Materials
- Purchase orders
- AMC contracts
- Warranty claims
- Notifications

Existing roles include:

```txt
client
ops_admin
ops_pm
ops_engineer
partner_contractor
partner_supplier
```

New full ecosystem roles may be added gradually.

---

# Most Important Development Rule

Before writing code, always inspect the existing files and understand:

1. Current folder structure
2. Existing route structure
3. Existing database tables
4. Existing API patterns
5. Existing UI components
6. Existing auth and middleware
7. Existing naming conventions
8. Existing role model
9. Existing styling system
10. Existing data access pattern

Then expand from there.

Do not assume a clean project.

---

# Documentation Reading Order

When starting development, read the documents in this order.

## Level 1: Strategy And Product Understanding

Read first:

1. `BUILDOGRAM_FULL_ECOSYSTEM_ONE_PAGE_MASTER_PLAN.md`
2. `BUILDOGRAM_FULL_ECOSYSTEM_MASTER_PRD.md`
3. `BUILDOGRAM_FULL_ECOSYSTEM_BUSINESS_MODEL.md` if present, otherwise `BUILDOGRAM_BUSINESS_MODEL.md`
4. `BUILDOGRAM_FULL_ECOSYSTEM_BRAND_POSITIONING.md`

Purpose:

Understand what Buildogram is and why it exists.

---

## Level 2: Website And User Experience

Read next:

1. `BUILDOGRAM_FULL_ECOSYSTEM_WEBSITE_SITEMAP.md`
2. `BUILDOGRAM_FULL_ECOSYSTEM_USER_JOURNEYS.md`
3. `BUILDOGRAM_UI_UX_SPECIFICATION.md`
4. `BUILDOGRAM_FRONTEND_ROUTE_MAP.md`

Purpose:

Understand public pages, portals, routes and journeys.

---

## Level 3: Database And Backend

Read next:

1. `BUILDOGRAM_FULL_ECOSYSTEM_DATABASE_EXPANSION.md`
2. `BUILDOGRAM_DATABASE_SQL_SCHEMA.md`
3. `BUILDOGRAM_API_SPECIFICATION.md`
4. `BUILDOGRAM_BACKEND_SERVICE_MAP.md`

Purpose:

Understand data model, APIs and backend service structure.

---

## Level 4: Development Execution

Read next:

1. `BUILDOGRAM_FULL_ECOSYSTEM_DEVELOPER_EXECUTION_BACKLOG.md`
2. `BUILDOGRAM_FULL_ECOSYSTEM_SPRINT_IMPLEMENTATION_PLAN.md`
3. `BUILDOGRAM_FULL_ECOSYSTEM_TECH_ROADMAP.md`
4. `BUILDOGRAM_FULL_ECOSYSTEM_QA_AND_TESTING_PLAN.md`

Purpose:

Understand what to build, in what order and how to test.

---

## Level 5: Operations And Business Workflows

Read when building workflow modules:

1. `BUILDOGRAM_FULL_ECOSYSTEM_OPERATING_MODEL.md`
2. `BUILDOGRAM_OPERATIONS_SOP.md`
3. `BUILDOGRAM_FULL_ECOSYSTEM_STANDARD_OPERATING_TEMPLATES.md`
4. `BUILDOGRAM_FULL_ECOSYSTEM_TEAM_TRAINING_AND_ONBOARDING_MANUAL.md`
5. `BUILDOGRAM_FULL_ECOSYSTEM_DEPARTMENT_KPI_SCORECARD.md`

Purpose:

Understand how the business will actually use the platform.

---

## Level 6: Specific Modules

Read module-specific docs only when working on those modules:

### Property Passport

```txt
BUILDOGRAM_PROPERTY_PASSPORT_SPEC.md
BUILDOGRAM_FULL_ECOSYSTEM_DATABASE_EXPANSION.md
```

### Materials

```txt
BUILDOGRAM_MATERIAL_MARKETPLACE_SPEC.md
BUILDOGRAM_FULL_ECOSYSTEM_REVENUE_MODEL.md
```

### Partners

```txt
BUILDOGRAM_PARTNER_ECOSYSTEM_PLAYBOOK.md
BUILDOGRAM_FULL_ECOSYSTEM_PARTNER_ONBOARDING_KIT.md
```

### AI

```txt
BUILDOGRAM_AI_ECOSYSTEM.md
BUILDOGRAM_FULL_ECOSYSTEM_AI_PROMPTS_AND_WORKFLOWS.md
```

### Content/SEO

```txt
BUILDOGRAM_CONTENT_ENGINE.md
BUILDOGRAM_SEO_AEO_GEO_BLUEPRINT_PART1.md
BUILDOGRAM_FULL_ECOSYSTEM_CONTENT_CALENDAR.md
BUILDOGRAM_FULL_ECOSYSTEM_SOCIAL_MEDIA_CONTENT_BANK.md
```

### Security

```txt
BUILDOGRAM_SECURITY_AND_ACCESS_CONTROL_SPEC.md
BUILDOGRAM_FULL_ECOSYSTEM_DEPLOYMENT_AND_DEVOPS_PLAN.md
```

### Legal/Consent

```txt
BUILDOGRAM_FULL_ECOSYSTEM_LEGAL_DOCUMENTS_CHECKLIST.md
```

---

# Development Priority

Do not try to build all modules in one pass.

Use this order.

## Phase 1: Stabilize Existing App

Tasks:

- Verify app runs
- Fix install/build errors
- Check environment variables
- Check database connection
- Check auth
- Check public pages
- Check dashboards
- Check existing APIs
- Confirm no broken routes

Do this before adding new features.

---

## Phase 2: Create Full Ecosystem Public Website

Build or update public pages:

- Home
- About
- Construction
- BOQ Audit
- Plan Review
- Materials
- Property Passport
- 360 Property Listings
- Rent
- Buy/Sell
- Partners
- Maintenance
- Cost Calculator
- Contact

Goal:

Public website should communicate the full ecosystem from Day 1.

---

## Phase 3: Unified Lead Forms And CRM

All public CTAs should create leads in CRM.

Lead types should include:

```txt
construction
pmc
boq_audit
plan_review
material_quote
partner_application
property_listing
property_passport
maintenance
general
```

Each lead should store:

- Name
- Phone
- Email
- Location
- Lead type
- Source page
- Message
- Files if any
- Status
- Assigned owner
- Follow-up date
- Notes

Goal:

No inquiry should be lost.

---

## Phase 4: Property And Passport Foundation

Add property lifecycle foundation:

- Properties
- Property owners
- Property documents
- Property Passport
- Passport sections
- Passport completion score
- Passport document links
- Passport project links
- Passport maintenance links
- Passport rental/resale links

Goal:

Property Passport becomes the central long-term moat.

---

## Phase 5: Material Marketplace Expansion

Add or improve:

- Material categories
- Material quote requests
- Material request items
- Supplier quotes
- Supplier comparison
- Purchase orders
- Delivery verification
- Commission tracking

Goal:

Support material revenue and brother's shop routing model.

---

## Phase 6: Partner Ecosystem

Add:

- Partner application
- Partner profiles
- Partner verification
- Service areas
- Portfolio
- Public partner profile
- Partner dashboard improvements
- Partner lead sharing status

Goal:

Build network of builders, contractors, architects and suppliers.

---

## Phase 7: Rental/Resale 360 Listings

Add:

- Rental listings
- Resale listings
- 360 tour links
- Listing status
- Owner consent
- Inquiry forms
- CRM integration
- Public property detail pages

Goal:

Integrate ToLetBoardChennai and RealPropRealty inside Buildogram.

---

## Phase 8: Maintenance And Warranty

Add:

- Maintenance requests
- Vendor assignment
- Before/after proof
- Closure notes
- Customer confirmation
- Passport update
- Warranty claims

Goal:

Extend Buildogram after construction and after listing.

---

## Phase 9: Analytics And KPIs

Add dashboards for:

- Founder
- Sales
- Projects
- Materials
- Partners
- Properties
- Passport
- Maintenance
- Finance
- Content

Goal:

Founder should see business health from one place.

---

## Phase 10: AI Layer

Add safely:

- AI request logging
- Prompt versions
- Human review flow
- Low-risk AI tools
- High-risk AI tools with review
- AI disclaimers

Do not show high-risk AI outputs directly to customers without human review.

---

# Important Coding Rules

## Rule 1: Preserve Existing Working Features

Before changing a file, understand what it currently does.

Avoid large rewrites unless necessary.

---

## Rule 2: Make Small, Testable Changes

Prefer:

- One module at a time
- One route group at a time
- One API group at a time
- One schema migration at a time

Avoid:

- Huge unrelated refactors
- Replacing complete architecture without reason
- Breaking current pages while adding new ones

---

## Rule 3: Keep UI Consistent

Use existing design tokens where available:

```txt
Primary: #FFDA01
Secondary: #292929
Accent: #BBA07A
Text: #4A4A4A
Background: #F9F9F9
Headings: Space Grotesk
Body: Be Vietnam Pro
Italic/accent: DM Serif Text
```

The UI should feel:

- Premium
- Minimal
- Trustworthy
- Construction/property-tech focused
- Mobile-friendly
- Clear CTA-driven

---

## Rule 4: All Public Forms Must Feed CRM

Do not create isolated contact forms.

Every public form should create a CRM lead with correct lead type and source.

---

## Rule 5: Use Role-Based Access

Never expose customer/project/property/partner data without checking role and ownership.

Critical access rules:

- Customers see only their own projects/properties.
- Partners see only their own partner data.
- Suppliers see only supplier-related data.
- Engineers see only assigned projects.
- Ops/admin can see operational data.
- Finance sees revenue/payment-related views.
- Content users should not access private customer data.

---

## Rule 6: Protect Files

Private documents should not be publicly accessible.

For uploaded files:

- Store owner/uploader
- Store linked entity
- Store visibility
- Check access before download
- Do not expose raw private storage URLs casually

---

## Rule 7: Add Audit Logs For Sensitive Actions

Audit actions like:

- User creation
- Role changes
- Lead status changes
- Project creation
- File upload/delete
- Partner verification
- Property listing publish
- Passport share
- Revenue record changes
- AI output approval

---

## Rule 8: Use Validation

Use schema validation for APIs and forms.

Validate:

- Required fields
- Phone/email
- Enums
- File type/size
- Numeric ranges
- Role permissions
- Ownership checks

---

## Rule 9: Add Empty, Loading And Error States

Every page should handle:

- Loading
- Empty data
- Error
- Unauthorized
- Success

---

## Rule 10: Mobile First

Many users will interact through mobile.

Check:

- Public pages
- Forms
- Dashboard lists
- Detail pages
- Upload forms
- Customer portal

---

# API Design Rules

Use consistent response format.

Recommended:

```ts
{
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
```

For lists:

```ts
{
  success: true;
  data: {
    items: [],
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    }
  }
}
```

For errors:

```ts
{
  success: false;
  error: "Readable error message"
}
```

---

# Database Development Rules

Before adding tables:

1. Check if an existing table already covers the need.
2. Prefer extending existing tables carefully.
3. Add indexes for frequently filtered fields.
4. Use foreign keys where practical.
5. Avoid deleting old columns without migration review.
6. Keep created_at and updated_at.
7. Add status fields for workflow entities.
8. Add created_by/updated_by where needed.

---

# Naming Conventions

Use clear names.

Examples:

```txt
properties
property_passports
passport_sections
passport_documents
material_requests
material_request_items
supplier_quotes
partner_profiles
rental_listings
resale_listings
maintenance_requests
ai_requests
audit_logs
```

Avoid vague names like:

```txt
data
items
records
misc
info
```

---

# Route Development Rules

Public pages:

```txt
/
 /about
 /construction
 /boq-audit
 /plan-review
 /materials
 /property-passport
 /properties
 /properties/rent
 /properties/buy
 /partners
 /maintenance
 /cost-estimator
 /contact
```

Admin/ops pages:

```txt
/ops/dashboard
/ops/leads
/ops/projects
/ops/properties
/ops/passports
/ops/materials
/ops/partners
/ops/listings
/ops/maintenance
/ops/revenue
/ops/analytics
/ops/settings
```

Customer pages:

```txt
/client/dashboard
/client/projects
/client/properties
/client/passport
/client/documents
/client/maintenance
```

Partner pages:

```txt
/partner/dashboard
/partner/profile
/partner/leads
/partner/projects
/partner/content
```

---

# Component Rules

Create reusable components for:

- Page hero
- CTA section
- Service cards
- Feature cards
- Stat cards
- Form fields
- Status badge
- Data table
- Empty state
- Upload field
- Timeline
- Dashboard card
- Metric card
- Document list
- Media gallery
- Confirmation modal

Do not duplicate UI patterns unnecessarily.

---

# Lead Form Rules

Every lead form should capture:

```txt
name
phone
email optional
location optional
lead_type
source_page
message
metadata JSON
files optional
```

Examples of metadata:

Construction:

```json
{
  "plot_size": "",
  "built_up_area": "",
  "floors": "",
  "timeline": "",
  "plan_available": true
}
```

Material:

```json
{
  "materials": [],
  "delivery_location": "",
  "required_date": "",
  "gst_required": true
}
```

Property listing:

```json
{
  "listing_type": "rent",
  "property_type": "",
  "expected_price": "",
  "tour_required": true
}
```

---

# Buildogram AI Safety Rules

AI tools can support but not replace professional judgement.

Low-risk AI outputs:

- Content ideas
- CRM summaries
- Partner profile draft
- Project summary draft

High-risk AI outputs:

- BOQ audit
- Plan review
- Cost estimate
- Material recommendation
- Quality risk
- Property/legal readiness

High-risk AI outputs must:

- Be marked draft
- Require human review
- Include disclaimer
- Store prompt version
- Store reviewer approval

---

# Development Workflow For Claude

When asked to build a feature, follow this process:

## Step 1: Inspect

Read relevant files and existing code.

## Step 2: Summarize Current State

Briefly explain what exists.

## Step 3: Plan

List files to create/modify.

## Step 4: Implement

Modify code in small logical steps.

## Step 5: Validate

Run build/lint/tests if available.

## Step 6: Report

Explain:

- Files changed
- Features added
- How to test
- Any pending work
- Any risks

---

# Strict Do Not Do List

Do not:

- Delete existing tables casually
- Remove current auth
- Break current dashboard routes
- Replace full design system unnecessarily
- Hardcode secrets
- Expose private files
- Send high-risk AI outputs directly to customers
- Add isolated lead forms outside CRM
- Create public property listing without consent field
- Create Passport share without access rules
- Ignore mobile view
- Ignore role permissions
- Make claims like "legally verified" unless workflow exists
- Make claims like "structurally approved" unless professional certification exists

---

# How To Use These Markdown Files In Antigravity IDE

Recommended folder:

```txt
/buildogram-app/docs/buildogram/
```

Place all Buildogram MD files inside that folder.

Then start with this prompt to Claude:

```txt
Read docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_CLAUDE_DEVELOPMENT_INSTRUCTIONS.md first.

Then inspect the current codebase.

Do not rebuild from scratch.

Summarize:
1. Current project structure
2. Existing routes
3. Existing database/API structure
4. Existing auth/roles
5. What is already implemented
6. What is missing for the full ecosystem

After that, propose the first safe development step.
```

---

# Recommended First Claude Prompt For Development

Use this inside Antigravity IDE:

```txt
You are helping me develop the existing Buildogram project.

First read:
docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_CLAUDE_DEVELOPMENT_INSTRUCTIONS.md

Then read:
docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_ONE_PAGE_MASTER_PLAN.md
docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_MASTER_PRD.md
docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_WEBSITE_SITEMAP.md
docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_DATABASE_EXPANSION.md
docs/buildogram/BUILDOGRAM_API_SPECIFICATION.md
docs/buildogram/BUILDOGRAM_FRONTEND_ROUTE_MAP.md
docs/buildogram/BUILDOGRAM_BACKEND_SERVICE_MAP.md
docs/buildogram/BUILDOGRAM_FULL_ECOSYSTEM_DEVELOPER_EXECUTION_BACKLOG.md

Then inspect the codebase.

Do not write code immediately.

First give me:
1. Existing app analysis
2. Gap analysis
3. Recommended first 5 development tasks
4. Files likely to be modified
5. Risks before coding
```

---

# Recommended Prompt After Initial Analysis

After Claude gives analysis, use:

```txt
Proceed with Task 1 only.

Make the smallest safe code changes needed.

Do not break existing features.

After changes, provide:
1. Files changed
2. What was added
3. How to test
4. Any migration required
5. Next recommended task
```

---

# Recommended Development Task Order For Claude

Use this exact order initially:

1. Stabilize and document current project structure.
2. Improve public homepage to communicate full ecosystem.
3. Add/update full ecosystem public service pages.
4. Ensure every CTA routes to CRM lead creation.
5. Add missing lead types and metadata support.
6. Improve ops leads dashboard for all lead types.
7. Add properties table/module if not present.
8. Add Property Passport base.
9. Add material request improvements.
10. Add partner profile improvements.
11. Add rental/resale listing base.
12. Add maintenance request improvements.
13. Add analytics dashboard cards.
14. Add AI request logging foundation.
15. Add QA fixes and production hardening.

---

# Buildogram Definition Claude Must Remember

Claude should always treat Buildogram as:

```txt
A full property lifecycle and transparency ecosystem where construction, materials, partners, property records, rental/resale listings, maintenance and AI tools are connected through CRM, proof and Property Passport.
```

Not as:

```txt
Only a construction landing page.
```

Not as:

```txt
Only a real estate portal.
```

Not as:

```txt
Only a contractor management app.
```

---

# Final Instruction

When in doubt, prioritize:

1. Lead capture
2. CRM continuity
3. Role security
4. Property Passport foundation
5. Public full ecosystem positioning
6. Operational proof
7. Future scalability

Final statement:

**Buildogram development should always move toward one goal: becoming the operating system for property ownership.**
