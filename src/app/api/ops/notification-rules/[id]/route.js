import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function PUT(req, { params }) {
  await requirePermission('manage_notification_rules');
  const { id } = await params;
  const u = getUserFromRequest(req);
  
  if (!u || !roleCan(u.role, 'manage_notification_rules')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      is_enabled,
      template_id,
      channel,
      requires_manual_review,
      respect_quiet_hours,
      respect_user_preferences
    } = body;

    const [rule] = await sql`
      UPDATE notification_rules SET
        is_enabled = ${!!is_enabled},
        template_id = ${template_id || null},
        channel = ${channel || 'whatsapp'},
        requires_manual_review = ${!!requires_manual_review},
        respect_quiet_hours = ${!!respect_quiet_hours},
        respect_user_preferences = ${!!respect_user_preferences},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (!rule) return NextResponse.json({ error: 'Rule not found' }, { status: 404 });

    return NextResponse.json({ success: true, rule });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
