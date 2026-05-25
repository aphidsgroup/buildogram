import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireOps, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// ── GET single partner (ops detail) ──────────────────────────────────────
export async function GET(request, { params }) {
  const { user, error } = requireOps(request);
  if (error) return error;

  try {
    const [partner] = await sql`SELECT * FROM partners WHERE id = ${params.id}`;
    if (!partner) return NextResponse.json({ success: false, message: 'Partner not found' }, { status: 404 });

    const [gallery, videos, portfolio, enquiries] = await Promise.all([
      sql`SELECT * FROM partner_gallery WHERE partner_id = ${params.id} ORDER BY sort_order, created_at`,
      sql`SELECT * FROM partner_videos WHERE partner_id = ${params.id} ORDER BY sort_order, created_at`,
      sql`SELECT * FROM partner_portfolio WHERE partner_id = ${params.id} ORDER BY completion_year DESC NULLS LAST`,
      sql`SELECT id, customer_name, phone, requirement, budget_range, status, created_at FROM partner_enquiries WHERE partner_id = ${params.id} ORDER BY created_at DESC LIMIT 20`,
    ]);

    return ok({ partner: { ...partner, gallery, videos, portfolio, enquiries } });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// ── PUT update partner (full update) ─────────────────────────────────────
export async function PUT(request, { params }) {
  const { user, error } = requireOps(request);
  if (error) return error;

  try {
    const b = await request.json();
    if (!b.companyName || !b.category) return fail('companyName and category required');

    const [updated] = await sql`
      UPDATE partners SET
        company_name     = ${b.companyName},
        category         = ${b.category},
        short_description = ${b.shortDescription || null},
        full_description = ${b.fullDescription || null},
        logo_url         = ${b.logoUrl || null},
        cover_url        = ${b.coverUrl || null},
        location         = ${b.location || null},
        service_areas    = ${b.serviceAreas || null},
        years_experience = ${b.yearsExperience ? parseInt(b.yearsExperience) : null},
        contact_person   = ${b.contactPerson || null},
        phone            = ${b.phone || null},
        email            = ${b.email || null},
        whatsapp         = ${b.whatsapp || null},
        website          = ${b.website || null},
        services         = ${b.services || []},
        specializations  = ${b.specializations || []},
        certifications   = ${b.certifications || []},
        brands_handled   = ${b.brands || []},
        project_types    = ${b.projectTypes || []},
        approval_status  = ${b.approvalStatus || 'Pending Review'},
        active           = ${b.isActive === true},
        featured         = ${b.isFeatured === true},
        updated_at       = NOW()
      WHERE id = ${params.id}
      RETURNING id, slug, company_name
    `;

    if (!updated) return NextResponse.json({ success: false, message: 'Partner not found' }, { status: 404 });
    return ok({ partner: updated });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// ── DELETE soft-delete (deactivate) ──────────────────────────────────────
export async function DELETE(request, { params }) {
  const { user, error } = requireOps(request);
  if (error) return error;

  try {
    await sql`UPDATE partners SET active = false, approval_status = 'Suspended', updated_at = NOW() WHERE id = ${params.id}`;
    return ok({ message: 'Partner deactivated' });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
