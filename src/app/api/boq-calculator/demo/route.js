import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Tier 1: exact match
    let project = await prisma.boq_project.findFirst({
      where: { title: 'BOQ_Demo_Input_Kinathukadavu' },
      include: { sections: true, rates: true },
      orderBy: { created_at: 'desc' },
    });

    // Tier 2: case-insensitive contains "Kinathukadavu"
    if (!project) {
      project = await prisma.boq_project.findFirst({
        where: { title: { contains: 'Kinathukadavu', mode: 'insensitive' } },
        include: { sections: true, rates: true },
        orderBy: { created_at: 'desc' },
      });
    }

    // Tier 3: case-insensitive contains "Demo"
    if (!project) {
      project = await prisma.boq_project.findFirst({
        where: { title: { contains: 'Demo', mode: 'insensitive' } },
        include: { sections: true, rates: true },
        orderBy: { created_at: 'desc' },
      });
    }

    // Debug: if still not found, return list of all project titles so we can identify the mismatch
    if (!project) {
      const allProjects = await prisma.boq_project.findMany({
        select: { id: true, title: true, created_at: true },
        orderBy: { created_at: 'desc' },
        take: 20,
      });
      return Response.json(
        {
          error: 'Demo project not found.',
          hint: 'No project matching "Kinathukadavu" or "Demo" was found in the database.',
          existingProjects: allProjects.map(p => ({ id: p.id, title: p.title })),
        },
        { status: 404 }
      );
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
    return Response.json({ error: 'Failed to load demo data', detail: err.message }, { status: 500 });
  }
}
