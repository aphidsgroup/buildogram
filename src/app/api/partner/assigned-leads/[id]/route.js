import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const u = getUserFromRequest(req);
    if (!u) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { assignment_status, partner_response_note } = body;

    if (!['accepted', 'contacted', 'rejected'].includes(assignment_status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    // 1. Fetch lead and strictly verify ownership
    const [lead] = await sql`
      SELECT id, metadata 
      FROM leads 
      WHERE id = ${id} AND metadata->>'assigned_partner_user_id' = ${u.id}
    `;

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found or access denied' }, { status: 404 });
    }

    // 2. Merge metadata
    const m = lead.metadata || {};
    const newMetadata = {
      ...m,
      partner_assignment_status: assignment_status,
    };
    
    if (partner_response_note !== undefined) {
      newMetadata.partner_response_note = partner_response_note;
    }

    // 3. Update database safely
    await sql`UPDATE leads SET metadata = ${JSON.stringify(newMetadata)} WHERE id = ${id}`;

    // 4. Log activity
    await sql`
      INSERT INTO lead_activities (lead_id, activity_type, title, description)
      VALUES (
        ${id}, 
        'status_change', 
        'Partner Status Updated', 
        ${`Partner updated assignment status to: ${assignment_status}`}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Update assigned lead error:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
