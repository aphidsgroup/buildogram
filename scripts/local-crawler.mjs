import fs from 'fs';

const startUrl = 'http://localhost:3000';
const visited = new Set();
const queue = [startUrl];
const results = {
  indexableUrls: 0,
  brokenLinks: 0,
  duplicateTitles: 0,
  duplicateH1s: 0,
  thinPages: 0,
  schemaErrors: 0,
  pages: []
};

const titles = new Set();
const h1s = new Set();

async function crawl() {
  while (queue.length > 0 && visited.size < 50) { // Limit to 50 for quick local baseline
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);
    
    try {
      const res = await fetch(url);
      const status = res.status;
      
      if (status >= 400) {
        results.brokenLinks++;
        results.pages.push({ url, status, error: 'Broken link' });
        continue;
      }

      const html = await res.text();
      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const noindexMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex[^"']*["'][^>]*>/i);
      
      const title = titleMatch ? titleMatch[1] : null;
      const h1 = h1Match ? h1Match[1] : null;
      const indexable = !noindexMatch && status === 200;

      if (indexable) results.indexableUrls++;
      
      if (title) {
        if (titles.has(title)) results.duplicateTitles++;
        titles.add(title);
      }
      if (h1) {
        if (h1s.has(h1)) results.duplicateH1s++;
        h1s.add(h1);
      }
      
      if (html.length < 2000) results.thinPages++;
      
      // Basic JSON-LD parse check
      const schemas = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
      for (const match of schemas) {
        try {
          JSON.parse(match[1]);
        } catch (e) {
          results.schemaErrors++;
        }
      }
      
      results.pages.push({ url, status, indexable, title, h1 });
      
      // Find internal links
      const linkRegex = /<a[^>]*href=["'](\/[^"']+)["']/g;
      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        const nextUrl = startUrl + match[1];
        if (!visited.has(nextUrl) && !queue.includes(nextUrl)) {
          queue.push(nextUrl);
        }
      }
      
    } catch (e) {
      results.pages.push({ url, error: e.message });
      results.brokenLinks++;
    }
  }

  fs.writeFileSync('docs/seo-aeo-geo/raw-audit-data/local-crawl.json', JSON.stringify(results, null, 2));
  console.log('Crawl complete.');
}

crawl();
