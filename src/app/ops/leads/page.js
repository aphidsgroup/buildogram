'use client';
import { useEffect, useState } from 'react';

/* ─── Constants ─────────────────────────────────────────── */
const STATUS_PIPELINE = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];

const LEAD_TYPE_LABELS = {
  construction:        { label: 'Construction',       color: '#2563eb', bg: '#eff6ff' },
  boq_audit:           { label: 'BOQ Audit',          color: '#7c3aed', bg: '#f5f3ff' },
  plan_review:         { label: 'Plan Review',        color: '#0891b2', bg: '#ecfeff' },
  material_quote:      { label: 'Materials',          color: '#d97706', bg: '#fffbeb' },
  partner_application: { label: 'Partner',            color: '#059669', bg: '#ecfdf5' },
  rental_listing:      { label: 'Rental Listing',     color: '#dc2626', bg: '#fef2f2' },
  resale_listing:      { label: 'Resale Listing',     color: '#db2777', bg: '#fdf2f8' },
  property_passport:   { label: 'Property Passport',  color: '#9333ea', bg: '#faf5ff' },
  maintenance:         { label: 'Maintenance',        color: '#ea580c', bg: '#fff7ed' },
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
  const [toast, setToast]       = useState(null); // { type, message, propertyId }

  const showToast = (msg, type = 'success', propertyId = null) => {
    setToast({ message: msg, type, propertyId });
    setTimeout(() => setToast(null), 6000);
  };

  const load = () => {
    setLoading(true);
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => { setLeads(d.leads || []); setLoading(false); });
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
    // Show toast if a property was auto-created
    if (d.auto_created_property) {
      showToast(
        `🛂 Property Passport created: "${d.auto_created_property.title}"`,
        'success',
        d.auto_created_property.id,
      );
      // Patch selected with property info
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

  /* ─── Filtering ────────────────────────────────────────── */
  const filtered = leads.filter(l => {
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchType   = typeFilter   === 'all' || l.lead_type === typeFilter;
    const matchSearch = !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search);
    return matchStatus && matchType && matchSearch;
  });

  /* ─── Counts ──────────────────────────────────────────── */
  const typeCount = type => leads.filter(l => l.lead_type === type).length;
  const statusCount = s => leads.filter(l => l.status === s).length;

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      {/* ── Header ── */}
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

      {/* ── Lead Type Filter ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Filter by Type
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setTypeFilter('all')}
            style={{
              padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              border: '1px solid', cursor: 'pointer',
              background: typeFilter === 'all' ? '#292929' : '#f8fafc',
              color:      typeFilter === 'all' ? '#fff' : '#64748b',
              borderColor: typeFilter === 'all' ? '#292929' : '#e2e8f0',
            }}
          >
            All ({leads.length})
          </button>
          {Object.entries(LEAD_TYPE_LABELS).map(([key, cfg]) => (
            <button key={key}
              onClick={() => setTypeFilter(key)}
              style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                border: '1px solid', cursor: 'pointer',
                background: typeFilter === key ? cfg.color : cfg.bg,
                color:      typeFilter === key ? '#fff' : cfg.color,
                borderColor: typeFilter === key ? cfg.color : `${cfg.color}44`,
              }}
            >
              {cfg.label} ({typeCount(key)})
            </button>
          ))}
        </div>
      </div>

      {/* ── Status Filter ── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Filter by Status
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatusFilter('all')}
            style={{
              padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              border: '1px solid #e2e8f0', cursor: 'pointer',
              background: statusFilter === 'all' ? '#292929' : '#f8fafc',
              color:      statusFilter === 'all' ? '#fff' : '#64748b',
            }}
          >
            All Statuses
          </button>
          {STATUS_PIPELINE.map(s => {
            const cfg = STATUS_COLORS[s] || {};
            return (
              <button key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                  border: '1px solid', cursor: 'pointer', textTransform: 'capitalize',
                  background: statusFilter === s ? cfg.color : cfg.bg,
                  color:      statusFilter === s ? '#fff' : cfg.color,
                  borderColor: statusFilter === s ? cfg.color : `${cfg.color}44`,
                }}
              >
                {s} ({statusCount(s)})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Type</th>
                <th>City</th>
                <th>Message / Details</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td style={{ fontWeight: 600 }}>{l.name}</td>
                  <td><a href={`tel:${l.phone}`} className="text-primary">{l.phone}</a></td>
                  <td>
                    <Badge value={l.lead_type || 'construction'} map={LEAD_TYPE_LABELS} />
                  </td>
                  <td className="text-muted">{l.city}{l.locality ? `, ${l.locality}` : ''}</td>
                  <td className="text-muted" style={{ maxWidth: '200px', fontSize: '12px' }}>
                    {l.message
                      ? <span title={l.message}>{l.message.length > 60 ? l.message.slice(0, 60) + '…' : l.message}</span>
                      : l.plot_area_sqft
                        ? `${l.plot_area_sqft} sqft · ${l.floors || ''}`
                        : '—'
                    }
                  </td>
                  <td><span style={{ fontSize: '11px', color: '#64748b' }}>{l.source_page || l.source || '—'}</span></td>
                  <td>
                    <select
                      className="input"
                      style={{ padding: '4px 8px', fontSize: '12px', width: 'auto' }}
                      value={l.status}
                      onChange={e => update(l.id, { status: e.target.value })}
                    >
                      {STATUS_PIPELINE.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="text-muted" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                    {new Date(l.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <button onClick={() => setSelected(l)} className="btn btn-ghost btn-sm">View</button>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan={9}>
                    <div className="empty-state">
                      <div className="empty-icon">🎯</div>
                      <p>No leads found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Lead Detail Modal ── */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
        }}>
          <div className="card" style={{ maxWidth: '580px', width: '100%', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}>

            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0 }}>{selected.name}</h3>
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Badge value={selected.lead_type || 'construction'} map={LEAD_TYPE_LABELS} />
                  <Badge value={selected.status || 'new'} map={
                    Object.fromEntries(STATUS_PIPELINE.map(s => [s, { label: s, ...STATUS_COLORS[s] }]))
                  } />
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="btn btn-ghost btn-sm">✕ Close</button>
            </div>

            {/* Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              {[
                ['Phone', selected.phone],
                ['Email', selected.email || '—'],
                ['City', selected.city],
                ['Locality', selected.locality || '—'],
                ['Source Page', selected.source_page || selected.source || '—'],
                ['Follow-up', selected.follow_up_date ? new Date(selected.follow_up_date).toLocaleDateString('en-IN') : '—'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '10px 12px', background: 'var(--bg-muted, #f8fafc)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Construction-specific fields */}
            {(selected.plot_area_sqft || selected.estimated_cost_min) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                {[
                  ['Plot Area', selected.plot_area_sqft ? `${selected.plot_area_sqft} sqft` : null],
                  ['Floors', selected.floors],
                  ['Spec Level', selected.spec_level],
                  ['Estimated Cost', selected.estimated_cost_min ? `${fmt(selected.estimated_cost_min)} – ${fmt(selected.estimated_cost_max)}` : null],
                ].filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ padding: '10px 12px', background: '#fffbeb', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{v}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Message */}
            {selected.message && (
              <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#f0f9ff', borderRadius: '8px', borderLeft: '3px solid #0891b2' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#0c4a6e', textTransform: 'uppercase', marginBottom: '6px' }}>Message</div>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{selected.message}</p>
              </div>
            )}

            {/* Notes */}
            {selected.notes && (
              <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Notes</div>
                <p style={{ margin: 0, fontSize: '14px' }}>{selected.notes}</p>
              </div>
            )}

            {/* Lost Reason */}
            {selected.status === 'lost' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Lost Reason</label>
                <input
                  className="input"
                  style={{ margin: 0 }}
                  defaultValue={selected.lost_reason || ''}
                  placeholder="Why was this lead lost?"
                  onBlur={e => { if (e.target.value !== selected.lost_reason) update(selected.id, { lost_reason: e.target.value }); }}
                />
              </div>
            )}

            {/* Follow-up Date */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Follow-up Date</label>
              <input
                type="date"
                className="input"
                style={{ margin: 0, maxWidth: '200px' }}
                defaultValue={selected.follow_up_date ? selected.follow_up_date.split('T')[0] : ''}
                onBlur={e => { if (e.target.value) update(selected.id, { follow_up_date: e.target.value }); }}
              />
            </div>

            {/* Status Update */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Update Status</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {STATUS_PIPELINE.map(s => {
                  const cfg = STATUS_COLORS[s] || {};
                  const isActive = selected.status === s;
                  return (
                    <button key={s}
                      onClick={() => { update(selected.id, { status: s }); setSelected(p => ({ ...p, status: s })); }}
                      style={{
                        padding: '7px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                        border: '1px solid', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s',
                        background: isActive ? cfg.color : cfg.bg,
                        color: isActive ? '#fff' : cfg.color,
                        borderColor: isActive ? cfg.color : `${cfg.color}44`,
                      }}>
                      {s}
                    </button>
                  );
                })}
              </div>
              {['property_passport','construction','boq_audit','plan_review'].includes(selected.lead_type) && selected.status !== 'won' && (
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>
                  💡 Marking as <strong>won</strong> will auto-create a Property Passport record.
                </p>
              )}
            </div>

            {/* Linked Property Passport */}
            {selected.property_id && (
              <div style={{ marginBottom: '20px', padding: '16px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #86efac' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>🛂 Linked Property Passport</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#292929', marginBottom: '6px' }}>{selected.property_title || 'Property Record'}</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {selected.property_passport_status && (
                    <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, background: '#d1fae5', color: '#059669', border: '1px solid #6ee7b7' }}>
                      {selected.property_passport_status}
                    </span>
                  )}
                  {selected.property_completeness !== undefined && (
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{selected.property_completeness}% complete</span>
                  )}
                  <a href="/ops/properties" target="_blank" rel="noreferrer"
                    style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#059669', textDecoration: 'none' }}>
                    View Passport →
                  </a>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={`tel:${selected.phone}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                📞 Call
              </a>
              <a
                href={`https://wa.me/91${selected.phone}?text=Hi ${encodeURIComponent(selected.name)}, this is Buildogram team.`}
                target="_blank" rel="noreferrer"
                className="btn btn-ghost"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                💬 WhatsApp
              </a>
            </div>

            {saving && (
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px', color: '#64748b' }}>Saving…</div>
            )}
          </div>
        </div>
      )}

      {/* ── Global Toast ── */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: toast.type === 'success' ? '#292929' : '#dc2626',
          color: 'white', borderRadius: '14px', padding: '14px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)', maxWidth: '380px',
          display: 'flex', gap: '12px', alignItems: 'flex-start',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>Property Passport Created ✅</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{toast.message}</div>
            {toast.propertyId && (
              <a href="/ops/properties" target="_blank" rel="noreferrer"
                style={{ fontSize: '12px', color: '#FFDA01', fontWeight: 700, marginTop: '6px', display: 'inline-block' }}>
                Open in Properties →
              </a>
            )}
          </div>
          <button onClick={() => setToast(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: 0 }}>×</button>
        </div>
      )}
    </div>
  );
}
