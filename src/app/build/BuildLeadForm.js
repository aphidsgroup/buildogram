'use client';
import { useState, useEffect } from 'react';
import { getAttributionPayload } from '@/lib/analytics/attribution';

export default function BuildLeadForm({ leadType = 'construction', sourcePage = '/build', ctaLabel = '🏗️ Get Free Consultation' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Chennai', locality: '', plot_area_sqft: '', floors: '', spec_level: '', message: '' });
  const [status, setStatus] = useState('idle');

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          city: form.city, locality: form.locality,
          plot_area_sqft: form.plot_area_sqft || null,
          floors: form.floors,
          spec_level: form.spec_level,
          message: form.message,
          lead_type: leadType,
          source_page: sourcePage,
          source: 'website',
          attribution: getAttributionPayload(),
          metadata: { plot_area_sqft: form.plot_area_sqft, floors: form.floors, spec_level: form.spec_level },
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
      <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Consultation Request Sent!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our team will contact you within 24 hours to discuss your project.</p>
    </div>
  );

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const label = text => <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{text}</label>;

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Full Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} /></div>
        <div>{label('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} /></div>
      </div>
      <div>{label('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('City')}<input className="input" placeholder="Chennai" value={form.city} onChange={set('city')} /></div>
        <div>{label('Locality')}<input className="input" placeholder="Porur, Anna Nagar…" value={form.locality} onChange={set('locality')} /></div>
      </div>
      <div className="grid-3" style={{ gap: '16px' }}>
        <div>{label('Plot Area (sqft)')}<input type="number" className="input" placeholder="1200" value={form.plot_area_sqft} onChange={set('plot_area_sqft')} /></div>
        <div>{label('Floors')}<select className="input" value={form.floors} onChange={set('floors')}><option value="">Select</option><option>G</option><option>G+1</option><option>G+2</option><option>G+3</option><option>G+4</option></select></div>
        <div>{label('Spec Level')}<select className="input" value={form.spec_level} onChange={set('spec_level')}><option value="">Select</option><option value="basic">Basic</option><option value="standard">Standard</option><option value="premium">Premium</option></select></div>
      </div>
      <div>{label('Your requirement')}<textarea className="input" rows={3} placeholder="Tell us about your project..." value={form.message} onChange={set('message')} /></div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : ctaLabel}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
