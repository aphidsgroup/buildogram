import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const leads = await sql`
      SELECT l.*, p.title as property_title 
      FROM leads l
      JOIN properties p ON l.property_id = p.id
      WHERE l.lead_type = 'maintenance'
        AND p.owner_user_id = ${u.id}
      ORDER BY l.created_at DESC
    `;

    return NextResponse.json({ success: true, leads });
  } catch (e) {
    console.error('[client maintenance GET]', e.message);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
