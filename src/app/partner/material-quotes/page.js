'use client';
import { useState, useEffect } from 'react';

export default function SupplierMaterialQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  
  // Quick hack for demo/testing if not logged in. In production, remove this and rely on auth.
  const [supplierId, setSupplierId] = useState('');

  useEffect(() => {
    // Attempt to load from API (will use session if available)
    fetchData();
  }, []);

  const fetchData = async (overrideId = null) => {
    setLoading(true);
    try {
      const url = overrideId ? `/api/partner/material-quotes?supplier_id=${overrideId}` : '/api/partner/material-quotes';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setQuotes(data.data);
      } else if (data.status === 401 && !overrideId) {
        // Not authenticated in dev env
        console.warn('Unauthorized. Use override ID.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const submitQuote = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const updates = {
      response_id: selected.id,
      brand: fd.get('brand'),
      grade_spec: fd.get('grade_spec'),
      quantity: parseFloat(fd.get('quantity')),
      unit: fd.get('unit'),
      unit_rate: parseFloat(fd.get('unit_rate')),
      transport_cost: parseFloat(fd.get('transport_cost')),
      gst_included: fd.get('gst_included') === 'on',
      delivery_timeline: fd.get('delivery_timeline'),
      payment_terms: fd.get('payment_terms')
    };

    try {
      const res = await fetch('/api/partner/material-quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        alert('Quote submitted successfully!');
        setSelected(null);
        fetchData(supplierId);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Failed to submit');
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>Supplier Quotes Portal</h1>
          <p style={{ color: '#64748B', margin: 0 }}>View and respond to material requests.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Mock Supplier ID..." 
            value={supplierId} 
            onChange={e => setSupplierId(e.target.value)} 
            style={{ padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: '6px' }}
          />
          <button onClick={() => fetchData(supplierId)} style={{ padding: '8px 16px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '6px' }}>Load</button>
        </div>
      </div>

      {loading ? <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading...</div> : 
       quotes.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', color: '#64748B' }}>No quote requests assigned to you yet.</div>
       ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px' }}>
          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quotes.map(q => (
              <div 
                key={q.id} 
                onClick={() => setSelected(q)}
                style={{ 
                  padding: '16px', 
                  background: selected?.id === q.id ? '#F1F5F9' : 'white', 
                  border: selected?.id === q.id ? '1px solid #94A3B8' : '1px solid #E2E8F0', 
                  borderRadius: '12px', 
                  cursor: 'pointer' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{q.material_category}</div>
                  <div style={{ fontSize: '11px', background: q.status === 'pending' ? '#FEF3C7' : '#DCFCE7', color: q.status === 'pending' ? '#92400E' : '#166534', padding: '2px 8px', borderRadius: '100px', fontWeight: 600 }}>{q.status}</div>
                </div>
                <div style={{ fontSize: '13px', color: '#475569', marginBottom: '4px' }}>📍 {q.material_quote_requests?.delivery_location || 'Unknown'}</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>Requested: {new Date(q.created_at).toLocaleDateString()}</div>
              </div>
            ))}
          </div>

          {/* Details & Form */}
          {selected ? (
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 16px 0', color: '#0F172A' }}>Quote Details: {selected.material_category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <div><span style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Delivery Location</span><div style={{ fontSize: '14px', color: '#0F172A' }}>{selected.material_quote_requests?.delivery_location}</div></div>
                <div><span style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Required Date</span><div style={{ fontSize: '14px', color: '#0F172A' }}>{selected.material_quote_requests?.required_date ? new Date(selected.material_quote_requests.required_date).toLocaleDateString() : 'ASAP'}</div></div>
                {selected.material_quote_requests?.boq_available && (
                  <div style={{ gridColumn: '1 / -1' }}><a href={selected.material_quote_requests.boq_file_url} target="_blank" style={{ color: '#FC6E20', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>📎 View Attached BOQ</a></div>
                )}
                <div style={{ gridColumn: '1 / -1' }}><span style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Notes</span><div style={{ fontSize: '14px', color: '#0F172A' }}>{selected.material_quote_requests?.notes || 'No notes provided.'}</div></div>
              </div>

              {selected.status === 'pending' || selected.status === 'submitted' ? (
                <form onSubmit={submitQuote}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: '#0F172A' }}>Submit Your Response</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Brand</label>
                      <input type="text" name="brand" defaultValue={selected.brand || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Grade/Spec</label>
                      <input type="text" name="grade_spec" defaultValue={selected.grade_spec || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Quantity</label>
                      <input type="number" step="0.01" name="quantity" defaultValue={selected.quantity || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Unit (e.g. Ton, Bag)</label>
                      <input type="text" name="unit" defaultValue={selected.unit || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Unit Rate (₹)</label>
                      <input type="number" step="0.01" name="unit_rate" defaultValue={selected.unit_rate || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Transport Cost (₹)</label>
                      <input type="number" step="0.01" name="transport_cost" defaultValue={selected.transport_cost || '0'} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="checkbox" name="gst_included" defaultChecked={selected.gst_included || false} id="gst" />
                      <label htmlFor="gst" style={{ fontSize: '14px', color: '#475569' }}>Unit Rate Includes GST?</label>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Delivery Timeline</label>
                      <input type="text" name="delivery_timeline" placeholder="e.g. Within 48 hours of payment" defaultValue={selected.delivery_timeline || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: '#475569' }}>Payment Terms</label>
                      <input type="text" name="payment_terms" placeholder="e.g. 100% Advance" defaultValue={selected.payment_terms || ''} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                    </div>
                  </div>
                  <button type="submit" style={{ width: '100%', background: '#FC6E20', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}>
                    {selected.status === 'submitted' ? 'Update Quote' : 'Submit Quote'}
                  </button>
                </form>
              ) : (
                <div style={{ background: '#ECFDF5', padding: '24px', borderRadius: '8px', border: '1px solid #10B981', textAlign: 'center' }}>
                  <h3 style={{ color: '#047857', margin: '0 0 8px 0' }}>Quote Accepted!</h3>
                  <p style={{ color: '#065F46', margin: 0 }}>This quote has been accepted by the customer. Please coordinate delivery.</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: 'white', border: '1px dashed #CBD5E1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>Select a request to view details</div>
          )}
        </div>
       )}
    </div>
  );
}
