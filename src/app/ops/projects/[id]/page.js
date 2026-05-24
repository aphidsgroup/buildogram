'use client';
import { useEffect, useState } from 'react';
import { use } from 'react';

export default function OpsProjectDetail({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [milestoneForm, setMilestoneForm] = useState({ name: '', description: '', planned_date: '', payment_amount: '' });
  const [boqForm, setBoqForm] = useState({ category: '', activity: '', unit: 'sqft', quantity: '', rate: '' });
  const [logForm, setLogForm] = useState({ notes: '', workers_count: '', weather: '', photo_urls: '' });
  const [coForm, setCoForm] = useState({ title: '', description: '', amount: '' });

  const load = () => fetch(`/api/projects/${id}`).then(r => r.json()).then(d => { setData(d); setLoading(false); });
  useEffect(() => { load(); }, [id]);

  const addMilestone = async (e) => {
    e.preventDefault();
    const order_no = (data.milestones?.length || 0) + 1;
    await fetch('/api/milestones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...milestoneForm, project_id: id, order_no }) });
    setMilestoneForm({ name: '', description: '', planned_date: '', payment_amount: '' });
    load();
  };

  const updateMilestone = async (mid, status) => {
    await fetch(`/api/milestones/${mid}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    load();
  };

  const addBoq = async (e) => {
    e.preventDefault();
    await fetch('/api/boq', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...boqForm, project_id: id }) });
    setBoqForm({ category: '', activity: '', unit: 'sqft', quantity: '', rate: '' });
    load();
  };

  const addLog = async (e) => {
    e.preventDefault();
    const photosArray = logForm.photo_urls.split(',').map(u => u.trim()).filter(Boolean);
    await fetch('/api/progress-logs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...logForm, photos: photosArray, project_id: id }) });
    setLogForm({ notes: '', workers_count: '', weather: '', photo_urls: '' });
    load();
  };

  const updateStatus = async (status) => {
    await fetch(`/api/projects/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    load();
  };

  const generateInvoice = async (m) => {
    if (!confirm(`Generate invoice for ₹${m.payment_amount}?`)) return;
    const res = await fetch('/api/ops/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_type: 'project_milestone',
        source_id: m.id,
        customer_name: p.client_name,
        customer_email: p.client_phone || '', // fallback
        amount: m.payment_amount,
        status: 'unpaid',
        due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
        metadata: { client_user_id: p.client_id, project_id: id, milestone_name: m.name }
      })
    });
    if (res.ok) alert('Invoice Generated successfully!');
    else alert('Failed to generate invoice');
  };

  const addChangeOrder = async (e) => {
    e.preventDefault();
    await fetch('/api/change-orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...coForm, project_id: id }) });
    setCoForm({ title: '', description: '', amount: '' });
    load();
  };

  const updateChangeOrder = async (coId, status) => {
    await fetch(`/api/change-orders/${coId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    load();
  };

  const statusColor = { design: 'badge-blue', boq_approval: 'badge-yellow', execution: 'badge-orange', handover: 'badge-green', complete: 'badge-green', on_hold: 'badge-gray' };
  const milestoneColor = { pending: 'badge-gray', in_progress: 'badge-orange', qc_pending: 'badge-yellow', complete: 'badge-green' };
  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';
  const TABS = ['overview', 'milestones', 'boq', 'change_orders', 'progress', 'issues'];

  if (loading || !data) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;
  const { project: p, milestones = [], logs = [], issues = [], changeOrders = [] } = data;

  const approvedChangesTotal = changeOrders.filter(c => c.status === 'approved').reduce((sum, c) => sum + Number(c.amount), 0);
  const revisedContractValue = Number(p.total_contract_value || 0) + approvedChangesTotal;

  return (
    <div>
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1>{p.name}</h1>
            <p className="text-muted mt-2">{p.city}{p.locality ? `, ${p.locality}` : ''} · {p.plot_area_sqft} sqft · {p.floors} · {p.spec_level}</p>
          </div>
          <div className="flex gap-3">
            <select className="input" style={{ width: 'auto' }} value={p.status} onChange={e => updateStatus(e.target.value)}>
              {['design','boq_approval','execution','handover','complete','on_hold'].map(s => <option key={s}>{s}</option>)}
            </select>
            <span className={`badge ${statusColor[p.status] || 'badge-gray'}`}>{p.status}</span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid-4 mb-6">
        {[['Revised Contract Value', fmt(revisedContractValue)], ['Completion', `${p.completion_pct || 0}%`], ['Milestones', milestones.length], ['Issues', issues.filter(i => i.status === 'open').length + ' open']].map(([l, v]) => (
          <div key={l} className="stat-card"><div className="stat-value" style={{ fontSize: '24px' }}>{v}</div><div className="stat-label">{l}</div></div>
        ))}
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: 'var(--bg-card)', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {TABS.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', borderRadius: '8px', background: tab === t ? 'var(--primary)' : 'none', color: tab === t ? 'white' : 'var(--text-muted)', fontSize: '13px', fontWeight: '500', textTransform: 'capitalize' }}>{t}</button>)}
      </div>

      {tab === 'overview' && (
        <div className="grid-2">
          <div className="card">
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Project Details</h3>
            {[['Client', p.client_name], ['Phone', p.client_phone], ['PM', p.pm_name || 'Unassigned'], ['Engineer', p.engineer_name || 'Unassigned'], ['Start Date', p.start_date ? new Date(p.start_date).toLocaleDateString('en-IN') : '—'], ['Expected End', p.expected_end_date ? new Date(p.expected_end_date).toLocaleDateString('en-IN') : '—']].map(([k, v]) => (
              <div key={k} className="flex-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="text-muted" style={{ fontSize: '13px' }}>{k}</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Recent Progress</h3>
            {logs.slice(0, 4).map(l => (
              <div key={l.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div className="flex-between mb-1">
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>{new Date(l.log_date).toLocaleDateString('en-IN')}</span>
                  <span className="text-muted text-xs">{l.logged_by_name}</span>
                </div>
                <p className="text-muted" style={{ fontSize: '13px' }}>{l.notes || 'No notes'}</p>
              </div>
            ))}
            {!logs.length && <p className="text-muted text-sm">No progress logs yet.</p>}
          </div>
        </div>
      )}

      {tab === 'milestones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {milestones.map((m, i) => (
            <div key={m.id} className="card">
              <div className="flex-between">
                <div className="flex gap-3" style={{ alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.status === 'complete' ? 'var(--success)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: m.status === 'complete' ? 'white' : 'var(--text-muted)' }}>{i + 1}</div>
                  <div><div style={{ fontWeight: '600' }}>{m.name}</div><div className="text-muted text-xs">{m.description}</div></div>
                </div>
                <div className="flex gap-3" style={{ alignItems: 'center' }}>
                  <span className={`badge ${milestoneColor[m.status] || 'badge-gray'}`}>{m.status}</span>
                  <select className="input" style={{ width: 'auto', fontSize: '12px', padding: '4px 8px' }} value={m.status}
                    onChange={e => updateMilestone(m.id, e.target.value)}>
                    {['pending','in_progress','qc_pending','complete'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {m.payment_amount > 0 && (
                <div className="mt-4 flex-between" style={{ padding: '10px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', fontSize: '13px' }}>
                  <span>💰 Payment on completion: {fmt(m.payment_amount)}</span>
                  {m.status === 'complete' && (
                    <button onClick={() => generateInvoice(m)} className="btn btn-sm" style={{ background: '#16a34a', color: 'white', padding: '4px 10px', fontSize: '11px' }}>🧾 Generate Invoice</button>
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="card">
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>Add Milestone</h3>
            <form onSubmit={addMilestone} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input className="input" placeholder="Milestone name *" required style={{ flex: '2', minWidth: '180px' }} value={milestoneForm.name} onChange={e => setMilestoneForm(f => ({ ...f, name: e.target.value }))} />
              <input className="input" placeholder="Description" style={{ flex: '2', minWidth: '180px' }} value={milestoneForm.description} onChange={e => setMilestoneForm(f => ({ ...f, description: e.target.value }))} />
              <input className="input" type="date" style={{ flex: '1', minWidth: '140px' }} value={milestoneForm.planned_date} onChange={e => setMilestoneForm(f => ({ ...f, planned_date: e.target.value }))} />
              <input className="input" type="number" placeholder="Payment ₹" style={{ flex: '1', minWidth: '120px' }} value={milestoneForm.payment_amount} onChange={e => setMilestoneForm(f => ({ ...f, payment_amount: e.target.value }))} />
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      )}

      {tab === 'boq' && (
        <div>
          <div className="card mb-6">
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>Add BOQ Item</h3>
            <form onSubmit={addBoq} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input className="input" placeholder="Category *" required style={{ flex: '1', minWidth: '120px' }} value={boqForm.category} onChange={e => setBoqForm(f => ({ ...f, category: e.target.value }))} />
              <input className="input" placeholder="Activity *" required style={{ flex: '2', minWidth: '180px' }} value={boqForm.activity} onChange={e => setBoqForm(f => ({ ...f, activity: e.target.value }))} />
              <select className="input" style={{ flex: '1', minWidth: '80px' }} value={boqForm.unit} onChange={e => setBoqForm(f => ({ ...f, unit: e.target.value }))}>
                {['sqft','sqm','rft','nos','kg','bags','cum','cum'].map(u => <option key={u}>{u}</option>)}
              </select>
              <input className="input" type="number" placeholder="Qty" style={{ flex: '1', minWidth: '80px' }} value={boqForm.quantity} onChange={e => setBoqForm(f => ({ ...f, quantity: e.target.value }))} />
              <input className="input" type="number" placeholder="Rate ₹" style={{ flex: '1', minWidth: '100px' }} value={boqForm.rate} onChange={e => setBoqForm(f => ({ ...f, rate: e.target.value }))} />
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
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
                  {!(data.boqItems?.length) && <tr><td colSpan={6}><div className="empty-state"><div className="empty-icon">📋</div><p>No BOQ items yet</p></div></td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'change_orders' && (
        <div>
          <div className="card mb-6">
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>Raise Change Order</h3>
            <form onSubmit={addChangeOrder} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input className="input" placeholder="Title (e.g. Premium Tiles Upgrade) *" required style={{ flex: '2', minWidth: '180px' }} value={coForm.title} onChange={e => setCoForm(f => ({ ...f, title: e.target.value }))} />
              <input className="input" placeholder="Description" style={{ flex: '2', minWidth: '180px' }} value={coForm.description} onChange={e => setCoForm(f => ({ ...f, description: e.target.value }))} />
              <input className="input" type="number" placeholder="Amount ₹ (Use - for deduction)" required style={{ flex: '1', minWidth: '120px' }} value={coForm.amount} onChange={e => setCoForm(f => ({ ...f, amount: e.target.value }))} />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {changeOrders.map(c => (
              <div key={c.id} className="card" style={{ padding: '16px 20px', borderLeft: c.status === 'approved' ? '4px solid var(--success)' : c.status === 'rejected' ? '4px solid var(--error)' : '4px solid var(--border)' }}>
                <div className="flex-between">
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{c.title}</div>
                    <div className="text-muted text-sm">{c.description}</div>
                  </div>
                  <div className="flex gap-4" style={{ alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '16px', color: c.amount < 0 ? 'var(--error)' : 'var(--success)' }}>
                      {c.amount > 0 ? '+' : ''}{fmt(c.amount)}
                    </span>
                    <div className="flex gap-2" style={{ alignItems: 'center' }}>
                      <span className={`badge ${c.status === 'approved' ? 'badge-green' : c.status === 'rejected' ? 'badge-red' : 'badge-yellow'}`}>{c.status}</span>
                      {c.status === 'pending' && (
                        <select className="input" style={{ width: 'auto', fontSize: '12px', padding: '4px 8px' }} value={c.status} onChange={e => updateChangeOrder(c.id, e.target.value)}>
                          <option value="pending">Pending</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!changeOrders.length && <div className="empty-state"><div className="empty-icon">📝</div><p>No change orders raised yet.</p></div>}
          </div>
        </div>
      )}

      {tab === 'progress' && (
        <div>
          <div className="card mb-6">
            <h3 style={{ fontSize: '15px', marginBottom: '16px' }}>Add Progress Log</h3>
            <form onSubmit={addLog} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <textarea className="input" placeholder="Progress notes..." required style={{ flex: '3', minWidth: '200px', minHeight: '60px' }} value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))} />
              <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input className="input" type="text" placeholder="Photo URLs (comma separated)" value={logForm.photo_urls} onChange={e => setLogForm(f => ({ ...f, photo_urls: e.target.value }))} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input className="input" type="number" placeholder="Workers" style={{ flex: '1' }} value={logForm.workers_count} onChange={e => setLogForm(f => ({ ...f, workers_count: e.target.value }))} />
                  <select className="input" style={{ flex: '1' }} value={logForm.weather} onChange={e => setLogForm(f => ({ ...f, weather: e.target.value }))}>
                    <option value="">Weather</option><option>Sunny</option><option>Cloudy</option><option>Rainy</option><option>Windy</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Log Progress</button>
              </div>
            </form>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {logs.map(l => (
              <div key={l.id} className="card" style={{ padding: '16px 20px' }}>
                <div className="flex-between mb-2">
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>{new Date(l.log_date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
                  <div className="flex gap-3">
                    {l.workers_count > 0 && <span className="badge badge-blue">👷 {l.workers_count} workers</span>}
                    {l.weather && <span className="badge badge-gray">{l.weather}</span>}
                    <span className="text-muted text-xs">{l.logged_by_name}</span>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{l.notes}</p>
              </div>
            ))}
            {!logs.length && <div className="empty-state"><div className="empty-icon">📸</div><p>No progress logs yet</p></div>}
          </div>
        </div>
      )}

      {tab === 'issues' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {issues.map(i => (
            <div key={i.id} className="card" style={{ padding: '16px 20px' }}>
              <div className="flex-between">
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{i.title}</div>
                  <div className="text-muted text-sm">{i.description}</div>
                </div>
                <div className="flex gap-2">
                  <span className={`badge ${i.priority === 'critical' ? 'badge-red' : i.priority === 'high' ? 'badge-yellow' : 'badge-gray'}`}>{i.priority}</span>
                  <span className={`badge ${i.status === 'open' ? 'badge-red' : i.status === 'resolved' ? 'badge-green' : 'badge-yellow'}`}>{i.status}</span>
                </div>
              </div>
            </div>
          ))}
          {!issues.length && <div className="empty-state"><div className="empty-icon">✅</div><p>No issues raised</p></div>}
        </div>
      )}
    </div>
  );
}
