import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// POST — public enquiry form (no auth required)
export async function POST(request) {
  try {
    const b = await request.json();

    if (!b.customerName || !b.phone) {
      return fail('Name and phone are required', 400);
    }

    // Resolve partner_id from slug if provided
    let partnerId = null;
    let partnerObj = null;
    if (b.partnerSlug) {
      const [p] = await sql`SELECT id, company_name, category, email, phone, whatsapp FROM partners WHERE slug = ${b.partnerSlug} LIMIT 1`;
      if (p) {
        partnerId = p.id;
        partnerObj = p;
        if (!b.partnerName) b.partnerName = p.company_name;
        if (!b.category) b.category = p.category;
      }
    }

    const attr = b.attribution || {};

    const [enquiry] = await sql`
      INSERT INTO leads (
        partner_id, category, name, phone, email,
        requirement, locality, message,
        source_page, source, status, lead_type,
        first_landing_page, conversion_page, referrer, utm_source, utm_medium,
        utm_campaign, utm_content, utm_term, gclid, session_id, device_type, page_category, attribution_json
      ) VALUES (
        ${partnerId}, ${b.category || null}, ${b.customerName}, ${b.phone}, ${b.email || null},
        ${b.requirement || null}, ${b.location || null}, ${b.message || null},
        ${b.sourcePage || 'partner_profile'}, ${b.sourceType || 'web'}, 'new', 'partner_enquiry',
        ${attr.first_landing_page || null}, ${attr.conversion_page || b.sourcePage || null}, ${attr.referrer || null},
        ${attr.utm_source || null}, ${attr.utm_medium || null}, ${attr.utm_campaign || null},
        ${attr.utm_content || null}, ${attr.utm_term || null}, ${attr.gclid || null},
        ${attr.session_id || null}, ${attr.device_type || null}, ${attr.page_category || null},
        ${attr.attribution_json ? JSON.stringify(attr.attribution_json) : null}
      )
      RETURNING id, name as customer_name, status, created_at
    `;

    // Fire notifications non-blockingly
    const payload = { ...b, partnerName: b.partnerName, partnerCategory: b.category };
    import('@/lib/notifications/notifyOpsAdmin').then(m => m.notifyOpsAdmin(payload)).catch(() => {});
    if (partnerObj) {
      import('@/lib/notifications/notifyPartner').then(m => m.notifyPartner(partnerObj, payload)).catch(() => {});
    }

    return ok({ enquiry: { id: enquiry.id, status: enquiry.status, createdAt: enquiry.created_at } }, 201);
  } catch (e) {
    console.error('[POST /api/partner-enquiries]', e.message);
    return NextResponse.json({ success: false, message: 'Unable to submit enquiry. Please try again.' }, { status: 500 });
  }
}


// GET — ops admin sees all enquiries
export async function GET(request) {
  const { getUserFromRequest } = await import('@/lib/auth');
  const user = getUserFromRequest(request);
  if (!user || !['ops_admin', 'ops_pm', 'ops_engineer'].includes(user.role)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
  }

  try {
    const enquiries = await sql`
      SELECT pe.*, p.company_name as partner_name, p.slug as partner_slug, pe.name as customer_name
      FROM leads pe
      LEFT JOIN partners p ON pe.partner_id = p.id
      WHERE pe.lead_type = 'partner_enquiry'
      ORDER BY pe.created_at DESC
      LIMIT 200
    `;
    return ok({ enquiries });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
