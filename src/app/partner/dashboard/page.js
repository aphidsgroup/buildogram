'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PartnerDashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  
  const [projects, setProjects] = useState([]);
  const [logForm, setLogForm] = useState({ project_id: '', notes: '', workers_count: '', weather: '' });
  const [logMsg, setLogMsg] = useState('');
  
  // Referrals & Leads State
  const [referrals, setReferrals] = useState([]);
  const [assignedLeads, setAssignedLeads] = useState([]);

  // Profile Edit State
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()), 
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/partner/profile').then(r => r.json()),
      fetch('/api/partner/referrals').then(r => r.json())
    ]).then(([ud, pd, prd, refData]) => { 
      setUser(ud.user); 
      setProjects(pd.projects || []); 
      
      if (prd.success && prd.profile) {
        setProfile(prd.profile);
        setEditForm(prd.profile.metadata || {});
      }
      
      if (refData.success) {
        setReferrals(refData.referrals || []);
      }
      
      fetch('/api/partner/assigned-leads')
        .then(r => r.json())
        .then(ld => { if (ld.success) setAssignedLeads(ld.leads || []); });
        
      setLoading(false); 
    });
  }, []);

  const submitLog = async (e) => {
    e.preventDefault();
    await fetch('/api/progress-logs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(logForm) });
    setLogMsg('✅ Log submitted successfully!');
    setLogForm(f => ({ ...f, notes: '', workers_count: '', weather: '' }));
    setTimeout(() => setLogMsg(''), 3000);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/partner/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const d = await res.json();
      if (d.success) {
        setProfile(d.profile);
        setSaveMsg('✅ Profile updated successfully!');
      } else {
        setSaveMsg('❌ Error updating profile.');
      }
    } catch {
      setSaveMsg('❌ Network error.');
    }
    setSaving(false);
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const updateAssignment = async (leadId, newStatus, note = '') => {
    try {
      const res = await fetch(`/api/partner/assigned-leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_status: newStatus, partner_response_note: note })
      });
      const d = await res.json();
      if (d.success) {
        setAssignedLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignment_status: newStatus, partner_response_note: note } : l));
        alert(`Lead marked as ${newStatus}`);
      } else {
        alert(d.error || 'Failed to update assignment');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const statusColor = { execution: 'badge-orange', design: 'badge-blue', complete: 'badge-green', on_hold: 'badge-gray' };
  
  const setField = (k) => (e) => setEditForm(p => ({ ...p, [k]: e.target.value }));
  const label = t => <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>{t}</label>;

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      
      {/* ── HEADER ── */}
      <div style={{ background: 'var(--secondary)', color: 'white', padding: '40px 20px' }}>
        <div className="container mx-auto max-w-5xl flex-between flex-wrap gap-4">
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Partner Dashboard</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>Welcome, {user?.name}. Manage your ecosystem profile and projects.</p>
          </div>
          {profile && profile.metadata?.verification_status === 'verified' && profile.metadata?.public_status === 'published' && (
            <Link href={`/partners/${profile.id}`} target="_blank" style={{ background: '#ecfdf5', color: '#065f46', padding: '10px 20px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', border: '1px solid #a7f3d0' }}>
              🌟 View Public Profile ↗
            </Link>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-8">
        
        {/* ── ASSIGNED LEADS FROM BUILDOGRAM ── */}
        {assignedLeads.length > 0 && (
          <div className="card mb-8 p-0" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '2px solid #3b82f6' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #bfdbfe', background: '#eff6ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>🎯 Assigned Opportunities</h2>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {assignedLeads.map(lead => (
                <div key={lead.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>{lead.masked_name}</h3>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                        {lead.city} {lead.locality ? `, ${lead.locality}` : ''} • <span style={{ textTransform: 'capitalize' }}>{lead.lead_type.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`badge ${lead.assignment_status === 'accepted' || lead.assignment_status === 'contacted' ? 'badge-green' : lead.assignment_status === 'rejected' ? 'badge-red' : 'badge-yellow'}`} style={{ textTransform: 'capitalize' }}>
                        {lead.assignment_status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9', marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Customer Requirement</div>
                    <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>"{lead.requirement_summary}"</div>
                  </div>

                  {lead.ops_notes && (
                    <div style={{ background: '#fefce8', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #eab308', marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#ca8a04', textTransform: 'uppercase', marginBottom: '4px' }}>Note from Buildogram Ops</div>
                      <div style={{ fontSize: '13px', color: '#854d0e', lineHeight: 1.5 }}>{lead.ops_notes}</div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {(lead.assignment_status === 'assigned' || lead.assignment_status === 'not_assigned') && (
                      <>
                        <button className="btn btn-sm btn-primary" onClick={() => updateAssignment(lead.id, 'accepted', 'Accepted opportunity')}>✅ Accept Lead</button>
                        <button className="btn btn-sm btn-outline" onClick={() => updateAssignment(lead.id, 'rejected', 'Cannot take this project right now.')} style={{ color: '#ef4444', borderColor: '#fca5a5' }}>❌ Reject</button>
                      </>
                    )}
                    {lead.assignment_status === 'accepted' && (
                      <button className="btn btn-sm" style={{ background: '#f59e0b', color: 'white' }} onClick={() => updateAssignment(lead.id, 'contacted', 'Attempted to contact customer.')}>📞 Mark Contacted</button>
                    )}
                    {(lead.assignment_status === 'accepted' || lead.assignment_status === 'contacted') && (
                      <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', marginLeft: 'auto' }}>
                        Buildogram Ops will share customer contact details shortly.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PUBLIC PROFILE SECTION ── */}
        <div className="card mb-8 p-0" style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Public Profile Overview</h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              {profile ? (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Verification</span>
                    {profile.metadata?.verification_status === 'verified' ? <span className="badge badge-green">Verified</span> : <span className="badge badge-yellow capitalize">{profile.metadata?.verification_status || 'Pending'}</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Visibility</span>
                    {profile.metadata?.public_status === 'published' ? <span className="badge badge-green">Published</span> : <span className="badge badge-gray capitalize">{profile.metadata?.public_status || 'Draft'}</span>}
                  </div>
                </>
              ) : (
                <span className="badge badge-red">Unlinked Account</span>
              )}
            </div>
          </div>
          
          <div style={{ padding: '24px' }}>
            {!profile ? (
              <div className="text-center py-8">
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔗</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>No Profile Linked</h3>
                <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 16px' }}>Your user account has not been linked to a Buildogram Partner Application yet. If you have already applied, please contact Ops.</p>
                <Link href="/partners" className="btn btn-primary" style={{ justifyContent: 'center' }}>Apply to Network</Link>
              </div>
            ) : (
              <form onSubmit={saveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid-2" style={{ gap: '16px' }}>
                  <div>{label('Business Name')}<input className="input bg-slate-50" required value={editForm.business_name || ''} onChange={setField('business_name')} /></div>
                  <div>{label('Category')}<input className="input bg-slate-100" disabled value={editForm.partner_category || ''} /></div>
                </div>

                <div className="grid-2" style={{ gap: '16px' }}>
                  <div>{label('Service Areas')}<input className="input bg-slate-50" required value={editForm.service_areas || ''} onChange={setField('service_areas')} /></div>
                  <div>{label('Experience')}<input className="input bg-slate-100" disabled value={editForm.years_experience || ''} /></div>
                </div>

                <div>
                  {label('Services Offered (Detailed)')}
                  <textarea className="input bg-slate-50" rows={3} required value={editForm.services_offered || ''} onChange={setField('services_offered')} />
                </div>

                <div className="grid-2" style={{ gap: '16px' }}>
                  <div>{label('Website URL')}<input type="url" className="input bg-slate-50" value={editForm.website_url || ''} onChange={setField('website_url')} /></div>
                  <div>{label('Instagram Handle / URL')}<input className="input bg-slate-50" value={editForm.instagram_url || ''} onChange={setField('instagram_url')} /></div>
                </div>

                <div>{label('Portfolio / Google Drive Link')}<input type="url" className="input bg-slate-50" value={editForm.portfolio_links || ''} onChange={setField('portfolio_links')} /></div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                  {saveMsg && <span style={{ fontSize: '14px', fontWeight: 600, color: saveMsg.includes('✅') ? '#166534' : '#991b1b' }}>{saveMsg}</span>}
                  <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : '💾 Save Profile Changes'}</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── REFERRALS ── */}
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>My Referrals & Earnings</h2>
        
        <div className="card" style={{ padding: 0, overflow: 'hidden', background: 'white', marginBottom: '32px' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Track leads routed to you, or leads you referred to Buildogram.</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'white', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Customer Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Type / City</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Expected Comm.</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Paid Comm.</th>
                </tr>
              </thead>
              <tbody>
                {referrals.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-muted">No referrals tracked yet.</td></tr>}
                {referrals.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '13px', color: '#0f172a' }}>{r.masked_name}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-gray capitalize" style={{ marginBottom: '4px' }}>{r.lead_type.replace('_', ' ')}</span>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{r.city}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${r.referral_status === 'converted' ? 'bg-green-100 text-green-700' : r.referral_status === 'rejected' ? 'bg-red-100 text-red-700' : 'badge-yellow capitalize'}`}>
                        {r.referral_status || 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#166534' }}>{r.expected_commission ? `₹${Number(r.expected_commission).toLocaleString('en-IN')}` : '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#0369a1' }}>{r.paid_commission ? `₹${Number(r.paid_commission).toLocaleString('en-IN')}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <hr style={{ border: 0, borderTop: '2px dashed #e2e8f0', margin: '48px 0' }} />

        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>Execution Workflow (Contractors Only)</h2>

        {/* ── EXISTING EXECUTION WORKFLOW ── */}
        <div className="grid-2 mb-8" style={{ gap: '24px' }}>
          {/* PROJECTS */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Assigned Projects</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {projects.map(p => (
                <div key={p.id} className="card" style={{ padding: '16px 20px', background: 'white' }}>
                  <div className="flex-between mb-2">
                    <h4 style={{ fontSize: '15px' }}>{p.name}</h4>
                    <span className={`badge ${statusColor[p.status] || 'badge-gray'}`}>{p.status}</span>
                  </div>
                  <p className="text-muted text-sm">{p.city}{p.locality ? `, ${p.locality}` : ''}</p>
                  <div className="mt-3">
                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.completion_pct || 0}%` }} /></div>
                    <span className="text-xs text-muted">{p.completion_pct || 0}% complete</span>
                  </div>
                  <Link href={`/partner/logs?project=${p.id}`} className="btn btn-ghost btn-sm mt-3">Submit Log →</Link>
                </div>
              ))}
              {!projects.length && <div className="card text-center py-8" style={{ background: 'white' }}><div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.5 }}>🏗️</div><p className="text-muted text-sm">No construction projects assigned yet.</p></div>}
            </div>
          </div>

          {/* QUICK LOG */}
          <div className="card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Submit Daily Progress Log</h3>
            <form onSubmit={submitLog} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="input-group">
                <label>Project</label>
                <select className="input" required value={logForm.project_id} onChange={e => setLogForm(f => ({ ...f, project_id: e.target.value }))}>
                  <option value="">Select project...</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label>Progress Notes *</label>
                <textarea className="input" required placeholder="What work was done today? Any issues?" value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div className="grid-2">
                <div className="input-group">
                  <label>Workers on Site</label>
                  <input className="input" type="number" placeholder="0" value={logForm.workers_count} onChange={e => setLogForm(f => ({ ...f, workers_count: e.target.value }))} />
                </div>
                <div className="input-group">
                  <label>Weather</label>
                  <select className="input" value={logForm.weather} onChange={e => setLogForm(f => ({ ...f, weather: e.target.value }))}>
                    <option value="">Select...</option><option>Sunny</option><option>Cloudy</option><option>Rainy</option><option>Windy</option>
                  </select>
                </div>
              </div>
              {logMsg && <div style={{ color: 'var(--success)', fontSize: '14px' }}>{logMsg}</div>}
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>Submit Log →</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
