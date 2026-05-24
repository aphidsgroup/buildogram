import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';
import { roleCan } from '@/lib/permissions';

export async function POST(req, { params }) {
  const { id } = params;
  const u = getUserFromRequest(req);
  
  // Must have send_whatsapp_message permission
  if (!u || !roleCan(u.role, 'send_whatsapp_message')) {
    return NextResponse.json({ error: 'Unauthorized to send WhatsApp messages' }, { status: 401 });
  }

  try {
    // 1. Fetch item
    const [item] = await sql`SELECT * FROM notification_queue WHERE id = ${id}`;
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    if (item.status !== 'approved') return NextResponse.json({ error: 'Item is not in approved state' }, { status: 400 });

    // 2. Actually try to send via WhatsApp Cloud API
    const WABA_URL = process.env.WHATSAPP_API_URL;
    const WABA_TOKEN = process.env.WHATSAPP_API_TOKEN;

    let apiFailed = false;
    let errorMessage = '';

    if (!WABA_URL || !WABA_TOKEN) {
      apiFailed = true;
      errorMessage = 'WhatsApp Cloud API keys missing from environment.';
    } else {
      // Simulate/Attempt real send
      try {
        const response = await fetch(WABA_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WABA_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: item.recipient_phone,
            type: 'text',
            text: { body: item.rendered_message }
          })
        });

        if (!response.ok) {
          apiFailed = true;
          const errData = await response.json().catch(() => ({}));
          errorMessage = errData.error?.message || `API Error: ${response.statusText}`;
        }
      } catch (fetchErr) {
        apiFailed = true;
        errorMessage = fetchErr.message;
      }
    }

    // 3. Update queue item status
    const finalStatus = apiFailed ? 'failed' : 'sent';

    const [updatedItem] = await sql`
      UPDATE notification_queue 
      SET 
        status = ${finalStatus}, 
        sent_by = ${u.id}, 
        sent_at = NOW(), 
        updated_at = NOW(),
        error_message = ${errorMessage || null}
      WHERE id = ${id}
      RETURNING *
    `;

    // 4. Log activity
    if (updatedItem.lead_id) {
      await sql`
        INSERT INTO lead_activities (lead_id, activity_type, title, description, created_by)
        VALUES (
          ${updatedItem.lead_id}, 'system', 
          ${apiFailed ? 'WhatsApp notification failed' : 'WhatsApp notification sent via API'}, 
          ${apiFailed ? errorMessage : 'Message successfully dispatched to WhatsApp Cloud API.'}, 
          ${u.id}
        )
      `;
    }

    return NextResponse.json({ success: !apiFailed, item: updatedItem, error: errorMessage });
  } catch (error) {
    console.error('Queue send error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
