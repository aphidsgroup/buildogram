import { readFileSync } from 'fs';
import { join } from 'path';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:REDACTED_TOKEN@REDACTED-HOST.neon.tech/neondb?sslmode=require&channel_binding=require';

async function migrate() {
  const sql = neon(DATABASE_URL);
  console.log('🚀 Running Buildogram DB migration...');
  const schema = readFileSync(join(process.cwd(), 'schema.sql'), 'utf-8');
  
  // Extract each CREATE TABLE / INSERT statement block
  const blocks = schema.split(/;\s*\n/).map(s => s.trim()).filter(s => s.length > 10);

  let success = 0, failed = 0;
  for (const block of blocks) {
    try {
      await sql.unsafe(block);
      const firstLine = block.split('\n')[0].substring(0, 60);
      console.log(`  ✓ ${firstLine}`);
      success++;
    } catch (err) {
      const firstLine = block.split('\n')[0].substring(0, 60);
      console.error(`  ✗ ${firstLine} => ${err.message}`);
      failed++;
    }
  }
  console.log(`\n✅ Done: ${success} succeeded, ${failed} failed`);
}

migrate().catch(console.error);
