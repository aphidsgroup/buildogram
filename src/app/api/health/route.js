import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getFeatureConfig } from '@/lib/config/features';

export const dynamic = 'force-dynamic';

export async function GET() {
  const features = getFeatureConfig();
  let database = 'critical_missing';

  if (process.env.DATABASE_URL) {
    try {
      await sql`SELECT 1`;
      database = 'ready';
    } catch {
      database = 'unavailable';
      console.error('[health] Database connectivity check failed');
    }
  }

  const core = {
    database,
    authentication: process.env.JWT_SECRET ? 'ready' : 'critical_missing',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ? 'ready' : 'critical_missing',
  };
  const enabledFeatures = Object.fromEntries(
    Object.entries(features).map(([key, value]) => [key, value.status]),
  );
  const coreReady = Object.values(core).every(value => value === 'ready');
  const enabledReady = Object.values(features)
    .filter(feature => feature.enabled)
    .every(feature => feature.status === 'ready');

  return NextResponse.json({
    success: coreReady && enabledReady,
    ready: coreReady && enabledReady,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    core,
    enabledFeatures,
    gates: {
      CORE_READINESS: coreReady ? 'PASS' : 'FAIL',
      ALL_ENABLED_FEATURES: enabledReady ? 'PASS' : 'FAIL',
      OPTIONAL_DISABLED_FEATURES: 'DOCUMENTED',
    },
  }, { status: coreReady && enabledReady ? 200 : 503 });
}
