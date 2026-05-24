import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sql from '@/lib/db';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ error: 'Webhook misconfigured or missing signature' }, { status: 400 });
    }

    const expectedSignature = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle payment.captured
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const rzpOrderId = payment.order_id;
      
      const [order] = await sql`
        UPDATE payment_orders
        SET status = 'paid', provider_payment_id = ${payment.id}, verified = true, paid_at = NOW(), gateway_response = ${JSON.stringify(payment)}
        WHERE provider_order_id = ${rzpOrderId} AND status != 'paid'
        RETURNING *
      `;

      if (order) {
        await sql`
          UPDATE invoice_records
          SET amount_paid = amount_paid + ${order.amount},
              amount_due = GREATEST(0, amount_due - ${order.amount}),
              status = CASE WHEN (amount_paid + ${order.amount}) >= total_amount THEN 'paid' ELSE 'partially_paid' END
          WHERE id = ${order.invoice_id}
        `;
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (e) {
    console.error('Razorpay Webhook Error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
