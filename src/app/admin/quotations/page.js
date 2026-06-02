'use client';
import { useState } from 'react';
import Link from 'next/link';

const fmt = n => n ? '₹' + Number(n).toLocaleString('en-IN') : '—';

function initQuotations() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('bos_admin_material_requests');
  if (!stored) return [];
  const requests = JSON.parse(stored);
  // Flatten all quotes with their parent request info
  return requests.flatMap(r =>
    r.quotes.map(q => ({
      ...q,
      requestId: r.id,
      materialName: r.materialName,
      projectName: r.projectName,
      partnerName: r.partnerName,
      quantity: r.quantity,
      unit: r.unit,
      requestStatus: r.status,
    }))
  );
}

export default function AdminQuotations() {
  const [quotes] = useState(() => initQuotations());
  const [filterReq, setFilterReq] = useState('All');
  const [search, setSearch] = useState('');

  const reqIds = [...new Set(quotes.map(q => q.requestId))];
  const filtered = quotes.filter(q => {
    const ms = !search || q.supplierName.toLowerCase().includes(search.toLowerCase()) || q.materialName.toLowerCase().includes(search.toLowerCase());
    const fr = filterReq === 'All' || q.requestId === filterReq;
    return ms && fr;
  });

  // Group by requestId for side-by-side comparison
  const groups = reqIds
    .filter(id => filterReq === 'All' || filterReq === id)
    .map(id => ({
      id,
      quotes: filtered.filter(q => q.requestId === id),
    }))
    .filter(g => g.quotes.length > 0);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '32px 40px', color: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Link href="/admin/material-requests" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}>← Material Requests</Link>
          </div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 800 }}>📊 Supplier Quotation Comparison</h1>
          <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: '14px' }}>Compare all supplier quotes side-by-side and approve the best one</p>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search supplier or material…"
            style={{ padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', minWidth: '260px', outline: 'none', fontFamily: 'inherit' }} />
          <select value={filterReq} onChange={e => setFilterReq(e.target.value)}
            style={{ padding: '9px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
            <option value="All">All Requests</option>
            {reqIds.map(id => <option key={id} value={id}>{id}</option>)}
          </select>
          <div style={{ marginLeft: 'auto', background: '#F0FDF4', color: '#166534', padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}>
            {quotes.filter(q => q.selected).length} Approved · {quotes.length} Total Quotes
          </div>
        </div>

        {groups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>No Quotations Yet</div>
            <p style={{ fontSize: '14px' }}>Assign material requests to suppliers. Quotes will appear here once submitted.</p>
            <Link href="/admin/material-requests" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: '#FC6E20', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Go to Material Requests →</Link>
          </div>
        ) : groups.map(group => {
          const allQuotes = group.quotes;
          const lowestTotal = Math.min(...allQuotes.map(q => q.total));
          const fastestDelivery = Math.min(...allQuotes.map(q => q.deliveryDays));

          return (
            <div key={group.id} style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#0F172A' }}>{allQuotes[0]?.materialName}</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{group.id} · {allQuotes[0]?.projectName} · {allQuotes[0]?.partnerName} · Qty: {allQuotes[0]?.quantity}</div>
                </div>
                <span style={{ background: '#F1F5F9', color: '#475569', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>{allQuotes.length} {allQuotes.length === 1 ? 'Quote' : 'Quotes'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(allQuotes.length, 3)}, 1fr)`, gap: '16px' }}>
                {allQuotes.map((q, i) => {
                  const isLowest = q.total === lowestTotal;
                  const isFastest = q.deliveryDays === fastestDelivery;
                  return (
                    <div key={i} style={{ background: 'white', borderRadius: '16px', border: `2px solid ${q.selected ? '#059669' : isLowest ? '#FC6E20' : '#E2E8F0'}`, padding: '20px', position: 'relative' }}>
                      {q.selected && (
                        <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#059669', color: 'white', padding: '3px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, whiteSpace: 'nowrap' }}>✅ APPROVED</div>
                      )}
                      {!q.selected && isLowest && (
                        <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#FC6E20', color: 'white', padding: '3px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, whiteSpace: 'nowrap' }}>💰 LOWEST PRICE</div>
                      )}

                      <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A', marginBottom: '4px' }}>{q.supplierName}</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>Submitted: {q.submittedAt} · Valid till: {q.validTill}</div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                        <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>UNIT RATE</div>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹{q.unitRate}</div>
                          <div style={{ fontSize: '10px', color: '#94A3B8' }}>per {q.unit}</div>
                        </div>
                        <div style={{ padding: '12px', background: isLowest ? '#FFF7ED' : '#F8FAFC', borderRadius: '10px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>TOTAL</div>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: isLowest ? '#FC6E20' : '#0F172A' }}>{fmt(q.total)}</div>
                        </div>
                        <div style={{ padding: '12px', background: isFastest ? '#ECFDF5' : '#F8FAFC', borderRadius: '10px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>DELIVERY</div>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: isFastest ? '#059669' : '#0F172A' }}>{q.deliveryDays}d</div>
                        </div>
                        <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', textAlign: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>STATUS</div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: q.selected ? '#059669' : '#64748B', textTransform: 'capitalize' }}>{q.selected ? 'Approved' : q.status}</div>
                        </div>
                      </div>

                      {q.notes && <div style={{ fontSize: '12px', color: '#475569', marginBottom: '14px', padding: '10px', background: '#F8FAFC', borderRadius: '8px' }}>📝 {q.notes}</div>}

                      {q.selected ? (
                        <div style={{ padding: '10px', background: '#ECFDF5', borderRadius: '10px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#059669' }}>Quote Approved ✅</div>
                      ) : (
                        <Link href="/admin/material-requests"
                          style={{ display: 'block', padding: '10px', background: '#FC6E20', color: 'white', borderRadius: '10px', textAlign: 'center', fontSize: '13px', fontWeight: 700, textDecoration: 'none' }}>
                          Approve This Quote →
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
