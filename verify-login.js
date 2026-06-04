const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient({ datasources: { db: { url: 'postgresql://neondb_owner:npg_DfqJe86pAMyT@ep-empty-waterfall-ao1eruvv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' } } });
async function main() {
  const user = await prisma.users.findUnique({ where: { email: 'aphidsgroup@gmail.com' } });
  console.log('User found:', user ? 'YES' : 'NO');
  if (user) {
    console.log('is_active:', user.is_active);
    console.log('password_hash present:', !!user.password_hash);
    console.log('password_hash value:', user.password_hash ? user.password_hash.substring(0, 20) + '...' : 'NULL');
    const match = await bcrypt.compare('password123', user.password_hash || '');
    console.log('bcrypt.compare result:', match);
  }
}
main().catch(e => console.error(e.message)).finally(() => process.exit(0));
