import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';
sql`SELECT COUNT(*) FROM leads`.then(res => {
  console.log('IsArray:', Array.isArray(res));
  console.log('Keys:', Object.keys(res));
  console.log('Type:', typeof res);
  console.log('Raw:', res);
  process.exit(0);
});
