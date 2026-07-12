import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import pg from 'pg';

const { Client } = pg;
const databaseUrl = process.env.DATABASE_URL;
const baselineBefore = process.env.MIGRATION_BASELINE_BEFORE || null;
if (!databaseUrl) throw new Error('DATABASE_URL is required.');

const migrationDirectory = path.resolve(process.cwd(), 'migrations');
const client = new Client({ connectionString: databaseUrl });

try {
  await client.connect();
  await client.query('SELECT pg_advisory_lock($1)', [73120426]);
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      checksum TEXT NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const files = (await fs.readdir(migrationDirectory))
    .filter((filename) => /^\d+_.+\.sql$/.test(filename))
    .sort((left, right) => left.localeCompare(right, 'en'));

  for (const filename of files) {
    const sql = await fs.readFile(path.join(migrationDirectory, filename), 'utf8');
    const checksum = crypto.createHash('sha256').update(sql).digest('hex');
    const existing = await client.query('SELECT checksum FROM schema_migrations WHERE filename = $1', [filename]);
    if (existing.rows[0]) {
      if (existing.rows[0].checksum !== checksum) {
        throw new Error(`Applied migration changed on disk: ${filename}`);
      }
      console.log(`skip ${filename}`);
      continue;
    }

    if (baselineBefore && filename.localeCompare(baselineBefore, 'en') < 0) {
      await client.query(
        'INSERT INTO schema_migrations(filename, checksum) VALUES ($1, $2)',
        [filename, checksum],
      );
      console.log(`baselined ${filename}`);
      continue;
    }

    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations(filename, checksum) VALUES ($1, $2)', [filename, checksum]);
      await client.query('COMMIT');
      console.log(`applied ${filename}`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(`Migration failed (${filename}): ${error.message}`);
    }
  }
} finally {
  try { await client.query('SELECT pg_advisory_unlock($1)', [73120426]); } catch {}
  await client.end();
}
