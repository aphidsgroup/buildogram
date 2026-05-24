import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users';
    `;
    return NextResponse.json({ columns });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
