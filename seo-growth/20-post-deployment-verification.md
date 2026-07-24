# 20 — Post-Deployment Verification

Status: **PRE-DEPLOYMENT — baseline captured, post-deploy sections pending owner deploy**
Prepared: 2026-07-25 · Branch: `seo/buildogram-organic-growth-system` (8 commits, 910d16a → HEAD)
Deployment identifier: PENDING (fill with Vercel deployment ID/commit after owner pushes)
Deployment date/time: PENDING
Production crawl (post-deploy) date/time: PENDING

The sandbox cannot deploy (owner approval + push required) and cannot run `next build` (45-second process cap). This document therefore contains: the verified BEFORE baseline, the exact AFTER checks to run, and pass criteria. Post-deploy sections are marked ⏳.

---

## 1. Deployment gate — must pass BEFORE pushing

Run on the owner machine, in order:

```bash
git checkout seo/buildogram-organic-growth-system
npm run lint                # gate: 0 errors (warnings triaged)
npm test                    # gate: 21/21
npm run build               # gate: completes; record warnings per §12 of doc 19
```

Build-report requirements (fill into doc 19 §12): exact command, exit status, static/dynamic route counts, every warning categorised as Harmless / Fix-before-deploy / Blocks-deploy. Expected warning classes to watch for: metadata/viewport export warnings (Next 16), dynamic-server-usage warnings on `force-dynamic` pages (harmless if intentional), sitemap DB-access failures (harmless — `safeDbCall` degrades gracefully, but confirm the sitemap still emits static entries), prerender failures on the six repaired route families (**blocks deploy** if any).

Then deploy to a **Vercel preview** first, run §3–§7 against the preview URL, and only then promote/merge to production with owner approval.

## 2. BEFORE baseline (verified live crawls, 2026-07-25, pre-deploy)

| URL | Status observed |
| --- | --- |
| `/` | 200 — but title/OG serve mojibake ("Intelligence â€" Chennai"); nav contains 4 broken links; unverified stats/claims rendered |
| `/structural-audit-chennai` | 200 — "Certified…" H1, ₹10,000 price anchor, thin body |
| `/services/villa-construction` | **404** (async-params bug) |
| `/guides/what-is-boq-in-construction` | **404** (async-params bug — confirmed pre-deploy 2026-07-25) |
| `/guides/house-construction-cost-chennai` | **404** |
| `/villa-construction` | **404** (nav link) |
| `/apartment-structural-audit-chennai` | **404** (nav link) |
| `/material-quotes` | **404** (nav link) |
| `/materials/ready-mix-concrete` | **404** (nav link) |
| `/steel-fabrication-contractors-chennai` | **404** (in sitemap) |
| `/warehouse-steel-building-chennai` | **404** (in sitemap) |
| `/factory-shed-construction-chennai` | **404** (in sitemap) |
| `robots.txt` | 200 — correct policy |

## 3. ⏳ Route-family verification (post-deploy)

Test ≥3 valid slugs per family; record status, final URL, redirect chain, canonical, title, description, H1, robots meta, body presence, JSON-LD presence, sitemap inclusion, internal links:

- `/services/`: `villa-construction`, `boq-review`, `turnkey-construction`
- `/materials/` (dynamic): `aggregates`, `paint`, `roofing`
- `/guides/`: `what-is-boq-in-construction`, `how-to-compare-contractor-quotes`, `why-low-construction-quote-can-be-risky`
- `/glossary/`: `rmc` + 2 others
- `/faqs/`: 3 category slugs · `/compare/`: 3 slugs
- `/partners/[slug]`: any real approved partner (NOT `demo-*`; also confirm `/partners/demo-builder` returns 404)

Pass: all 200, self-canonical on `www.buildogram.in`, unique titles, H1 present, SSR body present, no `noindex`.

## 4. ⏳ Redirect verification (post-deploy)

For each of the 8 sources (see `07-content-pruning-and-redirect-map.csv`): `curl -sIL` → expect single 308/301 hop → destination 200 → destination self-canonical → zero internal links to source (already verified in code; re-verify in rendered HTML of homepage + one service page).

## 5. ⏳ Production sitemap verification (post-deploy)

`/sitemap.xml` returns 200; then script-check every URL: all 200 (no 3xx/4xx), no duplicates, all hosts `https://www.buildogram.in`, no `demo-*` partner URLs, no noindexed URLs, `lastmod` present only on DB-backed entries (case studies/proof), restored dynamic families present.

## 6. ⏳ Claims scan (post-deploy, rendered HTML incl. JSON-LD/FAQ schema)

Grep rendered HTML of: homepage, `/about`, `/end-to-end-construction-support-chennai`, `/locations/chennai`, `/structural-audit-chennai`, `/boq-review-chennai`, `/materials`, one partner category page, for:
`500+ Projects` · `₹12.8Cr` · `₹2.1Cr` · `₹50Cr+` · `18%` savings · `10-Year Warranty` · `8–15%` · `starts around ₹10,000` · `certified pilots` · `Verified Partner Network` · `vetted` · `screened` · `certified structural engineers` · `licensed structural engineers`.
Pass: zero hits (source-level scans already at zero; this confirms no stale cache/ISR remnants).

## 7. ⏳ Domain & encoding scan (post-deploy)

Rendered HTML: zero `buildogram.com` / `app.buildogram.com`; zero `â‚¹`/`â€`/`Â·` sequences; `₹`, `—`, `'` render correctly; homepage title shows "— Chennai". All canonicals `www.buildogram.in`.

## 8. Production database verification

Status: **PENDING OWNER** — sandbox cannot reach Neon (network restriction).
Procedure prepared: `seo-growth/production-db-verification.sql` — Section A (counts, read-only), Section B (ID/slug export with indicator flags: seed phones, ui-avatars logos, unsplash covers, unnumbered RERA/ISO claims, duplicate phones, non-demo-slug heuristics), Section C (archival/deletion, commented out, owner-approval-gated). No personal data printed; nothing deletes automatically.

## 9. Search-engine notification (PREPARED — do not execute without owner approval)

**GSC:** Search Console → Sitemaps → resubmit `https://www.buildogram.in/sitemap.xml`; add annotation (Insights/notes + internal log): "2026-MM-DD: P0 release — repaired ~85 404 dynamic URLs, 8 redirects, sitemap cleanup, claims remediation."
**Bing:** Webmaster Tools → Sitemaps → resubmit same URL.
**URL Inspection priority (request indexing individually, max ~10–12, in this order):**
1. `/` 2. `/construction-in-chennai` 3. `/boq-review-chennai` 4. `/structural-audit-chennai` 5. `/construction-cost-estimation-chennai` 6. `/end-to-end-construction-support-chennai` 7. `/home-construction-chennai` 8–12. restored dynamic pages with most substantial unique content, e.g. `/guides/what-is-boq-in-construction`, `/guides/how-to-compare-contractor-quotes`, `/services/turnkey-construction`, `/glossary/rmc`, `/faqs/<top category>`.
**Recrawl-needed (previously 404, now 200):** all `/services/*`, `/guides/*`, `/glossary/*`, `/faqs/*`, `/compare/*` URLs — recovered via sitemap resubmission, not bulk inspection requests.
**Should remain redirected/excluded:** the 8 redirect sources; `demo-*` partner URLs.
Do NOT bulk-request indexing for hundreds of URLs.

## 10. Remaining risks

1. Build not yet run anywhere — highest residual risk; gate §1 covers it.
2. Restored dynamic pages (~85) go from 404 → 200 at once; several are thin (`why-vs-*`, some glossary). If any are low-quality, Google may index-then-demote — the P1 quality classification (gate below) addresses this; consider temporarily noindexing the thinnest few if classification finds them empty.
3. Production DB demo-partner state unknown until §8 runs.
4. GSC/GA4 still not connected — before/after impact measurement will lack pre-deploy query-level baseline beyond what GSC retains historically.
5. `/services/*` pages now render AND duplicate `-chennai` pages (C-group cannibalisation) — accepted temporarily; resolved in P1 with data.

## 11. Go/No-Go for P1

**Current recommendation: NO-GO (holding state, as designed).**
P1 may begin when ALL of: (a) build passes on owner machine with warnings triaged; (b) deploy completes and §§3–7 all pass on production; (c) DB verification §8 run and any demo data archived; (d) restored dynamic pages classified for content quality, uniqueness and search intent (classification worksheet to be produced as the first P1 task, using GSC data once connected).
