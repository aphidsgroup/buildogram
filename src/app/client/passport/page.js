'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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

function CompletenessRing({ pct, size = 64 }) {
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
      <text x="50%" y="54%" textAnchor="middle" style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%', fontSize: size > 50 ? '14px' : '11px', fontWeight: 800, fill: color, fontFamily: 'Space Grotesk, sans-serif' }}>
        {pct}%
      </text>
    </svg>
  );
}

function ClientDocumentVault({ propertyId, property }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${propertyId}/documents`)
      .then(r => r.json())
      .then(d => { if(d.success) setDocs(d.documents); setLoading(false); });
  }, [propertyId]);

  if (loading) return <div style={{ fontSize: '13px', color: '#64748b' }}>Loading documents…</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {RECORD_SECTIONS.map(s => {
        const sectionDocs = docs.filter(d => d.section_key === s.key);
        const hasDocs = sectionDocs.length > 0;
        const isMarked = property[s.key]; // Boolean flag

        return (
          <div key={s.key} style={{ padding: '12px', background: isMarked || hasDocs ? '#f8fafc' : 'white', border: isMarked || hasDocs ? '1px solid #e2e8f0' : '1px dashed #e2e8f0', borderRadius: '8px', opacity: isMarked || hasDocs ? 1 : 0.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: hasDocs ? '12px' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{s.icon}</span>
                <span className="font-semibold">{s.label}</span>
              </div>
              {hasDocs ? (
                <span style={{ color: 'var(--primary)', fontSize: '11px', fontWeight: 700, padding: '2px 8px', background: 'rgba(37,99,235,0.1)', borderRadius: '999px' }}>{sectionDocs.length} FILE{sectionDocs.length > 1 ? 'S' : ''}</span>
              ) : isMarked ? (
                <span style={{ color: '#059669', fontSize: '12px', fontWeight: 700 }}>VERIFIED</span>
              ) : (
                <span className="text-muted text-xs">PENDING</span>
              )}
            </div>
            
            {hasDocs && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                {sectionDocs.map(doc => (
                  <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      📄 {doc.file_name}
                    </div>
                    <a href={doc.file_url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ padding: '4px 12px', fontSize: '12px', color: '#2563eb', background: '#eff6ff' }}>
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ClientPassport() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/client/passport')
      .then(r => r.json())
      .then(d => { setProperties(d.properties || []); setLoading(false); });
  }, []);

  if (loading) return <div className="flex-center" style={{ height: '60vh' }}><div className="spinner" /></div>;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <h1>My Property Passports 🛂</h1>
        <p className="text-muted mt-2">View and manage your permanent property records.</p>
      </div>

      {properties.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>🛂</div>
          <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>No Passports Found</h3>
          <p className="text-muted mb-6">Your Property Passport will appear here once Buildogram links your property record.</p>
        </div>
      ) : (
        <div className="grid-2" style={{ gap: '24px' }}>
          {properties.map(p => (
            <div key={p.id} className="card" style={{ padding: '28px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                <CompletenessRing pct={p.passport_completeness || 0} size={72} />
                <div>
                  <h2 style={{ fontSize: '20px', marginBottom: '4px', lineHeight: 1.3 }}>{p.title}</h2>
                  <p className="text-muted text-sm">📍 {p.locality ? p.locality + ', ' : ''}{p.city}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div className="text-muted text-xs font-semibold mb-1 uppercase tracking-wider">Property Type</div>
                  <div className="font-semibold capitalize">{p.property_type}</div>
                </div>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                  <div className="text-muted text-xs font-semibold mb-1 uppercase tracking-wider">Status</div>
                  <div className="font-semibold capitalize text-primary">{p.passport_status}</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div className="text-muted text-xs font-semibold mb-3 uppercase tracking-wider">Available Records</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {RECORD_SECTIONS.map(s => (
                    <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: p[s.key] ? 1 : 0.4 }}>
                      <span style={{ fontSize: '18px' }}>{s.icon}</span>
                      <span style={{ fontSize: '14px', fontWeight: p[s.key] ? 600 : 400, textDecoration: p[s.key] ? 'none' : 'line-through' }}>{s.label}</span>
                      {p[s.key] && <span style={{ color: '#059669', fontSize: '12px' }}>✓</span>}
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelected(p)}>
                View Full Passport →
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '40px', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', color: '#64748b' }}>✕</button>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '24px' }}>
              <CompletenessRing pct={selected.passport_completeness || 0} size={80} />
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '28px', marginBottom: '8px', lineHeight: 1.2 }}>{selected.title}</h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="badge badge-blue">{selected.passport_status}</span>
                  {selected.listing_type !== 'none' && (
                    <span className="badge badge-green capitalize">Listed for {selected.listing_type}</span>
                  )}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + '/passport/' + selected.id);
                      alert('Public link copied to clipboard!');
                    }}
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}
                  >
                    🔗 Copy Public Link
                  </button>
                </div>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '24px', marginBottom: '32px' }}>
              <div>
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Property Specs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    ['Location', selected.locality ? `${selected.locality}, ${selected.city}` : selected.city],
                    ['Plot Area', selected.plot_area_sqft ? `${selected.plot_area_sqft} sqft` : '—'],
                    ['Built-up', selected.built_up_area_sqft ? `${selected.built_up_area_sqft} sqft` : '—'],
                    ['Floors', selected.floors || '—'],
                    ['Built Year', selected.construction_year || '—'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border)' }}>
                      <span className="text-muted">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Document Vault</h3>
                <ClientDocumentVault propertyId={selected.id} property={selected} />
              </div>
            </div>

            <div style={{ background: 'var(--secondary)', color: 'white', padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>Want to list this property?</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Turn on rental or resale listing with your verified passport.</p>
              </div>
              <Link href="/contact" className="btn" style={{ background: 'var(--gradient-orange)', color: '#292929' }}>Contact Us</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
