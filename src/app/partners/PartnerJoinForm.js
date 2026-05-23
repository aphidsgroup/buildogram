'use client';
import { useState } from 'react';

const PARTNER_TYPES = ['Builder', 'Contractor', 'Architect', 'Structural Engineer', 'Interior Designer', 'Material Supplier', 'Real Estate Agent', 'Maintenance Vendor', '360 Tour Vendor', 'Legal Consultant'];

export default function PartnerJoinForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Chennai', company: '', partner_type: '', experience: '', message: '' });
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
          city: form.city,
          message: form.message,
          lead_type: 'partner_application',
          source_page: '/partners',
          source: 'website',
          metadata: { company: form.company, partner_type: form.partner_type, experience: form.experience },
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>🤝</div>
      <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Application Received!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our partner team will contact you within 24 hours to discuss onboarding.</p>
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
        <div>{label('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
        <div>{label('City')}<input className="input" placeholder="Chennai" value={form.city} onChange={set('city')} /></div>
      </div>
      <div>{label('Company / Business Name')}<input className="input" placeholder="Your business name" value={form.company} onChange={set('company')} /></div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>
          {label('Partner Type *')}
          <select required className="input" value={form.partner_type} onChange={set('partner_type')}>
            <option value="">Select type</option>
            {PARTNER_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          {label('Years of Experience')}
          <select className="input" value={form.experience} onChange={set('experience')}>
            <option value="">Select</option>
            <option>Less than 1 year</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>5–10 years</option>
            <option>10+ years</option>
          </select>
        </div>
      </div>
      <div>{label('Tell us about yourself')}<textarea className="input" rows={3} placeholder="Your work, past projects, service area..." value={form.message} onChange={set('message')} /></div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : '🤝 Apply to Join Partner Network'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
