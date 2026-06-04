import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';

export async function POST(req, { params }) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const user = auth.user;

    const project = await db.ai_floor_plan_projects.findUnique({
      where: { id: params.id },
      include: {
        versions: {
          where: { id: req.body?.selectedVersionId || undefined }, // if we want to attach a specific version
          orderBy: { created_at: 'desc' },
          take: 1
        }
      }
    });

    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Create a lead in the existing leads table
    const lead = await db.leads.create({
      data: {
        name: user.name || 'AI User',
        email: user.email,
        phone: user.phone || '0000000000', // required by schema usually
        lead_type: 'ai_floor_plan_review',
        source: 'ai_floor_plan_creator',
        status: 'new',
        city: 'Chennai',
        plot_area_sqft: project.plot_width * project.plot_depth,
        floors: project.floors.toString(),
        rough_budget: project.budget_range ? parseFloat(project.budget_range.replace(/[^0-9.]/g, '')) * 100000 : null,
        metadata: {
          aiProjectId: project.id,
          plotSize: `${project.plot_width}x${project.plot_depth}`,
          facing: project.facing,
          buildingType: project.building_type,
          selectedVersionId: project.selected_version_id
        },
        message: 'Requested Engineer Review for AI-generated Floor Plan',
      }
    });

    // Update the project with lead_id
    await db.ai_floor_plan_projects.update({
      where: { id: project.id },
      data: { lead_id: lead.id, status: 'review_requested' }
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Error requesting review:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
