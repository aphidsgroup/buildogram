import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const [user] = await sql`SELECT id,name,email,phone,role,avatar_url,metadata FROM users WHERE id=${u.id}`;
  return NextResponse.json({ user });
}
