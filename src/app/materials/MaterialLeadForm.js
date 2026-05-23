'use client';
import { useState } from 'react';

const MATERIAL_TYPES = ['Cement', 'Steel / TMT', 'Sand', 'M-Sand', 'Solid Blocks', 'Red Bricks', 'Electrical Materials', 'Plumbing Materials', 'Tiles', 'Paint', 'Doors & Windows', 'Other'];

export default function MaterialLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Chennai', locality: '', materials: [], delivery_date: '', message: '' });
  const [status, setStatus] = useState('idle');

  const toggleMaterial = m => setForm(p => ({
    ...p,
    materials: p.materials.includes(m) ? p.materials.filter(x => x !== m) : [...p.materials, m],
  }));

  const submit = async e => {
    e.preventDefault();
    if (form.materials.length === 0) { alert('Please select at least one material type.'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          city: form.city, locality: form.locality,
          message: form.message,
          lead_type: 'material_quote',
          source_page: '/materials',
          source: 'website',
          metadata: { materials: form.materials, delivery_date: form.delivery_date },
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>📦</div>
      <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Quote Request Sent!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our material team will share competitive quotes within 24 hours.</p>
    </div>
  );

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const label = t => <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</label>;

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Full Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} /></div>
        <div>{label('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} /></div>
      </div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('City')}<input className="input" placeholder="Chennai" value={form.city} onChange={set('city')} /></div>
        <div>{label('Locality')}<input className="input" placeholder="Porur, Tambaram…" value={form.locality} onChange={set('locality')} /></div>
      </div>

      <div>
        {label('Materials Required *')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
          {MATERIAL_TYPES.map(m => (
            <button key={m} type="button"
              onClick={() => toggleMaterial(m)}
              style={{
                padding: '8px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                border: '1px solid',
                background: form.materials.includes(m) ? '#FFDA01' : 'rgba(255,255,255,0.05)',
                color: form.materials.includes(m) ? '#292929' : 'rgba(255,255,255,0.7)',
                borderColor: form.materials.includes(m) ? '#FFDA01' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{m}</button>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Required By (approx.)')}<input type="date" className="input" value={form.delivery_date} onChange={set('delivery_date')} /></div>
        <div>{label('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
      </div>

      <div>{label('Additional Details')}<textarea className="input" rows={3} placeholder="Quantity, brand preference, project details..." value={form.message} onChange={set('message')} /></div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : '📦 Request Material Quote'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
