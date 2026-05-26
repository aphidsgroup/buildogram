'use client';
import { useState } from 'react';

const INTENT_OPTIONS = [
  'I want to build a home',
  'I need BOQ / plan review',
  'I need material support',
  'I want verified contractors / builders',
  'I want to find an architect or consultant',
  'I want to register as a partner',
  'I want to showcase / list a property',
  'General support or question',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: INTENT_OPTIONS[0],
    location: '',
    notes: '',
  });
  const [status, setStatus] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: 'new', source: 'Contact Form' }),
      });
      if (res.ok) {
        setStatus('Success! Our team will contact you shortly.');
        setForm({ name: '', phone: '', email: '', requirement: INTENT_OPTIONS[0], location: '', notes: '' });
      } else {
        setStatus('Failed to submit. Please try again.');
      }
    } catch {
      setStatus('An error occurred. Please call us directly.');
    }
  };

  return (
    <>
      {/* Hero */}
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
          {/* Form */}
          <div className="card">
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--primary-dark)' }}>Send a Message</h2>
            <form onSubmit={submit} className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label>Your Name</label>
                <input required className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input required type="tel" className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" />
                </div>
                <div className="input-group">
                  <label>Email (Optional)</label>
                  <input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email address" />
                </div>
              </div>
              <div className="input-group">
                <label>How can Buildogram help you?</label>
                <select className="input" value={form.requirement} onChange={e => setForm({ ...form, requirement: e.target.value })}>
                  {INTENT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label>Plot / Project Location</label>
                <input className="input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. OMR, ECR, Anna Nagar, Porur" />
              </div>
              <div className="input-group">
                <label>Tell us more (Optional)</label>
                <textarea className="input" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Describe your project, requirement, or question..." />
              </div>
              <button type="submit" className="btn btn-primary btn-lg mt-2" style={{ width: '100%', justifyContent: 'center' }}>
                Submit to Buildogram
              </button>
              {status && (
                <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '500', color: status.includes('Success') ? 'var(--success)' : 'var(--error)' }}>
                  {status}
                </div>
              )}
            </form>
          </div>

          {/* Info */}
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
