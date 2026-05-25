'use client';
import { useState, useEffect } from 'react';
import { StatusBadge, SectionHeader, Modal, FormField, SearchBar, EmptyState, MetricCard } from '../_shared/components';
import { DEMO_PROJECTS, PROJECT_STAGES } from '../_shared/demoData';
import Link from 'next/link';

const BLANK = { name: '', client: '', location: '', type: 'Residential', startDate: '', targetDate: '', stage: 'Agreement', progress: 0, budget: 0, status: 'Planning' };
const PROJECT_TYPES = ['Residential', 'Villa', 'Interior', 'Commercial', 'Renovation', 'Solar', 'Elevator', 'Waterproofing'];

function fmt(n) { return n >= 10000000 ? '₹' + (n / 10000000).toFixed(1) + 'Cr' : n >= 100000 ? '₹' + (n / 100000).toFixed(1) + 'L' : n ? '₹' + Number(n).toLocaleString('en-IN') : '—'; }

function ProgressBar({ pct }) {
  return (
    <div style={{ background: '#E2E8F0', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #FFB347, #FC6E20)', borderRadius: '6px', transition: 'width 0.4s' }} />
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);

  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/partner/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.items || []);
        localStorage.setItem('bos_projects', JSON.stringify(data.items || []));
      } else {
        throw new Error(data.message);
      }
    } catch (e) {
      console.error('API fetch failed, using fallback:', e);
      const stored = typeof window !== 'undefined' && localStorage.getItem('bos_projects');
      if (stored) setProjects(JSON.parse(stored));
      else setProjects(DEMO_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const save = (arr) => { setProjects(arr); localStorage.setItem('bos_projects', JSON.stringify(arr)); };

  const openAdd = () => { setForm(BLANK); setEditingId(null); setModalOpen(true); };
  const openEdit = (p) => { setForm({ ...p }); setEditingId(p.id); setModalOpen(true); };

  const handleSubmit = async () => {
    if (!form.name) return alert('Project name is required');
    
    // Optimistic UI + fallback save
    let optimisticArr = [];
    if (editingId) {
      optimisticArr = projects.map(p => p.id === editingId ? { ...form, id: editingId, progress: Number(form.progress), budget: Number(form.budget) } : p);
    } else {
      optimisticArr = [{ ...form, id: 'temp_' + Date.now().toString(), progress: Number(form.progress), budget: Number(form.budget) }, ...projects];
    }
    save(optimisticArr);
    setModalOpen(false);

    // API save
    try {
      const url = editingId ? `/api/partner/projects/${editingId}` : '/api/partner/projects';
      const method = editingId ? 'PUT' : 'POST';
      const payload = { ...form, progressPercent: Number(form.progress), budget: Number(form.budget), projectName: form.name, clientName: form.client, projectType: form.type, targetCompletion: form.targetDate, currentStage: form.stage };
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        fetchProjects(); // Reload to get true IDs
      }
    } catch(e) {
      console.error('API save failed', e);
    }
  };

  const deleteProject = (id) => { if (confirm('Delete this project?')) save(projects.filter(p => p.id !== id)); };

  const filtered = projects.filter(p => {
    const m = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.client?.toLowerCase().includes(search.toLowerCase());
    const ms = filterStatus === 'All' || p.status === filterStatus;
    return m && ms;
  });

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const stageIdx = (stage) => PROJECT_STAGES.indexOf(stage);

  return (
    <div>
      <SectionHeader icon="🏗️" title="Project Control Center" desc="Track progress, milestones, and timelines for all your projects"
        action={<button className="btn btn-primary" onClick={openAdd}>+ Add Project</button>}
      />

      {/* METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <MetricCard icon="🏗️" label="Total Projects" value={projects.length} />
        <MetricCard icon="⚡" label="Active" value={projects.filter(p => p.status === 'Active').length} color="#10B981" />
        <MetricCard icon="📋" label="Planning" value={projects.filter(p => p.status === 'Planning').length} color="#F59E0B" />
        <MetricCard icon="✅" label="Completed" value={projects.filter(p => p.status === 'Completed').length} color="#6366F1" />
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." />
        <select className="input" style={{ maxWidth: '160px' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          {['Active', 'Planning', 'Completed', 'On Hold'].map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* PROJECT CARDS */}
      {filtered.length === 0 ? (
        <EmptyState icon="🏗️" title="No projects found" desc="Create your first project or convert a won lead." action={<button className="btn btn-primary" onClick={openAdd}>+ Add Project</button>} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(p => (
            <div key={p.id} className="card" style={{ padding: '22px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>👤 {p.client} &nbsp;|&nbsp; 📍 {p.location}</div>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <StatusBadge status={p.stage} />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{p.type}</span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                  <span style={{ fontWeight: 600, color: '#FC6E20' }}>{p.progress}%</span>
                </div>
                <ProgressBar pct={p.progress} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span>💰 {fmt(p.budget)}</span>
                <span>🗓️ {p.targetDate || 'No deadline'}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button className="btn btn-outline" onClick={() => setDetailProject(p)} style={{ flex: 1, fontSize: '13px', padding: '8px' }}>View Details</button>
                <button onClick={() => openEdit(p)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                <button onClick={() => deleteProject(p.id)} style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Project' : 'Add New Project'}
        footer={<><button className="btn" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSubmit}>{editingId ? 'Update' : 'Create Project'}</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Project Name" required><input className="input" value={form.name} onChange={f('name')} placeholder="e.g. Rajesh Kumar G+2 Villa" /></FormField>
          </div>
          <FormField label="Client Name"><input className="input" value={form.client} onChange={f('client')} placeholder="Client full name" /></FormField>
          <FormField label="Location"><input className="input" value={form.location} onChange={f('location')} placeholder="Area, City" /></FormField>
          <FormField label="Project Type"><select className="input" value={form.type} onChange={f('type')}>{PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}</select></FormField>
          <FormField label="Status"><select className="input" value={form.status} onChange={f('status')}>{['Active', 'Planning', 'Completed', 'On Hold'].map(s => <option key={s}>{s}</option>)}</select></FormField>
          <FormField label="Start Date"><input className="input" type="date" value={form.startDate} onChange={f('startDate')} /></FormField>
          <FormField label="Target Completion"><input className="input" type="date" value={form.targetDate} onChange={f('targetDate')} /></FormField>
          <FormField label="Budget (₹)"><input className="input" type="number" value={form.budget} onChange={f('budget')} placeholder="e.g. 7500000" /></FormField>
          <FormField label="Progress %"><input className="input" type="number" min="0" max="100" value={form.progress} onChange={f('progress')} placeholder="0-100" /></FormField>
          <div style={{ gridColumn: '1/-1' }}>
            <FormField label="Current Stage"><select className="input" value={form.stage} onChange={f('stage')}>{PROJECT_STAGES.map(s => <option key={s}>{s}</option>)}</select></FormField>
          </div>
        </div>
      </Modal>

      {/* DETAIL MODAL */}
      <Modal open={!!detailProject} onClose={() => setDetailProject(null)} title={detailProject?.name || 'Project Details'}
        footer={<><button className="btn" onClick={() => { openEdit(detailProject); setDetailProject(null); }}>Edit Project</button><Link href="/partner/site-logbook" className="btn btn-primary">Add Site Log</Link></>}>
        {detailProject && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[['Client', detailProject.client], ['Location', detailProject.location], ['Type', detailProject.type], ['Budget', fmt(detailProject.budget)], ['Start Date', detailProject.startDate], ['Target Date', detailProject.targetDate || '—']].map(([k, v]) => (
                <div key={k} style={{ background: '#F8FAFC', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>Progress: {detailProject.progress}%</span>
              <StatusBadge status={detailProject.status} />
            </div>
            <ProgressBar pct={detailProject.progress} />

            <h3 style={{ margin: '24px 0 12px', fontSize: '15px', fontWeight: 700 }}>Milestone Tracker</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {PROJECT_STAGES.map((stage, idx) => {
                const current = stageIdx(detailProject.stage);
                const done = idx < current;
                const active = idx === current;
                return (
                  <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '8px', background: active ? 'rgba(252,110,32,0.06)' : 'transparent', border: active ? '1px solid rgba(252,110,32,0.2)' : '1px solid transparent' }}>
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>{done ? '✅' : active ? '🔶' : '⭕'}</span>
                    <span style={{ fontSize: '14px', fontWeight: active ? 700 : 400, color: active ? '#FC6E20' : done ? 'var(--text-muted)' : 'var(--text)' }}>{stage}</span>
                    {active && <span style={{ fontSize: '11px', background: '#FC6E2015', color: '#FC6E20', padding: '2px 8px', borderRadius: '99px', fontWeight: 700, marginLeft: 'auto' }}>CURRENT</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
