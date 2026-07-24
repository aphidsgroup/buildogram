# Buildogram — External Tools Assessment

**Date:** 2026-07-24  
**Purpose:** Document any external SEO skills or repositories evaluated for this project.

---

## Tools Evaluated

### 1. `coreyhaines31/marketingskills`

| Field | Value |
|-------|-------|
| Purpose | Strategic reference: product-marketing, site-architecture, SEO patterns |
| Decision | Reference only — not installed |
| Risk | Low (not executed in this project) |
| Notes | Useful conceptual frameworks for content strategy and pillar architecture |

---

### 2. `seo-skills/seo-audit-skill`

| Field | Value |
|-------|-------|
| Purpose | Automated crawler for technical SEO issues |
| Decision | Not installed — audit performed manually via codebase inspection |
| Risk | Not assessed — not used |
| Notes | Would require isolated environment + permission review before use |

---

### 3. `Auriti-Labs/geo-optimizer-skill`

| Field | Value |
|-------|-------|
| Purpose | GEO audit: crawler readiness, entity analysis, citation readiness |
| Decision | Not installed — GEO analysis performed manually |
| Risk | Not assessed — not used |
| Notes | Proprietary score methodology not reviewed |

---

### 4. `Bin-Huang/google-search-console-cli`

| Field | Value |
|-------|-------|
| Purpose | GSC data access via CLI |
| Decision | Not installed — GSC integration is Phase 8 |
| Risk | Requires official Google OAuth — do not hardcode credentials |
| Notes | Will be evaluated in Phase 8 with proper auth setup |

---

### 5. `AgriciDaniel/claude-seo`

| Field | Value |
|-------|-------|
| Purpose | SEO automation |
| Decision | NOT INSTALLED — flagged for review |
| Risk | **High** — promotional footer instructions, external community promotion, potentially unsafe permissions noted in brief |
| Notes | Do not install directly into production workflow without full code review and sanitization |

---

## Installed Agent Skills (Project-Specific)

The following agent skills were installed and used during this project:

| Skill | Path | Purpose | Status |
|-------|------|---------|--------|
| `gingiris-seo-geo-agent` | `.agents/skills/gingiris-seo-geo-agent/` | SEO/GEO schema standards enforcement | ✅ Used in [serviceSlug] template |
| `google-cloud-waf-performance-optimization` | `.agents/skills/` | Build efficiency validation | ✅ Referenced for SSG verification |

---

## Notes

No external repositories were cloned or installed directly into the production codebase.  
All SEO analysis was performed via direct codebase inspection and manual audit.  
External tools will be evaluated on a case-by-case basis in later phases.
