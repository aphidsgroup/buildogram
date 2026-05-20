'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PartnerDashboard() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logForm, setLogForm] = useState({ project_id: '', notes: '', workers_count: '', weather: '' });
  const [logMsg, setLogMsg] = useState('');

  useEffect(() => {
    Promise.all([fetch('/api/auth/me').then(r => r.json()), fetch('/api/projects').then(r => r.json())])
      .then(([ud, pd]) => { setUser(ud.user); setProjects(pd.projects || []); setLoading(false); });
  }, []);

  const submitLog = async (e) => {
    e.preventDefault();
    await fetch('/api/progress-logs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(logForm) });
    setLogMsg('✅ Log submitted successfully!');
    setLogForm(f => ({ ...f, notes: '', workers_count: '', weather: '' }));
    setTimeout(() => setLogMsg(''), 3000);
  };

  const statusColor = { execution: 'badge-orange', design: 'badge-blue', complete: 'badge-green', on_hold: 'badge-gray' };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Partner Dashboard</h1>
        <p className="text-muted mt-2">Welcome, {user?.name}. Here are your assigned projects.</p>
      </div>

      <div className="grid-2 mb-8">
        {/* PROJECTS */}
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Assigned Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects.map(p => (
              <div key={p.id} className="card" style={{ padding: '16px 20px' }}>
                <div className="flex-between mb-2">
                  <h4 style={{ fontSize: '15px' }}>{p.name}</h4>
                  <span className={`badge ${statusColor[p.status] || 'badge-gray'}`}>{p.status}</span>
                </div>
                <p className="text-muted text-sm">{p.city}{p.locality ? `, ${p.locality}` : ''}</p>
                <div className="mt-3">
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.completion_pct || 0}%` }} /></div>
                  <span className="text-xs text-muted">{p.completion_pct || 0}% complete</span>
                </div>
                <Link href={`/partner/logs?project=${p.id}`} className="btn btn-ghost btn-sm mt-3">Submit Log →</Link>
              </div>
            ))}
            {!projects.length && <div className="empty-state"><div className="empty-icon">🏗️</div><p>No projects assigned yet</p></div>}
          </div>
        </div>

        {/* QUICK LOG */}
        <div className="card">
          <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Submit Daily Progress Log</h3>
          <form onSubmit={submitLog} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="input-group">
              <label>Project</label>
              <select className="input" required value={logForm.project_id} onChange={e => setLogForm(f => ({ ...f, project_id: e.target.value }))}>
                <option value="">Select project...</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Progress Notes *</label>
              <textarea className="input" required placeholder="What work was done today? Any issues?" value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Workers on Site</label>
                <input className="input" type="number" placeholder="0" value={logForm.workers_count} onChange={e => setLogForm(f => ({ ...f, workers_count: e.target.value }))} />
              </div>
              <div className="input-group">
                <label>Weather</label>
                <select className="input" value={logForm.weather} onChange={e => setLogForm(f => ({ ...f, weather: e.target.value }))}>
                  <option value="">Select...</option><option>Sunny</option><option>Cloudy</option><option>Rainy</option><option>Windy</option>
                </select>
              </div>
            </div>
            {logMsg && <div style={{ color: 'var(--success)', fontSize: '14px' }}>{logMsg}</div>}
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Submit Log →</button>
          </form>
        </div>
      </div>

      {/* QC SECTION */}
      <div className="card">
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Quality Control Submissions</h3>
        <p className="text-muted text-sm mb-6">Submit QC checklists for each milestone to unlock milestone payments.</p>
        <Link href="/partner/qc" className="btn btn-outline">Go to QC Checklists →</Link>
      </div>
    </div>
  );
}
