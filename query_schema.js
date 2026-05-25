require('dotenv').config({path: '.env.local'});
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
async function run() {
  const leads = await sql.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'lead_activities'");
  console.log("LEAD ACTIVITIES TABLE:");
  console.log(leads);
  
  const pe = await sql.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'partner_enquiries'");
  console.log("PARTNER ENQUIRIES TABLE:");
  console.log(pe);
}
run().catch(console.error);
