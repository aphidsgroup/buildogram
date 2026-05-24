'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', requirement: 'New Construction', location: '', notes: '' });
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
        setStatus('Success! Our engineers will contact you shortly.');
        setForm({ name: '', phone: '', email: '', requirement: 'New Construction', location: '', notes: '' });
      } else {
        setStatus('Failed to submit. Please try again.');
      }
    } catch (err) {
      setStatus('An error occurred. Please call us directly.');
    }
  };

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(204,255,0,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#CCFF00', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Get in Touch</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Talk to Our Structural Engineers — Free Consultation</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7 }}>Get honest, engineering-backed answers about your construction project, BOQ, soil testing, or property. No sales pitch — just expert advice.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        <div className="grid-2">
          <div className="card">
            <h2 style={{ fontSize: '24px', marginBottom: '24px', color: 'var(--primary-dark)' }}>Send a Message</h2>
            <form onSubmit={submit} className="flex" style={{ flexDirection: 'column', gap: '16px' }}>
              <div className="input-group">
                <label>Name</label>
                <input required className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your full name" />
              </div>
              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input required type="tel" className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="10-digit mobile" />
                </div>
                <div className="input-group">
                  <label>Email (Optional)</label>
                  <input type="email" className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Your email address" />
                </div>
              </div>
              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>Requirement</label>
                  <select className="input" value={form.requirement} onChange={e => setForm({...form, requirement: e.target.value})}>
                    <option>New Construction</option>
                    <option>Structural Consultation</option>
                    <option>Architectural Design</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Plot Location</label>
                  <input className="input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. OMR, ECR, Anna Nagar" />
                </div>
              </div>
              <div className="input-group">
                <label>Message (Optional)</label>
                <textarea className="input" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Tell us more about your project..." />
              </div>
              <button type="submit" className="btn btn-primary btn-lg mt-2" style={{ width: '100%', justifyContent: 'center' }}>Book Free Engineering Consultation</button>
              {status && <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '500', color: status.includes('Success') ? 'var(--success)' : 'var(--error)' }}>{status}</div>}
            </form>
          </div>

          <div>
            <div className="card mb-6">
              <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-dark)' }}>Office Address</h3>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>
                <strong>Buildogram Headquarters</strong><br />
                No.35, 7th floor, Awfis Space, Centre point 3,<br />
                Poonamallee High Road, Manapakkam, Porur,<br />
                Chennai - 89
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-dark)' }}>Contact Info</h3>
              <p className="text-muted mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                📞 <a href="tel:+919360232456">+91 93602 32456</a>
              </p>
              <p className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✉️ <a href="mailto:hello@buildogram.in">hello@buildogram.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
