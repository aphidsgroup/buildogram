# 59 — P0 Production Release Report

**Status: NOT RELEASED** · Verified 2026-07-25 · Branch `seo/buildogram-organic-growth-system` @ `bb046cf`

## 1. Production status — re-verified today

`https://www.buildogram.in/guides/what-is-boq-in-construction` → **404**.

Production is still running pre-P0 code. Six dynamic route families (`/services/`, `/materials/`, `/guides/`, `/glossary/`, `/faqs/`, `/compare/`, plus `/partners/[slug]`, `/case-studies/`, `/proof/`) remain broken live — approximately 85 sitemap URLs. **This is the highest-value outstanding action in the entire programme**, and it is also the precondition for the keyword research: Google cannot generate the search evidence the programme needs from URLs that return 404.

## 2. Why this could not be completed here

| Step | Status | Reason |
| --- | --- | --- |
| A1 owner-machine validation (`npm ci / lint / test / build`) | **NOT RUN** | Sandbox cannot complete a ~900-route Next build (45-second per-command cap; three documented attempts) |
| A2 protected Vercel preview | **NOT CREATED** | Vercel MCP token lacks access to team scope `aphidsgroup-3300s-projects` (403) |
| A3–A6 preview route/redirect/sitemap/claim verification | **BLOCKED** | Requires a preview URL |
| A7 production DB verification | **BLOCKED** | No network route to Neon |
| A8 production promotion | **BLOCKED** | Requires owner approval + successful preview |

Nothing was simulated. No result has been reported as passing that was not executed.

## 3. Runbook — everything is prepared

```bash
# A1 — clean checkout
git clone <repo> buildogram-verify && cd buildogram-verify
git checkout seo/buildogram-organic-growth-system
git status && git diff --check
npm ci                 # package-lock.json; Node v22.22.3, npm 10.9.8 recorded
npm run lint           # gate: 0 errors
npm test               # gate: 21/21
npm run build          # gate: completes
# type-check: N/A — JavaScript project, no tsconfig.json (record as N/A, not skipped)
```
Record into `19-test-and-validation-results.md` §16 (table already prepared): Node/npm versions · lockfile · exact commands · exit codes · test counts · build duration · total/static/dynamic route counts · build warnings · lint warnings · type errors (N/A) · prerender failures · DB/env warnings · sitemap result. Classify every warning: Harmless · Fix before preview · Blocks preview · Fix before production · Blocks production.

**A2 — preview.** Push the branch; Vercel auto-creates a preview. Enable **Deployment Protection → Standard Protection** so unauthenticated crawlers get a 401. Verify with `curl -sI https://<preview>/` from a logged-out context. This is environment-level and structurally cannot leak to production — preferred over a code-level noindex.

**A3–A6 — one command:**
```bash
BASE="https://<preview-url>" bash seo-growth/preview-verification.sh
```
Runs the protection check, all nine route families (with `/partners/demo-builder` asserted as 404), redirects capturing the **actual** status (Next emits **308**, not 301), a per-URL status check of every sitemap entry, and the rendered claim/domain/encoding scan. Outputs TSVs for `20-post-deployment-verification.md` §§5–8.

**A7 — database:** Sections **A and B only** of `seo-growth/production-db-verification.sql`. Section C (archival/deletion) stays commented until you review the output. The script prints IDs, slugs and boolean flags only; phone numbers are `md5()`-hashed.

**A8 — promotion:** only after preview passes and you approve. Then re-crawl production and repeat route/redirect/sitemap/claim/canonical verification; record release timestamp and commit.

## 4. What ships when it ships

8 one-hop redirects · zero remaining internal 404 links · sitemap cleaned (3 404s removed, 6 duplicates deduped) · wrong-domain fixes including legal contact emails · encoding repair including the site-wide `<title>` · all owner-decided claim removals (register CL01–CL25) · demo partner data blocked from every public surface · NAP defect fixed in locality schema · the Next 16 async-`params` repair that restores ~85 URLs.

Branch integrity: **103 files, all real content changes**, 11 added deliverables, 0 deleted, 0 binaries, 0 secrets. Two line-ending-noise batches were detected and reverted.

## 5. Recommendation

**Deploy. This week if possible.** Every week these route families stay 404 is a week Google cannot collect the impression and query data that the entire Phase 1 research programme is waiting on — and a week of live users hitting dead pages from the site's own navigation and sitemap.
