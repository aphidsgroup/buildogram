import sql from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Attempt a lightweight query
    await sql`SELECT 1 as is_alive`;
    return NextResponse.json({
      success: true,
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      database: 'unavailable',
      fallback: 'localStorage/demo mode active',
      message: error.message
    }, { status: 503 });
  }
}
