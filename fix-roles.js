const postgres = require('postgres');

const DATABASE_URL = "postgresql://neondb_owner:npg_DfqJe86pAMyT@ep-empty-waterfall-ao1eruvv-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function fix() {
  const sql = postgres(DATABASE_URL, { ssl: 'require' });
  try {
    // Drop existing constraint
    await sql`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check`;
    // Update existing rows
    await sql`UPDATE users SET role = 'partner' WHERE role = 'partner_contractor'`;
    await sql`UPDATE users SET role = 'admin' WHERE role = 'super_admin'`;
    // Add new constraint
    await sql`ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('client', 'admin', 'partner', 'ops_admin'))`;
    console.log("Fixed users role check constraint and updated legacy roles.");
  } catch(e) {
    console.error(e);
  } finally {
    await sql.end();
  }
}
fix();
