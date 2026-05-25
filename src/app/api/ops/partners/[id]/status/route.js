import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireOps, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// PATCH — update approval_status, active, or featured
export async function PATCH(request, { params }) {
  const { user, error } = requireOps(request);
  if (error) return error;

  try {
    const b = await request.json();
    const updates = {};
    if ('approvalStatus' in b) updates.approval_status = b.approvalStatus;
    if ('isActive' in b) updates.active = Boolean(b.isActive);
    if ('isFeatured' in b) updates.featured = Boolean(b.isFeatured);

    if (Object.keys(updates).length === 0) return fail('No valid fields to update');

    // Build dynamic update
    if ('approval_status' in updates && 'active' in updates && 'featured' in updates) {
      await sql`UPDATE partners SET approval_status = ${updates.approval_status}, active = ${updates.active}, featured = ${updates.featured}, updated_at = NOW() WHERE id = ${params.id}`;
    } else if ('approval_status' in updates) {
      await sql`UPDATE partners SET approval_status = ${updates.approval_status}, updated_at = NOW() WHERE id = ${params.id}`;
    } else if ('active' in updates) {
      await sql`UPDATE partners SET active = ${updates.active}, updated_at = NOW() WHERE id = ${params.id}`;
    } else if ('featured' in updates) {
      await sql`UPDATE partners SET featured = ${updates.featured}, updated_at = NOW() WHERE id = ${params.id}`;
    }

    return ok({ message: 'Status updated', id: params.id, ...updates });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
