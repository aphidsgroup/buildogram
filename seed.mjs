import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;

if (!connectionString) throw new Error('DATABASE_URL is required.');
if (!adminPassword || adminPassword.length < 12) {
  throw new Error('SEED_ADMIN_PASSWORD with at least 12 characters is required.');
}

async function seed() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to database via pg.');
    
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    console.log('Running schema.sql...');
    await client.query(schemaSql);
    console.log('✓ schema created');
    
    console.log('Seeding cost config...');
    await client.query(`
      INSERT INTO cost_config (city, spec_level, rate_per_sqft_min, rate_per_sqft_max)
      VALUES
        ('Chennai', 'basic', 1600, 1900),
        ('Chennai', 'standard', 1900, 2400),
        ('Chennai', 'premium', 2400, 3500),
        ('Coimbatore', 'basic', 1500, 1800),
        ('Coimbatore', 'standard', 1800, 2200),
        ('Coimbatore', 'premium', 2200, 3200),
        ('Madurai', 'basic', 1400, 1700),
        ('Madurai', 'standard', 1700, 2100),
        ('Madurai', 'premium', 2100, 3000)
      ON CONFLICT DO NOTHING
    `);
    console.log('✓ cost config seeded');

    console.log('Seeding admin user...');
    const hash = await bcrypt.hash(adminPassword, 12);
    await client.query(`DELETE FROM users WHERE email='admin@buildogram.in'`);
    await client.query(`
      INSERT INTO users(name,email,phone,password_hash,role) 
      VALUES('Buildogram Admin','admin@buildogram.in','9999999999',$1,'ops_admin')
    `, [hash]);
    console.log('✓ admin user created');
    
    console.log('\n✅ Database setup complete!');
    console.log('Admin account seeded. The password was not printed.');
  } catch (error) {
    console.error('Error during setup:', error);
  } finally {
    await client.end();
  }
}

seed();
