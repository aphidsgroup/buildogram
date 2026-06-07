'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const STATUS_COLORS = {
  new: '#3B82F6', reviewing: '#F59E0B', sent_to_suppliers: '#8B5CF6', 
  quotes_received: '#10B981', customer_reviewing: '#EC4899', 
  converted: '#14B8A6', lost: '#EF4444'
};

export default function MaterialsDashboard() {
  const [tab, setTab] = useState('quotes');
  const [leads, setLeads] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, quotesRes] = await Promise.all([
        fetch('/api/ops/material-leads').then(r => r.json()),
        fetch('/api/ops/materials/quotes').then(r => r.json())
      ]);
      if (leadsRes.success) setLeads(leadsRes.data || []);
      if (quotesRes.success) {
        setQuotes(quotesRes.data || []);
        setSuppliers(quotesRes.suppliers || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const convertLead = async (id) => {
    if (!confirm('Convert this lead into a Quote Request?')) return;
    try {
      const res = await fetch(`/api/ops/material-leads/${id}/convert`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert('Converted successfully!');
        fetchData();
        setTab('quotes');
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert('Failed to convert');
    }
  };

  const assignSupplier = async (quoteId, supplierId, category) => {
    try {
      const res = await fetch(`/api/ops/materials/quotes/${quoteId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplier_partner_id: supplierId, material_category: category })
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
        if (selectedQuote && selectedQuote.id === quoteId) {
          const updatedQuoteRes = await fetch('/api/ops/materials/quotes').then(r => r.json());
          if (updatedQuoteRes.success) {
            setQuotes(updatedQuoteRes.data);
            setSelectedQuote(updatedQuoteRes.data.find(q => q.id === quoteId));
          }
        }
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert('Failed to assign');
    }
  };

  const generateTokenLink = (token) => {
    return `${window.location.origin}/material-quote-summary/${token}`;
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Materials Quote OS</h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>Manage quote requests and compare supplier responses.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '8px' }}>
          <button onClick={() => { setTab('quotes'); setSelectedQuote(null); }} style={{ padding: '8px 16px', border: 'none', background: tab === 'quotes' ? 'white' : 'transparent', borderRadius: '6px', fontWeight: 600, color: tab === 'quotes' ? '#0F172A' : '#64748B', cursor: 'pointer', boxShadow: tab === 'quotes' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>
            Quote Requests ({quotes.length})
          </button>
          <button onClick={() => { setTab('leads'); setSelectedQuote(null); }} style={{ padding: '8px 16px', border: 'none', background: tab === 'leads' ? 'white' : 'transparent', borderRadius: '6px', fontWeight: 600, color: tab === 'leads' ? '#0F172A' : '#64748B', cursor: 'pointer', boxShadow: tab === 'leads' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>
            Raw Leads ({leads.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading...</div>
      ) : tab === 'leads' ? (
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px' }}>Name / Phone</th>
                <th style={{ padding: '16px' }}>Material</th>
                <th style={{ padding: '16px' }}>Locality</th>
                <th style={{ padding: '16px' }}>Status</th>
                <th style={{ padding: '16px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{lead.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>{lead.material || '—'} {lead.quantity ? `(${lead.quantity})` : ''}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{lead.locality || '—'}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: lead.status === 'converted' ? '#10B981' : '#F59E0B' }}>{lead.status || 'new'}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {lead.status !== 'converted' && (
                      <button onClick={() => convertLead(lead.id)} style={{ background: '#FC6E20', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Convert to Quote</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Quote Requests List */}
          <div style={{ flex: selectedQuote ? '1' : '100%', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                <tr>
                  <th style={{ padding: '16px' }}>Customer</th>
                  <th style={{ padding: '16px' }}>Material Categories</th>
                  <th style={{ padding: '16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(quote => {
                  let cats = [];
                  try { cats = JSON.parse(quote.material_categories || '[]'); } catch { cats = []; }
                  return (
                    <tr key={quote.id} onClick={() => setSelectedQuote(quote)} style={{ borderBottom: '1px solid #E2E8F0', cursor: 'pointer', background: selectedQuote?.id === quote.id ? '#F1F5F9' : 'white' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{quote.customer_name}</div>
                        <div style={{ fontSize: '13px', color: '#64748B' }}>{new Date(quote.created_at).toLocaleDateString()}</div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{cats.join(', ') || '—'}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ background: (STATUS_COLORS[quote.status] || '#CBD5E1') + '20', color: STATUS_COLORS[quote.status] || '#475569', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, textTransform: 'capitalize' }}>
                          {(quote.status || 'new').replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quote Request Detail View */}
          {selectedQuote && (() => {
            let cats = [];
            try { cats = JSON.parse(selectedQuote.material_categories || '[]'); } catch { cats = []; }
            return (
              <div style={{ width: '500px', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>{selectedQuote.customer_name}</h2>
                    <div style={{ color: '#64748B', fontSize: '14px' }}>{selectedQuote.phone} • {selectedQuote.project_area}</div>
                  </div>
                </div>

                {selectedQuote.summary_token && (
                  <div style={{ marginBottom: '24px', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>Customer Share Link:</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" readOnly value={generateTokenLink(selectedQuote.summary_token)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', background: 'white', color: '#0F172A' }} />
                      <button onClick={() => navigator.clipboard.writeText(generateTokenLink(selectedQuote.summary_token))} style={{ background: '#FC6E20', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>Copy</button>
                    </div>
                  </div>
                )}

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Supplier Assignment</h3>
                <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
                  {cats.map(cat => (
                    <div key={cat} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, width: '100px' }}>{cat}</div>
                      <select id={`assign-${cat}`} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                        <option value="">Select Supplier...</option>
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.company_name}</option>)}
                      </select>
                      <button onClick={() => {
                        const sel = document.getElementById(`assign-${cat}`);
                        if (sel.value) assignSupplier(selectedQuote.id, sel.value, cat);
                      }} style={{ background: '#0F172A', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Assign</button>
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Received Quotes ({selectedQuote.supplier_quote_responses?.length || 0})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedQuote.supplier_quote_responses?.length === 0 ? (
                    <div style={{ color: '#64748B', fontSize: '14px' }}>No quotes received yet.</div>
                  ) : selectedQuote.supplier_quote_responses?.map(resp => (
                    <div key={resp.id} style={{ border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{resp.partners?.company_name || 'Unknown'}</div>
                        <span style={{ fontSize: '11px', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', color: '#475569' }}>{resp.status}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: '#475569' }}>
                        <div><strong>Brand:</strong> {resp.brand || '-'}</div>
                        <div><strong>Spec:</strong> {resp.grade_spec || '-'}</div>
                        <div><strong>Rate:</strong> ₹{resp.unit_rate || '0'}/{resp.unit || '-'}</div>
                        <div><strong>Transport:</strong> ₹{resp.transport_cost || '0'}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
