import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  // Ideally a 'view_finance' or 'admin' role
  if (!u || (!roleCan(u.role, 'manage_revenue') && !roleCan(u.role, 'manage_invoices'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const account = searchParams.get('account') || 'all';

    let query = sql`
      SELECT l.*, u.name as created_by_name
      FROM accounting_ledger l
      LEFT JOIN users u ON l.created_by = u.id
      WHERE 1=1
    `;

    if (account !== 'all') {
      query = sql`${query} AND l.account_name = ${account}`;
    }

    query = sql`${query} ORDER BY l.transaction_date DESC LIMIT ${limit}`;
    const ledger = await query;

    // Fetch summary balances
    const [balances] = await sql`
      SELECT 
        SUM(debit) as total_debits,
        SUM(credit) as total_credits
      FROM accounting_ledger
    `;

    // Fetch GST specific summary
    const [gstSummary] = await sql`
      SELECT
        SUM(CASE WHEN account_name = 'CGST Payable' THEN credit ELSE 0 END) as total_cgst,
        SUM(CASE WHEN account_name = 'SGST Payable' THEN credit ELSE 0 END) as total_sgst,
        SUM(CASE WHEN account_name = 'IGST Payable' THEN credit ELSE 0 END) as total_igst
      FROM accounting_ledger
    `;

    return NextResponse.json({ success: true, ledger, balances, gstSummary });
  } catch (error) {
    console.error('Accounting Ledger GET Error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
