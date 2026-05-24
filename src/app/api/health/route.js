import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status = {
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    environment: process.env.NODE_ENV || 'unknown',
    services: {
      database: 'untested',
      whatsapp: process.env.WHATSAPP_CLOUD_TOKEN ? 'configured' : 'missing_keys',
      openai: process.env.OPENAI_API_KEY ? 'configured' : 'missing_keys',
      razorpay: process.env.RAZORPAY_KEY_ID ? 'configured' : 'missing_keys'
    }
  };

  try {
    // Simple DB ping
    if (process.env.DATABASE_URL) {
      await sql`SELECT 1 as ping`;
      status.services.database = 'connected';
    } else {
      status.services.database = 'missing_keys';
    }
  } catch (err) {
    status.services.database = 'error';
    status.db_error = err.message;
  }

  const isHealthy = status.services.database === 'connected';

  return NextResponse.json(status, { status: isHealthy ? 200 : 503 });
}
