'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import styles from './page.module.css';

/* ─── Data ───────────────────────────────────────────────── */

const ECOSYSTEM = [
  { icon: '🏗️', title: 'Build', sub: 'Construction & PMC', href: '/build', color: '#2563eb', bg: '#eff6ff' },
  { icon: '📊', title: 'BOQ & Quality', sub: 'Transparent pricing', href: '/build', color: '#7c3aed', bg: '#f5f3ff' },
  { icon: '🧱', title: 'Materials', sub: 'Verified supply', href: '/materials', color: '#d97706', bg: '#fffbeb' },
  { icon: '🛂', title: 'Property Passport', sub: 'Permanent record', href: '/property-passport', color: '#059669', bg: '#ecfdf5' },
  { icon: '🏡', title: 'Rent & Buy', sub: '360 listings', href: '/contact', color: '#dc2626', bg: '#fef2f2' },
  { icon: '🔧', title: 'Maintenance', sub: 'AMC & repairs', href: '/maintenance', color: '#ea580c', bg: '#fff7ed' },
];

const PROOF_PILLARS = [
  { icon: '📊', title: 'Transparent BOQ', desc: 'Every item, rate and quantity declared upfront. No hidden costs or surprise extras.' },
  { icon: '✅', title: 'BQS™ Quality Checks', desc: '2500+ evidence-backed stage-wise quality inspections with photo proof.' },
  { icon: '🧱', title: 'Material Verification', desc: 'Brand, grade, test certificate and delivery photo for every material entry.' },
  { icon: '📸', title: 'Progress Proof', desc: 'Daily photo and video site updates shared directly on your client portal.' },
  { icon: '🛂', title: 'Property Passport™', desc: 'Permanent digital record of your property — from build to resale.' },
  { icon: '🔒', title: 'Warranty Backed', desc: 'Structural and waterproofing warranty with registered documentation.' },
];

const COMPARISON = {
  contractor: {
    title: 'Traditional Contractors (Opaque & Risky)',
    tagline: 'Opaque pricing and high-stress delivery',
    color: '#dc2626',
    points: [
      { title: '❌ Per-Sq.Ft Pricing Myth', desc: 'Lures you in with a low flat rate, then charges exorbitant "extra fees" for compound walls, septic tanks, and excavations.' },
      { title: '❌ Zero Steel & Concrete Audits', desc: 'No mechanical cube tests or structural blueprints. Rely entirely on masonry guesswork, risking foundation cracking.' },
      { title: '❌ Opaque Material Sourcing', desc: 'Quotes standard brands, but slips in sub-standard cement or local steel to protect their margins.' },
      { title: '❌ Stage payment pressure', desc: 'Demand money based on arbitrary dates, often leaving the homeowner with half-finished work.' },
      { title: '❌ No Guarantees', desc: 'Disappear the day the keys are handed over. Good luck fixing slab dampness or plumbing leaks.' },
    ],
  },
  buildogram: {
    title: 'Buildogram (Proof-Based Platform)',
    tagline: 'Full transparency, quality proof and Property Passport',
    color: '#FFDA01',
    points: [
      { title: '✅ 100% BOQ-Based Pricing', desc: 'We detail every bag of cement and foot of pipe. A fixed-price contract ensures zero overruns.' },
      { title: '✅ BQS™ 2500+ Quality Checks', desc: 'Stage-wise quality inspections with photo proof, cube tests and material certificates uploaded to your portal.' },
      { title: '✅ Verified Material Brands', desc: 'Every material — brand, grade, batch, delivery — recorded with proof. No substitutions without your approval.' },
      { title: '✅ Milestone-Linked Payments', desc: 'Funds released only after independent quality inspection and your approval at each milestone.' },
      { title: '✅ Property Passport™ at Handover', desc: 'Your property handed over with a permanent digital record — legal documents, BOQ, materials, quality, warranty, media.' },
    ],
  },
};

const SPEC_PREVIEW = {
  classic: { price: '₹1,750', tag: 'Classic Specs', brands: 'Vizag Steel, Ramco Cement, Finolex Wires, Ashirvad Pipes, Cera Fittings.', inclusions: 'Architectural drawings, standard interior elevation, plastering M-sand.', warranty: '5-Year Structural' },
  premium: { price: '₹2,200', tag: 'Premium Specs (Best Seller)', brands: 'Tata Tiscon Steel, UltraTech Cement, Havells Wires, Supreme CPVC, Jaquar Fittings.', inclusions: 'Premium floor tiles, weather-shield external paints, modular switches.', warranty: '10-Year Structural' },
  royal: { price: '₹2,850', tag: 'Royal Specs (Luxury)', brands: 'Tata CRS Corrosion Steel, ACC Gold Cement, Polycab Wires, Astral Pipes, Kohler/Grohe Sanitary.', inclusions: 'Imported Marble, solid wood carpentry, custom architectural landscaping.', warranty: '10-Year Structural + Anti-Corrosion Warranty' },
};

const FAQS = [
  { q: 'What is Buildogram?', a: 'Buildogram is India\'s Property Transparency Platform. We help property owners plan, build, verify, buy materials, track quality, create a Property Passport, list for rent or resale, and maintain their property — all with proof at every step.' },
  { q: 'What is a Property Passport™?', a: 'Property Passport is a permanent digital record of your property. It stores legal documents, drawings, BOQ, material records, quality check reports, progress media, warranty and maintenance history — making your property easier to maintain, rent, sell or verify.' },
  { q: 'How does BOQ-based pricing protect me?', a: 'Traditional contractors quote a low per-square-foot rate and later demand extra money for excavation, brick grades, and painting primers. A BOQ lists every item, quantity, unit rate, and spec grade. It prevents budget escalation because the contract is capped at the agreed total.' },
  { q: 'What quality checks are conducted during construction?', a: 'Buildogram\'s BQS™ system mandates 2500+ checks across all stages (Excavation, Plinth, Columns, Slabs, Plastering, Finishes). We perform concrete cube compression testing, check steel tie spacing, and test plumbing for leaks. All reports are uploaded to your Client Portal.' },
  { q: 'How does the milestone-linked payment plan work?', a: 'Payments are split into clear physical milestones. You pay the next milestone only when the current stage is completed, quality-checked by our engineer, and approved on your portal. No advance lump sums.' },
  { q: 'Where do you operate?', a: 'We primarily serve Chennai and its districts — Kanchipuram, Tiruvallur, and surrounding areas. For materials, we serve Chennai city-wide with delivery proof included.' },
];

const PARTNER_TYPES = ['🏗️ Builders', '👷 Contractors', '📐 Architects', '🧱 Suppliers', '🏠 Real Estate Agents', '🔧 Maintenance Vendors'];

const FOOTER_COLS = [
  { title: 'Build', links: [['Home Construction', '/build/home-construction'], ['Villa Construction', '/build/villa-construction'], ['Renovation', '/build/renovation'], ['BOQ Audit', '/boq-audit'], ['Plan Review', '/plan-review'], ['Cost Estimator', '/cost-estimator']] },
  { title: 'Property', links: [['Verified Rentals', '/rentals'], ['Property Passport™', '/property-passport'], ['Maintenance & AMC', '/maintenance'], ['Warranty', '/warranty-and-maintenance'], ['Materials', '/materials'], ['Partners', '/partners']] },
  { title: 'Learn', links: [['How It Works', '/how-it-works'], ['Specifications', '/specifications'], ['Chennai Guide', '/construction-in-chennai'], ['Blog', '/blog'], ['About Us', '/about']] },
  { title: 'Portals', links: [['Client Login', '/login'], ['Partner Login', '/login'], ['Ops Console', '/login'], ['Contact Us', '/contact']] },
];

/* ─── Component ──────────────────────────────────────────── */

export default function Home() {
  const [activeComparison, setActiveComparison] = useState('buildogram');
  const [activeSpecTab, setActiveSpecTab]     = useState('premium');
  const [openFaq, setOpenFaq]                 = useState(null);

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '110px 0 90px', position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 40%, rgba(255,218,1,0.09) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,218,1,0.4), transparent)' }} />

        <div className="container" style={{ position: 'relative', width: '100%' }}>
          <div style={{ maxWidth: '760px' }}>
            {/* Pill badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,218,1,0.1)', border: '1px solid rgba(255,218,1,0.25)', borderRadius: '999px', padding: '8px 20px', marginBottom: '32px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFDA01', display: 'inline-block', boxShadow: '0 0 8px #FFDA01' }} />
              <span style={{ color: '#FFDA01', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>India's Property Transparency Platform</span>
            </div>

            {/* Headline */}
            <h1 style={{ color: 'white', fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 1.05, marginBottom: '28px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800 }}>
              Build with proof,<br />
              <span style={{ color: '#FFDA01' }}>not promises.</span>
            </h1>

            {/* Sub */}
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.75, marginBottom: '20px', maxWidth: '640px' }}>
              Plan, build, track quality, buy materials, store records, rent, sell and maintain your property — with proof at every stage.
            </p>
            <p style={{ fontFamily: 'DM Serif Text, serif', fontStyle: 'italic', color: '#BBA07A', fontSize: 'clamp(17px, 2.2vw, 22px)', marginBottom: '44px' }}>
              Buy. Build. Track. Rent. Sell. Maintain.
            </p>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
              <Link href="/contact" className="btn btn-primary btn-lg">Get Construction Consultation</Link>
              <Link href="/boq-audit" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Upload BOQ for Review</Link>
              <Link href="/properties/list-your-property" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>List Your Property</Link>
              <Link href="/materials" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Request Material Quote</Link>
            </div>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[['2500+', 'Quality Checks'], ['BOQ', 'Transparent Pricing'], ['Lifetime', 'Property Passport'], ['Chennai', 'Primary Market']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '26px', fontWeight: 800, color: '#FFDA01' }}>{v}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ ECOSYSTEM STRIP ══════════════════ */}
      <section style={{ background: '#FFDA01', padding: '0' }}>
        <div className="container" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {ECOSYSTEM.map((e, i) => (
            <Link key={e.title} href={e.href} style={{ flex: '1 0 auto', minWidth: '140px', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: '6px', borderRight: i < ECOSYSTEM.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none', transition: 'background 0.2s', cursor: 'pointer' }}
              onMouseEnter={e2 => e2.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
              onMouseLeave={e2 => e2.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '24px' }}>{e.icon}</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '13px', fontWeight: 700, color: '#292929' }}>{e.title}</span>
              <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.55)', fontWeight: 500 }}>{e.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════ WHAT IS BUILDOGRAM ══════════════════ */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="tag">The Buildogram Ecosystem</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginTop: '16px', marginBottom: '20px', color: '#292929' }}>
              Not just a contractor.<br />A property operating system.
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', fontSize: '18px', lineHeight: 1.7 }}>
              Buildogram connects construction, quality, materials, property records, partner network, rental/resale listings and maintenance into one proof-based platform.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '24px' }}>
            {[
              { icon: '🏗️', title: 'Build', color: '#2563eb', bg: '#eff6ff', href: '/build', desc: 'Home, villa, commercial and renovation construction with BOQ clarity and quality checks.', cta: 'Start Building →' },
              { icon: '🧱', title: 'Materials', color: '#d97706', bg: '#fffbeb', href: '/materials', desc: 'Buy cement, steel, sand, tiles and all materials at market-best rates with verified delivery.', cta: 'Request Quote →' },
              { icon: '🛂', title: 'Property Passport™', color: '#059669', bg: '#ecfdf5', href: '/property-passport', desc: 'Permanent digital proof record — documents, BOQ, materials, quality, warranty, maintenance.', cta: 'Create Passport →' },
              { icon: '🏡', title: 'Rent & Buy', color: '#dc2626', bg: '#fef2f2', href: '/contact', desc: '360-tour verified rental and resale listings linked to Property Passport records.', cta: 'List Property →' },
              { icon: '🤝', title: 'Partners', color: '#7c3aed', bg: '#f5f3ff', href: '/partners', desc: 'Builders, contractors, architects, suppliers and agents grow their business with Buildogram.', cta: 'Join Network →' },
              { icon: '🔧', title: 'Maintenance', color: '#ea580c', bg: '#fff7ed', href: '/maintenance', desc: 'Waterproofing, plumbing, electrical repairs and AMC contracts with before/after proof.', cta: 'Request Service →' },
            ].map(s => (
              <Link key={s.title} href={s.href} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '18px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#292929' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.65, marginBottom: '20px' }}>{s.desc}</p>
                  <span style={{ color: s.color, fontWeight: 700, fontSize: '14px' }}>{s.cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ BUILD WITH PROOF ══════════════════ */}
      <section className="section" style={{ background: 'var(--secondary)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <span className="tag" style={{ background: 'rgba(255,218,1,0.12)', color: '#FFDA01', border: '1px solid rgba(255,218,1,0.2)' }}>Build with Proof</span>
              <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '24px' }}>
                Every rupee accounted for.<br />Every stage documented.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.75, marginBottom: '36px' }}>
                Construction with Buildogram means a transparent BOQ, 2500+ quality checks, verified material records and a Property Passport at handover. No surprises.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/build" className="btn btn-primary btn-lg">Explore Construction</Link>
                <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white', background: 'transparent' }}>Calculate Cost</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {PROOF_PILLARS.map(p => (
                <div key={p.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{p.icon}</div>
                  <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{p.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PROPERTY PASSPORT ══════════════════ */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            {/* Left: Passport visual */}
            <div style={{ background: 'var(--secondary)', borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,218,1,0.12), transparent)', borderRadius: '50%' }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px' }}>
                <span style={{ color: '#FFDA01', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>🛂 Property Passport™</span>
              </div>
              <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '24px' }}>Your property's permanent proof record</h3>
              {['📄 Legal Documents & Approvals', '📊 BOQ & Cost Records', '🧱 Material Proof', '✅ 2500+ Quality Checks', '📸 Progress Photos & Videos', '🔒 Warranty Records', '🔧 Maintenance History', '🏠 Rental/Resale Readiness Score'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{item}</span>
                </div>
              ))}
              <Link href="/property-passport" className="btn btn-primary" style={{ marginTop: '28px', width: '100%', justifyContent: 'center', display: 'flex' }}>Create My Passport →</Link>
            </div>
            {/* Right: Copy */}
            <div>
              <span className="tag">Property Passport™</span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '20px', color: '#292929' }}>
                Every property deserves a permanent record.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.75, marginBottom: '28px' }}>
                Property Passport is Buildogram's biggest moat. It's a permanent, secure digital record of your property — covering everything from Day 1 of construction to years of maintenance.
              </p>
              {[
                { icon: '🏗️', text: 'Makes construction transparent from the start' },
                { icon: '📈', text: 'Increases resale value with verified quality proof' },
                { icon: '🏡', text: 'Faster rental conversions with verified property records' },
                { icon: '🔧', text: 'Maintenance history tracked for every repair' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{b.icon}</span>
                  <span style={{ fontSize: '16px', color: 'var(--text)', lineHeight: 1.5 }}>{b.text}</span>
                </div>
              ))}
              <Link href="/property-passport" className="btn btn-primary btn-lg" style={{ marginTop: '12px' }}>Create Property Passport →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ MATERIALS STRIP ══════════════════ */}
      <section style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '64px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <span className="tag">Material Marketplace</span>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginTop: '16px', marginBottom: '16px', color: '#292929' }}>
                Buy verified materials at market-best rates.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
                Cement, steel, sand, tiles, electrical and plumbing materials — with brand verification, delivery proof and material records added to your Property Passport.
              </p>
              <Link href="/materials" className="btn btn-primary">Request Material Quote →</Link>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { icon: '🏭', name: 'Cement', brands: 'UltraTech, Ramco, Dalmia' },
                { icon: '⚙️', name: 'Steel', brands: 'Tata Tiscon, SAIL, Vizag' },
                { icon: '🪨', name: 'Sand & M-Sand', brands: 'River, M-Sand, P-Sand' },
                { icon: '🧱', name: 'Blocks', brands: 'Solid, Hollow, Red brick' },
                { icon: '🔌', name: 'Electrical', brands: 'Havells, Legrand, Finolex' },
                { icon: '🚿', name: 'Plumbing', brands: 'Ashirvad, Supreme, Finolex' },
                { icon: '🏠', name: 'Tiles', brands: 'Asian, Kajaria, Johnson' },
                { icon: '🎨', name: 'Paint', brands: 'Asian, Berger, Nerolac' },
              ].map(m => (
                <div key={m.name} style={{ background: '#F9F9F9', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', minWidth: '130px', flex: '1 0 auto' }}>
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#292929', marginBottom: '3px' }}>{m.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.brands}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PARTNER ECOSYSTEM ══════════════════ */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Partner Ecosystem</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginTop: '16px', marginBottom: '16px', color: '#292929' }}>
              Grow your construction business with Buildogram.
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto', fontSize: '17px', lineHeight: 1.7 }}>
              Builders, contractors, architects, suppliers, agents and maintenance vendors — get leads, verified profile, reels and material benefits.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            {PARTNER_TYPES.map(p => (
              <div key={p} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '999px', padding: '12px 24px', fontSize: '15px', fontWeight: 600, color: '#292929', boxShadow: 'var(--shadow)' }}>
                {p}
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
            {[
              { icon: '🎯', title: 'Quality Leads', desc: 'Pre-qualified homeowner leads delivered in your service area.' },
              { icon: '✅', title: 'Verified Badge', desc: 'Buildogram-verified profile that builds instant customer trust.' },
              { icon: '🎥', title: 'Reels & Content', desc: 'Project showcase reels created by our content team for you.' },
            ].map(b => (
              <div key={b.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{b.icon}</div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '6px' }}>{b.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/partners" className="btn btn-primary btn-lg">Join Partner Network →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ COMPARISON (kept) ══════════════════ */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="tag">Choose Wisely</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px', color: '#292929' }}>Opaque Contractors vs. Buildogram</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '12px', maxWidth: '580px', margin: '12px auto 0', fontSize: '16px' }}>
              Building a home is your lifetime investment. Do not trust generic square-foot quotes that hide material grades and structural design standards.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px' }}>
            {[['contractor', 'Traditional Contractors', '#dc2626'], ['buildogram', 'Buildogram', '#292929']].map(([key, label, bg]) => (
              <button key={key} onClick={() => setActiveComparison(key)}
                style={{ padding: '12px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', border: '2px solid', transition: 'all 0.2s',
                  background: activeComparison === key ? bg : 'white',
                  color: activeComparison === key ? (key === 'buildogram' ? '#FFDA01' : 'white') : '#64748b',
                  borderColor: activeComparison === key ? bg : '#e2e8f0',
                }}>
                {label}
              </button>
            ))}
          </div>
          <div className="card animate-fade-in" style={{ borderLeft: `6px solid ${COMPARISON[activeComparison].color}`, padding: '40px', maxWidth: '860px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '6px', color: '#292929' }}>{COMPARISON[activeComparison].title}</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '14px', marginBottom: '28px' }}>{COMPARISON[activeComparison].tagline}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {COMPARISON[activeComparison].points.map(pt => (
                <div key={pt.title} className="comparisonRow">
                  <strong style={{ fontSize: '15px', color: 'var(--text)' }}>{pt.title}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>{pt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ MAINTENANCE ══════════════════ */}
      <section style={{ background: 'var(--secondary)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <span className="tag" style={{ background: 'rgba(255,218,1,0.12)', color: '#FFDA01', border: '1px solid rgba(255,218,1,0.2)' }}>After Handover</span>
              <h2 style={{ color: 'white', fontSize: 'clamp(26px, 3.5vw, 42px)', marginTop: '16px', marginBottom: '20px' }}>
                Buildogram doesn't stop at handover.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', lineHeight: 1.75, marginBottom: '32px' }}>
                Waterproofing, plumbing, electrical repairs and AMC contracts — with before/after photos and maintenance history added to your Property Passport.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/maintenance" className="btn btn-primary btn-lg">Request Maintenance</Link>
                <Link href="/maintenance#amc" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.25)', color: 'white', background: 'transparent' }}>View AMC Plans</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: '💧', service: 'Waterproofing', desc: 'Terrace, bathroom, wall waterproofing with warranty' },
                { icon: '🚿', service: 'Plumbing Repair', desc: 'Pipe leaks, blockages, fitting replacements' },
                { icon: '⚡', service: 'Electrical', desc: 'Wiring faults, fan/light issues, board additions' },
                { icon: '📋', service: 'AMC Contracts', desc: 'Annual maintenance with scheduled visits and priority service' },
              ].map(s => (
                <div key={s.service} style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px 20px', alignItems: 'center' }}>
                  <span style={{ fontSize: '28px', flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>{s.service}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '2px' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SPEC PACKAGES ══════════════════ */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="tag">Material Packages</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px', color: '#292929' }}>Vetted Brand Packages</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '16px' }}>Select a specification level to preview brand inclusions. Every brand is verified.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
            {['classic', 'premium', 'royal'].map(s => (
              <button key={s} onClick={() => setActiveSpecTab(s)} style={{ padding: '10px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', border: '2px solid', transition: 'all 0.2s', textTransform: 'capitalize',
                background: activeSpecTab === s ? '#292929' : 'white',
                color: activeSpecTab === s ? '#FFDA01' : '#64748b',
                borderColor: activeSpecTab === s ? '#292929' : '#e2e8f0',
              }}>
                {s}
              </button>
            ))}
          </div>
          <div className="card animate-fade-in" style={{ padding: '36px', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '20px', color: '#292929' }}>{SPEC_PREVIEW[activeSpecTab].tag}</h3>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#292929', fontFamily: 'Space Grotesk, sans-serif' }}>
                {SPEC_PREVIEW[activeSpecTab].price}<span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/sq.ft</span>
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px' }}>
              <div><strong>🔌 Core Brands:</strong> <span style={{ color: 'var(--text-muted)' }}>{SPEC_PREVIEW[activeSpecTab].brands}</span></div>
              <div><strong>🏗️ Finishes & Plans:</strong> <span style={{ color: 'var(--text-muted)' }}>{SPEC_PREVIEW[activeSpecTab].inclusions}</span></div>
              <div><strong>🛡️ Structural Guarantee:</strong> <span className="badge badge-green">{SPEC_PREVIEW[activeSpecTab].warranty}</span></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/specifications" className="btn btn-outline">View Complete Brand Matrix →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="tag">Got Questions?</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px', color: '#292929' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className="card" style={{ padding: '20px 24px', cursor: 'pointer', transition: 'all 0.2s', border: openFaq === idx ? '1px solid #FFDA01' : '1px solid var(--border)' }} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, color: '#292929', fontSize: '15px', gap: '16px' }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#FFDA01', flexShrink: 0, fontWeight: 400 }}>{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <div className="animate-fade-in" style={{ color: 'var(--text-muted)', marginTop: '14px', fontSize: '14px', lineHeight: 1.75, borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section style={{ background: 'var(--secondary)', padding: '100px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Start Your Property Journey</span>
          </div>
          <h2 style={{ color: 'white', fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.1, marginBottom: '20px' }}>
            Buildogram turns property into a<br />
            <span style={{ color: '#FFDA01' }}>proof-based journey.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', marginBottom: '44px', lineHeight: 1.7 }}>
            Whether you're building, buying materials, listing a property, joining as a partner or requesting maintenance — Buildogram connects it all.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/cost-estimator" className="btn btn-primary btn-lg">Calculate Construction Cost</Link>
            <Link href="/property-passport" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Create Property Passport</Link>
            <Link href="/contact" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', background: 'transparent' }}>Talk to Us</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background: '#111111', color: 'white', padding: '64px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            {/* Brand col */}
            <div>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
                <span style={{ fontSize: '24px' }}>⬡</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '20px', color: 'white' }}>Buildogram</span>
              </Link>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, maxWidth: '240px', marginBottom: '20px' }}>
                India's Property Transparency Platform. Build with proof, not promises.
              </p>
              <div style={{ fontFamily: 'DM Serif Text, serif', fontStyle: 'italic', color: '#BBA07A', fontSize: '15px' }}>
                Buy. Build. Track. Rent. Sell. Maintain.
              </div>
            </div>
            {/* Link columns */}
            {FOOTER_COLS.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>{col.title}</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#FFDA01'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                      >{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>© 2025 Buildogram. All rights reserved. Chennai, Tamil Nadu, India.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[['Privacy Policy', '#'], ['Terms', '#'], ['Refund Policy', '#']].map(([l, h]) => (
                <Link key={l} href={h} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
