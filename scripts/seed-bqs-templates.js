import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const starterCategories = [
  {
    name: "Foundation Checks",
    stage: "foundation",
    items: [
      { text: "Verify foundation pit dimensions as per drawing", method: "measurement", proof: "photo", severity: "high" },
      { text: "Check soil bearing capacity (SBC) report availability", method: "document_review", proof: "document", severity: "critical" },
      { text: "Anti-termite treatment done before PCC", method: "visual", proof: "photo", severity: "medium" },
      { text: "PCC mix ratio and thickness verified", method: "measurement", proof: "photo", severity: "high" },
      { text: "Curing of PCC for minimum 3 days", method: "visual", proof: "remark", severity: "medium" },
      { text: "Footing reinforcement layout as per structural drawing", method: "measurement", proof: "photo", severity: "critical" },
      { text: "Cover blocks provided for footing mesh", method: "visual", proof: "photo", severity: "high" },
      { text: "Column starter marking and alignment checked", method: "measurement", proof: "photo", severity: "critical" },
      { text: "Concrete pouring temperature and slump test", method: "measurement", proof: "document", severity: "high" },
      { text: "Vibrator used during footing concrete pour", method: "visual", proof: "video", severity: "high" }
    ]
  },
  {
    name: "RCC Structural Checks",
    stage: "structure",
    items: [
      { text: "Column reinforcement steel grade and diameter check", method: "visual", proof: "photo", severity: "critical" },
      { text: "Stirrup spacing and hook angle (135 degrees) verified", method: "measurement", proof: "photo", severity: "critical" },
      { text: "Column shuttering verticality (plumb) check", method: "measurement", proof: "photo", severity: "high" },
      { text: "Beam bottom reinforcement and cover blocks", method: "visual", proof: "photo", severity: "high" },
      { text: "Slab reinforcement mesh spacing and top extra bars", method: "measurement", proof: "photo", severity: "critical" },
      { text: "Concealed electrical conduit layout before slab casting", method: "visual", proof: "photo", severity: "high" },
      { text: "Slab thickness guides (level pads) installed", method: "visual", proof: "photo", severity: "medium" },
      { text: "Concrete cube samples taken for 7 and 28-day testing", method: "measurement", proof: "document", severity: "high" },
      { text: "Curing ponding (bunds) created on slab", method: "visual", proof: "photo", severity: "medium" },
      { text: "Deshuttering time adhered to standard (slab 14 days, beam 21 days)", method: "document_review", proof: "remark", severity: "high" }
    ]
  },
  {
    name: "Masonry Checks",
    stage: "masonry",
    items: [
      { text: "Brick/Block soaking before use (for red bricks)", method: "visual", proof: "video", severity: "medium" },
      { text: "Mortar mix ratio (1:4 or 1:6) verified", method: "visual", proof: "remark", severity: "high" },
      { text: "Wall verticality (plumb bob) check", method: "measurement", proof: "photo", severity: "high" },
      { text: "Maximum wall height cast per day (1.2m to 1.5m)", method: "measurement", proof: "remark", severity: "medium" },
      { text: "Sill concrete band provided at window level", method: "visual", proof: "photo", severity: "high" },
      { text: "Lintel concrete band provided at door level", method: "visual", proof: "photo", severity: "high" },
      { text: "Raking of joints done for plastering grip", method: "visual", proof: "photo", severity: "low" },
      { text: "Curing of masonry walls for minimum 7 days", method: "visual", proof: "remark", severity: "medium" },
      { text: "Chicken mesh applied at column-wall junctions", method: "visual", proof: "photo", severity: "high" },
      { text: "Door/Window frame opening sizes verified", method: "measurement", proof: "measurement", severity: "high" }
    ]
  },
  {
    name: "MEP Checks (Plumbing & Electrical)",
    stage: "mep",
    items: [
      { text: "Concealed plumbing lines pressure test (hydro test)", method: "measurement", proof: "photo", severity: "critical" },
      { text: "Drainage slope (gradient) verified in bathrooms", method: "measurement", proof: "measurement", severity: "high" },
      { text: "Electrical wall chasing depth and horizontal runs avoided", method: "visual", proof: "photo", severity: "medium" },
      { text: "Switchboard heights as per drawing", method: "measurement", proof: "measurement", severity: "medium" },
      { text: "Wire gauge (sqmm) verification for specific loads (AC, Geyser)", method: "visual", proof: "photo", severity: "high" },
      { text: "Earthing pit resistance value measured", method: "measurement", proof: "document", severity: "critical" },
      { text: "MCB/RCCB sizing and brand verification", method: "visual", proof: "photo", severity: "high" },
      { text: "CPVC/UPVC pipe brand and schedule (thickness) verified", method: "visual", proof: "photo", severity: "high" },
      { text: "Bathroom core cutting sealed properly", method: "visual", proof: "photo", severity: "high" },
      { text: "Shaft plumbing alignment and clamping", method: "visual", proof: "photo", severity: "medium" }
    ]
  },
  {
    name: "Waterproofing Checks",
    stage: "waterproofing",
    items: [
      { text: "Surface preparation and cleaning before coating", method: "visual", proof: "photo", severity: "high" },
      { text: "Base coat applied to sunken areas", method: "visual", proof: "photo", severity: "high" },
      { text: "Corner coving (gola) done at floor-wall junction", method: "visual", proof: "photo", severity: "critical" },
      { text: "Waterproof coating applied up to 1-2 feet on walls", method: "measurement", proof: "photo", severity: "high" },
      { text: "Ponding test (water fill) done for 48 hours", method: "visual", proof: "photo", severity: "critical" },
      { text: "No leakage observed from floor below during ponding", method: "visual", proof: "video", severity: "critical" },
      { text: "Terrace waterproofing slope and base coat", method: "visual", proof: "photo", severity: "high" },
      { text: "Terrace ponding test for 72 hours", method: "visual", proof: "photo", severity: "critical" },
      { text: "Protective screed concrete laid over waterproofing", method: "visual", proof: "photo", severity: "high" },
      { text: "Exterior wall crack filling and primer coat", method: "visual", proof: "photo", severity: "medium" }
    ]
  },
  {
    name: "Finishing Checks",
    stage: "finishing",
    items: [
      { text: "Internal wall plastering level (straight edge test)", method: "measurement", proof: "photo", severity: "high" },
      { text: "Ceiling plastering thickness (less than 12mm)", method: "measurement", proof: "remark", severity: "medium" },
      { text: "Floor tile hollow sound check (tapping test)", method: "visual", proof: "video", severity: "high" },
      { text: "Tile joint spacers and epoxy grouting quality", method: "visual", proof: "photo", severity: "medium" },
      { text: "Skirting alignment and height consistency", method: "measurement", proof: "photo", severity: "low" },
      { text: "Wall putty (2 coats) finish and sanding smoothness", method: "visual", proof: "remark", severity: "medium" },
      { text: "Primer and paint coats application (roller marks check)", method: "visual", proof: "photo", severity: "medium" },
      { text: "Door frame plumb and shutter operation (no binding)", method: "visual", proof: "video", severity: "high" },
      { text: "Window sliding tracks smooth and locks functional", method: "visual", proof: "video", severity: "medium" },
      { text: "Bathroom fittings (CP/Sanitary) alignment and flow test", method: "visual", proof: "video", severity: "high" }
    ]
  },
  {
    name: "Handover Checks",
    stage: "handover",
    items: [
      { text: "All debris cleared from site and deep cleaning done", method: "visual", proof: "photo", severity: "medium" },
      { text: "All electrical points tested for power", method: "visual", proof: "video", severity: "high" },
      { text: "All plumbing fixtures tested for leaks", method: "visual", proof: "video", severity: "high" },
      { text: "Main door lock sets and keys handed over", method: "visual", proof: "photo", severity: "high" },
      { text: "Warranties for paint, waterproofing, and termite handed over", method: "document_review", proof: "document", severity: "critical" },
      { text: "Warranties for electrical and plumbing fixtures handed over", method: "document_review", proof: "document", severity: "critical" },
      { text: "As-built drawings (architecture, structural, MEP) uploaded", method: "document_review", proof: "document", severity: "critical" },
      { text: "Snag list generated and verified closed", method: "document_review", proof: "remark", severity: "high" },
      { text: "Final client walkthrough signed off", method: "document_review", proof: "document", severity: "high" },
      { text: "Property Passport generated and shared with client", method: "visual", proof: "photo", severity: "high" }
    ]
  },
  {
    name: "Piling Foundation Checks",
    stage: "foundation",
    items: [
      { text: "Pile point marking coordinates verified via Total Station", method: "measurement", proof: "measurement", severity: "critical" },
      { text: "Bore depth reached required hard strata", method: "measurement", proof: "photo", severity: "critical" },
      { text: "Pile reinforcement cage length and lap joints verified", method: "measurement", proof: "photo", severity: "high" },
      { text: "Tremie pipe used for concrete pouring", method: "visual", proof: "photo", severity: "high" },
      { text: "Pile head chipping done up to sound concrete", method: "visual", proof: "photo", severity: "high" }
    ]
  },
  {
    name: "Structural Audit Checks",
    stage: "planning",
    items: [
      { text: "Visual inspection of beam/column cracks", method: "visual", proof: "photo", severity: "critical" },
      { text: "Rebound Hammer test for concrete compressive strength", method: "measurement", proof: "measurement", severity: "high" },
      { text: "Ultrasonic Pulse Velocity (UPV) test for internal voids", method: "measurement", proof: "document", severity: "high" },
      { text: "Core cutting sample lab test results", method: "document_review", proof: "document", severity: "critical" },
      { text: "Half-cell potential test for rebar corrosion", method: "measurement", proof: "document", severity: "high" }
    ]
  }
];

async function seed() {
  console.log("Seeding BQS Templates...");

  for (const cat of starterCategories) {
    // Check if template exists
    const existing = await prisma.bqs_templates.findFirst({
      where: { template_name: cat.name, stage: cat.stage }
    });

    let templateId;

    if (!existing) {
      console.log(`Creating template: ${cat.name}`);
      const tpl = await prisma.bqs_templates.create({
        data: {
          template_name: cat.name,
          stage: cat.stage,
          category: "Standard",
          description: `Standard BQS template for ${cat.name}`,
          project_type: "residential"
        }
      });
      templateId = tpl.id;
    } else {
      console.log(`Template already exists: ${cat.name}`);
      templateId = existing.id;
    }

    for (const item of cat.items) {
      const existingItem = await prisma.bqs_checklist_items.findFirst({
        where: { template_id: templateId, item_text: item.text }
      });

      if (!existingItem) {
        await prisma.bqs_checklist_items.create({
          data: {
            template_id: templateId,
            stage: cat.stage,
            category: cat.name,
            item_text: item.text,
            inspection_method: item.method,
            required_proof_type: item.proof,
            severity: item.severity,
            is_required: true
          }
        });
        console.log(`  Added item: ${item.text}`);
      }
    }
  }

  console.log("Seeding complete.");
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
