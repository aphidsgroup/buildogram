'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OpsDashboard() {
  const [stats, setStats] = useState({ leads: 0, projects: 0, users: 0 });
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/leads').then(r => r.json()), fetch('/api/projects').then(r => r.json())])
      .then(([ld, pj]) => {
        setLeads(ld.leads?.slice(0, 5) || []);
        setProjects(pj.projects?.slice(0, 5) || []);
        setStats({ leads: ld.leads?.length || 0, projects: pj.projects?.length || 0 });
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
          { label: 'This Month', value: leads.filter(l => new Date(l.created_at) > new Date(Date.now() - 30*86400000)).length, icon: '📅', color: 'rgba(34,197,94,0.15)' },
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
    </div>
  );
}
