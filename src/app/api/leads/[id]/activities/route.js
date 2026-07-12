import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const activities = await sql`
      SELECT a.*, u.name as created_by_name
      FROM lead_activities a
      LEFT JOIN users u ON a.created_by = u.id
      WHERE a.lead_id = ${id}
      ORDER BY a.created_at DESC
    `;
    
    return NextResponse.json({ success: true, activities });
  } catch (e) {
    console.error('[activities GET]', e.message);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const b = await req.json();
    
    // Allowed types: note, call, whatsapp, email, meeting, status_change, follow_up, system
    const { activity_type, title, description, follow_up_at, metadata } = b;

    const [activity] = await sql`
      INSERT INTO lead_activities (
        lead_id, activity_type, title, description, created_by, follow_up_at, metadata
      ) VALUES (
        ${id}, 
        ${activity_type || 'note'}, 
        ${title || null}, 
        ${description || null}, 
        ${u.id}, 
        ${follow_up_at || null}, 
        ${metadata ? metadata : '{}'}::jsonb
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, activity });
  } catch (e) {
    console.error('[activities POST]', e.message);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
