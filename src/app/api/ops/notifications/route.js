import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    // For Ops, we either fetch notifications explicitly mapped to their user_id, 
    // or just fetch all 'ops' type notifications if we use a shared inbox strategy.
    // Assuming user_id is mapped when notifications are created.
    const notifications = await sql`
      SELECT * FROM notifications 
      WHERE user_id = ${u.id}
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    return NextResponse.json({ success: true, notifications });
  } catch (err) {
    console.error('[ops/notifications GET]', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  await requirePermission('manage_notification_rules');
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(u.role)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, mark_all_read } = body;

    if (mark_all_read) {
      await sql`UPDATE notifications SET is_read = TRUE WHERE user_id = ${u.id}`;
      return NextResponse.json({ success: true });
    }

    if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    
    await sql`UPDATE notifications SET is_read = TRUE WHERE id = ${id} AND user_id = ${u.id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[ops/notifications PATCH]', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
