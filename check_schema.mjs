import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';

async function run() {
  try {
    const res = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'leads'`;
    console.log("LEADS SCHEMA:");
    console.table(res);

    const res2 = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'properties'`;
    console.log("PROPERTIES SCHEMA:");
    console.table(res2);
    
    const res3 = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'lead_activities'`;
    console.log("ACTIVITIES SCHEMA:");
    console.table(res3);
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
run();
