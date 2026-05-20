'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ProjectContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('milestones');
  const [loading, setLoading] = useState(true);
  const [issueForm, setIssueForm] = useState({ title: '', description: '', priority: 'medium' });

  useEffect(() => {
    if (!id) { fetch('/api/projects').then(r => r.json()).then(d => { if (d.projects?.[0]) window.location.href = `/client/project?id=${d.projects[0].id}`; else setLoading(false); }); return; }
    fetch(`/api/projects/${id}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, [id]);

  const raiseIssue = async (e) => {
    e.preventDefault();
    await fetch('/api/issues', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...issueForm, project_id: id }) });
    setIssueForm({ title: '', description: '', priority: 'medium' });
    alert('Issue raised! Our team will respond within 24 hours.');
  };

  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';
  const milestoneIcon = { pending: '⏳', in_progress: '🔄', qc_pending: '🔍', complete: '✅' };
  const TABS = ['milestones', 'progress', 'boq', 'documents', 'issues'];

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;
  if (!data) return <div className="empty-state"><div className="empty-icon">🏗️</div><p>No project found. Please contact your PM.</p></div>;

  const { project: p, milestones = [], logs = [], issues = [] } = data;

  return (
    <div>
      <div className="page-header">
        <h1>{p.name}</h1>
        <p className="text-muted mt-2">{p.city}{p.locality ? `, ${p.locality}` : ''} · {p.plot_area_sqft} sqft · {p.floors} · {p.spec_level} spec</p>
      </div>

      {/* PROGRESS OVERVIEW */}
      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.1), rgba(249,115,22,0.05))', border: '1px solid rgba(15,118,110,0.2)' }}>
        <div className="flex-between mb-3">
          <span style={{ fontWeight: '600' }}>Overall Completion</span>
          <span style={{ fontWeight: '800', fontSize: '20px', color: 'var(--primary)' }}>{p.completion_pct || 0}%</span>
        </div>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div className="progress-fill" style={{ width: `${p.completion_pct || 0}%` }} />
        </div>
        <div className="grid-4 mt-6">
          {[['PM', p.pm_name || '—'], ['Contract', fmt(p.total_contract_value)], ['Started', p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN') : 'TBD'], ['Status', p.status?.replace('_',' ')]].map(([k, v]) => (
            <div key={k}><div className="text-muted text-xs mb-1">{k}</div><div style={{ fontWeight: '600', fontSize: '14px' }}>{v}</div></div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', overflowX: 'auto', background: 'var(--bg-card)', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {TABS.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', borderRadius: '8px', background: tab === t ? 'var(--primary)' : 'none', color: tab === t ? 'white' : 'var(--text-muted)', fontSize: '13px', fontWeight: '500', textTransform: 'capitalize', whiteSpace: 'nowrap' }}>{t}</button>)}
      </div>

      {tab === 'milestones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {milestones.map((m, i) => (
            <div key={m.id} className="card" style={{ border: m.status === 'complete' ? '1px solid rgba(34,197,94,0.3)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '24px', minWidth: '32px', textAlign: 'center', marginTop: '2px' }}>{milestoneIcon[m.status] || '⏳'}</div>
                <div style={{ flex: 1 }}>
                  <div className="flex-between mb-1">
                    <h4 style={{ fontSize: '16px' }}>{i + 1}. {m.name}</h4>
                    <span style={{ fontSize: '13px', color: m.status === 'complete' ? 'var(--success)' : 'var(--text-muted)', fontWeight: '600' }}>{m.status?.replace('_', ' ')}</span>
                  </div>
                  {m.description && <p className="text-muted text-sm">{m.description}</p>}
                  <div className="flex gap-4 mt-3">
                    {m.planned_date && <span className="text-muted text-xs">📅 Target: {new Date(m.planned_date).toLocaleDateString('en-IN')}</span>}
                    {m.actual_date && <span style={{ color: 'var(--success)', fontSize: '12px' }}>✅ Done: {new Date(m.actual_date).toLocaleDateString('en-IN')}</span>}
                    {m.payment_amount > 0 && <span style={{ color: 'var(--accent)', fontSize: '12px' }}>💰 {fmt(m.payment_amount)}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!milestones.length && <div className="empty-state"><div className="empty-icon">⏳</div><p>Milestones will appear once your PM sets up the project schedule.</p></div>}
        </div>
      )}

      {tab === 'progress' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {logs.map(l => (
            <div key={l.id} className="card" style={{ padding: '16px 20px' }}>
              <div className="flex-between mb-2">
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{new Date(l.log_date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                <div className="flex gap-2">
                  {l.workers_count > 0 && <span className="badge badge-blue">👷 {l.workers_count}</span>}
                  {l.weather && <span className="badge badge-gray">{l.weather}</span>}
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '14px' }}>{l.notes}</p>
              {l.photos?.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {l.photos.map((ph, i) => <img key={i} src={ph} alt="Site" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />)}
                </div>
              )}
            </div>
          ))}
          {!logs.length && <div className="empty-state"><div className="empty-icon">📸</div><p>Site progress photos and logs will appear here daily.</p></div>}
        </div>
      )}

      {tab === 'boq' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'rgba(15,118,110,0.05)' }}>
            <p className="text-sm" style={{ color: 'var(--primary)' }}>📋 This is your approved Bill of Quantities. All work and costs are governed by this document.</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Category</th><th>Activity</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
              <tbody>
                {(data.boqItems || []).map(b => (
                  <tr key={b.id}>
                    <td><span className="badge badge-gray">{b.category}</span></td>
                    <td style={{ fontWeight: '500' }}>{b.activity}</td>
                    <td className="text-muted">{b.unit}</td>
                    <td className="text-muted">{b.quantity}</td>
                    <td className="text-muted">₹{Number(b.rate).toLocaleString('en-IN')}</td>
                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>₹{Number(b.amount || b.quantity * b.rate).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
                {!(data.boqItems?.length) && <tr><td colSpan={6}><div className="empty-state"><div className="empty-icon">📋</div><p>BOQ will appear after approval</p></div></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div className="card">
          {(data.documents || []).length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📁</div><p>Documents will be uploaded by your team as the project progresses.</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.documents.map(d => (
                <div key={d.id} className="flex-between" style={{ padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                  <div className="flex gap-3"><span style={{ fontSize: '20px' }}>📄</span><div><div style={{ fontWeight: '600', fontSize: '14px' }}>{d.name}</div><div className="text-muted text-xs">{d.type}</div></div></div>
                  <a href={d.file_url} target="_blank" className="btn btn-ghost btn-sm">Download</a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'issues' && (
        <div>
          <div className="card mb-6">
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Raise a New Issue</h3>
            <form onSubmit={raiseIssue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group"><label>Issue Title *</label><input className="input" required value={issueForm.title} onChange={e => setIssueForm(f => ({ ...f, title: e.target.value }))} placeholder="Brief description of the issue" /></div>
              <div className="input-group"><label>Details</label><textarea className="input" value={issueForm.description} onChange={e => setIssueForm(f => ({ ...f, description: e.target.value }))} placeholder="Provide more details..." /></div>
              <div className="input-group"><label>Priority</label>
                <select className="input" value={issueForm.priority} onChange={e => setIssueForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Submit Issue</button>
            </form>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {issues.map(i => (
              <div key={i.id} className="card" style={{ padding: '16px 20px', border: i.status === 'open' ? '1px solid rgba(239,68,68,0.2)' : '1px solid var(--border)' }}>
                <div className="flex-between">
                  <div style={{ fontWeight: '600' }}>{i.title}</div>
                  <div className="flex gap-2">
                    <span className={`badge ${i.priority === 'critical' ? 'badge-red' : i.priority === 'high' ? 'badge-yellow' : 'badge-gray'}`}>{i.priority}</span>
                    <span className={`badge ${i.status === 'open' ? 'badge-red' : i.status === 'resolved' ? 'badge-green' : 'badge-yellow'}`}>{i.status}</span>
                  </div>
                </div>
                {i.description && <p className="text-muted text-sm mt-2">{i.description}</p>}
              </div>
            ))}
            {!issues.length && <div className="empty-state"><div className="empty-icon">✅</div><p>No issues raised yet</p></div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ClientProjectPage() {
  return <Suspense fallback={<div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>}><ProjectContent /></Suspense>;
}
