import { useState, useEffect } from 'react';

export default function PartnerMatchingTab({ lead }) {
  const [matches, setMatches] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`/api/partner-matches?leadId=${lead.id}`).then(res => res.json()),
      fetch('/api/partners').then(res => res.json()),
    ]).then(([matchData, partnerData]) => {
      if (matchData.data) setMatches(matchData.data);
      if (partnerData.partners) setPartners(partnerData.partners);
    });
  }, [lead.id]);

  const addMatch = async () => {
    const partner = partners.find(item => item.id === selectedPartnerId);
    if (!partner) return;
    const res = await fetch('/api/partner-matches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, partnerId: partner.id, partnerType: partner.category })
    });
    const result = await res.json();
    if (res.ok && result.data) {
      setMatches([result.data, ...matches]);
      setSelectedPartnerId('');
    }
  };

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Partner Matching Engine</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select className="input" value={selectedPartnerId} onChange={event => setSelectedPartnerId(event.target.value)}>
            <option value="">Select approved partner</option>
            {partners.map(partner => <option key={partner.id} value={partner.id}>{partner.companyName}</option>)}
          </select>
          <button className="btn btn-primary btn-sm" onClick={addMatch} disabled={!selectedPartnerId}>+ Shortlist Partner</button>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {matches.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No partners matched yet.</div>
        ) : (
          matches.map(m => (
            <div key={m.id} style={{ border: '1px solid #E2E8F0', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>
                    {partners.find(partner => partner.id === m.partnerId)?.companyName || `Partner ${m.partnerId}`}
                  </div>
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
