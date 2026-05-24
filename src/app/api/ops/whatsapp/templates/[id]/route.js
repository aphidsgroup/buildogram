import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function PUT(req, { params }) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_whatsapp_templates')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { id } = await params;
    const b = await req.json();

    const [template] = await sql`
      UPDATE whatsapp_templates SET
        template_name = COALESCE(${b.template_name ?? null}, template_name),
        category = COALESCE(${b.category ?? null}, category),
        channel_type = COALESCE(${b.channel_type ?? null}, channel_type),
        message_body = COALESCE(${b.message_body ?? null}, message_body),
        variables = COALESCE(${b.variables ? JSON.stringify(b.variables) : null}::jsonb, variables),
        is_active = COALESCE(${b.is_active ?? null}, is_active),
        requires_meta_approval = COALESCE(${b.requires_meta_approval ?? null}, requires_meta_approval),
        meta_template_name = COALESCE(${b.meta_template_name ?? null}, meta_template_name),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (!template) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, template });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
