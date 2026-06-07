import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function POST(req, { params }) {
  await requirePermission('manage_notification_rules');
  const { id } = params;
  const u = getUserFromRequest(req);
  
  if (!u || !roleCan(u.role, 'manage_notification_queue')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [item] = await sql`
      UPDATE notification_queue 
      SET status = 'approved', approved_by = ${u.id}, approved_at = NOW(), updated_at = NOW()
      WHERE id = ${id} AND status = 'pending_review'
      RETURNING *
    `;

    if (!item) return NextResponse.json({ error: 'Item not found or not in pending state' }, { status: 404 });

    if (item.lead_id) {
      await sql`
        INSERT INTO lead_activities (lead_id, activity_type, title, description, created_by)
        VALUES (${item.lead_id}, 'system', 'WhatsApp notification approved', 'Ready for dispatch.', ${u.id})
      `;
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
