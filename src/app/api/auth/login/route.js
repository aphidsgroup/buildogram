import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/storageProvider';
import { setAuthCookie, signToken } from '@/lib/auth';
import { normalizeRole } from '@/lib/roles';
import { checkRateLimit } from '@/lib/security/rateLimit';

export async function POST(req) {
  const rateLimit = checkRateLimit(req, { namespace: 'login', limit: 10, windowMs: 15 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter) } },
    );
  }
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    console.error('Login unavailable: DATABASE_URL is not configured.');
    return NextResponse.json({ error: 'Authentication service unavailable.' }, { status: 503 });
  }

  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await prisma.users.findUnique({ where: { email: normalizedEmail } });
    if (!user || !user.is_active || !(await bcrypt.compare(password, user.password_hash)))
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      
    const role = normalizeRole(user.role);
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      partner_id: user.partner_id || null,
      must_change_password: user.must_change_password,
    };
    const token = await signToken(safeUser);
    const res = NextResponse.json({ user: safeUser });
    return setAuthCookie(res, token);
  } catch (error) {
    console.error('Login failed:', error?.name || 'unknown_error');
    return NextResponse.json({ error: 'Database connection failed.' }, { status: 500 });
  }
}
