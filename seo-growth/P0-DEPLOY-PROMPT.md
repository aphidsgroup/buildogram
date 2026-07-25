# P0 Deploy — IDE Agent Prompt

Copy everything between the lines into your IDE agent (Cursor / Claude Code / Copilot).

---

You are working in the Buildogram Next.js repo. Your task is to build, push and deploy the **P0 SEO/route-repair branch**, then verify it in production. Work through the phases in order and **stop at any gate that fails** — report the failure instead of continuing.

## Context

- Branch: `seo/buildogram-organic-growth-system`
- Deploy commit: `86404f4` (or later HEAD on that branch)
- The branch has **never been pushed** — no upstream is configured
- Node v22.22.3, npm 10.9.8, lockfile `package-lock.json`
- **No TypeScript** — the project is JavaScript with `jsconfig.json`. There is no typecheck script and no `tsconfig.json`. Record type-check as **N/A**, do not invent one.
- Next.js 16. `permanent: true` redirects emit **308**, not 301. A 308 is a PASS.

## What this branch fixes (do not undo any of it)

1. **Next 16 async-`params` bug** — `params` was read synchronously, which 404'd ~85 URLs across `/services/[slug]`, `/materials/[slug]`, `/guides/[slug]`, `/glossary/[term]`, `/faqs/[category]`, `/compare/[slug]`, `/partners/[slug]`, `/case-studies/[slug]`, `/proof/[slug]`. All now `await params`.
2. 8 one-hop 301/308 redirects in `next.config.mjs` for previously broken URLs
3. Sitemap: 3 non-rendering 404 URLs removed, 6 duplicates deduped, redirect targets excluded
4. Wrong-domain fixes (`buildogram.com` → `www.buildogram.in`), including legal contact emails
5. Encoding repair including the site-wide `<title>` mojibake
6. Unverified marketing claims removed (stats bars, savings percentages, credential claims)
7. `demo-*` partner records blocked from directory, both APIs, profile pages and sitemap
8. NAP placeholder fixed in locality LocalBusiness schema

## PHASE 1 — Local build

```bash
git checkout seo/buildogram-organic-growth-system
git status
git diff --check
npm ci
npm run lint
npm test
npm run build
```

Report: Node version · npm version · exit code of each command · test counts · lint errors and warnings · build duration · total/static/dynamic route counts · every build warning · prerender failures · DB or env-var warnings · sitemap generation result.

Classify each warning: **Harmless** / **Fix before preview** / **Blocks preview** / **Fix before production** / **Blocks production**.

**GATE — stop and report if any of these occur:** build failure · test failure · lint error · prerender error · sitemap generation failure · missing required env var · database connection failure affecting public routes.
Harmless warnings do not block.

In the build output, confirm these route families generate pages: `/services/`, `/guides/`, `/glossary/`, `/faqs/`, `/compare/`, `/materials/`. If any is missing, stop.

## PHASE 2 — Push

```bash
git push -u origin seo/buildogram-organic-growth-system
```

Confirm the pushed HEAD SHA matches what you built.

## PHASE 3 — Vercel preview

Deploy a **preview** from this branch — do not promote to production yet.

- Vercel project: `prj_2qfbQGMjU9qR3Q45W5hdgcLJuMqV`, team `team_hm60UmBmtMjbc47ulqd9Mk2r`
- Enable **Deployment Protection → Standard Protection** for Preview so unauthenticated crawlers get 401 and cannot index it
- Do **not** add a code-level noindex — it could leak to production

Report: preview URL · deployment ID · commit SHA deployed · timestamp · protection method · whether unauthenticated access returns 401.

## PHASE 4 — Preview verification

```bash
BASE="https://<preview-url>" bash seo-growth/preview-verification.sh
```

If Deployment Protection blocks the script, also export `BYPASS="<protection-bypass-token>"`.

Outputs land in `seo-growth/preview-results/*.tsv`. Report a summary of each:

- `00-protection.tsv` — unauthenticated status (401/403 expected)
- `01-routes.tsv` — every tested URL must be **200** with a self-canonical on `www.buildogram.in`, a unique title, an H1 and real body content. `/partners/demo-builder` **must be 404**.
- `02-redirects.tsv` — each of the 8 redirects: **one hop**, permanent (301 **or 308** — both pass), destination 200 and self-canonical
- `03-sitemap-*.tsv` — sitemap 200 and valid XML; **every URL returns 200**; 0 duplicates; 0 non-www hosts; 0 `vercel.app` URLs; 0 `demo-*` partner URLs
- `04-claim-scan.tsv` — **must be zero rows**. Any hit means an unsupported claim, a `.com` leak or mojibake survived into rendered HTML/JSON-LD.

**GATE — all five must pass before promotion.**

## PHASE 5 — Database check (read-only)

Run **Sections A and B only** of `seo-growth/production-db-verification.sql` against the production Neon database.

**Do not run Section C** (archival/deletion) — it is commented out and stays that way.

Report sanitised counts only — no personal data: demo-slug partners · `@pilot.buildogram.in` accounts · seed-phone matches · placeholder-avatar/stock-photo matches · duplicate phone counts · suspicious RERA/ISO placeholders · seed-marker records · active vs inactive · sitemap-eligible vs blocked.

**This does not block release** — the code guards prevent `demo-*` records from being public or indexable regardless. Cleanup follows separate review.

## PHASE 6 — Promote to production

Promote only when **all** of these are true: clean build · tests pass · preview route verification passes · sitemap verification passes · claim scan passes (0 rows) · canonicals correct · demo data blocked · no critical env error.

Report the production deployment ID, commit SHA and release timestamp.

## PHASE 7 — Production verification

```bash
BASE="https://www.buildogram.in" bash seo-growth/preview-verification.sh
```

Then manually confirm these return **200** with real content:

- `https://www.buildogram.in/guides/what-is-boq-in-construction`  ← the canary; if this is 200 the async-params fix landed
- `https://www.buildogram.in/services/villa-construction`
- `https://www.buildogram.in/glossary/rmc`
- `https://www.buildogram.in/materials/aggregates`
- one `/faqs/[category]` and one `/compare/[slug]`

And confirm the homepage `<title>` renders `— Chennai` with a proper em-dash (no `â€"`).

## PHASE 8 — Record

Append results to:

- `seo-growth/19-test-and-validation-results.md` §16 (build table — fill every field)
- `seo-growth/20-post-deployment-verification.md` (preview + production sections)
- `seo-growth/CHANGELOG.md` (release entry: date, commit, what shipped)

Commit as: `chore(release): P0 route repairs, redirects, sitemap and claim cleanup deployed`

## Rules

- Do not change application code to make a check pass — report the failure instead
- Do not modify anything under `seo-growth/market-domination/` (research datasets, not code)
- Do not create pages, change schema or start locality expansion
- Do not run `git push --force`
- Report actual command output; do not summarise a step as passing unless it ran

---

## After deployment — tell Claude

Report back with: build output (route counts + warnings), production verification results, and whether the canary URL returns 200. Next steps after that are Google Search Console submission and the OV01 capability decisions, starting with Group 1 (BOQ, estimation and quotation review).
