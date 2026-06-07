'use client';
import { useState, useEffect } from 'react';
import { getAttributionPayload } from '@/lib/analytics/attribution';

export default function PassportLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Chennai', property_type: '', message: '' });
  const [status, setStatus] = useState('idle');

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lead_type: 'property_passport',
          source_page: '/property-passport',
          source: 'property_passport_page',
          attribution: getAttributionPayload(),
          metadata: { property_type: form.property_type },
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>🛂</div>
      <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Request Received!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our team will contact you within 24 hours to begin your Property Passport.</p>
    </div>
  );

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
          <input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone *</label>
          <input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} />
        </div>
      </div>
      <div>
        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
        <input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} />
      </div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>City</label>
          <input className="input" placeholder="Chennai" value={form.city} onChange={set('city')} />
        </div>
        <div>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Property Type</label>
          <select className="input" value={form.property_type} onChange={set('property_type')}>
            <option value="">Select type</option>
            <option>Under Construction Home</option>
            <option>Completed Home</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Commercial Property</option>
            <option>Plot</option>
          </select>
        </div>
      </div>
      <div>
        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What would you like to document?</label>
        <textarea className="input" rows={3} placeholder="Tell us about your property and what records you have..." value={form.message} onChange={set('message')} />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : '🛂 Create My Property Passport'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
