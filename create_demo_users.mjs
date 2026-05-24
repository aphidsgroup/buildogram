import { Client } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_DfqJe86pAMyT@ep-empty-waterfall-ao1eruvv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function seedDemos() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to database.');
    
    const hash = await bcrypt.hash('Demo@1234', 10);
    
    // Create Partner
    await client.query(`DELETE FROM users WHERE email='partner@buildogram.in'`);
    await client.query(`
      INSERT INTO users(name,email,phone,password_hash,role) 
      VALUES('Demo Partner','partner@buildogram.in','8888888888',$1,'partner_contractor')
    `, [hash]);
    console.log('✓ partner user created: partner@buildogram.in');

    // Create Client
    await client.query(`DELETE FROM users WHERE email='client@buildogram.in'`);
    await client.query(`
      INSERT INTO users(name,email,phone,password_hash,role) 
      VALUES('Demo Client','client@buildogram.in','7777777777',$1,'client')
    `, [hash]);
    console.log('✓ client user created: client@buildogram.in');
    
  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    await client.end();
  }
}

seedDemos();
