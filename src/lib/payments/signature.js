/**
 * Razorpay signature verification — pure functions, no DB, no side effects.
 * Used by /api/payments/verify and /api/payments/webhook/razorpay.
 */
import crypto from 'crypto';

/** Timing-safe hex digest comparison. */
function safeEqualHex(expectedHex, providedHex) {
  if (typeof providedHex !== 'string' || providedHex.length !== expectedHex.length) {
    return false;
  }
  try {
    return crypto.timingSafeEqual(Buffer.from(expectedHex, 'hex'), Buffer.from(providedHex, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Verify a Razorpay Checkout payment signature.
 * signature = HMAC-SHA256(order_id + "|" + payment_id, key_secret)
 */
export function verifyPaymentSignature({ orderId, paymentId, signature, secret }) {
  if (!orderId || !paymentId || !signature || !secret) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(orderId + '|' + paymentId)
    .digest('hex');
  return safeEqualHex(expected, signature);
}

/**
 * Verify a Razorpay webhook signature.
 * signature = HMAC-SHA256(rawBody, webhook_secret)
 */
export function verifyWebhookSignature({ rawBody, signature, secret }) {
  if (!rawBody || !signature || !secret) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return safeEqualHex(expected, signature);
}
