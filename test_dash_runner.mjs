import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';
import { signToken } from './src/lib/auth.js';
import { GET } from './test_dash_local.mjs';

async function run() {
  try {
    const [user] = await sql`SELECT id,name,email,role FROM users WHERE email='admin@buildogram.in'`;
    const token = await signToken({ id: user.id, name: user.name, email: user.email, role: user.role });

    const req = {
      cookies: {
        get: (name) => name === 'buildogram_token' ? { value: token } : null
      }
    };
    
    console.log("Calling GET...");
    const res = await GET(req);
    console.log(JSON.stringify(res, null, 2));
  } catch(e) {
    console.error("FATAL ERROR", e);
  }
  process.exit(0);
}
run();
