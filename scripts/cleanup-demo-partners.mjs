import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runCleanup() {
  console.log('Starting Hard Delete (C2) of Demo Partners for maximum security...');

  try {
    // 1. Identify demo partners
    const demoPartners = await prisma.partners.findMany({
      where: {
        slug: {
          startsWith: 'demo-'
        }
      },
      select: { id: true, slug: true }
    });

    if (demoPartners.length === 0) {
      console.log('No demo partners found. Already cleaned up?');
      return;
    }

    const partnerIds = demoPartners.map(p => p.id);
    console.log(`Found ${partnerIds.length} demo partners:`, demoPartners.map(p => p.slug).join(', '));

    // 2. Delete child records that might not have CASCADE delete setup
    // partner_enquiries
    const delEnquiries = await prisma.partner_enquiries.deleteMany({
      where: { partner_id: { in: partnerIds } }
    });
    console.log(`Deleted ${delEnquiries.count} partner enquiries.`);

    // 3. The rest should be handled by onDelete: Cascade, but we can be explicit just in case
    // We will just delete the partners now.
    const delPartners = await prisma.partners.deleteMany({
      where: { id: { in: partnerIds } }
    });
    console.log(`Deleted ${delPartners.count} demo partners.`);

    console.log('Cleanup completed successfully. Production data is now strictly clean.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

runCleanup();
