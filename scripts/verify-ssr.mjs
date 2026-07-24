import fs from 'fs';

const urlsToTest = [
  'http://localhost:3000/',
  'http://localhost:3000/soil-testing-chennai',
  'http://localhost:3000/structural-audit-chennai'
];

async function verifySSR(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { url, error: `HTTP ${res.status}` };
    }
    const html = await res.text();

    const results = {
      url,
      title: /<title[^>]*>(.*?)<\/title>/i.test(html),
      metaDescription: /<meta[^>]*name=["']description["'][^>]*>/i.test(html),
      canonical: /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html),
      robotsDirective: /<meta[^>]*name=["']robots["'][^>]*>/i.test(html),
      h1: /<h1[^>]*>.*?<\/h1>/i.test(html),
      importantH2: /<h2[^>]*>.*?<\/h2>/i.test(html),
      internalLinks: /<a[^>]*href=["']\/[^>]*>.*?<\/a>/i.test(html),
      breadcrumbs: /BreadcrumbList/i.test(html),
      jsonLd: /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html),
      clientOnlyContent: html.includes('Loading') || html.includes('Please wait') ? 'Potentially found fallback' : 'None detected'
    };

    return results;
  } catch (error) {
    return { url, error: error.message };
  }
}

async function run() {
  const results = [];
  for (const url of urlsToTest) {
    console.log(`Verifying SSR for ${url}...`);
    const res = await verifySSR(url);
    results.push(res);
  }

  let markdown = `# Server-Side Rendering (SSR) Verification\n\nDate: ${new Date().toISOString()}\n\n`;
  
  for (const res of results) {
    markdown += `## URL: ${res.url}\n`;
    if (res.error) {
      markdown += `**Error:** ${res.error}\n\n`;
      continue;
    }
    markdown += `- **Title:** ${res.title ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **Meta Description:** ${res.metaDescription ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **Canonical:** ${res.canonical ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **Robots Directive:** ${res.robotsDirective ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **H1:** ${res.h1 ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **H2 Sections:** ${res.importantH2 ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **Internal Links:** ${res.internalLinks ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **Breadcrumbs:** ${res.breadcrumbs ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **JSON-LD Schema:** ${res.jsonLd ? '✅ Present' : '❌ Missing'}\n`;
    markdown += `- **Client-Only Content:** ${res.clientOnlyContent}\n\n`;
  }

  fs.writeFileSync('docs/seo-aeo-geo/ssr-verification.md', markdown);
  console.log('Verification complete. Results saved to docs/seo-aeo-geo/ssr-verification.md');
}

run();
