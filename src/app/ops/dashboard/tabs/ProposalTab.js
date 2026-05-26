import { useState, useEffect } from 'react';

export default function ProposalTab({ lead }) {
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    fetch(`/api/proposals?leadId=${lead.id}`).then(res => res.json()).then(data => {
      if (data.data && data.data.length > 0) setProposal(data.data[0]);
    });
  }, [lead.id]);

  const createProposal = async () => {
    const res = await fetch('/api/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, title: `${lead.name} - Official Proposal`, proposalType: lead.leadType })
    });
    const result = await res.json();
    setProposal(result.data);
  };

  if (!proposal) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'white', border: '1px dashed #CBD5E1', borderRadius: '8px' }}>
        <button className="btn btn-primary" onClick={createProposal}>Create Official Proposal</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Proposal Builder</h3>
        <span className="badge badge-blue">{proposal.proposalStatus}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Proposal Title</label>
        <input className="input" defaultValue={proposal.title} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '12px' }}>Line Items</h4>
        <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Description</th>
              <th style={{ padding: '10px' }}>Qty</th>
              <th style={{ padding: '10px' }}>Rate</th>
              <th style={{ padding: '10px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94A3B8' }}>No items added yet.</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-outline btn-sm" style={{ marginTop: '12px' }}>+ Add Line Item</button>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button className="btn btn-outline btn-sm">Preview PDF</button>
        <button className="btn btn-primary btn-sm">Share with Client</button>
      </div>
    </div>
  );
}
