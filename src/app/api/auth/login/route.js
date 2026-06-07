import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/storageProvider';
import { signToken } from '@/lib/auth';

const isDemo = process.env.APP_MODE === 'demo' || !process.env.DATABASE_URL;

export async function POST(req) {
  const { email, password } = await req.json();

  // DEMO CREDENTIALS BYPASS
  if (isDemo && password === 'password123') {
    let mockUser = null;
    if (email === 'admin@buildogram.in') mockUser = { id: 'admin-1', name: 'Demo Admin', email, role: 'ops_admin' };
    else if (email === 'partner@buildogram.in') mockUser = { id: 'partner-1', name: 'Demo Partner', email, role: 'partner_contractor' };
    else if (email === 'client@buildogram.in') mockUser = { id: 'client-1', name: 'Demo Client', email, role: 'client' };

    if (mockUser) {
      const token = await signToken(mockUser);
      const res = NextResponse.json({ user: mockUser });
      res.cookies.set('buildogram_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
      return res;
    }
  }

  if (isDemo) {
    return NextResponse.json({ error: 'Invalid credentials. Use demo passwords.' }, { status: 401 });
  }

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user || !user.is_active || !(await bcrypt.compare(password, user.password_hash)))
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      
    const token = await signToken({ id: user.id, name: user.name, email: user.email, role: user.role, must_change_password: user.must_change_password });
    const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, must_change_password: user.must_change_password } });
    res.cookies.set('buildogram_token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
    return res;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Database connection failed.' }, { status: 500 });
  }
}
