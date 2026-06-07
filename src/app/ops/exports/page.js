import { requirePermission } from '@/lib/auth/permissions';
import { prisma } from '@/lib/storageProvider';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export const metadata = {
  title: 'Exports & Disaster Recovery | Buildogram Ops',
  description: 'Manage data exports and backups'
};

async function getExportMetrics() {
  // Get counts
  const leadsCount = await prisma.leads.count();
  const projectsCount = await prisma.projects.count();
  const partnersCount = await prisma.partners.count();
  const invoicesCount = await prisma.invoice_records.count();

  // Get last export dates
  const logs = await prisma.audit_logs.findMany({
    where: { action: 'EXPORT' },
    orderBy: { created_at: 'desc' }
  });

  const lastExports = {
    leads: logs.find(l => l.resource_type === 'leads')?.created_at,
    projects: logs.find(l => l.resource_type === 'projects')?.created_at,
    partners: logs.find(l => l.resource_type === 'partners')?.created_at,
    invoices: logs.find(l => l.resource_type === 'invoices')?.created_at,
    revenue: logs.find(l => l.resource_type === 'revenue')?.created_at,
  };

  return {
    counts: { leads: leadsCount, projects: projectsCount, partners: partnersCount, invoices: invoicesCount },
    lastExports
  };
}

export default async function ExportsPage() {
  const { user } = await requirePermission('view_reports'); // generic permission to access the page, deeper restrictions on buttons
  const metrics = await getExportMetrics();

  const exportModules = [
    { id: 'leads', name: 'Leads Data', icon: '🎯', count: metrics.counts.leads, lastExport: metrics.lastExports.leads },
    { id: 'projects', name: 'Projects Data', icon: '🏗️', count: metrics.counts.projects, lastExport: metrics.lastExports.projects },
    { id: 'partners', name: 'Partners Data', icon: '🤝', count: metrics.counts.partners, lastExport: metrics.lastExports.partners },
    { id: 'invoices', name: 'Invoices & Finance', icon: '🧾', count: metrics.counts.invoices, lastExport: metrics.lastExports.invoices },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Exports & Backup DR</h1>
        <p style={{ color: '#64748B' }}>Generate PII-redacted or full database exports for backup, recovery, and analysis.</p>
        
        {!['super_admin', 'ops_admin'].includes(user.role) && (
          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#FFF7ED', borderLeft: '4px solid #F97316', borderRadius: '4px', color: '#9A3412', fontSize: '14px' }}>
            <strong>Security Notice:</strong> Due to your role ({user.role}), PII fields (Emails, Phones, Client Names) will be automatically redacted in all generated exports to protect client privacy.
          </div>
        )}
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {exportModules.map(mod => (
          <div key={mod.id} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '24px', background: '#F1F5F9', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                {mod.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>{mod.name}</h2>
                <div style={{ fontSize: '13px', color: '#64748B' }}>{mod.count.toLocaleString()} Total Records</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: '#475569', marginBottom: '20px', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
              <div><strong>Last Export:</strong> {mod.lastExport ? formatDistanceToNow(new Date(mod.lastExport), { addSuffix: true }) : 'Never exported'}</div>
              <div style={{ marginTop: '4px' }}><strong>Redaction:</strong> {['super_admin', 'ops_admin'].includes(user.role) ? 'None (Full Data)' : 'Active (PII Masked)'}</div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={`/api/ops/exports/${mod.id}?format=csv`} className="btn" style={{ flex: 1, padding: '8px', background: '#0F172A', color: 'white', textAlign: 'center', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                Export CSV
              </a>
              <a href={`/api/ops/exports/${mod.id}?format=json`} className="btn" style={{ flex: 1, padding: '8px', background: 'white', color: '#0F172A', border: '1px solid #CBD5E1', textAlign: 'center', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                Export JSON
              </a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '48px', borderTop: '1px solid #E2E8F0', paddingTop: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Disaster Recovery Center</h2>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <p style={{ color: '#475569', marginBottom: '16px', lineHeight: '1.6' }}>
            To perform a recovery simulation or view the disaster recovery procedures, please consult the Playbook or use the Dry-Run Import tool (available via CLI).
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/ops/audit-logs?action=EXPORT" style={{ padding: '8px 16px', background: '#F1F5F9', color: '#0F172A', borderRadius: '6px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              View Export Audit Logs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
