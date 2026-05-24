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
        id, name, phone, email, lead_type, status, city, created_at,
        metadata->>'assigned_partner_name' as assigned_partner,
        metadata->>'public_status' as public_status,
        metadata->>'referral_status' as referral_status
      FROM leads 
      WHERE 1=1
    `;

    if (status && status !== 'all') query = sql`${query} AND status = ${status}`;
    if (type && type !== 'all') query = sql`${query} AND lead_type = ${type}`;

    query = sql`${query} ORDER BY created_at DESC`;

    const leads = await query;

    const headers = ['Lead ID', 'Name', 'Phone', 'Email', 'Lead Type', 'Status', 'City', 'Assigned Partner', 'Referral Status', 'Public Status', 'Created At'];
    
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.phone,
      l.email,
      l.lead_type,
      l.status,
      l.city,
      l.assigned_partner || '',
      l.referral_status || '',
      l.public_status || '',
      new Date(l.created_at).toLocaleString('en-IN')
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="leads_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
