'use client';
import { use, useState, useEffect } from 'react';
import Link from 'next/link';

export default function PassportDetail({ params }) {
  const { id } = use(params);
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Forms
  const [recordForm, setRecordForm] = useState({ category: 'legal_document', title: '', description: '', file_url: '', visibility: 'private' });
  const [checklistForm, setChecklistForm] = useState({ stage: 'planning', checklist_item: '', remarks: '' });

  useEffect(() => {
    fetchPassport();
  }, []);

  const fetchPassport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/ops/property-passports/${id}`);
      const data = await res.json();
      if (data.success) {
        setPassport(data.passport);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      const res = await fetch(`/api/ops/property-passports/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchPassport();
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/ops/property-passports/${id}/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordForm)
      });
      if (res.ok) {
        setRecordForm({ category: 'legal_document', title: '', description: '', file_url: '', visibility: 'private' });
        fetchPassport();
      }
    } catch (e) {
      alert("Failed to add record");
    }
  };

  const addChecklist = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/ops/property-passports/${id}/checklists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checklistForm)
      });
      if (res.ok) {
        setChecklistForm({ stage: 'planning', checklist_item: '', remarks: '' });
        fetchPassport();
      }
    } catch (e) {
      alert("Failed to add checklist");
    }
  };

  if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>;
  if (!passport) return <div style={{ padding: '60px', textAlign: 'center' }}>Passport not found.</div>;

  const shareLink = typeof window !== 'undefined' ? `${window.location.origin}/property-passport/${passport.share_token}` : '';

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/ops/property-passports" style={{ color: '#FC6E20', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
          ← Back to Passports
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Sidebar: Passport Info */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 16px 0', color: '#0F172A' }}>{passport.passport_number}</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Property</label>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{passport.property_name || 'Untitled'}</div>
            <div style={{ fontSize: '13px', color: '#475569' }}>{passport.property_area} • {passport.property_type}</div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Owner</label>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{passport.owner_name}</div>
            <div style={{ fontSize: '13px', color: '#475569' }}>{passport.owner_phone}</div>
            <div style={{ fontSize: '13px', color: '#475569' }}>{passport.owner_email || 'No email'}</div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>Status</label>
            <select 
              value={passport.status} 
              onChange={(e) => updateStatus(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }}>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="handover_ready">Handover Ready</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>Owner Share Link</label>
            <input readOnly value={shareLink} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', marginBottom: '8px', background: 'white' }} />
            <button onClick={() => navigator.clipboard.writeText(shareLink)} style={{ width: '100%', background: '#FC6E20', color: 'white', border: 'none', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
              Copy Link
            </button>
            <a href={shareLink} target="_blank" style={{ display: 'block', textAlign: 'center', marginTop: '8px', fontSize: '12px', color: '#FC6E20', textDecoration: 'none', fontWeight: 600 }}>Open Preview</a>
          </div>
        </div>

        {/* Right Content: Records & Checklists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Records Section */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#0F172A' }}>Digital Records ({passport.records?.length || 0})</h3>
            
            <form onSubmit={addRecord} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <select value={recordForm.category} onChange={e => setRecordForm({...recordForm, category: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', flex: 1, minWidth: '150px' }}>
                <option value="legal_document">Legal</option>
                <option value="drawing">Drawing</option>
                <option value="approval">Approval</option>
                <option value="boq">BOQ/Estimate</option>
                <option value="material_record">Material Proof</option>
                <option value="invoice">Invoice</option>
                <option value="delivery_proof">Delivery Proof</option>
                <option value="quality_check">Quality Check</option>
                <option value="structural_audit">Structural Audit</option>
                <option value="survey_record">Survey / Soil</option>
                <option value="warranty">Warranty</option>
                <option value="handover_document">Handover Doc</option>
              </select>
              <input required placeholder="Title..." value={recordForm.title} onChange={e => setRecordForm({...recordForm, title: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', flex: 2, minWidth: '200px' }} />
              <input placeholder="File URL (optional)" value={recordForm.file_url} onChange={e => setRecordForm({...recordForm, file_url: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', flex: 2, minWidth: '200px' }} />
              <select value={recordForm.visibility} onChange={e => setRecordForm({...recordForm, visibility: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', flex: 1, minWidth: '120px' }}>
                <option value="private">Private (Ops)</option>
                <option value="owner_visible">Owner Visible</option>
                <option value="public_summary">Public Summary</option>
              </select>
              <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>+ Add Record</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {passport.records?.map(r => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', background: '#E2E8F0', padding: '2px 6px', borderRadius: '4px', color: '#475569', fontWeight: 600 }}>{r.category.toUpperCase()}</span>
                      <strong style={{ fontSize: '14px', color: '#0F172A' }}>{r.title}</strong>
                      {r.visibility !== 'private' && <span style={{ fontSize: '10px', background: '#D1FAE5', color: '#065F46', padding: '2px 6px', borderRadius: '4px' }}>VISIBLE</span>}
                    </div>
                    {r.description && <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{r.description}</div>}
                  </div>
                  {r.file_url && (
                    <a href={r.file_url} target="_blank" style={{ color: '#FC6E20', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View File</a>
                  )}
                </div>
              ))}
              {passport.records?.length === 0 && <div style={{ color: '#64748B', fontSize: '13px' }}>No records added yet.</div>}
            </div>
          </div>

          {/* Checklist Section */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#0F172A' }}>Construction Checklists ({passport.checklists?.length || 0})</h3>
            
            <form onSubmit={addChecklist} style={{ display: 'flex', gap: '12px', marginBottom: '24px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <select value={checklistForm.stage} onChange={e => setChecklistForm({...checklistForm, stage: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', flex: 1 }}>
                <option value="planning">Planning</option>
                <option value="foundation">Foundation</option>
                <option value="structure">Structure</option>
                <option value="mep">MEP</option>
                <option value="finishing">Finishing</option>
                <option value="handover">Handover</option>
              </select>
              <input required placeholder="Checklist Task..." value={checklistForm.checklist_item} onChange={e => setChecklistForm({...checklistForm, checklist_item: e.target.value})} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', flex: 3 }} />
              <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>+ Add Task</button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {passport.checklists?.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', background: c.status === 'completed' ? '#F8FAFC' : 'white' }}>
                  <input type="checkbox" checked={c.status === 'completed'} readOnly style={{ width: '16px', height: '16px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: c.status === 'completed' ? '#64748B' : '#0F172A', textDecoration: c.status === 'completed' ? 'line-through' : 'none' }}>{c.checklist_item}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{c.stage}</div>
                  </div>
                </div>
              ))}
              {passport.checklists?.length === 0 && <div style={{ color: '#64748B', fontSize: '13px' }}>No checklist items yet.</div>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
