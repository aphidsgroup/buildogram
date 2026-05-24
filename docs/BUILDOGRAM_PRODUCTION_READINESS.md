# Buildogram Production Readiness Review

This document defines the production hosting guidelines and architecture requirements for deploying the Buildogram Next.js App Router application.

## 1. Hosting Architecture
- **Frontend & Edge API:** Vercel (Recommended) or AWS Amplify. Ensures `force-dynamic` routes and API endpoints execute seamlessly with auto-scaling.
- **Database:** Neon Serverless PostgreSQL.
  - Connection pooling must be enabled in the Vercel connection string.
- **Media Storage:** Cloudinary.
  - Required for securely hosting BQS quality check photos, Property Passport documents, and daily progress videos.

## 2. Environment Variables
Ensure all variables listed in `.env.example` are populated in the production environment.
- *Critical:* Ensure `DEMO_SEED_CONFIRM` is explicitly missing or set to `false` in production.
- *Critical:* Ensure `OPENAI_API_KEY` is present, otherwise the Cost Estimator fallback system will trigger.

## 3. Scheduled Jobs (Cron)
- No external cron services are strictly required for the V1 release. However, if automated daily WhatsApp summaries are enabled in the future, configure a Vercel Cron Job targeting a new `/api/cron/daily-summary` endpoint.

## 4. Performance & Caching
- Ensure static pages (like `/about`, `/specifications`) are not mistakenly opted into `force-dynamic`.
- The Next.js `Image` component is configured; ensure Cloudinary domains are permitted in `next.config.js` `images.remotePatterns` if Next.js Image optimization is heavily utilized.

## 5. Deployment Step
1. Push code to the `master` branch.
2. Vercel automatically runs `npm run build`.
3. Vercel runs the `scripts/verify-env.js` hook. If crucial API keys are missing, it will warn in the build logs.
4. Deployment completes. Check `/ops/system-status` to verify integration health.
