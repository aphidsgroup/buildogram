import { NextResponse } from 'next/server';
import { projectRequirements } from '@/lib/storageProvider';
import { requireOps } from '@/lib/apiAuth';

export async function GET(request) {
  const { error } = requireOps(request);
  if (error) return error;
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId');
  const data = await projectRequirements.getAll(leadId ? { leadId } : {});
  return NextResponse.json({ success: true, data });
}

export async function POST(request) {
  const { user, error } = requireOps(request);
  if (error) return error;
  const body = await request.json();
  if (!body.leadId) return NextResponse.json({ error: 'Lead is required' }, { status: 400 });
  const data = await projectRequirements.create({
    leadId: body.leadId,
    requirementType: body.requirementType || null,
    projectLocation: body.projectLocation || null,
    currentStage: body.currentStage || 'Requirement Collected',
    plotSize: body.plotSize || null,
    budgetRange: body.budgetRange || null,
    scopeSummary: body.scopeSummary || null,
    createdBy: user.id,
  });
  return NextResponse.json({ success: true, data });
}
