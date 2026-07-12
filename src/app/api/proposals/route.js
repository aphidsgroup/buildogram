import { NextResponse } from 'next/server';
import { proposals } from '@/lib/storageProvider';
import { requireOps } from '@/lib/apiAuth';

export async function GET(request) {
  const { error } = requireOps(request);
  if (error) return error;
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId');
  const data = await proposals.getAll(leadId ? { leadId } : {});
  return NextResponse.json({ success: true, data });
}

export async function POST(request) {
  const { user, error } = requireOps(request);
  if (error) return error;
  const body = await request.json();
  if (!body.leadId || !body.title) {
    return NextResponse.json({ error: 'Lead and title are required' }, { status: 400 });
  }
  const data = await proposals.create({
    leadId: body.leadId,
    title: String(body.title).slice(0, 200),
    proposalType: body.proposalType || null,
    proposalStatus: body.proposalStatus || 'draft',
    summary: body.summary || null,
    scopeOfWork: body.scopeOfWork || null,
    estimatedValue: body.estimatedValue || null,
    timeline: body.timeline || null,
    paymentTerms: body.paymentTerms || null,
    exclusions: body.exclusions || null,
    createdBy: user.id,
  });
  return NextResponse.json({ success: true, data });
}
