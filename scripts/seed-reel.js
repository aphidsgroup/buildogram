const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$executeRaw`
      INSERT INTO reels (id, title, video_url, provider, start_muted, cta_label, cta_url, active, created_at, updated_at)
      VALUES ('00000000-0000-0000-0000-000000000000', 'Buildogram Reel', 'https://vimeo.com/1197711688', 'vimeo', true, 'Talk to an Engineer', 'https://www.buildogram.in/contact?type=construction', true, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET active = true, title = 'Buildogram Reel', video_url = 'https://vimeo.com/1197711688', start_muted = true, provider = 'vimeo', cta_label = 'Talk to an Engineer', cta_url = 'https://www.buildogram.in/contact?type=construction';
    `;
    const activeReels = await prisma.$queryRaw`SELECT * FROM reels WHERE active = true`;
    console.log('Seeded reel.', activeReels);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
