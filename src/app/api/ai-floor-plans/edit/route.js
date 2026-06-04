import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { requireAuth } from '@/lib/apiAuth';
import { parseConversationalEdit } from '@/lib/ai-floor-plan/editor';
import { deductCredits } from '@/lib/ai-floor-plan/credits';

export async function POST(req) {
  try {
    const auth = await requireAuth(req);
    if (!auth.success) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await req.json();
    const versionId = body.versionId;
    const prompt = body.prompt;

    if (!versionId || !prompt) {
      return NextResponse.json({ error: 'Version ID and prompt required' }, { status: 400 });
    }

    const version = await db.ai_floor_plan_versions.findUnique({ where: { id: versionId } });
    if (!version) return NextResponse.json({ error: 'Version not found' }, { status: 404 });

    // Deduct 0.25 credits
    const creditRes = await deductCredits(auth.user.id, auth.user.partner_id, 0.25, 'Floor Plan Edit', version.project_id);
    if (!creditRes.success) {
      return NextResponse.json({ error: creditRes.error || 'Insufficient credits' }, { status: 402 });
    }

    // Apply edits
    const updatedPlanJson = await parseConversationalEdit(prompt, version.plan_json);

    // Save as new version
    const newVersion = await db.ai_floor_plan_versions.create({
      data: {
        project_id: version.project_id,
        version_name: `${version.version_name} (Edited)`,
        option_type: version.option_type,
        plan_json: updatedPlanJson,
        summary_json: updatedPlanJson.summary || {},
        created_by: auth.user.id
      }
    });

    // Update project selected version
    await db.ai_floor_plan_projects.update({
      where: { id: version.project_id },
      data: { selected_version_id: newVersion.id }
    });

    return NextResponse.json({ success: true, newVersion });
  } catch (error) {
    console.error('Edit API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
