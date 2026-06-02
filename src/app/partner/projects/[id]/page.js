'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  StatusBadge, Modal, FormField, EmptyState
} from '../../_shared/components';
import {
  DEMO_PROJECTS, DEMO_MILESTONES, DEMO_LOGBOOK, DEMO_MATERIALS,
  DEMO_DOCUMENTS, DEMO_ISSUES, DEMO_PAYMENTS, DEMO_EXPENSES,
  MILESTONE_STATUSES, ISSUE_PRIORITIES, ISSUE_STATUSES,
  PAYMENT_STATUSES, EXPENSE_CATEGORIES, DOC_TYPES, MATERIAL_STATUSES
} from '../../_shared/demoData';

const fmt = (n) => n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + ' Cr'
  : n >= 100000 ? '₹' + (n / 100000).toFixed(1) + ' L'
  : n ? '₹' + Number(n).toLocaleString('en-IN') : '—';

const TABS = [
  { key: 'overview',   icon: '📋', label: 'Overview'    },
  { key: 'milestones', icon: '🏁', label: 'Milestones'  },
  { key: 'updates',    icon: '📓', label: 'Site Updates' },
  { key: 'materials',  icon: '🧱', label: 'Materials'   },
  { key: 'documents',  icon: '📁', label: 'Documents'   },
  { key: 'finance',    icon: '💰', label: 'Finance'     },
  { key: 'issues',     icon: '🚩', label: 'Issues'      },
];

const MILESTONE_STATUS_COLORS = {
  completed: '#10B981', in_progress: '#3B82F6', not_started: '#94A3B8',
  delayed: '#EF4444', on_hold: '#F59E0B'
};

function ProgressBar({ pct, color = '#FC6E20' }) {
  return (
    <div style={{ background: '#E2E8F0', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '6px', transition: 'width 0.4s' }} />
    </div>
  );
}

// ─── TAB: OVERVIEW ───────────────────────────────────────────────────────
function OverviewTab({ project }) {
  const fields = [
    ['Client', project.client || project.clientName || '—'],
    ['Location', project.location || '—'],
    ['Type', project.type || project.projectType || '—'],
    ['Status', project.status || '—'],
    ['Start Date', project.startDate || '—'],
    ['Target Completion', project.targetDate || project.targetCompletion || '—'],
    ['Budget', fmt(project.budget)],
    ['Current Stage', project.stage || project.currentStage || '—'],
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {fields.map(([k, v]) => (
          <div key={k} style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{k}</div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#0F172A' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 700 }}>Overall Progress</span>
          <span style={{ fontWeight: 700, color: '#FC6E20' }}>{project.progress || 0}%</span>
        </div>
        <ProgressBar pct={project.progress || 0} />
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
        <Link href="/partner/site-logbook" className="btn btn-primary" style={{ fontSize: '13px', padding: '10px 18px' }}>📓 Add Site Update</Link>
        <Link href="/partner/materials" className="btn btn-outline" style={{ fontSize: '13px', padding: '10px 18px' }}>🧱 New Material Request</Link>
        <Link href="/partner/boq-studio" className="btn btn-outline" style={{ fontSize: '13px', padding: '10px 18px' }}>💰 Open BOQ Studio</Link>
      </div>
    </div>
  );
}

// ─── TAB: MILESTONES ─────────────────────────────────────────────────────
function MilestonesTab({ projectId }) {
  const [milestones, setMilestones] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const BLANK = { name: '', plannedStart: '', plannedEnd: '', status: 'not_started', paymentPct: 0, notes: '', customerVisible: true };
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    const stored = localStorage.getItem('bos_milestones_' + projectId);
    setMilestones(stored ? JSON.parse(stored) : DEMO_MILESTONES.filter(m => m.projectId === projectId));
  }, [projectId]);

  const save = (arr) => { setMilestones(arr); localStorage.setItem('bos_milestones_' + projectId, JSON.stringify(arr)); };
  const openAdd = () => { setForm(BLANK); setEditing(null); setModal(true); };
  const openEdit = (m) => { setForm({ ...m }); setEditing(m.id); setModal(true); };
  const handleSubmit = () => {
    if (!form.name) return alert('Milestone name required');
    if (editing) save(milestones.map(m => m.id === editing ? { ...m, ...form } : m));
    else save([...milestones, { ...form, id: 'MS' + Date.now(), projectId }]);
    setModal(false);
  };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const completed = milestones.filter(m => m.status === 'completed').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748B' }}>{completed} of {milestones.length} milestones completed</div>
        <button className="btn btn-primary" onClick={openAdd} style={{ fontSize: '13px', padding: '9px 16px' }}>+ Add Milestone</button>
      </div>

      {milestones.length === 0 ? (
        <EmptyState icon="🏁" title="No milestones yet" desc="Add milestones to track project progress stage by stage." action={<button className="btn btn-primary" onClick={openAdd}>+ Add First Milestone</button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {milestones.map((m, idx) => {
            const color = MILESTONE_STATUS_COLORS[m.status] || '#94A3B8';
            return (
              <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px 20px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', borderLeft: `4px solid ${color}` }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: color + '20', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color, flexShrink: 0 }}>{idx + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{m.name}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ background: color + '18', color, border: `1px solid ${color}44`, padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{m.status.replace('_', ' ')}</span>
                      {m.customerVisible && <span style={{ background: '#3B82F618', color: '#3B82F6', border: '1px solid #3B82F644', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>Client Visible</span>}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {m.plannedStart && <span>📅 Planned: {m.plannedStart} → {m.plannedEnd}</span>}
                    {m.paymentPct > 0 && <span>💰 Payment: {m.paymentPct}%</span>}
                  </div>
                  {m.notes && <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px', fontStyle: 'italic' }}>{m.notes}</div>}
                </div>
                <button onClick={() => openEdit(m)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>✏️</button>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Milestone' : 'Add Milestone'}
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editing ? 'Update' : 'Add'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Milestone Name" required><input className="input" value={form.name} onChange={f('name')} placeholder="e.g. Foundation" /></FormField>
          </div>
          <FormField label="Planned Start"><input className="input" type="date" value={form.plannedStart} onChange={f('plannedStart')} /></FormField>
          <FormField label="Planned End"><input className="input" type="date" value={form.plannedEnd} onChange={f('plannedEnd')} /></FormField>
          <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>{MILESTONE_STATUSES.map(s => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Payment % on Completion"><input className="input" type="number" min="0" max="100" value={form.paymentPct} onChange={f('paymentPct')} /></FormField>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Notes"><textarea className="input" rows={2} value={form.notes} onChange={f('notes')} style={{ resize: 'vertical' }} /></FormField>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.customerVisible} onChange={f('customerVisible')} />
              Show this milestone to the client
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── TAB: SITE UPDATES ───────────────────────────────────────────────────
function UpdatesTab({ projectId, projectName }) {
  const [logs, setLogs] = useState([]);
  const [modal, setModal] = useState(false);
  const BLANK = { date: new Date().toISOString().slice(0, 10), workDone: '', labourCount: '', materialsReceived: '', issues: '', tomorrowPlan: '', clientVisible: true };
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    const stored = localStorage.getItem('bos_logs_' + projectId);
    setLogs(stored ? JSON.parse(stored) : DEMO_LOGBOOK.filter(l => l.project === projectId));
  }, [projectId]);

  const save = (arr) => { setLogs(arr); localStorage.setItem('bos_logs_' + projectId, JSON.stringify(arr)); };
  const handleSubmit = () => {
    if (!form.workDone) return alert('Work done description is required');
    save([{ ...form, id: 'LOG' + Date.now(), project: projectId, createdAt: new Date().toISOString().slice(0, 10) }, ...logs]);
    setModal(false);
    setForm(BLANK);
  };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748B' }}>{logs.length} update{logs.length !== 1 ? 's' : ''} recorded</div>
        <button className="btn btn-primary" onClick={() => { setForm(BLANK); setModal(true); }} style={{ fontSize: '13px', padding: '9px 16px' }}>+ Add Update</button>
      </div>

      {logs.length === 0 ? (
        <EmptyState icon="📓" title="No updates yet" desc="Record your first daily site update for this project." action={<button className="btn btn-primary" onClick={() => { setForm(BLANK); setModal(true); }}>+ Add First Update</button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {logs.map((log, i) => (
            <div key={log.id} style={{ display: 'flex', gap: '16px', paddingBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #FFB347, #FC6E20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📓</div>
                {i < logs.length - 1 && <div style={{ width: '2px', flex: 1, background: 'var(--border)', marginTop: '6px' }} />}
              </div>
              <div style={{ flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', marginBottom: '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{log.date}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {log.labourCount && <span style={{ fontSize: '12px', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '999px', padding: '2px 10px' }}>👷 {log.labourCount} workers</span>}
                    {log.clientVisible && <span style={{ fontSize: '12px', background: '#3B82F618', color: '#3B82F6', border: '1px solid #3B82F644', borderRadius: '999px', padding: '2px 8px' }}>Client Visible</span>}
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: '#1E293B', marginBottom: '8px', lineHeight: 1.6 }}>{log.workDone}</div>
                {log.materialsReceived && <div style={{ fontSize: '13px', color: '#64748B' }}>📦 Materials: {log.materialsReceived}</div>}
                {log.issues && log.issues !== 'None' && <div style={{ fontSize: '13px', color: '#EF4444', marginTop: '4px' }}>⚠️ Issues: {log.issues}</div>}
                {log.tomorrowPlan && <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>➡️ Tomorrow: {log.tomorrowPlan}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Add Site Update"
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>Post Update</button></>}>
        <FormField label="Date"><input className="input" type="date" value={form.date} onChange={f('date')} /></FormField>
        <FormField label="Work Completed Today" required><textarea className="input" rows={3} value={form.workDone} onChange={f('workDone')} placeholder="Describe what was accomplished today..." style={{ resize: 'vertical' }} /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Labour Count"><input className="input" type="number" value={form.labourCount} onChange={f('labourCount')} placeholder="No. of workers" /></FormField>
          <FormField label="Materials Received"><input className="input" value={form.materialsReceived} onChange={f('materialsReceived')} placeholder="e.g. Cement 50 bags" /></FormField>
        </div>
        <FormField label="Issues / Blockers"><input className="input" value={form.issues} onChange={f('issues')} placeholder="Any problems today?" /></FormField>
        <FormField label="Tomorrow's Plan"><input className="input" value={form.tomorrowPlan} onChange={f('tomorrowPlan')} placeholder="What's planned for tomorrow?" /></FormField>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', marginTop: '4px' }}>
          <input type="checkbox" checked={form.clientVisible} onChange={f('clientVisible')} />
          Make this update visible to the client
        </label>
      </Modal>
    </div>
  );
}

// ─── TAB: MATERIALS ──────────────────────────────────────────────────────
function MaterialsTab({ projectId }) {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);
  const BLANK = { material: '', qty: '', unit: 'Bags', requiredDate: '', priority: 'Medium', status: 'Requested', notes: '' };
  const [form, setForm] = useState(BLANK);
  const UNITS = ['Bags', 'MT', 'Nos', 'Sqft', 'Sqm', 'Cft', 'RFT', 'Ltrs', 'KG'];
  const CATEGORIES = ['Cement', 'Steel', 'Sand', 'Aggregate', 'Bricks', 'Tiles', 'Paint', 'Electrical', 'Plumbing', 'Wood', 'Hardware', 'Other'];

  useEffect(() => {
    const stored = localStorage.getItem('bos_materials_' + projectId);
    setItems(stored ? JSON.parse(stored) : DEMO_MATERIALS.filter(m => m.project === projectId));
  }, [projectId]);

  const save = (arr) => { setItems(arr); localStorage.setItem('bos_materials_' + projectId, JSON.stringify(arr)); };
  const handleSubmit = () => {
    if (!form.material) return alert('Material name required');
    save([...items, { ...form, id: 'M' + Date.now(), project: projectId }]);
    setModal(false);
    setForm(BLANK);
  };
  const updateStatus = (id, status) => save(items.map(i => i.id === id ? { ...i, status } : i));
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748B' }}>{items.length} material request{items.length !== 1 ? 's' : ''}</div>
        <button className="btn btn-primary" onClick={() => { setForm(BLANK); setModal(true); }} style={{ fontSize: '13px', padding: '9px 16px' }}>+ Request Material</button>
      </div>
      {items.length === 0 ? (
        <EmptyState icon="🧱" title="No material requests" desc="Create a material request to track procurement for this project." action={<button className="btn btn-primary" onClick={() => { setForm(BLANK); setModal(true); }}>+ Request Material</button>} />
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead><tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
              {['Material', 'Qty', 'Unit', 'Required By', 'Priority', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {items.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{m.material}</td>
                  <td style={{ padding: '10px 12px' }}>{m.qty}</td>
                  <td style={{ padding: '10px 12px' }}>{m.unit}</td>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: '#64748B' }}>{m.requiredDate || '—'}</td>
                  <td style={{ padding: '10px 12px' }}><StatusBadge status={m.priority || 'Medium'} /></td>
                  <td style={{ padding: '10px 12px' }}><StatusBadge status={m.status} /></td>
                  <td style={{ padding: '10px 12px' }}>
                    <select className="input" style={{ fontSize: '12px', padding: '4px 8px', maxWidth: '140px' }} value={m.status} onChange={e => updateStatus(m.id, e.target.value)}>
                      {MATERIAL_STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="Request Material"
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>Submit Request</button></>}>
        <FormField label="Material Name" required><input className="input" value={form.material} onChange={f('material')} placeholder="e.g. UltraTech Cement OPC 53" /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Quantity"><input className="input" type="number" value={form.qty} onChange={f('qty')} placeholder="e.g. 200" /></FormField>
          <FormField label="Unit"><select className="input" value={form.unit} onChange={f('unit')}>{UNITS.map(u => <option key={u}>{u}</option>)}</select></FormField>
          <FormField label="Required Date"><input className="input" type="date" value={form.requiredDate} onChange={f('requiredDate')} /></FormField>
          <FormField label="Priority"><select className="input" value={form.priority} onChange={f('priority')}>{['Low', 'Medium', 'High', 'Urgent'].map(p => <option key={p}>{p}</option>)}</select></FormField>
        </div>
        <FormField label="Notes"><textarea className="input" rows={2} value={form.notes} onChange={f('notes')} style={{ resize: 'vertical' }} /></FormField>
      </Modal>
    </div>
  );
}

// ─── TAB: DOCUMENTS ──────────────────────────────────────────────────────
function DocumentsTab({ projectId }) {
  const [docs, setDocs] = useState([]);
  const [modal, setModal] = useState(false);
  const BLANK = { name: '', type: 'BOQ', status: 'Draft', version: '1.0', visibility: 'internal_only' };
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    const stored = localStorage.getItem('bos_docs_' + projectId);
    setDocs(stored ? JSON.parse(stored) : DEMO_DOCUMENTS.filter(d => d.project === projectId));
  }, [projectId]);

  const save = (arr) => { setDocs(arr); localStorage.setItem('bos_docs_' + projectId, JSON.stringify(arr)); };
  const handleSubmit = () => {
    if (!form.name) return alert('Document name required');
    save([...docs, { ...form, id: 'D' + Date.now(), project: projectId, uploadedAt: new Date().toISOString().slice(0, 10), fileUrl: '#' }]);
    setModal(false); setForm(BLANK);
  };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  const VISIBILITY = ['internal_only', 'customer_visible', 'buildogram_visible', 'partner_visible'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748B' }}>{docs.length} document{docs.length !== 1 ? 's' : ''}</div>
        <button className="btn btn-primary" onClick={() => { setForm(BLANK); setModal(true); }} style={{ fontSize: '13px', padding: '9px 16px' }}>+ Add Document</button>
      </div>
      {docs.length === 0 ? (
        <EmptyState icon="📁" title="No documents yet" desc="Upload project documents like BOQ, plans, and agreements." action={<button className="btn btn-primary" onClick={() => { setForm(BLANK); setModal(true); }}>+ Add Document</button>} />
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {docs.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontSize: '28px' }}>📄</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{d.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{d.type} · v{d.version} · {d.uploadedAt}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <StatusBadge status={d.status} />
                <span style={{ fontSize: '11px', background: '#F8FAFC', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '999px' }}>{d.visibility?.replace(/_/g, ' ')}</span>
                <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px' }}>📥 View</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={modal} onClose={() => setModal(false)} title="Add Document"
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>Add</button></>}>
        <FormField label="Document Name" required><input className="input" value={form.name} onChange={f('name')} placeholder="e.g. Foundation BOQ v2" /></FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <FormField label="Type"><select className="input" value={form.type} onChange={f('type')}>{DOC_TYPES.map(t => <option key={t}>{t}</option>)}</select></FormField>
          <FormField label="Version"><input className="input" value={form.version} onChange={f('version')} placeholder="1.0" /></FormField>
          <FormField label="Visibility"><select className="input" value={form.visibility} onChange={f('visibility')}>{VISIBILITY.map(v => <option key={v} value={v}>{v.replace(/_/g, ' ')}</option>)}</select></FormField>
          <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>
            {['Draft', 'Sent to Client', 'Approved', 'Rejected', 'Revision Requested'].map(s => <option key={s}>{s}</option>)}
          </select></FormField>
        </div>
        <div style={{ marginTop: '4px', padding: '12px', background: '#F8FAFC', borderRadius: '10px', fontSize: '13px', color: '#64748B' }}>
          📎 File upload via Cloudinary will be available once connected. Document record is saved now.
        </div>
      </Modal>
    </div>
  );
}

// ─── TAB: FINANCE ────────────────────────────────────────────────────────
function FinanceTab({ projectId, project }) {
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [activeSection, setActiveSection] = useState('payments');
  const [modal, setModal] = useState(false);
  const BLANK_PAY = { milestone: '', amount: '', dueDate: '', status: 'Pending', notes: '' };
  const BLANK_EXP = { category: 'Labour', amount: '', date: new Date().toISOString().slice(0, 10), paidTo: '', notes: '' };
  const [form, setForm] = useState(BLANK_PAY);

  useEffect(() => {
    const sp = localStorage.getItem('bos_payments_' + projectId);
    const se = localStorage.getItem('bos_expenses_' + projectId);
    setPayments(sp ? JSON.parse(sp) : DEMO_PAYMENTS.filter(p => p.projectId === projectId));
    setExpenses(se ? JSON.parse(se) : DEMO_EXPENSES.filter(e => e.projectId === projectId));
  }, [projectId]);

  const savePay = (arr) => { setPayments(arr); localStorage.setItem('bos_payments_' + projectId, JSON.stringify(arr)); };
  const saveExp = (arr) => { setExpenses(arr); localStorage.setItem('bos_expenses_' + projectId, JSON.stringify(arr)); };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const openAdd = (section) => {
    setActiveSection(section);
    setForm(section === 'payments' ? BLANK_PAY : BLANK_EXP);
    setModal(true);
  };
  const handleSubmit = () => {
    if (!form.amount) return alert('Amount required');
    if (activeSection === 'payments') savePay([...payments, { ...form, id: 'PAY' + Date.now(), projectId, amount: Number(form.amount) }]);
    else saveExp([...expenses, { ...form, id: 'EXP' + Date.now(), projectId, amount: Number(form.amount) }]);
    setModal(false);
  };

  const totalReceived = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + Number(p.amount), 0);
  const totalPending = payments.filter(p => p.status !== 'Paid' && p.status !== 'Cancelled').reduce((s, p) => s + Number(p.amount), 0);
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total Budget', value: fmt(project?.budget), color: '#6366F1' },
          { label: 'Received', value: fmt(totalReceived), color: '#10B981' },
          { label: 'Pending', value: fmt(totalPending), color: '#F59E0B' },
          { label: 'Total Expenses', value: fmt(totalExpenses), color: '#EF4444' },
        ].map(card => (
          <div key={card.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>{card.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '0' }}>
        {[['payments', '💳 Payments'], ['expenses', '📤 Expenses']].map(([k, label]) => (
          <button key={k} onClick={() => setActiveSection(k)} style={{ padding: '10px 18px', background: 'none', border: 'none', fontWeight: activeSection === k ? 700 : 400, color: activeSection === k ? '#FC6E20' : '#64748B', borderBottom: activeSection === k ? '2px solid #FC6E20' : '2px solid transparent', cursor: 'pointer', fontSize: '14px', marginBottom: '-2px' }}>{label}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => openAdd(activeSection)} style={{ fontSize: '12px', padding: '7px 14px', marginBottom: '8px' }}>+ Add {activeSection === 'payments' ? 'Payment' : 'Expense'}</button>
      </div>

      {activeSection === 'payments' && (
        payments.length === 0 ? <EmptyState icon="💳" title="No payment records" desc="Track payment milestones and collection status." action={<button className="btn btn-primary" onClick={() => openAdd('payments')}>+ Add Payment</button>} /> :
        <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead><tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
            {['Milestone', 'Amount', 'Due Date', 'Paid Date', 'Status', 'Notes'].map(h => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>)}
          </tr></thead>
          <tbody>{payments.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 600 }}>{p.milestone}</td>
              <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0F172A' }}>{fmt(p.amount)}</td>
              <td style={{ padding: '10px 12px', color: '#64748B', whiteSpace: 'nowrap' }}>{p.dueDate || '—'}</td>
              <td style={{ padding: '10px 12px', color: '#64748B', whiteSpace: 'nowrap' }}>{p.paidDate || '—'}</td>
              <td style={{ padding: '10px 12px' }}><StatusBadge status={p.status} /></td>
              <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '13px' }}>{p.notes || '—'}</td>
            </tr>
          ))}</tbody>
        </table></div>
      )}

      {activeSection === 'expenses' && (
        expenses.length === 0 ? <EmptyState icon="📤" title="No expenses logged" desc="Track site expenses like labour, material, and transport." action={<button className="btn btn-primary" onClick={() => openAdd('expenses')}>+ Log Expense</button>} /> :
        <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead><tr style={{ background: '#F8FAFC', borderBottom: '2px solid var(--border)' }}>
            {['Category', 'Amount', 'Date', 'Paid To', 'Notes'].map(h => <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>)}
          </tr></thead>
          <tbody>{expenses.map(e => (
            <tr key={e.id} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 12px' }}><span style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 600 }}>{e.category}</span></td>
              <td style={{ padding: '10px 12px', fontWeight: 700, color: '#EF4444' }}>{fmt(e.amount)}</td>
              <td style={{ padding: '10px 12px', color: '#64748B', whiteSpace: 'nowrap' }}>{e.date}</td>
              <td style={{ padding: '10px 12px' }}>{e.paidTo}</td>
              <td style={{ padding: '10px 12px', color: '#64748B', fontSize: '13px' }}>{e.notes || '—'}</td>
            </tr>
          ))}</tbody>
        </table></div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={activeSection === 'payments' ? 'Add Payment Record' : 'Log Expense'}
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>Save</button></>}>
        {activeSection === 'payments' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div style={{ gridColumn: '1/-1' }}><FormField label="Milestone Name" required><input className="input" value={form.milestone} onChange={f('milestone')} placeholder="e.g. Foundation" /></FormField></div>
            <FormField label="Amount (₹)" required><input className="input" type="number" value={form.amount} onChange={f('amount')} placeholder="e.g. 1500000" /></FormField>
            <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>{PAYMENT_STATUSES.map(s => <option key={s}>{s}</option>)}</select></FormField>
            <FormField label="Due Date"><input className="input" type="date" value={form.dueDate} onChange={f('dueDate')} /></FormField>
            <FormField label="Paid Date"><input className="input" type="date" value={form.paidDate} onChange={f('paidDate')} /></FormField>
            <div style={{ gridColumn: '1/-1' }}><FormField label="Notes"><input className="input" value={form.notes} onChange={f('notes')} /></FormField></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <FormField label="Category"><select className="input" value={form.category} onChange={f('category')}>{EXPENSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></FormField>
            <FormField label="Amount (₹)" required><input className="input" type="number" value={form.amount} onChange={f('amount')} /></FormField>
            <FormField label="Date"><input className="input" type="date" value={form.date} onChange={f('date')} /></FormField>
            <FormField label="Paid To"><input className="input" value={form.paidTo} onChange={f('paidTo')} placeholder="Vendor / contractor name" /></FormField>
            <div style={{ gridColumn: '1/-1' }}><FormField label="Notes"><input className="input" value={form.notes} onChange={f('notes')} /></FormField></div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── TAB: ISSUES ─────────────────────────────────────────────────────────
function IssuesTab({ projectId }) {
  const [issues, setIssues] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const BLANK = { title: '', description: '', raisedBy: 'Partner', priority: 'Medium', status: 'Open', dueDate: '', resolutionNote: '', customerVisible: false };
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    const stored = localStorage.getItem('bos_issues_' + projectId);
    setIssues(stored ? JSON.parse(stored) : DEMO_ISSUES.filter(i => i.projectId === projectId));
  }, [projectId]);

  const save = (arr) => { setIssues(arr); localStorage.setItem('bos_issues_' + projectId, JSON.stringify(arr)); };
  const openAdd = () => { setForm(BLANK); setEditing(null); setModal(true); };
  const openEdit = (i) => { setForm({ ...i }); setEditing(i.id); setModal(true); };
  const handleSubmit = () => {
    if (!form.title) return alert('Issue title required');
    if (editing) save(issues.map(i => i.id === editing ? { ...i, ...form } : i));
    else save([{ ...form, id: 'IS' + Date.now(), projectId, createdAt: new Date().toISOString().slice(0, 10) }, ...issues]);
    setModal(false);
  };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const PRIORITY_COLORS = { Low: '#10B981', Medium: '#F59E0B', High: '#EF4444', Urgent: '#7C3AED' };
  const STATUS_COLORS = { Open: '#EF4444', 'In Progress': '#3B82F6', Resolved: '#10B981', Closed: '#94A3B8' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '14px', color: '#64748B' }}>{issues.filter(i => i.status === 'Open').length} open · {issues.length} total</div>
        <button className="btn btn-primary" onClick={openAdd} style={{ fontSize: '13px', padding: '9px 16px' }}>+ Report Issue</button>
      </div>
      {issues.length === 0 ? (
        <EmptyState icon="🚩" title="No issues reported" desc="Report blockers and snags to keep the project on track." action={<button className="btn btn-primary" onClick={openAdd}>+ Report Issue</button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {issues.map(issue => {
            const pc = PRIORITY_COLORS[issue.priority] || '#64748B';
            const sc = STATUS_COLORS[issue.status] || '#64748B';
            return (
              <div key={issue.id} style={{ padding: '16px 20px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', borderLeft: `4px solid ${pc}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>{issue.title}</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ background: pc + '18', color: pc, border: `1px solid ${pc}44`, padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{issue.priority}</span>
                    <span style={{ background: sc + '18', color: sc, border: `1px solid ${sc}44`, padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{issue.status}</span>
                    <button onClick={() => openEdit(issue)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                  </div>
                </div>
                {issue.description && <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '6px' }}>{issue.description}</div>}
                <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span>Raised by: {issue.raisedBy}</span>
                  {issue.dueDate && <span>Due: {issue.dueDate}</span>}
                  {issue.customerVisible && <span style={{ color: '#3B82F6' }}>👁 Client Visible</span>}
                </div>
                {issue.resolutionNote && <div style={{ marginTop: '8px', padding: '10px 12px', background: '#F0FDF4', borderRadius: '8px', fontSize: '13px', color: '#16A34A' }}>✅ Resolution: {issue.resolutionNote}</div>}
              </div>
            );
          })}
        </div>
      )}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Issue' : 'Report Issue'}
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editing ? 'Update' : 'Report'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div style={{ gridColumn: '1/-1' }}><FormField label="Issue Title" required><input className="input" value={form.title} onChange={f('title')} placeholder="Brief description of the problem" /></FormField></div>
          <div style={{ gridColumn: '1/-1' }}><FormField label="Description"><textarea className="input" rows={3} value={form.description} onChange={f('description')} style={{ resize: 'vertical' }} placeholder="Detailed explanation..." /></FormField></div>
          <FormField label="Priority"><select className="input" value={form.priority} onChange={f('priority')}>{ISSUE_PRIORITIES.map(p => <option key={p}>{p}</option>)}</select></FormField>
          <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>{ISSUE_STATUSES.map(s => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Raised By"><input className="input" value={form.raisedBy} onChange={f('raisedBy')} placeholder="Partner / Client / Supervisor" /></FormField>
          <FormField label="Due Date"><input className="input" type="date" value={form.dueDate} onChange={f('dueDate')} /></FormField>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Resolution Note"><input className="input" value={form.resolutionNote} onChange={f('resolutionNote')} placeholder="How was it resolved?" /></FormField>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.customerVisible} onChange={f('customerVisible')} />
              Visible to client
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('bos_projects');
    const projects = stored ? JSON.parse(stored) : DEMO_PROJECTS;
    const found = projects.find(p => p.id === id);
    if (found) setProject(found);
    else {
      const demo = DEMO_PROJECTS.find(p => p.id === id);
      if (demo) setProject(demo);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading project...</div>;
  if (!project) return (
    <div style={{ padding: '60px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏗️</div>
      <h2 style={{ marginBottom: '8px' }}>Project not found</h2>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>This project may have been deleted or the ID is invalid.</p>
      <Link href="/partner/projects" className="btn btn-primary">← Back to Projects</Link>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <Link href="/partner/projects" style={{ fontSize: '13px', color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px', textDecoration: 'none' }}>← All Projects</Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>{project.name}</h1>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <StatusBadge status={project.status} />
              <span style={{ fontSize: '13px', color: '#64748B' }}>👤 {project.client || project.clientName}</span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>📍 {project.location}</span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>📊 {project.progress || 0}% complete</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(252,110,32,0.1)', color: '#FC6E20', border: '1px solid rgba(252,110,32,0.3)', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
              {project.stage || project.currentStage}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '2px solid var(--border)', marginBottom: '24px', overflowX: 'auto' }}>
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            fontSize: '14px', fontWeight: activeTab === tab.key ? 700 : 400,
            color: activeTab === tab.key ? '#FC6E20' : '#64748B',
            borderBottom: activeTab === tab.key ? '2px solid #FC6E20' : '2px solid transparent',
            marginBottom: '-2px', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <span>{tab.icon}</span>
            <span className="hide-mobile">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview'   && <OverviewTab  project={project} />}
        {activeTab === 'milestones' && <MilestonesTab projectId={id} />}
        {activeTab === 'updates'    && <UpdatesTab   projectId={id} projectName={project.name} />}
        {activeTab === 'materials'  && <MaterialsTab  projectId={id} />}
        {activeTab === 'documents'  && <DocumentsTab  projectId={id} />}
        {activeTab === 'finance'    && <FinanceTab    projectId={id} project={project} />}
        {activeTab === 'issues'     && <IssuesTab     projectId={id} />}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media(max-width:700px){
          .hide-mobile { display: none; }
        }
      `}} />
    </div>
  );
}
