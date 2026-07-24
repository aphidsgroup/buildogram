---
name: geo-optimizer
description: >
  GEO (Generative Engine Optimisation) and AEO (Answer Engine Optimisation) audit tool
  from Auriti-Labs. Scores website visibility and citation readiness for AI search engines
  (ChatGPT, Perplexity, Gemini, Google AI Overviews) across 8 signal categories, 0–100.

  Note: This repository does not include a SKILL.md in the standard format.
  This wrapper SKILL.md was created by the Buildogram SEO project (Phase 0, 2026-07-24)
  to make the tool accessible via the skill manager.

  Source: https://github.com/Auriti-Labs/geo-optimizer-skill (MIT Licence)
  The underlying Python CLI tool must be installed separately before use: pip install geo-optimizer

triggers:
  - "GEO audit"
  - "generative engine optimisation"
  - "AI citation readiness"
  - "AI search visibility"
  - "passage citability"
  - "llms.txt generation"
---

# geo-optimizer — Auriti Labs GEO Skill

## What This Skill Does

Scores and audits a website's readiness to be cited by AI search engines
(ChatGPT Search, Perplexity, Google AI Overviews, Gemini, Bing Copilot).

**8 signal categories scored 0–100:**
1. Content clarity and directness
2. Structured data coverage
3. Entity recognition readiness
4. Question-based heading hierarchy
5. Answer block quality (passage citability)
6. Source attribution and citation density
7. AI crawler accessibility (robots, llms.txt)
8. Factual accuracy signals (dates, author, methodology)

## Assigned Responsibility (Buildogram Project)

Permitted to:
- Audit citability scoring for Buildogram's public pages
- Generate `llms.txt` supplementary navigation file
- Score answer blocks on key Buildogram pages
- Identify passages that could be improved for AI citation

Not permitted to:
- Directly edit production content files
- Overwrite schema files
- Submit URLs to any indexing service

## Installation Note

The Python CLI requires `pip install geo-optimizer` in a Python environment.
This is **not** installed automatically by the skill manager.
Run `/seo doctor` or equivalent before executing this skill.

## Usage (when Python CLI is available)

```bash
geo-optimizer audit https://www.buildogram.in
geo-optimizer audit https://www.buildogram.in/boq-audit
geo-optimizer generate-llms-txt https://www.buildogram.in
```

## Licence

MIT — Auriti Labs  
Wrapper SKILL.md: Buildogram project, same licence.
