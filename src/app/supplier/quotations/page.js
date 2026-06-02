'use client';
import { useState } from 'react';
import Link from 'next/link';

const DEMO_QUOTES = [
  { id: 'Q001', rfqId: 'RFQ002', project: 'ECR Villa – Santhosh', material: 'Tata Tiscon TMT 16mm', qty: 3, unit: 'MT', rate: 68000, tax: 18, deliveryCharge: 2500, deliveryDays: 3, validUntil: '2026-06-20', status: 'Submitted', notes: 'Ex-warehouse Ambattur. Free delivery above 5MT.', submittedAt: '2026-05-30' },
  { id: 'Q002', rfqId: 'RFQ004', project: 'Rajesh Kumar Villa – Velachery', material: 'M-Sand', qty: 50, unit: 'MT', rate: 1200, tax: 5, deliveryCharge: 5000, deliveryDays: 2, validUntil: '2026-06-10', status: 'Accepted', notes: 'ISI certified M-Sand from licensed quarry.', submittedAt: '2026-05-25' },
];

const STATUS_COLORS = { Submitted: '#3B82F6', 'Under Review': '#F59E0B', Accepted: '#10B981', Rejected: '#EF4444', Expired: '#94A3B8' };

function fmt(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

export default function SupplierQuotationsPage() {
  const [quotes] = useState(DEMO_QUOTES);
  const [filter, setFilter] = useState('All');

  const filtered = quotes.filter(q => filter === 'All' || q.status === filter);

  const total = (q) => (q.rate * q.qty * (1 + q.tax / 100)) + Number(q.deliveryCharge || 0);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>💬 My Quotations</h1>
        <p style={{ color: '#64748B' }}>Track all quotations you have submitted to Buildogram projects.</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total Submitted', value: quotes.length,                              color: '#3B82F6' },
          { label: 'Under Review',    value: quotes.filter(q => q.status === 'Under Review' || q.status === 'Submitted').length, color: '#F59E0B' },
          { label: 'Accepted',        value: quotes.filter(q => q.status === 'Accepted').length, color: '#10B981' },
          { label: 'Rejected',        value: quotes.filter(q => q.status === 'Rejected').length, color: '#EF4444' },
        ].map(c => (
          <div key={c.label} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 800, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', 'Submitted', 'Under Review', 'Accepted', 'Rejected', 'Expired'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: '7px 16px', borderRadius: '999px', border: `1px solid ${filter === s ? '#8B5CF6' : '#E2E8F0'}`, background: filter === s ? '#8B5CF6' : 'white', color: filter === s ? 'white' : '#64748B', fontSize: '13px', fontWeight: filter === s ? 700 : 400, cursor: 'pointer' }}>{s}</button>
        ))}
      </div>

      {/* Quotation Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>No quotations found</div>
          <Link href="/supplier/requests" style={{ color: '#10B981', fontWeight: 700 }}>Browse open RFQs →</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(q => {
            const sc = STATUS_COLORS[q.status] || '#64748B';
            const grandTotal = total(q);
            return (
              <div key={q.id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '4px' }}>{q.material}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>📁 {q.project}</div>
                  </div>
                  <span style={{ background: sc + '18', color: sc, border: `1px solid ${sc}44`, padding: '4px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 700 }}>{q.status}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                  {[
                    ['Qty', `${q.qty} ${q.unit}`],
                    ['Rate', `${fmt(q.rate)} / ${q.unit}`],
                    ['GST', `${q.tax}%`],
                    ['Delivery', fmt(q.deliveryCharge)],
                    ['Lead Time', `${q.deliveryDays} days`],
                    ['Total Value', fmt(grandTotal)],
                    ['Valid Until', q.validUntil],
                    ['Submitted', q.submittedAt],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: '#F8FAFC', borderRadius: '8px', padding: '10px 14px' }}>
                      <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>{k}</div>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: k === 'Total Value' ? '#10B981' : '#0F172A' }}>{v}</div>
                    </div>
                  ))}
                </div>

                {q.notes && <div style={{ fontSize: '13px', color: '#64748B', padding: '10px 14px', background: '#F8FAFC', borderRadius: '8px' }}>📝 {q.notes}</div>}

                {q.status === 'Accepted' && (
                  <div style={{ marginTop: '12px', padding: '12px 16px', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '10px', fontSize: '13px', color: '#15803D', fontWeight: 600 }}>
                    🎉 Your quotation was accepted! Coordinate delivery with the partner team.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
