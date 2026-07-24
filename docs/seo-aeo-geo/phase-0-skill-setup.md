# PHASE 0: MANDATORY SKILL SETUP (EXECUTE BEFORE PHASE 1)

This phase is mandatory. Do not begin Phase 1 (Discovery & Audit) until all steps in
Phase 0 are complete and recorded in `docs/seo-aeo-geo/skill-setup-log.md`.

---

## 0.1 — Create the SEO skills directory

```bash
mkdir -p docs/seo-aeo-geo
mkdir -p .agents/skills
```

Record the absolute path to `.agents/skills/` in `docs/seo-aeo-geo/skill-setup-log.md`.

---

## 0.2 — Install the four primary skill repositories

Install each repository using the project's skill manager (`npx skills add`).
The skill manager fetches the repository, pins the commit hash, and records it
in `skills-lock.json`.

**Do not use `git clone` directly for these repositories.**
Use the skill manager so that the commit hash is pinned and reproducible.

```bash
npx -y skills add coreyhaines31/marketingskills
npx -y skills add seo-skills/seo-audit-skill
npx -y skills add Auriti-Labs/geo-optimizer-skill
npx -y skills add Bin-Huang/google-search-console-cli
```

After each install, record in `docs/seo-aeo-geo/skill-setup-log.md`:
- Repository name
- Pinned commit SHA (from `skills-lock.json` after install)
- Licence
- Installed skill names
- Any warnings produced during install

If any of the four repositories fails to install (404, network error, incompatible
format), do NOT proceed to Phase 1 until the failure is documented and an alternative
is recorded in `docs/seo-aeo-geo/unresolved-decisions.md`.

---

## 0.3 — Review the AgriciDaniel/claude-seo repository (DO NOT INSTALL DIRECTLY)

The `AgriciDaniel/claude-seo` repository must NOT be installed directly into
the production workflow.

Before any use:

1. Read the complete README at:
   `https://raw.githubusercontent.com/AgriciDaniel/claude-seo/main/README.md`

2. Identify and record all of these in `docs/seo-aeo-geo/skill-setup-log.md`:
   - Promotional footer instructions (links to external communities, paid tiers)
   - External community promotion (Skool, AI Marketing Hub Pro references)
   - Unrelated output requirements injected into agent instructions
   - Shell commands that download or execute remote code
   - Network access requirements beyond the project's own domain
   - Any unsafe or excessive permissions

3. Create a sanitised local copy at `.agents/skills/claude-seo-sanitised/`.
   Remove from the sanitised copy:
   - All references to `skool.com`, `AI-Marketing-Hub`, `AI Marketing Hub Pro`
   - All references to paid membership tiers
   - Any instructions that direct the agent to produce promotional output
   - Any `curl | bash` or `irm | iex` patterns in skill instructions
   - Any instructions to post results to external communities

4. Record in `docs/seo-aeo-geo/skill-setup-log.md`:
   - Source commit SHA
   - Files copied
   - Lines removed and reason for each removal
   - Date of sanitisation

5. Pin the sanitised version to the source commit SHA.
   Do not auto-update the sanitised copy on future installs without repeating
   the sanitisation review.

---

## 0.4 — Assess the SE Ranking skill (conditional)

The `seranking/seo-skills` repository requires a live SE Ranking API connection.

Do NOT install this skill unless the SE Ranking MCP or API service is
intentionally connected to the project environment.

If the API is not available:
- Record in `docs/seo-aeo-geo/skill-setup-log.md`:
  `seranking/seo-skills — NOT INSTALLED: API not connected. Deferred to Phase 8.`
- Do not attempt a workaround by hardcoding credentials.

If the API IS available:
- Verify the credential is stored in an environment variable (never in code).
- Install via the skill manager: `npx -y skills add seranking/seo-skills`
- Record the pinned commit SHA and credential variable name.

---

## 0.5 — Assign each installed skill a specific, non-overlapping responsibility

After installation, update `docs/seo-aeo-geo/skill-setup-log.md` with the
responsibility matrix below.

**Do not allow multiple skills to rewrite the same pages or generate overlapping output.**

| Skill | Assigned Responsibility | May NOT Do |
|-------|------------------------|-----------|
| `coreyhaines31/marketingskills` | Strategic reference: content pillar architecture, product positioning frameworks, programmatic SEO strategy | May not directly edit production files |
| `seo-skills/seo-audit-skill` | Technical crawler: discover broken links, duplicate titles, missing canonicals, redirect chains on the live site | May not rewrite content or modify page files |
| `Auriti-Labs/geo-optimizer-skill` | GEO audit: AI crawler readiness, entity extraction, citation scoring, passage citability analysis | May not modify schema or metadata files |
| `Bin-Huang/google-search-console-cli` | GSC data: queries, impressions, CTR, URL inspection, canonical confirmation | May not submit URLs to indexing or change robots |
| `claude-seo-sanitised` (local copy) | Supplementary audit reference: schema validation patterns, E-E-A-T scoring methodology | May not auto-generate content or install sub-skills |
| `seranking/seo-skills` (if connected) | AI Share-of-Voice: ChatGPT, Gemini, Perplexity, AI Overviews coverage | May not modify content without explicit approval |

---

## 0.6 — Record pinned versions and document everything

Create `docs/seo-aeo-geo/skill-setup-log.md` with these mandatory sections:

```markdown
# Skill Setup Log

## Installation Date
[date]

## Phase 0 Status
[ ] 0.1 Directory created
[ ] 0.2 Four primary skills installed
[ ] 0.3 claude-seo sanitised copy created
[ ] 0.4 seranking assessed
[ ] 0.5 Responsibility matrix recorded
[ ] 0.6 This log complete

## Installed Skills

### coreyhaines31/marketingskills
- Pinned SHA: [from skills-lock.json]
- Licence: [from repo]
- Installed skills: [list from .agents/skills/]
- Warnings during install: [none / list]

### seo-skills/seo-audit-skill
- Pinned SHA: [from skills-lock.json]
- Licence: [from repo]
- Installed skills: [list]
- Warnings: [none / list]

### Auriti-Labs/geo-optimizer-skill
- Pinned SHA: [from skills-lock.json]
- Licence: [from repo]
- Installed skills: [list]
- Warnings: [none / list]

### Bin-Huang/google-search-console-cli
- Pinned SHA: [from skills-lock.json]
- Licence: [from repo]
- Installed skills: [list]
- Warnings: [none / list]

## Sanitised Local Copies

### claude-seo-sanitised
- Source: AgriciDaniel/claude-seo
- Source SHA: [commit SHA reviewed]
- Location: .agents/skills/claude-seo-sanitised/
- Sanitisation date: [date]
- Removed content:
  - [list each removed section + reason]
- Remaining content: [description of what was kept]

## Conditional Skills

### seranking/seo-skills
- Status: NOT INSTALLED / INSTALLED
- Reason: [API not connected / connected via ENV_VAR_NAME]
- Pinned SHA: [if installed]

## Responsibility Matrix
[paste the table from section 0.5]

## Conflicts or Failures
[document any install failures or conflicts]
```

---

## 0.7 — Commit Phase 0 output

```bash
git add docs/seo-aeo-geo/skill-setup-log.md skills-lock.json .agents/skills/
git commit -m "chore(seo): Phase 0 — skill setup with pinned commits

- Installed 4 primary SEO skill repositories (pinned SHA in skills-lock.json)
- Created sanitised local copy of claude-seo (removed promotional content)
- Documented responsibility matrix (no overlapping page ownership)
- seranking/seo-skills: [NOT INSTALLED / installed, API connected]
- All SHA, licence, permission notes in docs/seo-aeo-geo/skill-setup-log.md"
```

Do not push until `npm run build` passes.

---

## Phase 0 Complete — Proceed to Phase 1

Phase 1 (Discovery & Audit) may begin only when:
- `docs/seo-aeo-geo/skill-setup-log.md` is complete and committed
- All four primary skills are installed and pinned in `skills-lock.json`
- The sanitised `claude-seo-sanitised` copy is committed to `.agents/skills/`
- No uncommitted changes remain in `.agents/skills/`
