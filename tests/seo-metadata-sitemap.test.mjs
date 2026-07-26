import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { generateSEOMetadata, SITE_URL } from '../src/lib/seo/metadata.js';
import robots from '../src/app/robots.js';

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
