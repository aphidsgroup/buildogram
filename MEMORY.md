---
schemaVersion: 1
scope: workspace
updatedAt: "2026-05-25T19:34:55.094Z"
workspaceName: "Buildogram-First-Design"
---

# Project Memory

## Project Overview
- Buildogram is being redesigned from a construction corporate website into a Chennai/Tamil Nadu/India-focused construction ecosystem marketplace.
- The platform connects material buyers, builders, contractors, architects, suppliers, property seekers, project owners, customers, and verified construction partners.
- Positioning: IndiaMART meets Houzz meets Urban Company for construction/property, with marketplace discovery, execution trust, project proof, material-rate advantage, property portal bridges, and private partner growth services.

## Current State
- Workspace has document-first handoff files and a visible full-product clickable UI prototype.
- `DESIGN.md` exists, has been validated, and remains the authoritative design-system artifact.
- `App.jsx` is currently the only source file and contains the clickable multi-page prototype.
- Public website, marketplace pages, registration/lead flows, materials/projects/property areas, and role dashboards are represented.
- The 4 dashboards have now been expanded from shared prototype dashboard views into separate clickable production-style screens.
- Dashboard screens preserve the existing Buildogram brand colours, typography, spacing, and public website style.
- Public IT + Promotion services remain removed from public website pages, navigation, category cards, project CTAs, and public flows.
- IT + Promotion services appear only inside private partner/dashboard tools.
- Prototype remains mobile-friendly as a clickable design prototype, with responsive breakpoints, sticky/search-first marketplace patterns, touch-friendly cards/actions, app-like dashboard layouts, and fixed PWA-style mobile bottom navigation/menu bar.
- Latest validation passed: preview rendered with 446 nodes, 0 console errors, and 0 asset errors; final done check reported no syntactic/runtime issues.

## Artifacts
- `DESIGN.md` — authoritative Buildogram brand/design-system baton, now also noting the separate production dashboard screen architecture.
- `App.jsx` — visible clickable prototype covering public marketplace pages and separate clickable screens for Admin, Partner, Supplier, and Customer dashboards.
- `dashboard-screen-specs.md` — newly added production screen specification document for every dashboard screen, covering purpose, desktop/mobile layout, components, data/table/card fields, filters, CTAs, states, responsive behavior, and Next.js + CSS Modules notes.
- `component-specs.md` — reusable component specs; updated with dashboard screen system/route guidance.
- `buildogram-ux-blueprint.md` — comprehensive UX blueprint; may still contain older IT/Promotion references and should be reconciled later.
- No `AGENTS.md`, `.codesign/settings.json`, assets, or separate style files noted.

## Design Direction
- Marketplace-first, not brochure-first.
- Trustworthy, verified, professional, digital-first, scalable, and India-specific construction ecosystem feel.
- Visual tone uses the existing Buildogram design system: concrete/off-white surfaces, charcoal/graphite text, deep construction blue/slate for trust, restrained safety orange/material amber accents.
- Avoid generic corporate construction clichés, heavy yellow/black schemes, overused stock photos, empty SaaS aesthetics, fake marketplace metrics, Tailwind-only designs, and generic “Total Users / Total Sales” dashboard cards.
- Dashboard direction: premium operational marketplace OS combining IndiaMART seller workflows, Urban Company partner operations, Houzz professional credibility, Shopify admin structure, Airbnb host clarity, construction CRM, and marketplace command-center depth.
- Dashboard layout direction: separate route-like screens with desktop sidebars, top command/search, breadcrumbs, notifications, profile menus, contextual CTAs, filters, drawers, tables, pipelines, timelines, state panels, and workflow cards.
- Mobile direction: role-specific PWA workflows with sticky search, fixed bottom nav/menu bar, mobile drawers/action sheets, quick actions, large touch targets, compact operational cards, and fast lead/quote/approval/update flows.

## User Feedback
- User requires comprehensive Open Co-design and definitive development blueprint.
- User requires Next.js implementation guidance using Custom CSS Modules / Global CSS, not Tailwind-only class-based designs.
- User wanted a visible UI and complete project UI with all pages and dashboards.
- User clarified IT + Promotion must not show anywhere on the public website and must appear only inside partner dashboards.
- User said dashboards were too basic and requested deeper premium redesign of the 4 dashboards while preserving brand colours, typography, spacing, and public website style.
- User confirmed dashboard direction was now correct, but said the dashboards still felt like shared prototype screens.
- User requested each dashboard be expanded into separate full production screens with detailed specs and clickable App.jsx routes.

## Decisions
- Workspace title/design name remains “Buildogram Marketplace Blueprint.”
- `DESIGN.md` is the only authoritative design-system artifact.
- Current prototype is still implemented in single-file `App.jsx`, not yet split into Next.js route/component files.
- Core dashboards are Admin, Partner, Supplier, and Customer/User.
- Admin screens: Overview, Lead Management, Lead Detail, Partner Approval Queue, Partner Detail Review, Partner Management, Supplier Management, Material Inquiry Management, Supplier Quote Comparison, Project Showcase Review, Revenue/Commission Tracking, Property Portal Analytics, Promotion/Reel/IT Requests, Reports, Settings.
- Partner screens: Overview, Lead Inbox, Lead Detail, Profile Completion Stepper, Project Portfolio List, Project Upload/Edit, Verification Status, Promotion/Reel Request, Analytics, Subscription/Commission, Settings.
- Supplier screens: Overview, Buyer Inquiry Inbox, Inquiry Detail, Material Listings, Add/Edit Material, Rate Update Table, Stock/Availability, Quotes, Quote Detail, Commission Tracking, Profile Settings.
- Customer screens: Overview, Saved Partners, Saved Materials, My Requests, Request Detail, Quotation Tracking, Property Tour Links, Project Requirement Builder, Contact History, Settings.
- Every production dashboard screen should define purpose, desktop/mobile layout, components, data fields, table/card fields, filters, CTAs, empty/loading/error/success states, responsive behavior, and Next.js + CSS Modules notes.
- Mobile navigation pattern remains fixed PWA-style bottom menu with role/page shortcuts and touch-friendly behavior.

## Open Questions
- Exact logo direction has not been visually selected or finalized.
- Real partner/category data, verification criteria, and marketplace metrics are not yet available.
- Need confirm integration behavior and branding relationship with `realproprealty.com` and `toletboardchennai.in`.
- Need determine final dashboard MVP scope, role permissions, and backend data model.
- Need choose final imagery strategy: real project photography, supplier assets, generated placeholders, or mixed media.
- Need decide when to refactor single-file `App.jsx` into Next.js-style routes/components with CSS Modules.
- Need reconcile older references in `buildogram-ux-blueprint.md` with dashboard-only IT + Promotion and latest dashboard screen architecture.

## Next Steps
- Review the newly expanded separate dashboard screens with the user and confirm information hierarchy/workflows.
- Reconcile `buildogram-ux-blueprint.md` with dashboard-only IT + Promotion and the new production dashboard screen architecture.
- Refactor `App.jsx` into production-ready Next.js route files and reusable components.
- Translate stable `DESIGN.md` tokens into production CSS variables/global CSS and CSS Modules.
- Build reusable React components for dashboard shell, command bar, sidebar, mobile bottom nav, metric cards, health cards, lead/inquiry cards, approval queues, data tables, comparison views, forms, steppers, uploads, timelines, empty/loading/error/success states, and action sheets.
- Define real content models for partners, suppliers, projects, materials, leads, inquiries, quotes, commissions, dashboard notifications, verification records, property portal links, and promotion/reel/IT requests.
- Validate mobile PWA dashboard usability beyond prototype level.

## Promotion Candidates For DESIGN.md
- Separate production dashboard screen architecture for Admin, Partner, Supplier, and Customer.
- Dashboard route taxonomy listed in Decisions should become stable product IA if approved.
- Dashboard screen spec requirement: purpose, layout, components, data fields, CTAs, filters, states, responsive behavior, and Next.js + CSS Modules notes.
- Public website excludes IT + Promotion services entirely.
- IT + Promotion services appear only inside Partner/private dashboard tools.
- Role-based dashboard shell pattern with desktop sidebar, top command/search, breadcrumbs, notifications, profile menu, contextual CTA, filters, mobile bottom nav, drawers/action sheets, and quick actions.
- Empty/loading/error/success/pending/rejected/resubmission states for dashboard workflows.
- Current clickable prototype confirms responsive/mobile-friendly design patterns and fixed mobile menu bar; production implementation should preserve these.

## Recent History
- 2026-05-25: Workspace started; title set to “Buildogram Marketplace Blueprint.”
- 2026-05-25: Created and validated `DESIGN.md`, `buildogram-ux-blueprint.md`, and `component-specs.md`.
- 2026-05-25: Created `App.jsx` visual prototype, then expanded into complete clickable multi-page prototype.
- 2026-05-25: Removed IT + Promotion from public website surfaces and kept it dashboard-only.
- 2026-05-25: Redesigned dashboards into premium role-specific marketplace operating systems; preview verified with 425 nodes, 0 console errors, 0 asset errors.
- 2026-05-25: Confirmed prototype is mobile-friendly and has fixed PWA-style bottom navigation/menu bar.
- 2026-05-25: User requested dashboards become separate full production screens instead of shared prototype screens.
- 2026-05-25: Expanded `App.jsx` with separate clickable dashboard screens for Admin, Partner, Supplier, and Customer; added `dashboard-screen-specs.md`; updated `DESIGN.md` and `component-specs.md`.
- 2026-05-25: Preview verified with 446 nodes, 0 console errors, 0 asset errors; final validation passed.