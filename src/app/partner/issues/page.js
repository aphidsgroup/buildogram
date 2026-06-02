'use client';
import { useState, useEffect } from 'react';
import { StatusBadge, SectionHeader, Modal, FormField, SearchBar, EmptyState } from '../_shared/components';
import { DEMO_ISSUES, DEMO_PROJECTS, ISSUE_PRIORITIES, ISSUE_STATUSES } from '../_shared/demoData';

const PRIORITY_COLORS = { Low: '#10B981', Medium: '#F59E0B', High: '#EF4444', Urgent: '#7C3AED' };
const STATUS_COLORS   = { Open: '#EF4444', 'In Progress': '#3B82F6', Resolved: '#10B981', Closed: '#94A3B8' };

const BLANK = {
  title: '', description: '', projectId: '', raisedBy: 'Partner',
  priority: 'Medium', status: 'Open', dueDate: '', resolutionNote: '', customerVisible: false
};

export default function IssuesPage() {
  const [issues,  setIssues]  = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch]   = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(BLANK);

  useEffect(() => {
    // Load all issues across all projects from localStorage
    const storedProjects = localStorage.getItem('bos_projects');
    const allProjects = storedProjects ? JSON.parse(storedProjects) : DEMO_PROJECTS;
    setProjects(allProjects);

    let all = [];
    allProjects.forEach(p => {
      const stored = localStorage.getItem('bos_issues_' + p.id);
      all = all.concat(stored ? JSON.parse(stored) : DEMO_ISSUES.filter(i => i.projectId === p.id));
    });
    // Also include demo issues if no local data
    if (all.length === 0) all = DEMO_ISSUES;
    setIssues(all);
  }, []);

  const saveAll = (arr) => {
    setIssues(arr);
    // Save back per project
    const byProject = {};
    arr.forEach(i => {
      if (!byProject[i.projectId]) byProject[i.projectId] = [];
      byProject[i.projectId].push(i);
    });
    Object.entries(byProject).forEach(([pid, issues]) => {
      localStorage.setItem('bos_issues_' + pid, JSON.stringify(issues));
    });
  };

  const openAdd  = ()  => { setForm(BLANK); setEditing(null); setModal(true); };
  const openEdit = (i) => { setForm({ ...i }); setEditing(i.id); setModal(true); };
  const handleSubmit = () => {
    if (!form.title) return alert('Issue title required');
    if (editing) saveAll(issues.map(i => i.id === editing ? { ...i, ...form } : i));
    else saveAll([{ ...form, id: 'IS' + Date.now(), createdAt: new Date().toISOString().slice(0, 10) }, ...issues]);
    setModal(false);
  };
  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const filtered = issues.filter(i => {
    const ms = filterStatus === 'All'   || i.status === filterStatus;
    const mp = filterPriority === 'All' || i.priority === filterPriority;
    const mq = !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.description?.toLowerCase().includes(search.toLowerCase());
    return ms && mp && mq;
  });

  const getProjectName = (pid) => projects.find(p => p.id === pid)?.name || pid || '—';

  // Summary counts
  const openCount     = issues.filter(i => i.status === 'Open').length;
  const inProgressCnt = issues.filter(i => i.status === 'In Progress').length;
  const resolvedCnt   = issues.filter(i => i.status === 'Resolved').length;
  const urgentCnt     = issues.filter(i => i.priority === 'Urgent' && i.status === 'Open').length;

  return (
    <div>
      <SectionHeader icon="🚩" title="Issue & Blocker Tracker"
        desc="Track all site problems, snags, and blockers across every project"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Report Issue</button>}
      />

      {/* KPI Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Open Issues',   value: openCount,     color: '#EF4444' },
          { label: 'In Progress',   value: inProgressCnt, color: '#3B82F6' },
          { label: 'Resolved',      value: resolvedCnt,   color: '#10B981' },
          { label: 'Urgent Open',   value: urgentCnt,     color: '#7C3AED' },
        ].map(c => (
          <div key={c.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search issues..." />
        <select className="input" style={{ maxWidth: '150px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {ISSUE_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="input" style={{ maxWidth: '150px' }} value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="All">All Priority</option>
          {ISSUE_PRIORITIES.map(p => <option key={p}>{p}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: '#64748B' }}>{filtered.length} issue{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Issue List */}
      {filtered.length === 0 ? (
        <EmptyState icon="✅" title="No issues found" desc="All clear! No issues match your filters, or none have been reported yet." action={<button className="btn btn-primary" onClick={openAdd}>+ Report First Issue</button>} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(issue => {
            const pc = PRIORITY_COLORS[issue.priority] || '#64748B';
            const sc = STATUS_COLORS[issue.status]   || '#64748B';
            return (
              <div key={issue.id} style={{ padding: '16px 20px', background: 'white', border: '1px solid var(--border)', borderRadius: '12px', borderLeft: `4px solid ${pc}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{issue.title}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>📁 {getProjectName(issue.projectId)}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <span style={{ background: pc + '18', color: pc, border: `1px solid ${pc}44`, padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{issue.priority}</span>
                    <span style={{ background: sc + '18', color: sc, border: `1px solid ${sc}44`, padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{issue.status}</span>
                    <button onClick={() => openEdit(issue)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontSize: '13px' }}>✏️ Edit</button>
                  </div>
                </div>
                {issue.description && <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '8px' }}>{issue.description}</p>}
                <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <span>By: {issue.raisedBy}</span>
                  {issue.dueDate && <span>Due: {issue.dueDate}</span>}
                  {issue.createdAt && <span>Reported: {issue.createdAt}</span>}
                  {issue.customerVisible && <span style={{ color: '#3B82F6' }}>👁 Client Visible</span>}
                </div>
                {issue.resolutionNote && (
                  <div style={{ marginTop: '10px', padding: '10px 14px', background: '#F0FDF4', borderRadius: '8px', fontSize: '13px', color: '#16A34A' }}>
                    ✅ Resolution: {issue.resolutionNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Issue' : 'Report New Issue'}
        footer={<><button className="btn" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editing ? 'Update' : 'Report Issue'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Issue Title" required>
              <input className="input" value={form.title} onChange={f('title')} placeholder="Brief description of the problem" />
            </FormField>
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Description">
              <textarea className="input" rows={3} value={form.description} onChange={f('description')} style={{ resize: 'vertical' }} placeholder="Provide more details..." />
            </FormField>
          </div>
          <FormField label="Project">
            <select className="input" value={form.projectId} onChange={f('projectId')}>
              <option value="">Select project...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </FormField>
          <FormField label="Raised By">
            <input className="input" value={form.raisedBy} onChange={f('raisedBy')} placeholder="Partner / Client / Supervisor" />
          </FormField>
          <FormField label="Priority">
            <select className="input" value={form.priority} onChange={f('priority')}>{ISSUE_PRIORITIES.map(p => <option key={p}>{p}</option>)}</select>
          </FormField>
          <FormField label="Status">
            <select className="input" value={form.status} onChange={f('status')}>{ISSUE_STATUSES.map(s => <option key={s}>{s}</option>)}</select>
          </FormField>
          <FormField label="Due Date">
            <input className="input" type="date" value={form.dueDate} onChange={f('dueDate')} />
          </FormField>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Resolution Note">
              <input className="input" value={form.resolutionNote} onChange={f('resolutionNote')} placeholder="How was it resolved?" />
            </FormField>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.customerVisible} onChange={f('customerVisible')} />
              Make this issue visible to the client
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
}
