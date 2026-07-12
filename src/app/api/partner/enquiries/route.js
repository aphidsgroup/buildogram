import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// GET â€” partner fetches own enquiries
export async function GET(request) {
  const { user, error } = requirePartner(request);
  if (error) return error;

  try {
    // Get partner_id from users table
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return ok({ enquiries: [] });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let enquiries;
    if (status) {
      enquiries = await sql`
        SELECT * FROM partner_enquiries
        WHERE partner_id = ${u.partner_id} AND status = ${status}
        ORDER BY created_at DESC
      `;
    } else {
      enquiries = await sql`
        SELECT * FROM partner_enquiries
        WHERE partner_id = ${u.partner_id}
        ORDER BY created_at DESC
      `;
    }

    const mapped = enquiries.map(e => ({
      id: e.id,
      customerName: e.customer_name,
      phone: e.phone,
      email: e.email,
      requirement: e.requirement,
      location: e.location,
      budgetRange: e.budget_range,
      message: 'Internal server error',
      source: e.source_type === 'web' ? 'ðŸŒ Partner Profile' : e.source_page,
      status: e.status,
      followUpDate: e.follow_up_date,
      notes: e.notes,
      createdAt: e.created_at,
      isPublicEnquiry: true,
    }));

    return ok({ enquiries: mapped });
  } catch (e) {
    console.error('[GET /api/partner/enquiries]', e.message);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}
