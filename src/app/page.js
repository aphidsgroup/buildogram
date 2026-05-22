'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import styles from './page.module.css';

export default function Home() {
  const [activeComparison, setActiveComparison] = useState('buildogram');
  const [activeSpecTab, setActiveSpecTab] = useState('premium');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const comparisonData = {
    contractor: {
      title: 'Traditional Contractors (Opaque & Risky)',
      tagline: 'Opaque pricing and high-stress delivery',
      color: '#dc2626',
      points: [
        { title: '❌ Per-Sq.Ft Pricing Myth', desc: 'Lures you in with a low flat rate, then charges exorbitant "extra fees" for compound walls, septic tanks, and excavations.' },
        { title: '❌ Zero Steel & Concrete Audits', desc: 'No mechanical cube tests or structural blueprints. Rely entirely on masonry guesswork, risking foundation cracking.' },
        { title: '❌ Opaque Material Sourcing', desc: 'Quotes standard brands, but slips in sub-standard cement or local steel to protect their margins.' },
        { title: '❌ Stage payment pressure', desc: 'Demand money based on arbitrary dates, often leaving the homeowner with half-finished work.' },
        { title: '❌ No Guarantees', desc: 'Disappear the day the keys are handed over. Good luck fixing slab dampness or plumbing leaks.' }
      ]
    },
    buildogram: {
      title: 'Buildogram (Engineer-Led CaaS)',
      tagline: 'PhD-grade transparency and certified quality',
      color: 'var(--primary)',
      points: [
        { title: '✅ 100% BOQ-Based Pricing', desc: 'We detail every bag of cement and foot of pipe in a comprehensive Bill of Quantities (BOQ). A fixed-price contract ensures zero overruns.' },
        { title: '✅ PhD-Reviewed Structural Safety', desc: 'Founders have PhD credentials in structural engineering. We run Soil Bearing Capacity (SBC) checks and draft site-specific plans.' },
        { title: '✅ Certified 500+ QC Checks', desc: 'Cube tests for concrete strength, CRS steel corrosion audits, and cover-block alignments. Certificates are posted to your client portal.' },
        { title: '✅ Milestone-Linked Escrow Flow', desc: 'Funds are escrowed and released only after our structural engineers inspect the stage and you approve.' },
        { title: '✅ 10-Year Structural Guarantee', desc: 'A legal, stamp-bound 10-year structural warranty + 1 year full-property leakage and systems coverage.' }
      ]
    }
  };

  const specPreview = {
    classic: {
      price: '₹1,750',
      tag: 'Classic Specs',
      brands: 'Vizag Steel, Ramco Cement, Finolex Wires, Ashirvad Pipes, Cera Fittings.',
      inclusions: 'Architectural drawings, standard interior elevation, plastering M-sand.',
      warranty: '5-Year Structural'
    },
    premium: {
      price: '₹2,200',
      tag: 'Premium Specs (Best Seller)',
      brands: 'Tata Tiscon Steel, UltraTech Cement, Havells Wires, Supreme CPVC, Jaquar Fittings.',
      inclusions: 'Premium floor tiles, weather-shield external paints, modular switches.',
      warranty: '10-Year Structural'
    },
    royal: {
      price: '₹2,850',
      tag: 'Royal Specs (Luxury)',
      brands: 'Tata CRS Corrosion Steel, ACC Gold Cement, Polycab Wires, Astral Pipes, Kohler/Grohe Sanitary.',
      inclusions: 'Imported Marble, solid wood carpentry, custom architectural landscaping.',
      warranty: '10-Year Structural + Anti-Corrosion Warranty'
    }
  };

  const faqs = [
    { q: 'How does Buildogram cost estimator calculate pricing?', a: 'Our estimator uses localized historical datasets for Chennai districts (GCC / CMDA standards). Unlike generic calculators, it accounts for spec levels, soil foundations, and plinth heights. The estimate is indicative; the final cost is locked via a legally binding Bill of Quantities (BOQ).' },
    { q: 'Why is BOQ-first pricing safer than per-square-foot charging?', a: 'Traditional contractors quote a low per-square-foot rate and later demand extra money for excavation depth, brick grades, and painting primers. A BOQ lists every item, quantity, unit rate, and spec grade. It prevents budget escalation because the contract is capped.' },
    { q: 'What quality checks are conducted during construction?', a: 'Buildogram mandates over 500 checks across stages (Excavation, Plinth, Columns, Slabs, Plastering). We perform concrete cube compression testing in accredited labs, check steel tie spacing, and test plumbing for leaks. All reports are uploaded to your Client Portal.' },
    { q: 'How does the milestone-linked payment plan protect my money?', a: 'You do not pay advance lump sums. Payments are split into 8-12 clear physical milestones. You pay the next milestone allotment only when the current stage is completed, audited by our QC engineer, and approved on your portal.' },
    { q: 'What districts in Chennai/Tamil Nadu do you build in?', a: 'We actively build in Chennai City, Kanchipuram, and Tiruvallur districts. This includes specialized coastal guidelines for ECR/OMR (Neelankarai, Sholinganallur) and high-load foundation specifications for clay-heavy areas like Velachery and Tambaram.' }
  ];

  return (
    <div className={styles.page}>
      <Navbar />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className="tag mb-4">🏆 Chennai's Elite Engineer-Led CaaS Platform</div>
            <h1 className={styles.heroTitle}>
              Build Safely with<br />
              <span className={styles.heroGradient}>PhD Structural Engineering</span>
            </h1>
            <p className={styles.heroSub}>
              We combine elite doctoral structural design with live app-based progress tracking and 100% transparent BOQ contracts. Zero surprises. Built to withstand coastal elements.
            </p>
            <div className={styles.heroActions}>
              <Link href="/cost-estimator" className="btn btn-primary btn-lg">
                Calculate Real Cost →
              </Link>
              <Link href="/specifications" className="btn btn-outline btn-lg">
                Compare Brand Packages
              </Link>
            </div>
            <div className={styles.heroStats}>
              {[
                ['PhD-Led', 'Structural Founders'],
                ['500+', 'Quality Checkpoints'],
                ['10-Year', 'Legal Structural Warranty'],
                ['100% BOQ', 'No Flat-Sqft Traps']
              ].map(([v, l]) => (
                <div key={l} className={styles.heroStat}>
                  <span className={styles.heroStatVal}>{v}</span>
                  <span className={styles.heroStatLabel}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC COMPARISON SECTION */}
      <section className="section" style={{ background: 'var(--bg-card2)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="tag mb-4">Choose Wisely</div>
            <h2 style={{ fontSize: '38px', color: 'var(--primary-dark)' }}>Opaque Contractors vs. Buildogram</h2>
            <p className="text-muted mt-4" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              Building a home is your lifetime investment. Do not trust generic square-foot quotes that hide material grades and structural design standards.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex-center mb-6" style={{ gap: '16px' }}>
            <button
              onClick={() => setActiveComparison('contractor')}
              className="btn"
              style={{
                background: activeComparison === 'contractor' ? '#dc2626' : 'white',
                color: activeComparison === 'contractor' ? 'white' : 'var(--text-muted)',
                boxShadow: 'var(--shadow)',
                border: activeComparison === 'contractor' ? 'none' : '1px solid var(--border)'
              }}
            >
              Traditional Contractors
            </button>
            <button
              onClick={() => setActiveComparison('buildogram')}
              className="btn"
              style={{
                background: activeComparison === 'buildogram' ? 'var(--primary)' : 'white',
                color: activeComparison === 'buildogram' ? 'white' : 'var(--text-muted)',
                boxShadow: 'var(--shadow)',
                border: activeComparison === 'buildogram' ? 'none' : '1px solid var(--border)'
              }}
            >
              Buildogram (PhD-Led)
            </button>
          </div>

          {/* Comparison Card Display */}
          <div className="card animate-fade-in" style={{ borderLeft: `6px solid ${comparisonData[activeComparison].color}`, padding: '40px' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--primary-dark)' }}>{comparisonData[activeComparison].title}</h3>
            <p className="text-primary font-semibold text-sm mb-6">{comparisonData[activeComparison].tagline}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {comparisonData[activeComparison].points.map(pt => (
                <div key={pt.title} className="comparisonRow">
                  <strong style={{ fontSize: '15px', color: 'var(--text)' }}>{pt.title}</strong>
                  <span className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>{pt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER CREDENTIALS & TRUST SEALS */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1541888081622-4a0d9f4852ab?auto=format&fit=crop&w=800&q=80" alt="Engineers reviewing structural designs" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </div>
            <div>
              <div className="tag mb-4">Doctoral Expertise</div>
              <h2 style={{ fontSize: '36px', color: 'var(--primary-dark)', marginBottom: '20px' }}>PhD-Led Structural Engineering</h2>
              <p className="text-muted mb-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Most builders are marketing coordinators who subcontract construction to local masonry teams. Buildogram was founded by doctoral alumni specialized in structural integrity and earthquake-resistant designs.
              </p>
              <p className="text-muted mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                We mandate SBC (Soil Bearing Capacity) testing on every plot to ensure custom footings (pile foundation vs raft footing) and concrete cover blocks to resist coastal Chennai salinity.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span className="badge badge-blue">✓ IIT/Alumni Designed</span>
                <span className="badge badge-orange">✓ CMDA Code Compliant</span>
                <span className="badge badge-green">✓ Cube Compression Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMART PACKAGES PREVIEW SECTION */}
      <section className="section" style={{ background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="tag mb-4">Specs Preview</div>
            <h2 style={{ fontSize: '36px', color: 'var(--primary-dark)' }}>Vetted Material Packages</h2>
            <p className="text-muted mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Select a specification level to preview brand inclusions. We guarantee 100% audit compliance for steel and cement.
            </p>
          </div>

          {/* Toggle buttons for specs */}
          <div className="flex-center mb-6" style={{ gap: '12px' }}>
            {['classic', 'premium', 'royal'].map(s => (
              <button
                key={s}
                onClick={() => setActiveSpecTab(s)}
                className="btn btn-sm"
                style={{
                  background: activeSpecTab === s ? 'var(--primary)' : 'var(--bg-card2)',
                  color: activeSpecTab === s ? 'white' : 'var(--text-muted)',
                  borderRadius: '6px',
                  textTransform: 'capitalize'
                }}
              >
                {s} Package
              </button>
            ))}
          </div>

          {/* Display active spec specs */}
          <div className="card animate-fade-in" style={{ padding: '36px', background: 'rgba(15,118,110,0.02)', borderColor: 'rgba(15,118,110,0.15)' }}>
            <div className="flex-between mb-6">
              <h3 style={{ fontSize: '22px', color: 'var(--primary-dark)' }}>{specPreview[activeSpecTab].tag}</h3>
              <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)' }}>
                {specPreview[activeSpecTab].price}<span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>/sq.ft</span>
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px' }}>
              <div><strong>🔌 Core Brands:</strong> <span className="text-muted">{specPreview[activeSpecTab].brands}</span></div>
              <div><strong>🏗️ Finishes & Plans:</strong> <span className="text-muted">{specPreview[activeSpecTab].inclusions}</span></div>
              <div><strong>🛡️ Structural Guarantee:</strong> <span className="badge badge-green">{specPreview[activeSpecTab].warranty}</span></div>
            </div>
            <div className="text-center mt-6">
              <Link href="/specifications" className="btn btn-outline">View Complete Brand Matrix →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES (WHY BUILDOGRAM) */}
      <section className="section" style={{ background: 'var(--bg-card2)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="tag mb-4">Engineered Features</div>
            <h2 style={{ fontSize: '36px', color: 'var(--primary-dark)' }}>Tech-Enabled CaaS Delivery</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🏗️', title: 'PhD-Led Quality Control', desc: 'All structural calculations, foundation selections, and framing plans are signed off by doctoral civil engineers.' },
              { icon: '📋', title: 'Interactive BOQ Binder', desc: 'No lump-sums. Get a granular checklist of every brick, wire, and pipe with locked pricing before signing.' },
              { icon: '📱', title: 'Live Site E-Monitoring', desc: 'CCTV streaming, concrete strength testing charts, daily weather logs, and worker count tracked live on your client portal.' },
              { icon: '💰', title: 'Escrow Milestone Clearing', desc: 'Funds stay secure. You only release milestone segments once independent inspectors approve work quality.' },
              { icon: '🔍', title: '500+ Point QC Audit', desc: 'Rigorous tests: concrete slump tests, rebar corrosion coatings checks, plumbing hydrostatic pressure runs.' },
              { icon: '🛡️', title: '10-Year Stamp Warranties', desc: 'A registered legal guarantee ensuring foundation, beams, and columns remain resilient for decades.' }
            ].map(f => (
              <div key={f.title} className="card card-hover" style={{ background: 'var(--bg-card)' }}>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--primary-dark)' }}>{f.title}</h3>
                <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.7' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS MINI */}
      <section className="section" style={{ background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="tag mb-4">The Process</div>
            <h2 style={{ fontSize: '36px', color: 'var(--primary-dark)' }}>6 Steps to Handover</h2>
          </div>
          <div className={styles.steps}>
            {[
              { n: '01', title: 'Estimate', desc: 'Configure size, plot specs, and budget range online.' },
              { n: '02', title: 'Consultation', desc: 'Meet our PhD structural engineer to audit plot soil.' },
              { n: '03', title: 'Designs & BOQ', desc: 'Approve customized floor layouts and itemized prices.' },
              { n: '04', title: 'Contracts', desc: 'Sign legal milestone agreements with brand lists locked.' },
              { n: '05', title: 'E-Monitoring', desc: 'Track daily logs, QC charts, and site streaming.' },
              { n: '06', title: 'Handover', desc: 'Collect warranties, test sheets, and structural files.' },
            ].map((s, i) => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepNum}>{s.n}</div>
                {i < 5 && <div className={styles.stepLine} />}
                <h4 style={{ fontSize: '14px', marginBottom: '6px', color: 'var(--primary-dark)' }}>{s.title}</h4>
                <p className="text-muted" style={{ fontSize: '12px', lineHeight: '1.5' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/how-it-works" className="btn btn-primary btn-lg">Explore Detailed Stages →</Link>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FAQ ACCORDION */}
      <section className="section" style={{ background: 'var(--bg-card2)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="tag mb-4">Got Questions?</div>
            <h2 style={{ fontSize: '36px', color: 'var(--primary-dark)' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="card" style={{ padding: '20px 24px', cursor: 'pointer' }} onClick={() => toggleFaq(idx)}>
                <div className="flex-between" style={{ fontWeight: '600', color: 'var(--primary-dark)', fontSize: '15px' }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '18px', color: 'var(--primary)' }}>{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <div className="text-muted mt-3 animate-fade-in" style={{ fontSize: '14px', lineHeight: '1.7', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner} style={{ background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '38px', marginBottom: '16px', color: 'white' }}>Ready to Build Your Chennai Home?</h2>
          <p className="text-muted" style={{ fontSize: '16px', marginBottom: '32px', color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '16px auto' }}>
            Join 50+ Chennai families who chose doctoral engineering accuracy and transparent milestone security. Talk directly to a structural engineer.
          </p>
          <div className="flex-center gap-4">
            <Link href="/cost-estimator" className="btn btn-primary btn-lg" style={{ background: 'var(--accent)' }}>Calculate Cost</Link>
            <Link href="/contact" className="btn btn-outline btn-lg" style={{ color: 'white !important', borderColor: 'white !important' }}>Talk to an Engineer</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <Link href="/" className={styles.logo} style={{ marginBottom: '16px', display: 'inline-flex' }}>
                <span className={styles.logoIcon}>⬡</span><span>Buildogram</span>
              </Link>
              <p className="text-muted" style={{ fontSize: '14px', marginTop: '12px', maxWidth: '260px' }}>
                PhD-led structural engineering and Construction-as-a-Service aggregator platform for Chennai & Tamil Nadu.
              </p>
            </div>
            {[
              { title: 'Services', links: [['How It Works', '/how-it-works'], ['Material Specs', '/specifications'], ['Cost Estimator', '/cost-estimator'], ['Chennai Construction', '/construction-in-chennai'], ['Our Projects', '/projects']] },
              { title: 'Compare', links: [['Vs Local Mason', '/why-vs-mason'], ['Vs Corporate Aggregators', '/why-vs-aggregators'], ['Warranty & Loans', '/warranty-and-maintenance']] },
              { title: 'Company', links: [['About Us', '/about'], ['Blog', '/blog'], ['Contact', '/contact'], ['Careers', '#']] },
              { title: 'Portals', links: [['Client Login', '/login'], ['Partner Login', '/login'], ['Ops Console', '/login']] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>{col.title}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}><Link href={href} className="text-muted" style={{ fontSize: '14px' }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.footerBottom}>
            <span className="text-muted text-sm">© 2024 Buildogram. All rights reserved.</span>
            <span className="text-muted text-sm">Chennai, Tamil Nadu, India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
