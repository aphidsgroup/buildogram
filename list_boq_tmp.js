const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.boq_project.findMany({
  select: { id: true, title: true, status: true, created_at: true },
  orderBy: { created_at: 'desc' },
  take: 20
})
.then(r => console.log(JSON.stringify(r, null, 2)))
.catch(e => console.error(e))
.finally(() => p.$disconnect());
