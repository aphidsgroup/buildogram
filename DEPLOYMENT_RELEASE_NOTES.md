# 🚀 Buildogram Production Launch Release

## Major Systems Added
- **AI Core Tools Suite**: Added automated interactive forms for property passport generation, BOQ validation, structural audit intake, survey requirement builders, and pile foundation estimating. Followups are fully automated via `node scripts/backfill-ai-tool-followups.js`.
- **RSC Navbar & UI Overhaul**: Refactored `Navbar.js` and deep component trees to pure Server Components to vastly decrease client JS payload size. Integrated responsive Drawer menus and custom `next/font` injection (Space Grotesk, Be Vietnam Pro).
- **Hardened Database Fallbacks**: Prisma configuration is wrapped in isolated try-catch layers to allow static generation to proceed cleanly without `DATABASE_URL` connections during Vercel builds. Safe operations exist for `upsertLead` to drop payload directly to Ops logs if the DB is unreachable.
- **Partner & Finance OS Dashboards**: Deep implementations of `/partner` tracking, equipment rental mapping, and ops accounting/billing pages.

## DB Schema Changes
- `AiToolSubmission` model added.
- Additional metadata columns appended to `BqsInspection`, `PartnerApplication`, and `MaterialQuote`.
- See `prisma/schema.prisma` for the exact unified schema map.

## Required Environment Variables
Ensure Vercel Production is populated with:
- `DATABASE_URL` and `DIRECT_URL`
- `NEXT_PUBLIC_SITE_URL=https://www.buildogram.in`
- `CLOUDINARY_URL`
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`
- `RESEND_API_KEY`
- `OPS_ADMIN_EMAIL`

## Post-Deploy Checks
1. Validate `https://www.buildogram.in/robots.txt` points to the correct absolute sitemap URL.
2. Confirm Client/Partner/Ops portals correctly redirect unauthenticated traffic (via `test:security` run against live domain).
3. Validate typography fonts correctly inherit into layout DOM without layout shift.

## Rollback Notes
- If `ECONNREFUSED` occurs during the production build in Vercel, the static build will likely succeed, but the API handlers might fail. Double-check Neon Postgres IP Whitelisting and connection limits.
- If necessary, `git revert` to the commit prior to this release to restore the static Next.js `<img>` loading configuration if `next/image` domain restrictions cause missing images in production.
