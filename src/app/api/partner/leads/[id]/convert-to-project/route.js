import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requirePartner, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

export async function POST(req, { params }) {
  try {
    const { user } = await requirePartner(req);
    const [u] = await sql`SELECT partner_id FROM users WHERE id = ${user.id} LIMIT 1`;
    if (!u || !u.partner_id) return fail('Not a partner', 403);

    const { id } = await params;
    
    // Fetch lead to verify ownership and existence
    const [lead] = await sql`SELECT * FROM leads WHERE id = ${id} AND assigned_partner_id = ${u.partner_id}`;
    if (!lead) return fail('Lead not found or unauthorized', 404);

    if (lead.status !== 'won') {
      return fail('Only won leads can be converted to projects', 400);
    }

    // Auto-create project using lead details
    const [project] = await sql`
      INSERT INTO partner_projects (
        partner_id, project_name, client_name, location, project_type, status, budget, start_date
      ) VALUES (
        ${u.partner_id},
        ${lead.locality ? lead.name + ' - ' + lead.locality : lead.name + ' Project'},
        ${lead.name},
        ${lead.locality || lead.city},
        ${lead.lead_type},
        'Planning',
        ${lead.rough_budget || lead.estimated_cost_max || null},
        CURRENT_DATE
      ) RETURNING id, project_name
    `;

    // Optionally mark the lead as converted in metadata (we don't have converted_project_id natively)
    const newMetadata = { ...(lead.metadata || {}), converted_partner_project_id: project.id };
    await sql`UPDATE leads SET metadata = ${newMetadata}::jsonb WHERE id = ${id}`;

    return ok({ project });
  } catch (err) {
    console.error('[convert-to-project POST]', err);
    return fail('Internal Server Error', 500);
  }
}
