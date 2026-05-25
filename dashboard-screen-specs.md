# Buildogram Production Dashboard Screen Matrix

This document expands the four role dashboards into separate production screens while preserving the existing Buildogram brand system, public website, colours, typography, and marketplace positioning.

## Shared production requirements

Every dashboard screen uses the same production contract:

- **Page purpose:** one role-specific operational job, not a shared dashboard summary.
- **Desktop layout:** dashboard shell with sidebar, command/search, breadcrumb, contextual CTA, filters, workbench table/cards, detail drawer, state panel, and audit/timeline surface.
- **Mobile/PWA layout:** sticky screen header/search, fixed role bottom navigation, horizontal filters, stacked cards, bottom action sheet, and thumb-safe CTAs.
- **Components used:** role shell, command bar, filter chips, KPI/health cards, workbench table, responsive cards, drawer, timeline, state board, and implementation notes panel.
- **Data fields:** typed record IDs, locality, role/person/company, category, status, SLA/validity, owner, value/budget/rate, proof/document status, and next action.
- **Table/card fields:** ID, type, requirement, status, owner/value, last activity, and row actions.
- **Filters:** role-specific status chips plus location, SLA, category, review, saved, rate freshness, quote status, or commission filters as relevant.
- **Primary CTA:** one screen-specific action, visible on desktop header and mobile action sheet.
- **Secondary CTA:** detail drawer, export/share, compare, schedule, or permission action depending on the screen.
- **Empty state:** no-results guidance with a recovery action.
- **Loading state:** skeleton for title, KPI cards, filters, rows/cards, and drawer.
- **Error state:** retryable route or data-sync failure message.
- **Success state:** saved status with timeline update and next recommended action.
- **Responsive behavior:** dense desktop tables collapse into labeled mobile cards; drawers become action sheets; navigation becomes role bottom menu.
- **Next.js + CSS Modules notes:** implement each as `app/dashboard/{role}/{screen}/page.tsx` with colocated CSS module, route `loading.tsx`, `error.tsx`, typed DTOs, and DESIGN.md CSS variables.

## Admin screens

1. Overview
2. Lead Management
3. Lead Detail
4. Partner Approval Queue
5. Partner Detail Review
6. Partner Management
7. Supplier Management
8. Material Inquiry Management
9. Supplier Quote Comparison
10. Project Showcase Review
11. Revenue/Commission Tracking
12. Property Portal Analytics
13. Promotion/Reel/IT Requests
14. Reports
15. Settings

Admin screens cover marketplace governance, assignment, approvals, supplier routing, quote comparison, project proof review, private partner-growth requests, commissions, reports, and system settings.

## Partner screens

1. Overview
2. Lead Inbox
3. Lead Detail
4. Profile Completion Stepper
5. Project Portfolio List
6. Project Upload/Edit
7. Verification Status
8. Promotion/Reel Request
9. Analytics
10. Subscription/Commission
11. Settings

Partner screens cover verified profile growth, lead response, portfolio proof, verification, private Promotion/Reel/IT requests, visibility analytics, subscription/commission, and settings.

## Supplier screens

1. Overview
2. Buyer Inquiry Inbox
3. Inquiry Detail
4. Material Listings
5. Add/Edit Material
6. Rate Update Table
7. Stock/Availability
8. Quotes
9. Quote Detail
10. Commission Tracking
11. Profile Settings

Supplier screens cover material demand, inquiry response, listing management, rate freshness, stock status, quote building, commission settlement, and supplier profile governance.

## Customer screens

1. Overview
2. Saved Partners
3. Saved Materials
4. My Requests
5. Request Detail
6. Quotation Tracking
7. Property Tour Links
8. Project Requirement Builder
9. Contact History
10. Settings

Customer screens cover active request tracking, saved marketplace comparisons, quote tracking, portal tour continuity, requirement building, contact history, and preferences.

## Prototype status

`App.jsx` now exposes these screens as clickable sidebar and bottom-nav routes. Each route renders its purpose, desktop/mobile layout, component inventory, data/table fields, filters, CTAs, states, responsive behavior, and Next.js + CSS Modules implementation guidance.
