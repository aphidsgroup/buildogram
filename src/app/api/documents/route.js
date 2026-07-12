import { NextResponse } from 'next/server';
import { documentAssets } from '@/lib/storageProvider';
import { requireOps } from '@/lib/apiAuth';

export async function GET(req) {
  const { error } = requireOps(req);
  if (error) return error;
  const url = new URL(req.url);
  const leadId = url.searchParams.get('leadId');
  const requirementId = url.searchParams.get('requirementId');
  
  const filters = {};
  if (leadId) filters.leadId = leadId;
  if (requirementId) filters.requirementId = requirementId;

  try {
    const docs = await documentAssets.getAll(filters);
    return NextResponse.json({ success: true, data: docs });
  } catch (error) {
    console.error('Documents GET error:', error);
    return NextResponse.json({ success: false, error: 'Unable to load documents' }, { status: 500 });
  }
}
