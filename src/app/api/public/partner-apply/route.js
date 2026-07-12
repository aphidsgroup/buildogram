import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { ok, fail } from '@/lib/apiAuth';
import { checkRateLimit } from '@/lib/security/rateLimit';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const rateLimit = checkRateLimit(request, { namespace: 'partner-apply', limit: 5, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false, message: 'Too many submissions. Try again later.' }, {
      status: 429,
      headers: { 'Retry-After': String(rateLimit.retryAfter) },
    });
  }

  try {
    const b = await request.json();
    const email = String(b.email || '').trim().toLowerCase();
    const phone = String(b.phone || '').replace(/\D/g, '');
    const companyName = String(b.companyName || '').trim().slice(0, 160);
    const contactPerson = String(b.contactPerson || '').trim().slice(0, 120);

    if (!companyName || !contactPerson || !/^\S+@\S+\.\S+$/.test(email) || !/^[6-9]\d{9}$/.test(phone)) {
      return fail('Missing required fields', 400);
    }

    // Generate a slug from company name
    let slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Ensure slug uniqueness
    const existing = await sql`SELECT slug FROM partners WHERE slug LIKE ${slug + '%'}`;
    if (existing.length > 0) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const [partner] = await sql`
      INSERT INTO partners (
        slug, company_name, contact_person, email, phone, whatsapp, 
        category, location, website, full_description, approval_status, active
      ) VALUES (
        ${slug}, ${companyName}, ${contactPerson}, ${email}, ${phone}, ${String(b.whatsapp || '').slice(0, 20) || null},
        ${String(b.category || '').slice(0, 80) || null}, ${String(b.location || '').slice(0, 120) || null}, ${String(b.website || '').slice(0, 300) || null}, ${String(b.description || '').slice(0, 4000) || null}, 'Pending Review', false
      )
      RETURNING id, slug, company_name
    `;

    // Trigger ops admin notification silently
    import('@/lib/notifications/notifyOpsAdmin').then(m => {
      m.notifyOpsAdmin({
        requirement: 'New Partner Application',
        customerName: contactPerson,
        phone,
        partnerName: companyName,
        category: b.category,
        location: b.location
      });
    }).catch(() => {});

    return ok({ success: true, partner }, 201);
  } catch (e) {
    console.error('[POST /api/public/partner-apply]', e.message);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
