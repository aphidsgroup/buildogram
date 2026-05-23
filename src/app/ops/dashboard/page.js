'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OpsDashboard() {
  const [stats, setStats]       = useState({ leads: 0, projects: 0, partners: 0 });
  const [leads, setLeads]       = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading]   = useState(true);

  const [funnel, setFunnel]     = useState({ total: 0, contacted: 0, qualified: 0, won: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/leads?lead_type=partner_application').then(r => r.json()),
    ]).then(([ld, pj, pa]) => {
      const allLeads = ld.leads || [];
      setLeads(allLeads.slice(0, 5));
      setProjects(pj.projects?.slice(0, 5) || []);
      setPartners(pa.leads?.slice(0, 5) || []);
      setStats({
        leads: allLeads.length,
        projects: pj.projects?.length || 0,
        partners: pa.leads?.length || 0,
      });

      // Funnel calculations
      const contacted = allLeads.filter(l => l.status !== 'new').length;
      const qualified = allLeads.filter(l => ['qualified', 'proposal', 'won'].includes(l.status)).length;
      const won       = allLeads.filter(l => l.status === 'won').length;
      setFunnel({ total: allLeads.length, contacted, qualified, won });

      setLoading(false);
    });
  }, []);

  const statusColor = { new: 'badge-blue', contacted: 'badge-yellow', qualified: 'badge-orange', proposal: 'badge-orange', won: 'badge-green', lost: 'badge-red', design: 'badge-blue', execution: 'badge-orange', complete: 'badge-green', on_hold: 'badge-gray' };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header flex-between">
        <div><h1>Ops Dashboard</h1><p className="text-muted mt-2">Overview of all leads and projects</p></div>
        <Link href="/ops/leads" className="btn btn-primary">+ New Lead</Link>
      </div>

      <div className="grid-4 mb-8">
        {[
          { label: 'Total Leads', value: stats.leads, icon: '🎯', color: 'rgba(59,130,246,0.15)' },
          { label: 'Active Projects', value: stats.projects, icon: '🏗️', color: 'rgba(15,118,110,0.15)' },
          { label: 'Partner Applications', value: stats.partners, icon: '🤝', color: 'rgba(124,58,237,0.15)' },
          { label: 'Won Leads', value: leads.filter(l => l.status === 'won').length, icon: '🏆', color: 'rgba(245,158,11,0.15)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex-between mb-4">
              <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Lead Funnel Analytics ── */}
      <div className="card mb-8">
        <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Lead Funnel Analytics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Leads', val: funnel.total, color: '#3b82f6', pct: 100 },
            { label: 'Contacted', val: funnel.contacted, color: '#eab308', pct: funnel.total ? Math.round((funnel.contacted/funnel.total)*100) : 0 },
            { label: 'Qualified', val: funnel.qualified, color: '#f97316', pct: funnel.total ? Math.round((funnel.qualified/funnel.total)*100) : 0 },
            { label: 'Won (Converted)', val: funnel.won, color: '#10b981', pct: funnel.total ? Math.round((funnel.won/funnel.total)*100) : 0 },
          ].map((stage, i) => (
            <div key={stage.label} style={{ position: 'relative' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{stage.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#292929', marginBottom: '8px' }}>
                {stage.val} <span style={{ fontSize: '13px', color: stage.color }}>({stage.pct}%)</span>
              </div>
              <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${stage.pct}%`, background: stage.color, transition: 'width 1s ease-out' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="flex-between mb-6">
            <h3 style={{ fontSize: '16px' }}>Recent Leads</h3>
            <Link href="/ops/leads" className="text-primary text-sm">View all →</Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Phone</th><th>City</th><th>Status</th></tr></thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600 }}>{l.name}</td>
                    <td className="text-muted">{l.phone}</td>
                    <td className="text-muted">{l.city}</td>
                    <td><span className={`badge ${statusColor[l.status] || 'badge-gray'}`}>{l.status}</span></td>
                  </tr>
                ))}
                {!leads.length && <tr><td colSpan={4} className="text-muted text-center" style={{ padding: '24px' }}>No leads yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="flex-between mb-6">
            <h3 style={{ fontSize: '16px' }}>Active Projects</h3>
            <Link href="/ops/projects" className="text-primary text-sm">View all →</Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Project</th><th>Client</th><th>Progress</th><th>Status</th></tr></thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id}>
                    <td><Link href={`/ops/projects/${p.id}`} style={{ fontWeight: 600, color: 'var(--primary)' }}>{p.name}</Link></td>
                    <td className="text-muted">{p.client_name}</td>
                    <td>
                      <div className="progress-bar" style={{ width: '80px' }}>
                        <div className="progress-fill" style={{ width: `${p.completion_pct || 0}%` }} />
                      </div>
                      <span className="text-xs text-muted">{p.completion_pct || 0}%</span>
                    </td>
                    <td><span className={`badge ${statusColor[p.status] || 'badge-gray'}`}>{p.status}</span></td>
                  </tr>
                ))}
                {!projects.length && <tr><td colSpan={4} className="text-muted text-center" style={{ padding: '24px' }}>No projects yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Partner Applications ── */}
      {partners.length > 0 && (
        <div className="card mt-6">
          <div className="flex-between mb-6">
            <h3 style={{ fontSize: '16px' }}>Recent Partner Applications</h3>
            <Link href="/ops/partners" className="text-primary text-sm">Manage all →</Link>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {partners.map(p => {
              const pType = p.metadata?.partner_type || 'Partner';
              const stColor = { new: 'badge-blue', contacted: 'badge-yellow', screening: 'badge-orange', onboarding: 'badge-blue', active: 'badge-green', rejected: 'badge-red' };
              return (
                <div key={p.id} style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 18px', minWidth: '180px', flex: '1 0 auto' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{pType}</div>
                  <span className={`badge ${stColor[p.status] || 'badge-gray'}`} style={{ fontSize: '11px' }}>{p.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
