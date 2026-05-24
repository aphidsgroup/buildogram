import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';
import { signToken } from './src/lib/auth.js';
import { GET } from './src/app/api/ops/dashboard/route.js';

async function run() {
  try {
    const [user] = await sql`SELECT id,name,email,role FROM users WHERE email='admin@buildogram.in'`;
    const token = await signToken({ id: user.id, name: user.name, email: user.email, role: user.role });

    const req = {
      cookies: {
        get: (name) => name === 'buildogram_token' ? { value: token } : null
      }
    };
    
    const res = await GET(req);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
run();
