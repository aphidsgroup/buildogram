'use client';
import { useState, useEffect } from 'react';
import { StatusBadge, SectionHeader, Modal, FormField, SearchBar, EmptyState, MetricCard } from '../_shared/components';
import { DEMO_PROJECTS, PROJECT_STAGES } from '../_shared/demoData';
import Link from 'next/link';
import { notifyEvent } from '@/lib/services/notificationService';
import { logActivity } from '@/lib/services/activityLogService';
import { checkPlanLimit } from '@/lib/auth/permissions';

const BLANK = { name: '', client: '', location: '', type: 'Residential', startDate: '', targetDate: '', stage: 'Agreement', progress: 0, budget: 0, status: 'Planning' };
const PROJECT_TYPES = ['Residential', 'Villa', 'Interior', 'Commercial', 'Renovation', 'Solar', 'Elevator', 'Waterproofing'];

function fmt(n) { return n >= 10000000 ? '₹' + (n / 10000000).toFixed(1) + 'Cr' : n >= 100000 ? '₹' + (n / 100000).toFixed(1) + 'L' : n ? '₹' + Number(n).toLocaleString('en-IN') : '—'; }

function getHealth(p) {
  if (p.status === 'Completed') return { label: 'Completed', color: '#6366F1' };
  if (p.status === 'On Hold')   return { label: 'On Hold',   color: '#94A3B8' };
  if (p.targetDate && new Date(p.targetDate) < new Date() && p.progress < 100) return { label: 'Delayed', color: '#EF4444' };
  if (p.progress >= 75) return { label: 'Near Done', color: '#10B981' };
  return { label: 'On Track', color: '#10B981' };
}

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

    // Plan limit check for new private projects
    if (!editingId) {
      const privateActive = projects.filter(p => p.status !== 'Completed' && p.sourceType !== 'buildogram_assigned').length;
      const limitInfo = checkPlanLimit({ planType: 'free', usage: { privateProjects: privateActive } }, 'privateProjects');
      if (!limitInfo.allowed) {
        return alert(`Free plan limit: ${limitInfo.max} private projects. Contact Buildogram to upgrade.`);
      }
      if (limitInfo.pct >= 80) {
        if (!confirm(`You are using ${limitInfo.used}/${limitInfo.max} project slots. Continue?`)) return;
      }
    }
    
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
        if (!editingId) {
          notifyEvent('project_created', { projectName: form.name }).catch(() => {});
          logActivity({ type: 'project', title: 'Project Created', detail: form.name, actor: 'Partner' }).catch(() => {});
        }
      } else if (!editingId) {
        // Still notify even if API failed (localStorage saved)
        notifyEvent('project_created', { projectName: form.name }).catch(() => {});
      }
    } catch(e) {
      console.error('API save failed', e);
      if (!editingId) notifyEvent('project_created', { projectName: form.name }).catch(() => {});
    }
  };

  const deleteProject = (id) => { if (confirm('Delete this project?')) save(projects.filter(p => p.id !== id)); };

  const filtered = projects.filter(p => {
    const m = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.client?.toLowerCase().includes(search.toLowerCase());
    const ms = filterStatus === 'All' || p.status === filterStatus;
    return m && ms;
  });

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

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
          {filtered.map(p => {
            const health = getHealth(p);
            return (
            <div key={p.id} className="card" style={{ padding: '22px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>👤 {p.client} &nbsp;|&nbsp; 📍 {p.location}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <StatusBadge status={p.status} />
                  <span style={{ background: health.color + '18', color: health.color, border: `1px solid ${health.color}44`, padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>{health.label}</span>
                </div>
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
                <Link href={`/partner/projects/${p.id}`} className="btn btn-outline" style={{ flex: 1, fontSize: '13px', padding: '8px', textAlign: 'center' }}>View Details →</Link>
                <button onClick={() => openEdit(p)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
                <button onClick={() => deleteProject(p.id)} style={{ background: 'none', border: '1px solid #EF444433', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
              </div>
            </div>
            );
          })}
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
    </div>
  );
}
