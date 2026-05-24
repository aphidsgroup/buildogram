import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';

// MOCK NextResponse so we can load route.js
import * as nextServer from 'next/server.js';
nextServer.NextResponse = {
  json: (data, opts) => ({ data, opts })
};

import { signToken } from './src/lib/auth.js';

// Now we can dynamically import the route because NextResponse is mocked!
async function run() {
  try {
    const { GET } = await import('./src/app/api/ops/dashboard/route.js');

    const [user] = await sql`SELECT id,name,email,role FROM users WHERE email='admin@buildogram.in'`;
    const token = await signToken({ id: user.id, name: user.name, email: user.email, role: user.role });

    const req = {
      cookies: {
        get: (name) => name === 'buildogram_token' ? { value: token } : null
      }
    };
    
    const res = await GET(req);
    console.log(JSON.stringify(res, null, 2));
  } catch(e) {
    console.error("FATAL ERROR", e.message);
  }
  process.exit(0);
}
run();
