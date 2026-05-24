import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import Razorpay from 'razorpay';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { invoice_id } = await req.json();
    if (!invoice_id) return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 });

    // Fetch invoice and ensure it belongs to the user if they are a client
    let query = sql`SELECT * FROM invoice_records WHERE id = ${invoice_id}`;
    if (u.role === 'client') {
      query = sql`SELECT * FROM invoice_records WHERE id = ${invoice_id} AND metadata->>'client_user_id' = ${u.id}`;
    }
    const [invoice] = await query;
    if (!invoice) return NextResponse.json({ error: 'Invoice not found or access denied' }, { status: 404 });

    const amountDue = Number(invoice.amount_due);
    if (amountDue <= 0) return NextResponse.json({ error: 'Invoice already paid' }, { status: 400 });

    const provider = process.env.PAYMENT_PROVIDER || 'none';
    if (provider !== 'razorpay' || !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: 'Online payments are currently disabled' }, { status: 400 });
    }

    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order (amount in paise)
    const rzpOrder = await rzp.orders.create({
      amount: Math.round(amountDue * 100),
      currency: 'INR',
      receipt: `inv_${invoice.invoice_number}`,
    });

    // Store in DB
    const [paymentOrder] = await sql`
      INSERT INTO payment_orders (
        invoice_id, revenue_record_id, client_user_id, provider, provider_order_id, amount, status, created_by
      ) VALUES (
        ${invoice.id}, ${invoice.revenue_record_id}, ${invoice.metadata?.client_user_id || u.id}, 'razorpay', ${rzpOrder.id}, ${amountDue}, 'created', ${u.id}
      ) RETURNING *
    `;

    return NextResponse.json({
      success: true,
      order: paymentOrder,
      razorpay_order_id: rzpOrder.id,
      razorpay_key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (e) {
    console.error('Payment Create Order Error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
