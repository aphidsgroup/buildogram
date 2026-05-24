import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

const escapeCsv = (str) => {
  if (str === null || str === undefined) return '';
  const s = String(str).replace(/"/g, '""');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s}"`;
  }
  return s;
};

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'view_reports')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');

  try {
    let query = sql`
      SELECT 
        id, source_type, category, customer_name,
        expected_amount, received_amount,
        commission_expected, commission_received,
        status, received_date, created_at
      FROM revenue_records 
      WHERE 1=1
    `;

    if (status && status !== 'all') query = sql`${query} AND status = ${status}`;
    if (type && type !== 'all') query = sql`${query} AND category = ${type}`;

    query = sql`${query} ORDER BY created_at DESC`;

    const records = await query;

    const headers = ['Revenue ID', 'Source', 'Category', 'Customer', 'Expected Amount', 'Received Amount', 'Pending Amount', 'Expected Commission', 'Received Commission', 'Status', 'Received Date', 'Created Date'];
    
    const rows = records.map(r => {
      const pending = Number(r.expected_amount) - Number(r.received_amount || 0);
      return [
        r.id,
        r.source_type,
        r.category,
        r.customer_name,
        r.expected_amount,
        r.received_amount || 0,
        pending > 0 ? pending : 0,
        r.commission_expected || 0,
        r.commission_received || 0,
        r.status,
        r.received_date ? new Date(r.received_date).toLocaleString('en-IN') : '',
        new Date(r.created_at).toLocaleString('en-IN')
      ];
    });

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="revenue_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
