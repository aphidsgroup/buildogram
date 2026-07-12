const { Pool } = require('pg');

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    console.log('Creating revenue_records table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS revenue_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        source_type VARCHAR(50) NOT NULL,
        source_id UUID,
        revenue_category VARCHAR(50) NOT NULL,
        title TEXT,
        customer_name TEXT,
        amount_expected NUMERIC(15, 2) DEFAULT 0,
        amount_received NUMERIC(15, 2) DEFAULT 0,
        amount_pending NUMERIC(15, 2) DEFAULT 0,
        commission_expected NUMERIC(15, 2) DEFAULT 0,
        commission_received NUMERIC(15, 2) DEFAULT 0,
        status VARCHAR(50) NOT NULL DEFAULT 'expected',
        payment_mode VARCHAR(50),
        received_date TIMESTAMP WITH TIME ZONE,
        notes TEXT,
        created_by UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        metadata JSONB DEFAULT '{}'::jsonb
      );

      CREATE INDEX IF NOT EXISTS idx_revenue_source ON revenue_records(source_type, source_id);
      CREATE INDEX IF NOT EXISTS idx_revenue_status ON revenue_records(status);
      CREATE INDEX IF NOT EXISTS idx_revenue_category ON revenue_records(revenue_category);
    `);
    console.log('Successfully created revenue_records table.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

run();
