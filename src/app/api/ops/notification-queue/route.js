import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_notification_queue')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get('status') || 'pending_review';

  try {
    let query = sql`
      SELECT q.*, r.rule_name, t.template_name 
      FROM notification_queue q
      LEFT JOIN notification_rules r ON q.rule_id = r.id
      LEFT JOIN whatsapp_templates t ON q.template_id = t.id
    `;
    
    if (statusFilter !== 'all') {
      query = sql`${query} WHERE q.status = ${statusFilter}`;
    }
    
    query = sql`${query} ORDER BY q.created_at DESC LIMIT 100`;

    const items = await query;
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
