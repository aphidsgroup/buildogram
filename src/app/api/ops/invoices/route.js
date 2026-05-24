import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_invoices')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';

    let query = sql`
      SELECT i.*, u.name as created_by_name
      FROM invoice_records i
      LEFT JOIN users u ON i.created_by = u.id
      WHERE 1=1
    `;
    
    if (status !== 'all') {
      query = sql`${query} AND i.status = ${status}`;
    }

    query = sql`${query} ORDER BY i.created_at DESC LIMIT 100`;

    const records = await query;

    const [totals] = await sql`
      SELECT 
        SUM(total_amount) as total_invoiced,
        SUM(amount_paid) as total_paid,
        SUM(amount_due) as total_due
      FROM invoice_records
      WHERE status != 'cancelled'
    `;

    return NextResponse.json({ success: true, records, totals });
  } catch (error) {
    console.error('Invoice GET Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_invoices')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Auto generate invoice number INV-BG-{timestamp}
    const invNumber = `INV-BG-${Date.now().toString().slice(-6)}`;

    // Backend Math Verification
    const subtotal = Number(body.subtotal) || 0;
    const tax = Number(body.tax_amount) || 0;
    const discount = Number(body.discount_amount) || 0;
    const total = (subtotal + tax) - discount;
    const paid = Number(body.amount_paid) || 0;
    const due = Math.max(0, total - paid);
    
    // Auto status determination if draft not explicitly chosen
    let autoStatus = body.status || 'draft';
    if (autoStatus !== 'draft' && autoStatus !== 'cancelled') {
      if (paid >= total && total > 0) autoStatus = 'paid';
      else if (paid > 0 && paid < total) autoStatus = 'partially_paid';
      else autoStatus = 'issued';
    }

    const metadata = { client_user_id: body.client_user_id || null };

    const [invoice] = await sql`
      INSERT INTO invoice_records (
        invoice_number, revenue_record_id, source_type, source_id,
        customer_name, customer_phone, customer_email, billing_address,
        invoice_category, subtotal, tax_amount, discount_amount, total_amount,
        amount_paid, amount_due, status, issue_date, due_date, payment_mode, notes,
        metadata, created_by
      ) VALUES (
        ${invNumber}, ${body.revenue_record_id || null}, ${body.source_type || null}, ${body.source_id || null},
        ${body.customer_name}, ${body.customer_phone || null}, ${body.customer_email || null}, ${body.billing_address || null},
        ${body.invoice_category}, ${subtotal}, ${tax}, ${discount}, ${total},
        ${paid}, ${due}, ${autoStatus}, ${body.issue_date || new Date().toISOString().split('T')[0]}, 
        ${body.due_date || null}, ${body.payment_mode || null}, ${body.notes || null},
        ${metadata}, ${u.id}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error('Invoice POST Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
