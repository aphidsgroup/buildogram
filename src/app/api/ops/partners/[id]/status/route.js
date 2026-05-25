import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireOps, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// PATCH — update approval_status, active, or featured
export async function PATCH(request, { params }) {
  const { user, error } = requireOps(request);
  if (error) return error;

  const { id } = await params;

  try {
    const b = await request.json();
    const updates = {};
    if ('approvalStatus' in b) updates.approval_status = b.approvalStatus;
    if ('isActive' in b) updates.active = Boolean(b.isActive);
    if ('isFeatured' in b) updates.featured = Boolean(b.isFeatured);

    if (Object.keys(updates).length === 0) return fail('No valid fields to update');

    // Build dynamic update
    if ('approval_status' in updates && 'active' in updates && 'featured' in updates) {
      await sql`UPDATE partners SET approval_status = ${updates.approval_status}, active = ${updates.active}, featured = ${updates.featured}, updated_at = NOW() WHERE id = ${id}`;
    } else if ('approval_status' in updates) {
      await sql`UPDATE partners SET approval_status = ${updates.approval_status}, updated_at = NOW() WHERE id = ${id}`;
    } else if ('active' in updates) {
      await sql`UPDATE partners SET active = ${updates.active}, updated_at = NOW() WHERE id = ${id}`;
    } else if ('featured' in updates) {
      await sql`UPDATE partners SET featured = ${updates.featured}, updated_at = NOW() WHERE id = ${id}`;
    }

    // Auto-create user on approval
    if (updates.approval_status === 'Approved') {
      const [partner] = await sql`SELECT id, slug, company_name, email, contact_person FROM partners WHERE id = ${id} LIMIT 1`;
      if (partner && partner.email) {
        const userExists = await sql`SELECT id FROM users WHERE email = ${partner.email} LIMIT 1`;
        if (userExists.length === 0) {
          // Create new partner user account
          const bcrypt = await import('bcryptjs');
          const tempPassword = `Partner@${Math.floor(1000 + Math.random() * 9000)}`;
          const hash = await bcrypt.hash(tempPassword, 10);
          
          await sql`
            INSERT INTO users (name, email, password_hash, role, is_active, partner_id)
            VALUES (${partner.contact_person || partner.company_name}, ${partner.email}, ${hash}, 'partner', true, ${partner.id})
          `;
          
          // Send welcome email (mocked for now)
          import('@/lib/notifications/notifyPartner').then(m => {
            m.notifyPartner(partner, {
              type: 'welcome',
              message: `Welcome to Buildogram! Your application has been approved. Your temporary password is: ${tempPassword}`
            });
          }).catch(() => {});
        }
      }
    }

    return ok({ message: 'Status updated', id, ...updates });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
