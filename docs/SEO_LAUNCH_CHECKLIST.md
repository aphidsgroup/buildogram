# Buildogram SEO Launch Checklist

Ensure the following SEO foundations are in place before driving organic traffic.

## 1. Google Search Console & Tag Manager
- [ ] Create a property in **Google Search Console (GSC)** for `https://buildogram.in`.
- [ ] Verify ownership (DNS TXT record or HTML meta tag).
- [ ] Set `NEXT_PUBLIC_GA_ID` in production environment to activate Google Analytics.
- [ ] Verify page views and contact form events are firing in GA Realtime dashboard.

## 2. Sitemap & Robots
- [ ] A static or dynamic `sitemap.xml` is present at the root (use `next-sitemap` or a static file).
- [ ] A `robots.txt` is present at the root, allowing all commercial pages.
- [ ] Submit the `sitemap.xml` URL into Google Search Console for indexing.

## 3. Metadata Verification
- [ ] **Home Page (`/`)**: Title should read "Buildogram | Engineer-Led Home Construction & Property Ecosystem in Chennai".
- [ ] **Services (`/services`)**: Title should read "Construction Services in Chennai | Buildogram".
- [ ] **Materials (`/materials`)**: Title should highlight "Material Sourcing in Chennai".
- [ ] **Partners Directory (`/partners/directory`)**: Highlights "Verified Builders & Contractors Chennai".

## 4. UTM & Lead Tracking
- [ ] Append UTM parameters to any paid ads or social media links (e.g., `?utm_source=instagram&utm_medium=reel&utm_campaign=launch`).
- [ ] Verify that Leads submitted with UTMs appear in the Ops Dashboard with the correct `utmSource` and `sourcePage` attached.
