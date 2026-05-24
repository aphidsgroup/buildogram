# Buildogram Launch QA Checklist

This document mirrors the digital tracking tool found at `/ops/launch-checklist` and provides the detailed validation criteria for each launch requirement.

## 1. Security & Environment
- **[ ] Environment Variables Secure**
  - Verification: SSH into the production server or Vercel dashboard and confirm no `localhost` URLs or dummy API keys are present.
  - Required Keys: `DATABASE_URL`, `NEXT_PUBLIC_BASE_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `WHATSAPP_CLOUD_TOKEN`, `CLOUDINARY_URL`.

## 2. Infrastructure & Integrations
- **[ ] Production DB Connected**
  - Verification: Neon DB Dashboard confirms active connections and scaling limits are configured. Point-In-Time-Recovery (PITR) must be enabled.
- **[ ] Razorpay Live Keys Configured**
  - Verification: Run a test transaction of ₹1 using the production keys to ensure webhooks trigger the `/api/payments/webhook` route successfully.
- **[ ] WhatsApp Cloud API Connected**
  - Verification: Trigger a test lead via the frontend. Verify the configured WhatsApp business number receives the "New Lead" template.

## 3. Content & SEO
- **[ ] SEO Metadata & Sitemap Generated**
  - Verification: Load `https://buildogram.in/sitemap.xml` and ensure all paths resolve with HTTP 200. Check the `<head>` of the homepage for `og:image` and LocalBusiness JSON-LD.
- **[ ] Legal Pages Active**
  - Verification: Ensure `/privacy-policy` and `/terms` are accessible and contain no placeholder `[Insert Company Name]` text.

## 4. Data Hygiene & Access
- **[ ] Demo Data Hard Deleted**
  - Verification: Run `SELECT * FROM leads WHERE email LIKE '%demo%'` on the production database. The result must be 0 rows.
- **[ ] Core Ops Accounts Provisioned**
  - Verification: Ensure Dr. Vignesh and the founding team can successfully log in and view the Ops dashboard without permission denied errors.

> **Sign-off:** Once all criteria are met, the project is officially designated as Production Ready.
