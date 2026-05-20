'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATUS_PIPELINE = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
const STATUS_COLOR = { new: 'badge-blue', contacted: 'badge-yellow', qualified: 'badge-orange', proposal: 'badge-orange', won: 'badge-green', lost: 'badge-red' };

export default function OpsLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const load = () => fetch('/api/leads').then(r => r.json()).then(d => { setLeads(d.leads || []); setLoading(false); });
  useEffect(() => { load(); }, []);

  const update = async (id, data) => {
    await fetch(`/api/leads/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    load();
  };

  const filtered = leads.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search);
    return matchFilter && matchSearch;
  });

  const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : n.toLocaleString('en-IN')) : '—';

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header flex-between">
        <div><h1>Leads</h1><p className="text-muted mt-2">{leads.length} total leads in pipeline</p></div>
      </div>

      {/* PIPELINE BAR */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', ...STATUS_PIPELINE].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`badge ${filter === s ? 'badge-orange' : 'badge-gray'}`}
            style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '13px' }}>
            {s === 'all' ? `All (${leads.length})` : `${s} (${leads.filter(l => l.status === s).length})`}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <input className="input mb-6" style={{ maxWidth: '360px' }} placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} />

      {/* TABLE */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Phone</th><th>City</th><th>Plot</th><th>Estimated Cost</th><th>Source</th><th>Status</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td><a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a></td>
                  <td className="text-muted">{l.city}{l.locality ? `, ${l.locality}` : ''}</td>
                  <td className="text-muted">{l.plot_area_sqft ? `${l.plot_area_sqft} sqft` : '—'}</td>
                  <td className="text-muted">{l.estimated_cost_min ? `${fmt(l.estimated_cost_min)}–${fmt(l.estimated_cost_max)}` : '—'}</td>
                  <td><span className="badge badge-gray">{l.source}</span></td>
                  <td>
                    <select className="input" style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }} value={l.status}
                      onChange={e => update(l.id, { status: e.target.value })}>
                      {STATUS_PIPELINE.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="text-muted text-xs">{new Date(l.created_at).toLocaleDateString('en-IN')}</td>
                  <td><button onClick={() => setSelected(l)} className="btn btn-ghost btn-sm">View</button></td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={9}><div className="empty-state"><div className="empty-icon">🎯</div><p>No leads found</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="card" style={{ maxWidth: '540px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="flex-between mb-6">
              <h3>Lead Details</h3>
              <button onClick={() => setSelected(null)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[['Name', selected.name], ['Phone', selected.phone], ['Email', selected.email || '—'], ['City', selected.city], ['Locality', selected.locality || '—'], ['Plot Area', selected.plot_area_sqft ? `${selected.plot_area_sqft} sqft` : '—'], ['Floors', selected.floors || '—'], ['Spec Level', selected.spec_level || '—'], ['Estimated', selected.estimated_cost_min ? `${fmt(selected.estimated_cost_min)}–${fmt(selected.estimated_cost_max)}` : '—'], ['Source', selected.source]].map(([k, v]) => (
                <div key={k}><div className="text-muted text-xs mb-1">{k}</div><div style={{ fontWeight: '600', fontSize: '14px' }}>{v}</div></div>
              ))}
            </div>
            {selected.notes && <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', fontSize: '14px' }}>{selected.notes}</div>}
            <div className="flex gap-3 mt-6">
              <a href={`tel:${selected.phone}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>📞 Call</a>
              <a href={`https://wa.me/91${selected.phone}`} target="_blank" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
