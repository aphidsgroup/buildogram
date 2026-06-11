// POST /api/boq-calculator/projects/[id]/calculate
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { computeBoq } from '@/lib/boq-calc/engine';
import { buildRateMap } from '@/lib/boq-calc/rates';

const OPS_ROLES = ['ops_admin', 'ops_pm', 'ops_engineer'];

export async function POST(req, { params }) {
  const user = getUserFromRequest(req);
  if (!user || !OPS_ROLES.includes(user.role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  try {
    const body = await req.json();
    const { inputs, marginPct } = body;

    // Load per-project rate overrides from DB
    const dbRates = await prisma.boq_project_rate.findMany({ where: { project_id: id } });

    const overrides = dbRates.map((r) => ({
      sno:        r.sno,
      rateGFloor: parseFloat(r.rate_g),
      rate1st:    parseFloat(r.rate_1st),
      rate2nd:    parseFloat(r.rate_2nd),
      rate3rd:    parseFloat(r.rate_3rd),
      rateAvg:    parseFloat(r.rate_avg),
    }));

    const rateMap = buildRateMap(overrides);
    const result  = computeBoq(inputs || {}, rateMap, parseFloat(marginPct) || 12);

    // Update project total_builtup
    await prisma.boq_project.update({
      where: { id },
      data: {
        total_builtup: result.buildingEstimate,
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ result });
  } catch (err) {
    console.error('[BOQ] calculate error:', err);
    return NextResponse.json({ error: 'Calculation failed', detail: err.message }, { status: 500 });
  }
}
