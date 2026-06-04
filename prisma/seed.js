const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // Seed Users
  const admin = await prisma.users.upsert({
    where: { email: 'admin@buildogram.in' },
    update: {},
    create: {
      email: 'admin@buildogram.in',
      name: 'Demo Admin',
      role: 'ops_admin',
      password_hash: passwordHash
    }
  });

  const partner = await prisma.users.upsert({
    where: { email: 'partner@buildogram.in' },
    update: {},
    create: {
      email: 'partner@buildogram.in',
      name: 'Demo Partner',
      role: 'partner_contractor',
      password_hash: passwordHash
    }
  });

  const client = await prisma.users.upsert({
    where: { email: 'client@buildogram.in' },
    update: {},
    create: {
      email: 'client@buildogram.in',
      name: 'Demo Client',
      role: 'client',
      password_hash: passwordHash
    }
  });

  console.log('Seeded Users:', { admin: admin.email, partner: partner.email, client: client.email });

  // Seed Leads
  const l1 = await prisma.leads.create({
    data: {
      leadType: 'construction',
      name: 'Rajesh Kumar',
      phone: '9876543210',
      location: 'OMR, Chennai',
      pipelineStage: 'New',
      formData: JSON.stringify({ plotSize: '2400', budget: '1.2 Cr', constructionType: 'Villa' }),
      activityLog: {
        create: [{ action: 'Lead Created', note: 'Contact Form Submission', user: 'System' }]
      }
    }
  });

  const l2 = await prisma.leads.create({
    data: {
      leadType: 'boq_audit',
      name: 'Sneha',
      phone: '9988776655',
      location: 'Anna Nagar',
      pipelineStage: 'Qualified',
      priority: 'High',
      formData: JSON.stringify({ hasDrawings: true }),
      activityLog: {
        create: [{ action: 'Lead Created', note: 'Contact Form Submission', user: 'System' }]
      }
    }
  });

  const l3 = await prisma.leads.create({
    data: {
      leadType: 'material_quote',
      name: 'Ramesh Builders',
      phone: '8877665544',
      location: 'Porur',
      pipelineStage: 'Contacted',
      formData: JSON.stringify({ materialType: 'Cement', quantity: '500 bags' }),
      activityLog: {
        create: [{ action: 'Lead Created', note: 'Contact Form Submission', user: 'System' }]
      }
    }
  });

  console.log('Seeded Leads:', [l1.name, l2.name, l3.name]);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
