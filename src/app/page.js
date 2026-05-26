'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

const PAIN_POINTS = [
  { icon: '📋', title: 'Contractor quotes are hard to verify', desc: 'Multiple quotes with no standard scope make cost comparison nearly impossible for most owners.' },
  { icon: '📐', title: 'BOQ and drawings feel confusing', desc: 'Quantities, specifications, and line items in documents are difficult for non-engineers to interpret.' },
  { icon: '🧱', title: 'Material rates and quality are unclear', desc: 'Owners often pay retail prices or receive incorrect grades without knowing the difference.' },
  { icon: '📸', title: 'Site updates are inconsistent', desc: 'Contractors give verbal progress updates with no documentation, photos, or milestone proof.' },
  { icon: '💸', title: 'Hidden charges and cost escalation', desc: 'Unplanned costs and scope changes create financial stress and distrust mid-project.' },
  { icon: '✅', title: 'Quality checks are missing', desc: 'Work quality is rarely documented, leaving owners with no records for disputes or future reference.' },
  { icon: '🤝', title: 'Managing multiple parties is exhausting', desc: 'Coordinating architects, contractors, suppliers, and site teams separately creates gaps and confusion.' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: '🗺️', title: 'Understand Your Requirement', desc: 'Plot size, location, budget, construction type, timeline, and expectations — clearly mapped before any execution begins.' },
  { step: '02', icon: '📋', title: 'Review Plan, BOQ & Scope', desc: 'Buildogram helps review drawings, project scope, quantities, specifications, and cost structure for clarity before you commit.' },
  { step: '03', icon: '🤝', title: 'Connect With Verified Partners', desc: 'Architects, builders, contractors, consultants, suppliers, and execution partners are matched based on your specific project needs.' },
  { step: '04', icon: '🧱', title: 'Source Materials Transparently', desc: 'Cement, steel, sand, electrical, plumbing, waterproofing, solar and more — sourced through our trusted supplier network with rate comparison.' },
  { step: '05', icon: '📊', title: 'Track, Verify & Store Records', desc: 'Site updates, work proof, delivery photos, invoices, quality notes, and project history are stored inside your Property Passport.' },
];

const SERVICES = [
  { icon: '🏗️', title: 'Home Construction Guidance', desc: 'Engineer-led support from planning to execution — covering scope, specifications, contractor selection, and site coordination.', href: '/contact?type=construction' },
  { icon: '📋', title: 'BOQ & Plan Review', desc: 'Review scope, quantities, specifications, drawings, and cost clarity before you sign any contractor agreement.', href: '/boq-audit' },
  { icon: '🤝', title: 'Verified Partner Network', desc: 'Connect with trusted builders, contractors, architects, consultants, and suppliers through a reviewed and managed network.', href: '/partners/directory' },
  { icon: '🧱', title: 'Material Sourcing Support', desc: 'Transparent support for cement, steel, sand, electrical, plumbing, tiles, paint, waterproofing, solar, and more.', href: '/materials' },
  { icon: '📸', title: 'Site Progress Tracking', desc: 'Track milestones, photos, delivery proof, execution status, and project updates through your Buildogram partner dashboard.', href: '/projects' },
  { icon: '🏠', title: 'Property Passport', desc: 'Maintain digital records of drawings, invoices, materials, vendors, project photos, quality notes, and future maintenance details.', href: '/property-passport' },
];

const ECOSYSTEM = [
  { icon: '🏠', label: 'Homeowners & Plot Owners' },
  { icon: '🏗️', label: 'Builders & Contractors' },
  { icon: '📐', label: 'Architects & Consultants' },
  { icon: '🧱', label: 'Material Suppliers' },
  { icon: '⚙️', label: 'Site Service Providers' },
  { icon: '🏢', label: 'Property Portals' },
  { icon: '🔧', label: 'Maintenance Partners' },
  { icon: '🎬', label: 'Project Showcase' },
];

const MATERIALS = [
  'Cement', 'TMT Steel', 'River Sand', 'M-Sand', 'Aggregates',
  'Electrical', 'Plumbing', 'Tiles', 'Paint', 'Waterproofing', 'Solar',
];

const TRUST = [
  { icon: '🎓', title: 'Engineer-led approach', desc: 'Every recommendation is backed by engineering principles, not just sales incentives.' },
  { icon: '✅', title: 'Verified partner network', desc: 'Partners submit credentials, project records, and service categories for profile review.' },
  { icon: '📋', title: 'BOQ and cost clarity', desc: 'Helping owners understand scope and quantities before signing any agreement.' },
  { icon: '🧱', title: 'Transparent material support', desc: 'Competitive market-aligned quotes with supplier comparison — no hidden markups.' },
  { icon: '📸', title: 'Site progress visibility', desc: 'Milestone photos, delivery records, and daily logbooks tracked through the platform.' },
  { icon: '📁', title: 'Property Passport records', desc: 'All project documents, invoices, and records stored digitally for lifetime access.' },
  { icon: '🤝', title: 'Not just leads — accountability', desc: 'Buildogram stays involved through the project journey, not just the initial match.' },
];

const PARTNER_BENEFITS = [
  { icon: '🛡️', title: 'Verified Profile', desc: 'Build trust with property owners through a reviewed, credible platform presence.' },
  { icon: '🎬', title: 'Project Showcase', desc: 'Showcase completed work, site photos, and project proof to attract serious clients.' },
  { icon: '📲', title: 'Reel Collaboration', desc: 'Collaborate on social media reels and project showcase content through Buildogram.' },
  { icon: '🎯', title: 'Project Opportunities', desc: 'Receive relevant construction project enquiries matched to your specialisation.' },
  { icon: '🧱', title: 'Material Network', desc: 'Access Buildogram\'s material sourcing network for better procurement coordination.' },
  { icon: '🌐', title: 'Ecosystem Visibility', desc: 'Long-term visibility in an engineer-led construction platform built for owners and professionals.' },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loc, setLoc] = useState('Chennai, TN');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/partners/directory?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(loc)}`);
    }
  };

  return (
    <main className="engineerLedPage">

      {/* ── 1. HERO ── */}
      <section className={styles.homeHeroBg}>
        <div className="sectionInnerWide">
          <div className={styles.homeHero}>
            <div className={styles.heroLeft}>
              <span className={styles.eyebrow}>Engineer-Led Construction Companion</span>
              <h1>Build Your Home<br />With Clarity &amp; Confidence.</h1>
              <p>From BOQ review and contractor selection to material sourcing, site tracking, quality checks, and property records — Buildogram helps you build with clarity, control, and accountability.</p>

              <form className={styles.heroSearchPanel} onSubmit={handleHeroSearch}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search builders, architects, material support..." />
                <select value={loc} onChange={e => setLoc(e.target.value)}>
                  <option value="Chennai, TN">Chennai, TN</option>
                  <option value="Coimbatore, TN">Coimbatore, TN</option>
                </select>
                <button type="submit" className="btn btn-primary">Search</button>
              </form>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                {['🎓 Engineer-led guidance', '✅ Verified construction partners', '🧱 Transparent material sourcing', '📸 Site progress tracking'].map(b => (
                  <span key={b} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{b}</span>
                ))}
              </div>

              <div className={styles.quick} style={{ marginTop: '28px' }}>
                <Link href="/contact?type=construction">Start Your Construction Journey</Link>
                <Link href="/materials">Material Support</Link>
                <Link href="/contact?type=boq_audit">BOQ Review</Link>
              </div>
            </div>

            {/* Hero visual — dashboard cards */}
            <div className={styles.heroBoard}>
              <div className={styles.metric}>
                <span>BOQ Review</span>
                <b>Scope Clarity</b>
              </div>
              <div className={styles.metric}>
                <span>Material Quotes</span>
                <b>Supplier Network</b>
              </div>
              <div className={styles.metric}>
                <span>Site Progress</span>
                <b>Photo Verified</b>
              </div>
              <div className={styles.metric}>
                <span>Property Passport</span>
                <b>Digital Records</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM SECTION ── */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Why Owners Need a Construction Companion</span>
            <h2>Building a home shouldn't feel risky or confusing.</h2>
            <p>Most property owners face the same challenges when trying to build — without the right guidance and tools, mistakes are costly and difficult to reverse.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {PAIN_POINTS.map((p, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '18px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '15px', marginBottom: '6px' }}>{p.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', background: 'var(--gradient-orange)', borderRadius: '18px', padding: '28px 32px', color: 'white', textAlign: 'center' }}>
            <p style={{ fontSize: '17px', fontWeight: 600, color: 'white', maxWidth: '720px', margin: '0 auto' }}>
              Buildogram brings engineering clarity, verified partners, material support, and progress visibility into one connected construction system.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className={`fullBleedSection ${styles.sectionBand}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>The Construction Companion Process</span>
            <h2>How Buildogram works as your construction companion.</h2>
            <p>A structured, engineering-led approach from first conversation to project completion and property records.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '24px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < HOW_IT_WORKS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--gradient-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '15px' }}>{step.step}</div>
                  {i < HOW_IT_WORKS.length - 1 && <div style={{ width: '2px', height: '32px', background: 'var(--border)' }} />}
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{step.icon}</div>
                  <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Start Your Construction Journey</Link>
          </div>
        </div>
      </section>

      {/* ── 4. CORE SERVICES ── */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Platform Services</span>
            <h2>Everything you need to build and manage your property.</h2>
            <p>One platform covering the entire construction lifecycle — from planning and material sourcing to site tracking and digital property records.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', height: '100%', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '12px' }}
                  className="card-hover">
                  <div style={{ fontSize: '36px' }}>{s.icon}</div>
                  <h3 style={{ fontSize: '18px', color: 'var(--secondary)', margin: 0 }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, flex: 1 }}>{s.desc}</p>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '14px' }}>Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ECOSYSTEM ── */}
      <section className={`fullBleedSection ${styles.sectionBand}`}>
        <div className="sectionInner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className={styles.blockHead} style={{ marginBottom: 0 }}>
              <span className={styles.eyebrow}>Connected Construction Ecosystem</span>
              <h2>One connected ecosystem for construction, materials, and property.</h2>
              <p>Buildogram is not just a directory. It is a connected construction ecosystem where every partner, material quote, project update, and property record supports one goal — helping owners build and manage property with confidence.</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/partners/directory" className="btn btn-primary">Explore Verified Partners</Link>
                <Link href="/contact?type=construction" className="btn btn-outline">Talk to an Engineer</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ECOSYSTEM.map((e, i) => (
                <div key={i} style={{ background: 'var(--bg-card2)', borderRadius: '14px', padding: '18px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '24px' }}>{e.icon}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--secondary)' }}>{e.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MATERIAL ADVANTAGE ── */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInnerWide">
          <div className={styles.rateBoard}>
            <div className={styles.blockHead} style={{ marginBottom: 0 }}>
              <span className={styles.eyebrow}>Supplier Quote Routing</span>
              <h2>Transparent material sourcing with trusted supplier support.</h2>
              <p>Compare supplier quotes for cement, steel, sand, electrical, plumbing, and more. Buildogram routes your material request to our supplier network — reducing retail-layer friction and giving you rate transparency.</p>
              <br />
              <Link href="/materials" className="btn btn-primary">Request Material Support</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MATERIALS.map((m, i) => (
                <div key={i} className={styles.row}>
                  <b>{m}</b>
                  <span>Supplier quote routing</span>
                  <em style={{ color: 'var(--primary)', fontWeight: 700 }}>Request →</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PARTNER B2B SECTION ── */}
      <section className={`fullBleedSection ${styles.sectionBand}`}>
        <div className="sectionInner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {PARTNER_BENEFITS.map((b, i) => (
                  <div key={i} style={{ background: 'var(--bg-card2)', borderRadius: '14px', padding: '20px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{b.icon}</div>
                    <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '14px', marginBottom: '4px' }}>{b.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.blockHead} style={{ marginBottom: 0 }}>
              <span className={styles.eyebrow}>For Construction Professionals</span>
              <h2>For builders, contractors, architects, and suppliers.</h2>
              <p>Buildogram helps serious construction professionals build visibility, trust, and project opportunities through verified profiles, project showcases, and ecosystem collaboration.</p>
              <p style={{ marginTop: '12px' }}>Builders, architects, interior designers, suppliers, solar installers, waterproofing specialists, and elevator companies can apply to join the Buildogram partner network.</p>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/partners/register" className="btn btn-primary">Become a Buildogram Partner</Link>
                <Link href="/partners/directory" className="btn btn-outline">View Partner Network</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. TRUST SECTION ── */}
      <section className={`fullBleedSection ${styles.sectionBand} ${styles.sectionBandAlt}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Why Owners Choose Buildogram</span>
            <h2>An accountable partner between you and the construction ecosystem.</h2>
            <p>Buildogram gives owners the confidence of having a knowledgeable construction layer between them and the entire execution ecosystem.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {TRUST.map((t, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', display: 'flex', gap: '14px' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{t.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '15px', marginBottom: '5px' }}>{t.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. PROPERTY PORTALS (secondary) ── */}
      <section className={`fullBleedSection ${styles.sectionBand}`}>
        <div className="sectionInner">
          <div className={styles.blockHead}>
            <span className={styles.eyebrow}>Property Bridge</span>
            <h2>Connected property portals for 360° property discovery.</h2>
            <p>Buildogram connects with dedicated property portals to help users discover homes, plots, rentals, and commercial spaces through immersive 360° viewing. These portals support property discovery, while Buildogram supports construction, materials, project tracking, and long-term property records.</p>
          </div>
          <div className={styles.portalPanel}>
            <div className={styles.portalCard}>
              <div className={styles.tour}>360°<br />Virtual Tour</div>
              <h3>RealPropRealty</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '15px' }}>Premium real estate buying and selling platform with immersive 360° virtual tours — for discovering plots, villas, and commercial spaces.</p>
              <a href="https://www.realproprealty.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Explore RealPropRealty ↗</a>
            </div>
            <div className={styles.portalCard}>
              <div className={styles.tour}>To-Let<br />Discovery</div>
              <h3>ToLetBoard Chennai</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '15px' }}>Verified rental properties and lease discovery across Chennai — residential, commercial, and temporary accommodation with direct owner access.</p>
              <a href="https://toletboardchennai.in" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Find Rentals ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className="fullBleedSection" style={{ padding: '6rem 1rem' }}>
        <div className="sectionInner">
          <div className={styles.lead}>
            <h2>Planning to build, renovate, buy, or source materials?</h2>
            <p>Start with Buildogram and get the right guidance, partners, materials, and property records from day one.</p>
            <div className={styles.quick} style={{ justifyContent: 'center' }}>
              <Link href="/contact?type=construction" className="btn" style={{ background: 'white', color: 'var(--secondary)' }}>Start Your Construction Journey</Link>
              <Link href="/contact?type=construction" className="btn btn-outline-light">Talk to an Engineer</Link>
              <Link href="/partners/register" className="btn btn-outline-light">Become a Partner</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
