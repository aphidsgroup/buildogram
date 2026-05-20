import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const notifs = await sql`SELECT * FROM notifications WHERE user_id=${u.id} ORDER BY created_at DESC LIMIT 20`;
  return NextResponse.json({ notifications: notifs });
}

export async function PUT(req) {
  const u = getUserFromRequest(req);
  if (!u) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await sql`UPDATE notifications SET is_read=true WHERE user_id=${u.id}`;
  return NextResponse.json({ success: true });
}
