import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const b = await request.json();

    if (!b.companyName || !b.contactPerson || !b.email || !b.phone) {
      return fail('Missing required fields', 400);
    }

    // Generate a slug from company name
    let slug = b.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
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
        ${slug}, ${b.companyName}, ${b.contactPerson}, ${b.email}, ${b.phone}, ${b.whatsapp || null},
        ${b.category}, ${b.location}, ${b.website || null}, ${b.description || null}, 'Pending Review', false
      )
      RETURNING id, slug, company_name
    `;

    // Trigger ops admin notification silently
    import('@/lib/notifications/notifyOpsAdmin').then(m => {
      m.notifyOpsAdmin({
        requirement: 'New Partner Application',
        customerName: b.contactPerson,
        phone: b.phone,
        partnerName: b.companyName,
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
