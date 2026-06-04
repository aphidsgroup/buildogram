import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { generateFloorPlans } from '@/lib/ai-floor-plan/generator';
import { deductCredits } from '@/lib/ai-floor-plan/credits';

export async function POST(req) {
  try {
    const { user, error } = requireAuth(req);
    if (error) return error;
    
    const body = await req.json();
    const projectId = body.projectId;
    
    if (!projectId) return NextResponse.json({ error: 'Project ID required' }, { status: 400 });

    const project = await db.ai_floor_plan_projects.findUnique({ where: { id: projectId } });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    // Deduct credit
    const creditRes = await deductCredits(user.id, user.partner_id, 1.0, 'Floor Plan Generation', projectId);
    if (!creditRes.success) {
      return NextResponse.json({ error: creditRes.error || 'Insufficient credits' }, { status: 402 });
    }

    // Log generation start
    const generationLog = await db.ai_floor_plan_generations.create({
      data: {
        project_id: projectId,
        prompt: body.prompt || 'Initial generation',
        status: 'processing'
      }
    });

    // Generate
    const projectInput = { ...project, prompt: body.prompt };
    const plans = await generateFloorPlans(projectInput);

    // Save versions
    const savedVersions = [];
    for (const plan of plans) {
      const v = await db.ai_floor_plan_versions.create({
        data: {
          project_id: projectId,
          version_name: plan.name || 'AI Concept',
          option_type: plan.id || 'option',
          plan_json: plan,
          summary_json: plan.summary || {},
          created_by: user.id
        }
      });
      savedVersions.push(v);
    }

    // Mark completion
    await db.ai_floor_plan_generations.update({
      where: { id: generationLog.id },
      data: { status: 'completed', completed_at: new Date() }
    });

    // Update project selected version if none selected
    if (!project.selected_version_id && savedVersions.length > 0) {
      await db.ai_floor_plan_projects.update({
        where: { id: projectId },
        data: { selected_version_id: savedVersions[0].id }
      });
    }

    return NextResponse.json({ success: true, versions: savedVersions });
  } catch (error) {
    console.error('Generation API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
