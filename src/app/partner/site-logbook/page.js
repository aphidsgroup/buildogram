'use client';
import { useState, useEffect } from 'react';
import { SectionHeader, Modal, FormField, EmptyState } from '../_shared/components';
import { DEMO_LOGBOOK, DEMO_PROJECTS } from '../_shared/demoData';

const BLANK = { date: new Date().toISOString().slice(0, 10), project: '', workDone: '', labourCount: '', materialsReceived: '', issues: '', tomorrowPlan: '', photoUrl: '', videoUrl: '', clientVisible: true };

function generateId() { return 'LOG' + Date.now().toString().slice(-6); }

export default function SiteLogbook() {
  const [logs, setLogs] = useState([]);
  const [projects, setProjects] = useState(DEMO_PROJECTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);

  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/partner/site-logs');
      const data = await res.json();
      if (data.success) {
        // map API response to UI shape
        const mapped = (data.logs || []).map(l => ({
          id: l.id,
          date: l.logDate,
          project: l.projectId,
          workDone: l.workCompleted,
          labourCount: l.labourCount,
          materialsReceived: l.materialsReceived,
          issues: l.issuesFaced,
          tomorrowPlan: l.tomorrowPlan,
          photoUrl: l.photoUrl,
          videoUrl: l.videoUrl,
          clientVisible: l.clientVisible
        }));
        setLogs(mapped);
        localStorage.setItem('bos_logbook', JSON.stringify(mapped));
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      console.error('API fetch failed, using fallback:', e);
      const stored = typeof window !== 'undefined' && localStorage.getItem('bos_logbook');
      if (stored) setLogs(JSON.parse(stored));
      else setLogs(DEMO_LOGBOOK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const storedP = typeof window !== 'undefined' && localStorage.getItem('bos_projects');
    if (storedP) setProjects(JSON.parse(storedP));
  }, []);

  const save = (arr) => { setLogs(arr); localStorage.setItem('bos_logbook', JSON.stringify(arr)); };

  const openAdd = () => { setForm({ ...BLANK, date: new Date().toISOString().slice(0, 10) }); setEditId(null); setModalOpen(true); };
  const openEdit = (log) => { setForm({ ...log }); setEditId(log.id); setModalOpen(true); };

  const handleSubmit = async () => {
    if (!form.workDone) return alert('Work done description is required');
    
    // Optimistic
    let optimisticArr = [];
    if (editId) {
      optimisticArr = logs.map(l => l.id === editId ? { ...form, id: editId } : l);
    } else {
      optimisticArr = [{ ...form, id: generateId(), createdAt: new Date().toISOString().slice(0, 10) }, ...logs];
    }
    save(optimisticArr);
    setModalOpen(false);

    // API save
    try {
      const url = editId && String(editId).length > 10 ? `/api/partner/site-logs/${editId}` : '/api/partner/site-logs';
      const method = editId && String(editId).length > 10 ? 'PUT' : 'POST';
      const payload = {
        projectId: form.project,
        logDate: form.date,
        workCompleted: form.workDone,
        labourCount: Number(form.labourCount) || 0,
        materialsReceived: form.materialsReceived,
        issuesFaced: form.issues,
        tomorrowPlan: form.tomorrowPlan,
        photoUrl: form.photoUrl,
        videoUrl: form.videoUrl,
        clientVisible: form.clientVisible
      };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        fetchLogs();
      }
    } catch(e) {
      console.error('API save failed', e);
    }
  };

  const deleteLog = (id) => { if (confirm('Delete this log entry?')) save(logs.filter(l => l.id !== id)); };

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const getProjectName = (id) => {
    const p = projects.find(p => p.id === id);
    return p ? p.name : id;
  };

  const sorted = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <SectionHeader icon="📓" title="Site Logbook" desc="Record daily site updates, labour count, and materials"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Add Daily Update</button>}
      />

      {/* SUMMARY ROW */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {[
          { label: 'Total Entries', value: logs.length, color: '#FC6E20' },
          { label: 'This Week', value: logs.filter(l => { const d = new Date(l.date); const now = new Date(); return (now - d) / 86400000 <= 7; }).length, color: '#10B981' },
          { label: 'Client Visible', value: logs.filter(l => l.clientVisible).length, color: '#6366F1' },
          { label: 'Issues Reported', value: logs.filter(l => l.issues && l.issues.trim() !== 'None' && l.issues.trim() !== '').length, color: '#EF4444' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '14px 20px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-dark)' }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon="📓" title="No site updates yet" desc="Add your first daily site update to start the project logbook." action={<button className="btn btn-primary" onClick={openAdd}>+ Add Update</button>} />
      ) : (
        <div style={{ position: 'relative', paddingLeft: '28px' }}>
          {/* timeline line */}
          <div style={{ position: 'absolute', left: '8px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #FC6E20, rgba(252,110,32,0.1))', borderRadius: '2px' }} />

          {sorted.map((log, idx) => (
            <div key={log.id} style={{ position: 'relative', marginBottom: '24px' }}>
              {/* dot */}
              <div style={{ position: 'absolute', left: '-24px', top: '20px', width: '14px', height: '14px', borderRadius: '50%', background: '#FC6E20', border: '3px solid white', boxShadow: '0 0 0 2px #FC6E2040' }} />

              <div className="card" style={{ padding: '22px', borderRadius: '16px' }}>
                {/* header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>
                      📅 {new Date(log.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>🏗️ {getProjectName(log.project)}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '99px', background: log.clientVisible ? 'rgba(16,185,129,0.1)' : 'rgba(100,116,139,0.1)', color: log.clientVisible ? '#10B981' : '#64748B', fontWeight: 600 }}>
                      {log.clientVisible ? '👁️ Client Visible' : '🔒 Internal'}
                    </span>
                    <button onClick={() => openEdit(log)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', fontSize: '13px' }}>✏️</button>
                    <button onClick={() => deleteLog(log.id)} style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', fontSize: '13px' }}>🗑️</button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>✅ Work Completed</div>
                    <div style={{ fontSize: '14px', lineHeight: 1.6 }}>{log.workDone}</div>
                  </div>

                  {log.issues && log.issues.trim() && log.issues !== 'None' && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>🚩 Issues Faced</div>
                      <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#EF4444' }}>{log.issues}</div>
                    </div>
                  )}

                  {log.tomorrowPlan && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>📋 Tomorrow's Plan</div>
                      <div style={{ fontSize: '14px', lineHeight: 1.6 }}>{log.tomorrowPlan}</div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '14px', flexWrap: 'wrap' }}>
                  {log.labourCount && <span style={{ fontSize: '13px', background: '#F1F5F9', padding: '4px 12px', borderRadius: '8px' }}>👷 {log.labourCount} Workers</span>}
                  {log.materialsReceived && <span style={{ fontSize: '13px', background: '#F1F5F9', padding: '4px 12px', borderRadius: '8px' }}>🧱 {log.materialsReceived}</span>}
                  {log.photoUrl && <a href={log.photoUrl} target="_blank" rel="noreferrer" style={{ fontSize: '13px', background: '#EFF6FF', color: '#3B82F6', padding: '4px 12px', borderRadius: '8px', textDecoration: 'none' }}>📸 View Photo</a>}
                  {log.videoUrl && <a href={log.videoUrl} target="_blank" rel="noreferrer" style={{ fontSize: '13px', background: '#EFF6FF', color: '#3B82F6', padding: '4px 12px', borderRadius: '8px', textDecoration: 'none' }}>🎥 View Video</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Edit Log Entry' : 'Add Daily Site Update'}
        footer={<><button className="btn" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editId ? 'Update Entry' : 'Save Update'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Date" required><input className="input" type="date" value={form.date} onChange={f('date')} /></FormField>
          <FormField label="Project">
            <select className="input" value={form.project} onChange={f('project')}>
              <option value="">Select project...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </FormField>
          <FormField label="Labour Count"><input className="input" type="number" value={form.labourCount} onChange={f('labourCount')} placeholder="No. of workers on site" /></FormField>
          <FormField label="Materials Received"><input className="input" value={form.materialsReceived} onChange={f('materialsReceived')} placeholder="e.g. Cement 50 bags, Steel 1MT" /></FormField>
        </div>
        <FormField label="Work Completed Today" required><textarea className="input" rows={3} value={form.workDone} onChange={f('workDone')} placeholder="Describe the work done today in detail..." style={{ resize: 'vertical' }} /></FormField>
        <FormField label="Issues Faced"><textarea className="input" rows={2} value={form.issues} onChange={f('issues')} placeholder="Any blockers or problems faced..." style={{ resize: 'vertical' }} /></FormField>
        <FormField label="Tomorrow's Plan"><textarea className="input" rows={2} value={form.tomorrowPlan} onChange={f('tomorrowPlan')} placeholder="Plan for the next day..." style={{ resize: 'vertical' }} /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Photo URL"><input className="input" value={form.photoUrl} onChange={f('photoUrl')} placeholder="Google Drive / Cloud link" /></FormField>
          <FormField label="Video URL"><input className="input" value={form.videoUrl} onChange={f('videoUrl')} placeholder="YouTube / Cloud link" /></FormField>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <input type="checkbox" id="clientVisible" checked={form.clientVisible} onChange={e => setForm(p => ({ ...p, clientVisible: e.target.checked }))} style={{ width: '16px', height: '16px', accentColor: '#FC6E20' }} />
          <label htmlFor="clientVisible" style={{ fontSize: '14px', cursor: 'pointer' }}>Visible to Client in Client Room</label>
        </div>
      </Modal>
    </div>
  );
}
