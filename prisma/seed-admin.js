const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Read from env or args
  const email = process.env.ADMIN_EMAIL || process.argv[2];
  const password = process.env.ADMIN_PASSWORD || process.argv[3];
  
  if (!email || !password) {
    console.error('Usage: npm run seed:admin <email> <password> OR set ADMIN_EMAIL and ADMIN_PASSWORD in environment.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: 'ops_admin' },
    create: {
      email,
      name: 'System Admin',
      role: 'ops_admin',
      passwordHash
    }
  });

  console.log(`✅ Admin user seeded successfully for email: ${admin.email}`);
  
  // Important security measure: Disable any old default demo users in production
  if (process.env.APP_MODE === 'production') {
    await prisma.user.updateMany({
      where: {
        email: { in: ['admin@buildogram.in', 'partner@buildogram.in', 'client@buildogram.in'] },
        id: { not: admin.id }
      },
      data: { status: 'disabled' }
    });
    console.log('🔒 Demo accounts disabled for production safety.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
