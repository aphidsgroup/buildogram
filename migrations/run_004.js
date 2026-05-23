import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We will use node --env-file=.env.local
const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  console.log('Running Migration 004: Add property_listing lead type...');
  try {
    const filePath = path.join(__dirname, '004_add_property_listing_lead_type.sql');
    const sqlScript = fs.readFileSync(filePath, 'utf8');
    
    // Split the script into separate statements
    const statements = sqlScript
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await sql.query(statement);
    }
    
    console.log('Migration 004 completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
