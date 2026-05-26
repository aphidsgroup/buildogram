import { useState, useEffect } from 'react';

export default function RequirementTab({ lead }) {
  const [req, setReq] = useState(null);

  useEffect(() => {
    fetch(`/api/requirements?leadId=${lead.id}`).then(res => res.json()).then(data => {
      if (data.data && data.data.length > 0) setReq(data.data[0]);
    });
  }, [lead.id]);

  const createReq = async () => {
    const res = await fetch('/api/requirements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: lead.id,
        requirementType: lead.leadType,
        projectLocation: lead.location,
        currentStage: 'Requirement Collected'
      })
    });
    const result = await res.json();
    setReq(result.data);
  };

  if (!req) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'white', border: '1px dashed #CBD5E1', borderRadius: '8px' }}>
        <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px' }}>No structured requirement workspace exists yet.</div>
        <button className="btn btn-primary" onClick={createReq}>Create Requirement Workspace</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B', marginBottom: '20px' }}>Project Requirement details</h3>
      
      <div className="grid-2" style={{ gap: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Requirement Type</label>
          <input className="input" defaultValue={req.requirementType} disabled />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Project Location</label>
          <input className="input" defaultValue={req.projectLocation} />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Plot Size / Built-up Area</label>
          <input className="input" placeholder="e.g. 2400 sqft" />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Budget Range</label>
          <input className="input" placeholder="e.g. 1 Cr - 1.5 Cr" />
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Scope Summary</label>
        <textarea className="input" rows="4" placeholder="Describe the full scope of work..."></textarea>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button className="btn btn-outline btn-sm">Save Draft</button>
        <button className="btn btn-primary btn-sm">Mark as Collected</button>
      </div>
    </div>
  );
}
