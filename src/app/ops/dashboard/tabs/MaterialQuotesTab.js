import { useState, useEffect } from 'react';

export default function MaterialQuotesTab({ lead }) {
  const [quoteReq, setQuoteReq] = useState(null);

  useEffect(() => {
    fetch(`/api/material-quotes?leadId=${lead.id}`).then(res => res.json()).then(data => {
      if (data.data && data.data.length > 0) setQuoteReq(data.data[0]);
    });
  }, [lead.id]);

  const createQuoteReq = async () => {
    const res = await fetch('/api/material-quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, quoteStatus: 'collecting_quotes' })
    });
    const result = await res.json();
    setQuoteReq(result.data);
  };

  if (!quoteReq) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'white', border: '1px dashed #CBD5E1', borderRadius: '8px' }}>
        <button className="btn btn-primary" onClick={createQuoteReq}>Start Material Sourcing</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '20px' }}>Material Quotation Desk</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '12px' }}>Supplier Quotes</h4>
        <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Supplier</th>
              <th style={{ padding: '10px' }}>Item</th>
              <th style={{ padding: '10px' }}>Rate</th>
              <th style={{ padding: '10px' }}>Amount</th>
              <th style={{ padding: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No supplier quotes collected yet.</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-outline btn-sm" style={{ marginTop: '12px' }}>+ Add Supplier Quote</button>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary btn-sm">Mark Quote Prepared</button>
      </div>
    </div>
  );
}
