const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.case_studies.update({
    where: { slug: 'boq-review-residential-velachery' },
    data: { status: 'published' }
  });
  console.log('Published case study.');
}

main().finally(() => prisma.$disconnect());
