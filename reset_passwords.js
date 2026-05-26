const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_DfqJe86pAMyT@ep-empty-waterfall-ao1eruvv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
});

async function run() {
  await client.connect();
  const hash = await bcrypt.hash('password123', 10);
  await client.query('UPDATE users SET password_hash = $1;', [hash]);
  console.log('Successfully updated all user passwords to password123');
  await client.end();
}

run().catch(console.error);
