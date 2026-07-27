import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
const root = path.resolve(import.meta.dirname, '..');

async function source(relative) {
  return readFile(path.join(root, relative), 'utf8');
}

test('JWT source has no fallback and verification rejects invalid or expired signatures', async () => {
  const auth = await source('src/lib/auth.js');
  assert.doesNotMatch(auth, /\|\|\s*['"][^'"]+['"]/);
  assert.match(auth, /if \(!secret \|\| !token\) return null/);
  assert.match(auth, /algorithms:\s*\['HS256'\]/);

  const secret = 'preview-test-secret-not-an-environment-value';
  const valid = jwt.sign({ id: 'preview-user' }, secret, { algorithm: 'HS256', expiresIn: '5m' });
  assert.equal(jwt.verify(valid, secret, { algorithms: ['HS256'] }).id, 'preview-user');
  assert.throws(() => jwt.verify(valid, 'wrong-secret', { algorithms: ['HS256'] }));
  const expired = jwt.sign({ id: 'preview-user', exp: 1 }, secret, { algorithm: 'HS256' });
  assert.throws(() => jwt.verify(expired, secret, { algorithms: ['HS256'] }));
});

test('disabled payment UI has no active checkout or Razorpay loader', async () => {
  const page = await source('src/app/client/invoices/[id]/page.js');
  const createOrder = await source('src/app/api/payments/create-order/route.js');
  assert.doesNotMatch(page, /Pay Now Securely|checkout\.razorpay\.com|new window\.Razorpay/);
  assert.match(page, /Online payment is not currently enabled/);
  assert.match(createOrder, /onlinePayments\.available/);
  assert.match(createOrder, /status:\s*503/);
});

test('provider AI, uploads, and WhatsApp automation fail with controlled disabled states', async () => {
  const ai = await source('src/app/api/ai/project-summary/route.js');
  const upload = await source('src/app/api/upload/route.js');
  const whatsapp = await source('src/app/api/ops/whatsapp/send/route.js');
  for (const contents of [ai, upload, whatsapp]) {
    assert.match(contents, /unavailableFeatureResponse/);
    assert.match(contents, /status:\s*503/);
  }
  const widget = await source('src/components/conversion/ContextualWhatsAppWidget.jsx');
  assert.match(widget, /getWhatsAppLink|wa\.me/);
});

test('disabled email and messaging fallbacks do not log PII payloads', async () => {
  const email = await source('src/lib/notifications/emailService.js');
  const whatsapp = await source('src/lib/notifications/whatsappService.js');
  const notifications = await source('src/lib/notifications/notificationService.js');
  assert.match(email, /EMAIL_DELIVERY_SKIPPED reason=feature_disabled/);
  assert.doesNotMatch(email, /console\.(?:log|info)\(`To:/);
  assert.doesNotMatch(whatsapp, /console\.(?:log|info)\(`To:/);
  assert.doesNotMatch(notifications, /console\.log\(data\)/);
});
