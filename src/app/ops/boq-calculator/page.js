'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STATUS_COLORS = {
  draft:  { bg: '#FFF7ED', color: '#C2410C', label: 'Draft' },
  final:  { bg: '#F0FDF4', color: '#16A34A', label: 'Final' },
  shared: { bg: '#EFF6FF', color: '#2563EB', label: 'Shared' },
};

function formatCurrency(v) {
  if (!v && v !== 0) return '—';
  return '₹' + Number(v).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function BOQProjectListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNew, setShowNew]   = useState(false);
  const [form, setForm]         = useState({ title: '', client_name: '', client_phone: '', client_email: '', plot_address: '', floor_config: 'G', margin_pct: '12' });
  const [err, setErr]           = useState('');

  useEffect(() => { loadProjects(); }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const r = await fetch('/api/boq-calculator/projects');
      if (r.ok) { const d = await r.json(); setProjects(d.projects || []); }
    } finally { setLoading(false); }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setErr('');
    if (!form.title.trim()) { setErr('Project title is required.'); return; }
    setCreating(true);
    try {
      const r = await fetch('/api/boq-calculator/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await r.json();
      if (r.ok) { router.push(`/ops/boq-calculator/${d.project.id}`); }
      else setErr(d.error || 'Failed to create project.');
    } catch { setErr('Network error.'); }
    finally { setCreating(false); }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete project "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/boq-calculator/projects/${id}`, { method: 'DELETE' });
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div style={{ padding: '28px 24px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', margin: 0 }}>🧮 BOQ Calculator</h1>
          <p style={{ color: '#64748B', margin: '4px 0 0', fontSize: 14 }}>Multi-project engineering cost estimates — COCENA Dec 2025 rates</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: 12, padding: '10px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}
        >
          + New Project
        </button>
      </div>

      {/* New Project Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '32px 28px', maxWidth: 520, width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '0 0 20px' }}>New BOQ Project</h2>
            <form onSubmit={handleCreate}>
              <div style={{ display: 'grid', gap: 14 }}>
                <label style={lbl}>
                  Project Title *
                  <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. G+2 Residence — Adyar" autoFocus />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <label style={lbl}>Client Name <input style={inp} value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} placeholder="Mr. Rajan" /></label>
                  <label style={lbl}>Client Phone <input style={inp} value={form.client_phone} onChange={e => setForm(f => ({ ...f, client_phone: e.target.value }))} placeholder="+91 98765..." /></label>
                </div>
                <label style={lbl}>Client Email <input style={inp} type="email" value={form.client_email} onChange={e => setForm(f => ({ ...f, client_email: e.target.value }))} placeholder="client@email.com" /></label>
                <label style={lbl}>Plot Address <input style={inp} value={form.plot_address} onChange={e => setForm(f => ({ ...f, plot_address: e.target.value }))} placeholder="No. 12, 2nd Street, Adyar, Chennai" /></label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <label style={lbl}>
                    Floor Config
                    <select style={inp} value={form.floor_config} onChange={e => setForm(f => ({ ...f, floor_config: e.target.value }))}>
                      {['G', 'G+1', 'G+2', 'G+3'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                  <label style={lbl}>
                    Margin %
                    <input style={inp} type="number" min="0" max="50" step="0.5" value={form.margin_pct} onChange={e => setForm(f => ({ ...f, margin_pct: e.target.value }))} />
                  </label>
                </div>
              </div>
              {err && <p style={{ color: '#DC2626', fontSize: 13, marginTop: 10 }}>{err}</p>}
              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                <button type="submit" disabled={creating} style={{ flex: 1, background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: 10, padding: '11px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  {creating ? 'Creating…' : 'Create & Open →'}
                </button>
                <button type="button" onClick={() => { setShowNew(false); setErr(''); }} style={{ padding: '11px 18px', borderRadius: 10, border: '1px solid #E2E8F0', background: 'white', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>Loading projects…</div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>No projects yet</h3>
          <p style={{ color: '#64748B', marginBottom: 24 }}>Create your first BOQ project to get started.</p>
          <button onClick={() => setShowNew(true)} style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: 12, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>+ Create First Project</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
          {projects.map(p => {
            const sc = STATUS_COLORS[p.status] || STATUS_COLORS.draft;
            return (
              <div key={p.id} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '22px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ background: sc.bg, color: sc.color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>{sc.label}</span>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    title="Delete project"
                    style={{ background: 'none', border: 'none', color: '#CBD5E1', fontSize: 16, cursor: 'pointer', padding: 4, borderRadius: 6, lineHeight: 1 }}
                  >🗑</button>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', margin: '0 0 4px', lineHeight: 1.3 }}>{p.title}</h3>
                {p.client_name && <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 2px' }}>👤 {p.client_name}{p.client_phone && ` · ${p.client_phone}`}</p>}
                <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 14px' }}>
                  {p.floor_config} · {p.margin_pct}% margin · Updated {new Date(p.updated_at).toLocaleDateString('en-IN')}
                </p>
                {p.total_builtup > 0 && (
                  <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '10px 14px', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: '#64748B' }}>Building Estimate</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{formatCurrency(p.total_builtup)}</span>
                  </div>
                )}
                <Link
                  href={`/ops/boq-calculator/${p.id}`}
                  style={{ display: 'block', textAlign: 'center', background: '#0F172A', color: 'white', borderRadius: 10, padding: '9px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                >
                  Open Workstation →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const lbl = { fontSize: 13, fontWeight: 600, color: '#374151', display: 'flex', flexDirection: 'column', gap: 5 };
const inp  = { padding: '9px 12px', border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit', background: 'white' };
