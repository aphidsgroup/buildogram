import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sql from '@/lib/db';
import { triggerNotificationEvent } from '@/lib/notifications';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { isOpsRole } from '@/lib/roles';
import { settlePayment } from '@/lib/payments/settlePayment';

function signaturesMatch(expected, received) {
  if (!received || expected.length !== received.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(received, 'utf8'));
}

export async function POST(req) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Incomplete payment response' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 });
    const expected = crypto.createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
    if (!signaturesMatch(expected, razorpay_signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const [ownedOrder] = await sql`
      SELECT id FROM payment_orders
      WHERE provider_order_id = ${razorpay_order_id}
        AND (${isOpsRole(user.role)} = true OR client_user_id = ${user.id})
      LIMIT 1
    `;
    if (!ownedOrder) return NextResponse.json({ error: 'Payment order not found' }, { status: 404 });

    const result = await settlePayment({
      providerOrderId: razorpay_order_id,
      providerPaymentId: razorpay_payment_id,
    });
    if (result.status === 'not_found') return NextResponse.json({ error: 'Payment order not found' }, { status: 404 });
    if (result.status === 'conflict') return NextResponse.json({ error: 'Payment conflict' }, { status: 409 });

    if (result.status === 'settled') {
      await triggerNotificationEvent({
        eventName: 'payment_success',
        userId: result.order.client_user_id,
        metadata: { invoice_number: result.invoice.invoice_number, amount: result.order.amount },
      });
    }
    return NextResponse.json({ success: true, status: result.status, invoice: result.invoice.invoice_number });
  } catch (error) {
    console.error('Payment verification failed:', error?.name || 'unknown_error');
    return NextResponse.json({ error: 'Unable to verify payment' }, { status: 500 });
  }
}
