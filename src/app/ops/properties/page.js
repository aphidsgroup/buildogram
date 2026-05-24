'use client';
import { useEffect, useState, useCallback } from 'react';

/* ─── Constants ─────────────────────────────────────────────── */
const PASSPORT_STAGES = ['pending', 'collecting', 'verifying', 'active', 'archived'];
const LISTING_TYPES   = ['none', 'rental', 'resale'];
const PROPERTY_TYPES  = ['home', 'villa', 'apartment', 'commercial', 'plot', 'other'];

const PASSPORT_COLORS = {
  pending:    { color: '#64748b', bg: '#f8fafc', label: '⏳ Pending' },
  collecting: { color: '#d97706', bg: '#fffbeb', label: '📂 Collecting' },
  verifying:  { color: '#7c3aed', bg: '#f5f3ff', label: '🔍 Verifying' },
  active:     { color: '#059669', bg: '#ecfdf5', label: '✅ Active' },
  archived:   { color: '#374151', bg: '#f3f4f6', label: '📦 Archived' },
};

const LISTING_COLORS = {
  none:    { color: '#64748b', bg: '#f8fafc' },
  rental:  { color: '#2563eb', bg: '#eff6ff' },
  resale:  { color: '#dc2626', bg: '#fef2f2' },
};

const RECORD_SECTIONS = [
  { key: 'has_legal_docs',        icon: '📄', label: 'Legal Docs' },
  { key: 'has_drawings',          icon: '📐', label: 'Drawings' },
  { key: 'has_boq',               icon: '📊', label: 'BOQ' },
  { key: 'has_materials',         icon: '🧱', label: 'Materials' },
  { key: 'has_quality_checks',    icon: '✅', label: 'Quality' },
  { key: 'has_progress_media',    icon: '📸', label: 'Media' },
  { key: 'has_warranty',          icon: '🔒', label: 'Warranty' },
  { key: 'has_maintenance_history', icon: '🔧', label: 'Maintenance' },
];

const fmt = n => n ? '₹' + (n >= 10000000 ? (n/10000000).toFixed(1)+'Cr' : n >= 100000 ? (n/100000).toFixed(1)+'L' : Number(n).toLocaleString('en-IN')) : '—';

/* ─── Completeness Ring ─────────────────────────────────────── */
function CompletenessRing({ pct, size = 52 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const fill = circ - (pct / 100) * circ;
  const color = pct >= 80 ? '#059669' : pct >= 50 ? '#d97706' : '#dc2626';
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth="6" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="6" fill="none"
        strokeDasharray={circ} strokeDashoffset={fill} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text x="50%" y="54%" textAnchor="middle" style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fontSize: '11px', fontWeight: 800, fill: color, fontFamily: 'Space Grotesk, sans-serif' }}>
        {pct}%
      </text>
    </svg>
  );
}

/* ─── Pill Badge ─────────────────────────────────────────────── */
function Pill({ value, map }) {
  const cfg = map[value] || { color: '#64748b', bg: '#f1f5f9', label: value };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}22`, whiteSpace: 'nowrap' }}>
      {cfg.label || value}
    </span>
  );
}

/* ─── Document Manager ──────────────────────────────────────── */
function DocumentManager({ propertyId, onDocUploaded }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ section_key: 'has_legal_docs', file_name: '', visibility: 'ops_only', file: null });

  const load = useCallback(() => {
    fetch(`/api/properties/${propertyId}/documents`)
      .then(r => r.json())
      .then(d => { if (d.success) setDocs(d.documents); setLoading(false); });
  }, [propertyId]);

  useEffect(() => { load(); }, [load]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.file) return alert('Select a file');
    setUploading(true);
    
    // 1. Upload to Cloudinary
    const fd = new FormData();
    fd.append('file', form.file);
    fd.append('folder', 'buildogram_passport');
    const resFile = await fetch('/api/upload', { method: 'POST', body: fd });
    const dFile = await resFile.json();
    
    if (!dFile.url) { alert('File upload failed'); setUploading(false); return; }

    // 2. Save document record
    const resDoc = await fetch(`/api/properties/${propertyId}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_key: form.section_key,
        file_name: form.file_name || form.file.name,
        file_url: dFile.url,
        file_type: form.file.type,
        file_size: form.file.size,
        visibility: form.visibility
      })
    });
    
    const dDoc = await resDoc.json();
    if (dDoc.success) {
      setForm({ ...form, file_name: '', file: null });
      if (onDocUploaded) onDocUploaded(form.section_key);
      load();
    } else alert(dDoc.error);
    setUploading(false);
  };

  const del = async (docId) => {
    if(!confirm('Delete document?')) return;
    await fetch(`/api/properties/${propertyId}/documents/${docId}`, { method: 'DELETE' });
    load();
  };

  return (
    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Document Vault</div>
      
      {/* Upload Form */}
      <form onSubmit={handleUpload} style={{ display: 'grid', gap: '8px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select className="input" style={{ flex: 1, margin: 0, padding: '6px' }} value={form.section_key} onChange={e => setForm({...form, section_key: e.target.value})}>
            {RECORD_SECTIONS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
          <select className="input" style={{ flex: 1, margin: 0, padding: '6px' }} value={form.visibility} onChange={e => setForm({...form, visibility: e.target.value})}>
            <option value="ops_only">🔒 Ops Only</option>
            <option value="client_visible">👁️ Client Visible</option>
          </select>
        </div>
        <input type="text" className="input" placeholder="File Name (Optional)" value={form.file_name} onChange={e => setForm({...form, file_name: e.target.value})} style={{ margin: 0, padding: '6px' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="file" className="input" style={{ flex: 2, margin: 0, padding: '4px' }} onChange={e => setForm({...form, file: e.target.files[0]})} />
          <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '6px' }} disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>
      </form>

      {/* File List */}
      {loading ? <div style={{ fontSize: '12px', color: '#64748b' }}>Loading docs…</div> : docs.length === 0 ? <div style={{ fontSize: '12px', color: '#64748b' }}>No documents uploaded.</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {docs.map(doc => {
            const sec = RECORD_SECTIONS.find(s => s.key === doc.section_key);
            return (
              <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{doc.file_name}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', gap: '6px' }}>
                    <span>{sec?.icon} {sec?.label}</span>
                    <span style={{ color: doc.visibility === 'client_visible' ? '#059669' : '#dc2626' }}>{doc.visibility === 'client_visible' ? '👁️ Client' : '🔒 Ops'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <a href={doc.file_url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: '4px' }}>👁️</a>
                  <button onClick={() => del(doc.id)} className="btn btn-ghost btn-sm" style={{ padding: '4px', color: '#dc2626' }}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── New Property Form ─────────────────────────────────────── */
function NewPropertyModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    title: '', property_type: 'home', owner_name: '', owner_phone: '', owner_email: '',
    city: 'Chennai', locality: '', address: '', pincode: '',
    plot_area_sqft: '', built_up_area_sqft: '', floors: '', bedrooms: '', bathrooms: '',
    construction_year: '', passport_status: 'pending',
    listing_type: 'none', listing_price: '', listing_rent_monthly: '',
    notes: '',
    has_legal_docs: false, has_drawings: false, has_boq: false, has_materials: false,
    has_quality_checks: false, has_progress_media: false, has_warranty: false, has_maintenance_history: false,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const toggle = k => setForm(p => ({ ...p, [k]: !p[k] }));

  const submit = async e => {
    e.preventDefault();
    setSaving(true); setErr('');
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          plot_area_sqft: form.plot_area_sqft || null,
          built_up_area_sqft: form.built_up_area_sqft || null,
          bedrooms: form.bedrooms || null,
          bathrooms: form.bathrooms || null,
          construction_year: form.construction_year || null,
          listing_price: form.listing_price || null,
          listing_rent_monthly: form.listing_rent_monthly || null,
        }),
      });
      const d = await res.json();
      if (d.success) { onSaved(); onClose(); }
      else setErr(d.error || 'Failed to save');
    } catch (ex) { setErr(ex.message); }
    setSaving(false);
  };

  const lbl = t => <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t}</label>;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}
      onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '560px', height: '100vh', background: 'white', overflowY: 'auto', boxShadow: '-20px 0 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '28px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Add Property</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>Create a new Property Passport record</p>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>

        <form onSubmit={submit} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Title */}
          <div>{lbl('Property Title *')}<input required className="input" style={{ margin: 0 }} placeholder="e.g. 2400 sqft G+1 Home, Porur" value={form.title} onChange={set('title')} /></div>

          {/* Type + Status */}
          <div className="grid-2" style={{ gap: '12px' }}>
            <div>{lbl('Property Type')}
              <select className="input" style={{ margin: 0 }} value={form.property_type} onChange={set('property_type')}>
                {PROPERTY_TYPES.map(t => <option key={t} style={{ textTransform: 'capitalize' }}>{t}</option>)}
              </select>
            </div>
            <div>{lbl('Passport Status')}
              <select className="input" style={{ margin: 0 }} value={form.passport_status} onChange={set('passport_status')}>
                {PASSPORT_STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Owner */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Owner Details</div>
            <div className="grid-2" style={{ gap: '12px' }}>
              <div>{lbl('Owner Name *')}<input required className="input" style={{ margin: 0 }} placeholder="Full name" value={form.owner_name} onChange={set('owner_name')} /></div>
              <div>{lbl('Phone *')}<input required className="input" style={{ margin: 0 }} placeholder="10-digit" value={form.owner_phone} onChange={set('owner_phone')} /></div>
            </div>
            <div style={{ marginTop: '12px' }}>{lbl('Email')}<input type="email" className="input" style={{ margin: 0 }} placeholder="owner@email.com" value={form.owner_email} onChange={set('owner_email')} /></div>
          </div>

          {/* Location */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Location</div>
            <div className="grid-2" style={{ gap: '12px' }}>
              <div>{lbl('City')}<input className="input" style={{ margin: 0 }} value={form.city} onChange={set('city')} /></div>
              <div>{lbl('Locality')}<input className="input" style={{ margin: 0 }} placeholder="Porur, Anna Nagar…" value={form.locality} onChange={set('locality')} /></div>
            </div>
            <div style={{ marginTop: '12px' }}>{lbl('Address')}<input className="input" style={{ margin: 0 }} placeholder="Full address" value={form.address} onChange={set('address')} /></div>
          </div>

          {/* Specs */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Property Specs</div>
            <div className="grid-3" style={{ gap: '12px' }}>
              <div>{lbl('Plot (sqft)')}<input type="number" className="input" style={{ margin: 0 }} placeholder="1200" value={form.plot_area_sqft} onChange={set('plot_area_sqft')} /></div>
              <div>{lbl('Built-up (sqft)')}<input type="number" className="input" style={{ margin: 0 }} placeholder="2400" value={form.built_up_area_sqft} onChange={set('built_up_area_sqft')} /></div>
              <div>{lbl('Floors')}<select className="input" style={{ margin: 0 }} value={form.floors} onChange={set('floors')}><option value="">Select</option>{['G','G+1','G+2','G+3','G+4'].map(f => <option key={f}>{f}</option>)}</select></div>
            </div>
            <div className="grid-3" style={{ gap: '12px', marginTop: '12px' }}>
              <div>{lbl('Bedrooms')}<input type="number" className="input" style={{ margin: 0 }} placeholder="3" value={form.bedrooms} onChange={set('bedrooms')} /></div>
              <div>{lbl('Bathrooms')}<input type="number" className="input" style={{ margin: 0 }} placeholder="2" value={form.bathrooms} onChange={set('bathrooms')} /></div>
              <div>{lbl('Built Year')}<input type="number" className="input" style={{ margin: 0 }} placeholder="2023" value={form.construction_year} onChange={set('construction_year')} /></div>
            </div>
          </div>

          {/* Passport Sections */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Passport Sections Available</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {RECORD_SECTIONS.map(s => (
                <button key={s.key} type="button" onClick={() => toggle(s.key)}
                  style={{ padding: '8px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                    background: form[s.key] ? '#292929' : '#f8fafc',
                    color: form[s.key] ? '#CCFF00' : '#64748b',
                    borderColor: form[s.key] ? '#292929' : '#e2e8f0',
                  }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listing */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Listing (Optional)</div>
            <div className="grid-2" style={{ gap: '12px' }}>
              <div>{lbl('Listing Type')}
                <select className="input" style={{ margin: 0 }} value={form.listing_type} onChange={set('listing_type')}>
                  {LISTING_TYPES.map(t => <option key={t} style={{ textTransform: 'capitalize' }}>{t}</option>)}
                </select>
              </div>
              {form.listing_type === 'resale' && <div>{lbl('Asking Price')}<input type="number" className="input" style={{ margin: 0 }} placeholder="₹ amount" value={form.listing_price} onChange={set('listing_price')} /></div>}
              {form.listing_type === 'rental' && <div>{lbl('Monthly Rent')}<input type="number" className="input" style={{ margin: 0 }} placeholder="₹ per month" value={form.listing_rent_monthly} onChange={set('listing_rent_monthly')} /></div>}
            </div>
          </div>

          {/* Notes */}
          <div>{lbl('Internal Notes')}<textarea className="input" style={{ margin: 0 }} rows={2} placeholder="Any additional notes…" value={form.notes} onChange={set('notes')} /></div>

          {err && <p style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>{err}</p>}

          <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
            <button type="submit" className="btn btn-primary" disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
              {saving ? 'Saving…' : '🛂 Create Property Passport'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function OpsProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [passportFilter, setPassportFilter] = useState('all');
  const [listingFilter, setListingFilter]   = useState('all');
  const [search, setSearch]         = useState('');
  const [selected, setSelected]     = useState(null);
  const [showNew, setShowNew]       = useState(false);
  const [saving, setSaving]         = useState(false);
  const [view, setView]             = useState('grid'); // 'grid' | 'table'
  const [clients, setClients]       = useState([]);

  useEffect(() => {
    fetch('/api/properties/clients').then(r => r.json()).then(d => {
      if(d.success) setClients(d.clients);
    });
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/properties')
      .then(r => r.json())
      .then(d => { setProperties(d.properties || []); setLoading(false); });
  }, []);

  useEffect(() => { load(); }, [load]);

  const update = async (id, data) => {
    setSaving(true);
    const res = await fetch(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const d = await res.json();
    setSaving(false);
    load();
    if (selected?.id === id) setSelected(p => ({ ...p, ...data, ...(d.property || {}) }));
  };

  /* ─── Filter ─── */
  const filtered = properties.filter(p => {
    const matchPassport = passportFilter === 'all' || p.passport_status === passportFilter;
    const matchListing  = listingFilter  === 'all' || p.listing_type   === listingFilter;
    const matchSearch   = !search
      || p.owner_name?.toLowerCase().includes(search.toLowerCase())
      || p.owner_phone?.includes(search)
      || p.title?.toLowerCase().includes(search.toLowerCase())
      || p.locality?.toLowerCase().includes(search.toLowerCase());
    return matchPassport && matchListing && matchSearch;
  });

  /* ─── Stats ─── */
  const countPassport = s => properties.filter(p => p.passport_status === s).length;
  const avgCompleteness = properties.length
    ? Math.round(properties.reduce((acc, p) => acc + (p.passport_completeness || 0), 0) / properties.length)
    : 0;

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      {/* ── Header ── */}
      <div className="page-header flex-between" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0 }}>Property Passport™</h1>
          <p className="text-muted mt-2">{properties.length} properties · {filtered.length} shown</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input className="input" style={{ maxWidth: '240px', margin: 0 }} placeholder="Search name, phone, title…" value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ display: 'flex', gap: '4px', border: '1px solid var(--border)', borderRadius: '8px', padding: '3px', background: '#f8fafc' }}>
            {['grid', 'table'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', background: view === v ? '#292929' : 'transparent', color: view === v ? 'white' : '#64748b' }}>
                {v === 'grid' ? '⊞' : '☰'}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => setShowNew(true)}>+ Add Property</button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid-4 mb-8">
        {[
          { icon: '🏠', label: 'Total Properties', value: properties.length, color: 'rgba(37,99,235,0.12)' },
          { icon: '✅', label: 'Active Passports', value: countPassport('active'), color: 'rgba(5,150,105,0.12)' },
          { icon: '📊', label: 'Avg Completeness', value: `${avgCompleteness}%`, color: 'rgba(124,58,237,0.12)' },
          { icon: '🏡', label: 'Listed Properties', value: properties.filter(p => p.listing_type !== 'none').length, color: 'rgba(220,38,38,0.12)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex-between mb-4"><div className="stat-icon" style={{ background: s.color }}>{s.icon}</div></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Passport Status Filter ── */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Passport Stage</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setPassportFilter('all')} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: passportFilter === 'all' ? '#292929' : '#f8fafc', color: passportFilter === 'all' ? '#fff' : '#64748b', borderColor: passportFilter === 'all' ? '#292929' : '#e2e8f0' }}>
            All ({properties.length})
          </button>
          {PASSPORT_STAGES.map(s => {
            const cfg = PASSPORT_COLORS[s];
            return (
              <button key={s} onClick={() => setPassportFilter(s)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: passportFilter === s ? cfg.color : cfg.bg, color: passportFilter === s ? '#fff' : cfg.color, borderColor: passportFilter === s ? cfg.color : `${cfg.color}44` }}>
                {cfg.label} ({countPassport(s)})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Listing Type Filter ── */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Listing</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[['all', 'All', '#292929', '#f8fafc'], ['none', '🚫 Unlisted', '#64748b', '#f8fafc'], ['rental', '🔑 Rental', '#2563eb', '#eff6ff'], ['resale', '💰 Resale', '#dc2626', '#fef2f2']].map(([val, lbl, color, bg]) => (
            <button key={val} onClick={() => setListingFilter(val)} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', background: listingFilter === val ? color : bg, color: listingFilter === val ? '#fff' : color, borderColor: listingFilter === val ? color : `${color}44` }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content: Grid or Table ── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛂</div>
          <p>No properties found</p>
          <p className="text-muted text-sm" style={{ marginTop: '8px' }}>Add a property to start building its Passport.</p>
          <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setShowNew(true)}>+ Add Property</button>
        </div>
      ) : view === 'grid' ? (
        /* ── Card Grid ── */
        <div className="grid-3" style={{ gap: '20px' }}>
          {filtered.map(p => {
            const psCfg = PASSPORT_COLORS[p.passport_status] || PASSPORT_COLORS.pending;
            const completedSections = RECORD_SECTIONS.filter(s => p[s.key]).length;
            return (
              <div key={p.id} className="card" style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.2s', border: selected?.id === p.id ? '2px solid #CCFF00' : '1px solid var(--border)' }}
                onClick={() => setSelected(p)}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <CompletenessRing pct={p.passport_completeness || 0} />
                  <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: psCfg.color, background: psCfg.bg, marginLeft: '8px' }}>{psCfg.label}</span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', color: '#292929', lineHeight: 1.35 }}>{p.title}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '2px', fontWeight: 600 }}>{p.owner_name} · {p.owner_phone}</p>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '14px' }}>
                  📍 {p.locality ? `${p.locality}, ` : ''}{p.city}
                  {p.plot_area_sqft ? ` · ${p.plot_area_sqft} sqft` : ''}
                  {p.floors ? ` · ${p.floors}` : ''}
                </p>

                {/* Sections mini-bar */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  {RECORD_SECTIONS.map(s => (
                    <span key={s.key} title={s.label} style={{ fontSize: '16px', opacity: p[s.key] ? 1 : 0.2, transition: 'opacity 0.2s' }}>{s.icon}</span>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>{completedSections}/{RECORD_SECTIONS.length} sections documented</div>

                {/* Listing badge */}
                {p.listing_type !== 'none' && (
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: LISTING_COLORS[p.listing_type]?.color, background: LISTING_COLORS[p.listing_type]?.bg, textTransform: 'capitalize' }}>
                      {p.listing_type === 'rental' ? '🔑 For Rent' : '💰 For Sale'} · {p.listing_type === 'rental' ? fmt(p.listing_rent_monthly) + '/mo' : fmt(p.listing_price)}
                    </span>
                  </div>
                )}

                {/* Stage select */}
                <select className="input" style={{ padding: '5px 8px', fontSize: '12px', width: '100%', margin: 0 }}
                  value={p.passport_status}
                  onClick={e => e.stopPropagation()}
                  onChange={e => { e.stopPropagation(); update(p.id, { passport_status: e.target.value }); }}>
                  {PASSPORT_STAGES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Table View ── */
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="w-full overflow-x-auto">
            <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
              <thead>
                <tr>
                  <th>Property</th><th>Owner</th><th>Location</th><th>Type</th>
                  <th>Completeness</th><th>Passport</th><th>Listing</th><th>Date</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const psCfg = PASSPORT_COLORS[p.passport_status] || PASSPORT_COLORS.pending;
                  return (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600, maxWidth: '200px' }}>
                        <div style={{ lineHeight: 1.3 }}>{p.title}</div>
                        {p.plot_area_sqft && <div style={{ fontSize: '11px', color: '#64748b' }}>{p.plot_area_sqft} sqft {p.floors || ''}</div>}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '13px' }}>{p.owner_name}</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{p.owner_phone}</div>
                      </td>
                      <td className="text-muted" style={{ fontSize: '13px' }}>{p.locality ? `${p.locality}, ` : ''}{p.city}</td>
                      <td><span style={{ fontSize: '12px', textTransform: 'capitalize', color: '#292929', fontWeight: 600 }}>{p.property_type}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '60px', height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${p.passport_completeness || 0}%`, background: (p.passport_completeness || 0) >= 80 ? '#059669' : (p.passport_completeness || 0) >= 50 ? '#d97706' : '#dc2626', borderRadius: '99px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#292929' }}>{p.passport_completeness || 0}%</span>
                        </div>
                      </td>
                      <td><span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: psCfg.color, background: psCfg.bg }}>{psCfg.label}</span></td>
                      <td>
                        {p.listing_type === 'none'
                          ? <span style={{ color: '#94a3b8', fontSize: '12px' }}>Unlisted</span>
                          : <span style={{ fontSize: '12px', fontWeight: 600, color: LISTING_COLORS[p.listing_type]?.color }}>{p.listing_type === 'rental' ? '🔑 Rental' : '💰 Resale'}</span>
                        }
                      </td>
                      <td className="text-muted" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>{new Date(p.created_at).toLocaleDateString('en-IN')}</td>
                      <td><button onClick={() => setSelected(p)} className="btn btn-ghost btn-sm">View</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Detail Slide-Over ── */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          onClick={() => setSelected(null)}>
          <div style={{ width: '100%', maxWidth: '540px', height: '100vh', background: 'white', overflowY: 'auto', boxShadow: '-20px 0 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div style={{ padding: '28px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <CompletenessRing pct={selected.passport_completeness || 0} size={56} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: '18px', lineHeight: 1.3 }}>{selected.title}</h2>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>{selected.owner_name} · {selected.owner_phone}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="btn btn-ghost btn-sm">✕</button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: PASSPORT_COLORS[selected.passport_status]?.color, background: PASSPORT_COLORS[selected.passport_status]?.bg }}>
                  {PASSPORT_COLORS[selected.passport_status]?.label}
                </span>
                {selected.listing_type !== 'none' && (
                  <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: LISTING_COLORS[selected.listing_type]?.color, background: LISTING_COLORS[selected.listing_type]?.bg, textTransform: 'capitalize' }}>
                    {selected.listing_type === 'rental' ? '🔑 For Rent' : '💰 For Sale'}
                  </span>
                )}
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + '/passport/' + selected.id);
                    alert('Public link copied to clipboard!');
                  }}
                  style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}
                >
                  🔗 Copy Public Link
                </button>
              </div>
            </div>

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Property details */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Property Details</div>
                <div className="grid-2" style={{ gap: '8px' }}>
                  {[
                    ['Type', selected.property_type],
                    ['Location', `${selected.locality ? selected.locality + ', ' : ''}${selected.city}`],
                    ['Plot Area', selected.plot_area_sqft ? `${selected.plot_area_sqft} sqft` : null],
                    ['Built-up', selected.built_up_area_sqft ? `${selected.built_up_area_sqft} sqft` : null],
                    ['Floors', selected.floors],
                    ['BHK', selected.bedrooms ? `${selected.bedrooms}BHK · ${selected.bathrooms || '?'} baths` : null],
                    ['Built Year', selected.construction_year],
                    ['Email', selected.owner_email],
                  ].filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', marginBottom: '3px', textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ fontWeight: 600, fontSize: '13px', textTransform: 'capitalize' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passport sections */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Passport Sections</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {RECORD_SECTIONS.map(s => (
                    <button key={s.key} onClick={() => update(selected.id, { [s.key]: !selected[s.key] })}
                      style={{ padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                        background: selected[s.key] ? '#292929' : '#f8fafc',
                        color: selected[s.key] ? '#CCFF00' : '#64748b',
                        borderColor: selected[s.key] ? '#292929' : '#e2e8f0',
                      }}>
                      {s.icon} {s.label}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
                  Click sections to toggle. Completeness auto-updates.
                </div>
              </div>

              {/* Passport stage update */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Update Passport Stage</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {PASSPORT_STAGES.map(s => {
                    const cfg = PASSPORT_COLORS[s];
                    const isActive = selected.passport_status === s;
                    return (
                      <button key={s} onClick={() => { update(selected.id, { passport_status: s }); setSelected(p => ({ ...p, passport_status: s })); }}
                        style={{ padding: '7px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                          background: isActive ? cfg.color : cfg.bg,
                          color: isActive ? '#fff' : cfg.color,
                          borderColor: isActive ? cfg.color : `${cfg.color}44`,
                        }}>
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Listing update */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Listing Status</div>
                <div className="grid-2" style={{ gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Listing Type</label>
                    <select className="input" style={{ margin: 0 }} value={selected.listing_type || 'none'}
                      onChange={e => { update(selected.id, { listing_type: e.target.value }); setSelected(p => ({ ...p, listing_type: e.target.value })); }}>
                      {LISTING_TYPES.map(t => <option key={t} style={{ textTransform: 'capitalize' }}>{t}</option>)}
                    </select>
                  </div>
                  {selected.listing_type === 'resale' && (
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Asking Price (₹)</label>
                      <input type="number" className="input" style={{ margin: 0 }} defaultValue={selected.listing_price || ''}
                        onBlur={e => { if (e.target.value) update(selected.id, { listing_price: e.target.value }); }} />
                    </div>
                  )}
                  {selected.listing_type === 'rental' && (
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Monthly Rent (₹)</label>
                      <input type="number" className="input" style={{ margin: 0 }} defaultValue={selected.listing_rent_monthly || ''}
                        onBlur={e => { if (e.target.value) update(selected.id, { listing_rent_monthly: e.target.value }); }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Client Assignment */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>Client Portal Access</div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '4px' }}>Assign Client User</label>
                  <select className="input" style={{ margin: 0 }} value={selected.owner_user_id || ''}
                    onChange={e => {
                      const val = e.target.value || null;
                      update(selected.id, { owner_user_id: val });
                      setSelected(p => ({ ...p, owner_user_id: val }));
                    }}>
                    <option value="">Unassigned (Not visible to any client)</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.phone || c.email})</option>)}
                  </select>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>Only the assigned user can see this property in their client portal.</p>
                </div>
              </div>

              {/* Document Manager */}
              <DocumentManager propertyId={selected.id} onDocUploaded={(section_key) => {
                if (!selected[section_key]) {
                  update(selected.id, { [section_key]: true });
                }
              }} />

              {/* Notes */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Internal Notes</div>
                <textarea className="input" style={{ margin: 0, minHeight: '70px' }} defaultValue={selected.notes || ''}
                  onBlur={e => { if (e.target.value !== selected.notes) update(selected.id, { notes: e.target.value }); }}
                  placeholder="Add notes about this property…" />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${selected.owner_phone}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>📞 Call Owner</a>
                <a href={`https://wa.me/91${selected.owner_phone}?text=Hi ${encodeURIComponent(selected.owner_name)}, this is Buildogram team regarding your Property Passport.`}
                  target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>💬 WhatsApp</a>
              </div>
              {saving && <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748b' }}>Saving…</div>}
            </div>
          </div>
        </div>
      )}

      {/* ── New Property Modal ── */}
      {showNew && <NewPropertyModal onClose={() => setShowNew(false)} onSaved={load} />}
    </div>
  );
}
