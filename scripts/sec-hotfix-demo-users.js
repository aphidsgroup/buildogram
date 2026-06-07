const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

async function main() {
  const demoEmails = ['admin@buildogram.in', 'partner@buildogram.in', 'client@buildogram.in'];

  for (const email of demoEmails) {
    const user = await prisma.users.findUnique({ where: { email } });
    if (user) {
      // Randomize password so it cannot be guessed
      const randomPassword = crypto.randomBytes(32).toString('hex');
      await prisma.users.update({
        where: { email },
        data: {
          password_hash: randomPassword
        }
      });
      console.log(`Reset password for ${email}`);
    } else {
      console.log(`User ${email} not found.`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
