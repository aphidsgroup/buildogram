# 11 — Preview Validation

**Sprint 2 · Workstreams 3 and 4** · 2026-07-26

## 1. Environment used for this pass

| Field | Value |
| --- | --- |
| Branch | `feat/contextual-lead-conversion-system` |
| HEAD before this sprint | `b6a32a2` |
| Node | v22.22.3 |
| npm | 10.9.8 |
| Lockfile | `package-lock.json` |
| Type-check | **N/A** — JavaScript project with `jsconfig.json`. No `tsconfig.json`, no typecheck script. Do not invent one. |

## 2. Commands run here

| Command | Result |
| --- | --- |
| `git status` / `git diff --check` | Clean; no conflict markers |
| `node --test "tests/*.test.mjs"` | **79 tests, 79 pass, 0 fail** across 8 suites (`banned-claims`, `boq-calc`, `conversion-analytics`, `conversion-config`, `payments.signature`) |
| `next build` | **COULD NOT RUN IN THIS ENVIRONMENT.** Next 16 attempts to download `@next/swc-linux-x64-gnu` at build time; this sandbox has no route to `registry.npmjs.org` (`EAI_AGAIN`). Not a code fault. |
| `npm ci` | Not run — same network limitation |
| `npm run lint` | Not run |

**The build must be run on the owner machine.** Do not treat this document as build evidence until §4 is filled in from a real run.

## 3. Real warnings already surfaced

These appeared before the SWC download failed and **will appear on the owner machine too**:

```
⚠ `eslint` configuration in next.config.mjs is no longer supported.
⚠ Invalid next.config.mjs options detected:
⚠     Unrecognized key(s) in object: 'eslint'
```

**Classification: Fix before production (non-blocking).**

`next.config.mjs` carries `eslint: { ignoreDuringBuilds: true }`. Next 16 removed `next lint` and no longer reads that key, so it is now dead configuration — and, more to the point, lint is **not** being suppressed the way the file implies. `package.json` runs `"lint": "eslint"` against `eslint.config.mjs` directly, which is correct for Next 16. Remove the dead `eslint` block from `next.config.mjs`.

## 4. Owner-machine run — to be completed

```bash
git status
git diff --check
npm ci
npm run lint
npm test
npm run build
```

| Field | Value |
| --- | --- |
| Node / npm | `NOT_RUN` |
| `npm ci` exit code | `NOT_RUN` |
| `npm run lint` exit code + error/warning counts | `NOT_RUN` |
| `npm test` totals | `NOT_RUN` |
| `npm run build` exit code | `NOT_RUN` |
| Build duration | `NOT_RUN` |
| Total / static / dynamic route counts | `NOT_RUN` |
| Prerender failures | `NOT_RUN` |
| Metadata warnings | `NOT_RUN` |
| Sitemap generation result | `NOT_RUN` |
| Env-var warnings | `NOT_RUN` |
| Database warnings | `NOT_RUN` |
| Bundle / performance warnings | `NOT_RUN` |

`npm run build` runs `npx prisma generate && node scripts/verify-env.js && next build` — a missing env var or unreachable database will stop it before Next starts.

Confirm these families generate pages: `/services/`, `/guides/`, `/glossary/`, `/faqs/`, `/compare/`, `/materials/`, `/proof/`.

## 5. Preview deployment — to be completed

| Field | Value |
| --- | --- |
| Preview URL | `NOT_RUN` |
| Deployment ID | `NOT_RUN` |
| Commit SHA deployed | `NOT_RUN` |
| Timestamp | `NOT_RUN` |
| Protection method | `NOT_RUN` (Standard Protection expected) |
| Unauthenticated status | `NOT_RUN` (401/403 expected) |
| Environment | `NOT_RUN` |

Do **not** add a code-level `noindex` for preview — it can leak to production. Use Deployment Protection.

## 6. Verification script

```bash
BASE="https://<preview-domain>" bash seo-growth/preview-verification.sh
# add BYPASS="<protection-bypass-token>" if protection blocks the script
```

**Section 5 is new this sprint.** It writes `seo-growth/preview-results/05-metadata.tsv` and checks 18 URLs across every rewired family. Per URL it asserts:

- HTTP 200
- `canonical == https://www.buildogram.in<path>` — absolute, www, exact path
- `og:url == canonical`
- `og:title` is **not** the homepage default (`…Engineer-Led Construction Intelligence…`)
- no `vercel.app` host leaks into canonical or `og:url`

and records title, description, `twitter:title`, robots directives and H1 for manual review.

URLs covered: `/glossary/{rcc,rmc,boq}` · `/faqs/{boq,materials,plan-review}` · `/guides/{what-is-boq-in-construction,boq-checklist-for-homeowners,how-to-compare-contractor-quotes}` · `/materials/{cement,tmt-steel,rmc}` · `/services/{boq-review,house-construction,quality-inspection}` · `/compare/boq-review-vs-contractor-estimate` · `/proof` · `/boq-calculator`

## 7. Acceptance criteria

| # | Criterion | Source | Status |
| ---: | --- | --- | --- |
| 1 | Repaired routes return 200 | `01-routes.tsv` | `NOT_RUN` |
| 2 | Metadata is route-specific | `05-metadata.tsv` | `NOT_RUN` |
| 3 | Canonicals point to production canonical | `05-metadata.tsv` | `NOT_RUN` |
| 4 | Preview protected from indexing | `00-protection.tsv` | `NOT_RUN` |
| 5 | Redirects are one hop (301 or **308** — both pass) | `02-redirects.tsv` | `NOT_RUN` |
| 6 | Sitemap contains no redirect or 404 | `03-sitemap-*.tsv` | `NOT_RUN` |
| 7 | `/boq-calculator` functional or excluded | `13-boq-calculator-decision.md` | ✅ **Option A — complete; nav label corrected** |
| 8 | C4 hard-failure count zero | `banned-claims.test.mjs` | ✅ **0** |
| 9 | C4 warning count reported | `banned-claims.test.mjs` | ✅ **2** (see §8) |
| 10 | No unsupported authorised-dealer claims | `banned-claims.test.mjs` | ✅ **0 in public source** |
| 11 | No generic glossary social cards | `05-metadata.tsv` | `NOT_RUN` (source verified) |
| 12 | No mojibake | `04-claim-scan.tsv` | `NOT_RUN` |

## 8. Claim-guard result

**2 tests, 2 pass. 0 hard failures.**

PENDING_R1 warnings (permitted by the owner, fulfilment workflow undocumented):

| Location | String |
| --- | --- |
| `src/data/services.js:702` | `We deliver` |
| `src/data/services.js:794` | `We deliver` |

Down from 4 — the two `direct delivery` hits were on `finishing-materials` and `piling-foundation-materials`, whose only pending change was line-ending noise (reverted, see §9).

## 9. Working-tree hygiene

`git diff -w --numstat` showed `src/app/materials/finishing-materials/page.js` and `src/app/materials/piling-foundation-materials/page.js` as 12/12 changed lines with **zero non-whitespace change** — pure CRLF rewrite from the PowerShell `Set-Content` fix. Reverted. This is the third occurrence; consider adding a `.gitattributes` with `*.js text eol=lf` to stop it recurring.
