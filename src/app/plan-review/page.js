'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PlanReviewPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', project_location: '',
    plot_size: '', built_up_area: '', floors: '',
    project_type: 'residential', intended_use: 'self_use',
    main_concern: 'space_usage', message: '', plan_file_url: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const metadata = {
        project_location: form.project_location,
        plot_size: form.plot_size,
        built_up_area: form.built_up_area,
        floors: form.floors,
        project_type: form.project_type,
        intended_use: form.intended_use,
        main_concern: form.main_concern,
        plan_file_url: form.plan_file_url,
        plan_review_status: 'requested'
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_type: 'plan_review',
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          metadata
        })
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <>
        <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
          <div className="container" style={{ position: 'relative' }}>
            <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15 }}>Plan Review Advisory</h1>
          </div>
        </section>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '560px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ fontSize: '28px', color: 'var(--secondary)', marginBottom: '12px' }}>Request Submitted</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
            Our structural engineers will review your details and get back to you with an advisory plan review report soon.
          </p>
          <Link href="/" className="btn btn-primary btn-lg">Return Home</Link>
        </div>
      </>
    );
  }

  const highlights = [
    { icon: '📐', title: 'Space Efficiency', desc: 'Identify wasted space and improve room flow' },
    { icon: '💨', title: 'Ventilation & Light', desc: 'Natural light, cross-ventilation assessment' },
    { icon: '💰', title: 'Cost Impact Analysis', desc: 'Which design choices cost more and why' },
    { icon: '🏠', title: 'Rental Suitability', desc: 'Layout evaluation for rental income potential' },
    { icon: '🏗️', title: 'Structural Feasibility', desc: 'Is the design structurally buildable as drawn' },
    { icon: '📋', title: 'Setback & FSI Check', desc: 'Verify compliance with local building rules' },
  ];

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Plan Review Advisory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Floor Plan Review — Engineer's Eye Before You Build
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Get an expert advisory review of your architectural or floor plan. We analyse space usage, ventilation, cost impact, structural feasibility, and compliance — before construction starts.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#review-form" className="btn btn-primary btn-lg">Submit Plan for Review</a>
            <Link href="/contact" className="btn btn-lg btn-outline-light">Talk to an Engineer</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {/* WHAT WE REVIEW */}
        <div style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '26px', color: 'var(--secondary)', marginBottom: '28px', textAlign: 'center' }}>What Our Plan Review Covers</h2>
          <div className="grid-3" style={{ gap: '16px' }}>
            {highlights.map((h) => (
              <div key={h.title} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{h.icon}</span>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{h.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '48px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>⚠ Disclaimer</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            This plan review is strictly advisory and based on information provided. It is NOT structural approval, architectural certification, legal approval, or government approval. Final decisions must be reviewed by qualified architects, structural engineers, and relevant approval authorities.
          </p>
        </div>

        {/* FORM */}
        <div id="review-form" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '8px' }}>Submit Your Plan for Review</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>Our engineers will respond within 2–3 working days with an advisory report.</p>

          <div className="card">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Full Name *</label>
                  <input required type="text" className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Phone Number *</label>
                  <input required type="tel" className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Project Location</label>
                  <input type="text" className="input" placeholder="City or Area" value={form.project_location} onChange={e => setForm({...form, project_location: e.target.value})} />
                </div>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)' }}>Project Details</h3>

              <div className="grid-3" style={{ gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Plot Size</label>
                  <input type="text" className="input" placeholder="e.g. 30x40" value={form.plot_size} onChange={e => setForm({...form, plot_size: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Built-up Area</label>
                  <input type="text" className="input" placeholder="e.g. 2400 sqft" value={form.built_up_area} onChange={e => setForm({...form, built_up_area: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Floors</label>
                  <input type="number" className="input" placeholder="e.g. 2" value={form.floors} onChange={e => setForm({...form, floors: e.target.value})} />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Project Type</label>
                  <select className="input" value={form.project_type} onChange={e => setForm({...form, project_type: e.target.value})}>
                    <option value="residential">Residential</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="rental">Rental Property</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Intended Use</label>
                  <select className="input" value={form.intended_use} onChange={e => setForm({...form, intended_use: e.target.value})}>
                    <option value="self_use">Self Use</option>
                    <option value="rental">Rental / Leasing</option>
                    <option value="resale">Resale / Flipping</option>
                    <option value="commercial">Commercial Operation</option>
                    <option value="mixed">Mixed Use</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Main Review Focus</label>
                <select className="input" value={form.main_concern} onChange={e => setForm({...form, main_concern: e.target.value})}>
                  <option value="space_usage">Space Optimization & Layout</option>
                  <option value="cost_impact">Cost Impact of Design</option>
                  <option value="ventilation">Ventilation & Natural Light</option>
                  <option value="parking">Parking & Access</option>
                  <option value="vastu">Vastu Compliance</option>
                  <option value="rental_suitability">Rental Yield Suitability</option>
                  <option value="construction_practicality">Construction Practicality</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Plan Document Link (Optional)</label>
                <input type="url" className="input" placeholder="Google Drive, Dropbox, or Image URL" value={form.plan_file_url} onChange={e => setForm({...form, plan_file_url: e.target.value})} />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Share your plan so our engineers can analyse it directly.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>Specific Questions</label>
                <textarea className="input" rows="3" placeholder="What specific feedback are you looking for?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>

              {status === 'error' && (
                <div style={{ padding: '12px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>
                  Failed to submit request. Please try again.
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'} style={{ width: '100%' }}>
                {status === 'submitting' ? 'Submitting...' : 'Request Plan Review'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
}
