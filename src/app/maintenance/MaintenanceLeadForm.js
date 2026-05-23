'use client';
import { useState } from 'react';

const SERVICE_TYPES = ['Waterproofing', 'Plumbing Repair', 'Electrical Repair', 'Painting', 'Plastering', 'Tile Work', 'Door/Window Fix', 'General Repair', 'AMC Contract', 'Other'];

export default function MaintenanceLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: 'Chennai', locality: '', service_type: '', urgency: 'normal', message: '' });
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
          message: form.message,
          lead_type: 'maintenance',
          source_page: '/maintenance',
          source: 'website',
          metadata: { service_type: form.service_type, urgency: form.urgency },
        }),
      });
      const d = await res.json();
      setStatus(d.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔧</div>
      <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Service Request Sent!</h3>
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our maintenance team will contact you within 4 hours to schedule a visit.</p>
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
        <div>{label('Locality / Area')}<input className="input" placeholder="Porur, Tambaram…" value={form.locality} onChange={set('locality')} /></div>
      </div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>
          {label('Service Type')}
          <select className="input" value={form.service_type} onChange={set('service_type')}>
            <option value="">Select service</option>
            {SERVICE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          {label('Urgency')}
          <select className="input" value={form.urgency} onChange={set('urgency')}>
            <option value="normal">Normal (2–3 days)</option>
            <option value="urgent">Urgent (Today/Tomorrow)</option>
            <option value="emergency">Emergency (Within hours)</option>
          </select>
        </div>
      </div>
      <div>{label('Describe the issue')}<textarea className="input" rows={3} placeholder="What needs attention? Any photos you can share on WhatsApp?" value={form.message} onChange={set('message')} /></div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : '🔧 Request Maintenance Service'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
