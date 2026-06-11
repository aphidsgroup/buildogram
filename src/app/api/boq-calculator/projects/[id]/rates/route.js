// PUT /api/boq-calculator/projects/[id]/rates
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
    const { rates } = await req.json();
    if (!Array.isArray(rates)) return NextResponse.json({ error: 'rates array required' }, { status: 400 });

    const ops = rates.map((r) =>
      prisma.boq_project_rate.upsert({
        where: { project_id_sno: { project_id: id, sno: r.sno } },
        create: {
          project_id: id,
          sno: r.sno,
          category: r.category || null,
          description: r.description || null,
          unit: r.unit || null,
          rate_g:   parseFloat(r.rate_g)   || 0,
          rate_1st: parseFloat(r.rate_1st) || 0,
          rate_2nd: parseFloat(r.rate_2nd) || 0,
          rate_3rd: parseFloat(r.rate_3rd) || 0,
          rate_avg: parseFloat(r.rate_avg) || 0,
        },
        update: {
          rate_g:   parseFloat(r.rate_g)   || 0,
          rate_1st: parseFloat(r.rate_1st) || 0,
          rate_2nd: parseFloat(r.rate_2nd) || 0,
          rate_3rd: parseFloat(r.rate_3rd) || 0,
          rate_avg: parseFloat(r.rate_avg) || 0,
          updated_at: new Date(),
        },
      })
    );

    await prisma.$transaction(ops);
    return NextResponse.json({ ok: true, count: rates.length });
  } catch (err) {
    console.error('[BOQ] upsert rates error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
