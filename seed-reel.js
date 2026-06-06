const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$executeRaw`
      INSERT INTO reels (id, title, video_url, provider, start_muted, cta_label, cta_url, active, created_at, updated_at)
      VALUES ('00000000-0000-0000-0000-000000000000', 'Test Reel', 'https://vimeo.com/1053075253', 'vimeo', false, 'Click Here', 'https://buildogram.com', true, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET active = true, video_url = 'https://vimeo.com/1053075253', start_muted = false, provider = 'vimeo';
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
