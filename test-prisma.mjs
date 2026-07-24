import { PrismaClient } from '@prisma/client';
import { computeExcelBoq } from './src/lib/boq-calc/excel-engine.js';

const prisma = new PrismaClient();

async function run() {
  const project = await prisma.boq_project.findFirst({
    where: { title: 'BOQ_Demo_Input_Kinathukadavu' },
    include: { sections: true, rates: true },
  });

  if (!project) {
    console.log("Project not found in DB.");
    return;
  }

  const secMap = {};
  for (const s of project.sections) {
    secMap[s.section_key] = s.data_json;
  }

  const inputs = {
    ...secMap,
    premiumItems: secMap.premiumItems || {},
    addlWorks: secMap.addlWorks || []
  };

  const res = computeExcelBoq(inputs, { mode: 'excel', rateMap: null, marginPct: 0 });
  console.log("Grand Total with current logic:", res.grandTotal);
}

run().finally(() => prisma.$disconnect());
