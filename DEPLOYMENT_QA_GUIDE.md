# Buildogram Deployment QA & Rollback Guide

This guide outlines the standard operating procedures for releasing new features to production via Vercel/Next.js, ensuring 100% uptime and SEO safety.

## 1. Pre-Deploy Checklist
Before merging to `main` and triggering a production build:
- [ ] **Run local build**: `npm run build` to catch compile-time errors.
- [ ] **Run local smoke tests**: Start local server `npm start` and run `npm run test:launch` to ensure no 500 errors.
- [ ] **Environment Variables**: Verify that all new `.env` variables have been mirrored in the Vercel Production Environment Settings.
- [ ] **Database Schema**: If `schema.prisma` was updated, ensure `npx prisma db push` (or `prisma migrate deploy`) has been executed against the Neon production database.

## 2. Post-Deploy Smoke Test (The Golden Rule)
Immediately after Vercel finishes the production build:
- Run the smoke test suite targeting the live URL:
```bash
BASE_URL=https://buildogram.com npm run test:launch
BASE_URL=https://buildogram.com npm run test:security
BASE_URL=https://buildogram.com npm run test:leads
```
- If `test:launch` or `test:security` **fails**, initiate rollback immediately.

## 3. SEO & Google Search Console
If the release contains new pages (e.g. new services, locations) or major layout changes:
- [ ] Verify `https://buildogram.com/sitemap.xml` includes the new routes.
- [ ] Log in to Google Search Console.
- [ ] Re-submit `sitemap.xml` for accelerated indexing.
- [ ] Use the URL Inspection tool on the homepage and critical updated pages to "Request Indexing".

## 4. Database Migration Checklist (Prisma + Neon)
When a release requires database changes:
- [ ] Announce brief maintenance window if the migration requires destructive changes.
- [ ] Take a manual Point-in-Time snapshot in the Neon dashboard (or rely on the automated 5-minute PITR).
- [ ] Run `npx prisma migrate deploy` in Vercel's build step (already configured via `package.json`).
- [ ] Verify database connectivity via the Ops Dashboard post-deploy.

## 5. Incident Rollback Procedure
If a deployment causes a critical failure (P0 bug, Security hole, SEO canonical drop):
1. **Instant Rollback**: Go to Vercel -> Buildogram Project -> Deployments.
2. Find the previous successful deployment.
3. Click the three dots (`...`) -> **Promote to Production** (or **Instant Rollback**).
4. Do **not** attempt to "fix forward" in production for a P0. Revert first, fix locally, then redeploy.
5. If the failure was database-related (bad migration), use Neon's Point-in-Time Recovery to rewind the database to the exact minute before the deploy.

> [!CAUTION]
> Never skip the `test:launch` post-deploy step. It catches 95% of Next.js hydration and routing errors before clients notice them.
