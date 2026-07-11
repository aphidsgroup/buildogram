const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);

  const usersToSeed = [
    {
      name: 'Demo Admin',
      email: 'admin@buildogram.in',
      role: 'ops_admin',
    },
    {
      name: 'Demo Partner',
      email: 'partner@buildogram.in',
      role: 'partner',
    },
    {
      name: 'Demo Client',
      email: 'client@buildogram.in',
      role: 'client',
    }
  ];

  for (const u of usersToSeed) {
    const existing = await prisma.users.findUnique({ where: { email: u.email } });
    if (existing) {
      await prisma.users.update({
        where: { email: u.email },
        data: { password_hash: hash, role: u.role, is_active: true }
      });
      console.log(`Updated existing demo user: ${u.email}`);
    } else {
      await prisma.users.create({
        data: {
          name: u.name,
          email: u.email,
          password_hash: hash,
          role: u.role,
          is_active: true
        }
      });
      console.log(`Created new demo user: ${u.email}`);
    }
  }
}

main()
  .then(() => {
    console.log("Seeding complete.");
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
