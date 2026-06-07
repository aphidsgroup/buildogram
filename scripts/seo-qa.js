const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const baseDir = path.join(__dirname, '../.next/server/app');
const sitemapPath = path.join(baseDir, 'sitemap.xml.body');

let sitemapUrls = new Set();
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
  if (matches) {
    matches.forEach(m => {
      const url = m.replace(/<\/?loc>/g, '');
      const pathname = new URL(url).pathname;
      sitemapUrls.add(pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    });
  }
}

const results = [];
const titles = new Set();
const descriptions = new Set();
const duplicateTitles = [];
const duplicateDescriptions = [];

walkDir(baseDir, (filePath) => {
  if (!filePath.endsWith('.html')) return;
  
  // Exclude error pages
  if (filePath.includes('_not-found') || filePath.includes('_global-error')) return;
  
  let relativePath = filePath.replace(baseDir, '').replace(/\\/g, '/').replace('.html', '');
  if (relativePath.endsWith('/index')) relativePath = relativePath.replace('/index', '');
  if (relativePath === '') relativePath = '/';
  
  // Categorize
  let category = 'public_indexable';
  const privatePrefixes = ['/admin', '/ops', '/client', '/partner', '/api', '/login', '/reset-password'];
  
  if (privatePrefixes.some(p => relativePath.startsWith(p))) {
    category = 'private_ignored';
  } else if (relativePath.includes('test') || relativePath.includes('dev')) {
    category = 'private_ignored';
  }
  
  if (category === 'private_ignored') return; // Ignore them completely
  
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);
  
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const canonical = $('link[rel="canonical"]').attr('href') || '';
  const h1 = $('h1').text().trim();
  
  // Next.js injects JSON-LD into self.__next_f.push scripts, so we check raw HTML
  const hasJsonLd = content.includes('application/ld+json') && content.includes('schema.org');
  const hasBreadcrumb = content.includes('BreadcrumbList');
  const hasFaqSchema = content.includes('FAQPage');
  
  const textContent = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = textContent.split(' ').length;
  
  const faqExists = content.toLowerCase().includes('faq') || content.toLowerCase().includes('frequently asked questions');
  
  if (title) {
    if (titles.has(title)) duplicateTitles.push({ url: relativePath, title });
    else titles.add(title);
  }
  
  if (description) {
    if (descriptions.has(description)) duplicateDescriptions.push({ url: relativePath, description });
    else descriptions.add(description);
  }
  
  results.push({
    url: relativePath,
    title,
    description,
    canonical,
    h1,
    hasJsonLd,
    hasBreadcrumb,
    hasFaqSchema,
    wordCount,
    faqExists,
    inSitemap: sitemapUrls.has(relativePath) || sitemapUrls.has(relativePath + '/')
  });
});

let report = `# SEO Public QA Report\n\n`;
report += `Total public pages scanned: ${results.length}\n\n`;

const missingCanonical = results.filter(r => !r.canonical);
report += `## Missing Canonical (${missingCanonical.length})\n`;
missingCanonical.forEach(r => report += `- ${r.url}\n`);

const missingDesc = results.filter(r => !r.description);
report += `\n## Missing Meta Description (${missingDesc.length})\n`;
missingDesc.forEach(r => report += `- ${r.url}\n`);

const missingH1 = results.filter(r => !r.h1);
report += `\n## Missing H1 (${missingH1.length})\n`;
missingH1.forEach(r => report += `- ${r.url}\n`);

const missingBreadcrumb = results.filter(r => !r.hasBreadcrumb && !r.url.includes('/compare') && !r.url.includes('/faqs'));
report += `\n## Missing BreadcrumbList Schema (${missingBreadcrumb.length})\n`;
missingBreadcrumb.slice(0, 15).forEach(r => report += `- ${r.url}\n`);
if (missingBreadcrumb.length > 15) report += `- ...and ${missingBreadcrumb.length - 15} more\n`;

const missingFaqSchema = results.filter(r => r.faqExists && !r.hasFaqSchema);
report += `\n## Missing FAQPage Schema (Where FAQ exists) (${missingFaqSchema.length})\n`;
missingFaqSchema.slice(0, 15).forEach(r => report += `- ${r.url}\n`);
if (missingFaqSchema.length > 15) report += `- ...and ${missingFaqSchema.length - 15} more\n`;

const thinContent = results.filter(r => r.wordCount < 300);
report += `\n## Thin Content (< 300 words) (${thinContent.length})\n`;
thinContent.slice(0, 15).forEach(r => report += `- ${r.url} (${r.wordCount} words)\n`);
if (thinContent.length > 15) report += `- ...and ${thinContent.length - 15} more\n`;

const missingJsonLd = results.filter(r => !r.hasJsonLd);
report += `\n## Completely Missing JSON-LD (${missingJsonLd.length})\n`;
missingJsonLd.slice(0, 15).forEach(r => report += `- ${r.url}\n`);
if (missingJsonLd.length > 15) report += `- ...and ${missingJsonLd.length - 15} more\n`;

const notInSitemap = results.filter(r => !r.inSitemap && !r.url.includes('offline') && !r.url.includes('disclaimer'));
report += `\n## Missing from Sitemap (${notInSitemap.length})\n`;
notInSitemap.slice(0, 20).forEach(r => report += `- ${r.url}\n`);
if (notInSitemap.length > 20) report += `- ...and ${notInSitemap.length - 20} more\n`;

fs.writeFileSync(path.join(__dirname, 'SEO_PUBLIC_QA_REPORT.md'), report);
console.log('Report generated at scripts/SEO_PUBLIC_QA_REPORT.md');
