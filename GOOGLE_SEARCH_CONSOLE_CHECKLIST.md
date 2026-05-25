# Google Search Console (GSC) Launch Checklist

Follow these steps to officially index Buildogram with Google.

## 1. Domain Verification
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Select **Domain** (preferred) or **URL Prefix** (`https://www.buildogram.in`).
4. Add the provided TXT record to your DNS settings (e.g., in Cloudflare, Vercel, or Route53).
5. Click **Verify**.

## 2. Submit Sitemap
1. In the GSC left menu, click **Sitemaps**.
2. Enter `sitemap.xml` in the "Add a new sitemap" field.
3. Click **Submit**.
4. Verify the status says "Success".

## 3. Initial URL Inspection
1. Use the search bar at the top of GSC: "Inspect any URL in 'buildogram.in'".
2. Enter `https://www.buildogram.in/`.
3. Wait for the live test.
4. Click **Request Indexing**.
5. Repeat this for the main directory: `https://www.buildogram.in/partners/directory`.

## 4. Monitor Mobile Usability
1. Go to **Experience > Mobile Usability**.
2. Ensure there are no errors (e.g., "Text too small to read", "Clickable elements too close together").
3. The PWA `manifest.json` and `viewport` meta tags have already been configured to prevent these issues.

## 5. Ongoing Monitoring
- **Pages**: Check for "Crawled - currently not indexed" or "Discovered - currently not indexed" errors.
- **Core Web Vitals**: Monitor LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift).
- **Search Appearance**: Monitor which rich results (structured data) Google awards you.
