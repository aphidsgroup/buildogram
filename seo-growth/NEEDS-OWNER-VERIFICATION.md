# NEEDS OWNER VERIFICATION — Buildogram

Updated: 2026-07-25 (post-P0 implementation) · See `18-claim-verification-register.csv` for the full register.

Owner decisions from P0 approval have been implemented. Every removed or softened claim below is preserved here and in the register so it can be **restored verbatim once evidence is supplied**.

## Removed/softened in P0 — restorable with evidence

| # | Original claim | Where it was | Current wording | Evidence needed to restore |
|---|---|---|---|---|
| 1 | "500+ Projects Supported" | services.js stats bar, about timeline, end-to-end page, locations/chennai, EngineerCredibility ("500+ Projects in Chennai since 2022") | Removed / non-numeric tiles | Project register + counting method |
| 2 | "₹12.8Cr Average Project Value" (also "₹2.1Cr", "₹50Cr+ Value Managed") | services.js, end-to-end, about, locations/chennai | Removed | Project value dataset |
| 3 | "18% Average Client Savings" | services.js, about, end-to-end, locations/chennai | "Identify scope gaps, pricing inconsistencies and avoidable cost risks" | Documented BOQ before/after sample |
| 4 | "10-Year Partner Warranty*" / "10-Year Structural Warranty" | services.js stats, about stats | Removed | Written warranty terms + underwriter. Site copy elsewhere should use: "Warranty terms depend on the appointed execution partner and signed contract." |
| 5 | "Certified/licensed structural engineers" | audit cluster H1s/metas, EngineerCredibility, ai-structural-audit-intake, plan-review, structural-plan-review | "Qualified structural engineers" | Named engineers + registration numbers + scheme name |
| 6 | "8–15% typical BOQ savings; ₹4–7.5L on ₹50L" | serviceHubs.js, localServices.js (4×), materials FAQ ("8–15% below retail") | Savings vary by quotation, scope, specifications and omissions | Anonymised review-outcome sample |
| 7 | "Basic visual inspection starts around ₹10,000" | structural audit FAQ | Quote-based wording | Confirmed rate card |
| 8 | "Certified pilots" (drone) | drone survey FAQ | "Drone operators we coordinate with manage Digital Sky clearances" | DGCA remote-pilot certificates or partner agreement |
| 9 | "Verified Partner Network" / "vetted" / "Every builder is RERA-registered" / "No fake reviews" | homepage, nav, footer, partner pages, materials pages, directory metadata | "Partner Network" / "screened by our team" | Published written verification procedure |
| 10 | Homepage "Live Rates" TMT table with named suppliers | homepage | Anonymised, labelled "Illustrative Example" | Real supplier agreements + maintained rate feed with timestamps |
| 11 | "12+ Structural Engineers" | EngineerCredibility | Non-numeric tile | Team roster |
| 12 | "First 50 BOQ Reviews / ₹2.5Cr avoided" (2022 timeline) | about page | Numbers removed, event kept | Historical records |
| 13 | "market data, updated monthly" | EngineerCredibility methodology | "current Chennai market data" | Evidence of monthly update process |
| 14 | GCC/CMDA report-acceptance claim | ai-structural-audit-intake FAQ | Conditional wording (confirm requirements per application) | Registered-SE credentials + documented acceptance cases |

## Still pending owner decision/confirmation (not blocking deploy)

15. **"Free consultation"** — one instance softened to "consultation" (ServicePageTemplate). Others (e.g. contact page "initial consultation") kept. Confirm whether consultations are genuinely free; if yes, "free" can be restored everywhere.
16. **"3–5 days review turnaround"** — kept with "typically"; confirm operationally.
17. **"2,500+ BQS checkpoints" / "500+ QC checks"** — framework-size claims on /quality-system, /build, /how-it-works. Kept (qualified with "up to"); confirm the BQS checklist database actually contains this many items (`bqs_checklist_items` table can prove it).
18. **Production partner data** — sandbox could not reach the production DB (network restriction). Code guards now block any `demo-*` slug from the directory, profile pages, APIs and sitemap regardless of DB state, and the seed endpoint requires `ENABLE_DEMO_SEED=true`. **Owner action:** run this read-only check against production and delete/deactivate any hits:
    `SELECT slug, company_name, approval_status, active FROM partners WHERE slug LIKE 'demo-%' OR email LIKE '%@pilot.buildogram.in';`
19. **Per-area soil/flood/cost data** (28 areas) — unchanged in P0; each entry needs a source before P1 locality work.
20. **Service-area list** — confirm actual operating localities before P1 locality consolidation.
21. **GPTBot/CCBot** — remain blocked (owner-ratified in P0: OAI-SearchBot allowed for ChatGPT search; GPTBot blocked = opt-out of OpenAI model training). Revisit if AI-assistant training visibility becomes desirable.
22. **Legal contact mailbox** — privacy/terms now point to `hello@buildogram.in`. Confirm this mailbox is monitored for privacy requests, or create `privacy@buildogram.in` and tell us to swap it in.
23. **NAP** — confirm footer address/phone matches Google Business Profile exactly.

## Proof assets recommended (unchanged)

Engineer profiles with qualifications; sample redacted BOQ comparison; sample inspection checklist/report; client-approved case studies; supplier rate methodology + dated price index; warranty document; published partner verification checklist.
