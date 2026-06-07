'use client';
import { useState, useEffect } from 'react';
import { getAttributionPayload } from '@/lib/analytics/attribution';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PremiumCard from '@/components/ui/PremiumCard';
import styles from './contact.module.css';

const INTENT_OPTIONS = [
  { value: 'construction', label: 'Home & Commercial Construction' },
  { value: 'boq_audit', label: 'BOQ & Plan Review' },
  { value: 'audit', label: 'Building Structural Audit' },
  { value: 'material_quote', label: 'Construction Material Sourcing' },
  { value: 'survey', label: 'Land & Property Survey' },
  { value: 'soil', label: 'Soil Testing' },
  { value: 'piling', label: 'Pile Foundation' },
  { value: 'passport', label: 'Property Passport Documentation' },
  { value: 'partner_application', label: 'Join Verified Partner Network' },
  { value: 'ai', label: 'AI Tools Support' },
  { value: 'general', label: 'General Enquiry' },
];

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    leadType: 'construction',
    location: '',
    notes: '',
    formData: {}
  });

  const [status, setStatus] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [tracking, setTracking] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const typeParam = searchParams.get('type');
    
    if (typeParam) {
      setForm(prev => ({ ...prev, leadType: typeParam }));
    }
    
    // Capture tracking info
    setTracking({
      sourcePage: window.location.pathname,
      sourceCta: searchParams.get('source') || 'Direct',
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmContent: searchParams.get('utm_content'),
      referrer: document.referrer,
      deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      attribution: getAttributionPayload()
    });
  }, []);

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
        setForm({ name: '', phone: '', email: '', leadType: form.leadType, location: '', notes: '', formData: {} });
      } else {
        setStatus('Failed to submit. Please try again.');
      }
    } catch {
      setStatus('An error occurred. Please call us directly.');
    }
  };

  if (status === 'Success') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(16,185,129,0.05)', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '12px', fontWeight: 800 }}>Request Received</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
          Thank you, {submittedData?.name}. Your Buildogram request has been received.<br />
          Our engineering team will review your requirement and contact you shortly.
        </p>
        <button onClick={() => setStatus('')} className="btn btn-outline">Submit Another Request</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>How can Buildogram help you?</label>
        <select className={styles.inputField} value={form.leadType} onChange={e => setForm({ ...form, leadType: e.target.value, formData: {} })}>
          {INTENT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      <div className={styles.inputGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Your Name</label>
          <input required className={styles.inputField} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Phone Number</label>
          <input required type="tel" className={styles.inputField} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Email Address</label>
        <input type="email" className={styles.inputField} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email (Optional)" />
      </div>

      {form.leadType === 'construction' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Project Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., OMR, Anna Nagar" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Plot Size</label>
              <input className={styles.inputField} value={form.formData.plotSize || ''} onChange={e => handleExtraFieldChange('plotSize', e.target.value)} placeholder="e.g., 2400 sqft" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Construction Type</label>
              <select className={styles.inputField} value={form.formData.constructionType || ''} onChange={e => handleExtraFieldChange('constructionType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Villa">Villa / Independent House</option>
                <option value="Apartment">Apartment Complex</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Approx Budget</label>
              <input className={styles.inputField} value={form.formData.budget || ''} onChange={e => handleExtraFieldChange('budget', e.target.value)} placeholder="e.g., 1.5 Cr" />
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'material_quote' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Delivery Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Delivery area" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Material Required</label>
              <input required className={styles.inputField} value={form.formData.materialType || ''} onChange={e => handleExtraFieldChange('materialType', e.target.value)} placeholder="e.g., Cement, Steel, Sand" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Quantity</label>
              <input required className={styles.inputField} value={form.formData.quantity || ''} onChange={e => handleExtraFieldChange('quantity', e.target.value)} placeholder="e.g., 100 bags, 5 tons" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Delivery Timeline</label>
              <select className={styles.inputField} value={form.formData.timeline || ''} onChange={e => handleExtraFieldChange('timeline', e.target.value)}>
                <option value="">Select Timeline</option>
                <option value="Immediate">Immediate</option>
                <option value="Next 7 Days">Next 7 Days</option>
                <option value="Planning Phase">Planning Phase</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {(form.leadType === 'partner_application' || form.leadType === 'partner') && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Company Name</label>
              <input required className={styles.inputField} value={form.formData.companyName || ''} onChange={e => handleExtraFieldChange('companyName', e.target.value)} placeholder="Your business name" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Partner Type</label>
              <select className={styles.inputField} value={form.formData.partnerType || ''} onChange={e => handleExtraFieldChange('partnerType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Builder/Contractor">Builder / Contractor</option>
                <option value="Architect/Designer">Architect / Interior Designer</option>
                <option value="Material Supplier">Material Supplier</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Service Area</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Years of Experience</label>
              <input className={styles.inputField} value={form.formData.experience || ''} onChange={e => handleExtraFieldChange('experience', e.target.value)} placeholder="e.g., 10 Years" />
            </div>
          </div>
        </div>
      )}

      
      {form.leadType === 'audit' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Building Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Audit Type</label>
              <select className={styles.inputField} value={form.formData.auditType || ''} onChange={e => handleExtraFieldChange('auditType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Residential">Residential Building</option>
                <option value="Commercial">Commercial Building</option>
                <option value="Industrial">Industrial</option>
                <option value="Old Building">Old Building / Heritage</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'survey' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Property Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., OMR" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Survey Type</label>
              <select className={styles.inputField} value={form.formData.surveyType || ''} onChange={e => handleExtraFieldChange('surveyType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Land/Boundary">Land / Boundary Survey</option>
                <option value="Contour">Contour Survey</option>
                <option value="Topographic">Topographic Survey</option>
                <option value="Drone">Drone Survey</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'piling' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Site Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Piling Type</label>
              <select className={styles.inputField} value={form.formData.pilingType || ''} onChange={e => handleExtraFieldChange('pilingType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Bored Cast In Situ">Bored Cast In Situ</option>
                <option value="DMC">DMC Piling</option>
                <option value="Micro Piling">Micro Piling</option>
                <option value="Pile Testing">Pile Load / Integrity Test</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'soil' && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Site Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Chennai" />
            </div>
          </div>
        </div>
      )}

      {form.leadType === 'ai' && (
        <div className={styles.conditionalBox}>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
            We see you came from an AI Tool. Please tell us how we can assist you with your AI-generated results.
          </p>
        </div>
      )}

      {(form.leadType === 'property_support' || form.leadType === 'property_listing' || form.leadType === 'rental_listing') && (
        <div className={styles.conditionalBox}>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Property Location</label>
              <input required className={styles.inputField} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g., Adyar" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Property Type</label>
              <select className={styles.inputField} value={form.formData.propertyType || ''} onChange={e => handleExtraFieldChange('propertyType', e.target.value)}>
                <option value="">Select Type</option>
                <option value="Plot">Plot / Land</option>
                <option value="Villa">Villa / House</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Additional Notes</label>
        <textarea className={styles.inputField} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Tell us more about your requirement..." rows="4" />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
        {status === 'Submitting...' ? 'Submitting...' : 'Submit to Buildogram'}
      </button>
      
      {status && status !== 'Submitting...' && status !== 'Success' && (
        <div style={{ textAlign: 'center', color: 'var(--error)', fontSize: '14px', marginTop: '16px' }}>{status}</div>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <div className="engineerLedPage">
      <section className={`fullBleedSection ${styles.hero}`}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="sectionInnerWide" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <AnimatedSection>
            <span className={styles.eyebrow}>Construction Companion</span>
            <h1 className={styles.heroH1} style={{ margin: '0 auto 24px' }}>
              Talk to Buildogram About Your Construction or Property Requirement
            </h1>
            <p className={styles.heroSub}>
              Whether you are planning to build, source materials, verify a contractor, review a BOQ, showcase a project, or connect as a partner — Buildogram helps you take the next step with clarity.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className={`fullBleedSection ${styles.contentSection}`}>
        <div className={`sectionInnerWide ${styles.grid}`}>
          <AnimatedSection>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              <ContactForm />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>Business & Contact Details</h3>
              <div style={{ marginBottom: '16px' }}>
                <strong>Buildogram</strong><br />
                <span style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                  No.35, 7th floor, Awfis Space, Centre Point 3,<br />
                  Poonamallee High Road, Manapakkam, Porur,<br />
                  Chennai — 600 089, Tamil Nadu, India.
                </span>
              </div>
              <p className={styles.sideText} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                📞 <a href="tel:+919360232456" className={styles.sideLink}>+91 93602 32456</a>
              </p>
              <p className={styles.sideText} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                ✉️ <a href="mailto:hello@buildogram.in" className={styles.sideLink}>hello@buildogram.in</a>
              </p>
              <div style={{ marginTop: '16px', fontSize: '14px', color: '#475569' }}>
                <strong>Operating Hours:</strong><br />
                Mon - Sat: 9:00 AM – 6:30 PM<br />
                Sun: Closed
              </div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideTitle}>What Buildogram helps with</h3>
              <ul className={styles.helpList}>
                {[
                  { icon: '🏗️', text: 'Home construction guidance' },
                  { icon: '📋', text: 'BOQ & plan review' },
                  { icon: '🧱', text: 'Material sourcing support' },
                  { icon: '🤝', text: 'Verified partner connections' },
                  { icon: '📸', text: 'Site progress tracking' },
                  { icon: '🏠', text: 'Property Passport records' },
                  { icon: '🛡️', text: 'Partner registration' },
                ].map((item, i) => (
                  <li key={i} className={styles.helpItem}>
                    <span className={styles.helpIcon}>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fullBleedSection" style={{ background: '#F8FAFC', padding: '60px 0' }}>
        <div className="sectionInner">
          <AnimatedSection>
            <h2 style={{ fontSize: '24px', fontWeight: 800, textAlign: 'center', marginBottom: '32px' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>What areas in Chennai do you serve?</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                  Buildogram serves all major localities in Chennai including OMR, ECR, Anna Nagar, Velachery, Tambaram, Porur, Guindy, and surrounding metropolitan areas.
                </p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Do you provide free initial consultations?</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                  Yes, we offer an initial consultation to understand your construction or property requirement and guide you to the right services or verified partners.
                </p>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>How quickly do you respond to enquiries?</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                  Our engineering team typically reviews and responds to enquiries within 24 hours during working days.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* JSON-LD Schema for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Buildogram",
            "url": "https://www.buildogram.in/contact",
            "description": "Contact Buildogram for engineer-led home construction, BOQ review, structural auditing, and material sourcing in Chennai.",
            "mainEntity": {
              "@type": "LocalBusiness",
              "@id": "https://www.buildogram.in"
            }
          })
        }}
      />
    </div>
  );
}
