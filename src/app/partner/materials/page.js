'use client';
import { useState, useEffect } from 'react';
import { SectionHeader, Modal, FormField, SearchBar, EmptyState, StatusBadge } from '../_shared/components';
import { DEMO_MATERIALS, DEMO_PROJECTS, MATERIAL_STATUSES } from '../_shared/demoData';

const UNITS = ['Bags', 'MT', 'm²', 'm³', 'Nos', 'RFT', 'Liter', 'kg', 'Sqft', 'Set'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const BLANK = { material: '', project: '', qty: 1, unit: 'Bags', requiredDate: '', priority: 'Medium', status: 'Requested', vendorQuote: 'Pending', bestRateRequest: false };

function PriorityBadge({ priority }) {
  const colors = { High: { bg: '#FEE2E2', text: '#EF4444' }, Medium: { bg: '#FEF3C7', text: '#D97706' }, Low: { bg: '#DCFCE7', text: '#10B981' } };
  const c = colors[priority] || colors.Medium;
  return <span style={{ background: c.bg, color: c.text, padding: '3px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>{priority}</span>;
}

export default function MaterialFlow() {
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('bos_materials');
    setItems(stored ? JSON.parse(stored) : DEMO_MATERIALS);
    const storedP = typeof window !== 'undefined' && localStorage.getItem('bos_projects');
    if (storedP) setProjects(JSON.parse(storedP));
  }, []);

  const save = (arr) => { setItems(arr); localStorage.setItem('bos_materials', JSON.stringify(arr)); };

  const openAdd = () => { setForm(BLANK); setEditId(null); setModalOpen(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditId(item.id); setModalOpen(true); };
  const deleteItem = (id) => { if (confirm('Remove this material request?')) save(items.filter(i => i.id !== id)); };

  const handleSubmit = () => {
    if (!form.material) return alert('Material name is required');
    if (editId) {
      save(items.map(i => i.id === editId ? { ...form, id: editId } : i));
    } else {
      save([{ ...form, id: 'M' + Date.now().toString().slice(-6) }, ...items]);
    }
    setModalOpen(false);
  };

  const updateStatus = (id, status) => { save(items.map(i => i.id === id ? { ...i, status } : i)); };

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const getProjectName = (id) => { const p = projects.find(p => p.id === id); return p ? p.name : id || '—'; };

  const filtered = items.filter(item => {
    const ms = !search || item.material.toLowerCase().includes(search.toLowerCase());
    const fs = filterStatus === 'All' || item.status === filterStatus;
    const fp = filterPriority === 'All' || item.priority === filterPriority;
    return ms && fs && fp;
  });

  return (
    <div>
      <SectionHeader icon="🧱" title="Material Flow" desc="Track material requests, approvals, and procurement status"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Add Request</button>}
      />

      {/* SUMMARY METRICS */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[
          { label: 'Total Requests', value: items.length, color: '#FC6E20' },
          { label: 'Approved', value: items.filter(i => i.status === 'Approved').length, color: '#10B981' },
          { label: 'Ordered', value: items.filter(i => i.status === 'Ordered').length, color: '#6366F1' },
          { label: 'Delivered', value: items.filter(i => i.status === 'Delivered').length, color: '#0EA5E9' },
          { label: 'High Priority', value: items.filter(i => i.priority === 'High').length, color: '#EF4444' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '12px 18px', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-dark)' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search materials..." />
        <select className="input" style={{ maxWidth: '160px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {MATERIAL_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="input" style={{ maxWidth: '140px' }} value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="All">All Priority</option>
          {PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{filtered.length} request{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* TABLE */}
      {filtered.length === 0 ? (
        <EmptyState icon="🧱" title="No material requests" desc="Add your first material request to start tracking procurement." action={<button className="btn btn-primary" onClick={openAdd}>+ Add Request</button>} />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
                {['Material', 'Project', 'Qty', 'Unit', 'Required Date', 'Priority', 'Status', 'Vendor Quote', 'Best Rate', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '11px 14px', fontWeight: 600 }}>{item.material}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--text-muted)', fontSize: '13px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getProjectName(item.project)}</td>
                  <td style={{ padding: '11px 14px' }}>{item.qty}</td>
                  <td style={{ padding: '11px 14px', color: 'var(--text-muted)' }}>{item.unit}</td>
                  <td style={{ padding: '11px 14px', whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{item.requiredDate || '—'}</td>
                  <td style={{ padding: '11px 14px' }}><PriorityBadge priority={item.priority} /></td>
                  <td style={{ padding: '11px 14px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <StatusBadge status={item.status} />
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ color: item.vendorQuote === 'Received' ? '#10B981' : '#D97706', fontWeight: 600, fontSize: '13px' }}>
                      {item.vendorQuote === 'Received' ? '✅ Received' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                    {item.bestRateRequest ? <span title="Best Rate Requested from Buildogram">⭐</span> : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap' }}>
                      <button onClick={() => openEdit(item)} title="Edit" style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '13px' }}>✏️</button>
                      <select value={item.status} onChange={e => updateStatus(item.id, e.target.value)} style={{ fontSize: '12px', padding: '4px 6px', borderRadius: '6px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', maxWidth: '100px' }}>
                        {MATERIAL_STATUSES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <button onClick={() => deleteItem(item.id)} title="Delete" style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', fontSize: '13px' }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Material Request' : 'Add Material Request'}
        footer={<><button className="btn" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update' : 'Add Request'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Material Name" required><input className="input" value={form.material} onChange={f('material')} placeholder="e.g. UltraTech Cement OPC 53" /></FormField>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Project">
              <select className="input" value={form.project} onChange={f('project')}>
                <option value="">Select project...</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Quantity"><input className="input" type="number" value={form.qty} onChange={f('qty')} /></FormField>
          <FormField label="Unit"><select className="input" value={form.unit} onChange={f('unit')}>{UNITS.map(u => <option key={u}>{u}</option>)}</select></FormField>
          <FormField label="Required Date"><input className="input" type="date" value={form.requiredDate} onChange={f('requiredDate')} /></FormField>
          <FormField label="Priority"><select className="input" value={form.priority} onChange={f('priority')}>{PRIORITIES.map(p => <option key={p}>{p}</option>)}</select></FormField>
          <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>{MATERIAL_STATUSES.map(s => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Vendor Quote"><select className="input" value={form.vendorQuote} onChange={f('vendorQuote')}><option>Pending</option><option>Received</option></select></FormField>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <input type="checkbox" id="bestRate" checked={form.bestRateRequest} onChange={e => setForm(p => ({ ...p, bestRateRequest: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: '#FC6E20' }} />
          <label htmlFor="bestRate" style={{ fontSize: '14px', cursor: 'pointer' }}>⭐ Request Best Rate from Buildogram Suppliers</label>
        </div>
      </Modal>
    </div>
  );
}
