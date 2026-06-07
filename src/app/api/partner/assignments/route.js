import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const user = getUserFromRequest(req);
    if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Ensure user has a partner_id
    const [dbUser] = await sql`SELECT partner_id FROM users WHERE id = ${user.id}`;
    if (!dbUser || !dbUser.partner_id) {
      return NextResponse.json({ assignments: [] });
    }

    const assignments = await sql`
      SELECT
        a.id,
        a.lead_source_table,
        a.lead_id,
        a.assignment_status,
        a.assignment_notes,
        a.created_at,
        CASE
          WHEN a.lead_source_table = 'leads' THEN (SELECT row_to_json(l) FROM leads l WHERE l.id = a.lead_id)
          WHEN a.lead_source_table = 'piling_leads' THEN (SELECT row_to_json(pl) FROM piling_leads pl WHERE pl.id = a.lead_id)
          WHEN a.lead_source_table = 'structural_leads' THEN (SELECT row_to_json(sl) FROM structural_leads sl WHERE sl.id = a.lead_id)
          WHEN a.lead_source_table = 'survey_leads' THEN (SELECT row_to_json(sul) FROM survey_leads sul WHERE sul.id = a.lead_id)
          ELSE NULL
        END as lead_data
      FROM partner_lead_assignments a
      WHERE a.partner_id = ${dbUser.partner_id}
      ORDER BY a.created_at DESC
      LIMIT 50
    `;

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Error fetching partner assignments:', error);
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
  }
}
