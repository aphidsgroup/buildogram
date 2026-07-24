import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export const dynamic = 'force-dynamic';

// Tables to check and their friendly names
const TABLE_CHECKS = [
  { table: 'users',                    entity: 'Auth / Users',       critical: true },
  { table: 'partners',                 entity: 'Partners',           critical: true },
  { table: 'partner_projects',         entity: 'Partner Projects',   critical: true },
  { table: 'projects',                 entity: 'Projects (main)',     critical: false },
  { table: 'partner_material_requests',entity: 'Material Requests',  critical: true },
  { table: 'material_quotes',          entity: 'Supplier Quotes',    critical: true },
  { table: 'milestones',               entity: 'Milestones',         critical: true },
  { table: 'progress_logs',            entity: 'Site Updates',       critical: true },
  { table: 'issues',                   entity: 'Issues',             critical: true },
  { table: 'documents',               entity: 'Documents',           critical: true },
  { table: 'notifications',            entity: 'Notifications',      critical: false },
  { table: 'leads',                    entity: 'Leads',              critical: true },
  { table: 'change_orders',            entity: 'Change Orders',      critical: false },
];

export async function GET() {
  const start = Date.now();
  const results = [];
  let dbConnected = false;
  let criticalMissing = [];

  // 1. Basic connectivity
  try {
    await sql`SELECT 1 as is_alive`;
    dbConnected = true;
  } catch (e) {
    return NextResponse.json({
      success: false,
      database: 'unavailable',
      fallback: 'localStorage/demo mode active',
      message: e.message,
      tables: [],
      readinessScore: 0,
      criticalMissing: TABLE_CHECKS.filter(t => t.critical).map(t => t.entity),
    }, { status: 503 });
  }

  // 2. Per-table checks
  for (const check of TABLE_CHECKS) {
    try {
      const rows = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = ${check.table}
        ) as exists
      `;
      const exists = rows[0]?.exists;
      let rowCount = null;
      if (exists) {
        try {
          const count = await sql`SELECT COUNT(*) as n FROM ${sql(check.table)} LIMIT 1`;
          rowCount = parseInt(count[0]?.n ?? 0, 10);
        } catch { rowCount = null; }
      } else if (check.critical) {
        criticalMissing.push(check.entity);
      }
      results.push({
        table: check.table,
        entity: check.entity,
        exists,
        rowCount,
        critical: check.critical,
        status: exists ? 'ok' : (check.critical ? 'MISSING_CRITICAL' : 'missing'),
      });
    } catch (e) {
      results.push({
        table: check.table,
        entity: check.entity,
        exists: false,
        rowCount: null,
        critical: check.critical,
        status: 'error',
        error: e.message,
      });
      if (check.critical) criticalMissing.push(check.entity);
    }
  }

  const existing = results.filter(r => r.exists).length;
  const readinessScore = Math.round((existing / TABLE_CHECKS.length) * 100);
  const ready = criticalMissing.length === 0;

  return NextResponse.json({
    success: true,
    database: 'connected',
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - start,
    readinessScore,
    ready,
    criticalMissing,
    tables: results,
    summary: `${existing}/${TABLE_CHECKS.length} tables exist. ${criticalMissing.length} critical missing.`,
  });
}
