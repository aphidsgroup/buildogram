/**
 * tests/conversion-whatsapp-message.test.mjs
 * Regression: public WhatsApp CTAs must prefill route-specific text
 * (page / service / area / tool), not one generic message for every page.
 * Imports the real src/lib/conversion/context.js via an '@/' -> src/ resolve hook.
 * Run: node --test tests/conversion-whatsapp-message.test.mjs
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { register } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcUrl = pathToFileURL(path.join(root, 'src') + '/').href;

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

const { getConversionContext } = await import('../src/lib/conversion/context.js');
const { getWhatsAppLink } = await import('../src/lib/whatsapp.js');
const { GENERIC_WHATSAPP_MESSAGE, buildWhatsAppMessage, humanizeSlug } =
  await import('../src/lib/conversion/whatsapp-message.mjs');
const { BRAND } = await import('../src/lib/brand/positioning.js');

const OLD_GENERIC_ENCODED =
  'Hi%20Buildogram%2C%20I%20have%20a%20construction%20project%20in%20Chennai.%20Could%20you%20help%20me%20review%20my%20options%3F';

// Representative public routes -> text each message must mention
const ROUTES = {
  '/': 'construction project in Chennai',
  '/services/boq-review': 'BOQ Review',
  '/structural-audit-chennai': 'Structural Audit',
  '/boq-review-chennai': 'BOQ Review',
  '/peb-building-contractors-chennai': 'PEB Building Contractors in Chennai',
  '/locations/chennai/anna-nagar': 'Anna Nagar',
  '/locations/chennai/velachery/boq-review': 'BOQ Review in Velachery',
  '/boq-calculator': 'BOQ Calculator',
  '/ai-contractor-quote-analyzer': 'AI Contractor Quote Analyzer',
  '/guides/what-is-boq-in-construction': 'What is BOQ in Construction',
  '/materials/cement': 'Cement',
  '/compare/pmc-vs-turnkey-construction': 'PMC vs Turnkey Construction',
  '/partners/architects': 'Architects',
  '/how-it-works': 'how Buildogram works',
  '/contact': 'Contact',
};

function hrefFor(pathname) {
  return getWhatsAppLink(BRAND.phone, getConversionContext(pathname).whatsappMessage);
}

describe('route-aware WhatsApp message', () => {
  test('every representative route names its own page context and path', () => {
    for (const [pathname, expected] of Object.entries(ROUTES)) {
      const msg = getConversionContext(pathname).whatsappMessage;
      assert.ok(msg.startsWith('Hi Buildogram, '), `${pathname}: ${msg}`);
      assert.ok(msg.includes(expected), `${pathname} should mention "${expected}": ${msg}`);
      assert.ok(msg.endsWith(`Page: ${pathname}`), `${pathname} should cite its path: ${msg}`);
      assert.notEqual(msg, GENERIC_WHATSAPP_MESSAGE, `${pathname} fell back to generic text`);
    }
  });

  test('distinct routes produce distinct encoded wa.me text', () => {
    const hrefs = Object.keys(ROUTES).map(hrefFor);
    assert.equal(new Set(hrefs).size, hrefs.length, 'duplicate WhatsApp hrefs across routes');
    for (const href of hrefs) {
      assert.ok(href.startsWith('https://wa.me/919360232456?text='), href);
      assert.ok(!href.includes(OLD_GENERIC_ENCODED), `still the old generic text: ${href}`);
      const text = new URL(href).searchParams.get('text');
      assert.equal(href.split('?text=')[1], encodeURIComponent(text), 'text must be URI-encoded');
    }
  });

  test('encoding round-trips the exact message (apostrophes, quotes, ampersands)', () => {
    const msg = getConversionContext('/guides/what-is-boq-in-construction').whatsappMessage;
    assert.equal(new URL(hrefFor('/guides/what-is-boq-in-construction')).searchParams.get('text'), msg);
    assert.equal(new URL(getWhatsAppLink(BRAND.phone, 'A & B? #1 "x" it\'s')).searchParams.get('text'), 'A & B? #1 "x" it\'s');
  });

  test('phone always comes from BRAND.phone', () => {
    for (const pathname of Object.keys(ROUTES)) {
      assert.equal(getConversionContext(pathname)._phone, BRAND.phone);
    }
  });

  test('message is deterministic per pathname (SSR href === hydrated href)', () => {
    for (const pathname of Object.keys(ROUTES)) {
      assert.equal(getConversionContext(pathname).whatsappMessage, getConversionContext(pathname).whatsappMessage);
    }
  });

  test('analytics context fields are unchanged by the message work', () => {
    const svc = getConversionContext('/services/boq-review');
    assert.equal(svc.pageType, 'service');
    assert.equal(svc.serviceKey, 'boq-review');
    assert.equal(svc.serviceName, 'BOQ Review');
    const loc = getConversionContext('/locations/chennai/anna-nagar');
    assert.equal(loc.pageType, 'location-area');
    assert.equal(loc.locality, 'Anna Nagar');
    assert.equal(getConversionContext('/structural-audit-chennai').pageType, 'generic');
  });
});

describe('generic fallback', () => {
  test('missing pathname keeps the original generic message', () => {
    assert.equal(getConversionContext(null).whatsappMessage, GENERIC_WHATSAPP_MESSAGE);
    assert.equal(getConversionContext('').whatsappMessage, GENERIC_WHATSAPP_MESSAGE);
    assert.equal(buildWhatsAppMessage(null, undefined), GENERIC_WHATSAPP_MESSAGE);
    assert.equal(
      getWhatsAppLink(BRAND.phone, GENERIC_WHATSAPP_MESSAGE),
      `https://wa.me/919360232456?text=${OLD_GENERIC_ENCODED}`,
    );
  });

  test('excluded portal routes stay hidden and carry only the generic text', () => {
    for (const pathname of ['/client/projects', '/ops/leads', '/partner/leads', '/login']) {
      const ctx = getConversionContext(pathname);
      assert.equal(ctx.showWhatsApp, false, pathname);
      assert.equal(ctx.whatsappMessage, GENERIC_WHATSAPP_MESSAGE, pathname);
    }
  });

  test('humanizeSlug handles Chennai suffix and acronyms', () => {
    assert.equal(humanizeSlug('structural-audit-chennai'), 'Structural Audit in Chennai');
    assert.equal(humanizeSlug('construction-in-chennai'), 'Construction in Chennai');
    assert.equal(humanizeSlug('boq-review'), 'BOQ Review');
  });
});

describe('public CTA sources', () => {
  let widget, blog, calc;
  before(async () => {
    widget = await readFile(path.join(root, 'src/components/conversion/ContextualWhatsAppWidget.jsx'), 'utf8');
    blog = await readFile(path.join(root, 'src/app/blog/page.js'), 'utf8');
    calc = await readFile(path.join(root, 'src/app/boq-calculator/page.js'), 'utf8');
  });

  test('floating widget uses context.whatsappMessage, not window.location', () => {
    assert.match(widget, /context\.whatsappMessage/);
    assert.doesNotMatch(widget, /window\.location\.href/);
    assert.match(widget, /trackWhatsAppClick\(context/);
    assert.match(widget, /aria-label=\{ariaLabel\}/);
  });

  test('blog and BOQ calculator CTAs use BRAND.phone, no hard-coded wa.me numbers', () => {
    for (const src of [blog, calc]) {
      assert.doesNotMatch(src, /wa\.me\/\d/);
      assert.match(src, /getWhatsAppLink\(BRAND\.phone/);
    }
    // user-generated BOQ result text is preserved
    assert.match(calc, /Hi! I just generated a BOQ for my \$\{info\.floorConfig\} project/);
  });
});
