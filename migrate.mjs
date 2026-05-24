import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  const query = fs.readFileSync('migrations/010_create_change_orders.sql', 'utf8');
  await sql(query);
  console.log('Migration applied successfully.');
}

run().catch(console.error);
