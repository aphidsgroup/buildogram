import { NextResponse } from 'next/server';
import { prisma as db } from '@/lib/storageProvider';
import { requireAuth } from '@/lib/apiAuth';

export async function GET(req, { params }) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;

    const versions = await db.ai_floor_plan_versions.findMany({
      where: { project_id: (await params).id },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json(versions);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    
    const body = await req.json();

    const newVersion = await db.ai_floor_plan_versions.create({
      data: {
        project_id: (await params).id,
        version_name: body.versionName || 'New Version',
        option_type: body.optionType,
        plan_json: body.planJson,
        summary_json: body.summaryJson || {},
        created_by: auth.user.id
      }
    });

    // Update project selected version
    await db.ai_floor_plan_projects.update({
      where: { id: (await params).id },
      data: { selected_version_id: newVersion.id }
    });

    return NextResponse.json(newVersion);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
