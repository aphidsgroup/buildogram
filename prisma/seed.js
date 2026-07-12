const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'System Admin';

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required to seed an administrator.');
  }
  if (password.length < 12) {
    throw new Error('ADMIN_PASSWORD must contain at least 12 characters.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.users.upsert({
    where: { email },
    update: {
      name,
      password_hash: passwordHash,
      role: 'ops_admin',
      is_active: true,
      must_change_password: true,
    },
    create: {
      email,
      name,
      password_hash: passwordHash,
      role: 'ops_admin',
      is_active: true,
      must_change_password: true,
    },
  });

  if (process.env.NODE_ENV === 'production' || process.env.APP_MODE === 'production') {
    await prisma.users.updateMany({
      where: {
        email: {
          in: ['admin@buildogram.in', 'partner@buildogram.in', 'client@buildogram.in'],
          not: admin.email,
        },
      },
      data: { is_active: false },
    });
  }

  console.log(`Administrator seeded for ${admin.email}. Password was not printed.`);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
