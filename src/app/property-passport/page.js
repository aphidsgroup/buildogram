import Link from 'next/link';
import PassportLeadForm from './PassportLeadForm';

export const metadata = {
  title: "Property Passport™ — Your Property's Permanent Proof Record | Buildogram",
  description: 'Create a Property Passport for your home or property. Store legal documents, BOQ, materials, quality checks, photos, warranty and maintenance history in one secure digital record.',
};

const sections = [
  { icon: '📄', title: 'Legal Documents', desc: 'EC, patta, approval plans, govt clearances — all in one place.' },
  { icon: '📐', title: 'Drawings & Plans', desc: 'Floor plans, elevation, structural, electrical, plumbing drawings.' },
  { icon: '📊', title: 'BOQ & Cost Records', desc: 'Approved BOQ, payment milestones, actual vs estimated costs.' },
  { icon: '🧱', title: 'Material Proof', desc: 'Brand, grade, quantity, test certificate, delivery records.' },
  { icon: '✅', title: 'BQS™ Quality Checks', desc: '2500+ evidence-backed quality inspections at every stage.' },
  { icon: '📸', title: 'Progress Media', desc: 'Stage-by-stage construction visual proof timeline.' },
  { icon: '🔒', title: 'Warranty Records', desc: 'Contractor warranty, material warranty, defect liability docs.' },
  { icon: '🔧', title: 'Maintenance History', desc: 'Every service request, repair and AMC record since handover.' },
  { icon: '🏠', title: 'Rental/Resale Readiness', desc: 'Property completeness score visible to buyers and tenants.' },
];

const benefits = [
  { for: 'Builders & Owners', icon: '🏗️', points: ['Prove quality to clients with photo evidence', 'Faster dispute resolution', 'Structured handover pack', 'Professional digital record-keeping'] },
  { for: 'Rental Listing', icon: '🏡', points: ['Show verified property details to tenants', 'Build trust before site visit', 'Higher rental conversions', '360 tour linked to passport'] },
  { for: 'Resale Listing', icon: '💰', points: ['Prove legal clarity and quality to buyers', 'Justify your asking price', 'Faster sale closure', 'Reduce buyer due-diligence time'] },
  { for: 'Maintenance', icon: '🔧', points: ['Know your property history before repair', 'Track every fix with proof', 'AMC renewal records', 'Vendor accountability'] },
];

const passportSteps = [
  { step: '01', title: 'Request Your Passport', desc: 'Fill the form below. Our team contacts you within 24 hours.' },
  { step: '02', title: 'Document Collection', desc: 'We help you digitise existing documents — approvals, drawings, contracts.' },
  { step: '03', title: 'Data Verification', desc: 'Our team verifies and organises every record by category.' },
  { step: '04', title: 'Passport Activated', desc: 'Your secure Property Passport goes live. Access any time, share when needed.' },
];

export default function PropertyPassportPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 0%, rgba(255,218,1,0.08) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ fontSize: '16px' }}>🛂</span>
            <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>India's First Property Transparency Record</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Property Passport™
          </h1>
          <p style={{ fontStyle: 'italic', fontSize: 'clamp(18px, 3vw, 26px)', color: '#BBA07A', fontFamily: 'DM Serif Text, serif', marginBottom: '16px' }}>
            Your property's permanent proof record.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '620px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            One secure digital record that stores every document, material, quality check, photo, warranty and maintenance history — from groundbreaking to resale.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#create" className="btn btn-primary btn-lg">Create My Property Passport</Link>
            <Link href="#what-it-stores" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>See What It Stores</Link>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: '#FFDA01', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[['9+', 'Passport Sections'], ['100%', 'Digital Access'], ['Forever', 'Record Validity'], ['Secure', 'Controlled Sharing']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 800, color: '#292929' }}>{n}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#292929', opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What It Stores ── */}
      <section id="what-it-stores" className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">What It Stores</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '16px' }}>Everything about your property. Forever.</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', fontSize: '17px' }}>
              9 critical record categories — all in one place, accessible any time.
            </p>
          </div>
          <div className="grid-3">
            {sections.map(s => (
              <div key={s.title} className="card card-hover">
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Benefits</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>Why every property owner needs a Passport</h2>
          </div>
          <div className="grid-2" style={{ gap: '32px' }}>
            {benefits.map(b => (
              <div key={b.for} style={{ background: '#F9F9F9', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{b.icon}</div>
                <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#292929' }}>For {b.for}</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {b.points.map(p => (
                    <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--text)' }}>
                      <span style={{ color: '#292929', background: '#FFDA01', borderRadius: '50%', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0, marginTop: '2px', fontWeight: 800 }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">The Process</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px' }}>Creating your Passport is simple</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {passportSteps.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', padding: '32px 0', borderBottom: i < passportSteps.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--secondary)', color: '#FFDA01', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '22px', flexShrink: 0 }}>{s.step}</div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="create" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>Create Your Property Passport</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px' }}>
              Start with a free consultation. Our team will guide you through the passport process.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <PassportLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
