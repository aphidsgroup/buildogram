import { NextResponse } from 'next/server';
import { prisma as db } from '@/lib/storageProvider';
import { requireAuth } from '@/lib/apiAuth';

export async function GET(req, { params }) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    
    const project = await db.ai_floor_plan_projects.findUnique({
      where: { id: params.id },
      include: {
        versions: { orderBy: { created_at: 'desc' } }
      }
    });

    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Ensure ownership
    if (project.owner_user_id !== user.id && project.partner_id !== user.partner_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    
    const body = await req.json();

    const project = await db.ai_floor_plan_projects.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (project.owner_user_id !== user.id && project.partner_id !== user.partner_id) {
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
    const { user, error } = requireAuth(req);
    if (error) return error;

    const project = await db.ai_floor_plan_projects.findUnique({ where: { id: params.id } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (project.owner_user_id !== user.id && project.partner_id !== user.partner_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await db.ai_floor_plan_projects.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
