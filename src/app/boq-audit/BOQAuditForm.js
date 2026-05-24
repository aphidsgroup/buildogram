'use client';
import { useState } from 'react';

export default function BOQAuditForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: 'Chennai', locality: '',
    contractor_quote: '', plot_area_sqft: '', floors: '',
    project_type: 'residential', customer_concern: '',
    has_drawings: '', message: '',
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      let boq_file_url = null;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'boq_uploads');
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.url) boq_file_url = uploadData.url;
      }

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
            project_type: form.project_type,
            quoted_amount: form.contractor_quote,
            customer_concern: form.customer_concern,
            has_drawings: form.has_drawings,
            built_up_area: form.plot_area_sqft, // fallback
            floors: form.floors,
            boq_file_url: boq_file_url,
            boq_review_status: 'requested'
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
        Our engineering team will review your quote and highlight any discrepancies. We'll contact you within 24 hours.
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
      <div className="grid-2">
        <div>{lbl('Full Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} /></div>
        <div>{lbl('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} /></div>
      </div>
      <div>{lbl('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
      <div className="grid-2">
        <div>{lbl('City')}<input className="input" placeholder="Chennai" value={form.city} onChange={set('city')} /></div>
        <div>{lbl('Locality')}<input className="input" placeholder="Porur, Anna Nagar…" value={form.locality} onChange={set('locality')} /></div>
      </div>
      <div className="grid-3">
        <div>{lbl('Project Type')}<select className="input" value={form.project_type} onChange={set('project_type')}><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="renovation">Renovation</option></select></div>
        <div>{lbl('Contractor Quote (₹)')}<input type="number" className="input" placeholder="e.g. 4500000" value={form.contractor_quote} onChange={set('contractor_quote')} /></div>
        <div>{lbl('Built-up Area (sqft)')}<input type="number" className="input" placeholder="1200" value={form.plot_area_sqft} onChange={set('plot_area_sqft')} /></div>
      </div>
      
      <div>{lbl('Upload Quote / BOQ (Optional)')}
        <input type="file" className="input" accept="image/*,.pdf" onChange={e => setFile(e.target.files[0])} style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>

      <div>{lbl('Specific Concerns (Optional)')}<textarea className="input" rows={2} placeholder="E.g. Is the steel brand mentioned good enough?" value={form.customer_concern} onChange={set('customer_concern')} /></div>
      
      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', fontSize: '16px' }}>
        {status === 'loading' ? 'Submitting…' : '📊 Request BOQ Audit'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
