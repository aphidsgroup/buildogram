export default function OverviewTab({ lead, stage, followUp, setStage, setFollowUp, saveUpdates }) {
  const PIPELINE_STAGES = [
    'New', 'Contacted', 'Qualified', 'Requirement Collected', 
    'BOQ / Scope Review', 'Partner Matching', 'Material Quote Shared', 
    'Proposal Sent', 'Follow-up', 'Converted', 'Lost'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card" style={{ background: 'white', padding: '20px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Pipeline Management</h3>
        <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Stage</label>
            <select className="input" value={stage} onChange={e => setStage(e.target.value)}>
              {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Next Follow-up</label>
            <input type="date" className="input" value={followUp} onChange={e => setFollowUp(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={saveUpdates}>Save Pipeline Updates</button>
      </div>

      <div className="grid-2" style={{ gap: '24px' }}>
        <div className="card" style={{ background: 'white', padding: '20px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Contact Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div><span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Phone</span><div style={{ fontSize: '14px', fontWeight: 600 }}>{lead.phone}</div></div>
            <div><span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Email</span><div style={{ fontSize: '14px', fontWeight: 600 }}>{lead.email || '—'}</div></div>
            <div><span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Location</span><div style={{ fontSize: '14px', fontWeight: 600 }}>{lead.location || '—'}</div></div>
            <div><span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Source</span><div style={{ fontSize: '14px', fontWeight: 600 }}>{lead.source}</div></div>
          </div>
        </div>

        <div className="card" style={{ background: 'white', padding: '20px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Original Request Data</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(lead.formData || {}).length === 0 ? (
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>No specific form data provided.</div>
            ) : (
              Object.entries(lead.formData).map(([k, v]) => (
                <div key={k}><span style={{ fontSize: '12px', color: '#64748B', display: 'block', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</span><div style={{ fontSize: '14px', fontWeight: 600 }}>{v}</div></div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
