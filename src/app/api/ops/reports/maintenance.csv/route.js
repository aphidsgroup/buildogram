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

  try {
    const records = await sql`
      SELECT id, name, phone, status, metadata, created_at, updated_at
      FROM leads 
      WHERE lead_type = 'maintenance'
      ORDER BY created_at DESC
    `;

    const headers = [
      'Lead ID', 'Customer Name', 'Phone', 'Property Location', 'Linked Property', 
      'Issue Category', 'Urgency', 'Maintenance Status', 'Assigned Vendor', 
      'Estimated Cost', 'Final Cost', 'Passport Linked', 'Created Date', 'Last Updated Date'
    ];
    
    const rows = records.map(r => {
      const meta = r.metadata || {};
      const linkedProperty = meta.property_id ? 'Yes' : 'No';

      return [
        r.id,
        r.name,
        r.phone,
        meta.property_location || '',
        linkedProperty,
        meta.issue_category || '',
        meta.urgency || '',
        meta.maintenance_status || r.status,
        meta.assigned_vendor || '',
        meta.estimated_cost || '',
        meta.final_cost || '',
        meta.passport_linked ? 'Yes' : 'No',
        new Date(r.created_at).toLocaleString('en-IN'),
        new Date(r.updated_at).toLocaleString('en-IN')
      ];
    });

    const csvContent = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="maintenance_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
