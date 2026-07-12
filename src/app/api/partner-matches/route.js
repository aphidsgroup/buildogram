import { NextResponse } from 'next/server';
import { partnerMatches } from '@/lib/storageProvider';
import { requireOps } from '@/lib/apiAuth';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request) {
  const { error } = requireOps(request);
  if (error) return error;
  const leadId = new URL(request.url).searchParams.get('leadId');
  if (leadId && !UUID_PATTERN.test(leadId)) {
    return NextResponse.json({ error: 'Invalid lead identifier' }, { status: 400 });
  }
  const data = await partnerMatches.getAll(leadId ? { leadId } : {});
  return NextResponse.json({ success: true, data });
}

export async function POST(request) {
  const { user, error } = requireOps(request);
  if (error) return error;
  const body = await request.json();
  if (!UUID_PATTERN.test(body.leadId || '') || !UUID_PATTERN.test(body.partnerId || '')) {
    return NextResponse.json({ error: 'Valid lead and partner identifiers are required' }, { status: 400 });
  }
  const data = await partnerMatches.create({
    leadId: body.leadId,
    partnerId: body.partnerId,
    partnerType: body.partnerType || null,
    matchStatus: 'shortlisted',
    createdBy: user.id,
  });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
