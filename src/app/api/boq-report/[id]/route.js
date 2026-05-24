import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  const { id } = await params;
  const u = getUserFromRequest(request);

  if (!u) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [lead] = await sql`SELECT id, lead_type, created_at, metadata FROM leads WHERE id = ${id}`;

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
    }

    if (lead.lead_type !== 'boq_audit') {
      return NextResponse.json({ success: false, error: 'Invalid report type' }, { status: 400 });
    }

    const m = lead.metadata || {};

    // Access Control
    const isOps = ['ops_admin', 'ops_pm'].includes(u.role);
    const isOwner = u.role === 'client' && m.client_user_id === u.id;

    if (!isOps && !isOwner) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    if (!m.reviewed_boq_report) {
      return NextResponse.json({ success: false, error: 'Report not yet generated' }, { status: 404 });
    }

    if (!isOps && m.reviewed_boq_report.status !== 'ready_to_share') {
      return NextResponse.json({ success: false, error: 'Report is currently being prepared' }, { status: 403 });
    }

    // Strip sensitive metadata
    const safePayload = {
      id: lead.id,
      created_at: lead.created_at,
      project_type: m.project_type,
      quoted_amount: m.quoted_amount,
      built_up_area: m.built_up_area,
      floors: m.floors,
      report: m.reviewed_boq_report
    };

    return NextResponse.json({ success: true, data: safePayload });

  } catch (err) {
    console.error('BOQ Print Route Error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
