# Buildogram SEO / AEO / GEO — Documentation Hub

Audited: 2026-07-24  
Stack: Next.js 16.2.6 · React 19.2.4 · Prisma 6.4.1 · JavaScript (no TypeScript) · Vercel · Neon PostgreSQL · Cloudinary

---

## Documents

| File | Purpose |
|------|---------|
| [current-state-audit.md](./current-state-audit.md) | Full technical + content audit |
| [url-inventory.csv](./url-inventory.csv) | Every public indexable URL with intent/quality |
| [keyword-intent-map.csv](./keyword-intent-map.csv) | Cannibalization analysis |
| [entity-positioning.md](./entity-positioning.md) | Business model contradiction report |
| [redirect-map.csv](./redirect-map.csv) | Proposed redirects (not yet executed) |
| [unresolved-decisions.md](./unresolved-decisions.md) | Legal/business decisions required |
| [external-tools.md](./external-tools.md) | External skill/repo assessments |
| [implementation-log.md](./implementation-log.md) | Phase-by-phase change record |

---

## Critical Issues (Fix Before Next Deployment)

1. **7 sitemap URLs are 404s** — service pages in sitemap.js not in `[serviceSlug]` route
2. **Dual robots conflict** — `public/robots.txt` overrides `src/app/robots.js` (static wins in Next.js)
3. **`lastModified: now` on every sitemap entry** — Google sees every page as "just updated" on every deploy
4. **`/admin/` not blocked** in robots.js

---

## Phase Status

| Phase | Status | Branch |
|-------|--------|--------|
| 1 — Discovery & Audit | ✅ Complete | main |
| 2 — SEO Foundation | ⏳ Pending approval | `feat/buildogram-seo-aeo-geo-transformation` |
| 3–9 | Not started | — |
