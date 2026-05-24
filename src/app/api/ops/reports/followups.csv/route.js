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

  try {
    let query = sql`
      SELECT 
        a.id, a.title, a.description, a.follow_up_date, a.created_at,
        u.name as created_by_name,
        l.id as lead_id, l.name as lead_name, l.lead_type, l.status as lead_status
      FROM lead_activities a
      JOIN leads l ON a.lead_id = l.id
      LEFT JOIN users u ON a.created_by = u.id
      WHERE a.type = 'follow_up'
    `;

    if (status === 'overdue') query = sql`${query} AND a.follow_up_date < NOW()`;
    if (status === 'upcoming') query = sql`${query} AND a.follow_up_date >= NOW()`;

    query = sql`${query} ORDER BY a.follow_up_date ASC`;

    const activities = await query;

    const headers = ['Follow-up Title', 'Description', 'Due Date', 'Overdue', 'Lead Name', 'Lead Type', 'Lead Status', 'Lead ID', 'Created By', 'Created At'];
    
    const now = new Date();
    
    const rows = activities.map(a => {
      const dueDate = new Date(a.follow_up_date);
      const isOverdue = dueDate < now ? 'Yes' : 'No';

      return [
        a.title,
        a.description,
        dueDate.toLocaleString('en-IN'),
        isOverdue,
        a.lead_name,
        a.lead_type,
        a.lead_status,
        a.lead_id,
        a.created_by_name || 'System',
        new Date(a.created_at).toLocaleString('en-IN')
      ];
    });

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="followups_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
