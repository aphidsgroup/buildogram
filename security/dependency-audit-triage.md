# Dependency audit triage

- Audit date: 2026-07-26 (Asia/Calcutta)
- Command: `npm audit --json`
- Result: 23 vulnerabilities — 21 high, 2 low, 0 moderate, 0 critical
- Action taken: triage only; no dependency or lockfile changes

## High-severity package records

| Package | Installed version(s) | Direct / transitive | Reachability | High advisory or inherited path | Fix indicated by npm | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `@eslint/config-array` | 0.21.2 | Transitive via `eslint` | Development lint only | `minimatch` → `brace-expansion` → GHSA-3jxr-9vmj-r5cp / GHSA-mh99-v99m-4gvg | ESLint 10.8.0 major | Defer; do not use broad `npm audit fix --force` |
| `@eslint/eslintrc` | 3.3.5 | Transitive via `eslint` | Development lint only | `minimatch` → `brace-expansion` | ESLint 10.8.0 major | Defer pending compatible Next/ESLint matrix |
| `axios` | 1.16.1 | Transitive via `razorpay` | Runtime reachable in payment order creation | GHSA-gcfj-64vw-6mp9; additional moderate Axios advisories are included in the audit record | In-range update available | Prioritise a controlled Razorpay/Axios update and payment regression test |
| `brace-expansion` | 1.1.14, 2.1.2, 5.0.6 | Transitive via ESLint and Google API cleanup chain | Mixed: mainly development; production-installed through `googleapis-common` → `gaxios` → `rimraf` → `glob` | GHSA-3jxr-9vmj-r5cp; GHSA-mh99-v99m-4gvg | Audit suggests ESLint major for part of the tree | Update each parent chain separately; verify GSC route |
| `eslint` | 9.39.4 | Direct dev dependency | Development lint only | Inherits vulnerable config/minimatch chain | 10.8.0 major | Defer until Next 16 compatibility is verified |
| `eslint-config-next` | 16.2.6 | Direct dev dependency | Development lint/build tooling | Inherits `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react` chains | Audit proposes incompatible 0.2.4 major change | Reject audit’s proposed downgrade; update only with official Next guidance |
| `eslint-plugin-import` | 2.32.0 | Transitive via `eslint-config-next` | Development lint only | `minimatch` → `brace-expansion` | Inherited config change | Defer with lint toolchain |
| `eslint-plugin-jsx-a11y` | 6.10.2 | Transitive via `eslint-config-next` | Development lint only | `minimatch` → `brace-expansion` | Inherited config change | Defer with lint toolchain |
| `eslint-plugin-react` | 7.37.5 | Transitive via `eslint-config-next` | Development lint only | `minimatch` → `brace-expansion` | In-range update available | Update through a tested Next lint-toolchain refresh |
| `form-data` | 4.0.5 | Transitive via `razorpay` → `axios` | Potentially runtime reachable for payment HTTP requests | GHSA-hmw2-7cc7-3qxx | In-range update available | Prioritise with Axios/Razorpay and test request construction |
| `gaxios` | 7.1.3 | Transitive via `googleapis-common` | GSC runtime dependency; reported high is inherited from cleanup tooling | `rimraf` → `glob` → `minimatch` → `brace-expansion` | In-range update available | Refresh Google API dependency tree and test `/api/ops/seo/gsc` |
| `glob` | 10.5.0 | Transitive via `gaxios` → `rimraf` | Production-installed, but no application call site found | `minimatch` → `brace-expansion` | In-range update available | Update parent chain; low observed application reachability |
| `googleapis-common` | 8.0.3 | Transitive via direct `googleapis` | Runtime reachable from `/api/ops/seo/gsc` | `gaxios` → `rimraf` chain | In-range update available | Prioritise after Next/payment patch set |
| `js-yaml` | 4.1.1 | Transitive via `eslint` | Development lint/config parsing only | GHSA-52cp-r559-cp3m | In-range update available | Refresh lockfile through controlled ESLint update |
| `minimatch` | 3.1.5, 9.0.9, 10.2.5 | Transitive via ESLint and Google API chains | Mixed development and production-installed cleanup path | `brace-expansion` advisories | Audit suggests parent updates | Update parents; do not force a cross-major override |
| `multer` | 2.1.1 | Direct production dependency | No import or require call site found in repository source | GHSA-72gw-mp4g-v24j | 2.2.0 available within declared caret range | Remove if confirmed unused, otherwise update and add hostile multipart tests |
| `next` | 16.2.6 | Direct production dependency | Broadly runtime reachable | GHSA-6gpp-xcg3-4w24, GHSA-m99w-x7hq-7vfj, GHSA-89xv-2m56-2m9x, GHSA-p9j2-gv94-2wf4 | 16.2.12 patch | Highest priority: controlled patch update, then full lint/test/build/preview verification |
| `postcss` | 8.4.31 | Transitive via `next` | Build-time CSS processing; no attacker-controlled CSS ingestion found | GHSA-6g55-p6wh-862q; GHSA-r28c-9q8g-f849 | Next 16.2.12 | Resolve through the Next patch; avoid standalone override |
| `rimraf` | 5.0.10 | Transitive via `googleapis-common` → `gaxios` | Production-installed cleanup dependency; no application call site found | `glob` → `minimatch` → `brace-expansion` | In-range update available | Resolve through Google API dependency refresh |
| `sharp` | 0.34.5 | Transitive/optional via `next`; also used by `scripts/generate-icons.js` | Runtime image optimisation and local icon generation | GHSA-f88m-g3jw-g9cj | Next 16.2.12 | Resolve through tested Next patch and image-route verification |
| `undici` | 7.27.2 | Transitive via dev dependency `cheerio` | Test/verification tooling only in this repository | GHSA-vmh5-mc38-953g, GHSA-vxpw-j846-p89q, GHSA-hm92-r4w5-c3mj | In-range update available | Refresh Cheerio/lockfile and rerun verification tests |

## Risk decision

The repository has no critical advisory and the audit did not establish exploitation. It does establish reachable high-severity runtime exposure in the framework and payment dependency paths. Production release should remain blocked until the owner authorises a separate, controlled dependency patch set led by Next 16.2.12, followed by Axios/FormData, Multer removal-or-update, Google API, and development-toolchain refreshes.

`npm audit fix --force` is not approved: its proposed ESLint/config changes include incompatible major or downgrade paths and would mix unrelated dependency changes.
