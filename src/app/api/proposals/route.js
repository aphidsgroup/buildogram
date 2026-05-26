import { NextResponse } from 'next/server';
import { proposals } from '@/lib/storageProvider';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const leadId = searchParams.get('leadId');
  const data = await proposals.getAll(leadId ? { leadId } : {});
  return NextResponse.json({ success: true, data });
}

export async function POST(request) {
  const body = await request.json();
  const data = await proposals.create(body);
  return NextResponse.json({ success: true, data });
}
