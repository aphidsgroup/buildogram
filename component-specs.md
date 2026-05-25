# Buildogram Component Specs

## MarketplaceHeader

Purpose: make Buildogram feel like a searchable marketplace immediately.

Required elements:
- Buildogram logo/wordmark
- Global search input
- Category selector
- Location selector
- Mega menu
- Partner registration CTA
- Material quote CTA
- Login/account entry

States:
- Default
- Sticky scrolled
- Search focused
- Mega menu open
- Mobile drawer open

Accessibility:
- Search input has visible label or `aria-label`.
- Mega menu supports keyboard navigation.
- Focus outline uses blueprint blue with adequate contrast.

## SearchHero

Purpose: convert homepage intent into a search or quote request.

Required elements:
- Marketplace headline
- Subheadline
- Search bar
- Popular chips
- Primary and secondary CTAs
- Proof strip

Suggested chips:
- Cement
- Steel
- Contractors
- Architects
- 360° Tours
- Project Showcase

## CategoryCard

Required fields:
- Title
- Short description
- Category icon or blueprint mark
- CTA label
- Status/proof cue

Example CTA labels:
- Request Rate
- Find Builders
- Compare Contractors
- View Projects
- Explore Tours

## PartnerCard

Required fields:
- Partner name
- Partner type
- Areas served
- Verification status
- Services
- Project proof indicator
- Media-ready indicator
- View profile CTA
- Send inquiry CTA

Do not include fake ratings or review counts until real data exists.

## MaterialCard

Required fields:
- Material category
- Grade/brand preference if available
- Supplier/service zone
- Rate freshness status
- Stock status if known
- Request quote CTA

Copy guidance:
- Use `Request current rate` instead of fake price values.
- Use `Rate update requested` when data is pending.

## ProjectCard

Required fields:
- Project name
- Location
- Scope
- Project type
- Execution/partner role
- Media proof slot
- View proof CTA

Visual treatment:
- Use real uploads, structured placeholders, or blueprint-style abstract panels.
- Avoid generic stock photography.

## PortalBridgeCard

Required fields:
- Portal name
- Use case
- 360° tour indicator
- External transition copy
- CTA

CTA examples:
- Continue to RealPropRealty
- Open ToLetBoardChennai

## VerificationBadge

Statuses:
- Pending review
- Verified
- Needs revision
- Rejected
- Expired

Required text:
- Never rely on color only.
- Include review type or date when available.

## InquiryForm

Common fields:
- Intent
- Name
- Phone
- Email optional
- Location
- Requirement details
- Timeline

Material-specific fields:
- Material
- Quantity
- Grade/brand preference
- Delivery area

Partner-specific fields:
- Project type
- Budget range
- Site location
- Service needed

Rules:
- Single-column by default.
- Labels above inputs.
- Validate on blur.
- Keep touch targets at least 44px.

## Dashboard MetricCard

Fields:
- Label
- Value
- Unit/context
- Status/trend
- Supporting link

Use only real data. If unavailable, show setup/empty-state guidance.

## StatusTable

Required columns depend on context:

Admin leads:
- Lead
- Intent
- Location
- Owner
- Status
- Next action

Material requests:
- Buyer
- Material
- Quantity
- Delivery zone
- Supplier route
- Status

Verification queue:
- Partner
- Type
- Documents
- Project proof
- Reviewer
- Decision

Mobile behavior:
- Convert rows to stacked cards.
- Preserve status and next action above secondary metadata.


## Dashboard Operating System Components

These components extend the existing Buildogram visual system without changing brand tokens.

### DashboardShell
- Purpose: role-based workspace for Admin, Partner, Supplier, and Customer users.
- Data shown: role navigation, command search, breadcrumbs, notifications, profile/account control, contextual primary action.
- Desktop layout: sidebar + top command bar + scrollable workbench.
- Mobile layout: sticky search, role tabs, bottom nav, mobile action sheets.
- States: default, mobile drawer open, account menu open, command focused, offline/PWA safe.

### MarketplaceHealthCard
- Purpose: summarize operational health without generic KPI cards.
- Data shown: role-specific score plus five weighted signals such as lead response, rate freshness, profile completion, stock health, approval pressure, or request clarity.
- Primary action: open diagnostics.
- Mobile layout: score ring above stacked progress rows.
- Loading state: circular skeleton and five row skeletons.
- Empty state: explain which operational signals are missing.

### LeadCard / InquiryCard
- Purpose: manage marketplace demand with next-action clarity.
- Data shown: requester, type, location, budget/quantity, source, status, SLA, assigned partner/supplier.
- Primary action: open detail drawer or submit quote.
- Secondary action: assign, reassign, contact, mark contacted, close.
- Mobile layout: single card with status and CTA pinned above metadata.
- Error state: preserve draft notes and show retry for status sync.

### ApprovalQueueCard
- Purpose: help admins approve partners with trust evidence.
- Data shown: partner name, role, location, documents, phone verification, project proof, risk flags, recommended action.
- Primary action: approve / request resubmission.
- Secondary action: view documents, add admin note, reject.
- Pending state: checklist incomplete with remaining blockers.
- Rejected state: resubmission note and required proof list.

### RateUpdateWidget / StockAvailabilityWidget
- Purpose: make supplier dashboards feel like material sales operations.
- Data shown: material, current rate, new rate, validity, stock status, delivery zone, freshness warning.
- Primary action: publish rate update or submit quote.
- Secondary action: bulk update, save draft, deactivate listing.
- Desktop layout: editable spreadsheet-style grid.
- Mobile layout: stacked quick-update cards with large controls.

### DataTable + BulkActionToolbar
- Purpose: dense marketplace operations for leads, approvals, suppliers, commissions, and requests.
- Data shown: ID, type, requirement, status, owner, last activity, next action.
- Primary action: open detail drawer.
- Secondary action: multi-select assign, change status, request proof, set follow-up.
- Empty state: no-results message tied to active filter.
- Loading state: table-shaped skeleton rows.

### FormStepper + FileUploadZone
- Purpose: guide profile completion, material listing, quotation, project upload, and customer requirement builder.
- Data shown: step name, completion status, missing fields, draft state.
- Primary action: save and continue / submit for verification.
- Secondary action: preview public profile, save draft, request help.
- Mobile layout: one step per screen with persistent save bar.

### StateBoard
- Purpose: make production states explicit in every dashboard screen.
- Required states: default, loading, empty/no-results, first-use, error/retry, pending verification, rejected/resubmission, success/saved.


## Expanded production dashboard screens

`App.jsx` now treats each Admin, Partner, Supplier, and Customer dashboard page as a separate clickable production screen, not a shared card-only prototype. The implementation package should create dedicated Next.js routes for every screen listed in `dashboard-screen-specs.md`.

Reusable components required:

- `DashboardShell` — role sidebar, command bar, breadcrumb, notifications, profile menu, contextual CTA.
- `RoleMobileNav` — fixed PWA bottom menu with role-priority routes and action sheet trigger.
- `ScreenPurposePanel` — page purpose, desktop layout, mobile layout, and responsive behavior.
- `WorkbenchTable` — dense desktop table that collapses into labeled mobile cards.
- `FilterChipBar` — horizontal filters on mobile, toolbar filters on desktop.
- `DetailDrawer` — desktop side drawer and mobile bottom sheet.
- `StateBoard` — screen-specific empty, loading, error, and success states.
- `ImplementationNotesPanel` — route, CSS Module, DTO, loading/error, and permission notes.

Use CSS Modules and DESIGN.md variables. Do not introduce Tailwind-only implementation. Keep public website pages unchanged and keep Promotion/Reel/IT service tools private to dashboards.
