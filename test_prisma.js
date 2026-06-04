const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const result = [
  'ai_floor_plan_projects: ' + typeof prisma.ai_floor_plan_projects,
  'aiFloorPlanProjects: ' + typeof prisma.aiFloorPlanProjects,
  'projects: ' + typeof prisma.projects
].join('\n');

fs.writeFileSync('prisma_test.txt', result);
console.log(result);
