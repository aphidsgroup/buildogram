# Buildogram

Chennai-focused construction ecosystem platform: public marketplace/SEO site, AI-powered lead-gen tools (BOQ checker, cost estimator, floor plan creator, and more), a BOQ calculator, and role-based dashboards for Ops/Admin, Partners, Suppliers, and Clients.

## Stack

- **Framework:** Next.js 16 (App Router, JavaScript, CSS Modules)
- **Database:** Neon Serverless PostgreSQL via Prisma 6 + raw SQL (`src/lib/db`)
- **Media:** Cloudinary
- **Payments:** Razorpay (order create, checkout verify, webhook)
- **Email:** Resend · **Auth:** JWT + bcrypt · **Deploy:** Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

`npm run dev` runs `scripts/verify-env.js` first and warns about missing keys.

## Key scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Standard Next.js lifecycle (with env verification) |
| `npm test` | Unit tests (BOQ engine, payment signature verification) |
| `npm run test:launch` | Launch/SEO smoke test |
| `npm run test:security` | Security smoke test |
| `npm run test:performance` | Performance smoke test |
| `npm run test:leads` | Lead-routing smoke test |
| `npm run seed:admin` | Seed the admin user |

## Project layout

- `src/app` — routes: public pages, AI tools, `/ops`, `/partner`, `/client`, `/api/*`
- `src/lib` — domain logic (`boq-calc`, `payments`, `auth`, `notifications`, `seo`, …)
- `src/components` — shared UI
- `prisma/` + `migrations/` — schema and SQL migrations
- `tests/` — unit tests (Node built-in test runner)
- `docs/` — launch checklists, runbooks, production readiness
- `scratch/` — untracked local experiments and legacy one-off scripts

## Security notes

- `src/middleware.js` protects `/ops`, `/partner`, `/client`, `/project`, `/property-passport` routes; `/api/ops/*` routes enforce `requireAdmin` individually.
- Never commit `.env*` (except `.env.example`) or `google-credentials.json` — both are gitignored.
- Razorpay signatures are verified via `src/lib/payments/signature.js` (timing-safe HMAC comparison).

## Deployment

See `docs/BUILDOGRAM_PRODUCTION_READINESS.md` and `DEPLOYMENT_RUNBOOK.md`. Push to `master` → Vercel builds and deploys.
