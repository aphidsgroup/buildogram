'use client';
import { useState } from 'react';

const PARTNER_TYPES = ['Builder', 'Contractor', 'Architect', 'Structural Engineer', 'Interior Designer', 'Material Supplier', 'Real Estate Agent', 'Maintenance Vendor', '360 Tour Vendor', 'Legal Consultant', 'Other'];

export default function PartnerJoinForm() {
  const [form, setForm] = useState({ 
    name: '', phone: '', email: '', city: 'Chennai', company: '', 
    partner_type: '', experience: '', 
    service_areas: '', services_offered: '', website_url: '', portfolio_links: '', instagram_url: '',
    message: '' 
  });
  const [status, setStatus] = useState('idle');

  const submit = async e => {
    e.preventDefault();
    setStatus('loading');
    
    const metadata = {
      business_name: form.company,
      partner_category: form.partner_type,
      years_experience: form.experience,
      service_areas: form.service_areas,
      services_offered: form.services_offered,
      website_url: form.website_url,
      instagram_url: form.instagram_url,
      portfolio_links: form.portfolio_links,
      verification_status: 'pending',
      public_status: 'draft',
    };

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
          metadata: metadata,
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
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>Our partner team will contact you within 24 hours to discuss onboarding and your public profile.</p>
    </div>
  );

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const label = t => <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t}</label>;

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Basic Contact */}
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Contact Name *')}<input required className="input" placeholder="Your name" value={form.name} onChange={set('name')} /></div>
        <div>{label('Phone *')}<input required className="input" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} /></div>
      </div>
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Email')}<input type="email" className="input" placeholder="your@email.com" value={form.email} onChange={set('email')} /></div>
        <div>{label('City')}<input required className="input" placeholder="Chennai" value={form.city} onChange={set('city')} /></div>
      </div>
      
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }} />

      {/* Business Details */}
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Business / Company Name *')}<input required className="input" placeholder="Your business name" value={form.company} onChange={set('company')} /></div>
        <div>
          {label('Partner Category *')}
          <select required className="input" value={form.partner_type} onChange={set('partner_type')}>
            <option value="">Select category...</option>
            {PARTNER_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '16px' }}>
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
        <div>{label('Service Areas *')}<input required className="input" placeholder="e.g. South Chennai, OMR, All Chennai..." value={form.service_areas} onChange={set('service_areas')} /></div>
      </div>

      <div>{label('Services Offered')}
        <textarea className="input" rows={2} placeholder="Describe the specific services you provide..." value={form.services_offered} onChange={set('services_offered')} />
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }} />

      {/* Links */}
      <div className="grid-2" style={{ gap: '16px' }}>
        <div>{label('Website URL')}<input type="url" className="input" placeholder="https://..." value={form.website_url} onChange={set('website_url')} /></div>
        <div>{label('Instagram Handle/URL')}<input className="input" placeholder="@yourhandle or URL" value={form.instagram_url} onChange={set('instagram_url')} /></div>
      </div>

      <div>{label('Portfolio / Project Links')}<input className="input" placeholder="Google Drive, Behance, etc." value={form.portfolio_links} onChange={set('portfolio_links')} /></div>

      <div>{label('Any other details?')}<textarea className="input" rows={2} placeholder="Any specific requirements or message..." value={form.message} onChange={set('message')} /></div>

      <button type="submit" className="btn btn-primary btn-lg mt-2" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'loading' ? 'Submitting…' : '🤝 Apply to Join Partner Network'}
      </button>
      {status === 'error' && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '14px' }}>Something went wrong. Please try again.</p>}
    </form>
  );
}
