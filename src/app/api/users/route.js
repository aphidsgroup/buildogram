import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { ROLES } from '@/lib/roles';

const ADMIN_ROLES = new Set([ROLES.SUPER_ADMIN, ROLES.OPS_ADMIN]);
const ASSIGNABLE_ROLES = new Set(Object.values(ROLES).filter(role => role !== ROLES.SUPER_ADMIN));

export async function GET(req) {
  const user = await getActiveUserFromRequest(req);
  if (!user || !ADMIN_ROLES.has(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const users = await sql`
    SELECT id, name, email, phone, role, is_active, must_change_password, created_at
    FROM users ORDER BY created_at DESC LIMIT 500
  `;
  return NextResponse.json({ users });
}

export async function POST(req) {
  const actor = await getActiveUserFromRequest(req);
  if (!actor || !ADMIN_ROLES.has(actor.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const email = String(body.email || '').trim().toLowerCase();
  if (!body.name || !email || !body.password || body.password.length < 12 || !ASSIGNABLE_ROLES.has(body.role)) {
    return NextResponse.json({ error: 'Valid name, email, role and 12-character password are required' }, { status: 400 });
  }

  try {
    const hash = await bcrypt.hash(body.password, 12);
    const [user] = await sql`
      INSERT INTO users(name, email, phone, password_hash, role, must_change_password)
      VALUES (${String(body.name).slice(0, 160)}, ${email}, ${body.phone || null}, ${hash}, ${body.role}, true)
      RETURNING id, name, email, role, must_change_password
    `;
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('User creation failed:', error?.name || 'unknown_error');
    return NextResponse.json({ error: 'Unable to create user' }, { status: 400 });
  }
}
