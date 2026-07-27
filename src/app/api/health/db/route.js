import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getFeatureConfig } from '@/lib/config/features';

export const dynamic = 'force-dynamic';

const CORE_TABLES = [
  { table: 'users', key: 'authentication' },
  { table: 'leads', key: 'leadPersistence' },
  { table: 'material_quote_requests', key: 'materialQuoteRequests' },
  { table: 'supplier_quote_responses', key: 'supplierQuoteResponses' },
];
const OPTIONAL_TABLES = [
  { table: 'material_delivery_records', key: 'materialDeliveryRecords' },
];

async function inspectTables(checks) {
  const results = {};
  for (const check of checks) {
    const rows = await sql`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = ${check.table}
      ) AS present
    `;
    results[check.key] = rows[0]?.present ? 'ready' : 'critical_missing';
  }
  return results;
}

export async function GET() {
  const startedAt = Date.now();
  const features = getFeatureConfig();
  const enabledFeatures = Object.fromEntries(
    Object.entries(features).map(([key, value]) => [key, value.status]),
  );

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      success: false,
      ready: false,
      core: {
        database: 'critical_missing',
        authentication: process.env.JWT_SECRET ? 'ready' : 'critical_missing',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL ? 'ready' : 'critical_missing',
        leadPersistence: 'critical_missing',
        materialQuoteRequests: 'critical_missing',
        supplierQuoteResponses: 'critical_missing',
      },
      enabledFeatures,
      optionalDatabaseFeatures: { materialDeliveryRecords: 'optional_disabled' },
      readinessScore: 0,
    }, { status: 503 });
  }

  try {
    await sql`SELECT 1`;
    const coreTables = await inspectTables(CORE_TABLES);
    const optionalTables = await inspectTables(OPTIONAL_TABLES);
    const core = {
      database: 'ready',
      authentication: process.env.JWT_SECRET && coreTables.authentication === 'ready'
        ? 'ready'
        : 'critical_missing',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL ? 'ready' : 'critical_missing',
      leadPersistence: coreTables.leadPersistence,
      materialQuoteRequests: coreTables.materialQuoteRequests,
      supplierQuoteResponses: coreTables.supplierQuoteResponses,
    };
    const coreValues = Object.values(core);
    const readyCore = coreValues.filter(value => value === 'ready').length;
    const allEnabledFeaturesReady = Object.values(features)
      .filter(feature => feature.enabled)
      .every(feature => feature.status === 'ready');
    const ready = readyCore === coreValues.length && allEnabledFeaturesReady;

    return NextResponse.json({
      success: true,
      ready,
      core,
      enabledFeatures,
      optionalDatabaseFeatures: {
        materialDeliveryRecords: optionalTables.materialDeliveryRecords === 'ready'
          ? 'ready'
          : 'optional_disabled',
      },
      readinessScore: Math.round((readyCore / coreValues.length) * 100),
      gates: {
        CORE_READINESS: readyCore === coreValues.length ? 'PASS' : 'FAIL',
        ALL_ENABLED_FEATURES: allEnabledFeaturesReady ? 'PASS' : 'FAIL',
        OPTIONAL_DISABLED_FEATURES: 'DOCUMENTED',
      },
      latencyMs: Date.now() - startedAt,
    }, { status: ready ? 200 : 503 });
  } catch {
    console.error('[health-db] Database readiness check failed');
    return NextResponse.json({
      success: false,
      ready: false,
      core: {
        database: 'unavailable',
        authentication: process.env.JWT_SECRET ? 'ready' : 'critical_missing',
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL ? 'ready' : 'critical_missing',
        leadPersistence: 'unknown',
        materialQuoteRequests: 'unknown',
        supplierQuoteResponses: 'unknown',
      },
      enabledFeatures,
      optionalDatabaseFeatures: { materialDeliveryRecords: 'unknown' },
      readinessScore: 0,
    }, { status: 503 });
  }
}
