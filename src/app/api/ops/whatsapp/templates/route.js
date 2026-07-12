import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function GET(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'send_whatsapp_message')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true'; // Admin view

    let templates;
    if (all && roleCan(u.role, 'manage_whatsapp_templates')) {
      templates = await sql`SELECT * FROM whatsapp_templates ORDER BY category, template_name`;
    } else {
      templates = await sql`SELECT * FROM whatsapp_templates WHERE is_active = true ORDER BY category, template_name`;
    }

    return NextResponse.json({ success: true, templates });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(req) {
  await requirePermission('manage_whatsapp_templates');
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_whatsapp_templates')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const b = await req.json();
    const { template_key, template_name, category, channel_type, message_body, variables, is_active, requires_meta_approval, meta_template_name } = b;

    const [template] = await sql`
      INSERT INTO whatsapp_templates (
        template_key, template_name, category, channel_type, message_body, variables, 
        is_active, requires_meta_approval, meta_template_name, created_by
      ) VALUES (
        ${template_key}, ${template_name}, ${category}, ${channel_type || 'both'}, ${message_body}, 
        ${JSON.stringify(variables || [])}::jsonb, ${is_active}, ${requires_meta_approval}, ${meta_template_name}, ${u.id}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, template });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
