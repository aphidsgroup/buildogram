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

    // Backend Math Verification & GST Logic
    const subtotal = Number(body.subtotal) || 0;
    const gstRate = Number(body.gst_rate) || 18;
    
    // Auto-calculate GST (assuming intra-state for standard Chennai business: CGST 9%, SGST 9%)
    // If IGST was explicitly provided, use that, else derive from rate.
    let cgst = Number(body.cgst) || 0;
    let sgst = Number(body.sgst) || 0;
    let igst = Number(body.igst) || 0;

    if (cgst === 0 && sgst === 0 && igst === 0 && subtotal > 0) {
      // Default to CGST + SGST split
      const halfRate = gstRate / 2;
      cgst = subtotal * (halfRate / 100);
      sgst = subtotal * (halfRate / 100);
    }

    const calculatedTax = cgst + sgst + igst;
    // tax_amount legacy support
    const tax = Number(body.tax_amount) || calculatedTax; 

    const discount = Number(body.discount_amount) || 0;
    const total = (subtotal + tax) - discount;
    const paid = Number(body.amount_paid) || 0;
    const due = Math.max(0, total - paid);
    
    const hsnSac = body.hsn_sac_code || '9954'; // Standard SAC for construction services
    
    // Auto status determination
    let autoStatus = body.status || 'draft';
    if (autoStatus !== 'draft' && autoStatus !== 'cancelled') {
      if (paid >= total && total > 0) autoStatus = 'paid';
      else if (paid > 0 && paid < total) autoStatus = 'partially_paid';
      else autoStatus = 'issued';
    }

    const metadata = { client_user_id: body.client_user_id || null };

    // Transaction to insert Invoice and Ledger entries
    const invoice = await sql.begin(async (tx) => {
      const [inv] = await tx`
        INSERT INTO invoice_records (
          invoice_number, revenue_record_id, source_type, source_id,
          customer_name, customer_phone, customer_email, billing_address,
          invoice_category, subtotal, tax_amount, discount_amount, total_amount,
          amount_paid, amount_due, status, issue_date, due_date, payment_mode, notes,
          metadata, created_by, cgst, sgst, igst, hsn_sac_code, gst_rate
        ) VALUES (
          ${invNumber}, ${body.revenue_record_id || null}, ${body.source_type || null}, ${body.source_id || null},
          ${body.customer_name}, ${body.customer_phone || null}, ${body.customer_email || null}, ${body.billing_address || null},
          ${body.invoice_category}, ${subtotal}, ${tax}, ${discount}, ${total},
          ${paid}, ${due}, ${autoStatus}, ${body.issue_date || new Date().toISOString().split('T')[0]}, 
          ${body.due_date || null}, ${body.payment_mode || null}, ${body.notes || null},
          ${metadata}, ${u.id}, ${cgst}, ${sgst}, ${igst}, ${hsnSac}, ${gstRate}
        )
        RETURNING *
      `;

      // 2. Insert into Accounting Ledger
      if (autoStatus !== 'draft' && autoStatus !== 'cancelled') {
        // Debit Accounts Receivable
        await tx`INSERT INTO accounting_ledger (reference_type, reference_id, account_name, debit, created_by, description)
                 VALUES ('invoice', ${inv.id}, 'Accounts Receivable', ${total}, ${u.id}, 'Invoice Issued: ' || ${invNumber})`;
        
        // Credit Revenue
        await tx`INSERT INTO accounting_ledger (reference_type, reference_id, account_name, credit, created_by, description)
                 VALUES ('invoice', ${inv.id}, 'Sales Revenue', ${subtotal - discount}, ${u.id}, 'Revenue for ' || ${invNumber})`;

        // Credit Tax Payables
        if (cgst > 0) await tx`INSERT INTO accounting_ledger (reference_type, reference_id, account_name, credit, created_by) VALUES ('invoice', ${inv.id}, 'CGST Payable', ${cgst}, ${u.id})`;
        if (sgst > 0) await tx`INSERT INTO accounting_ledger (reference_type, reference_id, account_name, credit, created_by) VALUES ('invoice', ${inv.id}, 'SGST Payable', ${sgst}, ${u.id})`;
        if (igst > 0) await tx`INSERT INTO accounting_ledger (reference_type, reference_id, account_name, credit, created_by) VALUES ('invoice', ${inv.id}, 'IGST Payable', ${igst}, ${u.id})`;
      }

      return inv;
    });

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error('Invoice POST Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
