'use client';
import { useState } from 'react';
import Link from 'next/link';

/* ── Demo Data ──────────────────────────────────────────────────────── */
const DEMO_SUPPLIERS = [
  { id: 'SUP001', name: 'Shree Cement & Aggregates', type: 'Cement/Aggregates', phone: '9876543210' },
  { id: 'SUP002', name: 'TN Steel Traders', type: 'Steel/TMT', phone: '9876543211' },
  { id: 'SUP003', name: 'Chennai Sand Supply Co.', type: 'Sand/Aggregates', phone: '9876543212' },
  { id: 'SUP004', name: 'Buildmart Tiles & Fittings', type: 'Tiles/Plumbing', phone: '9876543213' },
  { id: 'SUP005', name: 'Laxmi Paints Distributors', type: 'Paints/Finishing', phone: '9876543214' },
];

const MATERIAL_STATUSES = [
  'sent_to_buildogram', 'quotation_pending', 'quoted', 'approved',
  'ordered', 'dispatched', 'delivered', 'cancelled',
];

const STATUS_STYLE = {
  sent_to_buildogram: { bg: '#EFF6FF', color: '#2563EB' },
  quotation_pending:  { bg: '#FEF9C3', color: '#854D0E' },
  quoted:             { bg: '#F5F3FF', color: '#7C3AED' },
  approved:           { bg: '#ECFDF5', color: '#059669' },
  ordered:            { bg: '#FFF7ED', color: '#C2410C' },
  dispatched:         { bg: '#FDF4FF', color: '#9333EA' },
  delivered:          { bg: '#DCFCE7', color: '#166534' },
  cancelled:          { bg: '#FEF2F2', color: '#DC2626' },
};

function initDemoRequests() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('bos_admin_material_requests');
  if (stored) return JSON.parse(stored);
  const demo = [
    { id: 'MR001', projectId: 'P001', projectName: 'Rajesh Kumar G+2 Villa', partnerName: 'BuildRight Constructions', partnerType: 'contractor', materialName: 'TMT Steel Bars Fe500D', quantity: '8 MT', unit: 'MT', urgency: 'high', notes: 'Required for ground floor columns and beams. Fe500D grade only.', status: 'sent_to_buildogram', assignedSupplierId: null, createdAt: '2025-06-01', quotes: [] },
    { id: 'MR002', projectId: 'P001', projectName: 'Rajesh Kumar G+2 Villa', partnerName: 'BuildRight Constructions', partnerType: 'contractor', materialName: 'OPC 53 Grade Cement', quantity: '200 Bags', unit: 'Bags', urgency: 'medium', notes: 'Ultra Tech or ACC preferred. Deliver in 2 lots.', status: 'quotation_pending', assignedSupplierId: 'SUP001', createdAt: '2025-05-28', quotes: [
      { supplierId: 'SUP001', supplierName: 'Shree Cement & Aggregates', unitRate: 410, total: 82000, deliveryDays: 3, validTill: '2025-06-10', notes: 'Ultra Tech 53 grade. Delivery in 2 loads.', status: 'submitted', submittedAt: '2025-05-29', selected: false },
    ]},
    { id: 'MR003', projectId: 'P002', projectName: 'Sunrise Apartment Complex', partnerName: 'Apex Builders Ltd.', partnerType: 'builder', materialName: 'AAC Blocks 600x200x200', quantity: '5000 Nos', unit: 'Nos', urgency: 'low', notes: '600x200x200 size. Autoclaved Aerated Concrete only.', status: 'quoted', assignedSupplierId: 'SUP003', createdAt: '2025-05-25', quotes: [
      { supplierId: 'SUP003', supplierName: 'Chennai Sand Supply Co.', unitRate: 52, total: 260000, deliveryDays: 7, validTill: '2025-06-15', notes: 'Topcem AAC blocks. Delivery in 3 lots.', status: 'submitted', submittedAt: '2025-05-26', selected: false },
      { supplierId: 'SUP004', supplierName: 'Buildmart Tiles & Fittings', unitRate: 48, total: 240000, deliveryDays: 10, validTill: '2025-06-12', notes: 'JK Lakshmi AAC. Free delivery above 2L.', status: 'submitted', submittedAt: '2025-05-27', selected: true },
    ]},
    { id: 'MR004', projectId: 'P003', projectName: 'Metro View Residency', partnerName: 'Construct Pro Firm', partnerType: 'contractor', materialName: 'River Sand M-Sand Mix', quantity: '30 Loads', unit: 'Loads', urgency: 'high', notes: '50% river sand + 50% M-sand mix for plastering.', status: 'approved', assignedSupplierId: 'SUP003', createdAt: '2025-05-20', quotes: [
      { supplierId: 'SUP003', supplierName: 'Chennai Sand Supply Co.', unitRate: 12000, total: 360000, deliveryDays: 2, validTill: '2025-06-05', notes: 'Lorry loads, directly from yard.', status: 'submitted', submittedAt: '2025-05-21', selected: true },
    ]},
    { id: 'MR005', projectId: 'P004', projectName: 'Priya Lakshmi Row Houses', partnerName: 'Elite Construction', partnerType: 'builder', materialName: 'Vitrified Tiles 600x600', quantity: '3500 sqft', unit: 'Sqft', urgency: 'medium', notes: 'Light grey or off-white. Anti-skid finish for bathrooms.', status: 'ordered', assignedSupplierId: 'SUP004', createdAt: '2025-05-15', quotes: [
      { supplierId: 'SUP004', supplierName: 'Buildmart Tiles & Fittings', unitRate: 65, total: 227500, deliveryDays: 5, validTill: '2025-06-01', notes: 'Johnson tiles. GVT polished.', status: 'submitted', submittedAt: '2025-05-16', selected: true },
    ]},
  ];
  localStorage.setItem('bos_admin_material_requests', JSON.stringify(demo));
  return demo;
}

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || { bg: '#F1F5F9', color: '#64748B' };
  return <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>{status.replace(/_/g, ' ')}</span>;
}

function UrgencyBadge({ urgency }) {
  const map = { high: ['#FEF2F2','#DC2626','🔴'], medium: ['#FEF9C3','#854D0E','🟡'], low: ['#ECFDF5','#059669','🟢'] };
  const [bg, color, dot] = map[urgency] || map.low;
  return <span style={{ background: bg, color, padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>{dot} {urgency}</span>;
}

export default function AdminMaterialRequests() {
  const [requests, setRequests] = useState(() => typeof window !== 'undefined' ? initDemoRequests() : []);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [assignModal, setAssignModal] = useState(null);
  const [toast, setToast] = useState('');

  const save = (updated) => {
    setRequests(updated);
    if (typeof window !== 'undefined') localStorage.setItem('bos_admin_material_requests', JSON.stringify(updated));
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const updateStatus = (id, status) => {
    const updated = requests.map(r => r.id === id ? { ...r, status } : r);
    save(updated);
    if (selected?.id === id) setSelected(r => ({ ...r, status }));
    showToast(`✅ Status updated to "${status.replace(/_/g, ' ')}"`);
  };

  const assignSupplier = (reqId, supplierId) => {
    const supplier = DEMO_SUPPLIERS.find(s => s.id === supplierId);
    const updated = requests.map(r => r.id === reqId ? { ...r, assignedSupplierId: supplierId, status: r.status === 'sent_to_buildogram' ? 'quotation_pending' : r.status } : r);
    save(updated);
    if (selected?.id === reqId) setSelected(r => ({ ...r, assignedSupplierId: supplierId }));
    setAssignModal(null);
    showToast(`✅ Assigned to ${supplier?.name}`);
  };

  const selectQuote = (reqId, supplierId) => {
    const updated = requests.map(r => {
      if (r.id !== reqId) return r;
      return { ...r, status: 'approved', quotes: r.quotes.map(q => ({ ...q, selected: q.supplierId === supplierId })) };
    });
    save(updated);
    if (selected?.id === reqId) setSelected(updated.find(r => r.id === reqId));
    showToast('✅ Quote approved and status set to approved');
  };

  const filtered = requests.filter(r => {
    const ms = !search || r.materialName.toLowerCase().includes(search.toLowerCase()) || r.partnerName.toLowerCase().includes(search.toLowerCase()) || r.projectName.toLowerCase().includes(search.toLowerCase());
    const fs = statusFilter === 'All' || r.status === statusFilter;
    return ms && fs;
  });

  const counts = MATERIAL_STATUSES.reduce((a, s) => ({ ...a, [s]: requests.filter(r => r.status === s).length }), {});

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#F8FAFC' }}>
      {toast && <div style={{ position: 'fixed', top: 20, right: 20, background: '#0F172A', color: 'white', padding: '12px 20px', borderRadius: '12px', zIndex: 9999, fontWeight: 600, fontSize: '14px' }}>{toast}</div>}

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '32px 40px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', maxWidth: '1400px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Link href="/ops/dashboard" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}>← Admin Dashboard</Link>
            </div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800 }}>🧱 Material Request Center</h1>
            <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: '14px' }}>Manage all partner RFQs — assign suppliers, review quotes, update order status</p>
          </div>
          <Link href="/admin/quotations" style={{ padding: '10px 20px', background: '#FC6E20', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>📊 Compare Quotations</Link>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {[
            { label: 'Total Requests', value: requests.length, color: '#6366F1' },
            { label: 'Pending Assign', value: counts.sent_to_buildogram, color: '#2563EB' },
            { label: 'Awaiting Quote', value: counts.quotation_pending, color: '#D97706' },
            { label: 'Quoted', value: counts.quoted, color: '#7C3AED' },
            { label: 'Approved', value: counts.approved, color: '#059669' },
            { label: 'Ordered', value: counts.ordered, color: '#C2410C' },
            { label: 'Delivered', value: counts.delivered, color: '#166534' },
          ].map(k => (
            <div key={k.label} style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: k.color }}>{k.value}</div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginTop: '2px' }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search material, partner, project…"
            style={{ padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', minWidth: '260px', outline: 'none', fontFamily: 'inherit' }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
            <option value="All">All Statuses ({requests.length})</option>
            {MATERIAL_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')} ({counts[s]})</option>)}
          </select>
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#94A3B8' }}>{filtered.length} shown</span>
        </div>

        {/* Main Split Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '20px', alignItems: 'start' }}>
          {/* Requests Table */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    {['Material', 'Project / Partner', 'Qty', 'Urgency', 'Assigned Supplier', 'Status', 'Quotes', ''].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(req => {
                    const supplier = DEMO_SUPPLIERS.find(s => s.id === req.assignedSupplierId);
                    const isSelected = selected?.id === req.id;
                    return (
                      <tr key={req.id} onClick={() => setSelected(isSelected ? null : req)}
                        style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer', background: isSelected ? '#FFF7ED' : 'transparent' }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#FAFBFC'; }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>{req.materialName}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{req.id} · {req.createdAt}</div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: 600, fontSize: '13px', color: '#1E293B' }}>{req.projectName}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{req.partnerName} · {req.partnerType}</div>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '13px' }}>{req.quantity}</td>
                        <td style={{ padding: '14px 16px' }}><UrgencyBadge urgency={req.urgency} /></td>
                        <td style={{ padding: '14px 16px' }}>
                          {supplier ? (
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '12px', color: '#0F172A' }}>{supplier.name}</div>
                              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{supplier.type}</div>
                            </div>
                          ) : (
                            <button onClick={e => { e.stopPropagation(); setAssignModal(req); }}
                              style={{ padding: '5px 12px', background: '#FFF7ED', color: '#FC6E20', border: '1px solid #FC6E2044', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                              + Assign
                            </button>
                          )}
                        </td>
                        <td style={{ padding: '14px 16px' }}><StatusBadge status={req.status} /></td>
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <span style={{ background: req.quotes.length > 0 ? '#EFF6FF' : '#F1F5F9', color: req.quotes.length > 0 ? '#2563EB' : '#94A3B8', padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>{req.quotes.length}</span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <select value={req.status} onClick={e => e.stopPropagation()} onChange={e => { e.stopPropagation(); updateStatus(req.id, e.target.value); }}
                            style={{ padding: '5px 8px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '11px', background: 'white', cursor: 'pointer' }}>
                            {MATERIAL_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ padding: '60px', textAlign: 'center', color: '#94A3B8' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧱</div>
                  <div style={{ fontWeight: 700 }}>No material requests found</div>
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', position: 'sticky', top: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#0F172A', marginBottom: '4px' }}>{selected.materialName}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{selected.id} · {selected.projectName}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                {[['Partner', selected.partnerName], ['Type', selected.partnerType], ['Quantity', selected.quantity], ['Urgency', selected.urgency], ['Status', selected.status.replace(/_/g,' ')], ['Created', selected.createdAt]].map(([k, v]) => (
                  <div key={k} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '3px' }}>{k}</div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#1E293B', textTransform: 'capitalize' }}>{v}</div>
                  </div>
                ))}
              </div>

              {selected.notes && (
                <div style={{ marginBottom: '20px', padding: '12px', background: '#F0F9FF', borderRadius: '10px', borderLeft: '3px solid #0EA5E9', fontSize: '13px', color: '#0C4A6E' }}>
                  📝 {selected.notes}
                </div>
              )}

              {/* Supplier Assignment */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px' }}>Assigned Supplier</div>
                {selected.assignedSupplierId ? (
                  <div style={{ padding: '12px', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>{DEMO_SUPPLIERS.find(s => s.id === selected.assignedSupplierId)?.name}</div>
                      <div style={{ fontSize: '11px', color: '#064E3B' }}>{DEMO_SUPPLIERS.find(s => s.id === selected.assignedSupplierId)?.type}</div>
                    </div>
                    <button onClick={() => setAssignModal(selected)} style={{ background: 'white', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer', fontWeight: 600, color: '#059669' }}>Change</button>
                  </div>
                ) : (
                  <button onClick={() => setAssignModal(selected)} style={{ width: '100%', padding: '12px', background: '#FFF7ED', color: '#FC6E20', border: '1px dashed #FC6E20', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>+ Assign to Supplier</button>
                )}
              </div>

              {/* Status Update */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>Update Status</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {MATERIAL_STATUSES.map(s => {
                    const active = selected.status === s;
                    const style = STATUS_STYLE[s] || { bg: '#F1F5F9', color: '#64748B' };
                    return (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', border: `1px solid ${style.color}44`, background: active ? style.color : style.bg, color: active ? 'white' : style.color, transition: 'all 0.15s' }}>
                        {s.replace(/_/g, ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submitted Quotes */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px' }}>Supplier Quotes ({selected.quotes.length})</div>
                {selected.quotes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#94A3B8', fontSize: '13px' }}>No quotes received yet</div>
                ) : selected.quotes.map((q, i) => (
                  <div key={i} style={{ padding: '14px', background: q.selected ? '#ECFDF5' : '#F8FAFC', borderRadius: '12px', border: `1px solid ${q.selected ? '#A7F3D0' : '#E2E8F0'}`, marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>{q.supplierName}</div>
                      {q.selected ? <span style={{ background: '#059669', color: 'white', padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 700 }}>✅ SELECTED</span> : null}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '12px', color: '#475569' }}>Rate: <strong>₹{q.unitRate}/{selected.unit}</strong></div>
                      <div style={{ fontSize: '12px', color: '#475569' }}>Total: <strong>₹{q.total.toLocaleString('en-IN')}</strong></div>
                      <div style={{ fontSize: '12px', color: '#475569' }}>Delivery: <strong>{q.deliveryDays} days</strong></div>
                      <div style={{ fontSize: '12px', color: '#475569' }}>Valid: <strong>{q.validTill}</strong></div>
                    </div>
                    {q.notes && <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>📝 {q.notes}</div>}
                    {!q.selected && (
                      <button onClick={() => selectQuote(selected.id, q.supplierId)}
                        style={{ width: '100%', padding: '8px', background: '#FC6E20', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                        ✅ Approve This Quote
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={() => setAssignModal(null)}>
          <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '460px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Assign Supplier</h2>
              <button onClick={() => setAssignModal(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}>✕</button>
            </div>
            <div style={{ marginBottom: '16px', padding: '12px', background: '#F8FAFC', borderRadius: '10px', fontSize: '13px', fontWeight: 600 }}>
              {assignModal.materialName} · {assignModal.quantity}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DEMO_SUPPLIERS.map(sup => (
                <button key={sup.id} onClick={() => assignSupplier(assignModal.id, sup.id)}
                  style={{ padding: '14px 16px', background: assignModal.assignedSupplierId === sup.id ? '#FFF7ED' : '#F8FAFC', border: `1.5px solid ${assignModal.assignedSupplierId === sup.id ? '#FC6E20' : '#E2E8F0'}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{sup.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{sup.type} · {sup.phone}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
