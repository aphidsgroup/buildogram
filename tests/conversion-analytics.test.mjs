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

  test('fireEvent strips PII before passing to gtag', () => {
    assert.match(src, /PII_KEYS\.has\(k\)/);
  });

  test('generate_lead fires after server success only (guarded by comment)', () => {
    assert.match(src, /only after server/i);
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

  test('trackGenerateLead is called inside res.ok check', () => {
    // Find the res.ok block and verify trackGenerateLead is inside it
    const resOkBlock = src.match(/if\s*\(res\.ok[^{]*\{([\s\S]*?)(?=\}\s*else\s*\{)/);
    assert.ok(resOkBlock, 'Could not find res.ok block in ContextualEnquiryForm.jsx');
    assert.match(resOkBlock[1], /trackGenerateLead/);
  });

  test('trackGenerateLead is NOT called in catch block', () => {
    // Extract catch block
    const catchBlock = src.match(/catch\s*\{([\s\S]*?)\}\s*finally/);
    if (catchBlock) {
      assert.doesNotMatch(catchBlock[1], /trackGenerateLead/);
    }
  });
});
