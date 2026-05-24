'use client';
import { useEffect, useState } from 'react';

/* ─── Constants ─────────────────────────────────────────────── */
const PARTNER_PIPELINE = ['new', 'contacted', 'screening', 'onboarding', 'active', 'rejected'];

const PARTNER_TYPES = {
  Builder:              { icon: '🏗️', color: '#2563eb', bg: '#eff6ff' },
  Contractor:           { icon: '👷', color: '#7c3aed', bg: '#f5f3ff' },
  Architect:            { icon: '📐', color: '#0891b2', bg: '#ecfeff' },
  'Structural Engineer':{ icon: '🔩', color: '#9333ea', bg: '#faf5ff' },
  'Interior Designer':  { icon: '🎨', color: '#db2777', bg: '#fdf2f8' },
  'Material Supplier':  { icon: '🧱', color: '#d97706', bg: '#fffbeb' },
  'Real Estate Agent':  { icon: '🏠', color: '#dc2626', bg: '#fef2f2' },
  'Maintenance Vendor': { icon: '🔧', color: '#ea580c', bg: '#fff7ed' },
  '360 Tour Vendor':    { icon: '📷', color: '#059669', bg: '#ecfdf5' },
  'Legal Consultant':   { icon: '⚖️', color: '#64748b', bg: '#f8fafc' },
};

const PIPELINE_COLORS = {
  new:        { color: '#2563eb', bg: '#eff6ff' },
  contacted:  { color: '#d97706', bg: '#fffbeb' },
  screening:  { color: '#7c3aed', bg: '#f5f3ff' },
  onboarding: { color: '#0891b2', bg: '#ecfeff' },
  active:     { color: '#059669', bg: '#ecfdf5' },
  rejected:   { color: '#dc2626', bg: '#fef2f2' },
};

/* ─── Sub-components ─────────────────────────────────────────── */
function Pill({ value, map, capitalize = true }) {
  const cfg = map[value] || { color: '#64748b', bg: '#f1f5f9' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
      borderRadius: '999px', fontSize: '11px', fontWeight: 700,
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}22`,
      whiteSpace: 'nowrap', textTransform: capitalize ? 'capitalize' : 'none',
    }}>
      {cfg.icon ? `${cfg.icon} ` : ''}{value}
    </span>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card">
      <div className="flex-between mb-4">
        <div className="stat-icon" style={{ background: color }}>{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function OpsPartners() {
  const [partners, setPartners]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter]   = useState('all');
  const [search, setSearch]           = useState('');
  const [selected, setSelected]       = useState(null);
  const [saving, setSaving]           = useState(false);
  const [notes, setNotes]             = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/leads?lead_type=partner_application')
      .then(r => r.json())
      .then(d => { setPartners(d.leads || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const update = async (id, data) => {
    setSaving(true);
    await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    load();
    if (selected?.id === id) setSelected(p => ({ ...p, ...data }));
  };

  /* ─── Helpers ─── */
  const partnerType   = p => p.metadata?.partner_type || 'Unknown';
  const company       = p => p.metadata?.company || '—';
  const experience    = p => p.metadata?.experience || '—';

  const filtered = partners.filter(p => {
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchType   = typeFilter   === 'all' || partnerType(p) === typeFilter;
    const matchSearch = !search
      || p.name?.toLowerCase().includes(search.toLowerCase())
      || p.phone?.includes(search)
      || company(p).toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  /* ─── Stats ─── */
  const countStatus = s => partners.filter(p => p.status === s).length;
  const uniqueTypes = [...new Set(partners.map(partnerType))].filter(t => t !== 'Unknown');

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="page-header flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Partner Applications</h1>
          <p className="text-muted mt-2">{partners.length} total applications · {filtered.length} shown</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            className="input"
            style={{ maxWidth: '240px', margin: 0 }}
            placeholder="Search name, phone, company…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <a href="/partners" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
            🔗 Public Page
          </a>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid-4 mb-8">
        <StatCard icon="🤝" label="Total Applications" value={partners.length} color="rgba(37,99,235,0.12)" />
        <StatCard icon="⏳" label="Pending Review" value={countStatus('new') + countStatus('contacted')} color="rgba(217,119,6,0.12)" />
        <StatCard icon="🔄" label="In Onboarding" value={countStatus('screening') + countStatus('onboarding')} color="rgba(124,58,237,0.12)" />
        <StatCard icon="✅" label="Active Partners" value={countStatus('active')} color="rgba(5,150,105,0.12)" />
      </div>

      {/* ── Pipeline Stage Filter ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Filter by Stage
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setStatusFilter('all')} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: statusFilter === 'all' ? '#292929' : '#f8fafc', color: statusFilter === 'all' ? '#fff' : '#64748b', borderColor: statusFilter === 'all' ? '#292929' : '#e2e8f0' }}>
            All ({partners.length})
          </button>
          {PARTNER_PIPELINE.map(s => {
            const cfg = PIPELINE_COLORS[s];
            const count = countStatus(s);
            return (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', textTransform: 'capitalize', background: statusFilter === s ? cfg.color : cfg.bg, color: statusFilter === s ? '#fff' : cfg.color, borderColor: statusFilter === s ? cfg.color : `${cfg.color}44` }}>
                {s} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Partner Type Filter ── */}
      {uniqueTypes.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Filter by Partner Type
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setTypeFilter('all')} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: typeFilter === 'all' ? '#292929' : '#f8fafc', color: typeFilter === 'all' ? '#fff' : '#64748b', borderColor: typeFilter === 'all' ? '#292929' : '#e2e8f0' }}>
              All Types
            </button>
            {uniqueTypes.map(t => {
              const cfg = PARTNER_TYPES[t] || { color: '#64748b', bg: '#f8fafc', icon: '🤝' };
              return (
                <button key={t} onClick={() => setTypeFilter(t)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: typeFilter === t ? cfg.color : cfg.bg, color: typeFilter === t ? '#fff' : cfg.color, borderColor: typeFilter === t ? cfg.color : `${cfg.color}44` }}>
                  {cfg.icon} {t}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Partner Cards Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid-3" style={{ gap: '20px', marginBottom: '40px' }}>
          {filtered.map(p => {
            const pType = partnerType(p);
            const ptCfg = PARTNER_TYPES[pType] || { color: '#64748b', bg: '#f8fafc', icon: '🤝' };
            const stCfg = PIPELINE_COLORS[p.status] || PIPELINE_COLORS.new;
            return (
              <div key={p.id} className="card" style={{ position: 'relative', padding: '24px', cursor: 'pointer', transition: 'all 0.2s', border: selected?.id === p.id ? '2px solid #FC6E20' : '1px solid var(--border)' }}
                onClick={() => { setSelected(p); setNotes(p.notes || ''); }}
              >
                {/* Type icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: ptCfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                    {ptCfg.icon}
                  </div>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: stCfg.color, background: stCfg.bg, border: `1px solid ${stCfg.color}22`, textTransform: 'capitalize' }}>
                    {p.status}
                  </span>
                </div>

                {/* Info */}
                <h3 style={{ fontSize: '16px', marginBottom: '4px', color: '#292929' }}>{p.name}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '2px', fontWeight: 600 }}>{company(p)}</p>
                <p style={{ color: ptCfg.color, fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>{ptCfg.icon} {pType}</p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>📍 {p.city || '—'}</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>⏳ {experience(p)}</span>
                </div>

                {p.message && (
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, borderTop: '1px solid var(--border)', paddingTop: '10px', marginBottom: '12px' }}>
                    {p.message.length > 80 ? p.message.slice(0, 80) + '…' : p.message}
                  </p>
                )}

                {/* Inline stage change */}
                <select
                  className="input"
                  style={{ padding: '5px 8px', fontSize: '12px', width: '100%', margin: 0 }}
                  value={p.status}
                  onClick={e => e.stopPropagation()}
                  onChange={e => { e.stopPropagation(); update(p.id, { status: e.target.value }); }}
                >
                  {PARTNER_PIPELINE.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🤝</div>
          <p>No partner applications found</p>
          <p className="text-muted text-sm" style={{ marginTop: '8px' }}>Partner applications from <a href="/partners" target="_blank" style={{ color: 'var(--accent)' }}>/partners</a> will appear here.</p>
        </div>
      )}

      {/* ── Detail Slide-Over Modal ── */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}
        >
          <div style={{ width: '100%', maxWidth: '520px', height: '100vh', background: 'white', overflowY: 'auto', boxShadow: '-20px 0 60px rgba(0,0,0,0.15)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Slide-over header */}
            <div style={{ padding: '28px 28px 0', borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px' }}>{selected.name}</h2>
                  <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0', fontWeight: 600 }}>{company(selected)}</p>
                </div>
                <button onClick={() => setSelected(null)} className="btn btn-ghost btn-sm">✕ Close</button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(() => {
                  const pType = partnerType(selected);
                  const cfg = PARTNER_TYPES[pType] || { color: '#64748b', bg: '#f8fafc', icon: '🤝' };
                  return (
                    <span style={{ padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: cfg.color, background: cfg.bg }}>{cfg.icon} {pType}</span>
                  );
                })()}
                <span style={{ padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: PIPELINE_COLORS[selected.status]?.color, background: PIPELINE_COLORS[selected.status]?.bg, textTransform: 'capitalize' }}>
                  {selected.status}
                </span>
              </div>
            </div>

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Contact Details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Contact Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    ['📞 Phone', selected.phone],
                    ['📧 Email', selected.email || '—'],
                    ['📍 City', selected.city || '—'],
                    ['⏳ Experience', experience(selected)],
                    ['📅 Applied', new Date(selected.created_at).toLocaleDateString('en-IN')],
                    ['🔗 Source', selected.source_page || '—'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>{k}</div>
                      <div style={{ fontWeight: 600, fontSize: '13px', wordBreak: 'break-all' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About them */}
              {selected.message && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>About Them</div>
                  <div style={{ padding: '14px', background: '#f0f9ff', borderRadius: '10px', borderLeft: '3px solid #0891b2', fontSize: '14px', lineHeight: 1.65, color: '#0c4a6e' }}>
                    {selected.message}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Internal Notes</div>
                <textarea
                  className="input"
                  style={{ margin: 0, minHeight: '80px' }}
                  placeholder="Add internal notes about this partner…"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  onBlur={() => { if (notes !== selected.notes) update(selected.id, { notes }); }}
                />
              </div>

              {/* Follow-up */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Follow-up Date</div>
                <input
                  type="date"
                  className="input"
                  style={{ margin: 0, maxWidth: '200px' }}
                  defaultValue={selected.follow_up_date ? selected.follow_up_date.split('T')[0] : ''}
                  onBlur={e => { if (e.target.value) update(selected.id, { follow_up_date: e.target.value }); }}
                />
              </div>

              {/* Stage update */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Update Stage</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {PARTNER_PIPELINE.map(s => {
                    const cfg = PIPELINE_COLORS[s];
                    const isActive = selected.status === s;
                    return (
                      <button key={s} onClick={() => { update(selected.id, { status: s }); setSelected(p => ({ ...p, status: s })); }}
                        style={{ padding: '8px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, border: '1px solid', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s', background: isActive ? cfg.color : cfg.bg, color: isActive ? '#fff' : cfg.color, borderColor: isActive ? cfg.color : `${cfg.color}44` }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rejection reason */}
              {selected.status === 'rejected' && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Rejection Reason</div>
                  <input
                    className="input"
                    style={{ margin: 0 }}
                    placeholder="Why was this application rejected?"
                    defaultValue={selected.lost_reason || ''}
                    onBlur={e => { if (e.target.value !== selected.lost_reason) update(selected.id, { lost_reason: e.target.value }); }}
                  />
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', paddingTop: '4px', flexWrap: 'wrap' }}>
                <a href={`/ops/partners/${selected.id}`} className="btn btn-primary" style={{ flex: '1 1 100%', justifyContent: 'center', marginBottom: '8px' }}>
                  Edit Full Profile
                </a>
                <a href={`tel:${selected.phone}`} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                  📞 Call
                </a>
                <a
                  href={`https://wa.me/91${selected.phone}?text=Hi ${encodeURIComponent(selected.name)}, this is Buildogram team regarding your partner application.`}
                  target="_blank" rel="noreferrer"
                  className="btn btn-ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  💬 WhatsApp
                </a>
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                    ✉️ Email
                  </a>
                )}
              </div>

              {saving && <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b' }}>Saving…</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
