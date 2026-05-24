import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_system_settings')) {
    // Fallback to ops_admin if permission isn't explicitly defined
    if (u?.role !== 'ops_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const [settings] = await sql`SELECT * FROM notification_settings LIMIT 1`;
    return NextResponse.json({ success: true, settings });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req) {
  const u = getUserFromRequest(req);
  if (!u || u.role !== 'ops_admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { 
      automation_mode, whatsapp_enabled, email_enabled, 
      max_messages_per_hour, max_messages_per_user_per_day,
      respect_quiet_hours, respect_user_preferences 
    } = body;

    const [settings] = await sql`
      UPDATE notification_settings
      SET automation_mode = ${automation_mode},
          whatsapp_enabled = ${whatsapp_enabled},
          email_enabled = ${email_enabled},
          max_messages_per_hour = ${max_messages_per_hour},
          max_messages_per_user_per_day = ${max_messages_per_user_per_day},
          respect_quiet_hours = ${respect_quiet_hours},
          respect_user_preferences = ${respect_user_preferences},
          updated_at = NOW()
      RETURNING *
    `;

    return NextResponse.json({ success: true, settings });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
