import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  const { email, password } = await req.json();
  const [user] = await sql`SELECT * FROM users WHERE email=${email} AND is_active=true`;
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const token = await signToken({ id: user.id, name: user.name, email: user.email, role: user.role });
  const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  res.cookies.set('buildogram_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
  return res;
}
