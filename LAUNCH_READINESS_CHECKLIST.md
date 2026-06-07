# Buildogram Launch Readiness Checklist

This checklist must be verified prior to a major release, either automatically via our smoke test scripts or manually by the QA/Release Manager.

## 1. Public Pages (Automated & Manual)
- [ ] **Homepage (`/`)**: Hero banner loads, CTA functions, trust badges visible.
- [ ] **Navigation & Menu**: Mega menu expands, internal links function correctly on desktop & mobile.
- [ ] **Services Hub (`/services`)**: Links to individual service pages resolve (200 OK).
- [ ] **Materials Hub (`/materials`)**: Current quotes render, no missing images.
- [ ] **Structural Audit (`/structural-audit-chennai`)**: Booking form triggers correctly.
- [ ] **Survey/Testing (`/survey`, `/piling`)**: Booking forms map to correct DB pipeline stages.
- [ ] **AI Tools (`/ai-tools`)**: AI Floor Plan & Design Assistant widgets render correctly.

## 2. SEO & Crawlability (Automated)
- [ ] **Metadata**: `meta name="description"` exists on all indexable public pages.
- [ ] **Canonicals**: `<link rel="canonical">` points to absolute production URL.
- [ ] **Schema.org**: LocalBusiness and Service JSON-LD injections present where expected.
- [ ] **Robots.txt & Sitemap**: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/ai-sitemap.txt` return 200 OK without errors.
- [ ] **Noindex rules**: Private portals (`/ops`, `/client`, `/partner`) correctly employ `noindex`.

## 3. Lead Routing & Conversion (Automated & Manual)
- [ ] **Construction Leads**: Map to "Construction" bucket, assign "High" priority.
- [ ] **Material Quote Leads**: Map to "Materials", assign "High" priority.
- [ ] **Partner Onboarding**: Submits successfully to "Partner Application" stage.
- [ ] **Email/WhatsApp Triggers**: (Manual test) Submitting a lead correctly dispatches welcome autoresponders.

## 4. Ops & Security (Automated)
- [ ] **RBAC**: Accessing `/ops/*` without a session immediately redirects to `/login` or 401.
- [ ] **Financials Shield**: `/ops/finance` throws 403 unless authenticated as `ops_admin`.
- [ ] **Audit Logging**: Important actions successfully append rows to `audit_logs`.
- [ ] **Exports Layer**: `ops_pm` roles receive redacted payloads; `ops_admin` receives raw payloads.

## 5. Token-Based Sharing (Automated)
- [ ] **Property Passport**: `/property-passport/[token]` accessible anonymously, handles invalid tokens safely (404).
- [ ] **Project Dashboard**: `/project/[token]` accessible anonymously, shielded from internal finances.
- [ ] **Proof Assets**: `/proof/[slug]` case studies render perfectly.

> [!TIP]
> Use `npm run test:launch`, `npm run test:security`, and `npm run test:leads` to automatically verify 80% of these checks in seconds.
