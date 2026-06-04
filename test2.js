const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const result = [
  'ai_floor_plan_generations: ' + typeof prisma.ai_floor_plan_generations,
  'ai_floor_plan_versions: ' + typeof prisma.ai_floor_plan_versions
].join('\n');
require('fs').writeFileSync('out.txt', result);
console.log(result);
