import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || (!roleCan(u.role, 'manage_revenue') && !roleCan(u.role, 'manage_invoices'))) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const ledger = await sql`
      SELECT l.*, u.name as created_by_name
      FROM accounting_ledger l
      LEFT JOIN users u ON l.created_by = u.id
      ORDER BY l.transaction_date ASC
    `;

    // Headers mapped for standard CSV (Tally/Zoho compatible layout)
    const header = ['Transaction Date', 'Reference Type', 'Account Name', 'Debit', 'Credit', 'Description', 'Created By'].join(',');
    
    const rows = ledger.map(l => {
      const d = new Date(l.transaction_date).toISOString().split('T')[0];
      const desc = `"${(l.description || '').replace(/"/g, '""')}"`;
      return [
        d,
        l.reference_type,
        `"${l.account_name}"`,
        l.debit,
        l.credit,
        desc,
        `"${l.created_by_name || 'System'}"`
      ].join(',');
    });

    const csvContent = [header, ...rows].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="buildogram_ledger_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('Accounting Ledger Export Error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
