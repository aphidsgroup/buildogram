import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { ok, fail } from '@/lib/apiAuth';
import { checkRateLimit } from '@/lib/security/rateLimit';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { isOpsRole } from '@/lib/roles';

export const dynamic = 'force-dynamic';

// POST â€” public enquiry form (no auth required)
export async function POST(request) {
  const rateLimit = checkRateLimit(request, { namespace: 'partner-enquiry', limit: 10, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false, message: 'Too many submissions. Try again later.' }, {
      status: 429,
      headers: { 'Retry-After': String(rateLimit.retryAfter) },
    });
  }

  try {
    const b = await request.json();
    const customerName = String(b.customerName || '').trim().slice(0, 120);
    const phone = String(b.phone || '').replace(/\D/g, '');
    const email = String(b.email || '').trim().toLowerCase().slice(0, 254);

    if (!customerName || !/^[6-9]\d{9}$/.test(phone) || (email && !/^\S+@\S+\.\S+$/.test(email))) {
      return fail('Enter a valid name, phone, and email', 400);
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
        ${partnerId}, ${String(b.category || '').slice(0, 80) || null}, ${customerName}, ${phone}, ${email || null},
        ${String(b.requirement || '').slice(0, 500) || null}, ${String(b.location || '').slice(0, 120) || null}, ${String(b.message || '').slice(0, 4000) || null},
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


// GET â€” ops admin sees all enquiries
export async function GET(request) {
  const user = await getActiveUserFromRequest(request);
  if (!user || !isOpsRole(user.role)) {
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
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
