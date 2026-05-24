'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { roleCan } from '@/lib/permissions';
import { getWhatsAppLink, renderTemplate } from '@/lib/whatsapp';

/* ─── Constants ─────────────────────────────────────────── */
const STATUS_PIPELINE = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const LEAD_TYPE_LABELS = {
  construction:        { label: 'Construction',       color: '#2563eb', bg: '#eff6ff' },
  boq_audit:           { label: 'BOQ Audit',          color: '#7c3aed', bg: '#f5f3ff' },
  plan_review:         { label: 'Plan Review',        color: '#0891b2', bg: '#ecfeff' },
  material_quote:      { label: 'Materials',          color: '#d97706', bg: '#fffbeb' },
  partner_application: { label: 'Partner App', color: 'badge-green' },
  property_listing:    { label: 'Property Listing', color: 'badge-indigo' },
  property_inquiry:    { label: 'Property Inquiry', color: 'badge-pink' },
  rental_listing:      { label: 'Rental', color: 'badge-gray' },
  property_passport:   { label: 'Property Passport',  color: '#9333ea', bg: '#faf5ff' },
  maintenance:         { label: 'Maintenance',        color: '#ea580c', bg: '#fff7ed' },
  property_listing:    { label: 'Property Listing',   color: '#e11d48', bg: '#fff1f2' },
  general:             { label: 'General',            color: '#64748b', bg: '#f8fafc' },
};

const STATUS_COLORS = {
  new:       { color: '#2563eb', bg: '#eff6ff' },
  contacted: { color: '#d97706', bg: '#fffbeb' },
  qualified: { color: '#7c3aed', bg: '#f5f3ff' },
  proposal:  { color: '#0891b2', bg: '#ecfeff' },
  won:       { color: '#059669', bg: '#ecfdf5' },
  lost:      { color: '#dc2626', bg: '#fef2f2' },
};

const fmt = n =>
  n ? '₹' + (n >= 10000000 ? (n / 10000000).toFixed(1) + 'Cr' : n >= 100000 ? (n / 100000).toFixed(1) + 'L' : Number(n).toLocaleString('en-IN')) : '—';



/* ─── Badge Component ─────────────────────────────────────── */
function Badge({ type, value, map }) {
  const cfg = map[value] || { label: value, color: '#64748b', bg: '#f1f5f9' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600,
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}22`,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label || value}
    </span>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function OpsLeads() {
  const [leads, setLeads]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter]     = useState('all');
  const [search, setSearch]     = useState('');
  const [selected, setSelected] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);
  const [user, setUser]         = useState(null);
  const [waModal, setWaModal] = useState({ open: false, lead: null, message: '', phone: '', selectedTemplateId: '' });
  const [waTemplates, setWaTemplates] = useState([]);

  // Activity Timeline State
  const [activities, setActivities] = useState([]);
  const [actForm, setActForm] = useState({ type: 'note', title: '', description: '', follow_up: '' });
  const [actLoading, setActLoading] = useState(false);

  // Revenue Modal State
  const [revModal, setRevModal] = useState({ open: false, data: {} });
  const [revSaving, setRevSaving] = useState(false);

  // BOQ Report State
  const [reportMode, setReportMode] = useState(false);
  const [reportForm, setReportForm] = useState({
    executive_summary: '', missing_or_unclear_items: '', escalation_risks: '',
    questions_to_ask_contractor: '', buildogram_recommendation: '', disclaimer: ''
  });

  const showToast = (msg, type = 'success', propertyId = null) => {
    setToast({ message: msg, type, propertyId });
    setTimeout(() => setToast(null), 6000);
  };

  const load = () => {
    setLoading(true);
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => { setLeads(d.leads || []); setLoading(false); });
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user); });
    fetch('/api/ops/whatsapp/templates')
      .then(r => r.json())
      .then(d => { if (d.success) setWaTemplates(d.templates); });
  };

  useEffect(() => { load(); }, []);

  const update = async (id, data) => {
    setSaving(true);
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    setSaving(false);
    load();
    if (selected?.id === id) setSelected(prev => ({ ...prev, ...data }));
    if (d.auto_created_property) {
      showToast(
        `🛂 Property Passport created: "${d.auto_created_property.title}"`,
        'success',
        d.auto_created_property.id,
      );
      if (selected?.id === id) {
        setSelected(prev => ({
          ...prev,
          property_id: d.auto_created_property.id,
          property_title: d.auto_created_property.title,
          property_passport_status: 'collecting',
          property_completeness: 0,
        }));
      }
    }
  };

  // Fetch activities when selected lead changes
  useEffect(() => {
    if (selected) {
      setActLoading(true);
      fetch(`/api/leads/${selected.id}/activities`)
        .then(r => r.json())
        .then(d => {
          if (d.success) setActivities(d.activities || []);
          setActLoading(false);
        })
        .catch(() => setActLoading(false));
    } else {
      setActivities([]);
    }
  }, [selected?.id]);

  // Handle adding a manual activity
  const handleAddActivity = async (e) => {
    e.preventDefault();
    setActLoading(true);
    try {
      const res = await fetch(`/api/leads/${selected.id}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activity_type: actForm.type,
          title: actForm.type === 'call' ? 'Phone Call' : actForm.type === 'follow_up' ? 'Follow-up Set' : 'Manual Note',
          description: actForm.description,
          follow_up_at: actForm.follow_up || null
        })
      });
      const d = await res.json();
      if (d.success) {
        setActivities(prev => [d.activity, ...prev]);
        setActForm({ type: 'note', title: '', description: '', follow_up: '' });
      }
    } catch(err) { console.error(err); }
    setActLoading(false);
  };

  // Helper to silently log auto-activities
  const logActivity = async (leadId, payload) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/activities`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const d = await res.json();
      if (d.success && selected?.id === leadId) {
        setActivities(prev => [d.activity, ...prev]);
      }
    } catch(err) { console.error(err); }
  };

  const handleCreateRevenue = async (e) => {
    e.preventDefault();
    setRevSaving(true);
    try {
      const payload = {
        ...revModal.data,
        amount_expected: Number(revModal.data.amount_expected) || 0,
        commission_expected: Number(revModal.data.commission_expected) || 0,
        amount_received: 0,
        commission_received: 0,
        status: 'expected'
      };
      
      const res = await fetch('/api/ops/revenue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const d = await res.json();
      if (d.success) {
        showToast('Revenue record created successfully!');
        setRevModal({ open: false, data: {} });
        logActivity(selected.id, { activity_type: 'system', title: 'Revenue Record Created', description: `Expected: ₹${payload.amount_expected}` });
      } else {
        alert('Failed to create revenue record: ' + d.error);
      }
    } catch(err) { console.error(err); }
    setRevSaving(false);
  };

  const handleGenerateBOQDraft = async () => {
    if (!selected) return;
    const res = await fetch('/api/ai/boq-draft', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead_id: selected.id, boq_text: 'See attached file/metadata' })
    });
    const d = await res.json();
    if (d.success) {
      showToast('AI Draft Generated successfully!');
      load();
      if (selected.id) {
        setSelected(p => ({
          ...p,
          metadata: { ...p.metadata, ai_draft_request_id: d.ai_request_id, boq_review_status: 'draft_generated', latest_draft: d.draft }
        }));
      }
      logActivity(selected.id, { activity_type: 'system', title: 'BOQ AI draft generated', description: 'Human review required before sharing.' });
    } else {
      alert('Failed to generate draft: ' + d.error);
    }
  };

  const markBOQReviewed = () => {
    update(selected.id, { metadata: { ...selected.metadata, boq_review_status: 'reviewed' } });
    setSelected(p => ({ ...p, metadata: { ...p.metadata, boq_review_status: 'reviewed' } }));
    logActivity(selected.id, { activity_type: 'status_change', title: 'BOQ draft reviewed by Ops', description: 'The BOQ Audit draft was reviewed.' });
    showToast('Marked as reviewed!');
  };

  const handleCreateReportFromDraft = () => {
    const draft = selected?.metadata?.latest_draft;
    if (!draft) return;
    setReportForm({
      executive_summary: draft.summary || '',
      missing_or_unclear_items: (draft.missing_or_unclear_items || draft.missing_items || []).join('\n'),
      escalation_risks: (draft.escalation_risks || []).join('\n'),
      questions_to_ask_contractor: (draft.questions_for_contractor || []).join('\n'),
      buildogram_recommendation: draft.recommended_next_step || '',
      disclaimer: draft.disclaimer || 'This BOQ review draft is advisory and based on provided information. It is not final engineering, legal, contractual, or construction certification. Human review by Buildogram team/professionals is required before sharing with customer.'
    });
    setReportMode(true);
  };

  const handleSaveReport = (status) => {
    if (status === 'ready_to_share') {
      if (!reportForm.disclaimer || reportForm.disclaimer.length < 50) {
        alert('A detailed legal disclaimer is required before sharing.');
        return;
      }
      if (!reportForm.executive_summary || !reportForm.buildogram_recommendation) {
        alert('Executive Summary and Recommendation are required.');
        return;
      }
    }
    
    const newReport = {
      ...reportForm,
      status,
      reviewed_by: 'Ops',
      reviewed_at: new Date().toISOString()
    };
    
    update(selected.id, { metadata: { ...selected.metadata, reviewed_boq_report: newReport } });
    setSelected(p => ({ ...p, metadata: { ...p.metadata, reviewed_boq_report: newReport } }));
    
    if (status === 'ready_to_share') {
      logActivity(selected.id, { activity_type: 'system', title: 'Reviewed BOQ report marked ready to share', description: 'Internal report is completed.' });
    } else {
      logActivity(selected.id, { activity_type: 'system', title: 'Reviewed BOQ report drafted', description: 'Saved internal report.' });
    }
    setReportMode(false);
    showToast(`Report saved as ${status.replace('_', ' ')}!`);
  };

  const filtered = leads.filter(l => {
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchType   = typeFilter   === 'all' || l.lead_type === typeFilter;
    const matchSearch = !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search);
    return matchStatus && matchType && matchSearch;
  });

  const typeCount = type => leads.filter(l => l.lead_type === type).length;
  const statusCount = s => leads.filter(l => l.status === s).length;

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Leads</h1>
          <p className="text-muted mt-2">{leads.length} total · {filtered.length} shown</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            className="input"
            style={{ maxWidth: '260px', margin: 0 }}
            placeholder="Search name or phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by Type</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setTypeFilter('all')} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: typeFilter === 'all' ? '#292929' : '#f8fafc', color: typeFilter === 'all' ? '#fff' : '#64748b', borderColor: typeFilter === 'all' ? '#292929' : '#e2e8f0' }}>All ({leads.length})</button>
          {Object.entries(LEAD_TYPE_LABELS).map(([key, cfg]) => (
            <button key={key} onClick={() => setTypeFilter(key)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: typeFilter === key ? cfg.color : cfg.bg, color: typeFilter === key ? '#fff' : cfg.color, borderColor: typeFilter === key ? cfg.color : `${cfg.color}44` }}>{cfg.label} ({typeCount(key)})</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter by Status</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setStatusFilter('all')} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid #e2e8f0', cursor: 'pointer', background: statusFilter === 'all' ? '#292929' : '#f8fafc', color: statusFilter === 'all' ? '#fff' : '#64748b' }}>All Statuses</button>
          {STATUS_PIPELINE.map(s => {
            const cfg = STATUS_COLORS[s] || {};
            return (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', textTransform: 'capitalize', background: statusFilter === s ? cfg.color : cfg.bg, color: statusFilter === s ? '#fff' : cfg.color, borderColor: statusFilter === s ? cfg.color : `${cfg.color}44` }}>{s} ({statusCount(s)})</button>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Phone</th><th>Type</th><th>City</th><th>Message / Details</th><th>Source</th><th>Status</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td><a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a></td>
                  <td><Badge value={l.lead_type || 'construction'} map={LEAD_TYPE_LABELS} /></td>
                  <td className="text-muted">{l.city}{l.locality ? `, ${l.locality}` : ''}</td>
                  <td className="text-muted" style={{ maxWidth: '200px', fontSize: '12px' }}>{l.message ? <span title={l.message}>{l.message.length > 60 ? l.message.slice(0, 60) + '…' : l.message}</span> : l.plot_area_sqft ? `${l.plot_area_sqft} sqft · ${l.floors || ''}` : '—'}</td>
                  <td><span style={{ fontSize: '11px', color: '#64748b' }}>{l.source_page || l.source || '—'}</span></td>
                  <td>
                    <select className="input" style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }} value={l.status} onChange={e => {
                      const newStatus = e.target.value;
                      update(l.id, { status: newStatus });
                      logActivity(l.id, {
                        activity_type: 'status_change',
                        title: 'Lead Status Changed',
                        description: `Status updated to ${newStatus}`
                      });
                    }}>{STATUS_PIPELINE.map(s => <option key={s}>{s}</option>)}</select>
                  </td>
                  <td className="text-muted" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{new Date(l.created_at).toLocaleDateString('en-IN')}</td>
                  <td><button onClick={() => setSelected(l)} className="btn btn-ghost btn-sm">View</button></td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={9}><div className="empty-state"><div className="empty-icon">🎯</div><p>No leads found</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="card" style={{ maxWidth: '580px', width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0 }}>{selected.name}</h3>
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Badge value={selected.lead_type || 'construction'} map={LEAD_TYPE_LABELS} />
                  <Badge value={selected.status || 'new'} map={Object.fromEntries(STATUS_PIPELINE.map(s => [s, { label: s, ...STATUS_COLORS[s] }]))} />
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="btn btn-ghost btn-sm">✕ Close</button>
            </div>
            
            {selected.phone && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', width: '100%', textTransform: 'uppercase', marginBottom: '4px' }}>WhatsApp Quick Actions</span>
                <button className="btn btn-sm" style={{ background: '#22c55e', color: 'white', borderColor: '#16a34a' }} onClick={() => setWaModal({ open: true, lead: selected, phone: selected.phone, message: '', selectedTemplateId: '' })}>💬 Send Status Update</button>
                <button className="btn btn-sm" style={{ background: 'white', color: '#15803d', borderColor: '#bbf7d0' }} onClick={() => setWaModal({ open: true, lead: selected, phone: selected.phone, message: `Hi ${selected.name.split(' ')[0]}, this is Buildogram. Could you please share the pending documents regarding your request so we can proceed further?` })}>📄 Request Docs</button>
                <button className="btn btn-sm" style={{ background: 'white', color: '#15803d', borderColor: '#bbf7d0' }} onClick={() => setWaModal({ open: true, lead: selected, phone: selected.phone, message: `Hi ${selected.name.split(' ')[0]}, this is Buildogram. We have updated your proposal/quote. Please check your email or portal for details.` })}>📊 Proposal Shared</button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {[ ['Phone', selected.phone], ['Email', selected.email || '—'], ['City', selected.city], ['Locality', selected.locality || '—'], ['Source Page', selected.source_page || selected.source || '—'], ['Follow-up', selected.follow_up_date ? new Date(selected.follow_up_date).toLocaleDateString('en-IN') : '—'] ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 12px', background: 'var(--bg-muted, #f8fafc)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{v}</div>
                </div>
              ))}
            </div>
            {selected.message && <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '3px solid #0891b2' }}><div style={{ fontSize: '10px', fontWeight: 700, color: '#0c4a6e', textTransform: 'uppercase', marginBottom: '6px' }}>Message</div><p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{selected.message}</p></div>}
            
            {selected.metadata?.verification_status === 'verified' && selected.metadata?.public_status === 'published' && (
              <div style={{ marginTop: '12px', padding: '8px', background: '#f0fdf4', borderRadius: '6px', fontSize: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                🌟 <a href={`/partners/${selected.id}`} target="_blank" rel="noreferrer" style={{ color: '#059669', fontWeight: 700 }}>View Public Partner Profile ↗</a>
              </div>
            )}

            {/* Partner Assignment Block */}
            {selected.lead_type !== 'partner_application' && user && roleCan(user.role, 'manage_partners') && (
              <div style={{ marginBottom: '16px', padding: '16px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fde68a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>🎯 Assign Lead to Partner</div>
                </div>
                
                <div className="grid-2" style={{ gap: '12px', alignItems: 'end' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '4px' }}>Select Verified Partner</label>
                    <select className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fcd34d' }}
                      value={selected.metadata?.assigned_partner_lead_id || ''}
                      onChange={e => {
                        const partnerId = e.target.value;
                        if (!partnerId) {
                          update(selected.id, { 
                            metadata: { 
                              ...selected.metadata, 
                              assigned_partner_lead_id: null,
                              assigned_partner_user_id: null,
                              partner_assignment_status: 'not_assigned'
                            } 
                          });
                          logActivity(selected.id, { activity_type: 'system', title: 'Partner Unassigned', description: 'Lead assignment was removed.' });
                          return;
                        }
                        const partner = leads.find(l => l.id === partnerId);
                        update(selected.id, { 
                          metadata: { 
                            ...selected.metadata, 
                            assigned_partner_lead_id: partnerId,
                            assigned_partner_user_id: partner?.metadata?.partner_user_id || null,
                            partner_assignment_status: 'assigned',
                            partner_assignment_created_at: new Date().toISOString()
                          } 
                        });
                        logActivity(selected.id, { activity_type: 'system', title: 'Partner Assigned', description: `Assigned to ${partner.name}` });
                      }}
                    >
                      <option value="">-- No Partner Assigned --</option>
                      {leads.filter(l => l.lead_type === 'partner_application' && l.metadata?.verification_status === 'verified').map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.city})</option>
                      ))}
                    </select>
                  </div>
                  
                  {selected.metadata?.assigned_partner_lead_id && (
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '4px' }}>Partner Response Status</label>
                      <div style={{ display: 'flex', alignItems: 'center', height: '31px', padding: '0 10px', background: 'white', border: '1px solid #fcd34d', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#b45309', textTransform: 'capitalize' }}>
                        {selected.metadata?.partner_assignment_status || 'assigned'}
                      </div>
                    </div>
                  )}
                </div>

                {selected.metadata?.assigned_partner_lead_id && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', display: 'block', marginBottom: '4px' }}>Internal Assignment Notes (Not visible to partner)</label>
                    <textarea 
                      className="input" 
                      rows={2} 
                      style={{ fontSize: '12px', background: 'white', borderColor: '#fcd34d' }}
                      defaultValue={selected.metadata?.partner_assignment_notes || ''}
                      onBlur={e => {
                        if (e.target.value !== selected.metadata?.partner_assignment_notes) {
                          update(selected.id, { metadata: { ...selected.metadata, partner_assignment_notes: e.target.value } });
                        }
                      }}
                    />
                    
                    {selected.metadata?.partner_response_note && (
                      <div style={{ marginTop: '12px', padding: '8px', background: '#fef3c7', borderRadius: '4px', borderLeft: '3px solid #d97706' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#92400e', textTransform: 'uppercase', marginBottom: '4px' }}>Partner's Note:</div>
                        <div style={{ fontSize: '12px', color: '#78350f' }}>{selected.metadata.partner_response_note}</div>
                      </div>
                    )}
                    
                    <div style={{ marginTop: '8px', textAlign: 'right' }}>
                      <a href={`/partners/${selected.metadata.assigned_partner_lead_id}`} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#d97706', fontWeight: 700, textDecoration: 'none' }}>
                        View Partner Profile ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Referral / Partner Source Block */}
            <div style={{ marginBottom: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>🤝 Referral Source</div>
                {selected.metadata?.public_referral_code && !selected.metadata?.referral_partner_lead_id && (
                  <span className="badge badge-yellow" style={{ fontSize: '10px' }}>Public Code: {selected.metadata.public_referral_code}</span>
                )}
              </div>
              
              <div className="grid-2" style={{ gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Assign Partner</label>
                  <select className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white' }}
                    value={selected.metadata?.referral_partner_lead_id || ''}
                    onChange={e => {
                      const partnerId = e.target.value;
                      const partner = leads.find(l => l.id === partnerId);
                      update(selected.id, { 
                        metadata: { 
                          ...selected.metadata, 
                          referral_partner_lead_id: partnerId,
                          referral_partner_user_id: partner?.metadata?.partner_user_id || null,
                          referral_status: selected.metadata?.referral_status || 'pending'
                        } 
                      });
                    }}
                  >
                    <option value="">-- No Partner Assigned --</option>
                    {leads.filter(l => l.lead_type === 'partner_application' && l.metadata?.verification_status === 'verified').map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.metadata?.partner_category || 'Partner'})</option>
                    ))}
                  </select>
                </div>
                
                {selected.metadata?.referral_partner_lead_id && (
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Referral Status</label>
                    <select className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white' }}
                      value={selected.metadata?.referral_status || 'pending'}
                      onChange={e => update(selected.id, { metadata: { ...selected.metadata, referral_status: e.target.value } })}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="converted">Converted (Won)</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                )}
              </div>
              
              {selected.metadata?.referral_partner_lead_id && (
                <div className="grid-2" style={{ gap: '12px', marginTop: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Expected Comm. (₹)</label>
                    <input type="number" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white' }}
                      defaultValue={selected.metadata?.referral_commission_expected || ''}
                      onBlur={e => {
                        const val = e.target.value;
                        if (val !== String(selected.metadata?.referral_commission_expected)) {
                          update(selected.id, { metadata: { ...selected.metadata, referral_commission_expected: Number(val) } });
                        }
                      }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Paid Comm. (₹)</label>
                    <input type="number" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white' }}
                      defaultValue={selected.metadata?.referral_commission_paid || ''}
                      onBlur={e => {
                        const val = e.target.value;
                        if (val !== String(selected.metadata?.referral_commission_paid)) {
                          update(selected.id, { metadata: { ...selected.metadata, referral_commission_paid: Number(val) } });
                        }
                      }} />
                  </div>
                </div>
              )}
            </div>

            {/* Material Quote Metadata */}
            {selected.lead_type === 'material_quote' && selected.metadata && (
              <div style={{ marginBottom: '16px', padding: '16px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginBottom: '12px' }}>Material Requirements</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {[
                    ['Materials', selected.metadata.materials_required],
                    ['Est. Volume', selected.metadata.estimated_volume],
                    ['Location', selected.metadata.delivery_location],
                    ['Timeline', selected.metadata.delivery_timeline],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}>
                      <span style={{ fontSize: '11px', color: '#0284c7', display: 'block' }}>{k}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0c4a6e' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Ops Controls for Material Quote */}
                <div style={{ borderTop: '1px solid #bae6fd', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#0369a1', display: 'block', marginBottom: '4px' }}>Estimated Order Value (₹)</label>
                    <input type="number" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#bae6fd' }}
                      defaultValue={selected.metadata.estimated_order_value || ''}
                      onBlur={e => {
                        const val = e.target.value;
                        if (val !== String(selected.metadata.estimated_order_value)) {
                          update(selected.id, { metadata: { ...selected.metadata, estimated_order_value: Number(val) } });
                        }
                      }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#0369a1', display: 'block', marginBottom: '4px' }}>Expected Commission (₹)</label>
                    <input type="number" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#bae6fd' }}
                      defaultValue={selected.metadata.expected_commission || ''}
                      onBlur={e => {
                        const val = e.target.value;
                        if (val !== String(selected.metadata.expected_commission)) {
                          update(selected.id, { metadata: { ...selected.metadata, expected_commission: Number(val) } });
                        }
                      }} />
                  </div>
                  
                  <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                    <button className="btn btn-sm" style={{ background: '#0284c7', color: 'white', fontSize: '11px' }} onClick={() => {
                      setRevModal({
                        open: true,
                        data: {
                          source_type: 'material_quote',
                          source_id: selected.id,
                          revenue_category: 'material_commission',
                          customer_name: selected.name,
                          amount_expected: selected.metadata.estimated_order_value || 0,
                          commission_expected: selected.metadata.expected_commission || 0,
                          title: `Material commission - ${selected.name} / ${selected.metadata.materials_required?.split(',')[0] || 'Bulk'}`
                        }
                      });
                    }}>
                      💰 Create Revenue Record
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Maintenance Request Metadata */}
            {selected.lead_type === 'maintenance' && selected.metadata && (
              <div style={{ marginBottom: '16px', padding: '16px', background: '#fff7ed', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', marginBottom: '12px' }}>Maintenance Details</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {[
                    ['Location', selected.metadata.property_location],
                    ['Category', selected.metadata.issue_category],
                    ['Urgency', selected.metadata.urgency],
                    ['Pref. Visit', selected.metadata.preferred_visit_time],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}>
                      <span style={{ fontSize: '11px', color: '#ea580c', display: 'block' }}>{k}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#9a3412', textTransform: k === 'Category' || k === 'Urgency' ? 'capitalize' : 'none' }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* Ops Controls for Maintenance */}
                <div style={{ borderTop: '1px solid #fed7aa', paddingTop: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#c2410c', textTransform: 'uppercase', marginBottom: '10px' }}>Ops & Passport Linking</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ea580c', display: 'block', marginBottom: '4px' }}>Maintenance Status</label>
                      <select className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fed7aa' }}
                        value={selected.metadata.maintenance_status || 'requested'}
                        onChange={e => {
                          const val = e.target.value;
                          update(selected.id, { metadata: { ...selected.metadata, maintenance_status: val } });
                          setSelected(p => ({ ...p, metadata: { ...p.metadata, maintenance_status: val } }));
                          logActivity(selected.id, { activity_type: 'status_change', title: 'Maintenance Status Changed', description: `Status updated to ${val}` });
                        }}>
                        <option value="requested">Requested</option>
                        <option value="inspection_scheduled">Inspection Scheduled</option>
                        <option value="quoted">Quoted</option>
                        <option value="approved">Approved</option>
                        <option value="work_started">Work Started</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed / Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ea580c', display: 'block', marginBottom: '4px' }}>Assigned Vendor</label>
                      <input type="text" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fed7aa' }}
                        placeholder="Vendor name or ID..."
                        defaultValue={selected.metadata.assigned_vendor || ''}
                        onBlur={e => {
                          const val = e.target.value;
                          if (val !== selected.metadata.assigned_vendor) {
                            update(selected.id, { metadata: { ...selected.metadata, assigned_vendor: val } });
                          }
                        }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ea580c', display: 'block', marginBottom: '4px' }}>Estimated Cost (₹)</label>
                      <input type="number" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fed7aa' }}
                        defaultValue={selected.metadata.estimated_cost || ''}
                        onBlur={e => {
                          const val = e.target.value;
                          if (val !== String(selected.metadata.estimated_cost)) {
                            update(selected.id, { metadata: { ...selected.metadata, estimated_cost: Number(val) } });
                          }
                        }} />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ea580c', display: 'block', marginBottom: '4px' }}>Final Cost (₹)</label>
                      <input type="number" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fed7aa' }}
                        defaultValue={selected.metadata.final_cost || ''}
                        onBlur={e => {
                          const val = e.target.value;
                          if (val !== String(selected.metadata.final_cost)) {
                            update(selected.id, { metadata: { ...selected.metadata, final_cost: Number(val) } });
                          }
                        }} />
                    </div>

                    <div style={{ gridColumn: '1 / -1', marginTop: '4px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#ea580c', display: 'block', marginBottom: '4px' }}>Link to Property Passport</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                          <input type="text" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fed7aa', width: '100%' }}
                            placeholder="Type owner name, phone, or title to search..."
                            onChange={async e => {
                              const val = e.target.value.trim();
                              if (val.length < 3) {
                                document.getElementById('prop-search-results').style.display = 'none';
                                return;
                              }
                              const res = await fetch(`/api/properties?search=${encodeURIComponent(val)}`);
                              const d = await res.json();
                              const resContainer = document.getElementById('prop-search-results');
                              if (d.success && d.properties.length > 0) {
                                resContainer.innerHTML = '';
                                d.properties.slice(0, 5).forEach(p => {
                                  const div = document.createElement('div');
                                  div.style.padding = '8px 12px';
                                  div.style.borderBottom = '1px solid #f1f5f9';
                                  div.style.cursor = 'pointer';
                                  div.style.fontSize = '12px';
                                  div.innerHTML = `<strong>${p.title}</strong><br/><span style="color:#64748b">${p.owner_name} · ${p.city}</span>`;
                                  div.onclick = () => {
                                    update(selected.id, { property_id: p.id });
                                    setSelected(prev => ({ ...prev, property_id: p.id }));
                                    resContainer.style.display = 'none';
                                    e.target.value = '';
                                  };
                                  resContainer.appendChild(div);
                                });
                                resContainer.style.display = 'block';
                              } else {
                                resContainer.innerHTML = '<div style="padding: 8px 12px; color: #64748b; font-size: 12px;">No properties found.</div>';
                                resContainer.style.display = 'block';
                              }
                            }} />
                          <div id="prop-search-results" style={{ display: 'none', position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', marginTop: '4px', zIndex: 10, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}></div>
                        </div>
                      </div>
                      
                      {selected.property_id ? (
                        <div style={{ marginTop: '8px', padding: '8px 12px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#065f46', fontWeight: 600 }}>✅ Linked to Property Passport</span>
                          <button onClick={() => {
                              update(selected.id, { property_id: null });
                              setSelected(prev => ({ ...prev, property_id: null }));
                            }} className="btn btn-ghost btn-sm" style={{ padding: '2px 6px', color: '#dc2626' }}>Unlink</button>
                        </div>
                      ) : (
                        <p style={{ fontSize: '10px', color: '#c2410c', marginTop: '4px' }}>
                          Linking a Property ID allows this maintenance record to appear in the client's Property Passport.
                        </p>
                      )}
                    </div>
                    
                    <div style={{ gridColumn: '1 / -1', marginTop: '12px' }}>
                      <button className="btn btn-sm" style={{ background: '#c2410c', color: 'white', fontSize: '11px' }} onClick={() => {
                        setRevModal({
                          open: true,
                          data: {
                            source_type: 'maintenance',
                            source_id: selected.id,
                            revenue_category: 'maintenance',
                            customer_name: selected.name,
                            amount_expected: selected.metadata.final_cost || selected.metadata.estimated_cost || 0,
                            commission_expected: 0,
                            title: `Maintenance service - ${selected.metadata.issue_category || 'General'}`
                          }
                        });
                      }}>
                        💰 Create Revenue Record
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* AI Cost Estimator Metadata */}
            {selected.lead_type === 'construction' && selected.metadata && selected.metadata.ai_request_id && (
              <div style={{ marginBottom: '16px', padding: '16px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>AI Estimator Details</div>
                  <div style={{ fontSize: '10px', background: 'white', border: '1px solid #86efac', color: '#15803d', padding: '2px 6px', borderRadius: '4px' }}>
                    Req ID: {selected.metadata.ai_request_id.split('-')[0]}...
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#15803d', display: 'block' }}>Spec Level</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#14532d', textTransform: 'capitalize' }}>{selected.metadata.specification_level || 'Standard'}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#15803d', display: 'block' }}>Total Area Computed</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#14532d' }}>{selected.metadata.built_up_area} sq.ft</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#15803d', display: 'block' }}>Estimated Range (Low)</span>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#166534' }}>
                      ₹{(selected.metadata.estimated_min || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#15803d', display: 'block' }}>Estimated Range (High)</span>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#166534' }}>
                      ₹{(selected.metadata.estimated_max || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {selected.metadata.estimator_inputs && (
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', color: '#15803d', display: 'block', marginBottom: '4px' }}>Raw Inputs JSON (Ops View Only)</span>
                    <pre style={{ margin: 0, padding: '8px', background: 'rgba(255,255,255,0.7)', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '10px', color: '#14532d', maxHeight: '100px', overflowY: 'auto' }}>
                      {JSON.stringify(selected.metadata.estimator_inputs, null, 2)}
                    </pre>
                  </div>
                )}

                <div style={{ padding: '8px', background: '#dcfce7', borderRadius: '4px', fontSize: '10px', color: '#166534', fontStyle: 'italic', marginBottom: '16px' }}>
                  <strong>Disclaimer shown to user:</strong> "This is an approximate educational estimate... A detailed BOQ is required."
                </div>

                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #bbf7d0', paddingTop: '16px' }}>
                  <button className="btn btn-sm" style={{ background: '#166534', color: 'white', width: '100%' }} onClick={() => {
                    logActivity(selected.id, { activity_type: 'follow_up', title: 'Invited for BOQ Consultation', description: 'User asked to book engineering consultation.' });
                  }}>
                    📅 Book BOQ Consultation
                  </button>
                </div>
              </div>
            )}

            {/* BOQ Audit Draft Metadata */}
            {selected.lead_type === 'boq_audit' && selected.metadata && (
              <div style={{ marginBottom: '16px', padding: '16px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase' }}>BOQ Audit Submission</div>
                  {selected.metadata.client_user_id && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '10px', background: 'white', color: '#6d28d9', border: '1px solid #ddd6fe', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        👤 Linked to Client Portal
                      </span>
                      {selected.metadata.reviewed_boq_report?.status === 'ready_to_share' ? (
                        <>
                          <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 600 }}>👁️ Visible in Client Portal</span>
                          <button className="btn btn-sm" style={{ background: 'white', color: '#4f46e5', border: '1px solid #c7d2fe', marginTop: '4px', fontSize: '10px', padding: '2px 6px' }} onClick={() => {
                            navigator.clipboard.writeText(window.location.origin + '/client/requests/' + selected.id);
                            showToast('Client Portal Link Copied!');
                          }}>🔗 Copy Portal Link</button>
                        </>
                      ) : (
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>🙈 Report Hidden from Client</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {[
                    ['Project Type', selected.metadata.project_type],
                    ['Quoted Amount', selected.metadata.quoted_amount ? `₹${Number(selected.metadata.quoted_amount).toLocaleString('en-IN')}` : 'Not provided'],
                    ['Built-up Area', selected.metadata.built_up_area ? `${selected.metadata.built_up_area} sqft` : ''],
                    ['Floors', selected.metadata.floors],
                    ['Has Drawings', selected.metadata.has_drawings]
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}>
                      <span style={{ fontSize: '11px', color: '#7c3aed', display: 'block' }}>{k}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#4c1d95', textTransform: 'capitalize' }}>{v}</span>
                    </div>
                  ))}

                  {selected.metadata.boq_file_url && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#7c3aed', display: 'block', marginBottom: '4px' }}>Uploaded File</span>
                      <a href={selected.metadata.boq_file_url} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: 'white', color: '#6d28d9', border: '1px solid #ddd6fe' }}>
                        📄 View BOQ Document ↗
                      </a>
                    </div>
                  )}

                  {selected.metadata.customer_concern && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#7c3aed', display: 'block', marginBottom: '4px' }}>Customer Concern</span>
                      <p style={{ margin: 0, fontSize: '13px', color: '#4c1d95', background: 'white', padding: '8px', borderRadius: '4px', border: '1px solid #ede9fe' }}>
                        "{selected.metadata.customer_concern}"
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid #ddd6fe', paddingTop: '16px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#4c1d95' }}>🤖 AI Review Draft</div>
                    {selected.metadata.boq_review_status && (
                      <span style={{ fontSize: '10px', background: selected.metadata.boq_review_status === 'reviewed' ? '#dcfce7' : '#fef08a', color: selected.metadata.boq_review_status === 'reviewed' ? '#166534' : '#854d0e', padding: '2px 8px', borderRadius: '99px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {selected.metadata.boq_review_status.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  {!selected.metadata.ai_draft_request_id ? (
                    <button className="btn btn-primary" style={{ background: '#7c3aed', width: '100%' }} onClick={handleGenerateBOQDraft}>
                      ✨ Generate Internal BOQ Review Draft
                    </button>
                  ) : (
                    <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                      {selected.metadata.latest_draft ? (
                        <>
                          {selected.metadata.latest_draft.provider_used && (
                            <div className="mb-4">
                              <span style={{ fontSize: '10px', background: selected.metadata.latest_draft.fallback_used ? '#f1f5f9' : '#e0e7ff', color: selected.metadata.latest_draft.fallback_used ? '#475569' : '#3730a3', padding: '2px 8px', borderRadius: '99px', fontWeight: 700 }}>
                                {selected.metadata.latest_draft.fallback_used ? '⚙️ Deterministic Fallback' : '🤖 Generated via ' + selected.metadata.latest_draft.provider_used}
                              </span>
                            </div>
                          )}
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4c1d95', marginBottom: '8px' }}>Missing Items Identified:</div>
                          <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0', fontSize: '12px', color: '#475569' }}>
                            {(selected.metadata.latest_draft.missing_or_unclear_items || selected.metadata.latest_draft.missing_items)?.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>

                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4c1d95', marginBottom: '8px' }}>Escalation Risks:</div>
                          <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0', fontSize: '12px', color: '#475569' }}>
                            {(selected.metadata.latest_draft.cost_escalation_risks || selected.metadata.latest_draft.escalation_risks)?.map((risk, i) => <li key={i}>{risk}</li>)}
                          </ul>

                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4c1d95', marginBottom: '8px' }}>Questions for Contractor:</div>
                          <ul style={{ paddingLeft: '20px', margin: '0 0 16px 0', fontSize: '12px', color: '#475569' }}>
                            {(selected.metadata.latest_draft.questions_to_ask_contractor || selected.metadata.latest_draft.questions_for_contractor)?.map((q, i) => <li key={i}>{q}</li>)}
                          </ul>

                          <div style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic', padding: '8px', background: '#f8fafc', borderRadius: '4px', marginBottom: '16px' }}>
                            <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setShowWaPreview(true)}>
                              👁️ Open Live Preview & Direct Send
                            </button>
                            <button className="btn btn-primary" style={{ width: '100%', background: '#f59e0b', color: 'white', border: 'none', marginTop: '8px' }} onClick={async () => {
                              try {
                                const res = await fetch('/api/ops/notification-queue/draft', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ event_type: 'new_lead_created', lead_id: selected.id })
                                });
                                const d = await res.json();
                                if (d.success) showToast('Draft added to Queue (Pending Review)!');
                                else alert('Draft generation failed: ' + d.error);
                              } catch(e) { console.error(e); }
                            }}>
                              ⏳ Queue Rule Draft (e.g. New Lead Alert)
                            </button>
                            <br/><br/>
                            <strong>Disclaimer:</strong> {selected.metadata.latest_draft.disclaimer}
                          </div>

                          {selected.metadata.boq_review_status !== 'reviewed' && !selected.metadata.reviewed_boq_report && (
                            <button className="btn btn-sm" style={{ background: '#16a34a', color: 'white', width: '100%', marginBottom: '8px' }} onClick={markBOQReviewed}>
                              ✅ Mark AI Draft as Reviewed (No Output)
                            </button>
                          )}

                          {(!selected.metadata.reviewed_boq_report || selected.metadata.reviewed_boq_report.status === 'draft') && (
                            <button className="btn btn-sm" style={{ background: '#7c3aed', color: 'white', width: '100%' }} onClick={handleCreateReportFromDraft}>
                              ✍️ {selected.metadata.reviewed_boq_report ? 'Edit Reviewed Report' : 'Create Reviewed Report From Draft'}
                            </button>
                          )}
                        </>
                      ) : (
                        <div style={{ fontSize: '12px', color: '#64748b', textAlign: 'center' }}>Draft data missing. Please check AI logs.</div>
                      )}
                    </div>
                  )}

                  {/* Reviewed Report Editor / Preview */}
                  {reportMode ? (
                    <div style={{ marginTop: '16px', background: 'white', padding: '16px', borderRadius: '8px', border: '2px solid #7c3aed' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#4c1d95', marginBottom: '12px' }}>Edit Reviewed BOQ Report (Internal)</div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', display: 'block', marginBottom: '4px' }}>Executive Summary *</label>
                          <textarea className="input" rows={2} value={reportForm.executive_summary} onChange={e => setReportForm({ ...reportForm, executive_summary: e.target.value })} style={{ fontSize: '12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', display: 'block', marginBottom: '4px' }}>Missing or Unclear Items</label>
                          <textarea className="input" rows={3} value={reportForm.missing_or_unclear_items} onChange={e => setReportForm({ ...reportForm, missing_or_unclear_items: e.target.value })} style={{ fontSize: '12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', display: 'block', marginBottom: '4px' }}>Escalation & Cost Risks</label>
                          <textarea className="input" rows={3} value={reportForm.escalation_risks} onChange={e => setReportForm({ ...reportForm, escalation_risks: e.target.value })} style={{ fontSize: '12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', display: 'block', marginBottom: '4px' }}>Questions for Contractor</label>
                          <textarea className="input" rows={3} value={reportForm.questions_to_ask_contractor} onChange={e => setReportForm({ ...reportForm, questions_to_ask_contractor: e.target.value })} style={{ fontSize: '12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', display: 'block', marginBottom: '4px' }}>Buildogram Recommendation *</label>
                          <textarea className="input" rows={2} value={reportForm.buildogram_recommendation} onChange={e => setReportForm({ ...reportForm, buildogram_recommendation: e.target.value })} style={{ fontSize: '12px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#c2410c', display: 'block', marginBottom: '4px' }}>Disclaimer (Mandatory) *</label>
                          <textarea className="input" rows={3} value={reportForm.disclaimer} onChange={e => setReportForm({ ...reportForm, disclaimer: e.target.value })} style={{ fontSize: '11px', background: '#fff7ed', borderColor: '#fdba74' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <button className="btn btn-ghost" onClick={() => setReportMode(false)}>Cancel</button>
                          <button className="btn btn-primary" style={{ flex: 1, background: '#4c1d95' }} onClick={() => handleSaveReport('draft')}>💾 Save Draft</button>
                          <button className="btn btn-primary" style={{ flex: 1, background: '#16a34a' }} onClick={() => handleSaveReport('ready_to_share')}>✅ Mark Ready to Share</button>
                        </div>
                      </div>
                    </div>
                  ) : selected.metadata.reviewed_boq_report && (
                    <div style={{ marginTop: '16px', background: 'white', padding: '16px', borderRadius: '8px', border: selected.metadata.reviewed_boq_report.status === 'ready_to_share' ? '2px solid #22c55e' : '1px solid #ddd6fe' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#4c1d95' }}>📄 Reviewed BOQ Report</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ fontSize: '10px', background: selected.metadata.reviewed_boq_report.status === 'ready_to_share' ? '#dcfce7' : '#fef08a', color: selected.metadata.reviewed_boq_report.status === 'ready_to_share' ? '#166534' : '#854d0e', padding: '2px 8px', borderRadius: '99px', fontWeight: 700, textTransform: 'uppercase' }}>
                            {selected.metadata.reviewed_boq_report.status.replace(/_/g, ' ')}
                          </span>
                          <button className="btn btn-ghost btn-sm" style={{ padding: '0 4px', color: '#7c3aed' }} onClick={() => {
                            setReportForm(selected.metadata.reviewed_boq_report);
                            setReportMode(true);
                          }}>✏️ Edit</button>
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div><strong>Executive Summary:</strong><br/>{selected.metadata.reviewed_boq_report.executive_summary}</div>
                        {selected.metadata.reviewed_boq_report.missing_or_unclear_items && (
                          <div><strong>Missing Items:</strong><pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{selected.metadata.reviewed_boq_report.missing_or_unclear_items}</pre></div>
                        )}
                        {selected.metadata.reviewed_boq_report.escalation_risks && (
                          <div><strong>Escalation Risks:</strong><pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{selected.metadata.reviewed_boq_report.escalation_risks}</pre></div>
                        )}
                        {selected.metadata.reviewed_boq_report.questions_to_ask_contractor && (
                          <div><strong>Questions for Contractor:</strong><pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{selected.metadata.reviewed_boq_report.questions_to_ask_contractor}</pre></div>
                        )}
                        <div><strong>Buildogram Recommendation:</strong><br/>{selected.metadata.reviewed_boq_report.buildogram_recommendation}</div>
                        <div style={{ background: '#f8fafc', padding: '8px', fontSize: '10px', fontStyle: 'italic', borderRadius: '4px', color: '#64748b' }}>
                          {selected.metadata.reviewed_boq_report.disclaimer}
                        </div>
                      </div>

                      {selected.metadata.reviewed_boq_report.status === 'ready_to_share' && (
                        <div style={{ marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', gap: '8px' }}>
                          <button className="btn btn-sm" style={{ background: '#2563eb', color: 'white', flex: 1 }} onClick={() => {
                            const r = selected.metadata.reviewed_boq_report;
                            const text = `*Buildogram BOQ Audit Report*\n\n*Summary:*\n${r.executive_summary}\n\n*Missing/Unclear Items:*\n${r.missing_or_unclear_items}\n\n*Risks:*\n${r.escalation_risks}\n\n*Recommendation:*\n${r.buildogram_recommendation}\n\n_Disclaimer: ${r.disclaimer}_`;
                            navigator.clipboard.writeText(text);
                            showToast('Report copied to clipboard!');
                          }}>
                            📋 Copy Report Text
                          </button>
                          <a href={`/boq-report/${selected.id}/print`} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: '#4f46e5', color: 'white', flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                            🖨️ Print / Save PDF
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Property Inquiry Metadata */}
            {selected.lead_type === 'property_inquiry' && selected.metadata && (
              <div style={{ marginBottom: '16px', padding: '16px', background: '#fdf2f8', borderRadius: '8px', border: '1px solid #fbcfe8' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#be185d', textTransform: 'uppercase', marginBottom: '12px' }}>Inquiry Details</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {[
                    ['Inquiry Type', selected.metadata.inquiry_type],
                    ['Property Location', selected.metadata.property_location],
                    ['Listing Type', selected.metadata.listing_type],
                    ['Pref. Visit Time', selected.metadata.preferred_visit_time],
                    ['Expected Price', selected.metadata.expected_price_or_rent ? `₹${Number(selected.metadata.expected_price_or_rent).toLocaleString('en-IN')}` : '—']
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}>
                      <span style={{ fontSize: '11px', color: '#db2777', display: 'block' }}>{k}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#831843', textTransform: 'capitalize' }}>{v}</span>
                    </div>
                  ))}
                  
                  {selected.metadata.source_listing_lead_id && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#db2777', display: 'block', marginBottom: '4px' }}>Source Listing</span>
                      <a href={`/properties/listing/${selected.metadata.source_listing_lead_id}`} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ background: 'white', color: '#db2777', border: '1px solid #fbcfe8' }}>
                        View Public Listing ↗
                      </a>
                    </div>
                  )}
                </div>

                {/* Ops Controls for Inquiry */}
                <div className="grid-2" style={{ gap: '12px', marginTop: '16px', borderTop: '1px solid #fbcfe8', paddingTop: '16px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#db2777', display: 'block', marginBottom: '4px' }}>Inquiry Status</label>
                    <select className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fbcfe8' }}
                      value={selected.metadata.inquiry_status || 'new'}
                      onChange={e => {
                        const val = e.target.value;
                        update(selected.id, { metadata: { ...selected.metadata, inquiry_status: val } });
                        setSelected(p => ({ ...p, metadata: { ...p.metadata, inquiry_status: val } }));
                        logActivity(selected.id, { activity_type: 'status_change', title: 'Inquiry Status Changed', description: `Status updated to ${val}` });
                      }}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="visit_scheduled">Visit Scheduled</option>
                      <option value="visited">Visited</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#db2777', display: 'block', marginBottom: '4px' }}>Scheduled Visit Date</label>
                    <input type="date" className="input" style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', borderColor: '#fbcfe8' }}
                      defaultValue={selected.metadata.visit_scheduled_at || ''}
                      onBlur={e => update(selected.id, { metadata: { ...selected.metadata, visit_scheduled_at: e.target.value } })} />
                  </div>
                </div>
              </div>
            )}

            {/* ── CLIENT PORTAL LINKAGE ── */}
            <div style={{ marginTop: '24px', borderTop: '2px solid #e2e8f0', paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>👤</span> Client Portal Access
                </h3>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Linked Client User ID</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    className="input" 
                    style={{ margin: 0, padding: '6px 10px', fontSize: '12px', background: 'white', flex: 1 }}
                    placeholder="Enter User ID to give portal access..."
                    defaultValue={selected.metadata?.client_user_id || ''}
                    onBlur={e => {
                      const val = e.target.value.trim();
                      if (val !== (selected.metadata?.client_user_id || '')) {
                        update(selected.id, { metadata: { ...selected.metadata, client_user_id: val || null } });
                        setSelected(p => ({ ...p, metadata: { ...p.metadata, client_user_id: val || null } }));
                      }
                    }} 
                  />
                </div>
                <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '6px' }}>
                  Assigning a user ID allows the client to view the status of this request in their "My Requests" dashboard.
                </p>
              </div>
            </div>

            {/* ── ACTIVITY TIMELINE SECTION ── */}
            <div style={{ marginTop: '24px', borderTop: '2px solid #e2e8f0', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>⏱️</span> Activity Timeline & Follow-ups
              </h3>
              
              {/* Add Activity Form */}
              <form onSubmit={handleAddActivity} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Log Type</label>
                    <select className="input" style={{ margin: 0, padding: '8px' }} value={actForm.type} onChange={e => setActForm(p => ({ ...p, type: e.target.value }))}>
                      <option value="note">✏️ Internal Note</option>
                      <option value="call">📞 Phone Call</option>
                      <option value="follow_up">📅 Set Follow-up</option>
                    </select>
                  </div>
                  {actForm.type === 'follow_up' && (
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Follow-up Date</label>
                      <input type="datetime-local" className="input" style={{ margin: 0, padding: '8px' }} required value={actForm.follow_up} onChange={e => setActForm(p => ({ ...p, follow_up: e.target.value }))} />
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Details</label>
                  <textarea className="input" rows={2} style={{ margin: 0, padding: '8px' }} required placeholder={actForm.type === 'call' ? "Summary of the call..." : "Type your note here..."} value={actForm.description} onChange={e => setActForm(p => ({ ...p, description: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={actLoading}>{actLoading ? 'Saving...' : 'Save Activity'}</button>
                </div>
              </form>

              {/* Activity List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activities.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>No activities logged yet.</div>
                ) : (
                  activities.map(a => {
                    const icons = { whatsapp: '💬', call: '📞', note: '✏️', status_change: '🔄', follow_up: '📅', system: '🤖' };
                    const icon = icons[a.activity_type] || '📝';
                    return (
                      <div key={a.id} style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                          {icon}
                        </div>
                        <div style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{a.title}</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(a.created_at).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                          {a.description && <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>{a.description}</div>}
                          {a.follow_up_at && (
                            <div style={{ marginTop: '8px', padding: '6px 10px', background: '#fffbeb', color: '#b45309', borderRadius: '6px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                              <span>⏰</span> Next action: <b>{new Date(a.follow_up_at).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</b>
                            </div>
                          )}
                          <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px', textAlign: 'right' }}>By {a.created_by_name || 'System'}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {saving && <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#64748b' }}>Saving…</div>}
          </div>
        </div>
      )}

      {waModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#166534', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ fontSize: '24px' }}>💬</span> Preview WhatsApp Message</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Template</label>
              <select className="input bg-slate-50" value={waModal.selectedTemplateId} onChange={e => {
                const tmpl = waTemplates.find(t => t.id === e.target.value);
                setWaModal(p => ({ 
                  ...p, 
                  selectedTemplateId: e.target.value,
                  message: tmpl ? renderTemplate(tmpl.message_body, waModal.lead) : ''
                }));
              }}>
                <option value="">-- Select Template --</option>
                {waTemplates.map(t => <option key={t.id} value={t.id}>{t.category}: {t.template_name}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Sending to Phone</label>
              <input type="text" className="input bg-slate-50" value={waModal.phone} onChange={e => setWaModal(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Message Content</label>
              <textarea className="input" rows={6} value={waModal.message} onChange={e => setWaModal(p => ({ ...p, message: e.target.value }))} style={{ fontSize: '14px', lineHeight: 1.5 }} />
              <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '6px', fontWeight: 600 }}>⚠️ Official WhatsApp API may require approved templates for first messages. Plain text sending is restricted by Meta.</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setWaModal({ open: false, lead: null, message: '', phone: '' })}>Cancel</button>
              
              {user && roleCan(user.role, 'send_whatsapp_message') && (
                <button className="btn" style={{ background: '#0284c7', color: 'white' }} onClick={async () => {
                  setSaving(true);
                  try {
                    const res = await fetch('/api/ops/whatsapp/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        lead_id: waModal.lead.id,
                        phone: waModal.phone,
                        message: waModal.message,
                        send_mode: 'cloud_api'
                      })
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Failed to send API message');
                    
                    showToast('WhatsApp message sent via API!', 'success');
                    setWaModal({ open: false, lead: null, message: '', phone: '' });
                    load(); // refresh timeline
                  } catch (e) {
                    showToast(e.message, 'error');
                  } finally {
                    setSaving(false);
                  }
                }}>Send via WhatsApp API ☁️</button>
              )}
              <button className="btn" style={{ background: '#22c55e', color: 'white' }} onClick={async () => { 
                const link = getWhatsAppLink(waModal.phone, waModal.message); 
                if (link) {
                  await logActivity(waModal.lead.id, { activity_type: 'whatsapp', title: 'WhatsApp message opened/prepared', description: waModal.message });
                  window.open(link, '_blank'); 
                  setWaModal({ open: false, lead: null, message: '', phone: '' }); 
                }
              }}>Open in WhatsApp ↗</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE REVENUE MODAL ── */}
      {revModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>💰 Create Expected Revenue</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>This will log an expected revenue record linked to this lead into the Finance ledger.</p>
            
            <form onSubmit={handleCreateRevenue}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Title</label>
                <input type="text" className="input" required value={revModal.data.title || ''} onChange={e => setRevModal(p => ({ ...p, data: { ...p.data, title: e.target.value } }))} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Amount Expected (₹)</label>
                  <input type="number" className="input" required value={revModal.data.amount_expected || ''} onChange={e => setRevModal(p => ({ ...p, data: { ...p.data, amount_expected: e.target.value } }))} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>Commission (₹)</label>
                  <input type="number" className="input" value={revModal.data.commission_expected || ''} onChange={e => setRevModal(p => ({ ...p, data: { ...p.data, commission_expected: e.target.value } }))} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setRevModal({ open: false, data: {} })}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={revSaving}>{revSaving ? 'Saving...' : 'Create Record'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#0f172a', color: 'white', padding: '16px 20px',
          borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex', gap: '12px', alignItems: 'flex-start',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
              {toast.type === 'error' ? 'Error ❌' : 'Success ✅'}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{toast.message}</div>
            {toast.propertyId && (
              <a href="/ops/properties" target="_blank" rel="noreferrer"
                style={{ fontSize: '12px', color: '#FFDA01', fontWeight: 700, marginTop: '6px', display: 'inline-block' }}>
                Open in Properties →
              </a>
            )}
          </div>
          <button onClick={() => setToast(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>
      )}
    </div>
  );
}
