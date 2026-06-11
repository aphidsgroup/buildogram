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

    // Hardcoded fallback — Kinathukadavu G+1 residential (corrected to actual footprint)
    // Floor: 12.75 m × 8.38 m = 106.84 m² = 1,148.5 sqft per floor  (was wrong 12×15=1937)
    if (!project) {
      return Response.json({
        projectName: 'BOQ Demo — Kinathukadavu',
        clientName:  'Demo Client',
        address:     'Kinathukadavu, Coimbatore',
        floorConfig: 'G+1',
        marginPct:   12,
        sections: {
          floors: [
            { floorLabel: 'Ground', length: 12.75, breadth: 8.38, area: 1148.52 },
            { floorLabel: '1st',    length: 12.75, breadth: 8.38, area: 1148.52 },
          ],
          // 12 footings — 4 types per structural drawing
          foundation: [
            { nos: 2, footingL: 1.07, footingB: 1.07, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.23, colB: 0.23, colD: 3.0, floorIdx: 0 },
            { nos: 5, footingL: 1.22, footingB: 1.22, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.23, colB: 0.38, colD: 3.0, floorIdx: 0 },
            { nos: 3, footingL: 1.37, footingB: 1.37, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.23, colB: 0.38, colD: 3.0, floorIdx: 0 },
            { nos: 2, footingL: 1.52, footingB: 1.52, footingDepth: 1.5, pccThickness: 0.1, footingConcreteD: 0.45, colL: 0.30, colB: 0.45, colD: 3.0, floorIdx: 0 },
          ],
          plinthBeam: [
            { label: 'PB-1', length: 56, breadth: 0.23, depth: 0.45 },
          ],
          slabConcrete: [
            { floorLabel: 'Ground', beamL: 56, beamB: 0.23, beamD: 0.45, slabArea: 106.84, slabD: 0.125 },
            { floorLabel: '1st',    beamL: 56, beamB: 0.23, beamD: 0.45, slabArea: 106.84, slabD: 0.125 },
          ],
          brickwork9: [
            {
              floorLabel: 'Ground Floor', length: 42.26, height: 3.0,
              doorOpens:   [{ L: 1.0, H: 2.1, nos: 1 }, { L: 0.9, H: 2.1, nos: 1 }],
              windowOpens: [{ L: 1.5, H: 1.2, nos: 3 }, { L: 1.2, H: 1.2, nos: 2 }],
            },
            {
              floorLabel: '1st Floor', length: 42.26, height: 3.0,
              doorOpens:   [{ L: 0.9, H: 2.1, nos: 1 }],
              windowOpens: [{ L: 1.5, H: 1.2, nos: 4 }, { L: 1.2, H: 1.2, nos: 2 }],
            },
          ],
          brickwork4: [
            { floorLabel: 'Ground Floor', length: 28, height: 3.0, doorOpens: [{ L: 0.9, H: 2.1, nos: 3 }], windowOpens: [] },
            { floorLabel: '1st Floor',    length: 32, height: 3.0, doorOpens: [{ L: 0.9, H: 2.1, nos: 4 }], windowOpens: [] },
          ],
          tileWork: {
            flooringArea:     160,
            bathroomFloorArea: 18,
            parkingArea:       20,
            kitchenWallArea:   15,
            bathroomWallArea:  36,
            skirtingLength:   150,
            graniteArea:       10,
          },
          doorsWindows: [
            { type: 'main_door',  nos: 1 },
            { type: 'room_door',  nos: 4 },
            { type: 'pvc_door',   nos: 3 },
            { type: 'pooja_door', nos: 1 },
          ],
          staircase: {
            width: 1.2, tread: 0.28, riser: 0.17, noOfSteps: 18,
            graniteArea: 10, handrailLength: 10,
            concreteL: 4.0, concreteB: 1.2, concreteD: 0.15,
          },
          mepOthers: { terraceArea: 1148 },   // sqft — one floor for terrace WP
          premiumItems: {
            compoundWallLength: 48,           // RM boundary wall
            numBathrooms:        3,           // sanitaryware sets
            electricalPoints:   55,           // light+fan+switch points
            numOHTanks:          1,
            borewellDepth:      180,          // RFT
            kitchenPlatformRM:   4,           // RM
            bbsSteelOverride:  5068,          // kg — from actual BBS drawing
            upvcWindowsSqft:     0,           // auto from brickwork windows
            externalDevArea:    22,           // m² driveway + garden path (auto ≈20% gf footprint)
            contingencyPct:      5,
            prelimsPct:          3,
            architectFeePct:     3,           // 3% of civil base for arch + structural engineer
            gstPct:              5,           // GST 5% on residential construction services
          },
          addlWorks: [
            { description: 'Underground Water Sump (5000L)',   unit: 'Nos', quantity: 1, rate: 45000 },
            { description: 'Septic Tank (2-chamber RCC)',      unit: 'Nos', quantity: 1, rate: 35000 },
          ],
        },
        rateOverrides: [],
      });
    }

    // Build section map from DB result
    const secMap = {};
    for (const s of project.sections) {
      secMap[s.section_key] = s.data_json;
    }

    return Response.json({
      projectName:   project.title,
      clientName:    project.client_name  || 'Demo Client',
      address:       project.plot_address || 'Kinathukadavu, Coimbatore',
      floorConfig:   project.floor_config || 'G',
      marginPct:     Number(project.margin_pct) || 12,
      sections:      secMap,
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
