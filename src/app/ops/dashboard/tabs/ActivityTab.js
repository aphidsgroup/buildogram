export default function ActivityTab({ lead, note, setNote, submitNote }) {
  return (
    <div className="grid-2" style={{ gap: '24px' }}>
      <div className="card" style={{ background: 'white', padding: '20px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Add Internal Note</h3>
        <textarea 
          className="input mb-3" 
          rows="4" 
          placeholder="Log a call, note, or follow-up..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <button className="btn btn-outline btn-sm" onClick={submitNote}>Add Note</button>
      </div>

      <div className="card" style={{ background: 'white', padding: '20px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>Activity Log</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {(lead.activityLog || []).slice().reverse().map(log => (
            <div key={log.id} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{log.action} <span style={{ color: '#94A3B8', fontWeight: 400 }}>by {log.user}</span></div>
                <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>{log.note}</div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>{new Date(log.timestamp).toLocaleString('en-IN')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
