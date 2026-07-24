# 00 — Executive Summary: Buildogram Organic Search System

Date: 2026-07-25 · Phase One (diagnosis) complete · Branch: `seo/buildogram-organic-growth-system`

## Current organic position

Buildogram has an unusually complete SEO *infrastructure* for its stage — centralised metadata with enforced canonicals, disciplined robots/sitemap generation, quality-gated programmatic locality pages, entity schema, and a clear engineer-led owner-side positioning that no obvious Chennai competitor occupies. What it lacks is *integrity and focus*: the sitemap and sitewide navigation point at 404s, three parallel page systems cannibalise the core commercial intents, key money pages are thin, and the site's strongest trust argument is undermined by precise but unevidenced claims (18% savings, 500+ projects, "certified engineers"). No first-party GSC/GA4 data is connected yet, so real ranking positions are unmeasured in this audit.

## Strongest existing assets

The `/[serviceSlug]` static service system (44 pages covering construction, structural audit, NDT, survey and piling — a query space most Chennai construction sites ignore), the quality-gated locality generator, the AI-tool pages as citation-worthy interactive assets, complete NAP + entity schema, and an owner-side positioning that is genuinely differentiated for AEO ("is Buildogram a contractor or an owner-side consultant?" has a real answer).

## Highest-risk problems

Sitemap 404s and four sitewide broken nav links (crawl-trust erosion at scale); wrong-domain legal contact emails (compliance); unverified savings/volume/credential claims on YMILY-adjacent pages (E-E-A-T and legal risk); five-way cannibalisation on the BOQ-review and structural-audit clusters — the two categories most aligned with Buildogram's differentiation.

## Top 10 actions (prioritised)

| # | Action | Tier | Impact | Effort | Dependency |
| --- | --- | --- | --- | --- | --- |
| 1 | Fix 4 broken nav links + add 301s for legacy slugs | P0 | High | Low | none |
| 2 | Remove/redirect 3 sitemap-404 serviceHub URLs; dedupe 6 double sitemap entries | P0 | High | Low | none |
| 3 | Fix wrong-domain emails/links (.com → .in) | P0 | High | Low | owner confirms mailboxes |
| 4 | Gate unverified claims: stats bar, "certified/licensed", 8–15% savings, homepage "Live Rates" table | P0 | High | Medium | owner evidence (see NEEDS-OWNER-VERIFICATION.md) |
| 5 | Fix serviceHubs.js mojibake (₹/– corruption) | P0 | Medium | Low | none |
| 6 | Connect GSC + GA4; export baseline before any consolidation | P0 | High | Low | owner authorises access |
| 7 | Execute consolidation for the 5 worst cannibal groups (C1, C2, C6, C8, C11) with redirect map | P1 | High | Medium | GSC URL-switching data |
| 8 | Rebuild thin money pages (structural-audit, soil-testing, land-survey cluster) to full service-page spec with verified evidence | P1 | High | High | claims verification |
| 9 | Locality indexation census: measure gate pass-rate, verify per-area soil/flood claims, consolidate weak areas | P1 | Medium | Medium | GSC coverage |
| 10 | Publish proof assets (engineer profiles, redacted BOQ sample, inspection checklist) to unlock credential claims + AEO citations | P1 | High | Medium | owner materials |

## Expected impact categories

Actions 1–5 remove active negative signals (crawl waste, broken UX, trust risk) — protective, fast. Actions 6–7 concentrate ranking signals currently split across duplicate pages — the largest realistic ranking movement for existing queries. Actions 8–10 build the evidence layer that both Google's reviews systems and answer engines require for the high-value structural-audit and BOQ-review clusters — slower, compounding.

## Business verification required before further publication

Eight claims are publication-blocked pending owner evidence; see `NEEDS-OWNER-VERIFICATION.md`. Content expansion (Phase Two+) should not begin until the claim register is resolved — every new page would inherit the same unverified stats bar.

## Tooling status in this environment

Repo analysis and live crawling: done directly. `claude-seo` / `claude-blog` plugin installs, `/seo` commands and GSC OAuth require an interactive Claude Code session and owner authorisation — listed as the first Phase Two enablement steps. No search volumes are quoted anywhere in Phase One because no volume provider was connected (per the no-invented-metrics rule).
