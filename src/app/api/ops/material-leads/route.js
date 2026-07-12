import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth/permissions';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await requirePermission('view_leads');
    const data = await prisma.material_leads.findMany({ orderBy: { created_at: 'desc' }, take: 500 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const status = error.message === 'Unauthorized' ? 401 : error.message.startsWith('Forbidden') ? 403 : 500;
    return NextResponse.json({ success: false, error: status === 500 ? 'Internal server error' : error.message }, { status });
  }
}
