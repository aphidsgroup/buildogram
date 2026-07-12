import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { isOpsRole, isPartnerRole, PROJECT_MUTATION_ROLES, ROLES } from '@/lib/roles';

export async function GET(req) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let projects;
  if (isOpsRole(user.role)) {
    projects = await sql`
      SELECT p.*, c.name AS client_name, pm.name AS pm_name
      FROM projects p
      LEFT JOIN users c ON c.id = p.client_id
      LEFT JOIN users pm ON pm.id = p.pm_id
      ORDER BY p.created_at DESC
    `;
  } else if (user.role === ROLES.CLIENT_USER) {
    projects = await sql`
      SELECT p.*, pm.name AS pm_name
      FROM projects p
      LEFT JOIN users pm ON pm.id = p.pm_id
      WHERE p.client_id = ${user.id}
      ORDER BY p.created_at DESC
    `;
  } else if (isPartnerRole(user.role) && user.partner_id) {
    projects = await sql`
      SELECT p.*, c.name AS client_name, pm.name AS pm_name
      FROM projects p
      LEFT JOIN users c ON c.id = p.client_id
      LEFT JOIN users pm ON pm.id = p.pm_id
      WHERE p.linked_partner_id = ${user.partner_id}
      ORDER BY p.created_at DESC
    `;
  } else {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({ projects });
}

export async function POST(req) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!PROJECT_MUTATION_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  if (!body.name || !body.client_id) {
    return NextResponse.json({ error: 'Project name and client are required' }, { status: 400 });
  }

  const [project] = await sql`
    INSERT INTO projects(
      lead_id, client_id, pm_id, site_engineer_id, name, address, city, locality,
      plot_area_sqft, built_up_area_sqft, floors, spec_level, start_date,
      expected_end_date, total_contract_value, status
    ) VALUES (
      ${body.lead_id || null}, ${body.client_id}, ${body.pm_id || null},
      ${body.site_engineer_id || null}, ${String(body.name).slice(0, 200)},
      ${body.address || null}, ${body.city || 'Chennai'}, ${body.locality || null},
      ${body.plot_area_sqft || null}, ${body.built_up_area_sqft || null},
      ${body.floors || null}, ${body.spec_level || null}, ${body.start_date || null},
      ${body.expected_end_date || null}, ${body.total_contract_value || null}, 'design'
    ) RETURNING *
  `;
  return NextResponse.json({ project }, { status: 201 });
}
