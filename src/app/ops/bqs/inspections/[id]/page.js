'use client';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';

export default function BqsInspectionDetail({ params }) {
  const { id } = use(params);
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passports, setPassports] = useState([]);
  
  // Rework Modal State
  const [showReworkModal, setShowReworkModal] = useState(false);
  const [reworkData, setReworkData] = useState({ result_id: null, issue_title: '', issue_description: '' });

  useEffect(() => {
    fetchInspection();
    fetchPassports();
  }, [id]);

  const fetchInspection = async () => {
    try {
      const res = await fetch(`/api/ops/bqs/inspections/${id}`);
      const data = await res.json();
      if (data.success) {
        setInspection(data.inspection);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchPassports = async () => {
    try {
      const res = await fetch('/api/ops/property-passports');
      const data = await res.json();
      if (data.success) {
        setPassports(data.passports || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateResult = async (resultId, updatePayload) => {
    try {
      const res = await fetch(`/api/ops/bqs/inspections/${id}/results`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result_id: resultId, ...updatePayload })
      });
      if (res.ok) fetchInspection();
    } catch (e) {
      alert("Failed to update");
    }
  };

  const handleCreateRework = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/ops/bqs/inspections/${id}/rework`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inspection_result_id: reworkData.result_id,
          issue_title: reworkData.issue_title,
          issue_description: reworkData.issue_description
        })
      });
      if (res.ok) {
        setShowReworkModal(false);
        setReworkData({ result_id: null, issue_title: '', issue_description: '' });
        fetchInspection();
      }
    } catch (e) {
      alert("Failed to raise rework");
    }
  };

  const closeRework = async (reworkId) => {
    try {
      const res = await fetch(`/api/ops/bqs/inspections/${id}/rework`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rework_id: reworkId, status: 'verified_closed' })
      });
      if (res.ok) fetchInspection();
    } catch (e) {
      alert("Failed to close rework");
    }
  };

  const linkPassport = async (passportId) => {
    try {
      await fetch(`/api/ops/bqs/inspections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passport_id: passportId })
      });
      fetchInspection();
    } catch (e) {
      alert("Failed to link passport");
    }
  };

  const closeInspection = async () => {
    // Check if any reworks are open
    const hasOpenReworks = inspection.results.some(r => r.rework_required && r.rework_status !== 'verified_closed');
    if (hasOpenReworks) {
      alert("Cannot close inspection while rework items are still open.");
      return;
    }
    try {
      await fetch(`/api/ops/bqs/inspections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' })
      });
      fetchInspection();
    } catch (e) {
      alert("Failed to close inspection");
    }
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Inspection Details...</div>;
  if (!inspection) return <div style={{ padding: '40px', textAlign: 'center' }}>Inspection not found.</div>;

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', fontSize: '14px' }}>
        <Link href="/ops/bqs" style={{ color: '#64748B', textDecoration: 'none' }}>← Back to BQS</Link>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>{inspection.project_name} - {inspection.stage.toUpperCase()} Inspection</h1>
          <div style={{ display: 'flex', gap: '16px', color: '#475569', fontSize: '14px' }}>
            <span><strong>Date:</strong> {new Date(inspection.created_at).toLocaleDateString()}</span>
            <span><strong>Status:</strong> {inspection.status.replace('_', ' ').toUpperCase()}</span>
            <span>
              <strong>Passport Link:</strong> 
              {inspection.passport ? (
                <span style={{ color: '#059669', marginLeft: '4px', fontWeight: 600 }}>Linked to {inspection.passport.passport_number}</span>
              ) : (
                <select onChange={e => linkPassport(e.target.value)} style={{ marginLeft: '8px', padding: '2px 8px' }}>
                  <option value="">Attach to Property Passport...</option>
                  {passports.map(p => <option key={p.id} value={p.id}>{p.passport_number} ({p.property_name})</option>)}
                </select>
              )}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {inspection.status !== 'completed' && (
            <button onClick={closeInspection} style={{ background: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              ✓ Complete & Close Inspection
            </button>
          )}
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
              <th style={{ padding: '16px' }}>Checklist Item</th>
              <th style={{ padding: '16px', width: '200px' }}>Result</th>
              <th style={{ padding: '16px', width: '250px' }}>Remarks / Proof</th>
              <th style={{ padding: '16px', width: '200px' }}>Rework Status</th>
            </tr>
          </thead>
          <tbody>
            {inspection.results.map((res) => (
              <tr key={res.id} style={{ borderBottom: '1px solid #E2E8F0', background: res.status === 'fail' ? '#FEF2F2' : res.status === 'pass' ? '#F0FDF4' : 'transparent' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>{res.checklist_item.item_text}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Method: {res.checklist_item.inspection_method} • Required Proof: {res.checklist_item.required_proof_type} • Severity: {res.checklist_item.severity}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <select 
                    value={res.status} 
                    onChange={e => updateResult(res.id, { status: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  >
                    <option value="not_applicable">Not Evaluated / N/A</option>
                    <option value="pass">Pass</option>
                    <option value="observation">Observation (Pass with remarks)</option>
                    <option value="fail">Fail (Requires Rework)</option>
                  </select>
                </td>
                <td style={{ padding: '16px' }}>
                  <input 
                    type="text" 
                    placeholder="Engineer Remarks..." 
                    value={res.remarks || ''} 
                    onBlur={e => updateResult(res.id, { remarks: e.target.value })}
                    onChange={e => {
                       const newResults = [...inspection.results];
                       const index = newResults.findIndex(r => r.id === res.id);
                       newResults[index].remarks = e.target.value;
                       setInspection({ ...inspection, results: newResults });
                    }}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '12px', marginBottom: '4px' }}
                  />
                  <div style={{ fontSize: '11px', color: '#3B82F6', cursor: 'pointer', fontWeight: 600 }}>+ Add Proof Link</div>
                </td>
                <td style={{ padding: '16px' }}>
                  {res.status === 'fail' && !res.rework_required && (
                    <button onClick={() => { setReworkData({ ...reworkData, result_id: res.id }); setShowReworkModal(true); }} style={{ background: '#DC2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                      Raise Rework Ticket
                    </button>
                  )}
                  {res.rework_required && (
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: res.rework_status === 'verified_closed' ? '#059669' : '#DC2626', marginBottom: '4px' }}>
                        {res.rework_status.replace('_', ' ').toUpperCase()}
                      </div>
                      {res.rework_status !== 'verified_closed' && res.reworks?.length > 0 && (
                        <button onClick={() => closeRework(res.reworks[0].id)} style={{ background: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                          Mark Verified & Closed
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rework Modal */}
      {showReworkModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', maxWidth: '90%' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', color: '#0F172A' }}>Raise Rework Ticket</h2>
            <form onSubmit={handleCreateRework} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Issue Title</label>
                <input required value={reworkData.issue_title} onChange={e => setReworkData({...reworkData, issue_title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="e.g. Honeycombing in column C4" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Description & Corrective Action</label>
                <textarea required value={reworkData.issue_description} onChange={e => setReworkData({...reworkData, issue_description: e.target.value})} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="Describe the rework needed..." />
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setShowReworkModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#DC2626', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Submit Rework</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
