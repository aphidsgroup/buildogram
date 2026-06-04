const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('ai_floor_plan_credit_ledger: ' + typeof prisma.ai_floor_plan_credit_ledger);
