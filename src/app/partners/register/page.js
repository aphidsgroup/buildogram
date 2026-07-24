'use client';
import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  'Builder', 'Architect', 'Contractor', 'Interior Designer',
  'Structural Consultant', 'Material Supplier', 'Home Automation',
  'Solar', 'Elevators', 'Waterproofing', 'Electrical', 'Plumbing',
];

const BENEFITS = [
  { icon: '🛡️', title: 'Verified Profile', desc: 'Build trust with property owners through a reviewed, credible platform presence.' },
  { icon: '🏗️', title: 'Project Showcase', desc: 'Showcase completed work, site photos, project proofs, and client testimonials.' },
  { icon: '📲', title: 'Reel Collaboration', desc: 'Collaborate on social media reels and project showcase content through Buildogram channels.' },
  { icon: '🎯', title: 'Relevant Project Opportunities', desc: 'Receive enquiries matched to your specialisation — not generic cold leads.' },
  { icon: '🧱', title: 'Material Network Access', desc: "Access Buildogram's supplier network for better material procurement coordination." },
  { icon: '🌐', title: 'Long-term Ecosystem Visibility', desc: 'Be part of a construction ecosystem built for owners, professionals, and material networks.' },
];

export default function PartnerRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '', contactPerson: '', email: '', phone: '',
    whatsapp: '', category: 'Builder', location: '', website: '', description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/public/partner-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '480px', width: '100%', background: 'white', border: '1px solid var(--border)', borderRadius: '24px', padding: '48px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
          <div style={{ width: '72px', height: '72px', background: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' }}>✅</div>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--secondary)' }}>Application Submitted!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.7 }}>
            Thank you for applying to join the Buildogram verified construction ecosystem. Our team will review your application and reach out within 2–3 business days.
          </p>
          <Link href="/" className="btn btn-primary" style={{ padding: '14px 32px' }}>Return to Buildogram</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '64px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>For Construction Professionals</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>
            Join Buildogram's Verified Construction Ecosystem
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7 }}>
            Create a trusted presence, showcase your projects, collaborate on construction opportunities, and become part of an engineer-led platform built for owners, professionals, and material networks.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>
        <div className="grid-2" style={{ gap: '48px', alignItems: 'flex-start' }}>

          {/* Form */}
          <div className="card" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--secondary)' }}>Register as a Partner</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>Our team reviews all applications before creating your verified profile.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--error)', padding: '12px 16px', borderRadius: '10px', fontSize: '14px' }}>
                  {error}
                </div>
              )}

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>Company / Business Name *</label>
                  <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="input" placeholder="e.g. Skyline Builders" />
                </div>
                <div className="input-group">
                  <label>Contact Person *</label>
                  <input required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="input" placeholder="e.g. Rajan Kumar" />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="input" placeholder="company@example.com" />
                </div>
                <div className="input-group">
                  <label>Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="9876543210" />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="input" placeholder="Optional" />
                </div>
                <div className="input-group">
                  <label>Partner Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="input">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="input-group">
                  <label>City / Service Area *</label>
                  <input required type="text" name="location" value={formData.location} onChange={handleChange} className="input" placeholder="e.g. Chennai, OMR, ECR" />
                </div>
                <div className="input-group">
                  <label>Website</label>
                  <input type="url" name="website" value={formData.website} onChange={handleChange} className="input" placeholder="https://" />
                </div>
              </div>

              <div className="input-group">
                <label>Brief Description of Your Services</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="input" placeholder="Tell us about your specialisation, completed projects, and what you do..." />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                {loading ? 'Submitting Application...' : 'Register as a Buildogram Partner'}
              </button>
            </form>
          </div>

          {/* Benefits */}
          <div>
            <h3 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--secondary)' }}>Why join the Buildogram ecosystem?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {BENEFITS.map((b, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid var(--border)', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: 'var(--shadow)' }}>
                  <div style={{ fontSize: '28px', flexShrink: 0 }}>{b.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '15px', marginBottom: '4px' }}>{b.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--secondary)', borderRadius: '20px', padding: '28px', color: 'white' }}>
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>🎓</div>
              <h4 style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>Engineer-led platform</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.65 }}>
                Buildogram helps serious construction professionals build visibility, trust, and project opportunities — not just generate leads. Verified profiles, project showcases, and ecosystem collaboration make a lasting difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
