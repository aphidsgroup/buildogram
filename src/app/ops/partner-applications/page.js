'use client';

import { useState, useEffect } from 'react';

const STATUS_COLORS = {
  'new': { bg: '#DBEAFE', color: '#1E40AF' },
  'contacted': { bg: '#FEF3C7', color: '#92400E' },
  'documents_requested': { bg: '#E0E7FF', color: '#3730A3' },
  'under_review': { bg: '#FFEDD5', color: '#9A3412' },
  'approved': { bg: '#DCFCE7', color: '#166534' },
  'rejected': { bg: '#FEE2E2', color: '#991B1B' },
  'converted': { bg: '#F3E8FF', color: '#6B21A8' },
};

function Badge({ status }) {
  const c = STATUS_COLORS[status] || { bg: '#F1F5F9', color: '#475569' };
  return <span style={{ background: c.bg, color: c.color, padding: '4px 12px', borderRadius: '99px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' }}>{status.replace('_', ' ')}</span>;
}

const CHECKLISTS = {
  'Structural Engineer': ['License/Registration Check', 'Sample Structural Drawing Review', 'Consultation Fee Structure'],
  'Surveyor': ['Equipment Capability (DGPS/Total Station)', 'Sample Survey Drawing', 'Turnaround Time Check'],
  'NDT Testing Lab': ['Test Methods Confirmed', 'Sample NDT Report', 'Equipment Calibration Logs'],
  'Soil Testing Lab': ['Lab Certifications', 'Sample Soil Report', 'Borehole Capacity'],
  'Builder': ['Project Proof/Site References', 'Company Registration/GST', 'Client Testimonials'],
  'Material Supplier': ['Brand Supply Proof', 'Delivery Capacity/Fleet', 'Trade License'],
  'Default': ['Identity/Business Verification', 'Service Area Confirmation', 'Portfolio/Project Proof', 'Contact Verification', 'Agreement/Consent']
};

export default function OpsPartnerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [welcomePack, setWelcomePack] = useState(null);
  const [converting, setConverting] = useState(false);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ops/partner-applications');
      const data = await res.json();
      if (data.success) setApplications(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApps(); }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/ops/partner-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchApps();
      if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus }));
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const convertToPartner = async (id) => {
    if (!confirm('Convert this application to a Partner Profile draft?')) return;
    setConverting(true);
    try {
      const res = await fetch(`/api/ops/partner-applications/${id}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verification_status: 'reviewed' })
      });
      const data = await res.json();
      if (data.success) {
        setWelcomePack(data.data.welcomePack);
        fetchApps();
        if (selected?.id === id) setSelected(prev => ({ ...prev, status: 'converted' }));
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert('Conversion failed');
    } finally {
      setConverting(false);
    }
  };

  const parseSafe = (str) => {
    try { return JSON.parse(str || '[]').join(', '); } catch { return ''; }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Partner Applications</h1>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* List View */}
        <div style={{ flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
              <tr>
                <th style={{ padding: '16px' }}>Business Name</th>
                <th style={{ padding: '16px' }}>Category</th>
                <th style={{ padding: '16px' }}>Date</th>
                <th style={{ padding: '16px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="4" style={{ padding: '16px', textAlign: 'center' }}>Loading...</td></tr> : 
                applications.map(app => (
                <tr key={app.id} onClick={() => { setSelected(app); setWelcomePack(null); }} style={{ borderBottom: '1px solid #E2E8F0', cursor: 'pointer', background: selected?.id === app.id ? '#F1F5F9' : 'white' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#0F172A' }}>{app.business_name}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{app.category}</td>
                  <td style={{ padding: '16px', color: '#64748B' }}>{new Date(app.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '16px' }}><Badge status={app.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail View */}
        {selected && (
          <div style={{ width: '500px', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>{selected.business_name}</h2>
                <div style={{ color: '#64748B', fontSize: '14px' }}>{selected.contact_person} • {selected.phone}</div>
              </div>
              <Badge status={selected.status} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <select 
                value={selected.status} 
                onChange={(e) => updateStatus(selected.id, e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', width: '100%', marginBottom: '12px' }}
              >
                {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>

              {selected.status === 'approved' && (
                <button 
                  onClick={() => convertToPartner(selected.id)}
                  disabled={converting}
                  style={{ width: '100%', padding: '10px', background: '#FC6E20', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  {converting ? 'Converting...' : 'Auto-Draft Partner Profile'}
                </button>
              )}
            </div>

            {welcomePack && (
              <div style={{ background: '#ECFDF5', padding: '16px', borderRadius: '8px', border: '1px solid #10B981', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#047857' }}>Profile Drafted! Welcome Pack:</h4>
                <textarea readOnly value={welcomePack} style={{ width: '100%', height: '150px', fontSize: '12px', padding: '8px', borderRadius: '4px', border: '1px solid #6EE7B7' }} />
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Application Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px', marginBottom: '24px' }}>
                <div><span style={{ color: '#64748B', display: 'block' }}>Email</span> {selected.email}</div>
                <div><span style={{ color: '#64748B', display: 'block' }}>Years Exp</span> {selected.years_experience}</div>
                <div><span style={{ color: '#64748B', display: 'block' }}>GST</span> {selected.gst_number || '-'}</div>
                <div><span style={{ color: '#64748B', display: 'block' }}>License</span> {selected.license_number || '-'}</div>
              </div>
              <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                <span style={{ color: '#64748B', display: 'block' }}>Service Areas</span>
                {parseSafe(selected.service_areas)}
              </div>
              <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                <span style={{ color: '#64748B', display: 'block' }}>Portfolio Links</span>
                {parseSafe(selected.portfolio_links)}
              </div>
              
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '32px', marginBottom: '16px', color: '#0F172A', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Verification Checklist</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {CHECKLISTS['Default'].map(item => (
                  <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#334155' }}>
                    <input type="checkbox" /> {item}
                  </label>
                ))}
                {CHECKLISTS[selected.category] && (
                  <>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#64748B', marginTop: '8px' }}>Category Specific ({selected.category})</div>
                    {CHECKLISTS[selected.category].map(item => (
                      <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#334155' }}>
                        <input type="checkbox" /> {item}
                      </label>
                    ))}
                  </>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
