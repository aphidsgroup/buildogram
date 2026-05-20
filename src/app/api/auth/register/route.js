import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json();
    const exists = await sql`SELECT id FROM users WHERE email=${email}`;
    if (exists.length) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    const hash = await bcrypt.hash(password, 10);
    const [user] = await sql`INSERT INTO users(name,email,phone,password_hash,role) VALUES(${name},${email},${phone},${hash},'client') RETURNING id,name,email,role`;
    const token = await signToken({ id: user.id, name: user.name, email: user.email, role: user.role });
    const res = NextResponse.json({ user });
    res.cookies.set('buildogram_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
    return res;
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
