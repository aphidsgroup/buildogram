const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://neondb_owner:REDACTED_TOKEN@REDACTED-HOST.neon.tech/neondb?sslmode=require&channel_binding=require' } } });
prisma.users.findUnique({ where: { email: 'aphidsgroup@gmail.com' }, select: { email: true, password_hash: true, is_active: true } })
  .then(r => console.log(JSON.stringify(r, null, 2)))
  .catch(e => console.error(e.message))
  .finally(() => process.exit(0));
