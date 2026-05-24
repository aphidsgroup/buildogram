import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function PUT(req, { params }) {
  const { id } = params;
  const u = getUserFromRequest(req);
  
  if (!u || !roleCan(u.role, 'manage_invoices')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Backend Math Verification
    const subtotal = Number(body.subtotal) || 0;
    const tax = Number(body.tax_amount) || 0;
    const discount = Number(body.discount_amount) || 0;
    const total = (subtotal + tax) - discount;
    const paid = Number(body.amount_paid) || 0;
    const due = Math.max(0, total - paid);
    
    let autoStatus = body.status;
    if (autoStatus !== 'draft' && autoStatus !== 'cancelled') {
      if (paid >= total && total > 0) autoStatus = 'paid';
      else if (paid > 0 && paid < total) autoStatus = 'partially_paid';
      else autoStatus = 'issued';
    }

    const [invoice] = await sql`
      UPDATE invoice_records SET
        customer_name = ${body.customer_name},
        customer_phone = ${body.customer_phone || null},
        customer_email = ${body.customer_email || null},
        billing_address = ${body.billing_address || null},
        invoice_category = ${body.invoice_category},
        subtotal = ${subtotal},
        tax_amount = ${tax},
        discount_amount = ${discount},
        total_amount = ${total},
        amount_paid = ${paid},
        amount_due = ${due},
        status = ${autoStatus},
        issue_date = ${body.issue_date},
        due_date = ${body.due_date || null},
        payment_mode = ${body.payment_mode || null},
        notes = ${body.notes || null},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error('Invoice PUT Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
