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

const maskPhone = (phone) => {
  if (!phone) return '';
  const str = String(phone);
  if (str.length < 10) return str;
  return str.substring(0, 4) + '****' + str.substring(str.length - 3);
};

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'view_reports')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  try {
    let query = sql`
      SELECT 
        q.id, q.event_type, q.channel, q.status, q.recipient_name, q.recipient_phone,
        t.template_name, q.error_message, q.created_at, q.sent_at
      FROM notification_queue q
      LEFT JOIN whatsapp_templates t ON q.template_id = t.id
      WHERE 1=1
    `;

    if (status && status !== 'all') {
      query = sql`${query} AND q.status = ${status}`;
    }

    query = sql`${query} ORDER BY q.created_at DESC LIMIT 500`;

    const records = await query;

    const headers = ['Queue ID', 'Event Type', 'Channel', 'Status', 'Recipient Name', 'Masked Phone', 'Template', 'Created At', 'Sent At', 'Error Reason'];
    
    const rows = records.map(r => [
      r.id,
      r.event_type,
      r.channel,
      r.status,
      r.recipient_name || '',
      maskPhone(r.recipient_phone),
      r.template_name || '',
      new Date(r.created_at).toLocaleString('en-IN'),
      r.sent_at ? new Date(r.sent_at).toLocaleString('en-IN') : '',
      r.error_message || ''
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="notification_delivery_log.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
