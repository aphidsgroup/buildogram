/**
 * DataSourceBadge — Phase G
 * Shows data origin (API / localStorage / DEMO) on partner/ops pages.
 * Renders ONLY in development mode or for ops_admin role.
 * Never renders on customer pages.
 */
'use client';

const SOURCE_STYLES = {
  api:          { bg: '#DCFCE7', color: '#166534', icon: '🟢', label: 'API' },
  localStorage: { bg: '#FEF9C3', color: '#854D0E', icon: '🟡', label: 'localStorage' },
  demo:         { bg: '#FEE2E2', color: '#991B1B', icon: '🔴', label: 'DEMO data' },
  loading:      { bg: '#F1F5F9', color: '#475569', icon: '⏳', label: 'Loading…' },
  unknown:      { bg: '#F1F5F9', color: '#64748B', icon: '❓', label: 'Unknown' },
};

/**
 * @param {'api'|'localStorage'|'demo'|'loading'|'unknown'} source
 * @param {string} [entity] - e.g. "Projects", "Materials"
 * @param {object} [userRole] - if provided, only renders for ops_ roles
 */
export default function DataSourceBadge({ source = 'unknown', entity = '', userRole }) {
  // Only render in dev, or for ops roles in production
  const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  const isOps = userRole && (userRole === 'ops_admin' || userRole === 'ops_pm' || userRole === 'ops_engineer');
  if (!isDev && !isOps) return null;

  const s = SOURCE_STYLES[source] || SOURCE_STYLES.unknown;

  return (
    <span
      title={`Data source: ${s.label}${entity ? ` (${entity})` : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: s.bg,
        color: s.color,
        padding: '2px 8px',
        borderRadius: '999px',
        fontSize: '10px',
        fontWeight: 700,
        fontFamily: 'monospace',
        letterSpacing: '0.02em',
        border: `1px solid ${s.color}33`,
        verticalAlign: 'middle',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      {s.icon} {s.label}{entity ? ` · ${entity}` : ''}
    </span>
  );
}

/**
 * DataSourceRow — multiple badges in a horizontal strip.
 * Usage: <DataSourceRow sources={{ Projects: 'api', Materials: 'demo' }} />
 */
export function DataSourceRow({ sources = {}, userRole }) {
  const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';
  const isOps = userRole && (userRole.startsWith('ops_'));
  if (!isDev && !isOps) return null;
  if (Object.keys(sources).length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      alignItems: 'center',
      padding: '6px 12px',
      background: '#0F172A08',
      borderRadius: '8px',
      border: '1px solid #E2E8F044',
      marginBottom: '12px',
    }}>
      <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        DEV · Data Sources:
      </span>
      {Object.entries(sources).map(([entity, src]) => (
        <DataSourceBadge key={entity} source={src} entity={entity} userRole={userRole || 'ops_admin'} />
      ))}
    </div>
  );
}
