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
      WHERE lead_type = 'material_quote'
      ORDER BY created_at DESC
    `;

    const headers = [
      'Lead ID', 'Customer Name', 'Phone', 'Customer Type', 'Delivery Location', 
      'Required Date', 'GST Required', 'Material Categories', 'Quote Status', 
      'Estimated Order Value', 'Expected Commission', 'Commission Status', 
      'Created Date', 'Last Updated Date'
    ];
    
    const rows = records.map(r => {
      const meta = r.metadata || {};

      let catStr = '';
      if (Array.isArray(meta.material_categories)) {
        catStr = meta.material_categories.join('; ');
      } else if (meta.material_category) {
        catStr = meta.material_category;
      }

      return [
        r.id,
        r.name,
        r.phone,
        meta.customer_type || '',
        meta.delivery_location || '',
        meta.required_date || '',
        meta.gst_required ? 'Yes' : 'No',
        catStr,
        meta.quote_status || r.status,
        meta.estimated_order_value || '',
        meta.expected_commission || '',
        meta.commission_status || '',
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
        'Content-Disposition': 'attachment; filename="materials_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
