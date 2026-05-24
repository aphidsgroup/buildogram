import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const query = fs.readFileSync(path.join(process.cwd(), 'migrations', '012_payment_orders.sql'), 'utf8');
    const statements = query.split(';').filter(s => s.trim().length > 0);
    for (const stmt of statements) {
      await sql.query(stmt + ';');
    }
    return NextResponse.json({ success: true, message: 'Migration applied successfully.' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
