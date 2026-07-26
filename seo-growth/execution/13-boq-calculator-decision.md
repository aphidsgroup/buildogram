# 13 — BOQ Calculator Decision

**Decision: OPTION A — the calculator is already complete. The defect is a navigation label, not the page.**

Date: 2026-07-26 · Sprint 2 · Workstream 2

## 1. Correction to the Sprint 1 finding

Sprint 1 recorded `/boq-calculator` as an unfinished "Coming Soon" placeholder that was indexed and linked from navigation, and recommended shipping or noindexing it. **That was inferred from the navigation label alone and it was wrong.** Inspecting the implementation shows a finished tool.

## 2. What actually exists

| Component | Location | State |
| --- | --- | --- |
| Calculator UI | `src/app/boq-calculator/page.js` | **968 lines**, 5-step wizard: Project Info → Floor Sizes → Structure → Finishes → BOQ Result |
| Calculation engine | `src/lib/boq-calc/engine.js` | Present |
| Excel-parity engine | `src/lib/boq-calc/excel-engine.js` | Present |
| Rate table | `src/lib/boq-calc/rates.js` | `DEFAULT_RATES`, `buildRateMap()` |
| Units | `src/lib/boq-calc/units.js` | Present |
| Amount-in-words | `src/lib/boq-calc/numberToWords.js` | Present |
| Persistence API | `src/app/api/boq-calculator/projects/**` | list · create · read · update · delete · calculate · export · rates · sections |
| Draft autosave | `page.js` — `STORAGE_KEY = 'buildogram_boq_draft'` | Present |
| Demo data loader | `/api/boq-calculator/demo` | Present |
| Metadata | `src/app/boq-calculator/layout.js` | Full: title, description, keywords, OG (title/description/url/siteName/type), Twitter card, absolute canonical |
| Tests | `tests/boq-calc.test.mjs` | Passing |

Against the Option A checklist: clear purpose ✅ · usable inputs ✅ · valid calculations ✅ (engine + tests) · units ✅ · error states ✅ (`readOnly`, min/step guards, validation state) · mobile usability — **not verified** · result explanation ✅ (per-floor breakdown, margin sensitivity, amount in words) · follow-up CTA ✅ (feedback capture) · structured data — **absent** · tests ✅.

No occurrence of "Coming Soon" exists anywhere in `page.js`, `layout.js` or `src/lib/boq-calc/*`.

## 3. The actual defect

One line, in `src/app/Navbar.js`:

```js
{ href: '/boq-calculator', label: 'AI BOQ Calculator (Coming Soon)' },
```

Every visitor to any page on the site sees a working tool advertised as unavailable, in the mega-menu. Six other pages link to it correctly and without that caveat — `/about`, `/ai-tools`, `/ai-construction-cost-estimator`, `/construction-in-chennai`, `/materials`, plus the ops console.

**Fixed:** label changed to `BOQ Calculator`.

"AI" was also dropped. The tool is a deterministic rate-and-quantity engine, not a model — the earlier claim work removed unsupported "AI" framing elsewhere and this is the same class of claim.

## 4. Not excluded from the index

No `noindex`, no sitemap removal, no navigation removal. The page is substantial, functional, has complete metadata and targets a genuine head term. Excluding it would have been the wrong call.

## 5. Follow-up items — page-level, not blocking

| # | Item | Note |
| ---: | --- | --- |
| 13.1 | **Verify the "COCENA Dec 2025 rates" claim** in `layout.js` metadata and on-page. A dated third-party rate source named in metadata is a factual claim. Confirm the source exists, is correctly named, and that Dec 2025 is the edition actually used — or restate as "indicative Chennai rates, last reviewed <date>". | Highest priority of the five |
| 13.2 | Add `SoftwareApplication` or `HowTo` structured data | The page currently emits none. Calculator SERPs commonly show rich results. |
| 13.3 | Mobile usability pass | A 5-step wizard with numeric tables is the highest-risk layout on the site for small screens. Not yet tested. |
| 13.4 | Add a visible "last rate review" date and assumptions block | Required by the cost-methodology rules already agreed for the Cost Monitor. |
| 13.5 | Remove `src/lib/boq-calc/excel-engine.js.bak` and `excel-engine-debug.js` | Backup and debug files inside `src/`. Not shipped to the browser, but they should not be in the source tree. |

## 6. Sitemap and indexing status

| Question | Answer |
| --- | --- |
| Remove from navigation? | No |
| Remove from sitemap? | No |
| Apply `noindex`? | No |
| Redirect? | No |
| Request indexing in Sprint 2? | **Not yet** — hold until 13.1 is resolved. Do not push a page into the index while it names a rate source that has not been verified. |
