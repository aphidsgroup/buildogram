import { NextResponse } from 'next/server';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';

export async function GET(req) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ user });
}
