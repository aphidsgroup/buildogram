import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';
import { evaluateNotificationRule } from '@/lib/notifications';
import { renderTemplate } from '@/lib/whatsapp';

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'manage_notification_queue')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { event_type, lead_id, client_id } = await req.json();

    if (!event_type) return NextResponse.json({ success: false, error: 'event_type is required' }, { status: 400 });

    // 1. Evaluate logic rules
    const evaluation = await evaluateNotificationRule(event_type, { client_id });

    // 2. Fetch context
    let context = {};
    let recipientPhone = null;
    let recipientName = null;

    if (lead_id) {
      const [lead] = await sql`SELECT name, phone, status, lead_type FROM leads WHERE id = ${lead_id}`;
      if (lead) {
        context = lead;
        recipientPhone = lead.phone;
        recipientName = lead.name;
      }
    } else if (client_id) {
      const [client] = await sql`SELECT name, phone FROM users WHERE id = ${client_id}`;
      if (client) {
        context.name = client.name;
        recipientPhone = client.phone;
        recipientName = client.name;
      }
    }

    if (!recipientPhone && evaluation.should_send) {
      return NextResponse.json({ success: false, error: 'No recipient phone number found' }, { status: 400 });
    }

    // 3. Render Template if applicable
    let renderedMessage = 'No template assigned';
    let ruleId = null;

    if (evaluation.template_id) {
      const [template] = await sql`SELECT message_body FROM whatsapp_templates WHERE id = ${evaluation.template_id}`;
      if (template) {
        renderedMessage = renderTemplate(template.message_body, context);
      }
      
      const [rule] = await sql`SELECT id FROM notification_rules WHERE event_type = ${event_type} AND is_enabled = true LIMIT 1`;
      if (rule) ruleId = rule.id;
    }

    const queueStatus = evaluation.should_send ? 'pending_review' : 'cancelled';

    // 4. Create Queue Item
    const [queueItem] = await sql`
      INSERT INTO notification_queue (
        event_type, target_type, lead_id, user_id, template_id, channel,
        recipient_phone, recipient_name, rendered_message, status, rule_id,
        preference_check_result, created_by
      ) VALUES (
        ${event_type}, ${lead_id ? 'lead' : 'client'}, ${lead_id || null}, ${client_id || null}, 
        ${evaluation.template_id || null}, ${evaluation.channel || 'whatsapp'},
        ${recipientPhone}, ${recipientName}, ${renderedMessage}, ${queueStatus}, ${ruleId},
        ${JSON.stringify({ reason: evaluation.reason })}, ${u.id}
      )
      RETURNING *
    `;

    // 5. Log activity
    if (lead_id) {
      await sql`
        INSERT INTO lead_activities (lead_id, activity_type, title, description, created_by)
        VALUES (
          ${lead_id}, 'system', 
          ${queueStatus === 'pending_review' ? 'WhatsApp notification draft queued' : 'WhatsApp notification cancelled'}, 
          ${queueStatus === 'pending_review' ? 'Awaiting Ops approval.' : evaluation.reason}, 
          ${u.id}
        )
      `;
    }

    return NextResponse.json({ success: true, item: queueItem, evaluation });

  } catch (error) {
    console.error('Queue draft error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
