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
            <span className={styles.eyebrow}>ENGINEER-LED CONSTRUCTION SUPPORT</span>
            <h1 className={styles.heroH1}>
              Build your home with<br />
              <span className={styles.heroAccent}>clarity</span> before the first brick.
            </h1>
            <p className={styles.heroSub}>
              Buildogram helps you review plans, verify contractor quotes, compare material rates, connect with trusted construction partners, and track site progress with engineer-backed records.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">
                Talk to an Engineer
              </Link>
              <Link href="/boq-audit" className={`btn btn-lg ${styles.heroOutline}`}>
                Review My Contractor Quote
              </Link>
            </div>
            <div className={styles.trustLine}>
              <span>Verified partners</span>
              <span>BOQ checks</span>
              <span>Material rate clarity</span>
              <span>Site progress records</span>
            </div>
          </AnimatedSection>

          {/* Right Visual Platform Preview */}
          <AnimatedSection className={styles.heroRight} delay={0.2}>
            <div className={styles.heroRightHeader}>
              <div className={`${styles.browserDot} ${styles.red}`} />
              <div className={`${styles.browserDot} ${styles.yellow}`} />
              <div className={`${styles.browserDot} ${styles.green}`} />
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '12px', fontWeight: 600 }}>buildogram.com / command-center</span>
            </div>
            <div className={styles.heroRightBody} style={{ padding: '24px', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
              
              {/* BOQ Snippet */}
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#FC6E20', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>⚠️</span> BOQ Audit Alert</div>
                  <span style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '10px', padding: '4px 10px', borderRadius: '100px', fontWeight: 800 }}>Overpriced</span>
                </div>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>TMT Steel 500D (JSW)</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                  <span>Quote: ₹85,000/MT</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>Market: ₹72,000/MT</span>
                </div>
              </div>

              {/* Inspection Snippet */}
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>🔍</span> Site Inspection</div>
                  <span style={{ background: '#D1FAE5', color: '#059669', fontSize: '10px', padding: '4px 10px', borderRadius: '100px', fontWeight: 800 }}>Passed</span>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', background: '#F1F5F9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', border: '1px solid #E2E8F0' }}>📸</div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Plinth Beam Reinforcement</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '3px', fontWeight: 500 }}>Checked by Er. Karthik • Today 10:30 AM</div>
                  </div>
                </div>
              </div>

              {/* Progress Snippet */}
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', opacity: 0.9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>🚚</span> Material Delivery</div>
                  <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '10px', padding: '4px 10px', borderRadius: '100px', fontWeight: 800 }}>In Transit</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Ramco Super Grade Cement - 200 Bags</div>
                <div style={{ marginTop: '12px', height: '6px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: '#8B5CF6', borderRadius: '100px' }}></div>
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
