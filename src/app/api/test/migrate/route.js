import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const query = fs.readFileSync(path.join(process.cwd(), 'migrations', '010_create_change_orders.sql'), 'utf8');
    await sql.query(query);
    return NextResponse.json({ success: true, message: 'Migration applied successfully.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
