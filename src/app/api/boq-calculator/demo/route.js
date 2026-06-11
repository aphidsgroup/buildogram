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

    // If not found in DB, return a hardcoded realistic demo project 
    // so the public page button always works.
    if (!project) {
      return Response.json({
        projectName: 'BOQ Demo — Kinathukadavu',
        clientName: 'Demo Client',
        address: 'Kinathukadavu, Coimbatore',
        floorConfig: 'G+1',
        marginPct: 12,
        sections: {
          floors: [
            { floorLabel: 'Ground', length: 12, breadth: 15, area: 1937.5 },
            { floorLabel: '1st', length: 12, breadth: 15, area: 1937.5 }
          ],
          foundation: [{ nos: 12, footingL: 1.5, footingB: 1.5, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.5, colL: 0.23, colB: 0.38, colD: 3, floorIdx: 0 }],
          plinthBeam: [{ label: 'PB-1', length: 80, breadth: 0.23, depth: 0.45 }],
          slabConcrete: [
            { floorLabel: 'Ground', beamL: 80, beamB: 0.23, beamD: 0.45, slabArea: 180, slabD: 0.125 },
            { floorLabel: '1st', beamL: 80, beamB: 0.23, beamD: 0.45, slabArea: 180, slabD: 0.125 }
          ],
          brickwork9: [
            { floorLabel: 'Ground Floor', length: 54, height: 3, doorOpens: [{L:1,H:2.1,nos:2}], windowOpens: [{L:1.5,H:1.2,nos:4}] },
            { floorLabel: '1st Floor', length: 54, height: 3, doorOpens: [{L:1,H:2.1,nos:1}], windowOpens: [{L:1.5,H:1.2,nos:5}] }
          ],
          brickwork4: [
            { floorLabel: 'Ground Floor', length: 35, height: 3, doorOpens: [{L:0.9,H:2.1,nos:3}], windowOpens: [] },
            { floorLabel: '1st Floor', length: 40, height: 3, doorOpens: [{L:0.9,H:2.1,nos:4}], windowOpens: [] }
          ],
          tileWork: { flooringArea: 280, bathroomFloorArea: 24, parkingArea: 40, kitchenWallArea: 20, bathroomWallArea: 48, skirtingLength: 200, graniteArea: 15 },
          doorsWindows: [{ type: 'main_door', nos: 1 }, { type: 'room_door', nos: 7 }, { type: 'pvc_door', nos: 5 }, { type: 'pooja_door', nos: 1 }],
          staircase: { width: 1.2, tread: 0.3, riser: 0.15, noOfSteps: 20, graniteArea: 12, handrailLength: 12, concreteL: 4.5, concreteB: 1.2, concreteD: 0.15 },
          mepOthers: { terraceArea: 180 },
          addlWorks: [
            { description: 'Underground Water Sump (8000L)', unit: 'Nos', quantity: 1, rate: 65000 },
            { description: 'Septic Tank (2-chamber RCC)', unit: 'Nos', quantity: 1, rate: 45000 }
          ],
        },
        rateOverrides: []
      });
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
