# Launch Smoke Test Report

**Date:** 2026-06-07T15:01:01.581Z
**Base URL:** https://www.buildogram.in
**Result:** ❌ FAILED
**Summary:** 16 passed, 2 failed.

## Failed URLs

### /case-studies
- **URL**: [https://www.buildogram.in/case-studies](https://www.buildogram.in/case-studies)
- **Errors**:
  - Status code 404 (Expected 200)
  - Missing <h1> tag

### /proof
- **URL**: [https://www.buildogram.in/proof](https://www.buildogram.in/proof)
- **Errors**:
  - Status code 404 (Expected 200)
  - Missing <h1> tag

## Recommended Fixes
- Check server logs for any 500 errors.
- Ensure all pages have `generateMetadata` exported correctly for SEO tags.
- Verify that `robots.txt` and `sitemap.xml` are generated properly at the root.

## All Results

| Route | Status | Errors |
|---|---|---|
| / | ✅ PASS | - |
| /services | ✅ PASS | - |
| /materials | ✅ PASS | - |
| /structural-audit-chennai | ✅ PASS | - |
| /land-survey-chennai | ✅ PASS | - |
| /soil-investigation-chennai | ✅ PASS | - |
| /pile-foundation-contractors-chennai | ✅ PASS | - |
| /ai-tools | ✅ PASS | - |
| /property-passport | ✅ PASS | - |
| /quality-system | ✅ PASS | - |
| /partners | ✅ PASS | - |
| /case-studies | ❌ FAIL | Status code 404 (Expected 200), Missing <h1> tag |
| /proof | ❌ FAIL | Status code 404 (Expected 200), Missing <h1> tag |
| /locations/chennai | ✅ PASS | - |
| /sitemap.xml | ✅ PASS | - |
| /robots.txt | ✅ PASS | - |
| /llms.txt | ✅ PASS | - |
| /ai-sitemap.txt | ✅ PASS | - |
