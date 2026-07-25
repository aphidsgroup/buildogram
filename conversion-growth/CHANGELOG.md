# Contextual WhatsApp + Enquiry System — CHANGELOG

## [feat/contextual-lead-conversion-system] 2026-07-26

### Commit d18da5c — feat: contextual WhatsApp + enquiry system (Steps 3–10)

#### New files
| File | Purpose |
|---|---|
| `src/lib/conversion/context.js` | Central pathname resolver — 15 eligible page families, 8 excluded families |
| `src/lib/conversion/analytics.js` | 10 GA4 events, PII-safe (never sends name/phone/email) |
| `src/components/conversion/FloatingActionStack.jsx` | Single `zIndex:9999` owner for WhatsApp + BackToTop |
| `src/components/conversion/ContextualWhatsAppWidget.jsx` | Green WA button, inline SVG, route-aware message |
| `src/components/conversion/ConversionTooltip.jsx` | Fixed overlay, 5s/7s, session caps (max 3 total, max 1/route) |
| `src/components/conversion/ContextualEnquiryForm.jsx` | 3-field form, honeypot, min-time guard, specific submit labels |
| `tests/conversion-config.test.mjs` | 38 unit tests: page-type resolver, exclusions, banned strings |
| `tests/conversion-analytics.test.mjs` | 19 unit tests: PII guard, all 10 event names, generate_lead placement |
| `conversion-growth/00-executive-summary.md` | Implementation overview |
| `conversion-growth/01-route-intent-and-cta-map.csv` | 18-row route intent map |
| `conversion-growth/02-whatsapp-message-map.csv` | 17 WhatsApp message templates |
| `conversion-growth/03-contextual-form-question-map.csv` | Per-family contextual question map |
| `conversion-growth/04-form-placement-map.csv` | Placement slot decisions |

#### Modified files
| File | Change |
|---|---|
| `src/app/layout.js` | Import + mount FloatingActionStack globally |
| `src/app/SiteLayoutClient.js` | Remove duplicate standalone BackToTop render |
| `src/components/BackToTop.js` | Remove `position:fixed` — now owned by FloatingActionStack |
| `src/app/api/leads/route.js` | +rate limit 5/IP/15min, +honeypot, +dupe guard 60s, +8KB cap |

#### Owner decisions locked in this commit
| Decision | Value |
|---|---|
| Lead destination | Buildogram (not partner) |
| Success copy | "Thank you. Buildogram has received your enquiry and will contact you about this request." |
| Calculator form timing | After result only — no pre-fill |

#### Tests
- Total: **77/77 pass** (was 21 — added 56 new)
- Build: **EXIT 0**
- Commit: `d18da5c`
- Preview: `buildogram-6p6l5dvpg-aphidsgroup-3300s-projects.vercel.app`

---

## Pending next commit
- Inline form placement on service, guide, and location page templates
- `conversion-growth/05-lead-data-and-privacy-spec.md`
- `conversion-growth/06-ga4-event-spec.md`
- Performance before/after comparison
