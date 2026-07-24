/**
 * Unit tests for Razorpay signature verification.
 * Run: npm test  (node --test tests/)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { verifyPaymentSignature, verifyWebhookSignature } from '../src/lib/payments/signature.js';

const SECRET = 'test_secret_key';

function sign(payload, secret = SECRET) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

test('accepts a valid payment signature', () => {
  const orderId = 'order_ABC123';
  const paymentId = 'pay_XYZ789';
  const signature = sign(`${orderId}|${paymentId}`);
  assert.equal(verifyPaymentSignature({ orderId, paymentId, signature, secret: SECRET }), true);
});

test('rejects a tampered payment id', () => {
  const signature = sign('order_ABC123|pay_XYZ789');
  assert.equal(
    verifyPaymentSignature({ orderId: 'order_ABC123', paymentId: 'pay_FORGED', signature, secret: SECRET }),
    false
  );
});

test('rejects a signature made with the wrong secret', () => {
  const signature = sign('order_A|pay_B', 'attacker_secret');
  assert.equal(
    verifyPaymentSignature({ orderId: 'order_A', paymentId: 'pay_B', signature, secret: SECRET }),
    false
  );
});

test('rejects missing/empty inputs', () => {
  assert.equal(verifyPaymentSignature({ orderId: '', paymentId: 'p', signature: 's', secret: SECRET }), false);
  assert.equal(verifyPaymentSignature({ orderId: 'o', paymentId: 'p', signature: null, secret: SECRET }), false);
  assert.equal(verifyPaymentSignature({ orderId: 'o', paymentId: 'p', signature: 's', secret: undefined }), false);
});

test('rejects malformed (non-hex / wrong-length) signatures without throwing', () => {
  assert.equal(
    verifyPaymentSignature({ orderId: 'o', paymentId: 'p', signature: 'not-a-hex-signature', secret: SECRET }),
    false
  );
});

test('accepts a valid webhook signature over the raw body', () => {
  const rawBody = JSON.stringify({ event: 'payment.captured', payload: { payment: { entity: { id: 'pay_1' } } } });
  const signature = sign(rawBody);
  assert.equal(verifyWebhookSignature({ rawBody, signature, secret: SECRET }), true);
});

test('rejects a webhook body that was modified after signing', () => {
  const rawBody = JSON.stringify({ event: 'payment.captured', amount: 100 });
  const signature = sign(rawBody);
  const tampered = JSON.stringify({ event: 'payment.captured', amount: 999999 });
  assert.equal(verifyWebhookSignature({ rawBody: tampered, signature, secret: SECRET }), false);
});
