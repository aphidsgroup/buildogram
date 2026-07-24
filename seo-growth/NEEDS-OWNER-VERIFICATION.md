# NEEDS OWNER VERIFICATION — Buildogram

Updated: 2026-07-25 (readiness pass 3 — owner corrections 1–10 applied) · Machine-readable detail: `18-claim-verification-register.csv` (30 entries, `register_section` column)

---

## Section 1 — Removed or softened: restorable with evidence

| # | Original claim | Current public wording | Evidence to restore |
|---|---|---|---|
| 1 | 500+ Projects Supported | removed (non-numeric tiles) | project register + counting method |
| 2 | ₹12.8Cr / ₹2.1Cr / ₹50Cr+ values | removed | project value dataset |
| 3 | 18% Average Client Savings | "identify scope gaps, pricing inconsistencies and avoidable cost risks" | documented BOQ before/after sample |
| 4 | 10-Year Partner Warranty | removed. Approved replacement if referenced: "Warranty terms depend on the appointed execution partner and signed contract." | written warranty terms + underwriter |
| 5 | certified / licensed / **qualified** structural engineers | "structural engineering professionals", "structural engineering review coordination", "review by an appropriate structural engineering professional" | named professionals + relevant qualifications (then "qualified"; registration numbers before "licensed/certified") |
| 6 | 8–15% BOQ savings (+₹4–7.5L example) | "savings vary by quotation, project scope, specifications and omissions" | anonymised review-outcome sample |
| 7 | Structural audit "starts around ₹10,000" | quote-based wording | rate card |
| 8 | "certified pilots manage Digital Sky clearances" | "Where applicable, the appointed drone operator is responsible for obtaining required permissions and meeting applicable regulatory requirements, including Digital Sky portal clearances." | DGCA remote-pilot certificates / documented partner arrangement |
| 9 | Verified Partner Network / vetted / **screened by our team** | "Buildogram Partner Network", "Listed Construction Professionals", "listed partner" | published screening procedure |
| 10 | Homepage "Live Rates" TMT table | anonymised + "Illustrative Example" + disclaimer | supplier agreements + maintained dated rate feed |
| 11 | 12+ Structural Engineers | non-numeric tile | team roster |
| 12 | 2022 timeline: "First 50 BOQ Reviews / ₹2.5Cr avoided" | numbers removed, event kept | historical records |
| 13 | "current Chennai market data" / "updated monthly" | "project inputs and available Chennai market references" | documented update process with cadence evidence |
| 14 | GCC/CMDA report-acceptance claim | conditional wording | registered-SE credentials + documented acceptance |
| 15 | "verified contractor/supplier/builder network" (51+ instances across data files, generator template, directory UI, notification template, brand positioning) | "Buildogram Partner Network" / "suppliers in our network" / "listed partner" | published verification procedure |
| 16 | 2,500+ BQS checkpoints / 500+ QC checks / **"up to 2,500+"** (logically invalid) | "structured quality checkpoints", "stage-wise quality checks", "documented inspection checkpoints" | DB count — record exact query, table, filters, result, then use **either** "more than 2,500 checkpoints" **or** "up to 2,500 checkpoints", never both forms |
| 17 | "3–5 working days" review turnaround (component + plan-review FAQ) | "The expected turnaround is confirmed after reviewing the project scope, documents and required deliverables." | operational evidence that the SLA is achievable for the stated scope |

## Section 2 — Mandatory before preview deployment
*(reclassified per owner item 8: build/lint/test, preview verification, read-only DB Sections A+B, screening-wording removal, quality-framework number removal, locality remediation and NAP confirmation are all pre-production gates; credential/statistic/consultation/warranty/supplier-rate restorations are post-deployment items only because no live public claim now depends on them.)*

1. **`npm run lint`** — 0 errors; warnings triaged. *(sandbox cannot run — owner machine)*
2. **`npm test`** — currently 21/21 pass in sandbox; re-run locally.
3. **`npm run build`** — must complete; record route counts and categorise every warning as Harmless / Fix-before-deploy / Blocks-deploy into `19-…md` §12. *(sandbox blocked — see §12)*
4. **Unsupported screening wording removed** — ✅ DONE (repo scan: 0 remaining).
5. **Unverified quality-framework numbers removed** — ✅ DONE (repo scan: 0 remaining).
6. **Locality claims conservatively remediated** — ✅ DONE (see Section 2a).
7. **NAP correct and consistent** — ✅ DONE on website (see Section 2b); GBP match pending.

### 2a. Locality remediation completed (owner item 7 — highest priority)
- `areas.js`: 28 × `soilType`, 28 × `soilNote`, 28 × `floodRisk` replaced with site-specific due-diligence wording.
- `localities.js` (legacy 26): 26 × `soilNote` replaced.
- `constructionTips`: 23 prescriptive sentences removed across 12 entries (plinth heights, pile/raft recommendations, waterproofing directives, marsh/water-table statements), each replaced with the approved due-diligence sentence.
- Rendered pages: locality cost card and flood-risk badge removed; "Estimated Construction Cost ₹x–₹y/sqft" replaced with project-specific wording; area+service page swapped Flood Risk/Cost Range chips for due-diligence chips.
- `localSchema.js`: `priceRange` (unsourced ₹/sqft) removed from LocalBusiness JSON-LD.
- Generator FAQs: locality cost FAQ and "verified contractor network" FAQ rewritten.
- `localServices.js` / `serviceHubs.js` / `boq-review-chennai`: undated material and works rates removed (cement, TMT, PEB, shed, renovation, BOQ rate strip); Chennai-wide PEB/shed ranges retained only with an explicit "indicative only — not a dated quotation" qualifier.
- `/construction-in-chennai` hub: "Marine clay … Pile foundations are mandatory", the flood-zone locality list and 12 per-locality soil notes replaced with neutral, site-specific wording.
- **Content-length sanity check:** All 28 locality pages passed the minimum content-length sanity check. This does not constitute content-quality, uniqueness or indexability approval. Final indexing decisions remain pending P1 locality evaluation. Verified by replicating the generator's word count; no locality page changed sitemap state as a side-effect.

### 2b. NAP verification (owner item 9)
Website NAP is now single and consistent:
- Name **Buildogram** · Address **No.35, 7th Floor, Awfis Space, Centre Point 3, Poonamallee High Road, Manapakkam, Porur, Chennai 600089, Tamil Nadu, India** · Phone **+91 93602 32456** · Email **hello@buildogram.in** · URL **https://www.buildogram.in**
- Defect found and fixed: `localSchema.js` emitted placeholder `telephone: '+91-XXXXXXXXXX'`, `postalCode: '600000'` and a second email `info@buildogram.in` on **every locality page**. Now aligned to the published NAP with the full street address and `areaServed`.
- **Owner action:** confirm the NAP above is correct as written (no alternative office/location has been invented). **Google Business Profile matching: PENDING** — no GBP access from this environment.

## Section 3 — Mandatory before production promotion

1. Preview deployment verification: `20-post-deployment-verification.md` §§3–7 must all pass against the preview URL.
2. **Production database verification, read-only Sections A and B** of `production-db-verification.sql` — counts + flagged ID/slug export (demo slugs, seed phone numbers, ui-avatars/unsplash placeholders, unnumbered RERA/ISO claims, duplicate phones, non-`demo-` heuristics). Section C (archival/deletion) only after you review the output.
3. Confirm no unsupported public claim depends on anything still unverified.

## Section 4 — Owner confirmation after deployment

- Founder credentials (degrees / registration numbers) → unlocks "qualified", later "licensed/registered", and strengthens Person schema.
- Restoration of project and savings statistics (Section 1 items 1–3, 11, 12).
- Restoration of "free consultation" (confirm it is genuinely free).
- Restoration of warranty claims (needs written terms).
- Restoration of named supplier rates (needs agreements + dated feed).
- Content freshness pass on 2024/2025-dated guides and FAQs.
- `hello@buildogram.in` monitored for privacy requests (or create `privacy@buildogram.in`).
- GPTBot/CCBot policy remains: blocked for model training; OAI-SearchBot/Perplexity/Bing/anthropic-ai allowed for search discovery.

## Section 5 — Proof assets required for stronger E-E-A-T

Engineer profiles with qualifications and registration numbers · redacted BOQ comparison sample · sample inspection checklist and report · client-approved case studies with photographs · dated supplier rate methodology / price index · written warranty document · published partner verification (screening) procedure · BQS checkpoint count evidence (query + table + filters + result).
