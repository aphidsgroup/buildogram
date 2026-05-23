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
      WHERE owner_phone = ${u.phone} OR (owner_email IS NOT NULL AND owner_email = ${u.email})
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ success: true, properties });
  } catch (e) {
    console.error('[client passport GET]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
