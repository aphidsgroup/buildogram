import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getActiveUserFromRequest } from '@/lib/auth/currentUser';
import { isOpsRole, isPartnerRole, PROJECT_MUTATION_ROLES, ROLES } from '@/lib/roles';

const PROJECT_STATUSES = new Set(['design', 'planning', 'active', 'in_progress', 'on_hold', 'completed', 'cancelled']);
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function canViewProject(user, project) {
  if (isOpsRole(user.role)) return true;
  if (user.role === ROLES.CLIENT_USER) return project.client_id === user.id;
  if (isPartnerRole(user.role)) return Boolean(user.partner_id && project.linked_partner_id === user.partner_id);
  return false;
}

export async function GET(req, { params }) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const [project] = await sql`
    SELECT p.*, c.name AS client_name, c.email AS client_email, c.phone AS client_phone,
      pm.name AS pm_name, pm.phone AS pm_phone, se.name AS engineer_name
    FROM projects p
    LEFT JOIN users c ON c.id = p.client_id
    LEFT JOIN users pm ON pm.id = p.pm_id
    LEFT JOIN users se ON se.id = p.site_engineer_id
    WHERE p.id = ${id}
  `;
  if (!project || !canViewProject(user, project)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const milestones = await sql`SELECT * FROM milestones WHERE project_id = ${id} ORDER BY order_no`;
  if (user.role === ROLES.CLIENT_USER) {
    const documents = await sql`
      SELECT id, project_id, name, type, file_url, version, created_at, requires_consent, consent_status
      FROM documents
      WHERE project_id = ${id} AND is_shared_with_client = true
      ORDER BY created_at DESC
    `;
    const safeProject = { ...project };
    delete safeProject.notes;
    return NextResponse.json({
      project: safeProject,
      milestones,
      logs: [],
      issues: [],
      documents,
      changeOrders: [],
    });
  }

  const logs = await sql`
    SELECT pl.*, u.name AS logged_by_name
    FROM progress_logs pl
    LEFT JOIN users u ON u.id = pl.logged_by
    WHERE pl.project_id = ${id}
    ORDER BY pl.log_date DESC LIMIT 20
  `;
  const issues = await sql`
    SELECT i.*, u.name AS raised_by_name
    FROM issues i LEFT JOIN users u ON u.id = i.raised_by
    WHERE i.project_id = ${id} ORDER BY i.created_at DESC
  `;
  const documents = await sql`SELECT * FROM documents WHERE project_id = ${id} ORDER BY created_at DESC`;
  const changeOrders = await sql`
    SELECT c.*, u.name AS created_by_name
    FROM change_orders c LEFT JOIN users u ON u.id = c.created_by
    WHERE c.project_id = ${id} ORDER BY c.created_at DESC
  `;
  return NextResponse.json({ project, milestones, logs, issues, documents, changeOrders });
}

export async function PUT(req, { params }) {
  const user = await getActiveUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!PROJECT_MUTATION_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const status = body.status ?? null;
  const completion = body.completion_pct == null ? null : Number(body.completion_pct);
  const pmId = body.pm_id ?? null;

  if (status !== null && !PROJECT_STATUSES.has(status)) {
    return NextResponse.json({ error: 'Invalid project status' }, { status: 400 });
  }
  if (completion !== null && (!Number.isFinite(completion) || completion < 0 || completion > 100)) {
    return NextResponse.json({ error: 'Completion must be between 0 and 100' }, { status: 400 });
  }
  if (pmId !== null && !UUID_PATTERN.test(pmId)) {
    return NextResponse.json({ error: 'Invalid project manager identifier' }, { status: 400 });
  }

  const [updated] = await sql`
    UPDATE projects SET
      status = COALESCE(${status}, status),
      completion_pct = COALESCE(${completion}::numeric, completion_pct),
      pm_id = COALESCE(${pmId}::uuid, pm_id),
      cover_image_url = COALESCE(${body.cover_image_url || null}, cover_image_url),
      notes = COALESCE(${body.notes || null}, notes),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, status, completion_pct, pm_id, updated_at
  `;
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, project: updated });
}
