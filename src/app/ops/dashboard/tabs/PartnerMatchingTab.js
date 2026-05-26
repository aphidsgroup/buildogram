import { useState, useEffect } from 'react';

export default function PartnerMatchingTab({ lead }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`/api/partner-matches?leadId=${lead.id}`).then(res => res.json()).then(data => {
      if (data.data) setMatches(data.data);
    });
  }, [lead.id]);

  const addDummyMatch = async () => {
    const res = await fetch('/api/partner-matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, partnerId: 'dummy', partnerType: 'contractor' })
    });
    const result = await res.json();
    setMatches([result.data, ...matches]);
  };

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Partner Matching Engine</h3>
        <button className="btn btn-primary btn-sm" onClick={addDummyMatch}>+ Shortlist Partner</button>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {matches.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No partners matched yet.</div>
        ) : (
          matches.map(m => (
            <div key={m.id} style={{ border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>Partner ID: {m.partnerId}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>Status: {m.matchStatus}</div>
                </div>
                <button className="btn btn-outline btn-sm">Assign</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
