import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

// Safety check
if (process.env.DEMO_SEED_CONFIRM !== 'true') {
  console.error('❌ SAFETY ABORT: DEMO_SEED_CONFIRM is not set to true.');
  console.error('Please set DEMO_SEED_CONFIRM=true to explicitly allow this destructive seed script.');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is missing from environment.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Starting Demo Data Seed...');

  try {
    // 1. Create a dummy internal ops user
    const opsUserId = 'op_usr_demo123';
    await sql`
      INSERT INTO users (id, name, email, role)
      VALUES (${opsUserId}, 'Demo Ops Manager', 'ops.demo@buildogram.in', 'ops')
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log('✅ Upserted demo Ops user.');

    // 2. Create a dummy client user
    const clientUserId = 'cl_usr_demo456';
    await sql`
      INSERT INTO users (id, name, email, role)
      VALUES (${clientUserId}, 'Ramanathan Iyer (Demo)', 'ramanathan.demo@example.com', 'client')
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log('✅ Upserted demo Client user.');

    // 3. Create a dummy project for the client
    const projectId = 'proj_demo_789';
    await sql`
      INSERT INTO projects (id, client_id, title, status, progress_percent, location)
      VALUES (${projectId}, ${clientUserId}, 'ECR Coastal Villa (Demo)', 'in_progress', 45, 'Sholinganallur, ECR')
      ON CONFLICT (id) DO UPDATE SET progress_percent = 45;
    `;
    console.log('✅ Upserted demo Project.');

    // 4. Create some leads
    await sql`
      INSERT INTO leads (id, name, email, phone, lead_type, status, source)
      VALUES 
        ('lead_demo_1', 'Karthik S', 'karthik@demo.com', '9876543210', 'construction', 'new', 'Website Hero CTA'),
        ('lead_demo_2', 'Priya R', 'priya@demo.com', '8765432109', 'material_quote', 'contacted', 'Materials Page')
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log('✅ Upserted demo Leads.');

    // 5. Create a property passport
    await sql`
      INSERT INTO properties (id, title, owner_id, location, status)
      VALUES ('prop_demo_1', 'Anna Nagar Plot - Passport', ${clientUserId}, 'Anna Nagar, Chennai', 'active')
      ON CONFLICT (id) DO NOTHING;
    `;
    console.log('✅ Upserted demo Property Passport.');

    console.log('🎉 Demo seed completed successfully!');
  } catch (err) {
    console.error('❌ Error during seed:', err);
  }
}

seed();
