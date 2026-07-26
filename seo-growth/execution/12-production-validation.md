# 12 — Production Validation

## VERDICT: NO-GO — INSUFFICIENT EVIDENCE

No terminal output was supplied with the release instruction. `npm ci`, `npm run lint`, `npm test` and `npm run build` results are all `NOT_SUPPLIED`. Nothing is promoted on an assumption.

## ⚠ STOP — do not run `git checkout seo/buildogram-organic-growth-system`

The release instruction names that branch. **Building from it would ship a regression.**

| | |
| --- | --- |
| Current working branch | `feat/contextual-lead-conversion-system` |
| `seo/buildogram-organic-growth-system` HEAD | `bbafc97` — **6 commits behind** |
| Uncommitted on the working branch | **12 files + `seo-growth/execution/`** (all of Sprint 1 and Sprint 2) |

Commits present on `feat/…` and **absent** from `seo/…`:

| SHA | What it contains |
| --- | --- |
| `d18da5c` | Contextual WhatsApp + enquiry system |
| `2ec41e1` | WhatsApp logo, ContextualEnquiryForm wired into templates |
| `72d6d74` | Banned-claim removal, rmc redirect repoint |
| `a65f8c4` | Global banned-claim removal + tests |
| `ab6eb75` | **C2/C3/C6/C7 claim remediation** |
| `b6a32a2` | `/materials/ready-mix-concrete` → `/materials/rmc` internal links |

Checking out `seo/…` would either abort on the uncommitted changes or discard them, and a build from that branch would **restore "Turnkey construction", "Direct from suppliers", "The best architects" and "verified, stress-free"** to production and ship without the conversion system.

**Correct sequence:**

```bash
git rev-parse --abbrev-ref HEAD          # must print feat/contextual-lead-conversion-system
git add -A
git commit -m "feat(seo): route-specific metadata across 7 families, tiered claim guard, BOQ calculator label, verification script sections 5-6"
git push
npm ci && npm run lint && npm test && npm run build
```

Then deploy the preview from `feat/contextual-lead-conversion-system`.

---

**Sprint 2 · Workstream 4.3** · opened 2026-07-26 · updated 2026-07-26

Preview results are not sufficient evidence for production. Run this against the live domain after promotion.

```bash
BASE="https://www.buildogram.in" bash seo-growth/preview-verification.sh
```

## 1. Go / no-go gate — production promotion

Promote only when every row is PASS.

| # | Gate | Evidence | Status |
| ---: | --- | --- | --- |
| 1 | `npm ci` clean | owner terminal | `NOT_SUPPLIED` |
| 2 | `npm run lint` no errors | owner terminal | `NOT_SUPPLIED` |
| 3 | `npm test` all pass | owner terminal | `NOT_SUPPLIED` (79/79 in sandbox) |
| 4 | `npm run build` succeeds, no prerender failures | owner terminal | `NOT_SUPPLIED` |
| 5 | All 7 rewired families generate pages | build output | `NOT_SUPPLIED` |
| 6 | Preview 01-routes all 200 | `01-routes.tsv` | `NOT_SUPPLIED` |
| 7 | Preview 05-metadata 0 failures | `05-metadata.tsv` | `NOT_SUPPLIED` |
| 8 | Preview 02-redirects one hop, 301/308 | `02-redirects.tsv` | `NOT_SUPPLIED` |
| 9 | Preview 03-sitemap every URL 200, 0 dupes | `03-sitemap-*.tsv` | `NOT_SUPPLIED` |
| 10 | Preview 04-claim-scan zero rows | `04-claim-scan.tsv` | `NOT_SUPPLIED` |
| 11 | Preview protected (401/403 unauthenticated) | `00-protection.tsv` | `NOT_SUPPLIED` |
| 12 | C4 hard failures = 0 | `banned-claims.test.mjs` | PASS (0) |
| 13 | Env and DB warnings assessed | build output | `NOT_SUPPLIED` |

## 2. Production deployment record

| Field | Value |
| --- | --- |
| Deployment ID | `NOT_SUPPLIED` |
| Commit SHA | `NOT_SUPPLIED` |
| Release timestamp | `NOT_SUPPLIED` |
| Promoted by | `NOT_SUPPLIED` |

## 3. Production metadata verification

Run section 5 of the script against production and paste `05-metadata.tsv` here. Confirm on live URLs:

- `og:url == canonical == requested URL` on every row
- no row carries the homepage `og:title`
- no `vercel.app` host anywhere
- `robots` emits `max-image-preview:large`, `max-snippet:-1`

**Cache note.** Production has twice served pre-release HTML on bare canonical paths after a deploy while `?v=N` served current content. If a URL looks stale, compare bare vs `?v=N` before concluding the code is wrong — and purge before re-testing, not after.

## 4. Robots preview directives — what they do and do not do

`generateSEOMetadata()` emits `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1` on every rewired route.

**What they do:** raise the ceiling on how much of a page Google is permitted to display — larger thumbnails, longer text snippets, longer video previews.

**What they do not do:**

- They are **not** a ranking factor.
- They do **not** guarantee rich results.
- They do **not** guarantee AI Overview or AI Mode inclusion, and must not be described as an AI-ranking signal.
- They must **never** be allowed to override `noindex`. Any page that should stay out of the index gets `noIndex: true` passed to the helper, which sets `index:false, follow:false` — the preview directives are irrelevant on such a page.

They are permissions, not promises. Removing them can only hurt; adding them cannot help a page that has nothing worth previewing.

## 5. Post-release monitoring

| When | Check |
| --- | --- |
| +1h | Spot-check 5 URLs never fetched during the release for stale HTML |
| +24h | Search Console Coverage — no new "Page with redirect" or "Not found" spikes |
| +3d | Page indexing report reasons reviewed |
| +7d | Impressions appearing for repaired route families |
| +14d | Export 16 months query+page data into `01-gsc-query-page-opportunities.csv` |
