import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`;
    const users = await sql`SELECT id, email, role FROM users`.catch(e => ({ error: e.message }));
    return NextResponse.json({ 
      url: process.env.DATABASE_URL.replace(/:[^:]*@/, ':***@'),
      tables,
      users
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
