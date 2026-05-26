'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const INTENT_OPTIONS = [
  { value: 'construction', label: 'I want to build a home' },
  { value: 'boq_audit', label: 'I need BOQ / plan review' },
  { value: 'material_quote', label: 'I need material support' },
  { value: 'partner_application', label: 'I want to register as a partner' },
  { value: 'property_listing', label: 'I want to list / showcase a property' },
  { value: 'property_support', label: 'I need property buying / selling support' },
  { value: 'rental_listing', label: 'I need rent / lease property support' },
  { value: 'general', label: 'General enquiry' },
];

function ContactForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get('type') || 'construction';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    leadType: typeParam,
    location: '',
    notes: '',
    formData: {}
  });

  const [status, setStatus] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [tracking, setTracking] = useState({});

  useEffect(() => {
    if (typeParam) {
      setForm(prev => ({ ...prev, leadType: typeParam }));
    }
    
    // Capture tracking info
    const searchParams = new URLSearchParams(window.location.search);
    setTracking({
      sourcePage: window.location.pathname,
      sourceCta: searchParams.get('source') || 'Direct',
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmContent: searchParams.get('utm_content'),
      referrer: document.referrer,
      deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    });
  }, [typeParam]);

  const handleExtraFieldChange = (key, value) => {
    setForm(prev => ({ ...prev, formData: { ...prev.formData, [key]: value } }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const payload = { ...form, ...tracking };
      if (!payload.source) payload.source = payload.sourceCta || 'Contact Form';

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('Success');
        setSubmittedData(form);
        setForm({ name: '', phone: '', email: '', leadType: typeParam, location: '', notes: '', formData: {} });
      } else {
        setStatus('Failed to submit. Please try again.');
      }
    } catch {
      setStatus('An error occurred. Please call us directly.');
    }
  };

  if (status === 'Success') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(34,197,94,0.05)', borderRadius: '16px', border: '1px solid rgba(34,197,94,0.1)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '24px', color: 'var(--primary-dark)', marginBottom: '12px' }}>Request Received</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Thank you, {submittedData?.name}. Your Buildogram request has been received.<br />
          Our engineering team will review your requirement and contact you shortly.
        </p>
        <button onClick={() => setStatus('')} className="btn btn-outline">Submit Another Request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex" style={{ flexDirection: 'column', gap: '20px' }}>
      <div className="input-group">
        <label>How can Buildogram help you?</label>
        <select className="input" value={form.leadType} onChange={e => setForm({ ...form, leadType: e.target.value, formData: {} })}>
          {INTENT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      <div className="grid-2" style={{ gap: '16px' }}>
        <div className="input-group">
          <label>Your Name</label>
          <input required className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input required type="tel" className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" />
        </div>
      </div>

      <div className="input-group">
        <label>Email Address</label>
        <input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email (Optional)" />
      </div>

      {form.leadType === 'construction' && (
        <div className="grid-2" style={{ gap: '16px', background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
          <div className="input-group">
            <label>Project Location</label>
            <input required className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., OMR, Anna Nagar" />
          </div>
          <div className="input-group">
            <label>Plot Size</label>
            <input className="input" value={form.formData.plotSize || ''} onChange={e => handleExtraFieldChange('plotSize', e.target.value)} placeholder="e.g., 2400 sqft" />
          </div>
          <div className="input-group">
            <label>Construction Type</label>
            <select className="input" value={form.formData.constructionType || ''} onChange={e => handleExtraFieldChange('constructionType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="Villa">Villa / Independent House</option>
              <option value="Apartment">Apartment Complex</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div className="input-group">
            <label>Approx Budget</label>
            <input className="input" value={form.formData.budget || ''} onChange={e => handleExtraFieldChange('budget', e.target.value)} placeholder="e.g., 1.5 Cr" />
          </div>
        </div>
      )}

      {form.leadType === 'material_quote' && (
        <div className="grid-2" style={{ gap: '16px', background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
          <div className="input-group">
            <label>Delivery Location</label>
            <input required className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Delivery area" />
          </div>
          <div className="input-group">
            <label>Material Required</label>
            <input required className="input" value={form.formData.materialType || ''} onChange={e => handleExtraFieldChange('materialType', e.target.value)} placeholder="e.g., Cement, Steel, Sand" />
          </div>
          <div className="input-group">
            <label>Quantity</label>
            <input required className="input" value={form.formData.quantity || ''} onChange={e => handleExtraFieldChange('quantity', e.target.value)} placeholder="e.g., 100 bags, 5 tons" />
          </div>
          <div className="input-group">
            <label>Delivery Timeline</label>
            <select className="input" value={form.formData.timeline || ''} onChange={e => handleExtraFieldChange('timeline', e.target.value)}>
              <option value="">Select Timeline</option>
              <option value="Immediate">Immediate</option>
              <option value="Next 7 Days">Next 7 Days</option>
              <option value="Planning Phase">Planning Phase</option>
            </select>
          </div>
        </div>
      )}

      {form.leadType === 'partner_application' && (
        <div className="grid-2" style={{ gap: '16px', background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
          <div className="input-group">
            <label>Company Name</label>
            <input required className="input" value={form.formData.companyName || ''} onChange={e => handleExtraFieldChange('companyName', e.target.value)} placeholder="Your business name" />
          </div>
          <div className="input-group">
            <label>Partner Type</label>
            <select className="input" value={form.formData.partnerType || ''} onChange={e => handleExtraFieldChange('partnerType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="Builder/Contractor">Builder / Contractor</option>
              <option value="Architect/Designer">Architect / Interior Designer</option>
              <option value="Material Supplier">Material Supplier</option>
            </select>
          </div>
          <div className="input-group">
            <label>Service Area</label>
            <input required className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
          </div>
          <div className="input-group">
            <label>Years of Experience</label>
            <input className="input" value={form.formData.experience || ''} onChange={e => handleExtraFieldChange('experience', e.target.value)} placeholder="e.g., 10 Years" />
          </div>
        </div>
      )}

      {(form.leadType === 'property_support' || form.leadType === 'property_listing' || form.leadType === 'rental_listing') && (
        <div className="grid-2" style={{ gap: '16px', background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
          <div className="input-group">
            <label>Property Location</label>
            <input required className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Adyar" />
          </div>
          <div className="input-group">
            <label>Property Type</label>
            <select className="input" value={form.formData.propertyType || ''} onChange={e => handleExtraFieldChange('propertyType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="Plot">Plot / Land</option>
              <option value="Villa">Villa / House</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>
      )}

      <div className="input-group">
        <label>Additional Notes</label>
        <textarea className="input" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Tell us more about your requirement..." />
      </div>

      <button type="submit" className="btn btn-primary btn-lg mt-2" style={{ width: '100%', justifyContent: 'center' }}>
        {status === 'Submitting...' ? 'Submitting...' : 'Submit to Buildogram'}
      </button>
      
      {status && status !== 'Submitting...' && status !== 'Success' && (
        <div style={{ textAlign: 'center', color: 'var(--error)', fontSize: '14px' }}>{status}</div>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Construction Companion</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Talk to Buildogram About Your Construction or Property Requirement
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7 }}>
            Whether you are planning to build, source materials, verify a contractor, review a BOQ, showcase a project, or connect as a partner — Buildogram helps you take the next step with clarity.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>
        <div className="grid-2">
          <div className="card">
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--primary-dark)' }}>Send a Message</h2>
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>

          <div>
            <div className="card mb-6">
              <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-dark)' }}>Buildogram Headquarters</h3>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>
                No.35, 7th floor, Awfis Space, Centre Point 3,<br />
                Poonamallee High Road, Manapakkam, Porur,<br />
                Chennai — 600 089
              </p>
            </div>

            <div className="card mb-6">
              <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-dark)' }}>Contact Details</h3>
              <p className="text-muted mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                📞 <a href="tel:+919360232456">+91 93602 32456</a>
              </p>
              <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✉️ <a href="mailto:hello@buildogram.in">hello@buildogram.in</a>
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--primary-dark)' }}>What Buildogram helps with</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  '🏗️ Home construction guidance',
                  '📋 BOQ & plan review',
                  '🧱 Material sourcing support',
                  '🤝 Verified partner connections',
                  '📸 Site progress tracking',
                  '🏠 Property Passport records',
                  '🛡️ Partner registration',
                ].map(item => (
                  <li key={item} style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', gap: '6px' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
