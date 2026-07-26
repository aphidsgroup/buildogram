/**
 * tests/conversion-analytics.test.mjs
 * Asserts: no PII in GA4 events, generate_lead fires correct event name.
 * Uses Node.js built-in test runner — no Jest dependency.
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  sanitizeAnalyticsParams,
  trackGenerateLead,
} from '../src/lib/conversion/analytics.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const PII_KEYS = ['name', 'phone', 'email', 'message', 'address', 'full_name'];

describe('analytics.js source — PII key guard', () => {
  let src;
  before(async () => {
    src = await readFile(path.join(root, 'src/lib/conversion/analytics.js'), 'utf8');
  });

  test('PII_KEYS set is defined in source', () => {
    assert.match(src, /PII_KEYS/);
  });

  test('all PII keys are declared in PII_KEYS set', () => {
    PII_KEYS.forEach(key => {
      assert.match(src, new RegExp(`['"]${key}['"]`), `PII key "${key}" not found in PII_KEYS declaration`);
    });
  });

  test('fireEvent routes parameters through the strict allowlist', () => {
    assert.match(src, /sanitizeAnalyticsParams\(params\)/);
  });

  test('generate_lead is documented as newly persisted only', () => {
    assert.match(src, /newly persisted lead/i);
  });
});

describe('analytics runtime boundary', () => {
  test('keeps approved context and drops PII, unknown fields and complex values', () => {
    assert.deepEqual(
      sanitizeAnalyticsParams({
        page_type: 'service',
        service_key: 'boq-review',
        name: 'Private Person',
        phone: '+91 90000 00000',
        enquiry_text: 'Private project details',
        address: 'Private address',
        nested: { email: 'private@example.com' },
      }),
      {
        page_type: 'service',
        service_key: 'boq-review',
      },
    );
  });

  test('generate_lead emits context only and never includes a lead identifier', () => {
    const calls = [];
    global.window = { gtag: (...args) => calls.push(args) };
    try {
      trackGenerateLead(
        {
          pageType: 'service',
          serviceKey: 'boq-review',
          serviceName: 'BOQ Review',
          locality: 'chennai',
          contextualQuestion: { key: 'project_stage' },
        },
        { placement: 'inline', leadId: 'private-record-id' },
      );
    } finally {
      delete global.window;
    }

    assert.equal(calls.length, 1);
    assert.deepEqual(calls[0], [
      'event',
      'generate_lead',
      {
        page_type: 'service',
        service_key: 'boq-review',
        service_name: 'BOQ Review',
        locality: 'chennai',
        cta_placement: 'inline',
        form_question_key: 'project_stage',
      },
    ]);
  });
});

describe('analytics.js source — event name constants', () => {
  let src;
  before(async () => {
    src = await readFile(path.join(root, 'src/lib/conversion/analytics.js'), 'utf8');
  });

  const expectedEvents = [
    'whatsapp_widget_view',
    'whatsapp_tooltip_shown',
    'whatsapp_tooltip_closed',
    'whatsapp_click',
    'lead_form_view',
    'lead_form_start',
    'lead_form_validation_error',
    'generate_lead',
    'lead_form_failure',
    'phone_click',
  ];

  expectedEvents.forEach(eventName => {
    test(`event "${eventName}" is defined`, () => {
      assert.match(src, new RegExp(`['"]${eventName}['"]`), `Event "${eventName}" not found in analytics.js`);
    });
  });
});

describe('analytics.js source — never passes raw value fields', () => {
  let src;
  before(async () => {
    src = await readFile(path.join(root, 'src/lib/conversion/analytics.js'), 'utf8');
  });

  test('does not pass phone: to gtag', () => {
    // phone: should not appear as a gtag param key in event calls
    const piiPassthrough = /fireEvent\([^)]*,\s*\{[^}]*\bphone\s*:/;
    assert.doesNotMatch(src, piiPassthrough);
  });

  test('does not pass email: to gtag', () => {
    const piiPassthrough = /fireEvent\([^)]*,\s*\{[^}]*\bemail\s*:/;
    assert.doesNotMatch(src, piiPassthrough);
  });

  test('does not pass name: to gtag', () => {
    const piiPassthrough = /fireEvent\([^)]*,\s*\{[^}]*\bname\s*:/;
    assert.doesNotMatch(src, piiPassthrough);
  });
});

describe('ContextualEnquiryForm — generate_lead only on server success', () => {
  let src;
  before(async () => {
    src = await readFile(path.join(root, 'src/components/conversion/ContextualEnquiryForm.jsx'), 'utf8');
  });

  test('trackGenerateLead is guarded by the persisted-creation response contract', () => {
    const createdBlock = src.match(
      /if\s*\(res\.ok\s*&&\s*isCreatedLeadResponse\(json\)\)\s*\{([\s\S]*?)(?=\}\s*else if)/,
    );
    assert.ok(createdBlock, 'Could not find persisted-creation guard');
    assert.match(createdBlock[1], /trackGenerateLead/);
  });

  test('duplicate response does not emit generate_lead', () => {
    const duplicateBlock = src.match(
      /else if\s*\(res\.ok\s*&&\s*isDuplicateLeadResponse\(json\)\)\s*\{([\s\S]*?)(?=\}\s*else)/,
    );
    assert.ok(duplicateBlock, 'Could not find duplicate-response branch');
    assert.doesNotMatch(duplicateBlock[1], /trackGenerateLead/);
  });

  test('trackGenerateLead is NOT called in catch block', () => {
    // Extract catch block
    const catchBlock = src.match(/catch\s*\{([\s\S]*?)\}\s*finally/);
    if (catchBlock) {
      assert.doesNotMatch(catchBlock[1], /trackGenerateLead/);
    }
  });
});

describe('site analytics bootstrap and legacy service', () => {
  test('root layout conditionally includes one GA loader and one initializer', async () => {
    const layout = await readFile(path.join(root, 'src/app/layout.js'), 'utf8');
    assert.equal((layout.match(/googletagmanager\.com\/gtag\/js/g) || []).length, 1);
    assert.equal((layout.match(/gtag\('config'/g) || []).length, 1);
    assert.match(layout, /process\.env\.NEXT_PUBLIC_GA_ID\s*&&/);
  });

  test('legacy analytics service sanitizes both GA and Meta event payloads', async () => {
    const service = await readFile(path.join(root, 'src/lib/analyticsService.js'), 'utf8');
    assert.match(service, /sanitizeAnalyticsParams\(data\)/);
    assert.doesNotMatch(service, /gtag\('event',\s*eventName,\s*data\)/);
    assert.doesNotMatch(service, /trackCustom',\s*eventName,\s*data\)/);
    assert.match(service, /url\.split\(\/\[\?#\]\//);
  });
});
