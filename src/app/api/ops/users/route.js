import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

  try {
    let users;
    if (search) {
      users = await sql`
        SELECT id, name, email, phone, role
        FROM users
        WHERE name ILIKE ${'%' + search + '%'}
           OR email ILIKE ${'%' + search + '%'}
           OR phone ILIKE ${'%' + search + '%'}
        ORDER BY created_at DESC
        LIMIT 10
      `;
    } else {
      users = await sql`
        SELECT id, name, email, phone, role
        FROM users
        ORDER BY created_at DESC
        LIMIT 10
      `;
    }
    return NextResponse.json({ success: true, users });
  } catch (e) {
    console.error('[ops users search]', e.message);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
