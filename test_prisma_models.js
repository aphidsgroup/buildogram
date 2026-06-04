const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const p = Object.getPrototypeOf(prisma);
const models = Object.getOwnPropertyNames(p).filter(k => !k.startsWith('$') && !k.startsWith('_') && k !== 'constructor');
console.log(models.join('\n'));
