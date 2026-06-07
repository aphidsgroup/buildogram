'use client';
import { useState, useEffect } from 'react';
import { submitEnquiry } from '@/lib/enquiryApi';
import { BUDGET_RANGES } from '@/lib/leadStore';

// ── Lead Form ─────────────────────────────────────────────────────────
function LeadForm({ partner }) {
  const blank = { customerName: '', phone: '', email: '', requirement: '', location: '', budgetRange: '', message: '', companyWebsite: '' };
  const [form, setForm] = useState(blank);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mountTime, setMountTime] = useState(0);

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.requirement) return alert('Name, phone, and requirement are required');
    if (submitting) return; // prevent double submit
    setSubmitting(true);
    setLoading(true);

    let spamStatus = 'clean';
    if (form.companyWebsite) spamStatus = 'spam'; // honeypot caught
    else if (Date.now() - mountTime < 2000) spamStatus = 'suspicious'; // too fast

    const result = await submitEnquiry({
      ...form,
      partnerSlug: partner.slug,
      partnerName: partner.companyName,
      category: partner.category,
      sourcePage: `/partners/${partner.slug}`,
      spamStatus,
      userAgent: navigator.userAgent
    });
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert('Submission failed: ' + (result.message || 'Please try again'));
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h3 style={{ marginBottom: '8px', color: '#10B981' }}>Enquiry Submitted!</h3>
        <p style={{ color: '#64748B', lineHeight: 1.7, marginBottom: '20px' }}>
          Your enquiry has been sent to Buildogram. Our team will connect you with <strong>{partner.companyName}</strong> within 24 hours.
        </p>
        <button onClick={() => { setForm(blank); setSubmitted(false); }} style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '8px 20px', cursor: 'pointer', fontSize: '14px', color: '#64748B' }}>
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Honeypot field - visually hidden */}
      <div style={{ position: 'absolute', opacity: 0, top: '-9999px', left: '-9999px' }} aria-hidden="true">
        <label>Website</label>
        <input type="text" value={form.companyWebsite} onChange={f('companyWebsite')} tabIndex="-1" autoComplete="off" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Your Name *</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.customerName} onChange={f('customerName')} placeholder="Your full name" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Phone *</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.phone} onChange={f('phone')} placeholder="10-digit mobile" type="tel" required />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Email</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.email} onChange={f('email')} placeholder="your@email.com" type="email" />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Location</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.location} onChange={f('location')} placeholder="Your area / city" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Requirement *</label>
          <input style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} value={form.requirement} onChange={f('requirement')} placeholder="e.g. G+2 Home Construction" required />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Budget Range</label>
          <select style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', background: 'white', outline: 'none' }} value={form.budgetRange} onChange={f('budgetRange')}>
            <option value="">Select budget...</option>
            {BUDGET_RANGES.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '6px', textTransform: 'uppercase' }}>Message</label>
        <textarea style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', resize: 'vertical', minHeight: '80px', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} value={form.message} onChange={f('message')} placeholder="Describe your project or requirement..." />
      </div>
      <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: '12px', padding: '14px 24px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'opacity 0.15s' }}>
        {loading ? 'Sending…' : '🚀 Request This Partner Through Buildogram'}
      </button>
      <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', margin: 0 }}>
        Buildogram routes your enquiry and coordinates with this partner to ensure transparent communication.
      </p>
    </form>
  );
}

// Modal component that wraps LeadForm
function PartnerEnquiryModal({ isOpen, onClose, partner }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', textAlign: 'left' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: '600px', borderRadius: '20px', padding: '24px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>✕</button>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: '#1E293B', paddingRight: '40px' }}>Request This Partner Through Buildogram</h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', lineHeight: '1.6' }}>
          All partner connections are routed through Buildogram to maintain transparency and proper coordination. Fill out this form and our team will connect you with <strong>{partner.companyName}</strong> while keeping the construction journey accountable.
        </p>
        <LeadForm partner={partner} />
      </div>
    </div>
  );
}

export function MobilePartnerCTA({ partner }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="mobile-sticky-cta">
        <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(252,110,32,0.3)' }}>
          🤝 Request This Partner Through Buildogram
        </button>
      </div>
      <PartnerEnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} partner={partner} />
    </>
  );
}

export function DesktopPartnerCTA({ partner }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>Request {partner.companyName} via Buildogram</div>
        <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', padding: '11px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
          🤝 Request This Partner
        </button>
      </div>
      <PartnerEnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} partner={partner} />
    </>
  );
}
