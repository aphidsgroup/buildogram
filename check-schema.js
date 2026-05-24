import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const sql = neon(process.env.DATABASE_URL);

async function check() {
  const result = await sql`
    SELECT pg_get_constraintdef(c.oid) AS constraint_def
    FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'users' AND c.conname = 'users_role_check';
  `;
  console.log('Constraint:', result[0]?.constraint_def);
}
check();
