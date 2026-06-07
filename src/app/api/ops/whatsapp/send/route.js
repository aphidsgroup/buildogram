import { requirePermission } from '@/lib/auth/permissions';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';
import { normalizePhone } from '@/lib/whatsapp';
import sql from '@/lib/db';

export async function POST(req) {
  await requirePermission('manage_whatsapp_templates');
  const u = getUserFromRequest(req);
  if (!u || !roleCan(u.role, 'send_whatsapp_message')) {
    return NextResponse.json({ success: false, error: 'Forbidden. Lacking permission.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { lead_id, phone, message, template_type, send_mode } = body;

    if (!lead_id || !phone || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    if (send_mode !== 'cloud_api') {
      return NextResponse.json({ success: false, error: 'Invalid send_mode' }, { status: 400 });
    }

    const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const apiVersion = process.env.WHATSAPP_API_VERSION || 'v20.0';

    if (!token || !phoneId) {
      return NextResponse.json({ 
        success: false, 
        error: 'WhatsApp Cloud API is not configured. Use manual WhatsApp send.',
        missing_config: true
      }, { status: 501 });
    }

    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone) {
      return NextResponse.json({ success: false, error: 'Invalid phone number format' }, { status: 400 });
    }

    // Official WhatsApp Cloud API call
    // Currently sending as plain text. Meta may require templates for initial outbound messages.
    const payload = {
      messaging_product: 'whatsapp',
      to: cleanPhone,
      type: 'text',
      text: { body: message }
    };

    const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[WhatsApp Cloud API Error]', data);
      
      // Log the failure
      await sql`
        INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata, created_by)
        VALUES (${lead_id}, 'whatsapp', 'WhatsApp Cloud API send failed', ${message}, ${JSON.stringify({
          phone: cleanPhone,
          template_type: template_type || 'text',
          provider: 'whatsapp_cloud_api',
          status: 'failed',
          error: data.error?.message || 'Unknown error'
        })}, ${u.id})
      `;

      return NextResponse.json({ 
        success: false, 
        error: data.error?.message || 'Failed to send WhatsApp message'
      }, { status: 400 });
    }

    // Log the success
    await sql`
      INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata, created_by)
      VALUES (${lead_id}, 'whatsapp', 'WhatsApp Cloud API message sent', ${message}, ${JSON.stringify({
        phone: cleanPhone,
        template_type: template_type || 'text',
        provider: 'whatsapp_cloud_api',
        status: 'success',
        message_id: data.messages?.[0]?.id
      })}, ${u.id})
    `;

    return NextResponse.json({ success: true, message_id: data.messages?.[0]?.id });

  } catch (error) {
    console.error('[WhatsApp Route Error]', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
