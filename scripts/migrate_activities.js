const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/buildogram',
});

async function run() {
  try {
    console.log('Creating lead_activities table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lead_activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
        activity_type VARCHAR(50) NOT NULL,
        title TEXT,
        description TEXT,
        created_by UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        follow_up_at TIMESTAMP WITH TIME ZONE,
        metadata JSONB DEFAULT '{}'::jsonb
      );

      CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
      CREATE INDEX IF NOT EXISTS idx_lead_activities_follow_up_at ON lead_activities(follow_up_at);
    `);
    console.log('Successfully created lead_activities table.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

run();
