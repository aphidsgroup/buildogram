# Buildogram Production Launch Checklist

Follow this checklist strictly before routing public traffic to `buildogram.in`.

## 1. Environment & Database
- [ ] `.env.production` is populated using the `.env.example` template.
- [ ] `DATABASE_URL` is pointing to the production Neon PostgreSQL database.
- [ ] `JWT_SECRET` is set to a secure, randomly generated string.
- [ ] `NEXT_PUBLIC_SITE_URL` is set to `https://www.buildogram.in`.
- [ ] Ops Admin credentials (`OPS_ADMIN_EMAIL`, `OPS_ADMIN_PHONE`) are correctly configured.

## 2. Pre-Flight Database Check
- [ ] Visit `/api/health/db`.
  - Expect: `{"success":true,"database":"connected",...}`
- [ ] **Run Migration**: Execute `POST /api/ops/run-migration` using an admin token or via the Ops Dashboard.
- [ ] **Run Seed**: Execute `POST /api/ops/seed-partners` to populate the 8 initial demo partners.

## 3. Public Website Smoke Test
- [ ] Homepage (`/`) loads without console errors.
- [ ] Navigation links and footer links resolve correctly.
- [ ] Partner Directory (`/partners/directory`) displays the seeded partners.
- [ ] Individual Partner Profile (`/partners/demo-builder`) loads with images and portfolio items.
- [ ] Submit a test enquiry via the Partner Profile and confirm the "Success" message appears.

## 4. Partner OS Smoke Test
- [ ] Log in as a partner (e.g., `demo.builder@buildogram.com` / `password`).
- [ ] Verify the **Leads** tab shows the test enquiry submitted in Step 3.
- [ ] Verify the **Projects** tab loads correctly.
- [ ] Verify the **Profile** tab loads and can be updated.

## 5. Ops Admin Smoke Test
- [ ] Log in using the `ops_admin` credentials.
- [ ] Navigate to `/ops/partners`.
- [ ] Check the **Public Enquiries** tab to verify the test lead is logged and flagged cleanly (Spam Protection check).
- [ ] Verify all 8 seeded partners are visible and have "Active" status.

## 6. SEO & PWA Verification
- [ ] `https://www.buildogram.in/robots.txt` loads successfully.
- [ ] `https://www.buildogram.in/sitemap.xml` loads successfully.
- [ ] Open Chrome DevTools > Application > Manifest to verify the PWA manifest is loaded.

## 7. Known Limitations (Post-Launch Backlog)
1. **File Uploads**: Currently configured as URL-based links (e.g., Google Drive/Dropbox) rather than direct S3/Cloudinary binary uploads.
2. **Notifications**: Email (`sendgrid`) and WhatsApp (`twilio`) modules are built but fail silently if API keys are missing.
3. **AI Assistant**: Currently running in simulated/hardcoded mode until an OpenAI/Gemini API key is connected.
4. **Offline Mode**: `localStorage` fallbacks exist for resilience, but true offline mutation syncing requires background sync APIs.
