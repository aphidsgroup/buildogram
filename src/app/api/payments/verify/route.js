import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import crypto from 'crypto';
import { triggerNotificationEvent } from '@/lib/notifications';
export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Verified! Update DB
    const [order] = await sql`
      UPDATE payment_orders
      SET status = 'paid', provider_payment_id = ${razorpay_payment_id}, verified = true, paid_at = NOW()
      WHERE provider_order_id = ${razorpay_order_id} AND status != 'paid'
      RETURNING *
    `;

    if (!order) {
      return NextResponse.json({ error: 'Order not found or already paid' }, { status: 400 });
    }

    // Update invoice
    const [invoice] = await sql`
      UPDATE invoice_records
      SET amount_paid = amount_paid + ${order.amount},
          amount_due = GREATEST(0, amount_due - ${order.amount}),
          status = CASE WHEN (amount_paid + ${order.amount}) >= total_amount THEN 'paid' ELSE 'partially_paid' END
      WHERE id = ${order.invoice_id}
      RETURNING *
    `;

    // Log activity
    await sql`
      INSERT INTO progress_logs (project_id, log_type, notes, created_by)
      VALUES (
        (SELECT source_id FROM invoice_records WHERE id = ${order.invoice_id} LIMIT 1),
        'payment_received',
        ${`Online payment of ₹${order.amount} received via Razorpay for Invoice ${invoice.invoice_number}`},
        ${order.client_user_id}
      )
    `;

    // Insert Accounting Ledger (Debit Bank, Credit A/R)
    await sql`
      INSERT INTO accounting_ledger (reference_type, reference_id, account_name, debit, created_by, description)
      VALUES ('payment', ${order.id}, 'Bank Account (Razorpay)', ${order.amount}, ${order.client_user_id}, 'Payment for ' || ${invoice.invoice_number})
    `;
    await sql`
      INSERT INTO accounting_ledger (reference_type, reference_id, account_name, credit, created_by, description)
      VALUES ('payment', ${order.id}, 'Accounts Receivable', ${order.amount}, ${order.client_user_id}, 'Payment for ' || ${invoice.invoice_number})
    `;

    // Trigger WhatsApp Automation Queue
    await triggerNotificationEvent({
      eventName: 'payment_success',
      userId: order.client_user_id,
      metadata: { invoice_number: invoice.invoice_number, amount: order.amount }
    });

    return NextResponse.json({ success: true, order });
  } catch (e) {
    console.error('Payment Verify Error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
