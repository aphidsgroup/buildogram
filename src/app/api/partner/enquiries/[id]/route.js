import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// PATCH â€” partner updates enquiry status, notes, follow_up_date
export async function PATCH(request, { params }) {
  const { user, error } = requirePartner(request);
  if (error) return error;

  try {
    // Verify ownership
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u?.partner_id) return fail('No partner profile linked', 403);

    const [existing] = await sql`SELECT id, partner_id FROM partner_enquiries WHERE id = ${(await params).id} LIMIT 1`;
    if (!existing) return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    if (existing.partner_id !== u.partner_id) return NextResponse.json({ success: false, message: 'Access denied' }, { status: 403 });

    const b = await request.json();
    const updates = {};
    if ('status' in b) updates.status = b.status;
    if ('notes' in b) updates.notes = b.notes;
    if ('followUpDate' in b) updates.follow_up_date = b.followUpDate || null;

    if ('status' in updates && 'notes' in updates && 'follow_up_date' in updates) {
      await sql`UPDATE partner_enquiries SET status = ${updates.status}, notes = ${updates.notes}, follow_up_date = ${updates.follow_up_date}, updated_at = NOW() WHERE id = ${(await params).id}`;
    } else if ('status' in updates && 'notes' in updates) {
      await sql`UPDATE partner_enquiries SET status = ${updates.status}, notes = ${updates.notes}, updated_at = NOW() WHERE id = ${(await params).id}`;
    } else if ('status' in updates) {
      await sql`UPDATE partner_enquiries SET status = ${updates.status}, updated_at = NOW() WHERE id = ${(await params).id}`;
    } else if ('notes' in updates) {
      await sql`UPDATE partner_enquiries SET notes = ${updates.notes}, updated_at = NOW() WHERE id = ${(await params).id}`;
    } else if ('follow_up_date' in updates) {
      await sql`UPDATE partner_enquiries SET follow_up_date = ${updates.follow_up_date}, updated_at = NOW() WHERE id = ${(await params).id}`;
    }

    return ok({ message: 'Enquiry updated', id: (await params).id });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
