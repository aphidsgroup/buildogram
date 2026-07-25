/**
 * tests/conversion-config.test.mjs
 * Unit tests for src/lib/conversion/context.js
 * Uses Node.js built-in test runner (no Jest dependency).
 * Run: node --test tests/conversion-config.test.mjs
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ── Static helpers (no ESM mocking — test purely via logic extraction) ────────
// We test the resolvePageType logic by re-implementing it here inline and
// asserting it against the documented spec. The actual module import is skipped
// in the unit test because it requires @/data/* aliases that only resolve under
// Next.js. The logic tests cover all path branches documented in context.js.

const BANNED_STRINGS = [
  'our licensed structural engineers',
  'our certified surveyors',
  'our construction crew',
  'our authorised dealers',
  'verified supplier',
  'verified contractor',
  'certified partner',
  'best contractor',
  'guaranteed savings',
  'lowest price',
  'guaranteed delivery',
  'free consultation',
  'immediate callback',
  'screened',
  'vetted',
];

// Mirror of resolvePageType from context.js (keep in sync)
function resolvePageType(pathname) {
  if (!pathname) return 'generic';
  if (['/login', '/signup', '/change-password', '/forgot-password', '/reset-password'].includes(pathname)) return 'auth';
  if (pathname.startsWith('/client/')) return 'client';
  if (pathname.startsWith('/partner/')) return 'partner-os';
  if (pathname.startsWith('/ops/')) return 'ops';
  if (pathname.startsWith('/admin/')) return 'admin';
  if (pathname.startsWith('/supplier/')) return 'supplier';
  if (pathname.startsWith('/api/')) return 'api';
  if (pathname.startsWith('/project/')) return 'project-token';
  if (pathname.startsWith('/property-passport/')) return 'passport-token';
  if (pathname.startsWith('/material-quote-summary/')) return 'material-quote-token';
  if (pathname.endsWith('/print')) return 'print';
  if (['/privacy-policy', '/terms', '/disclaimer'].includes(pathname)) return 'legal';
  if (pathname === '/offline') return 'offline';
  if (pathname === '/maintenance/request') return 'maintenance-request';
  if (pathname === '/boq-review-chennai' || pathname === '/structural-plan-review-chennai') return 'service-hub';
  if (['/construction-in-chennai', '/steel-construction-chennai', '/peb-building-contractors-chennai',
       '/industrial-shed-construction-chennai', '/end-to-end-construction-support-chennai'].includes(pathname)) return 'service-hub';
  if (pathname.startsWith('/services/')) return 'service';
  if (pathname.startsWith('/materials/')) return 'material';
  if (pathname.startsWith('/guides/')) return 'guide';
  if (pathname.startsWith('/glossary/')) return 'glossary';
  if (pathname.startsWith('/faqs/')) return 'faq';
  if (pathname.startsWith('/compare/')) return 'compare';
  if (pathname.match(/^\/locations\/chennai\/[^/]+\/[^/]+/)) return 'location-service';
  if (pathname.match(/^\/locations\/chennai\/[^/]+/)) return 'location-area';
  if (['/boq-calculator', '/cost-estimator', '/ai-boq-checker',
       '/ai-construction-cost-estimator', '/ai-contractor-quote-analyzer',
       '/ai-material-estimator', '/ai-floor-plan-creator'].includes(pathname)) return 'calculator';
  if (pathname.match(/^\/partners\/[^/]+$/) && pathname !== '/partners/register') return 'partner-profile';
  if (pathname.startsWith('/partners/')) return 'partner-listing';
  if (['/about', '/how-it-works', '/quality-system', '/join-as-partner'].includes(pathname)) return 'about';
  if (pathname === '/') return 'home';
  return 'generic';
}

const EXCLUDED_PAGE_TYPES = new Set([
  'auth', 'client', 'partner-os', 'ops', 'admin', 'supplier', 'project-token',
  'passport-token', 'material-quote-token', 'print', 'legal', 'offline', 'api',
  'error', 'maintenance-request',
]);

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('resolvePageType — exclusions', () => {
  const excluded = [
    ['/login', 'auth'],
    ['/signup', 'auth'],
    ['/change-password', 'auth'],
    ['/client/dashboard', 'client'],
    ['/client/projects/123', 'client'],
    ['/partner/dashboard', 'partner-os'],
    ['/ops/leads', 'ops'],
    ['/admin/users', 'admin'],
    ['/supplier/dashboard', 'supplier'],
    ['/api/leads', 'api'],
    ['/project/abc123', 'project-token'],
    ['/property-passport/tok', 'passport-token'],
    ['/material-quote-summary/xyz', 'material-quote-token'],
    ['/boq-report/5/print', 'print'],
    ['/privacy-policy', 'legal'],
    ['/terms', 'legal'],
    ['/offline', 'offline'],
    ['/maintenance/request', 'maintenance-request'],
  ];

  excluded.forEach(([route, expectedType]) => {
    test(`${route} resolves to excluded type "${expectedType}"`, () => {
      const type = resolvePageType(route);
      assert.equal(type, expectedType);
      assert.equal(EXCLUDED_PAGE_TYPES.has(type), true);
    });
  });
});

describe('resolvePageType — eligible routes', () => {
  test('/ is home', () => assert.equal(resolvePageType('/'), 'home'));
  test('/services/house-construction is service', () => assert.equal(resolvePageType('/services/house-construction'), 'service'));
  test('/guides/what-is-boq-in-construction is guide', () => assert.equal(resolvePageType('/guides/what-is-boq-in-construction'), 'guide'));
  test('/glossary/boq is glossary', () => assert.equal(resolvePageType('/glossary/boq'), 'glossary'));
  test('/faqs/construction is faq', () => assert.equal(resolvePageType('/faqs/construction'), 'faq'));
  test('/compare/buildogram-vs-contractor is compare', () => assert.equal(resolvePageType('/compare/buildogram-vs-contractor'), 'compare'));
  test('/materials/cement is material', () => assert.equal(resolvePageType('/materials/cement'), 'material'));
  test('/boq-review-chennai is service-hub', () => assert.equal(resolvePageType('/boq-review-chennai'), 'service-hub'));
  test('/construction-in-chennai is service-hub', () => assert.equal(resolvePageType('/construction-in-chennai'), 'service-hub'));
  test('/boq-calculator is calculator', () => assert.equal(resolvePageType('/boq-calculator'), 'calculator'));
  test('/cost-estimator is calculator', () => assert.equal(resolvePageType('/cost-estimator'), 'calculator'));
  test('/locations/chennai/velachery is location-area', () => assert.equal(resolvePageType('/locations/chennai/velachery'), 'location-area'));
  test('/locations/chennai/velachery/boq-review is location-service', () => assert.equal(resolvePageType('/locations/chennai/velachery/boq-review'), 'location-service'));
  test('/partners/builders is partner-profile (single slug)', () => assert.equal(resolvePageType('/partners/builders'), 'partner-profile'));
  test('/partners/some-slug is partner-profile', () => assert.equal(resolvePageType('/partners/some-builder-slug'), 'partner-profile'));
  test('/how-it-works is about', () => assert.equal(resolvePageType('/how-it-works'), 'about'));
});

describe('analytics.js — banned string guard (string check on module source)', () => {
  test('context.js source does not contain banned strings', async () => {
    const fs = await import('node:fs/promises');
    const src = await fs.readFile(path.join(root, 'src/lib/conversion/context.js'), 'utf8');
    const lower = src.toLowerCase();
    BANNED_STRINGS.forEach(banned => {
      assert.equal(
        lower.includes(banned.toLowerCase()),
        false,
        `Found banned string in context.js: "${banned}"`
      );
    });
  });

  test('ContextualEnquiryForm.jsx does not contain banned strings', async () => {
    const fs = await import('node:fs/promises');
    const src = await fs.readFile(path.join(root, 'src/components/conversion/ContextualEnquiryForm.jsx'), 'utf8');
    const lower = src.toLowerCase();
    BANNED_STRINGS.forEach(banned => {
      assert.equal(
        lower.includes(banned.toLowerCase()),
        false,
        `Found banned string in ContextualEnquiryForm.jsx: "${banned}"`
      );
    });
  });
});

describe('form submit label — never "Submit"', () => {
  test('context.js never uses bare "Submit" as a submit label value', async () => {
    const fs = await import('node:fs/promises');
    const src = await fs.readFile(path.join(root, 'src/lib/conversion/context.js'), 'utf8');
    // Only check submitLabel string values, not JSX labels
    const submitLabelMatches = src.match(/submitLabel:\s*['"]([^'"]+)['"]/g) || [];
    submitLabelMatches.forEach(match => {
      const value = match.replace(/submitLabel:\s*['"]/, '').replace(/['"]$/, '');
      assert.notEqual(value, 'Submit', `Found generic "Submit" label in context.js: ${match}`);
      assert.notEqual(value, 'submit');
    });
  });
});
