import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireAuth, requireOps, ok, fail } from '@/lib/apiAuth';

export const dynamic = 'force-dynamic';

// PATCH /api/issues/[id] — update issue status, priority, resolution
export async function PATCH(req, { params }) {
  const { user, error } = requireAuth(req);
  if (error) return error;
  const { id } = await params;

  try {
    const b = await req.json();
    const updates = {};
    if (b.status)     updates.status = b.status;
    if (b.priority)   updates.priority = b.priority;
    if (b.resolution) updates.resolution_note = b.resolution;
    if (b.title)      updates.title = b.title;
    if (b.description !== undefined) updates.description = b.description;

    if (Object.keys(updates).length === 0) return fail('No valid fields to update');

    // Build SQL update dynamically (safe — only whitelisted fields)
    const fields = Object.keys(updates);
    let query = 'UPDATE issues SET ';
    const values = [];
    fields.forEach((f, i) => {
      query += `${f} = $${i + 1}`;
      if (i < fields.length - 1) query += ', ';
      values.push(updates[f]);
    });
    query += `, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING id, status`;
    values.push(id);

    const [updated] = await sql.unsafe(query, values);
    if (!updated) return fail('Issue not found', 404);
    return ok({ issue: updated });
  } catch (e) {
    // Graceful fallback — localStorage handles it on the client
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

// GET /api/issues/[id]
export async function GET(req, { params }) {
  const { user, error } = requireAuth(req);
  if (error) return error;
  const { id } = await params;
  try {
    const [issue] = await sql`SELECT i.*, u.name as raised_by_name FROM issues i LEFT JOIN users u ON u.id = i.raised_by WHERE i.id = ${id}`;
    if (!issue) return fail('Issue not found', 404);
    return ok({ issue });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}
