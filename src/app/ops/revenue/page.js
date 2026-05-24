'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OpsRevenuePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    source_type: 'manual', revenue_category: 'other', title: '', customer_name: '',
    amount_expected: '', amount_received: '', commission_expected: '', commission_received: '',
    status: 'expected'
  });
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ops/revenue');
      const d = await res.json();
      if (d.success) setData(d);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/ops/revenue', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount_expected: Number(form.amount_expected) || 0,
          amount_received: Number(form.amount_received) || 0,
          commission_expected: Number(form.commission_expected) || 0,
          commission_received: Number(form.commission_received) || 0
        })
      });
      const d = await res.json();
      if (d.success) {
        setModalOpen(false);
        setForm({ source_type: 'manual', revenue_category: 'other', title: '', customer_name: '', amount_expected: '', amount_received: '', commission_expected: '', commission_received: '', status: 'expected' });
        fetchData();
      }
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;
  if (!data) return <div className="text-center p-10 text-red-500">Failed to load revenue data.</div>;

  const { totals, records } = data;

  const fmt = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num || 0);

  return (
    <div className="pb-20">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Revenue & Finance</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Track expected and received revenue across all Buildogram workflows.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>+ Create Record</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="card" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Expected</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a' }}>{fmt(totals?.total_amount_expected)}</div>
        </div>
        <div className="card" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <div style={{ fontSize: '12px', color: '#166534', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Received</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#15803d' }}>{fmt(totals?.total_amount_received)}</div>
        </div>
        <div className="card" style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
          <div style={{ fontSize: '12px', color: '#92400e', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Pending</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#d97706' }}>{fmt(totals?.total_amount_pending)}</div>
        </div>
        <div className="card" style={{ background: '#f0f9ff', borderColor: '#bae6fd' }}>
          <div style={{ fontSize: '12px', color: '#075985', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Commission Received</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: '#0ea5e9' }}>{fmt(totals?.total_commission_received)}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Recent Revenue Records</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'white', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Title / Customer</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Expected</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Received</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Pending</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && <tr><td colSpan={7} className="text-center py-8 text-muted">No revenue records found.</td></tr>}
              {records.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{r.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{r.customer_name}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}><span className="badge badge-gray">{r.revenue_category.replace('_', ' ')}</span></td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500 }}>{fmt(r.amount_expected)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#166534' }}>{fmt(r.amount_received)}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: r.amount_pending > 0 ? '#b45309' : '#64748b' }}>{fmt(r.amount_pending)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className={`badge ${r.status === 'received' ? 'bg-green-100 text-green-700' : r.status === 'partially_received' ? 'bg-yellow-100 text-yellow-700' : 'badge-gray'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Link 
                      href={`/ops/invoices?action=create&rev_id=${r.id}&name=${encodeURIComponent(r.customer_name)}&cat=${r.revenue_category}&sub=${r.amount_expected}&paid=${r.amount_received}`}
                      className="btn btn-sm btn-outline text-xs"
                    >
                      + Invoice
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Create Revenue Record</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label className="label">Category</label>
                  <select className="input" required value={form.revenue_category} onChange={e => setForm({...form, revenue_category: e.target.value})}>
                    <option value="construction">Construction</option>
                    <option value="material_commission">Material Commission</option>
                    <option value="partner_package">Partner Package</option>
                    <option value="property_listing">Property Listing</option>
                    <option value="rental_resale">Rental / Resale</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Status</label>
                  <select className="input" required value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                    <option value="expected">Expected</option>
                    <option value="partially_received">Partially Received</option>
                    <option value="received">Received</option>
                    <option value="lost">Lost</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="label">Title</label>
                <input type="text" className="input" required placeholder="e.g. 10% milestone payment" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label className="label">Customer Name</label>
                <input type="text" className="input" required value={form.customer_name} onChange={e => setForm({...form, customer_name: e.target.value})} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label className="label">Amount Expected (₹)</label>
                  <input type="number" className="input" required min="0" value={form.amount_expected} onChange={e => setForm({...form, amount_expected: e.target.value})} />
                </div>
                <div>
                  <label className="label">Amount Received (₹)</label>
                  <input type="number" className="input" required min="0" value={form.amount_received} onChange={e => setForm({...form, amount_received: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label className="label">Commission Expected (₹) <span style={{fontWeight:400, color:'#94a3b8'}}>(optional)</span></label>
                  <input type="number" className="input" min="0" value={form.commission_expected} onChange={e => setForm({...form, commission_expected: e.target.value})} />
                </div>
                <div>
                  <label className="label">Commission Received (₹) <span style={{fontWeight:400, color:'#94a3b8'}}>(optional)</span></label>
                  <input type="number" className="input" min="0" value={form.commission_received} onChange={e => setForm({...form, commission_received: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Record'}</button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
