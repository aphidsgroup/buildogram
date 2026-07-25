# Contextual WhatsApp + Enquiry System — Executive Summary

**Branch:** `feat/contextual-lead-conversion-system`  
**Date:** 2026-07-26  
**Status:** Implementation complete — preview pending

---

## Infrastructure Reused (7 components)

| Component | File | Usage |
|---|---|---|
| Phone number | `src/lib/brand/positioning.js` → `BRAND.phone` | Single source of truth for all WhatsApp links |
| WhatsApp URL builder | `src/lib/whatsapp.js` → `getWhatsAppLink()` | Builds `wa.me/` URLs with encoded message |
| Lead API | `src/app/api/leads/route.js` | Extended (additive) — rate limit + spam controls added |
| Attribution | `src/lib/analytics/attribution.js` → `getAttributionPayload()` | Auto-attached to every form submission |
| AttributionTracker | `src/components/analytics/AttributionTracker.jsx` | Already active globally |
| GA4 | `src/app/layout.js` → `NEXT_PUBLIC_GA_ID` | Existing gtag — no second instance added |
| Services data | `src/data/services.js` → `getService(slug)` | Enriches context for service pages |

---

## Components Created (6 new)

| Component | File | Purpose |
|---|---|---|
| `getConversionContext()` | `src/lib/conversion/context.js` | Single context resolver for any pathname |
| Analytics wrapper | `src/lib/conversion/analytics.js` | 10 GA4 events, PII-safe |
| `FloatingActionStack` | `src/components/conversion/FloatingActionStack.jsx` | Owns WhatsApp + BackToTop, one zIndex=9999 |
| `ContextualWhatsAppWidget` | `src/components/conversion/ContextualWhatsAppWidget.jsx` | Inline SVG WA button, route-aware message |
| `ConversionTooltip` | `src/components/conversion/ConversionTooltip.jsx` | Fixed overlay, 5s/7s, session caps |
| `ContextualEnquiryForm` | `src/components/conversion/ContextualEnquiryForm.jsx` | 3-field form, accessible, honeypot |

---

## Eligible vs Excluded Page Families

**Eligible (15 families, showWhatsApp: true):** home, service, service-hub, boq-review (exact override), material, guide, glossary, faq, compare, location-area, location-service, calculator, partner-listing, partner-profile, about/resources

**Excluded (8 families, showWhatsApp: false):** auth, client portal, partner OS, ops, admin, supplier, token pages (project/passport/material-quote), print routes, legal, offline, API routes, maintenance/request

---

## Capability Verb Rules Applied

- **Permitted:** review · compare · coordinate · help identify · provide owner-side support · request quotation support · connect with listed professionals · discuss
- **Banned strings:** all 14 specified strings verified absent from all context values (unit tested)
- **Materials:** submit label = "Get material sourcing support" — never "buy" or "order"
- **All forms:** submit label is specific — never "Submit"

---

## Analytics Events (10)

`whatsapp_widget_view` · `whatsapp_tooltip_shown` · `whatsapp_tooltip_closed` · `whatsapp_click` · `lead_form_view` · `lead_form_start` · `lead_form_validation_error` · `generate_lead` · `lead_form_failure` · `phone_click`

`generate_lead` fires **only after** server returns `success: true`.  
Zero PII in any event params (unit tested).

---

## Backend Changes (additive)

- Rate limit: 5 req/IP/15min (in-memory Map)
- Honeypot: silent pass if `body.website` is populated
- Duplicate guard: same phone+sourcePage within 60s → silent success
- Payload cap: 8KB → 413
- New source values: `CONTEXTUAL_INLINE_FORM`, `WHATSAPP_FLOATING_WIDGET`, `PAGE_CTA`, `PHONE_CTA`

---

## Owner Decisions Resolved

| Decision | Resolution |
|---|---|
| Partner profile leads | To Buildogram (not partner). Form heading states "Enquire via Buildogram" |
| Response-time promise | None. Success copy: "Thank you. Buildogram has received your enquiry and will contact you about this request." |
| Calculator pre-population | Form appears after result; no calculation values pre-filled |

---

## Remaining Risks

| Risk | Mitigation |
|---|---|
| Rate limit resets on cold start | Document; upgrade to Redis if spam volume warrants |
| Tooltip ARIA role "status" | Tested — not assertive; does not interrupt screen reader flow |
| CLS from tooltip | Fixed overlay, never in document flow — CLS=0 by design |
| FloatingActionStack covers form submit button | Tested at 375px with keyboard; add page padding-bottom if needed |
