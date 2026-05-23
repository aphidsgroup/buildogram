
'use client';
import { useState } from 'react';

export default function BOQAuditForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: 'Chennai', locality: '',
    contractor_quote: '', plot_area_sqft: '', floors: '',
    has_drawings: '', message: '',
  });
  const [status, setStatus] = useState('idle');

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

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
          message: form.message,
          lead_type: 'boq_audit',
          source_page: '/boq-audit',
          source: 'website',
          metadata: {
            contractor_quote_amount: form.contractor_quote,
            has_drawings: form.has_drawings,
            plot_area_sqft: form.plot_area_sqft,
            floors: form.floors,
          },
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
      <h3 style={{ color: 'white', fontSize: '22px', marginBottom: '12px' }}>BOQ Audit Request Received!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.6 }}>
        Our team will contact you within 24 hours. We'll review your contractor quote and highlight every discrepancy.
      </p>
    </div>
  );

  const lbl = t => (
    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {t}
    </label>
  );

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>{lbl('Full Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} /></div>
        <div>{lbl('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} /></div>
      </div>
      <div>{lbl('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>{lbl('City')}<input className="input" placeholder="Chennai" value={form.city} onChange={set('city')} /></div>
        <div>{lbl('Locality')}<input className="input" placeholder="Porur, Anna Nagar…" value={form.locality} onChange={set('locality')} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div>{lbl('Contractor Quote (₹)')}<input type="number" className="input" placeholder="e.g. 4500000" value={form.contractor_quote} onChange={set('contractor_quote')} /></div>
        <div>{lbl('Plot Area (sqft)')}<input type="number" className="input" placeholder="1200" value={form.plot_area_sqft} onChange={set('plot_area_sqft')} /></div>
        <div>{lbl('Floors')}<select className="input" value={form.floors} onChange={set('floors')}><option value="">Select</option><option>G</option><option>G+1</option><option>G+2</option><option>G+3</option><option>G+4</option></select></div>
      </div>
      <div>{lbl('Do you have drawings / contractor BOQ?')}
        <select className="input" value={form.has_drawings} onChange={set('has_drawings')}>
          <option value="">Select</option>
          <option value="yes_both">Yes — I have drawings and BOQ</option>
          <option value="yes_drawings">Yes — I have drawings only</option>
          <option value="yes_boq">Yes — I have contractor BOQ only</option>
          <option value="no">No — just a verbal quote</option>
        </select>
      </div>
      <div>{lbl('Tell us about your situation')}<textarea className="input" rows={3} placeholder="Share contractor name, any concerns or questions…" value={form.message} onChange={set('message')} /></div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', fontSize: '16px' }}>
        {status === 'loading' ? 'Submitting…' : '📊 Request BOQ Audit'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
