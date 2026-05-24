import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  console.log('Running Migration 009: Create ai_requests table...');
  try {
    const filePath = path.join(__dirname, '009_create_ai_requests_table.sql');
    const sqlScript = fs.readFileSync(filePath, 'utf8');
    
    const statements = sqlScript
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      await sql.query(statement);
    }
    
    console.log('Migration 009 completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
