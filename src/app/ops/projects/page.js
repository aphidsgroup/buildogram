'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OpsProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', client_id: '', city: 'Chennai', locality: '', plot_area_sqft: '', floors: 'G+1', spec_level: 'standard', start_date: '', total_contract_value: '' });

  const load = () => Promise.all([fetch('/api/projects').then(r => r.json()), fetch('/api/users').then(r => r.json())])
    .then(([pd, ud]) => { setProjects(pd.projects || []); setClients((ud.users || []).filter(u => u.role === 'client')); setLoading(false); });

  useEffect(() => { load(); }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const create = async (e) => {
    e.preventDefault();
    await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setShowModal(false);
    load();
  };

  const statusColor = { design: 'badge-blue', boq_approval: 'badge-yellow', execution: 'badge-orange', handover: 'badge-green', complete: 'badge-green', on_hold: 'badge-gray' };
  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header flex-between mb-4">
        <div><h1>Projects</h1><p className="text-muted mt-2">{projects.length} total projects</p></div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">+ New Project</button>
      </div>

      <div className="grid-3 mb-6">
        <div className="stat-card">
          <div className="stat-label">Active Projects</div>
          <div className="stat-value" style={{ fontSize: '28px', color: 'var(--primary)' }}>{projects.filter(p => p.status !== 'complete').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Pipeline Value</div>
          <div className="stat-value" style={{ fontSize: '28px' }}>{fmt(projects.filter(p => p.status !== 'complete').reduce((sum, p) => sum + (Number(p.total_contract_value) || 0), 0))}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="stat-label">At Risk / On Hold</div>
          <div className="stat-value" style={{ fontSize: '28px', color: '#ef4444' }}>{projects.filter(p => p.status === 'on_hold').length}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Project</th><th>Client</th><th>City</th><th>Value</th><th>PM</th><th>Progress</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600 }}>{p.name}</td>
                  <td className="text-muted">{p.client_name || '—'}</td>
                  <td className="text-muted">{p.city}</td>
                  <td className="text-muted">{fmt(p.total_contract_value)}</td>
                  <td className="text-muted">{p.pm_name || 'Unassigned'}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="progress-bar" style={{ width: '60px' }}><div className="progress-fill" style={{ width: `${p.completion_pct || 0}%` }} /></div>
                      <span className="text-xs text-muted">{p.completion_pct || 0}%</span>
                    </div>
                  </td>
                  <td><span className={`badge ${statusColor[p.status] || 'badge-gray'}`}>{p.status}</span></td>
                  <td><Link href={`/ops/projects/${p.id}`} className="btn btn-ghost btn-sm">Open →</Link></td>
                </tr>
              ))}
              {!projects.length && <tr><td colSpan={8}><div className="empty-state"><div className="empty-icon">🏗️</div><p>No projects yet. Create your first project.</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="card" style={{ maxWidth: '560px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
            <div className="flex-between mb-6">
              <h3>Create New Project</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={create} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group"><label>Project Name *</label><input className="input" required value={form.name} onChange={e => set('name', e.target.value)} /></div>
              <div className="input-group">
                <label>Client *</label>
                <select className="input" required value={form.client_id} onChange={e => set('client_id', e.target.value)}>
                  <option value="">Select client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                </select>
              </div>
              <div className="grid-2">
                <div className="input-group"><label>City</label>
                  <select className="input" value={form.city} onChange={e => set('city', e.target.value)}>
                    <option>Chennai</option><option>Coimbatore</option><option>Madurai</option>
                  </select>
                </div>
                <div className="input-group"><label>Locality</label><input className="input" value={form.locality} onChange={e => set('locality', e.target.value)} /></div>
              </div>
              <div className="grid-2">
                <div className="input-group"><label>Plot Area (sqft)</label><input className="input" type="number" value={form.plot_area_sqft} onChange={e => set('plot_area_sqft', e.target.value)} /></div>
                <div className="input-group"><label>Floors</label>
                  <select className="input" value={form.floors} onChange={e => set('floors', e.target.value)}>
                    <option value="G">G</option><option value="G+1">G+1</option><option value="G+2">G+2</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="input-group"><label>Spec Level</label>
                  <select className="input" value={form.spec_level} onChange={e => set('spec_level', e.target.value)}>
                    <option value="basic">Basic</option><option value="standard">Standard</option><option value="premium">Premium</option>
                  </select>
                </div>
                <div className="input-group"><label>Start Date</label><input className="input" type="date" value={form.start_date} onChange={e => set('start_date', e.target.value)} /></div>
              </div>
              <div className="input-group"><label>Total Contract Value (₹)</label><input className="input" type="number" value={form.total_contract_value} onChange={e => set('total_contract_value', e.target.value)} /></div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Create Project →</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
