const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
env.split('\n').forEach(line => {
  const match = line.match(/^DATABASE_URL\s*=\s*(.+)$/);
  if (match) dbUrl = match[1].trim().replace(/^['"]|['"]$/g, '');
});
if (!dbUrl) { console.error('DATABASE_URL not found'); process.exit(1); }

const sql = neon(dbUrl);

async function run() {
  try {
    console.log('Running Migration 003 — lead → property auto-link...');

    // 1. Add property_id column to leads (nullable FK to properties)
    await sql`
      ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS property_id UUID REFERENCES properties(id)
    `;
    console.log('✅ 1/2  property_id column added to leads');

    // 2. Add converted_at timestamp — when was this lead converted/won
    await sql`
      ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS converted_at TIMESTAMPTZ
    `;
    console.log('✅ 2/2  converted_at column added to leads');

    console.log('\n🎉 Migration 003 complete!');
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
}

run();
