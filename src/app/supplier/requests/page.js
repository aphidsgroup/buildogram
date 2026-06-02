'use client';
import { useState } from 'react';
import Link from 'next/link';

const DEMO_RFQS = [
  { id: 'RFQ001', project: 'Rajesh Kumar Villa – Velachery', partnerName: 'Sri Rajan Builders', material: 'UltraTech Cement OPC 53', qty: 200, unit: 'Bags', requiredDate: '2026-06-10', urgency: 'High', status: 'New', location: 'Velachery, Chennai', notes: 'Preferred delivery before 10 AM.' },
  { id: 'RFQ002', project: 'ECR Villa – Santhosh', partnerName: 'GreenBuild Contractors', material: 'Tata Tiscon TMT 16mm', qty: 3, unit: 'MT', requiredDate: '2026-06-15', urgency: 'High', status: 'Quoted', location: 'ECR, Chennai', notes: '' },
  { id: 'RFQ003', project: 'Arun Renovation – Porur', partnerName: 'Arjun Interiors', material: 'Jaquar Wall Mixer Set', qty: 6, unit: 'Nos', requiredDate: '2026-06-20', urgency: 'Medium', status: 'New', location: 'Porur, Chennai', notes: 'Exact model: Jaquar ARI 1213.' },
];

const URGENCY_COLORS = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };
const STATUS_COLORS  = { New: '#3B82F6', Quoted: '#8B5CF6', Accepted: '#10B981', Rejected: '#EF4444' };

export default function SupplierRequestsPage() {
  const [rfqs, setRfqs] = useState(DEMO_RFQS);
  const [filter, setFilter] = useState('All');
  const [quoteModal, setQuoteModal] = useState(null);
  const [quoteForm, setQuoteForm] = useState({ rate: '', tax: 18, deliveryCharge: '', deliveryDays: '', validUntil: '', notes: '' });
  const [toast, setToast] = useState('');

  const filtered = rfqs.filter(r => filter === 'All' || r.status === filter);
  const f = (k) => (e) => setQuoteForm(p => ({ ...p, [k]: e.target.value }));

  const submitQuote = () => {
    if (!quoteForm.rate) return alert('Rate per unit required');
    setRfqs(rfqs.map(r => r.id === quoteModal.id ? { ...r, status: 'Quoted' } : r));
    setToast(`✅ Quote submitted for ${quoteModal.material}`);
    setTimeout(() => setToast(''), 3000);
    setQuoteModal(null);
    setQuoteForm({ rate: '', tax: 18, deliveryCharge: '', deliveryDays: '', validUntil: '', notes: '' });
  };

  const total = quoteModal ? (Number(quoteForm.rate) * quoteModal.qty * (1 + Number(quoteForm.tax) / 100) + Number(quoteForm.deliveryCharge || 0)) : 0;

  return (
    <div>
      {toast && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 2000, background: '#10B981', color: 'white', padding: '14px 20px', borderRadius: '12px', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>{toast}</div>
      )}

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>📋 Material RFQs</h1>
        <p style={{ color: '#64748B' }}>Review material requests from Buildogram partner teams and submit your quotations.</p>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', 'New', 'Quoted', 'Accepted', 'Rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 16px', borderRadius: '999px', border: `1px solid ${filter === s ? '#10B981' : 'var(--border)'}`, background: filter === s ? '#10B981' : 'white', color: filter === s ? 'white' : '#64748B', fontSize: '13px', fontWeight: filter === s ? 700 : 400, cursor: 'pointer' }}>{s}</button>
        ))}
        <span style={{ fontSize: '13px', color: '#64748B', alignSelf: 'center', marginLeft: '8px' }}>{filtered.length} RFQ{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* RFQ Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
          <div style={{ fontWeight: 600 }}>No RFQs in this category</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(rfq => {
            const uc = URGENCY_COLORS[rfq.urgency] || '#64748B';
            const sc = STATUS_COLORS[rfq.status]   || '#64748B';
            return (
              <div key={rfq.id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{rfq.material}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      📁 {rfq.project} &nbsp;·&nbsp; 👷 {rfq.partnerName}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ background: uc + '18', color: uc, border: `1px solid ${uc}44`, padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>{rfq.urgency} Priority</span>
                    <span style={{ background: sc + '18', color: sc, border: `1px solid ${sc}44`, padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>{rfq.status}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                  {[
                    ['Quantity', `${rfq.qty} ${rfq.unit}`],
                    ['Required By', rfq.requiredDate],
                    ['Delivery To', rfq.location],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: '#F8FAFC', borderRadius: '8px', padding: '10px 14px' }}>
                      <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{v}</div>
                    </div>
                  ))}
                </div>

                {rfq.notes && <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px', padding: '10px 14px', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #FDE68A' }}>📝 Note: {rfq.notes}</div>}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  {rfq.status === 'New' ? (
                    <button onClick={() => { setQuoteModal(rfq); }} style={{ background: '#10B981', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>💬 Submit Quotation</button>
                  ) : (
                    <Link href="/supplier/quotations" style={{ background: '#8B5CF6', color: 'white', padding: '10px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '13px', textDecoration: 'none' }}>View Quote →</Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quote Submission Modal */}
      {quoteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={e => e.target === e.currentTarget && setQuoteModal(null)}>
          <div style={{ background: 'white', borderRadius: '20px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Submit Quotation</h2>
              <button onClick={() => setQuoteModal(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#64748B' }}>×</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px' }}>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{quoteModal.material}</div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>{quoteModal.qty} {quoteModal.unit} · Required by {quoteModal.requiredDate}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Rate per {quoteModal.unit} (₹) *</label>
                  <input className="input" type="number" value={quoteForm.rate} onChange={f('rate')} placeholder="e.g. 380" />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>GST %</label>
                  <input className="input" type="number" value={quoteForm.tax} onChange={f('tax')} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Delivery Charge (₹)</label>
                  <input className="input" type="number" value={quoteForm.deliveryCharge} onChange={f('deliveryCharge')} placeholder="0 if included" />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Delivery Days</label>
                  <input className="input" type="number" value={quoteForm.deliveryDays} onChange={f('deliveryDays')} placeholder="e.g. 3" />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Quote Valid Until</label>
                  <input className="input" type="date" value={quoteForm.validUntil} onChange={f('validUntil')} />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Notes / Terms</label>
                <textarea className="input" rows={2} value={quoteForm.notes} onChange={f('notes')} placeholder="Delivery terms, brand, availability..." style={{ resize: 'vertical' }} />
              </div>
              {quoteForm.rate > 0 && (
                <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#15803D', fontWeight: 700 }}>Quote Summary</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>Total: ₹{total.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>({quoteModal.qty} × ₹{quoteForm.rate} + {quoteForm.tax}% GST + delivery)</div>
                </div>
              )}
            </div>
            <div style={{ padding: '16px 28px 24px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setQuoteModal(null)}>Cancel</button>
              <button onClick={submitQuote} style={{ background: '#10B981', color: 'white', padding: '11px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Submit Quote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
