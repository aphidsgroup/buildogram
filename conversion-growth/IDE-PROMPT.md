# Contextual WhatsApp + Enquiry System — IDE Agent Prompt

Copy everything between the `---` markers into your IDE agent.

> **Prerequisite: deploy P0 first** (`seo-growth/P0-DEPLOY-PROMPT.md`). Branch this work off the P0 branch after it merges, or rebase onto it. Do not mix the two.

---

You are implementing a contextual conversion system in the Buildogram Next.js repo. This is a **conversion improvement project, not a redesign**. Do not change SEO information architecture, canonicals, slugs, metadata or sitemaps.

## Verified facts about this repo — do not re-derive or contradict these

I have already audited the codebase. These exist:

| Thing | Location | Notes |
| --- | --- | --- |
| Official phone/WhatsApp number | `src/lib/brand/positioning.js` → `BRAND.phone = '+919360232456'` | **Single source of truth.** Never hardcode elsewhere. Strip `+` for `wa.me`. |
| WhatsApp URL builder | `src/lib/whatsapp.js` → generates `https://wa.me/${cleanPhone}?text=${encodedMessage}` | **Reuse this.** Do not write a second one. |
| Return-to-top button | `src/components/BackToTop.js` | `position: fixed`, `bottom: 28px`, `right: 28px`, `zIndex: 9999` — **this is your collision constraint** |
| Mobile bottom nav | `src/components/BottomNav.js` → `.bottom-nav-mobile` | Fixed on mobile — the floating stack must clear it |
| Lead API | `src/app/api/leads/route.js` (POST) | Accepts `name`, `phone`, `leadType`, `sourcePage`, `utmSource/Medium/Campaign/Content`; merges server-side attribution. **Reuse — do not build a new lead system.** |
| Attribution | `src/lib/analytics/attribution.js`, `src/components/analytics/AttributionTracker.jsx` | Already captures UTM + conversion page |
| GA4 | `src/app/layout.js` — `gtag.js` with `NEXT_PUBLIC_GA_ID`, `window.dataLayer` initialised | **Use the existing gtag instance.** Do not add a second analytics init. |
| Service data | `src/data/services.js` (SERVICES, 43 slugs), `src/data/seo/*` | Source for `serviceKey` / `serviceName` |
| Locality data | `src/data/seo/areas.js`, `src/lib/seo/localPageGenerator.js` | Source for `locality` |

**Phase 0 (do this first):** read those files and confirm each still matches. If anything has moved, report it before writing code — do not silently adapt.

## Capability claim rules — non-negotiable

Buildogram's operating model is recorded in `seo-growth/market-domination/53-buildogram-capability-ledger.csv` and `OV02-materials-operating-model.md`. Only the **materials model is confirmed**; the other 42 capabilities are unconfirmed.

**Permitted verbs:** review · compare · coordinate · help identify · provide owner-side support · request quotation support · connect with listed professionals · discuss.

**Banned strings anywhere in this feature** (copy, tooltips, WhatsApp messages, submit labels, success states): `our licensed structural engineers` · `our certified surveyors` · `our construction crew` · `our authorised dealers` · `verified supplier` · `verified contractor` · `certified partner` · `best contractor` · `guaranteed savings` · `lowest price` · `guaranteed delivery` · `free consultation` · `immediate callback` · `screened` · `vetted`.

**Materials pages specifically:** Buildogram is a quotation collector, sourcing coordinator, procurement consultant, supplier referral network, supplier directory and restricted price-information publisher. It is **not** a seller, dealer, stockist, wholesaler or delivery guarantor. Material CTAs must say "request quotation support" / "material sourcing support" — never "buy" or "order".

Add a unit test asserting none of the banned strings appear in the conversion config.

## Build order

### 1. Route audit → `conversion-growth/01-route-intent-and-cta-map.csv`
One row per public page family: page type · user intent · funnel stage · existing primary/secondary CTA · existing form · existing WhatsApp/phone link · best enquiry moment · proposed contextual question · proposed WhatsApp message · form placement decision · show form? · show widget?

### 2. Central config — `src/lib/conversion/context.js`
One typed source returning a `ConversionContext` for any pathname:
```
{ pageType, serviceKey?, serviceName?, locality?, primaryIntent,
  whatsappPrompt, tooltipMessage, formHeading, formDescription,
  contextualQuestion, submitLabel, showWhatsApp, showInlineForm, preferredPlacements }
```
Resolution order: exact-match override → service-family default → page-family default → safe generic fallback. **Do not scatter route strings across components.** Unit-test every branch.

**Exclusions** — no widget, no form on: `/login`, `/signup`, `/change-password`, `/forgot-password`, `/reset-password`, `/client/*`, `/partner/*`, `/ops/*`, `/admin/*`, `/supplier/*`, `/project/*`, `/property-passport/[token]`, `/boq-report/*`, `/plan-review-report/*`, `/material-quote-summary/*`, `/privacy-policy`, `/terms`, `/disclaimer`, `/offline`, `/api/*`, error pages, `/maintenance/request` (has its own form). Prefer an explicit allowlist keyed off page type over fragile substring matching.

### 3. `FloatingActionStack` — refactor, don't duplicate
Create one container that owns **both** the WhatsApp button and the existing `BackToTop`. Refactor `BackToTop.js` to render inside it — **preserve its current visibility logic**.

- Desktop: `right: 24px`, `bottom: 24px`; WhatsApp bottom, BackToTop above, 12px gap; tooltip opens left
- Mobile: `right: 14–16px`, `bottom: max(16px, env(safe-area-inset-bottom))`; add offset when `.bottom-nav-mobile` is present; WhatsApp 50–54px, BackToTop 42–46px, ≥10px gap; tooltip max-width ~190px
- One `zIndex` owned by the stack. Never two independently positioned fixed buttons.

### 4. `ContextualWhatsAppWidget`
Inline SVG icon (no third-party widget script). `target="_blank" rel="noopener"`. Accessible name: `Enquire on WhatsApp about [service]`. Keyboard operable, visible focus, no pulse/bounce. Message built via `src/lib/whatsapp.js` with the route-aware template + canonical URL. **Never auto-opens WhatsApp.**

### 5. Five-second tooltip
Fixed overlay (**never inserted into document flow — zero CLS**). Appears 5s after route load, auto-dismisses 6–8s, close button, one subtle entrance animation, respects `prefers-reduced-motion`. Dismissing it must not hide the WhatsApp button.

Session rules via `sessionStorage` only: max 1 impression per route per session, max 3 per session, suppressed entirely once the user clicks WhatsApp or submits a form. No long-lived profiling. Must not use an assertive ARIA live region — it is a marketing prompt, not a status message.

### 6. `ContextualEnquiryForm`
Exactly three visible fields: **Name · WhatsApp/mobile · one contextual question.** No email, no address, no budget by default.

```html
<input type="text"  name="name"  autocomplete="name" />
<input type="tel"   name="phone" autocomplete="tel" inputmode="tel" />
```
Real `<label>` per field (never placeholder-as-label). `type="tel"` not `type="number"`. Validate on blur/submit, not while typing. Errors via `aria-describedby`, focus first error. Indian mobile formats accepted, normalised server-side, international not blocked. Touch targets ≥44px, font-size ≥16px on mobile inputs (prevents iOS zoom).

Contextual question per page family — full option lists are in `conversion-growth/03-contextual-form-question-map.csv` once you generate it. Submit labels must be specific: "Request a callback", "Request BOQ review", "Discuss my project", "Get material sourcing support". Never "Submit".

Privacy line below the form, linking the real policy: *"By submitting, you agree that Buildogram may contact you about this enquiry. See our Privacy Policy."* No pre-checked consent box.

### 7. Backend — extend, don't replace
POST to the existing `src/app/api/leads/route.js`. Add hidden **server-validated** context: page title, canonical URL, page type, service key/name, locality, CTA placement, CTA version. Never trust client-supplied hidden fields.

Add `source` values: `CONTEXTUAL_INLINE_FORM`, `WHATSAPP_FLOATING_WIDGET`, `PAGE_CTA`, `PHONE_CTA`. No destructive migrations — additive only.

Spam controls: honeypot · minimum completion time · rate limit · duplicate-submission guard · payload size cap · server-side normalisation. No CAPTCHA by default. Never log full PII to console, Vercel logs or error breadcrumbs.

Success copy: *"Thank you. Buildogram has received your enquiry and will contact you about this request."* Do not promise a response time. Optional "Continue on WhatsApp" button — never auto-redirect.

### 8. Placement
Template-aware slots, not "after paragraph 3":
- **Service pages:** after the first scope/benefits section, before the deep process/FAQ; final CTA at page end may be a scroll-to-form button rather than a second full form
- **High-intent (BOQ, quote review, inspection):** proposition → deliverables → form → detail
- **Guides/glossary:** never before the main answer; place after the first complete answer or checklist
- **Calculators:** only after a result is produced; pre-populate hidden tool context; do not capture calculation values
- **Locality pages:** after local relevance is established; no urgency or unsourced soil/flood framing
- **Partner profiles:** clearly label who receives the enquiry — the user must not think they are contacting the partner directly
- **Pages with a strong existing form:** contextualise it, do not add a competing second form
- **Mobile:** full-width card in page padding, one field per row, ensure the floating stack never covers the submit button

### 9. Analytics — existing gtag only
Events: `whatsapp_widget_view` · `whatsapp_tooltip_shown` · `whatsapp_tooltip_closed` · `whatsapp_click` · `lead_form_view` · `lead_form_start` · `lead_form_validation_error` · `generate_lead` · `lead_form_failure` · `phone_click`.

`generate_lead` fires **only after the server confirms success** — never on click.

Allowed params: `page_type`, `service_key`, `service_name`, `locality`, `cta_placement`, `cta_version`, `form_question_key`, `traffic_source_category`, `landing_page_type`. **Never send name, phone, email, message text or address.** Add a test asserting no PII reaches the analytics layer.

### 10. Tests
Widget: renders on eligible routes, absent on excluded ones, uses config number, encodes route-aware message, no BackToTop overlap, tooltip timing/auto-dismiss/close/session caps, reduced-motion, click event carries no PII.
Form: correct question per family, validation, phone normalisation, hidden-context server validation, honeypot, rate limit, one lead per submission, no duplicate on double-click, single notification, `generate_lead` only after server success, accessible success/error.
Layout: small Android, iPhone with safe-area, tablet, desktop, long page, short page, bottom nav present, keyboard open, BackToTop visible and hidden.

### 11. Verify
`npm run lint && npm test && npm run build`, then Lighthouse mobile + desktop before/after. Record LCP, INP, CLS, TBT, added client JS. **CLS must not regress** — if the tooltip moves content, it is implemented wrong. Deploy a **protected preview**; do not promote to production.

## Deliverables → `conversion-growth/`

`00-executive-summary.md` · `01-route-intent-and-cta-map.csv` · `02-whatsapp-message-map.csv` · `03-contextual-form-question-map.csv` · `04-form-placement-map.csv` · `05-lead-data-and-privacy-spec.md` · `06-ga4-event-spec.md` · `07-accessibility-test-report.md` · `08-performance-comparison.md` · `09-implementation-test-results.md` · `10-preview-verification.md` · `CHANGELOG.md`

Report: existing infrastructure found · WhatsApp config source · eligible vs excluded families · message and question counts · placement decisions · components created · APIs reused · DB changes · events added · tests added · build result · performance delta · accessibility result · preview URL · remaining risks · owner decisions required.

## Rules

- Branch: `feat/contextual-lead-conversion-system`, cut from the merged P0 branch
- Do not deploy to production — preview only, owner approves promotion
- Do not touch `seo-growth/**` (research datasets)
- Do not change canonicals, slugs, metadata, sitemap or structured data
- Do not add a second analytics instance, a second lead system, or a second floating-button positioner
- If a check fails, report it — do not weaken the check to make it pass

---

## Owner decisions this may surface

1. **Response-time promise** — currently forbidden. If you want "we respond within X hours", confirm it operationally first.
2. **Partner profile enquiries** — does the lead go to Buildogram or the partner? The label must state it truthfully.
3. **Turnstile** — not added by default. Add only if real spam volume justifies it.
