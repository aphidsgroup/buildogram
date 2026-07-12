// POST /api/boq-calculator/projects/[id]/export
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

const OPS_ROLES = ['ops_admin', 'ops_pm', 'ops_engineer'];

export async function POST(req, { params }) {
  const user = getUserFromRequest(req);
  if (!user || !OPS_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    const { snapshot, format } = await req.json();

    const log = await prisma.boq_export_log.create({
      data: {
        project_id:  id,
        exported_by: user.id || null,
        format:      format || 'pdf',
        snapshot:    snapshot || null,
      },
    });

    return NextResponse.json({ log }, { status: 201 });
  } catch (err) {
    console.error('[BOQ] export log error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
