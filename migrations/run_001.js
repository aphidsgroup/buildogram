const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

// Parse .env.local manually
const env = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
env.split('\n').forEach(line => {
  const match = line.match(/^DATABASE_URL\s*=\s*(.+)$/);
  if (match) dbUrl = match[1].trim().replace(/^['"]|['"]$/g, '');
});

if (!dbUrl) {
  console.error('DATABASE_URL not found in .env.local');
  process.exit(1);
}
console.log('DB URL found, connecting...');

const sql = neon(dbUrl);

async function run() {
  try {
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'construction'`;
    console.log('✅ 1/6  lead_type added');

    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS message TEXT`;
    console.log('✅ 2/6  message added');

    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS source_page TEXT`;
    console.log('✅ 3/6  source_page added');

    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'`;
    console.log('✅ 4/6  metadata added');

    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS follow_up_date DATE`;
    console.log('✅ 5/6  follow_up_date added');

    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS lost_reason TEXT`;
    console.log('✅ 6/6  lost_reason added');

    await sql`UPDATE leads SET lead_type = 'construction' WHERE lead_type IS NULL`;
    console.log('✅ Backfill done');

    console.log('\n🎉 Migration 001 complete!');
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}

run();
