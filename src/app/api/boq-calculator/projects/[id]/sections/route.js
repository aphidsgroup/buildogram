// PUT /api/boq-calculator/projects/[id]/sections
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

const OPS_ROLES = ['ops_admin', 'ops_pm', 'ops_engineer'];

export async function PUT(req, { params }) {
  const user = getUserFromRequest(req);
  if (!user || !OPS_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const { section_key, data_json } = await req.json();
    if (!section_key) return NextResponse.json({ error: 'section_key required' }, { status: 400 });

    const record = await prisma.boq_section_data.upsert({
      where: { project_id_section_key: { project_id: id, section_key } },
      create: {
        project_id: id,
        section_key,
        data_json: data_json || {},
        version: 1,
      },
      update: {
        data_json: data_json || {},
        version: { increment: 1 },
        updated_at: new Date(),
      },
    });

    await prisma.boq_project.update({
      where: { id },
      data: { updated_at: new Date() },
    });

    return NextResponse.json({ section: record });
  } catch (err) {
    console.error('[BOQ] upsert section error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
