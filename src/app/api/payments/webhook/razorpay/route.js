import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { triggerNotificationEvent } from '@/lib/notifications';
import { settlePayment } from '@/lib/payments/settlePayment';

function signaturesMatch(expected, received) {
  if (!received || expected.length !== received.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected, 'utf8'), Buffer.from(received, 'utf8'));
}

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret || !signature) {
      return NextResponse.json({ error: 'Webhook unavailable' }, { status: 503 });
    }

    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (!signaturesMatch(expected, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    if (event.event !== 'payment.captured') return NextResponse.json({ status: 'ignored' });
    const payment = event.payload?.payment?.entity;
    if (!payment?.order_id || !payment?.id) {
      return NextResponse.json({ error: 'Invalid event payload' }, { status: 400 });
    }

    const result = await settlePayment({
      providerOrderId: payment.order_id,
      providerPaymentId: payment.id,
      gatewayResponse: payment,
    });
    if (result.status === 'conflict') return NextResponse.json({ error: 'Payment conflict' }, { status: 409 });
    if (result.status === 'settled') {
      await triggerNotificationEvent({
        eventName: 'payment_success',
        userId: result.order.client_user_id,
        metadata: { invoice_number: result.invoice.invoice_number, amount: result.order.amount },
      });
    }
    return NextResponse.json({ status: result.status });
  } catch (error) {
    console.error('Razorpay webhook failed:', error?.name || 'unknown_error');
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
