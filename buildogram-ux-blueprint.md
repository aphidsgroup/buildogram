# Buildogram UX, Product, and Front-End Blueprint

## 1. Product Repositioning

Buildogram should be designed as a **construction ecosystem marketplace** for Chennai/Tamil Nadu first, expandable across India. The homepage, navigation, content hierarchy, and dashboards must communicate discovery, verification, procurement routing, project proof, and partner growth services.

### Product Promise

Buildogram is a verified construction ecosystem marketplace connecting materials, professionals, project proof, and property discovery through one Chennai-first platform.

### Primary Audiences

1. **Material buyers** — homeowners, builders, site engineers, contractors seeking cement, steel, sand, fixtures, and bulk supply routes.
2. **Service seekers** — users looking for builders, contractors, architects, renovation teams, interior vendors, and execution support.
3. **Construction partners** — builders, contractors, architects, suppliers, and vendors seeking leads, proof visibility, media content, and digital growth.
4. **Property seekers** — visitors routed to RealPropRealty for buy/sell and ToLetBoardChennai for rent/lease with 360° tours.
5. **Internal admins** — team members handling verification, lead routing, material requests, partner onboarding, and revenue tracking.

## 2. Core Navigation Model

### Desktop Header

- Left: Buildogram logo/wordmark.
- Center: high-priority search bar with category dropdown and location selector.
- Navigation: Marketplace, Materials, Projects, Properties, Partner Services.
- Right: Login, Register as Partner, Get Material Rate.

### Mega Menu Structure

**Marketplace**
- Builders
- Contractors
- Architects
- Interior Vendors
- Engineers
- Suppliers

**Materials**
- Cement
- Steel
- M-sand & Aggregates
- Bricks & Blocks
- Electrical
- Plumbing
- Tiles & Finishes
- Request Bulk Quote

**Projects**
- Residential
- Commercial
- Renovation
- Interiors
- Site-visited proof
- Submit project proof

**Properties**
- Buy/Sell via RealPropRealty
- Rent/Lease via ToLetBoardChennai
- 360° property tours

**Partner Services**
- Website design
- Software/CRM
- Social media
- Reel collaboration
- Listing optimization

### Mobile Bottom Navigation

1. Home
2. Search
3. Materials
4. Projects
5. Account

The top search remains sticky; category browsing moves into chips and bottom-sheet filters.

## 3. Homepage Wireframe Specification

### Section 1: Sticky Marketplace Header

Components:
- Logo
- Search input
- Location selector
- Mega menu trigger
- Partner CTA
- Property portal quick links

UX notes:
- Search should support materials, partners, projects, and property-related queries.
- Suggested queries should be grouped by type, not shown as one flat list.

### Section 2: High-Intent Marketplace Hero

Layout:
- Left/center: headline, subheadline, search, CTA row.
- Right: stacked proof panel containing material route, verified profile, project proof, and property tour cards.

Primary headline:
> Search materials, verified partners, project proof, and property tours in one construction network.

Primary CTA: Search Marketplace  
Secondary CTA: Get Material Rate  
Partner CTA: Register as Partner

### Section 3: Category Grid

Eight cards:
- Materials & Rates — Request cement, steel, sand, and supply quotes.
- Builders — Find verified builders for residential and commercial work.
- Contractors — Compare trade and execution specialists.
- Architects — Discover design partners and planning support.
- Suppliers — Source construction materials through local networks.
- Projects — Browse proof-backed work and execution stories.
- Property Tours — Continue to 360° buy/rent portal experiences.
- IT & Promotion — Grow partner visibility with websites, CRM, and reels.

### Section 4: Trust and Verification Strip

Use non-fake proof language:
- Verified profiles with document and project-proof review.
- Site-engineer led execution support.
- Relationship-led material procurement routes.
- Dedicated property portal bridges with 360° tour positioning.

### Section 5: Materials Rate Advantage

Content blocks:
1. Tell us what you need.
2. We identify supplier routes.
3. Relationship-led procurement helps secure competitive rates.
4. You receive a quote path.
5. Buildogram coordinates transparently where commission applies.

Required UI:
- Quote form teaser.
- Material category chips.
- Rate freshness explanation.
- No hardcoded fake live rates.

### Section 6: Verified Partner Preview

Cards should include:
- Partner name
- Category
- Areas served
- Verification status
- Project proof count only if real
- Media-ready indicator
- CTA: View Profile / Send Inquiry

### Section 7: Project Showcase

Cards should include:
- Project title
- Location
- Scope
- Execution role
- Media proof slots
- Partner credits
- CTA: View Project Proof

### Section 8: Property Portal Hub

Two bridge cards:
- RealPropRealty — buy/sell property discovery and 360° walkthroughs.
- ToLetBoardChennai — rent/lease discovery and 360° rental tours.

Interaction:
- Clearly state when users are leaving Buildogram for an ecosystem portal.
- Include `rel="noopener noreferrer"` for external links.

### Section 9: How Buildogram Works

Three tabs or columns:
- For Clients
- For Partners
- For Suppliers

Each uses 4–5 steps and one CTA.

### Section 10: Media + Partner Growth

Promote:
- Reel collaboration
- Project shoots
- Portfolio optimization
- Websites and software tools
- Social proof packaging

CTA: Request Partner Growth Support

### Section 11: Lead Capture

Intent-first form with a required intent selector:
- I need materials
- I need a contractor/builder/architect
- I want to register as partner
- I need a property tour
- I need website/marketing help

Form rules:
- Single-column on mobile.
- Labels above inputs.
- Validate on blur.
- Phone and location should be early fields for local matching.

### Section 12: Footer

Columns:
- Marketplace
- Materials
- Projects
- Properties
- Partner Services
- Company
- Trust & Legal

## 4. Directory and Listing UX

### Marketplace Directory

Default layout:
- Desktop: filter rail + result grid + optional inquiry panel.
- Mobile: sticky search + chips + filter bottom sheet + card list.

Filters:
- Category
- Service area
- Verified status
- Project type
- Budget range
- Languages
- Media proof
- Response status

Sort:
- Recommended
- Recently verified
- Newest project proof
- Response time

### Partner Profile Page

Page sections:
1. Profile header with verification summary.
2. Service categories and areas.
3. Project proof gallery.
4. Execution/service description.
5. Media/reel panel.
6. Inquiry form.
7. Related verified partners.

Profile trust checklist:
- Identity reviewed
- Project proof reviewed
- Service areas declared
- Contact verified
- Media-ready profile

## 5. Materials Marketplace UX

### Materials Landing

Search dimensions:
- Material type
- Grade/brand
- Quantity
- Delivery location
- Timeline

Category pages:
- Educational intro.
- Supplier list.
- Quote request form.
- Rate-update disclaimer.
- Related materials.

### Supplier Card Fields

- Supplier name
- Material categories
- Service zones
- Verification status
- Last rate update/requested date
- Stock status where available
- Request current quote CTA

### Quote Request Form

Fields:
- Material category
- Grade/brand preference
- Quantity
- Delivery area
- Timeline
- Buyer name
- Phone
- Notes

Submission confirmation:
> Your request has been sent. Buildogram will review the requirement and route it through suitable supplier relationships where available.

## 6. Registration UX

### Partner Registration Steps

1. Account and contact
2. Business identity
3. Services and areas
4. Project proof uploads
5. Verification documents
6. Review and submit

Each step should show progress, save state, and clear next action.

### Supplier Registration Steps

1. Account and contact
2. Supplier identity
3. Material categories
4. Delivery/service zones
5. Rate/stock update preferences
6. Verification documents
7. Submit for review

## 7. Dashboard Layouts

### Shared App Shell

Desktop:
- Fixed sidebar.
- Top header with page title, search, notifications, profile.
- Main content grid with action panels.

Mobile:
- Header title + search.
- Bottom nav or drawer.
- Priority cards first; tables convert to stacked rows.

### Admin Dashboard Widgets

- Lead pipeline by intent.
- Material request tracker.
- Revenue/commission estimate.
- Partner approval queue.
- Supplier freshness panel.
- Project proof review queue.
- Portal outbound click monitor.
- Media/reel request queue.

### Partner Dashboard Widgets

- Profile completion.
- Verification checklist.
- Lead inbox.
- Project upload manager.
- Media/reel requests.
- IT/promotion recommendations.
- Profile performance summary.

### Supplier Dashboard Widgets

- Material listings.
- Rate update freshness.
- Stock indicators.
- Buyer requests.
- Quote pipeline.
- Commission/routing status.
- Delivery zone manager.

### Customer Dashboard Widgets

- Saved partners.
- Saved materials.
- Quote requests.
- Contractor inquiries.
- 360° tour links.
- Recommended project inspiration.

## 8. Technical Implementation Guidelines

### Next.js Structure

Suggested app routes:

- `app/page.tsx`
- `app/marketplace/page.tsx`
- `app/marketplace/[slug]/page.tsx`
- `app/materials/page.tsx`
- `app/materials/[category]/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/properties/page.tsx`
- `app/partner-services/page.tsx`
- `app/partner/register/page.tsx`
- `app/dashboard/page.tsx`
- `app/dashboard/partner/page.tsx`
- `app/dashboard/supplier/page.tsx`
- `app/admin/page.tsx`

### Component Folders

- `components/navigation/MarketplaceHeader.tsx`
- `components/search/SearchHero.tsx`
- `components/cards/CategoryCard.tsx`
- `components/cards/PartnerCard.tsx`
- `components/cards/MaterialCard.tsx`
- `components/cards/ProjectCard.tsx`
- `components/cards/PortalBridgeCard.tsx`
- `components/badges/VerificationBadge.tsx`
- `components/forms/InquiryForm.tsx`
- `components/dashboard/AppShell.tsx`
- `components/dashboard/MetricCard.tsx`
- `components/dashboard/StatusTable.tsx`

### CSS Modules / Global CSS

- Put tokens in `styles/tokens.css` or `app/globals.css`.
- Use CSS Modules for components: `PartnerCard.module.css`, `MarketplaceHeader.module.css`.
- Use semantic class names: `.partnerCard`, `.verifiedBadge`, `.quotePanel`.
- Avoid Tailwind-only implementations.
- Avoid hardcoded colors inside components; reference variables.

### Breakpoints

```css
@media (max-width: 640px) { /* mobile */ }
@media (min-width: 641px) and (max-width: 1024px) { /* tablet */ }
@media (min-width: 1025px) { /* desktop */ }
```

### Responsive Patterns

- Header search collapses to full-width row on mobile.
- Mega menu becomes drawer.
- Filter rail becomes bottom sheet.
- Result grid becomes single-column list.
- Dashboard tables become stacked cards.
- Long forms use stepper pages.

## 9. Content and Data Rules

- Do not show fake exact material rates.
- Do not show fake partner counts.
- Use qualitative proof until real database metrics exist.
- Prefer `Rate update requested` or `Request current quote` over stale numeric rates.
- Project cards must use real uploaded media or branded abstract placeholders, not generic stock images.
- External property portal transitions must be explicit.

## 10. MVP Screen Priority

Phase 1:
1. Homepage
2. Marketplace directory
3. Partner profile
4. Materials landing
5. Material inquiry flow
6. Partner registration
7. Properties hub bridge
8. Admin verification queue

Phase 2:
1. Supplier dashboard
2. Partner dashboard
3. Project showcase/detail
4. Media/reel request flow
5. Customer dashboard
6. IT & promotion services page

Phase 3:
1. Advanced search recommendations
2. Compare partners/materials
3. Rich analytics dashboards
4. Portal cross-account linking
5. Multilingual Tamil/English content
