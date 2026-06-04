import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';

export async function GET(req, { params }) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const project = await db.ai_floor_plan_projects.findUnique({
      where: { id: params.id },
      include: {
        versions: { orderBy: { created_at: 'desc' } }
      }
    });

    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Ensure ownership
    if (project.owner_user_id !== auth.user.id && project.partner_id !== auth.user.partner_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await req.json();

    const project = await db.ai_floor_plan_projects.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (project.owner_user_id !== auth.user.id && project.partner_id !== auth.user.partner_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updated = await db.ai_floor_plan_projects.update({
      where: { id: params.id },
      data: body
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const project = await db.ai_floor_plan_projects.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (project.owner_user_id !== auth.user.id && project.partner_id !== auth.user.partner_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await db.ai_floor_plan_projects.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
