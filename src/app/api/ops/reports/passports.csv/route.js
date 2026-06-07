import { requirePermission } from '@/lib/auth/permissions';
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
      SELECT 
        p.id as property_id, p.title, p.property_type, p.city, p.passport_completeness, 
        p.passport_status, p.created_at, p.updated_at,
        u.name as owner_name, u.phone as owner_phone, u.id as owner_id,
        (
          SELECT json_agg(json_build_object('category', category, 'is_client_visible', is_client_visible))
          FROM passport_documents d WHERE d.property_id = p.id
        ) as docs
      FROM properties p
      LEFT JOIN users u ON p.owner_id = u.id
      ORDER BY p.created_at DESC
    `;

    const headers = [
      'Property ID', 'Title', 'Owner Name', 'Owner Phone', 'City', 'Property Type',
      'Linked Client', 'Completeness %', 'Legal Docs', 'Drawings', 'BOQ', 'Materials',
      'Quality Checks', 'Media', 'Warranty', 'Maintenance', 'Visible Doc Count',
      'Created Date', 'Updated Date'
    ];
    
    const rows = records.map(r => {
      const docs = r.docs || [];
      const hasCat = (cat) => docs.some(d => d.category === cat) ? 'Yes' : 'No';
      const visibleCount = docs.filter(d => d.is_client_visible).length;

      return [
        r.property_id,
        r.title,
        r.owner_name || '',
        r.owner_phone || '',
        r.city || '',
        r.property_type || '',
        r.owner_id ? 'Yes' : 'No',
        r.passport_completeness || 0,
        hasCat('legal'),
        hasCat('drawings'),
        hasCat('boq'),
        hasCat('materials'),
        hasCat('quality_checks'),
        hasCat('media'),
        hasCat('warranty'),
        hasCat('maintenance'),
        visibleCount,
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
        'Content-Disposition': 'attachment; filename="passports_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
