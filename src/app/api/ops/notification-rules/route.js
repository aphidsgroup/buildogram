import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_notification_rules')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rules = await sql`
      SELECT r.*, t.template_name, t.category as template_category 
      FROM notification_rules r
      LEFT JOIN whatsapp_templates t ON r.template_id = t.id
      ORDER BY r.event_type ASC
    `;
    return NextResponse.json({ success: true, rules });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
