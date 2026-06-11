import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const project = await prisma.boq_project.findFirst({
      where: { title: 'BOQ_Demo_Input_Kinathukadavu' },
      include: { sections: true, rates: true },
      orderBy: { created_at: 'desc' },
    });

    if (!project) {
      return Response.json({ error: 'Demo project not found. Please ensure the demo project is saved in the Ops BOQ workstation.' }, { status: 404 });
    }

    // Build section map
    const secMap = {};
    for (const s of project.sections) {
      secMap[s.section_key] = s.data_json;
    }

    return Response.json({
      projectName: project.title,
      clientName:  project.client_name  || 'Demo Client',
      address:     project.plot_address || 'Kinathukadavu, Coimbatore',
      floorConfig: project.floor_config || 'G',
      marginPct:   Number(project.margin_pct) || 12,
      sections:    secMap,
      rateOverrides: project.rates.map(r => ({
        sno: r.sno, rateGFloor: Number(r.rate_g), rate1st: Number(r.rate_1st),
        rate2nd: Number(r.rate_2nd), rate3rd: Number(r.rate_3rd), rateAvg: Number(r.rate_avg),
      })),
    });
  } catch (err) {
    console.error('[demo API]', err);
    return Response.json({ error: 'Failed to load demo data' }, { status: 500 });
  }
}
