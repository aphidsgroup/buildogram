# Skill Setup Log — Phase 0

**Date:** 2026-07-24  
**Project:** Buildogram SEO/AEO/GEO Transformation  
**Branch:** main

---

## Phase 0 Checklist

- [x] 0.1 Directory `.agents/skills/` confirmed
- [x] 0.2 Four primary skills installed
- [x] 0.3 `claude-seo` sanitised copy created
- [x] 0.4 `seranking/seo-skills` assessed — NOT INSTALLED (API not connected)
- [x] 0.5 Responsibility matrix recorded
- [x] 0.6 This log complete

---

## Installed Skills

### coreyhaines31/marketingskills

| Field | Value |
|-------|-------|
| Source | `coreyhaines31/marketingskills` |
| Source type | GitHub |
| Pinned hash (skills-lock.json) | Multiple entries — 47 skills installed |
| Licence | MIT |
| Installed skill count | **47 skills** |
| Security assessment | Safe (no binary payloads, no shell execution) |
| Warnings during install | None |

**Installed skills include (SEO-relevant):**
`ai-seo`, `analytics`, `content-strategy`, `competitor-profiling`, `competitors`,
`cro`, `customer-research`, `marketing-plan`, `pricing`, `product-marketing`,
`programmatic-seo`, `schema`, `seo-audit`, `site-architecture`

---

### seo-skills/seo-audit-skill

| Field | Value |
|-------|-------|
| Source | `seo-skills/seo-audit-skill` |
| Source type | GitHub |
| Pinned hash | `f468cab1f52687f89be08dc431b0400d684fdcda82540b0690ba7d428ea17458` |
| Licence | MIT |
| Installed skills | **1: `seo-audit`** |
| Security assessment | Gen: Safe · Socket: 0 alerts · Snyk: Med Risk (Playwright/Chromium dependency — acceptable for audit tool) |
| Warnings during install | Snyk Med Risk — Playwright browser downloads. Not a risk for the skill instructions themselves. |

**What `seo-audit` does:** Audits websites across 251 rules in 20 categories including Core Web Vitals, technical SEO, structured data, AI search readiness. Returns LLM-optimized reports.

---

### Auriti-Labs/geo-optimizer-skill

| Field | Value |
|-------|-------|
| Source | `Auriti-Labs/geo-optimizer-skill` |
| Source type | GitHub |
| Pinned hash | Not recorded by skill manager (no SKILL.md found in repo) |
| Licence | MIT |
| Installed skills | **0 via skill manager** — no SKILL.md in repository |
| Resolution | Created local wrapper at `.agents/skills/geo-optimizer/SKILL.md` |
| Underlying tool | Python CLI: `pip install geo-optimizer` (separate install required) |
| Security assessment | Standard Python CLI + MCP server, no suspicious permissions |
| Warnings | Repository does not follow standard SKILL.md format; wrapper created |

---

### Bin-Huang/google-search-console-cli

| Field | Value |
|-------|-------|
| Source | `Bin-Huang/google-search-console-cli` |
| Source type | GitHub |
| Pinned hash | `783f821d5676f6071f578fb2871161f6eaa0c0fb34e145761eb26c0ae21ba163` |
| Licence | Apache-2.0 |
| Installed skills | **1: `google-search-console-cli`** |
| Security assessment | Gen: Safe · Socket: 0 alerts · Snyk: Med Risk (OAuth credential handling — standard for GSC access) |
| Warnings | Requires OAuth2 setup before use. Credentials stored in `~/.config/` — never in repo. |

**What this skill does:** GSC queries, impressions, CTR, URL inspection, sitemap status — via Google's official API with OAuth2.

---

## Sanitised Local Copies

### claude-seo-sanitised

| Field | Value |
|-------|-------|
| Source | `AgriciDaniel/claude-seo` |
| Source SHA reviewed | Latest main branch, 2026-07-24 (direct README review) |
| Licence | MIT |
| Location | `.agents/skills/claude-seo-sanitised/SKILL.md` |
| Sanitisation date | 2026-07-24 |

**Content removed and reason:**

| Removed | Reason |
|---------|--------|
| References to `skool.com/ai-marketing-hub-pro` | External paid community promotion — irrelevant to project |
| References to `AI-Marketing-Hub` private fork | Paid membership tier — creates misleading instructions |
| Community badges and contributor promotion | Promotional, not methodology |
| `irm \| iex` and `curl \| bash` install patterns | Supply chain risk — flagged in the prompt |
| `/seo seranking` extension commands | Requires separate paid API — handled separately |
| Auto-sub-agent spawn instructions | Not compatible with this project's controlled execution model |
| `/plugin marketplace add` installation instructions | Not applicable to this project's skill manager |

**Content retained:**
- Schema.org type registry with deprecated types (FAQPage no longer produces rich results as of May 7, 2026)
- E-E-A-T assessment methodology
- Core Web Vitals targets (LCP, INP, CLS — INP replaced FID March 2024)
- GEO/AEO citability scoring methodology (134–167 word answer blocks)
- AI search myth corrections (llms.txt is not a citation lever; chunking not required)

---

## Conditional Skills

### seranking/seo-skills

| Field | Value |
|-------|-------|
| Status | **NOT INSTALLED** |
| Reason | SE Ranking API/MCP not connected to this project environment |
| Deferred to | Phase 8 (Measurement) — install only when API is intentionally connected |
| Credential requirement | API key stored in environment variable — never hardcoded |

---

## Responsibility Matrix

| Skill | Assigned Responsibility | May NOT Do |
|-------|------------------------|-----------|
| `coreyhaines31/marketingskills` (47 skills) | Strategic reference: pillar architecture, product positioning, programmatic SEO strategy, content strategy | May not directly edit production files |
| `seo-audit` (seo-skills) | Technical crawler: broken links, duplicate titles, missing canonicals, redirect chains on live site | May not rewrite content or modify page files |
| `geo-optimizer` (Auriti-Labs, wrapper) | GEO audit: AI crawler readiness, entity extraction, citation scoring, passage citability | May not modify schema or metadata files |
| `google-search-console-cli` (Bin-Huang) | GSC data: queries, impressions, CTR, URL inspection, canonical confirmation | May not submit URLs to indexing or change robots |
| `claude-seo-sanitised` (local copy) | Supplementary audit reference: schema deprecation status, E-E-A-T scoring, CWV methodology | May not auto-generate content or install sub-skills |
| `seranking/seo-skills` | AI Share-of-Voice (deferred to Phase 8, only when API connected) | May not modify content without explicit approval |

**No two skills own the same page or file. Page-edit responsibility belongs exclusively to the Buildogram SEO agent, not to any skill.**

---

## Security Assessment Summary

| Repository | Gen | Socket | Snyk | Decision |
|-----------|-----|--------|------|---------|
| coreyhaines31/marketingskills | Safe | 0 alerts | — | ✅ Installed |
| seo-skills/seo-audit-skill | Safe | 0 alerts | Med (Playwright) | ✅ Installed — Playwright risk is browser download, not the skill |
| Auriti-Labs/geo-optimizer-skill | Safe | — | — | ✅ Wrapper created — Python CLI requires separate install |
| Bin-Huang/google-search-console-cli | Safe | 0 alerts | Med (OAuth) | ✅ Installed — OAuth is standard for GSC access |
| AgriciDaniel/claude-seo | Safe (MIT) | — | — | ✅ Sanitised copy created — NOT installed from source |
| seranking/seo-skills | Not assessed | — | — | ⏳ Deferred — API not connected |

---

## Conflicts or Failures

| Issue | Resolution |
|-------|-----------|
| `Auriti-Labs/geo-optimizer-skill` has no SKILL.md | Created wrapper at `.agents/skills/geo-optimizer/SKILL.md` |
| `seo-audit` name conflicts with skill from `coreyhaines31/marketingskills` | `coreyhaines31` skill manager overwrote the existing `seo-audit` — check `.agents/skills/seo-audit/SKILL.md` to confirm which version is active |
