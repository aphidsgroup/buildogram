import sql from './src/lib/db.js';
import bcrypt from 'bcryptjs';

async function run() {
  const hash = await bcrypt.hash('Admin@1234', 10);
  await sql`UPDATE users SET password_hash = ${hash}, is_active=true WHERE email='admin@buildogram.in'`;
  console.log('Fixed admin password');
  process.exit(0);
}
run();
