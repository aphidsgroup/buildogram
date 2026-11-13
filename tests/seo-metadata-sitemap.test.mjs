import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { generateSEOMetadata, SITE_URL } from '../src/lib/seo/metadata.js';
import robots from '../src/app/robots.js';

// schema.js imports via the '@/' alias; map it to src/ for node --test.
const srcUrl = pathToFileURL(path.resolve(import.meta.dirname, '..', 'src') + '/').href;
const resolveHook = `
export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@/')) {
    let url = new URL(specifier.slice(2), ${JSON.stringify(srcUrl)}).href;
    if (!/\\.(m?js|jsx)$/.test(url)) url += '.js';
    return next(url, context);
  }
  return next(specifier, context);
}`;
register('data:text/javascript,' + encodeURIComponent(resolveHook), import.meta.url);

const { generateWebSiteSchema } = await import('../src/lib/seo/schema.js');

test('metadata helper emits matching canonical and Open Graph URLs', () => {
  const metadata = generateSEOMetadata({
    title: 'BOQ Review Chennai',
    description: 'Review a construction BOQ.',
    path: '/boq-review-chennai',
  });

  const expected = `${SITE_URL}/boq-review-chennai`;
  assert.equal(metadata.alternates.canonical, expected);
  assert.equal(metadata.openGraph.url, expected);
  assert.equal(metadata.openGraph.images[0].url, `${SITE_URL}/og-image.jpg`);
  assert.equal(metadata.twitter.images[0].url, `${SITE_URL}/og-image.jpg`);
  assert.equal(metadata.robots.index, true);
});

test('metadata helper preserves the homepage canonical and noindex behavior', () => {
  const metadata = generateSEOMetadata({
    title: 'Private',
    description: 'Private page.',
    path: '/',
    noIndex: true,
  });

  assert.equal(metadata.alternates.canonical, SITE_URL);
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.robots.follow, false);
  assert.equal(metadata.robots.googleBot.index, false);
});

test('robots points to the production sitemap and blocks private route families', () => {
  const config = robots();
  assert.equal(config.host, SITE_URL);
  assert.equal(config.sitemap, `${SITE_URL}/sitemap.xml`);
  const defaultRule = config.rules.find(rule => rule.userAgent === '*');
  for (const route of ['/api/', '/ops/', '/client/', '/partner/', '/admin/']) {
    assert.ok(defaultRule.disallow.includes(route), `${route} must remain blocked`);
  }
});

test('sitemap source uses the production host and excludes known invalid URL families', () => {
  const source = fs.readFileSync('src/app/sitemap.js', 'utf8');
  assert.match(source, /const baseUrl = 'https:\/\/www\.buildogram\.in'/);
  assert.match(source, /new Set\(\)/, 'sitemap must retain URL deduplication');
  assert.doesNotMatch(source, /`https?:\/\/[^`]*vercel\.app/);
  assert.match(source, /!p\.slug\?\.startsWith\('demo-'\)/);
  assert.match(source, /m\.slug !== 'ready-mix-concrete'/);
});

test('WebSite schema keeps canonical identity and advertises no unsupported SearchAction', () => {
  const schema = generateWebSiteSchema();
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'WebSite');
  assert.equal(schema['@id'], `${SITE_URL}/#website`);
  assert.equal(schema.name, 'Buildogram');
  assert.equal(schema.url, SITE_URL);
  assert.equal('potentialAction' in schema, false, 'no /search route exists, so no SearchAction');
  assert.doesNotMatch(JSON.stringify(schema), /SearchAction|search_term_string|\/search\?/);
});

test('llms.txt does not claim an unsupported SearchAction', () => {
  const llms = fs.readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8');
  assert.match(llms, /^- WebSite schema \(root layout/m);
  assert.doesNotMatch(llms, /SearchAction/);
});
