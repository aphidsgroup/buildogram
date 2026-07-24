'use client';
import { useState, useEffect } from 'react';
import { SectionHeader, Modal, FormField, EmptyState } from '../_shared/components';
import { DEMO_BOQ_ITEMS, BOQ_CATEGORIES, PACKAGE_RATES } from '../_shared/demoData';

const UNITS = ['m³', 'm²', 'Nos', 'RFT', 'kg', 'MT', 'Bags', 'Lump sum', 'RM', 'Sqft'];
const BLANK = { category: 'Civil Work', item: '', qty: 1, unit: 'm²', materialCost: 0, labourCost: 0, equipmentCost: 0, wastage: 5, margin: 12, gst: 18 };

function lineTotal(row) {
  const base = (Number(row.materialCost) + Number(row.labourCost) + Number(row.equipmentCost)) * Number(row.qty);
  const withWastage = base * (1 + Number(row.wastage) / 100);
  const withMargin = withWastage * (1 + Number(row.margin) / 100);
  const withGst = withMargin * (1 + Number(row.gst) / 100);
  return withGst;
}

function internalCost(row) {
  const base = (Number(row.materialCost) + Number(row.labourCost) + Number(row.equipmentCost)) * Number(row.qty);
  return base * (1 + Number(row.wastage) / 100);
}

function fmtRs(n) {
  if (!n) return '₹0';
  return n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + ' Cr' : n >= 100000 ? '₹' + (n / 100000).toFixed(2) + ' L' : '₹' + Math.round(n).toLocaleString('en-IN');
}

export default function BOQStudio() {
  const [tab, setTab] = useState('builder');
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);
  // Package estimator state
  const [pkg, setPkg] = useState('standard');
  const [area, setArea] = useState(1200);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('bos_boq');
    setItems(stored ? JSON.parse(stored) : DEMO_BOQ_ITEMS);
  }, []);

  const save = (arr) => { setItems(arr); localStorage.setItem('bos_boq', JSON.stringify(arr)); };

  const openAdd = () => { setForm(BLANK); setEditId(null); setModalOpen(true); };
  const openEdit = (item) => { setForm({ ...item }); setEditId(item.id); setModalOpen(true); };
  const deleteItem = (id) => { if (confirm('Remove this item?')) save(items.filter(i => i.id !== id)); };

  const handleSubmit = () => {
    if (!form.item) return alert('Item description is required');
    if (editId) {
      save(items.map(i => i.id === editId ? { ...form, id: editId } : i));
    } else {
      save([...items, { ...form, id: 'B' + Date.now().toString().slice(-6) }]);
    }
    setModalOpen(false);
  };

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const grandTotal = items.reduce((s, i) => s + lineTotal(i), 0);
  const totalInternal = items.reduce((s, i) => s + internalCost(i), 0);
  const profit = grandTotal - totalInternal;

  // Package estimator
  const pkgRate = PACKAGE_RATES[pkg];
  const pkgTotal = area * pkgRate.rate;

  return (
    <div>
      <SectionHeader icon="💰" title="Buildogram BOQ Studio" desc="Build detailed Bills of Quantities with cost breakdown and profit estimates"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Add Item</button>}
      />

      {/* TABS */}
      <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', borderRadius: '12px', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
        {[['builder', '📋 BOQ Builder'], ['estimator', '📦 Package Estimator']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: '8px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px',
            background: tab === key ? 'white' : 'transparent',
            color: tab === key ? '#FC6E20' : 'var(--text-muted)',
            boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.15s'
          }}>{label}</button>
        ))}
      </div>

      {/* ── TAB 1: BOQ BUILDER ── */}
      {tab === 'builder' && (
        <>
          {items.length === 0 ? (
            <EmptyState icon="💰" title="No BOQ items yet" desc="Start by adding items to your Bill of Quantities." action={<button className="btn btn-primary" onClick={openAdd}>+ Add First Item</button>} />
          ) : (
            <>
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '900px' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
                      {['Category', 'Item Description', 'Qty', 'Unit', 'Mat/Unit', 'Labour/Unit', 'Equip/Unit', 'Wastage%', 'Margin%', 'GST%', 'Line Total', ''].map(h => (
                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '10px 12px' }}><span style={{ background: 'rgba(252,110,32,0.08)', color: '#FC6E20', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{item.category}</span></td>
                        <td style={{ padding: '10px 12px', fontWeight: 600, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.item}</td>
                        <td style={{ padding: '10px 12px' }}>{item.qty}</td>
                        <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{item.unit}</td>
                        <td style={{ padding: '10px 12px' }}>₹{Number(item.materialCost).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px' }}>₹{Number(item.labourCost).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px' }}>₹{Number(item.equipmentCost).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px 12px' }}>{item.wastage}%</td>
                        <td style={{ padding: '10px 12px' }}>{item.margin}%</td>
                        <td style={{ padding: '10px 12px' }}>{item.gst}%</td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--primary-dark)', whiteSpace: 'nowrap' }}>{fmtRs(lineTotal(item))}</td>
                        <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => openEdit(item)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '3px 7px', cursor: 'pointer', fontSize: '13px' }}>✏️</button>
                            <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '6px', padding: '3px 7px', cursor: 'pointer', fontSize: '13px' }}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SUMMARY BOX */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: 'Internal Cost (No Margin)', value: fmtRs(totalInternal), color: '#64748B' },
                  { label: 'Grand Total (Client Quote)', value: fmtRs(grandTotal), color: '#FC6E20' },
                  { label: 'Estimated Profit', value: fmtRs(profit), color: '#10B981' },
                  { label: 'Profit Margin %', value: grandTotal > 0 ? ((profit / grandTotal) * 100).toFixed(1) + '%' : '0%', color: '#6366F1' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="card" style={{ padding: '18px 20px', borderRadius: '12px', borderLeft: `4px solid ${color}` }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* EXPORT BUTTONS */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-outline" onClick={() => alert('PDF export coming soon — connect your PDF library')}>📄 Export PDF</button>
                <button className="btn btn-outline" onClick={() => alert('Excel export coming soon — connect your sheet library')}>📊 Export Excel</button>
              </div>
            </>
          )}
        </>
      )}

      {/* ── TAB 2: PACKAGE ESTIMATOR ── */}
      {tab === 'estimator' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            {Object.entries(PACKAGE_RATES).map(([key, p]) => (
              <div key={key} onClick={() => setPkg(key)} style={{
                padding: '22px', borderRadius: '16px', cursor: 'pointer', border: `2px solid ${pkg === key ? '#FC6E20' : 'var(--border)'}`,
                background: pkg === key ? 'rgba(252,110,32,0.04)' : 'var(--bg-card)', transition: 'all 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 700, fontSize: '16px', textTransform: 'capitalize' }}>{p.label}</span>
                  {pkg === key && <span style={{ color: '#FC6E20', fontSize: '18px' }}>✓</span>}
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#FC6E20', marginBottom: '8px' }}>₹{p.rate.toLocaleString('en-IN')}<span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>/sqft</span></div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '28px', borderRadius: '16px', maxWidth: '560px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px' }}>Calculate Project Cost</h3>
            <FormField label="Built-up Area (sq.ft)">
              <input className="input" type="number" value={area} onChange={e => setArea(Number(e.target.value))} placeholder="e.g. 1200" />
            </FormField>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Rate per sq.ft ({PACKAGE_RATES[pkg].label})</span>
                <span style={{ fontWeight: 600 }}>₹{PACKAGE_RATES[pkg].rate.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Materials (60%)</span>
                <span>{fmtRs(pkgTotal * 0.6)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Labour (25%)</span>
                <span>{fmtRs(pkgTotal * 0.25)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Equipment & Others (15%)</span>
                <span>{fmtRs(pkgTotal * 0.15)}</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>Total Estimate</span>
                <span style={{ fontWeight: 800, fontSize: '20px', color: '#FC6E20' }}>{fmtRs(pkgTotal)}</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={() => alert('This will populate your BOQ Builder with category-wise items. Feature coming soon!')}>
              Create BOQ from this Estimate →
            </button>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit BOQ Item' : 'Add BOQ Item'}
        footer={<><button className="btn" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update' : 'Add Item'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Category"><select className="input" value={form.category} onChange={f('category')}>{BOQ_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></FormField>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Item Description" required><input className="input" value={form.item} onChange={f('item')} placeholder="e.g. PCC M10 Grade Concrete" /></FormField>
          </div>
          <FormField label="Quantity"><input className="input" type="number" value={form.qty} onChange={f('qty')} /></FormField>
          <FormField label="Unit"><select className="input" value={form.unit} onChange={f('unit')}>{UNITS.map(u => <option key={u}>{u}</option>)}</select></FormField>
          <FormField label="Material Cost / Unit (₹)"><input className="input" type="number" value={form.materialCost} onChange={f('materialCost')} /></FormField>
          <FormField label="Labour Cost / Unit (₹)"><input className="input" type="number" value={form.labourCost} onChange={f('labourCost')} /></FormField>
          <FormField label="Equipment Cost / Unit (₹)"><input className="input" type="number" value={form.equipmentCost} onChange={f('equipmentCost')} /></FormField>
          <FormField label="Wastage %"><input className="input" type="number" value={form.wastage} onChange={f('wastage')} /></FormField>
          <FormField label="Margin %"><input className="input" type="number" value={form.margin} onChange={f('margin')} /></FormField>
          <FormField label="GST %"><input className="input" type="number" value={form.gst} onChange={f('gst')} /></FormField>
        </div>
        {form.qty && form.materialCost ? (
          <div style={{ background: 'rgba(252,110,32,0.06)', borderRadius: '10px', padding: '12px 16px', marginTop: '8px', fontSize: '14px' }}>
            <strong>Preview Line Total:</strong> {fmtRs(lineTotal(form))}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
