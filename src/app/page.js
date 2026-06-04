'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import PremiumCard from '@/components/ui/PremiumCard';
import styles from './page.module.css';

/* ─── Data ────────────────────────────────────────────────── */
const PAIN_POINTS = [
  { icon: '📋', title: 'Contractor quotes are hard to verify', desc: 'Multiple quotes with no standard scope make cost comparison nearly impossible for most owners.' },
  { icon: '📐', title: 'BOQ and drawings feel confusing', desc: 'Quantities, specifications, and line items are difficult for non-engineers to interpret.' },
  { icon: '🧱', title: 'Material rates and quality are unclear', desc: 'Owners often pay retail prices or receive incorrect grades without knowing the difference.' },
  { icon: '📸', title: 'Site updates are inconsistent', desc: 'Contractors give verbal progress updates with no documentation, photos, or milestone proof.' },
  { icon: '💸', title: 'Hidden charges and cost escalation', desc: 'Unplanned costs and scope changes create financial stress and distrust mid-project.' },
  { icon: '✅', title: 'Quality checks are missing', desc: 'Work quality is rarely documented, leaving owners with no records for disputes or future reference.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Understand Your Requirement', desc: 'Plot size, location, budget, construction type, timeline, and expectations — clearly mapped before any execution begins.' },
  { step: '02', title: 'Review Plan, BOQ & Scope', desc: 'Buildogram helps review drawings, project scope, quantities, specifications, and cost structure for clarity before you commit.' },
  { step: '03', title: 'Connect With Verified Partners', desc: 'Architects, builders, contractors, consultants, suppliers, and execution partners are matched based on your specific project needs.' },
  { step: '04', title: 'Source Materials Transparently', desc: 'Cement, steel, sand, electrical, plumbing, waterproofing, solar and more — sourced through our trusted supplier network.' },
  { step: '05', title: 'Track, Verify & Store Records', desc: 'Site updates, work proof, delivery photos, invoices, quality notes, and project history — stored inside your Property Passport.' },
];

const SERVICES = [
  { icon: '🏗️', title: 'Home Construction Guidance', desc: 'Engineer-led support from planning to execution — covering scope, specifications, contractor selection, and site coordination.', href: '/contact?type=construction', color: 'orange', bentoClass: 'bentoWide1' },
  { icon: '📋', title: 'BOQ & Plan Review', desc: 'Review scope, quantities, specifications, drawings, and cost clarity before you sign any contractor agreement.', href: '/boq-audit', color: 'blue', bentoClass: 'bentoStandard' },
  { icon: '🤝', title: 'Verified Partner Network', desc: 'Connect with trusted builders, contractors, architects, consultants, and suppliers through a reviewed network.', href: '/partners/directory', color: 'green', bentoClass: 'bentoStandard' },
  { icon: '🧱', title: 'Material Sourcing', desc: 'Transparent support for cement, steel, sand, electrical, plumbing, tiles, paint, waterproofing, solar, and more.', href: '/materials', color: 'purple', bentoClass: 'bentoStandard' },
  { icon: '📸', title: 'Site Tracking', desc: 'Track milestones, photos, delivery proof, execution status, and project updates through your Buildogram dashboard.', href: '/projects', color: 'teal', bentoClass: 'bentoStandard' },
  { icon: '🏠', title: 'Property Passport', desc: 'Maintain digital records of drawings, invoices, materials, vendors, project photos, quality notes, and maintenance details.', href: '/property-passport', color: 'slate', bentoClass: 'bentoWide1' },
];

const MATERIALS = [
  'Cement', 'TMT Steel', 'River Sand', 'M-Sand', 'Aggregates',
  'Electrical', 'Plumbing', 'Tiles', 'Paint', 'Waterproofing',
  'Solar Panels', 'Concrete Blocks', 'Roofing Sheets', 'PVC Pipes',
];

const TRUST = [
  { icon: '🎓', title: 'Engineer-led approach', desc: 'Every recommendation is backed by engineering principles, not just sales incentives.' },
  { icon: '✅', title: 'Verified partner network', desc: 'Partners submit credentials, project records, and service categories for profile review.' },
  { icon: '📋', title: 'BOQ and cost clarity', desc: 'Helping owners understand scope and quantities before signing any agreement.' },
  { icon: '🧱', title: 'Transparent material support', desc: 'Competitive market-aligned quotes with supplier comparison.' },
  { icon: '📸', title: 'Site progress visibility', desc: 'Milestone photos, delivery records, and daily logbooks tracked through the platform.' },
  { icon: '📁', title: 'Property Passport records', desc: 'All project documents, invoices, and records stored digitally for lifetime access.' },
];

/* ─── Component ───────────────────────────────────────────── */
export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loc, setLoc]     = useState('Chennai, TN');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (query) router.push(`/partners/directory?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(loc)}`);
  };

  const MATS_DOUBLED = [...MATERIALS, ...MATERIALS];

  return (
    <main className={styles.page}>

      {/* ── 1. HERO ──────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroBgGlow} />
          <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        </div>
        <div className={`sectionInnerWide ${styles.heroInner}`}>

          {/* Left copy */}
          <AnimatedSection className={styles.heroLeft}>
            <span className={styles.eyebrow}>Engineer-Led Construction Platform</span>
            <h1 className={styles.heroH1}>
              Build smarter with<br />
              <span className={styles.heroAccent}>trusted construction</span><br />
              partners.
            </h1>
            <p className={styles.heroSub}>
              Find verified builders, contractors, architects, material suppliers, and project support — with transparent material sourcing and progress tracking from one platform.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">
                Start Your Construction Journey
              </Link>
              <Link href="/materials" className={`btn btn-lg ${styles.heroOutline}`}>
                Explore Material Support
              </Link>
            </div>

            <Link href="/partners/register" className={styles.partnerCta}>
              Are you a contractor or supplier?{' '}
              <strong>Join as Partner →</strong>
            </Link>

            {/* Hero search */}
            <form className={styles.searchBox} onSubmit={handleHeroSearch}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchIcon}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search builders, contractors, architects, or materials…"
                className={styles.searchInput}
              />
              <select value={loc} onChange={e => setLoc(e.target.value)} className={styles.searchSelect}>
                <option value="Chennai, TN">Chennai, TN</option>
                <option value="Coimbatore, TN">Coimbatore, TN</option>
              </select>
              <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <div className={styles.trustLine}>
              <span>🎓 Engineer-led</span>
              <span>·</span>
              <span>✅ Verified partners</span>
              <span>·</span>
              <span>📊 Progress tracking</span>
            </div>
          </AnimatedSection>

          {/* Right Visual Platform Preview */}
          <AnimatedSection className={styles.heroRight} delay={0.2}>
            <div className={styles.heroRightHeader}>
              <div className={`${styles.browserDot} ${styles.red}`} />
              <div className={`${styles.browserDot} ${styles.yellow}`} />
              <div className={`${styles.browserDot} ${styles.green}`} />
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '12px', fontWeight: 600 }}>buildogram.com / dashboard</span>
            </div>
            <div className={styles.heroRightBody}>
              <div className={styles.mockCard}>
                <div className={styles.mockIcon}></div>
                <div className={styles.mockLines}>
                  <div className={`${styles.mockLine} ${styles.short}`}></div>
                  <div className={`${styles.mockLine} ${styles.long}`}></div>
                </div>
                <span className="badge badge-green">Verified</span>
              </div>
              <div className={styles.mockCard}>
                <div className={styles.mockIcon} style={{ background: 'rgba(59,130,246,0.1)' }}></div>
                <div className={styles.mockLines}>
                  <div className={`${styles.mockLine} ${styles.short}`}></div>
                  <div className={`${styles.mockLine} ${styles.long}`}></div>
                </div>
                <span className="badge badge-blue">Quoted</span>
              </div>
              <div className={styles.mockCard} style={{ opacity: 0.6, transform: 'scale(0.95)' }}>
                <div className={styles.mockIcon} style={{ background: 'rgba(100,116,139,0.1)' }}></div>
                <div className={styles.mockLines}>
                  <div className={`${styles.mockLine} ${styles.short}`}></div>
                  <div className={`${styles.mockLine} ${styles.long}`}></div>
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── 2. BENTO — Platform capabilities ───────────── */}
      <section className={`fullBleedSection ${styles.bentoSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Platform Services"
              title="Everything you need to build and manage your property."
              description="One platform covering the entire construction lifecycle — from planning and material sourcing to site tracking and digital property records."
            />
          </AnimatedSection>
          <div className={styles.bentoGrid}>
            {SERVICES.map((s, i) => (
              <PremiumCard 
                key={i} 
                className={`${styles.bentoCell} ${styles[s.bentoClass]}`} 
                hoverEffect={true} 
                animated={true} 
                delay={i}
              >
                <div className={`${styles.bentoIcon} ${styles['bentoIcon_' + s.color]}`}>{s.icon}</div>
                <h3 className={styles.bentoTitle}>{s.title}</h3>
                <p className={styles.bentoDesc}>{s.desc}</p>
                <Link href={s.href} className={styles.bentoLink}>Learn more →</Link>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MARQUEE — Materials Sourcing ────────────── */}
      <section className={`fullBleedSection ${styles.marqueeSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Supplier Quote Routing"
              title="Transparent material sourcing with trusted supplier support."
              description="Compare supplier quotes for cement, steel, sand, electrical, plumbing, and more. Buildogram routes your material request to our supplier network."
            />
          </AnimatedSection>
        </div>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {MATS_DOUBLED.map((m, i) => (
              <div key={i} className={styles.marqueePill}>
                <div className={styles.pillDot} />
                {m}
              </div>
            ))}
          </div>
        </div>
        
        <div className="sectionInner" style={{ marginTop: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <Link href="/materials" className="btn btn-primary btn-lg">Request Material Support</Link>
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS TIMELINE ────────────────────── */}
      <section className={`fullBleedSection ${styles.altSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="The Construction Companion Process"
              title="How Buildogram works as your construction companion."
              description="A structured, engineering-led approach from first conversation to project completion and property records."
            />
          </AnimatedSection>
          
          <div className={styles.timelineWrap}>
            {HOW_IT_WORKS.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className={styles.timelineStep}>
                <div className={styles.timelineMarker}>
                  <div className={styles.timelineNum}>{step.step}</div>
                  {i < HOW_IT_WORKS.length - 1 && <div className={styles.timelineConnector} />}
                </div>
                <div className={styles.timelineBody}>
                  <h3 className={styles.timelineTitle}>{step.title}</h3>
                  <p className={styles.timelineDesc}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection delay={0.3} className="text-center" style={{ marginTop: '56px' }}>
            <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Start Your Construction Journey</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 5. TRUST / PROBLEM SECTION ──────────────────── */}
      <section className="fullBleedSection" style={{ padding: '100px 0', background: 'white' }}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Why Owners Choose Buildogram"
              title="Building a home shouldn't feel risky or confusing."
              description="Most property owners face the same challenges when trying to build. Buildogram brings engineering clarity to eliminate these risks."
            />
          </AnimatedSection>
          
          <div className={styles.problemGrid}>
            {PAIN_POINTS.map((p, i) => (
              <PremiumCard key={i} animated={true} delay={i} hoverEffect={true}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--secondary)', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ────────────────────────────────── */}
      <section className={styles.finalCta}>
        <div className="sectionInner">
          <AnimatedSection className={styles.ctaBox}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <span className={styles.ctaEyebrow}>Ready to build smarter?</span>
            <h2 className={styles.ctaH2}>Planning to build, renovate, buy, or source materials?</h2>
            <p className={styles.ctaP}>Start with Buildogram and get the right guidance, partners, materials, and property records from day one.</p>
            <div className={styles.ctaActions}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Start Your Construction Journey</Link>
              <Link href="/contact?type=construction" className={`btn btn-lg ${styles.ctaOutline}`}>Talk to an Engineer</Link>
              <Link href="/partners/register" className={`btn btn-lg ${styles.ctaOutline}`}>Become a Partner</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
