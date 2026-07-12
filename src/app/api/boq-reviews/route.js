import { NextResponse } from 'next/server';
import { boqReviews } from '@/lib/storageProvider';
import { requireOps } from '@/lib/apiAuth';

export async function GET(request) {
  const { error } = requireOps(request);
  if (error) return error;
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId');
  const data = await boqReviews.getAll(leadId ? { leadId } : {});
  return NextResponse.json({ success: true, data });
}

export async function POST(request) {
  const { user, error } = requireOps(request);
  if (error) return error;
  const body = await request.json();
  if (!body.leadId) return NextResponse.json({ error: 'Lead is required' }, { status: 400 });
  const data = await boqReviews.create({
    leadId: body.leadId,
    reviewStatus: body.reviewStatus || 'under_review',
    projectType: body.projectType || null,
    builtUpArea: body.builtUpArea || null,
    drawingStatus: body.drawingStatus || null,
    boqStatus: body.boqStatus || null,
    engineerSummary: body.engineerSummary || null,
    riskItems: body.riskItems || null,
    missingItems: body.missingItems || null,
    costObservation: body.costObservation || null,
    reviewNotes: body.reviewNotes || null,
    createdBy: user.id,
  });
  return NextResponse.json({ success: true, data });
}
