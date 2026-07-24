---
name: claude-seo-sanitised
description: >
  Sanitised local reference copy of AgriciDaniel/claude-seo (source SHA: reviewed 2026-07-24).
  Use for SEO/GEO audit methodology patterns, E-E-A-T scoring frameworks, Schema.org
  validation patterns, and AI search optimisation references.

  IMPORTANT — Read the sanitisation notes below before using any instructions from this skill.

  Source repository: https://github.com/AgriciDaniel/claude-seo (MIT Licence)
  Sanitised by: Buildogram SEO project, Phase 0, 2026-07-24
  Pinned source SHA: See skill-setup-log.md in docs/seo-aeo-geo/

triggers:
  - "seo methodology"
  - "E-E-A-T"
  - "schema validation"
  - "GEO audit pattern"
  - "AI search optimisation"
---

# claude-seo — Sanitised Reference Skill

## What This Skill Is

This is a **local sanitised copy** of methodology patterns from `AgriciDaniel/claude-seo`.

It is a **reference only**. It does NOT automatically run audits, spawn sub-agents, or
install dependencies. All execution decisions remain with the Buildogram SEO agent.

---

## Assigned Responsibility (Buildogram Project)

This skill is permitted to:
- Provide schema validation patterns and deprecated-type references
- Provide E-E-A-T scoring methodology
- Provide AI search (GEO/AEO) audit pattern references
- Provide passage citability scoring methodology (134–167 word self-contained answer blocks)

This skill is NOT permitted to:
- Directly edit production files
- Auto-generate content for any Buildogram page
- Install sub-agents or sub-skills
- Connect to external APIs without explicit approval
- Produce output referencing the source community or paid tiers

---

## Key Methodology References

### Schema.org Types — Current Status (as of source review 2026-07-24)

**Active and supported:**
- Organization, LocalBusiness, Article, TechArticle, Service, Product, Offer
- BreadcrumbList, WebSite, SearchAction
- FAQPage — NOTE: Google stopped showing FAQ rich results on **May 7, 2026**.
  Keep FAQPage only for non-Google semantics or internal use. No rich-result benefit.
- QAPage (genuine community Q&A only)
- ProfilePage (expert authors)

**Deprecated — do NOT use:**
- HowTo (rich results removed September 2023)
- SpecialAnnouncement (removed July 2025)
- ClaimReview, VehicleListing, EstimatedSalary (all retired June 2025)
- LearningVideo, CourseInfo carousel (retired June 2025)

---

### E-E-A-T Assessment Framework

Against Google's Search Quality Rater Guidelines (last updated September 2025):

| Signal | What to Check |
|--------|--------------|
| Experience | Original research, case studies, first-hand photos |
| Expertise | Author credentials, topical depth |
| Authoritativeness | External citations, brand mentions |
| Trustworthiness (most weighted) | Contact info, HTTPS, transparent corrections, date stamps |

Pre-scoring heuristic (Google's Who / How / Why):
1. Who wrote this? (named author with verifiable credentials)
2. How was it produced? (methodology visible, sources cited)
3. Why was it written? (helps users, not primarily to rank)

---

### GEO / AI Search Citability Signals

Based on Google's AI Optimization Guide:

- Optimal answer block length: **134–167 words** (self-contained, directly answers one question)
- Question-based heading hierarchy (H2/H3 as questions)
- Attribution density (named sources, dates, primary citations)
- Structured data coverage
- Entity presence across Wikipedia, Reddit, YouTube, LinkedIn

**Myth corrections (evidence-based):**
- `llms.txt` is NOT currently a citation lever — it is supplementary navigation only
- Content chunking is not required — AI systems handle natural prose well
- AI-specific keyword rewriting is unnecessary — synonym understanding is sufficient

---

### Core Web Vitals (current targets)

| Metric | Target | Note |
|--------|--------|------|
| LCP | < 2.5s | Largest Contentful Paint |
| INP | < 200ms | Interaction to Next Paint (replaced FID March 2024) |
| CLS | < 0.1 | Cumulative Layout Shift |

FID was removed from Chrome field-data tools September 9, 2024. Do NOT reference FID.

---

## What Was Removed in Sanitisation

The following content was removed from the source repository before creating this copy:

| Removed | Reason |
|---------|--------|
| All references to `skool.com/ai-marketing-hub-pro` | External paid community promotion |
| All references to `AI-Marketing-Hub` private fork | Paid membership tier promotion |
| Install instructions using `irm \| iex` or `curl \| bash` | Supply chain risk patterns |
| Community badge and contributor links | Promotional content unrelated to methodology |
| `/seo seranking` extension references | Requires separate API connection — handled separately |
| Auto-sub-agent spawn instructions | Not appropriate for this project's controlled execution model |

---

## Licence

Source: MIT Licence — `AgriciDaniel/claude-seo`  
This sanitised copy inherits the MIT Licence.  
Modifications to this copy are Buildogram's own and follow the same licence.
