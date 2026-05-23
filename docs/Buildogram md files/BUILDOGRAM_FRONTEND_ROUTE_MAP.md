# BUILDOGRAM FRONTEND ROUTE MAP

# Purpose

This document defines every major frontend route required for Buildogram.

It is intended for:

- Frontend developers
- UI/UX designers
- Product managers
- QA testers
- AI coding tools

Each route should be mapped to:

- User role
- Page purpose
- Key components
- Required APIs
- Priority level

---

# Route Architecture

Buildogram should use a role-based route structure.

Recommended route groups:

```txt
/(public)
/(auth)
/(client)
/(ops)
/(engineer)
/(partner)
/(supplier)
/(admin)
```

This allows clean separation between:

- Public marketing pages
- Customer portal
- Internal operations
- Field app
- Partner portals
- Supplier portal
- Admin system

---

# 1. PUBLIC WEBSITE ROUTES

## / 

### Page Name

Homepage

### Purpose

Introduce Buildogram as a property transparency platform.

### User

Public visitor

### Key Sections

- Hero
- Trust metrics
- Problem section
- Buildogram solution
- Services
- BQS quality proof
- Property Passport preview
- AI tools preview
- Project proof
- Partner network
- Final CTA

### Components

- HeroSection
- TrustMetricCards
- ProblemCards
- ServiceCards
- QualityProofCard
- PropertyPassportPreview
- AIProductCards
- ProjectShowcase
- PartnerCTA
- LeadCaptureForm

### APIs

- POST /api/leads
- GET /api/content/faqs
- GET /api/content/pages/homepage

### Priority

P0

---

## /construction

### Purpose

Main construction services hub.

### Sections

- Construction overview
- Residential construction
- Villa construction
- Commercial construction
- Renovation
- Process
- Cost range
- Quality checks
- CTA

### APIs

- POST /api/leads
- GET /api/content/pages

### Priority

P0

---

## /construction/home-construction

### Purpose

Rank and convert users searching for home construction.

### Sections

- Hero
- Why Buildogram
- Process
- Cost estimate
- BOQ transparency
- BQS quality system
- Project proof
- FAQs
- CTA

### APIs

- POST /api/leads
- POST /api/ai/cost-estimate

### Priority

P0

---

## /construction/villa-construction

### Purpose

Premium villa construction conversion page.

### Sections

- Villa construction positioning
- Design + execution model
- Premium materials
- 3D/360 visualization
- Quality proof
- Cost range
- CTA

### Priority

P1

---

## /construction/commercial-construction

### Purpose

Commercial construction page.

### Target Users

- Business owners
- Retail brands
- Warehouse owners
- School/college owners
- Clinic/hospital owners

### Sections

- Commercial project types
- Timeline control
- BOQ
- MEP coordination
- Quality and safety
- CTA

### Priority

P1

---

## /construction/renovation

### Purpose

Renovation and reconstruction service page.

### Sections

- Old house renovation
- Structural review
- Waterproofing
- Interiors
- Before/after
- Cost estimate
- CTA

### Priority

P1

---

## /interiors

### Purpose

Interior design and execution page.

### Sections

- Modular kitchen
- Full home interiors
- Office interiors
- Material choices
- Timeline
- Warranty
- CTA

### Priority

P1

---

## /architecture

### Purpose

Architecture and design service page.

### Sections

- Floor plans
- Elevation
- 3D visualization
- Approval drawings
- Cost-linked design
- CTA

### Priority

P1

---

## /pmc

### Purpose

Project Management Consultancy page.

### Sections

- Why PMC matters
- Site supervision
- BOQ control
- Quality control
- Payment milestone verification
- CTA

### Priority

P1

---

## /materials

### Purpose

Material marketplace landing page.

### Sections

- Material categories
- Market-best rate promise
- Supplier network
- Material calculators
- Brand verification
- Request quote

### APIs

- GET /api/materials/catalog
- POST /api/material-requests
- POST /api/leads

### Priority

P0

---

## /materials/[category]

### Purpose

Category-specific material page.

### Examples

- /materials/cement
- /materials/steel
- /materials/msand
- /materials/tiles
- /materials/paint

### Sections

- Category explanation
- Brand comparison
- Price range
- Quantity calculator
- Quality checks
- Request quote

### APIs

- GET /api/materials/catalog?category=
- POST /api/material-requests

### Priority

P1

---

## /cost-calculator

### Purpose

Construction cost estimation lead magnet.

### Components

- CalculatorForm
- CostResultCard
- CategoryBreakdownChart
- LeadCaptureStep
- WhatsAppCTA

### APIs

- POST /api/ai/cost-estimate
- POST /api/leads

### Priority

P0

---

## /boq-audit

### Purpose

Lead magnet for users who already have quotations.

### Components

- BOQUploadForm
- SampleAuditReport
- RiskExplanation
- LeadCaptureForm

### APIs

- POST /api/documents/upload
- POST /api/leads
- POST /api/ai/boq-audit

### Priority

P0

---

## /plan-review

### Purpose

Lead magnet for users with floor plans.

### Components

- PlanUploadForm
- SamplePlanReview
- AIReviewPreview
- LeadCaptureForm

### APIs

- POST /api/documents/upload
- POST /api/leads
- POST /api/ai/plan-review

### Priority

P1

---

## /property-passport

### Purpose

Explain Property Passport value.

### Sections

- What is Property Passport
- What records are stored
- Buyer/tenant/bank value
- Sample passport
- CTA

### Priority

P0

---

## /bqs-quality-system

### Purpose

Explain Buildogram Quality System.

### Sections

- BQS concept
- 2500+ checks
- Evidence-backed verification
- Stage-gate quality
- Customer reports
- CTA

### Priority

P0

---

## /projects

### Purpose

Public project showcase.

### Components

- ProjectGrid
- FilterByType
- ProjectProofCard
- BeforeAfterMedia
- CTA

### APIs

- GET /api/public/projects

### Priority

P1

---

## /projects/[slug]

### Purpose

Project case study page.

### Sections

- Project summary
- Challenge
- BOQ
- Timeline
- Quality proof
- Materials
- Photos/videos
- Result
- CTA

### Priority

P1

---

## /partners

### Purpose

Partner acquisition landing page.

### Target Users

- Builders
- Contractors
- Architects
- Suppliers
- Engineers
- Agents

### Sections

- Why partner
- Partner types
- Benefits
- Pricing/tier preview
- Application form

### APIs

- POST /api/partners
- POST /api/leads

### Priority

P0

---

## /knowledge

### Purpose

Knowledge center hub.

### Sections

- Construction guides
- Cost guides
- Material guides
- Legal guides
- Quality guides
- Property investment guides

### APIs

- GET /api/content/pages

### Priority

P1

---

## /knowledge/[slug]

### Purpose

Blog/guide page.

### Components

- ArticleLayout
- FAQBlock
- RelatedArticles
- CTABox
- AuthorCard

### APIs

- GET /api/content/pages/[slug]

### Priority

P1

---

## /contact

### Purpose

Contact and consultation page.

### Components

- ContactForm
- WhatsAppCTA
- OfficeDetails
- ServiceSelection

### APIs

- POST /api/leads

### Priority

P0

---

# 2. AUTH ROUTES

## /login

### Purpose

Login for all user roles.

### Components

- LoginForm
- RoleAwareRedirect

### APIs

- POST /api/auth/login
- GET /api/auth/me

### Priority

P0

---

## /register

### Purpose

Customer/partner registration.

### APIs

- POST /api/auth/register

### Priority

P1

---

## /forgot-password

### Purpose

Password reset.

### APIs

- POST /api/auth/forgot-password

### Priority

P2

---

# 3. CUSTOMER PORTAL ROUTES

## /client/dashboard

### Purpose

Customer project overview.

### Sections

- Project status
- Completion percentage
- Budget summary
- Quality score
- Delay risk
- Recent updates
- Pending approvals
- Open issues

### Components

- ProjectStatusCard
- ProgressCard
- BudgetCard
- QualityScoreCard
- RecentUpdates
- ApprovalTasks
- AIInsightCard

### APIs

- GET /api/auth/me
- GET /api/projects
- GET /api/projects/:id/health
- GET /api/notifications

### Priority

P0

---

## /client/projects

### Purpose

List customer projects.

### APIs

- GET /api/projects

### Priority

P0

---

## /client/projects/[id]

### Purpose

Full customer project detail.

### Sections

- Overview
- Timeline
- BOQ
- Quality
- Progress
- Materials
- Documents
- Payments
- Issues

### APIs

- GET /api/projects/:id
- GET /api/projects/:id/timeline

### Priority

P0

---

## /client/projects/[id]/timeline

### Purpose

Project stage timeline.

### APIs

- GET /api/projects/:id/milestones
- GET /api/projects/:id/progress-logs

### Priority

P0

---

## /client/projects/[id]/boq

### Purpose

Customer BOQ view.

### Components

- BOQSummary
- BOQCategoryTable
- VersionHistory
- ApprovalButton
- AIAuditSummary

### APIs

- GET /api/projects/:id/boq
- GET /api/boq/:versionId
- POST /api/boq/:versionId/approve

### Priority

P0

---

## /client/projects/[id]/quality

### Purpose

Quality proof dashboard.

### Components

- QualityScoreCard
- StageQualityList
- FailedChecks
- EvidenceGallery
- ReworkTracker

### APIs

- GET /api/projects/:id/quality
- GET /api/projects/:id/quality-report

### Priority

P0

---

## /client/projects/[id]/progress

### Purpose

Daily/weekly progress view.

### APIs

- GET /api/projects/:id/progress-logs

### Priority

P0

---

## /client/projects/[id]/materials

### Purpose

Material delivery and verification view.

### APIs

- GET /api/material-requests?project_id=
- GET /api/purchase-orders?project_id=
- GET /api/material-deliveries?project_id=

### Priority

P1

---

## /client/projects/[id]/payments

### Purpose

Payment schedule and receipts.

### APIs

- GET /api/projects/:id/payments

### Priority

P1

---

## /client/projects/[id]/documents

### Purpose

Document vault.

### APIs

- GET /api/documents?project_id=
- POST /api/documents/upload

### Priority

P1

---

## /client/projects/[id]/issues

### Purpose

Raise and track issues.

### APIs

- GET /api/projects/:id/issues
- POST /api/projects/:id/issues
- PATCH /api/issues/:id

### Priority

P1

---

## /client/property-passport

### Purpose

List customer property passports.

### APIs

- GET /api/passports

### Priority

P1

---

## /client/property-passport/[id]

### Purpose

View full Property Passport.

### Sections

- Overview
- Documents
- BOQ
- Materials
- Quality
- Timeline
- Media
- Warranty
- Maintenance
- Share

### APIs

- GET /api/passports/:id
- GET /api/passports/:id/score
- POST /api/passports/:id/share-link

### Priority

P1

---

# 4. OPERATIONS ROUTES

## /ops/dashboard

### Purpose

Internal executive operations dashboard.

### Sections

- Leads
- Active projects
- Delayed projects
- Revenue
- Pending payments
- QC failures
- Material orders
- Team tasks

### APIs

- GET /api/analytics/sales
- GET /api/analytics/projects
- GET /api/analytics/quality
- GET /api/analytics/materials

### Priority

P0

---

## /ops/leads

### Purpose

CRM lead board.

### Components

- LeadKanban
- LeadTable
- Filters
- FollowUpPanel

### APIs

- GET /api/leads
- PATCH /api/leads/:id
- POST /api/leads/:id/activities

### Priority

P0

---

## /ops/leads/[id]

### Purpose

Lead detail and activities.

### APIs

- GET /api/leads/:id
- PATCH /api/leads/:id
- POST /api/leads/:id/activities
- POST /api/leads/:id/convert

### Priority

P0

---

## /ops/projects

### Purpose

Project management list.

### APIs

- GET /api/projects

### Priority

P0

---

## /ops/projects/[id]

### Purpose

Internal project control room.

### Sections

- Overview
- Team
- Timeline
- BOQ
- Progress
- Quality
- Materials
- Issues
- Payments
- Documents
- AI Insights

### APIs

- GET /api/projects/:id
- GET /api/projects/:id/health

### Priority

P0

---

## /ops/projects/[id]/boq

### Purpose

Manage BOQ.

### APIs

- GET /api/projects/:id/boq
- POST /api/projects/:id/boq/versions
- PATCH /api/boq/:versionId/items/:itemId
- POST /api/boq/:versionId/audit

### Priority

P0

---

## /ops/projects/[id]/quality

### Purpose

Manage quality inspections.

### APIs

- GET /api/projects/:id/quality
- POST /api/projects/:id/quality/inspections
- POST /api/quality/inspections/:id/submit

### Priority

P0

---

## /ops/projects/[id]/materials

### Purpose

Project material planning and tracking.

### APIs

- GET /api/material-requests?project_id=
- POST /api/material-requests
- POST /api/purchase-orders
- POST /api/material-deliveries

### Priority

P1

---

## /ops/materials

### Purpose

Material marketplace admin.

### Sections

- Material catalog
- Supplier quotes
- Requests
- Purchase orders
- Deliveries
- Commission tracking

### APIs

- GET /api/materials/catalog
- GET /api/material-requests
- GET /api/purchase-orders
- GET /api/analytics/materials

### Priority

P1

---

## /ops/suppliers

### Purpose

Supplier management.

### APIs

- GET /api/suppliers
- POST /api/suppliers
- PATCH /api/suppliers/:id
- GET /api/suppliers/:id/performance

### Priority

P1

---

## /ops/partners

### Purpose

Partner network management.

### APIs

- GET /api/partners
- POST /api/partners
- PATCH /api/partners/:id/verify

### Priority

P1

---

## /ops/finance

### Purpose

Finance dashboard.

### APIs

- GET /api/projects/:id/payments
- GET /api/analytics/sales

### Priority

P1

---

## /ops/content

### Purpose

Content management system.

### APIs

- GET /api/content/pages
- POST /api/content/pages
- PATCH /api/content/pages/:id
- POST /api/content/pages/:id/publish

### Priority

P2

---

## /ops/users

### Purpose

User management.

### APIs

- GET /api/users
- POST /api/users
- PATCH /api/users/:id
- POST /api/users/:id/role

### Priority

P1

---

# 5. ENGINEER ROUTES

## /engineer/dashboard

### Purpose

Engineer daily work dashboard.

### Sections

- Assigned projects
- Today's tasks
- Pending QC
- Material deliveries
- Issues
- Reports due

### APIs

- GET /api/projects
- GET /api/notifications

### Priority

P0

---

## /engineer/projects/[id]/daily-report

### Purpose

Submit daily site report.

### APIs

- POST /api/projects/:id/progress-logs
- POST /api/progress-logs/:id/media

### Priority

P0

---

## /engineer/projects/[id]/qc

### Purpose

Perform quality checklist.

### APIs

- GET /api/quality/checkpoints
- POST /api/projects/:id/quality/inspections
- PATCH /api/quality/inspection-items/:id
- POST /api/quality/inspection-items/:id/evidence

### Priority

P0

---

## /engineer/projects/[id]/materials

### Purpose

Verify material deliveries.

### APIs

- GET /api/purchase-orders?project_id=
- POST /api/material-deliveries
- POST /api/material-deliveries/:id/evidence

### Priority

P1

---

## /engineer/projects/[id]/issues

### Purpose

Raise site issues.

### APIs

- POST /api/projects/:id/issues
- POST /api/issues/:id/evidence

### Priority

P1

---

# 6. CONTRACTOR / PARTNER ROUTES

## /partner/dashboard

### Purpose

Partner overview.

### Sections

- Leads
- Assigned projects
- Tasks
- Payments
- Performance score
- Marketing stats

### APIs

- GET /api/partners/:id/performance
- GET /api/projects
- GET /api/leads

### Priority

P1

---

## /partner/leads

### Purpose

Partner lead management.

### APIs

- GET /api/leads

### Priority

P1

---

## /partner/projects

### Purpose

Assigned project list.

### APIs

- GET /api/projects

### Priority

P1

---

## /partner/projects/[id]

### Purpose

Partner project detail.

### Sections

- Scope
- BOQ
- Tasks
- Issues
- QC requirements
- Payments

### APIs

- GET /api/projects/:id
- GET /api/projects/:id/issues
- GET /api/projects/:id/boq

### Priority

P1

---

## /partner/profile

### Purpose

Edit partner profile.

### APIs

- GET /api/partners/:id
- PATCH /api/partners/:id

### Priority

P1

---

# 7. SUPPLIER ROUTES

## /supplier/dashboard

### Purpose

Supplier overview.

### Sections

- Quote requests
- Purchase orders
- Deliveries
- Payments
- Performance score

### APIs

- GET /api/material-requests
- GET /api/purchase-orders
- GET /api/suppliers/:id/performance

### Priority

P1

---

## /supplier/quotes

### Purpose

Submit and manage quotes.

### APIs

- GET /api/material-requests
- POST /api/material-requests/:id/quotes

### Priority

P1

---

## /supplier/purchase-orders

### Purpose

Manage purchase orders.

### APIs

- GET /api/purchase-orders/:id

### Priority

P1

---

## /supplier/deliveries

### Purpose

Track deliveries.

### APIs

- POST /api/material-deliveries

### Priority

P1

---

## /supplier/catalog

### Purpose

Manage supplier product catalog.

### APIs

- GET /api/materials/catalog
- POST /api/materials/catalog

### Priority

P2

---

# 8. ADMIN ROUTES

## /admin/settings

### Purpose

Global platform settings.

### Includes

- Service packages
- Cost config
- Material categories
- Quality categories
- User permissions
- SEO defaults

### Priority

P2

---

## /admin/quality-checkpoints

### Purpose

Manage BQS master checklist.

### APIs

- GET /api/quality/checkpoints
- POST /api/quality/checkpoints

### Priority

P1

---

## /admin/audit-logs

### Purpose

View system audit logs.

### APIs

- GET /api/audit-logs

### Priority

P2

---

# 9. FUTURE RENTAL ROUTES

## /rent

### Purpose

ToLetBoardChennai integrated rental listing hub.

### Priority

Future

---

## /rent/[city]/[locality]

### Purpose

Local rental listing page.

### Priority

Future

---

## /rent/property/[id]

### Purpose

360 rental property page.

### Priority

Future

---

# 10. FUTURE RESALE ROUTES

## /buy

### Purpose

RealPropRealty integrated buy/sell hub.

### Priority

Future

---

## /buy/[city]/[locality]

### Purpose

Local resale listing page.

### Priority

Future

---

## /buy/property/[id]

### Purpose

Verified resale property page.

### Priority

Future

---

# 11. COMPONENT LIBRARY

## Global Components

- Header
- Footer
- Sidebar
- Breadcrumbs
- PageHeader
- SectionHeader
- CTAButton
- LeadForm
- WhatsAppButton
- FileUpload
- MediaGallery
- DataTable
- StatusBadge
- MetricCard
- EmptyState
- LoadingState

---

## Project Components

- ProjectStatusCard
- ProjectTimeline
- MilestoneCard
- ProgressLogCard
- ProjectHealthScore
- TeamAssignmentCard

---

## BOQ Components

- BOQSummaryCard
- BOQCategoryTable
- BOQItemRow
- BOQVersionSelector
- BOQApprovalPanel
- BOQAIAuditCard

---

## Quality Components

- QualityScoreCard
- QualityStageList
- InspectionChecklist
- EvidenceUploader
- FailedCheckCard
- ReworkTracker

---

## Material Components

- MaterialCategoryCard
- MaterialQuoteForm
- SupplierQuoteTable
- PurchaseOrderCard
- DeliveryVerificationCard
- MaterialQualityCard

---

## Passport Components

- PassportOverview
- PassportScoreCard
- PassportTimeline
- PassportDocumentVault
- PassportMaterialRecords
- PassportQualityRecords
- PassportSharePanel

---

# 12. PRIORITY SUMMARY

## P0 Routes

- /
- /construction
- /construction/home-construction
- /materials
- /cost-calculator
- /boq-audit
- /property-passport
- /bqs-quality-system
- /partners
- /contact
- /login
- /client/dashboard
- /client/projects
- /client/projects/[id]
- /client/projects/[id]/boq
- /client/projects/[id]/quality
- /client/projects/[id]/progress
- /ops/dashboard
- /ops/leads
- /ops/leads/[id]
- /ops/projects
- /ops/projects/[id]
- /ops/projects/[id]/boq
- /ops/projects/[id]/quality
- /engineer/dashboard
- /engineer/projects/[id]/daily-report
- /engineer/projects/[id]/qc

---

## P1 Routes

- Villa/commercial/renovation/interiors/architecture/PMC pages
- Customer materials/payments/documents/issues
- Property Passport details
- Ops materials/suppliers/partners/finance/users
- Engineer materials/issues
- Partner portal
- Supplier portal
- Admin quality checkpoints

---

## P2 Routes

- Advanced content CMS
- Admin settings
- Audit logs
- Supplier catalog
- Future rental/resale modules

---

# Final Route Principle

Every route should do at least one of the following:

- Generate trust
- Capture leads
- Improve project visibility
- Create construction proof
- Reduce operational confusion
- Increase material revenue
- Strengthen partner network
- Build long-term property data

If a route does not support these goals, it should not be built early.
