import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'ops_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const users = await sql`SELECT id,name,email,phone,role,is_active,created_at FROM users ORDER BY created_at DESC`;
  return NextResponse.json({ users });
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'ops_admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  const hash = await bcrypt.hash(b.password, 10);
  const [user] = await sql`INSERT INTO users(name,email,phone,password_hash,role) VALUES(${b.name},${b.email},${b.phone || null},${hash},${b.role}) RETURNING id,name,email,role`;
  return NextResponse.json({ user });
}
