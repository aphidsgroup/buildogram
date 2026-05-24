import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';
import { evaluateNotificationRule } from '@/lib/notifications';
import { renderTemplate } from '@/lib/whatsapp';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_notification_rules')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { event_type, client_id, lead_id } = await req.json();

    if (!event_type) {
      return NextResponse.json({ success: false, error: 'event_type is required' }, { status: 400 });
    }

    // 1. Evaluate logic rules
    const evaluation = await evaluateNotificationRule(event_type, { client_id });

    // 2. If it passed and has a template, render a mock preview
    let preview = null;
    let templateName = null;

    if (evaluation.template_id) {
      const [template] = await sql`SELECT template_name, message_body FROM whatsapp_templates WHERE id = ${evaluation.template_id}`;
      if (template) {
        templateName = template.template_name;
        
        let mockContext = { name: 'Client Name', status: 'mock_status', lead_type: 'mock_type' };
        
        // If a real lead_id is provided, try to fetch real context
        if (lead_id) {
          const [realLead] = await sql`SELECT name, status, lead_type FROM leads WHERE id = ${lead_id}`;
          if (realLead) mockContext = realLead;
        } else if (client_id) {
          const [realClient] = await sql`SELECT name FROM users WHERE id = ${client_id}`;
          if (realClient) mockContext.name = realClient.name;
        }

        preview = renderTemplate(template.message_body, mockContext);
      }
    }

    return NextResponse.json({
      success: true,
      evaluation,
      preview,
      template_name: templateName
    });

  } catch (error) {
    console.error('Dry run error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
