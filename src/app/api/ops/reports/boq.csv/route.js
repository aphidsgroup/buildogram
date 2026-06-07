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
      SELECT id, name, phone, email, status, metadata, created_at
      FROM leads 
      WHERE lead_type = 'boq_audit'
      ORDER BY created_at DESC
    `;

    const headers = [
      'Lead ID', 'Customer Name', 'Phone', 'Email', 
      'Project Location', 'Project Type', 'Built-up Area (sqft)', 'Floors',
      'Quoted Amount', 'Review Status', 'AI Draft Generated', 'Human Reviewed', 
      'Report Status', 'Ready to Share', 'Client Linked', 'Created Date'
    ];
    
    const rows = records.map(r => {
      const meta = r.metadata || {};
      const aiDraftGen = meta.ai_draft_request_id ? 'Yes' : 'No';
      const humanReviewed = meta.boq_review_status === 'reviewed' || meta.reviewed_boq_report ? 'Yes' : 'No';
      const reportObj = meta.reviewed_boq_report || {};
      const clientLinked = meta.client_user_id ? 'Yes' : 'No';

      return [
        r.id,
        r.name,
        r.phone,
        r.email,
        meta.project_location || '',
        meta.project_type || '',
        meta.built_up_area || '',
        meta.number_of_floors || '',
        meta.quoted_amount || '',
        meta.boq_review_status || 'pending',
        aiDraftGen,
        humanReviewed,
        reportObj.status || 'None',
        reportObj.ready_to_share ? 'Yes' : 'No',
        clientLinked,
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
        'Content-Disposition': 'attachment; filename="boq_audit_report.csv"'
      }
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
