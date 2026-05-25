---
version: alpha
name: Buildogram Marketplace Design System
description: Reusable brand, UX, and interface system for Buildogram's construction ecosystem marketplace across web, PWA, partner dashboards, supplier tools, and property portal bridges.
colors:
  background: "#F6F1E8"
  surface: "#FFFDF7"
  surfaceAlt: "#ECE4D6"
  text: "#17202A"
  muted: "#66717D"
  border: "#D8CDBD"
  primary: "#123A5A"
  primarySoft: "#DCEAF2"
  accent: "#D96B2B"
  accentSoft: "#F8E2D2"
  blueprint: "#1E5B7A"
  success: "#2F7D59"
  warning: "#B8791B"
  danger: "#B2473E"
typography:
  display:
    fontFamily: "Manrope, Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 760
    lineHeight: 0.98
  heading:
    fontFamily: "Manrope, Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 720
    lineHeight: 1.08
  body:
    fontFamily: "Plus Jakarta Sans, Noto Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.6
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  xxl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "0.875rem 1.125rem"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "0.875rem 1.125rem"
  marketplace-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
  verified-badge:
    backgroundColor: "{colors.primarySoft}"
    textColor: "{colors.primary}"
    rounded: "999px"
---

## Overview

Buildogram should feel like a verified construction operating network, not a contractor brochure. The public product combines marketplace discovery, material supply routing, turnkey execution trust, project proof, and property portal bridges for Chennai, Tamil Nadu, and India. IT + Promotion services are private partner-dashboard tools only, not public website pages or navigation.

The system direction is **Blueprint Marketplace**: warm concrete backgrounds, precise graphite typography, deep construction blue for trust, restrained material amber/orange for high-intent actions, and card structures inspired by material samples, rate boards, and blueprint annotations.

## Brand Principles

1. **Search-first, proof-rich** — every primary screen should help users find a material, partner, project, or property route quickly.
2. **Verified over viral** — badges, completion states, site/project evidence, and reviewable portfolios matter more than decorative motion.
3. **Local operating depth** — Chennai/Tamil Nadu specificity should appear in copy, filters, area tags, supplier zones, and property portal bridges.
4. **Marketplace density with premium spacing** — dense enough to scale to thousands of listings, but never cramped like a classifieds page.
5. **Relationship-led execution** — Buildogram is not only a lead directory; selected execution and procurement routing are public differentiators.
6. **Partner-only growth tools** — IT + Promotion belongs exclusively inside partner dashboards as a private upsell/workflow, never as a public website page, category, or CTA.

## Logo Direction Ideas

### 1. Blueprint Grid Monogram
- Construct the letter **B** from modular plan-grid blocks.
- A subtle route line can connect blocks to express ecosystem connections.
- Best for: platform/app icon, dashboards, verified stamps.

### 2. Material Stack Wordmark
- A geometric wordmark with stacked slab cuts inside the **B** or **o** forms.
- References cement bags, steel bundles, tile samples, and project layers without clichés.
- Best for: website header, invoices, partner certificates.

### 3. Verified Site Marker
- A location pin plus checkmark embedded into a plan-corner shape.
- Communicates verified partners, project location, and marketplace trust.
- Best for: marketplace badge, app splash, supplier cards.

Avoid crane icons, helmet silhouettes, warning-stripe logos, generic building skylines, and heavy yellow/black construction marks.

## Colors

### Core Palette
- `--bg-concrete: #F6F1E8` — warm off-white concrete page background.
- `--surface-paper: #FFFDF7` — listing cards, forms, dashboard panels.
- `--surface-sand: #ECE4D6` — alternate sections, filter bars, subtle dividers.
- `--text-graphite: #17202A` — primary text.
- `--text-muted: #66717D` — secondary labels and descriptions.
- `--line-stone: #D8CDBD` — borders and blueprint separators.
- `--blue-foundation: #123A5A` — primary brand/trust/action color.
- `--blueprint-line: #1E5B7A` — links, active filters, diagram strokes.
- `--amber-material: #D96B2B` — controlled high-intent CTA/accent.
- `--amber-soft: #F8E2D2` — highlight chips and rate advantage panels.
- `--green-verified: #2F7D59` — verification and approved statuses.
- `--red-issue: #B2473E` — errors, rejected status, urgent stock alerts.

### Usage Ratio
- 65% warm concrete/surface neutrals.
- 25% blue/graphite trust layer.
- 7% amber conversion accents.
- 3% status colors.

## Typography

### Recommended Font Stack
- Primary: **Manrope** for display, headings, CTAs, and navigation.
- Secondary: **Plus Jakarta Sans** for body, cards, forms, dashboards.
- Data/Rate Boards: **IBM Plex Mono** for prices, SKU IDs, rate timestamps, verification IDs.
- Indian-language fallback: include `Noto Sans Tamil` when Tamil content is introduced.

### Type Scale
- Hero display: `clamp(2.5rem, 5vw, 5.25rem)`, 760 weight, 0.98 line-height.
- H1: `clamp(2.25rem, 4vw, 4rem)`, 740 weight.
- H2: `clamp(1.75rem, 3vw, 2.75rem)`, 720 weight.
- H3/Card title: `1.125rem–1.375rem`, 680 weight.
- Body: `1rem`, 1.6 line-height.
- Small UI: `0.8125rem–0.875rem`, never below 12px equivalent.
- Data labels: `0.8125rem`, mono, uppercase only for short labels.

## Spacing & Layout

- Max desktop content width: `1200–1320px`.
- Marketplace grids: `repeat(auto-fit, minmax(240px, 1fr))` for categories; `minmax(280px, 1fr)` for listings.
- Section padding: `clamp(3rem, 7vw, 6.5rem)` vertical.
- Card padding: `1rem` compact, `1.25rem–1.5rem` standard, `2rem` editorial/hero.
- Dashboard shell: sidebar `264px`, content gutter `24px`, dense table rows `56–68px`.
- Mobile safe padding: `16px` page gutter; bottom navigation reserves at least `76px`.

## Elevation & Depth

Use layered, soft construction-paper depth instead of glossy SaaS shadows.

- Level 0: page background, no shadow.
- Level 1: cards with `1px` stone border.
- Level 2: raised marketplace listings with `0 12px 32px rgba(18, 58, 90, 0.08)`.
- Level 3: sticky header, bottom nav, drawers with stronger blur/scrim.
- Level 4: modal/verification drawer with accessible focus trap.

## Shapes

- Primary cards: `24px` radius.
- Chips/badges: pill radius.
- Forms/buttons: `14–16px` radius.
- Blueprint diagrams: square/technical corners may use `10px` radius.
- Avoid overly rounded toy-like cards for contractor/supplier trust surfaces.

## UI Elements

### Cards
- Marketplace cards should show category, service area, verified state, last updated date, proof media, and CTA.
- Use top-left taxonomy chip, top-right verification/rating/stock status.
- Material cards may include rate range, unit, supply zone, and quote CTA.
- Project cards should include location, built-up area, scope, year/status, and media proof indicator.

### Buttons
- Primary blue: broad platform actions such as Search, Send Inquiry, Register Partner.
- Amber: commercial/high-intent actions such as Get Material Rate, Request Quote, Book 360 Tour.
- Secondary outline: Compare, Save, View Profile.
- Ghost: navigation/filter actions.
- Minimum height: 44px, mobile 48px for primary actions.

### Trust Badges
- `Verified Partner` with green check and verification date.
- `Site-visited proof` for projects with Buildogram review.
- `Rate routed by Buildogram` for materials where procurement relationships apply.
- `360° tour ready` for property cards.
- `Media collaboration available` for partners open to reels/social proof.

### Category Pills
- Use muted sand backgrounds by default.
- Active pill: blueprint blue border/fill.
- High-intent material categories may use amber soft background.
- Include count only when real data exists; otherwise avoid fake metrics.

### 360° Property Tour Indicators
- Use a circular panoramic ring icon with compass tick marks.
- Label examples: `360° tour`, `Virtual walkthrough`, `Hosted on RealPropRealty`, `Rental tour via ToLetBoardChennai`.
- Treat external portal transitions as branded bridge cards, not abrupt outbound links.

## Website Information Architecture

### Top-Level Navigation
1. Home
2. Marketplace
3. Materials
4. Projects
5. Construction Services
6. Properties
7. Partner Services
8. About
9. Contact
10. Login

### Full Sitemap

#### Home `/`
- Marketplace hero search
- Category grid
- Verified partner highlights
- Material rate advantage
- Project proof showcase
- Property portal bridge
- How Buildogram works
- Media/reel collaboration
- Lead capture
- Marketplace-scale footer

#### Marketplace / Partner Directory `/marketplace`
- All partners listing
- Filters: profession, service area, verified status, project type, budget range, language, media proof
- Sort: recommended, recently verified, project count, response time
- Listing types: builders, contractors, architects, engineers, interior vendors, suppliers, IT/marketing partners

#### Partner Profile `/marketplace/[partnerSlug]`
- Verification summary
- Services and service areas
- Project portfolio
- Material/vendor links if relevant
- Media/reel proof
- Inquiry form
- Related partners

#### Partner Registration `/partner/register`
- Account details
- Business identity
- Service categories
- Area coverage
- Project uploads
- Verification documents
- Review/submit

#### Materials Marketplace `/materials`
- Search by material, grade, brand, location
- Categories: cement, steel, M-sand, aggregates, bricks/blocks, electrical, plumbing, tiles, paint, hardware
- Rate advantage explainer
- Supplier cards
- Quote request flow

#### Material Category `/materials/[category]`
- Category education
- Current rate guide language without fake exact numbers
- Supplier list
- Buyer inquiry form
- Bulk purchase CTA

#### Supplier Page `/materials/suppliers/[supplierSlug]`
- Supplier verification
- Materials offered
- Delivery/service zones
- Stock/rate update timestamp
- Quote request

#### Projects / Works Showcase `/projects`
- Residential, commercial, renovation, interior, institutional filters
- Project cards with proof media
- Before/after and reel links

#### Project Detail `/projects/[projectSlug]`
- Scope, location, timeline, project team
- Gallery/reel embed slots
- Materials used
- Partner credits
- Inquiry CTA

#### Construction Services `/construction-services`
- Turnkey execution
- Renovation
- Structural/site engineering
- Cost estimation
- Material procurement support
- Consultation CTA

#### Property Portals Hub `/properties`
- Buy/sell bridge to RealPropRealty
- Rent/lease bridge to ToLetBoardChennai
- 360° virtual tour positioning
- Featured tour cards
- External portal CTAs

#### Partner-only IT + Promotion services
- Lives only inside `/dashboard/partner`
- Websites for builders/architects/suppliers
- CRM/lead tools
- Listing optimization
- Private partner upgrade CTA
- Do not expose this as a public page, homepage category, nav item, footer link, or lead-capture CTA

#### About `/about`
- Founder/site-engineer credibility
- Relationship-led supply advantage
- Operating geography
- Verification philosophy

#### Contact `/contact`
- Customer inquiry
- Material quote request
- Partner onboarding request
- Property portal inquiry
- Partner login/support inquiry

#### Blog / Guides `/guides`
- Material buying guides
- Contractor hiring guides
- Project planning guides
- Property tour guides
- Marketplace growth guides

#### Login `/login`
- Customer, partner, supplier, admin role routing

#### Dashboards
- Admin: `/admin`
- Partner: `/dashboard/partner`
- Supplier: `/dashboard/supplier`
- Customer: `/dashboard`

## Homepage Design Blueprint

### 1. Marketplace Header
- Sticky top header with Buildogram mark, primary search, category menu, `Register as Partner`, `Find Materials`, and property portal links.
- Mega menu sections: Professionals, Materials, Projects, Property, Partner Growth.
- Header search placeholder: `Search materials, builders, contractors, architects, projects...`
- Include location selector defaulting to `Chennai / Tamil Nadu`.

### 2. High-Intent Hero
Headline options:
- `Find verified construction partners, material rates, projects, and property tours in one network.`
- `A construction marketplace built for materials, professionals, projects, and property discovery.`
- `Build with verified people, better material routes, and proof-backed project partners.`

Subheadline:
`Buildogram connects material buyers, builders, contractors, architects, suppliers, project showcases, and property portals through one verified Chennai-first construction ecosystem.`

Hero modules:
- Large search bar with category dropdown.
- Quick chips: Cement, Steel, Contractors, Architects, 360° Tours, Project Showcase.
- CTA row: `Search Marketplace`, `Get Material Rate`, `Register Partner`.
- Proof strip: `Verified profiles`, `Site-led execution`, `Material procurement support`, `360° portal bridges`.

### 3. Category Grid
Categories:
- Materials & Rates
- Builders
- Contractors
- Architects
- Suppliers
- Project Showcase
- Property Tours
- Consultation

Each card includes:
- One-line use case.
- Relevant CTA.
- Trust/status cue, not fake metrics.

### 4. Trust Stats & Verified Partners
Use proof-first statements rather than invented counts:
- `Partner verification in progress across Chennai zones`
- `Site-engineer reviewed project submissions`
- `Material supply routed through relationship-led procurement`
- `Property discovery connected to dedicated portal ecosystems`

Only use numeric stats after real database values exist.

### 5. Materials Rate Advantage
Explain:
1. Buyer submits material need.
2. Buildogram identifies suitable supplier/route.
3. Family supply network helps negotiate market-aware rates.
4. Buyer receives quote/connection.
5. Buildogram earns partner commission transparently where applicable.

UI pattern: rate-route timeline plus quote form card.

### 6. Project Showcase
- Feature cards with project type, location, scope, proof media, partner credits.
- Support before/after, reels, walkthroughs, completion certificates.
- CTA: `Explore verified works`, `Submit your project proof`.

### 7. Property Portals
Two bridge cards:
- RealPropRealty: buy/sell properties, verified listing experience, 360° tours.
- ToLetBoardChennai: rent/lease, local discovery, 360° rental walkthroughs.
- Clear external handoff copy: `Continue to RealPropRealty` / `Open ToLetBoardChennai`.

### 8. How Buildogram Works
Split by audience:
- For clients: Search → Compare proof → Send inquiry → Get matched/executed.
- For partners: Register → Upload proof → Verify → Receive leads → Grow with media/IT.
- For suppliers: List materials → Update rates/stock → Receive buyer requests → Fulfill through routed relationships.

### 9. Social/Media Showcase
- Reel collaboration panel.
- `Project proof kit`: site photos, short-form videos, walkthrough reels, profile optimization.
- CTA: `Request a reel collaboration`.

### 10. Lead Capture & Footer
Lead forms should segment by intent:
- Need materials
- Need contractor/builder/architect
- Want to register as partner
- Need property tour
- Need website/marketing

Footer groups:
- Marketplace
- Materials
- Projects
- Properties
- Partner Services
- Company
- Legal/Trust

## Desktop Design Rules

- Use a sticky marketplace header with search as the dominant control.
- Keep categories visible above or immediately below the hero fold.
- Use three-lane desktop layouts for discovery pages: filter rail, result grid, contextual proof/quote panel.
- Listing cards should be scannable at 280–360px width.
- Use saved/compare actions but avoid cluttering every card with too many CTAs.
- Keep page surfaces warm and editorial; reserve amber for conversion moments.
- Mega menu must be structured by user intent, not company departments.
- Data tables in dashboards should have sticky headers and visible status chips.

## Mobile / PWA Design Rules

- Top area: sticky search bar with location selector.
- Bottom navigation: Home, Search, Materials, Projects, Account.
- Category chips are horizontally scrollable with clear active state.
- Cards become stacked, thumb-friendly rows with one primary CTA.
- Use drawers/bottom sheets for filters and quote forms.
- Registration flows should be split into steps of 5–7 fields.
- Minimum tap target: 44px; primary mobile CTAs 48px.
- Leave safe-area spacing for PWA installs and Android gesture navigation.
- Dashboards should prioritize inbox, profile status, and next action over full analytics on first screen.

## Dashboard Concepts

### Admin Dashboard
Navigation:
- Overview
- Leads
- Material Requests
- Partners
- Suppliers
- Projects
- Properties Portal Clicks
- Media Requests
- Revenue / Commission
- Verification Queue
- Settings

Widgets:
- Lead pipeline by intent
- Material request tracker
- Commission estimate by routed material category
- Partner approval queue
- Supplier rate update freshness
- Project submissions needing review
- Property portal outbound clicks
- Media/reel requests
- Open issues and SLA alerts

Key tables:
- Recent leads: source, intent, location, assigned owner, status, next action.
- Verification queue: partner type, documents, project proof, reviewer, decision.
- Material routing: buyer need, category, quantity, supplier route, commission status.

### Partner Dashboard
Navigation:
- Profile
- Leads
- Projects
- Media Requests
- Verification
- Services
- Insights
- Support

Widgets:
- Profile completion score
- Verification status checklist
- Lead inbox
- Project portfolio uploads
- Response-time indicator
- Reel collaboration requests
- IT/marketing service recommendations

### Supplier Dashboard
Navigation:
- Overview
- Materials
- Rate Updates
- Buyer Requests
- Stock
- Commissions
- Delivery Zones
- Profile

Widgets:
- Active material listings
- Rate update freshness
- Stock indicators
- Buyer request inbox
- Quote status pipeline
- Commission tracking
- Delivery/service zone map list

### Customer/User Dashboard
Navigation:
- Saved
- Inquiries
- Quotes
- Project Requests
- Property Tours
- Messages
- Account

Widgets:
- Saved partners/materials
- Open material quote requests
- Contractor/architect inquiries
- Recommended verified partners
- 360° property tour links
- Recent project inspirations

## Critical UX Flows

### 1. Material Search → Supplier → Inquiry
1. User searches `cement`, `steel`, or selects material category.
2. Results show supplier cards, service zones, verification, rate update freshness.
3. User filters by location, quantity, brand/grade, delivery timeline.
4. User opens material/supplier detail.
5. User submits quote inquiry with material, quantity, location, phone/email, timeline.
6. Confirmation explains Buildogram may route via partner supply relationships.
7. Admin/supplier receives request and updates status.
8. User dashboard tracks quote status.

### 2. Contractor Search → Verified Profile → Lead
1. User searches contractor/builder/architect or browses category.
2. Directory results show verified badge, project proof, areas served, services.
3. User opens profile and reviews portfolio, media proof, service fit.
4. User sends inquiry with project type, location, budget range, timeline.
5. Partner receives lead in dashboard.
6. User sees inquiry status and suggested next steps.

### 3. Builder Registration → Projects → Verification
1. Partner selects `Register as Partner`.
2. Chooses role: builder, contractor, architect, supplier, service provider.
3. Adds business identity and contact.
4. Selects service categories and coverage areas.
5. Uploads project proof: images, videos, scope, location, year, role.
6. Uploads verification documents.
7. Submits for review.
8. Admin reviews documents and project proof.
9. Partner receives approved/revision/rejected status with clear next actions.

### 4. Supplier Registration → Materials → Inquiries
1. Supplier selects supplier role.
2. Adds company, contact, GST/business details if applicable, service zones.
3. Adds material categories and products.
4. Enters rate-update preference and stock availability fields.
5. Submits for verification.
6. Once approved, receives buyer requests.
7. Supplier responds with quote/status.
8. Commission/route status is tracked in dashboard.

### 5. 360° Property Exploration → Portal Redirect
1. Visitor opens Properties hub.
2. Chooses buy/sell or rent/lease path.
3. Reads short bridge explaining dedicated portal experience.
4. Opens featured 360° tour card or external portal CTA.
5. External handoff page/link opens RealPropRealty or ToLetBoardChennai.
6. Buildogram dashboard/admin records outbound interest if tracking is implemented legitimately.

### 6. Partner Reel / IT Service Request
1. Partner dashboard shows `Grow with media & digital` card.
2. Partner chooses reel collaboration, website, CRM/software, or listing optimization.
3. Form captures objective, existing assets, preferred shoot area/date, budget range.
4. Admin reviews and assigns media/IT service owner.
5. Partner tracks request status and deliverables.

### 7. Admin Verification Pipeline
1. New partner/supplier submission enters queue.
2. Admin reviews identity, service claims, coverage, documents, proof media.
3. Admin requests revisions or approves.
4. Approved profile receives verification badge and public listing eligibility.
5. Admin can flag profiles for periodic re-verification.
6. Audit trail records reviewer, date, decision, reason.

## Copywriting Direction

### Core Message
`Buildogram is a verified construction ecosystem marketplace connecting materials, professionals, project proof, and property discovery through one Chennai-first platform.`

### Hero Headlines
- `Search materials, verified partners, project proof, and property tours in one construction network.`
- `A Chennai-first construction marketplace for materials, professionals, projects, and property discovery.`
- `Build with verified partners, smarter material routes, and proof-backed execution support.`

### Subheadlines
- `Find builders, contractors, architects, suppliers, material routes, project showcases, and 360° property portals through one trusted Buildogram ecosystem.`
- `From cement and steel inquiries to verified site professionals and property walkthroughs, Buildogram helps construction decisions move with proof.`

### CTA Labels
- Search Marketplace
- Find Materials
- Get Best Material Route
- Find Contractors
- Register as Partner
- Upload Project Proof
- Explore 360° Tours
- Request Reel Collaboration
- Continue to RealPropRealty
- Open ToLetBoardChennai

### Trust Badge Microcopy
- Verified partner profile
- Project proof reviewed
- Site-engineer led execution support
- Material route supported by Buildogram
- 360° tour available
- Media-ready portfolio
- Rate update requested

### Dashboard Labels
- Lead Inbox
- Material Requests
- Verification Queue
- Profile Completion
- Project Proof Library
- Rate Freshness
- Supplier Route
- Portal Clicks
- Commission Status
- Media Requests

## Implementation Tokens

Use CSS variables in global CSS or a `tokens.css` module. Do not implement this system as Tailwind-only utility classes.

```css
:root {
  --bg-concrete: #F6F1E8;
  --surface-paper: #FFFDF7;
  --surface-sand: #ECE4D6;
  --text-graphite: #17202A;
  --text-muted: #66717D;
  --line-stone: #D8CDBD;
  --blue-foundation: #123A5A;
  --blueprint-line: #1E5B7A;
  --blue-soft: #DCEAF2;
  --amber-material: #D96B2B;
  --amber-soft: #F8E2D2;
  --green-verified: #2F7D59;
  --red-issue: #B2473E;
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --space-1: 0.5rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  --container: 1280px;
  --shadow-card: 0 12px 32px rgba(18, 58, 90, 0.08);
  --shadow-float: 0 20px 60px rgba(23, 32, 42, 0.16);
}
```

## Component Guidelines

### MarketplaceHeader
- Props: `categories`, `location`, `portalLinks`, `onSearch`, `partnerCtaHref`.
- Desktop: logo, mega menu, central search, location selector, partner CTA.
- Mobile: logo, compact search, menu button; bottom nav handles primary sections.

### SearchHero
- Props: `headline`, `subheadline`, `popularChips`, `primaryCta`, `secondaryCta`.
- Includes category dropdown and location field.
- Should submit to `/search?q=&type=&location=`.

### CategoryCard
- Props: `title`, `description`, `icon`, `intent`, `href`, `statusLabel`.
- Status label can be qualitative only until real data exists.

### PartnerCard
- Props: `name`, `type`, `areas`, `verifiedStatus`, `projectProof`, `mediaReady`, `ctaHref`.
- Include save/compare as secondary actions.

### MaterialCard
- Props: `category`, `grade`, `serviceZones`, `rateFreshness`, `stockStatus`, `quoteHref`.
- Avoid fake exact rates; show `Request current rate` unless live rates are verified.

### ProjectCard
- Props: `title`, `location`, `scope`, `year`, `media`, `partnerCredits`, `href`.
- Use image/video slots for real uploads; no generic stock construction imagery.

### PortalBridgeCard
- Props: `portalName`, `intent`, `tourAvailable`, `description`, `externalHref`.
- Must make external transition clear.

### VerificationBadge
- Props: `status`, `verifiedAt`, `reviewType`.
- Statuses: pending, verified, needs_revision, rejected, expired.

### InquiryForm
- Single-column by default.
- Required labels visible above fields.
- Validate on blur and submit.
- Use role-specific fields to avoid asking irrelevant questions.

## Accessibility

- All interactive controls require visible focus states.
- Badges cannot rely on color alone; include text and icons.
- Header search must have a real label or accessible `aria-label`.
- Mega menus and mobile drawers must be keyboard navigable.
- External portal links should state they open another Buildogram ecosystem site.
- Use reduced-motion handling for carousels and animated proof strips.

## Do's and Don'ts

### Do
- Show marketplace categories above the fold.
- Make search, quote, and registration flows obvious.
- Use verified/proof states as first-class UI elements.
- Keep material-rate claims transparent and relationship-led.
- Treat RealPropRealty and ToLetBoardChennai as ecosystem bridges.
- Build components with CSS Modules/global CSS and semantic React components.

### Don't
- Do not use yellow/black caution-stripe construction clichés.
- Do not invent fake marketplace counts or exact rates.
- Do not rely on stock construction photos as credibility.
- Do not make the homepage a corporate about-us brochure.
- Do not hide partner registration behind generic contact forms.
- Do not implement the design as Tailwind-only class strings.


## Implemented Visual Prototype

### Marketplace Homepage (`App.jsx`)
- Search-led hero positions Buildogram as a construction ecosystem marketplace, not a brochure site.
- Above-the-fold category grid covers Materials, Builders, Contractors, Architects, Suppliers, Projects, 360° Property Tours, and Consultation. IT + Promotion is intentionally absent from public discovery.
- Listing cards use verification status, service area, proof strip, category tags, and direct profile/save actions.
- Material-rate section uses a dark blueprint board with routed supplier rows and quote-request CTAs.
- Project showcase uses proof-oriented cards with location, scope, and site-proof actions instead of stock photography.
- Property bridge uses a dedicated 360° visual indicator and two portal route cards for RealPropRealty and ToLetBoardChennai.
- Mobile behavior includes sticky top navigation, horizontal category/listing scrollers, large touch targets, and a fixed bottom navigation bar.


## Implemented Full Prototype Coverage

The current `App.jsx` now contains a complete clickable prototype shell for the Buildogram product, preserving the Blueprint Marketplace visual direction and reusable token system.

### Visual Screens Included
- Homepage marketplace discovery
- Marketplace / partner directory
- Partner profile page
- Partner registration flow
- Materials marketplace page
- Supplier material category/profile page
- Projects / works showcase page
- Project detail proof page
- Construction services page
- Property portals hub for RealPropRealty and ToLetBoardChennai bridge positioning
- Partner-only IT + Promotion tools inside the Partner dashboard
- Material inquiry flow
- Contractor lead flow

### Dashboard Screens Included
- Admin operations dashboard
- Partner dashboard
- Supplier dashboard
- Customer dashboard

### Navigation Pattern
Desktop uses a persistent left prototype rail grouped by Marketplace, Showcase, Registration, and Dashboards. Mobile uses a five-item bottom navigation for Home, Search, Rates, Dashboard, and Join, with the global sticky search retained above the content.

### Reusable Components Represented
The prototype includes reusable patterns for page heroes, category cards, partner cards, project cards, rate rows, portal cards, flow steps, verification checklists, mini forms, KPI cards, dashboard widgets, filter bars, and marketplace lead CTAs.


## Dashboard Operating System Redesign

The dashboard layer has been upgraded from generic admin-template cards into a role-specific marketplace operating system while preserving existing Buildogram colors, typography, spacing, card radius, and blueprint/material visual language.

### Global dashboard shell
- Desktop uses a role-specific sidebar, command/search bar, breadcrumbs, page title, contextual primary action, notification control, dense workbench, and detail/state panels.
- Mobile/PWA uses role-prioritized bottom navigation plus compact quick tabs; it does not simply shrink desktop navigation.
- Every dashboard screen pattern includes: default state, loading skeleton, no-results/empty state, retry/error state, saved/success state, and pending/rejected review language where applicable.

### Role IA
- Admin OS prioritizes marketplace health, leads, partner approvals, material quote pressure, project review, supplier freshness, commission tracking, property portal analytics, and private partner growth request administration.
- Partner OS prioritizes lead response, profile completion, verification, project portfolio uploads, analytics, subscription/commission, and private Promotion/Reel/IT service requests.
- Supplier OS prioritizes buyer inquiries, material listings, rate updates, stock availability, quotes, commission settlement, and supplier profile verification.
- Customer OS prioritizes active requests, saved partners/materials, quotation tracking, property tours, project requirement building, and contact history.

### Stable dashboard components
- `DashboardShell`, `RoleSidebar`, `DashboardMetricCard`, `MarketplaceHealthCard`, `PriorityPanel`, `KanbanPipeline`, `OperationalMonitor`, `RevenueCommissionCard`, `DataTable`, `BulkActionToolbar`, `DetailDrawer`, `FormStepper`, `StateBoard`, and `MobileRoleNav` are the reusable dashboard primitives for Next.js implementation.
- Components should be implemented with React + CSS Modules/global CSS variables, not Tailwind-only utility classes.
- Dashboard copy must remain Buildogram-specific: material inquiries needing supplier quote, supplier rates going stale, project proof review, profile strength, quote deadlines, saved tours, and commission pipeline.


## Production Dashboard Screen Expansion

The dashboard system is now expanded from four shared role prototypes into separate production screens. Preserve the existing Buildogram colours, typography, rounded scale, spacing, and public website styling.

- Admin: Overview, Lead Management, Lead Detail, Partner Approval Queue, Partner Detail Review, Partner Management, Supplier Management, Material Inquiry Management, Supplier Quote Comparison, Project Showcase Review, Revenue/Commission Tracking, Property Portal Analytics, Promotion/Reel/IT Requests, Reports, Settings.
- Partner: Overview, Lead Inbox, Lead Detail, Profile Completion Stepper, Project Portfolio List, Project Upload/Edit, Verification Status, Promotion/Reel Request, Analytics, Subscription/Commission, Settings.
- Supplier: Overview, Buyer Inquiry Inbox, Inquiry Detail, Material Listings, Add/Edit Material, Rate Update Table, Stock/Availability, Quotes, Quote Detail, Commission Tracking, Profile Settings.
- Customer: Overview, Saved Partners, Saved Materials, My Requests, Request Detail, Quotation Tracking, Property Tour Links, Project Requirement Builder, Contact History, Settings.

Each production dashboard route must define page purpose, desktop layout, mobile/PWA layout, components used, data fields, table/card fields, filters, primary CTA, secondary CTA, empty/loading/error/success states, responsive behavior, and Next.js + CSS Modules implementation notes.

Implementation route pattern: `app/dashboard/{role}/{screen}/page.tsx` with colocated `{screen}.module.css`, route-level `loading.tsx` and `error.tsx`, shared state components, typed data models, and DESIGN.md CSS variables. Promotion/Reel/IT remains private to Admin and Partner dashboards only.
