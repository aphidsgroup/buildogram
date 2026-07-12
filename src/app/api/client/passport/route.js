import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'client') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const properties = await sql`
      SELECT *
      FROM properties
      WHERE owner_user_id = ${u.id}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ success: true, properties });
  } catch (e) {
    console.error('[client passport GET]', e.message);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
