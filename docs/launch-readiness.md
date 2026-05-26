# Buildogram Launch Readiness Checklist

Before switching `APP_MODE` from `demo` to `production`, ensure all items in this checklist are completed and verified.

## 1. Database & Persistence
- [ ] Neon/PostgreSQL provisioned and connection string added to `DATABASE_URL`.
- [ ] Ran `npx prisma db push` or `npx prisma migrate deploy` on production database.
- [ ] Database backups configured (daily automated backups recommended).
- [ ] Initial admin user created via `prisma/seed.js` or manual DB entry.

## 2. File Storage
- [ ] Selected a robust File Storage provider (Cloudinary, AWS S3, or Cloudflare R2).
- [ ] Keys added: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (if using Cloudinary).
- [ ] Storage buckets created with appropriate CORS and size limit policies.

## 3. Environment Variables & Security
- [ ] `APP_MODE=production` set.
- [ ] `JWT_SECRET` rotated to a secure 64-character random string.
- [ ] Domain points to production hosting (e.g., Vercel, AWS).
- [ ] HTTPS enforced.

## 4. Notifications & Communication
- [ ] Resend API key (`RESEND_API_KEY`) added and domain verified.
- [ ] Operations Slack Webhook (`SLACK_WEBHOOK_URL`) configured.
- [ ] `ADMIN_NOTIFICATION_EMAIL` updated to actual ops team inbox.

## 5. Analytics & Audit
- [ ] Analytics provider (e.g., PostHog, Mixpanel) initialized.
- [ ] `ANALYTICS_PROVIDER` set.
- [ ] Ensure `SystemAuditLog` is retaining data properly without bloating (consider setting up a cron job to archive logs > 1 year).

## 6. Functional QA
- [ ] Submitted a test lead via the public website.
- [ ] Verified the lead appears in the Ops Dashboard Pipeline.
- [ ] Tested assigning the lead and changing pipeline stages.
- [ ] Generated and viewed a Proposal PDF export.
- [ ] Uploaded a test document to the Document Vault and verified the URL.
- [ ] Tested Client Login and Partner Login flows.

## 7. Performance & SEO
- [ ] Ran `npm run build` locally with no warnings or errors.
- [ ] Checked Lighthouse scores on Vercel preview (target > 90 for performance and SEO).
- [ ] Verified Open Graph tags and meta descriptions on the live domain.
