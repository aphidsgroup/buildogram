# External Tool & GitHub Repository Verification

The following repositories were referenced in early strategy prompts or methodologies, but their installation status and usage on the local environment must be explicitly documented to prevent false claims of automation.

## 1. coreyhaines31/marketingskills
- **Installed:** No
- **Repository URL:** https://github.com/coreyhaines31/marketingskills
- **Local Installation Path:** N/A
- **Status:** The methodology (semantic content structuring) was used manually by the agent. The code was not cloned, installed, or executed.
- **Current Operational Status:** Not in use.

## 2. seo-skills/seo-audit-skill
- **Installed:** No
- **Repository URL:** https://github.com/seo-skills/seo-audit-skill
- **Local Installation Path:** N/A
- **Status:** Not executed. We built our own custom `/ops/seo` dashboard to monitor technical metrics directly within the Next.js app using internal Node APIs instead of external Python audit skills.
- **Current Operational Status:** Not in use.

## 3. Auriti-Labs/geo-optimizer-skill
- **Installed:** No
- **Repository URL:** https://github.com/Auriti-Labs/geo-optimizer-skill
- **Local Installation Path:** N/A
- **Status:** The GEO framework principles (citations, entity consistency, removing aggressive marketing claims) were applied manually across the dataset by our subagents. The external optimizer skill itself was not run locally.
- **Current Operational Status:** Not in use.

## 4. Bin-Huang/google-search-console-cli
- **Installed:** No
- **Repository URL:** https://github.com/Bin-Huang/google-search-console-cli
- **Local Installation Path:** N/A
- **Status:** Not installed. We opted to write our own secure GSC implementation using `googleapis` inside a Next.js API route (`src/app/api/ops/seo/gsc/route.js`) instead of running a CLI tool.
- **Current Operational Status:** Replaced with internal API.

## 5. seranking/seo-skills
- **Installed:** No
- **Repository URL:** https://github.com/seranking/seo-skills
- **Local Installation Path:** N/A
- **Status:** Rank tracking was implemented natively via the Serper.dev API (`src/app/api/ops/seo/rankings/route.js`) rather than using the SERanking external skill.
- **Current Operational Status:** Replaced with internal Serper API.

## 6. AgriciDaniel/claude-seo (or forks)
- **Installed:** No
- **Repository URL:** https://github.com/AgriciDaniel/claude-seo
- **Local Installation Path:** N/A
- **Status:** Neither cloned nor executed.
- **Current Operational Status:** Not in use.

## Summary
No external GitHub SEO skills or repositories are currently installed on the local machine or integrated into the CI pipeline. All SEO, rank tracking, and Google Search Console integrations are custom-built natively within the Buildogram Next.js application.
