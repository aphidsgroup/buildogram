'use client';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import PremiumCard from '@/components/ui/PremiumCard';
import styles from './page.module.css';

/* ─── Data ────────────────────────────────────────────────── */
const PAIN_POINTS = [
  { icon: '📋', title: 'Contractor quotes are hard to compare', desc: 'Multiple quotes with no standard scope make apples-to-apples comparison nearly impossible.' },
  { icon: '📐', title: 'BOQ line items are confusing', desc: 'Technical specifications and hidden exclusions are difficult for non-engineers to interpret.' },
  { icon: '🧱', title: 'Material rates vary widely', desc: 'Owners often pay retail prices or receive incorrect material grades without realizing it.' },
  { icon: '📸', title: 'Site updates are not documented', desc: 'Contractors give verbal updates with no verifiable photographic proof or milestone documentation.' },
  { icon: '💸', title: 'Hidden charges appear mid-project', desc: 'Unplanned costs and scope changes create financial stress and distrust once work begins.' },
  { icon: '📁', title: 'Property records get lost after handover', desc: 'Drawings, warranties, and vendor details are scattered, making maintenance difficult later.' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Requirement Mapping', desc: 'Plot size, location, budget, and construction type are clearly mapped before any execution begins.' },
  { step: '02', title: 'Plan / BOQ Review', desc: 'Engineers review your drawings, quantities, specifications, and contractor quotes for clarity.' },
  { step: '03', title: 'Partner Shortlisting', desc: 'Connect with verified architects, builders, and contractors based on your specific project needs.' },
  { step: '04', title: 'Material Quote Routing', desc: 'Transparent routing for cement, steel, sand, and finishings through our trusted supplier network.' },
  { step: '05', title: 'Site Progress Tracking', desc: 'Track milestones, delivery photos, execution status, and quality notes during execution.' },
  { step: '06', title: 'Property Passport Handover', desc: 'All drawings, invoices, and records are handed over digitally for lifetime access and maintenance.' },
];

const SERVICES = [
  { icon: '🏗️', title: 'Home Construction Guidance', desc: 'Engineer-led support from planning to execution.', href: '/build/home-construction', color: 'orange', bentoClass: 'bentoWide1' },
  { icon: '📋', title: 'BOQ & Contractor Quote Audit', desc: 'Review scope, quantities, and cost clarity.', href: '/boq-audit', color: 'blue', bentoClass: 'bentoStandard' },
  { icon: '📐', title: 'Plan Review', desc: 'Structural and spatial review of your architectural plans.', href: '/plan-review', color: 'teal', bentoClass: 'bentoStandard' },
  { icon: '🧱', title: 'Material Sourcing Support', desc: 'Compare quotes for cement, steel, tiles, and more.', href: '/materials', color: 'purple', bentoClass: 'bentoStandard' },
  { icon: '🤝', title: 'Verified Partner Network', desc: 'Connect with trusted builders and contractors.', href: '/partners/directory', color: 'green', bentoClass: 'bentoStandard' },
  { icon: '📸', title: 'Site Progress Tracking', desc: 'Track milestones, photos, and project updates.', href: '/projects', color: 'slate', bentoClass: 'bentoStandard' },
  { icon: '🏠', title: 'Property Passport', desc: 'Maintain digital records of drawings and invoices.', href: '/property-passport', color: 'blue', bentoClass: 'bentoWide1' },
  { icon: '🤖', title: 'AI Floor Plan Creator', desc: 'Generate conceptual layouts based on your plot size.', href: '/ai-floor-plan-creator', color: 'purple', bentoClass: 'bentoStandard' },
  { icon: '🔧', title: 'Maintenance & AMC', desc: 'Post-handover property maintenance services.', href: '/property/maintenance', color: 'orange', bentoClass: 'bentoStandard' },
];

const PARTNER_CATEGORIES = [
  'Builders', 'RCC Contractors', 'MEP Contractors', 'Architects', 
  'Interior Designers', 'Material Suppliers', 'Waterproofing', 'Solar', 'Elevators'
];

const CHENNAI_LOCATIONS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'OMR', 'ECR', 'Tambaram', 'Porur', 'Medavakkam', 'Anna Nagar'
];

/* ─── Component ───────────────────────────────────────────── */
export default function Home() {
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
              Buildogram helps property owners review plans, verify contractor quotes, compare material rates, connect with trusted construction partners, and track site progress with engineer-backed records.
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
              <span>Engineer-led review</span>
              <span>BOQ checks</span>
              <span>Material rate clarity</span>
              <span>Verified partners</span>
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

      {/* ── 2. PROBLEM SECTION ──────────────────────────── */}
      <section className="fullBleedSection" style={{ padding: '100px 0', background: 'white' }}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="The Reality of Construction"
              title="Construction should not feel like a gamble."
              description="Most property owners face the same challenges when trying to build. We bring engineering clarity to eliminate these risks."
            />
          </AnimatedSection>
          
          <div className={styles.problemGrid}>
            {PAIN_POINTS.map((p, i) => (
              <PremiumCard key={i} animated={true} delay={i * 0.05} hoverEffect={true} className={styles.problemCard}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--secondary)', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS / BUILDOGRAM WAY ────────────── */}
      <section className={`fullBleedSection ${styles.altSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="The Buildogram Way"
              title="A structured approach to building your property."
              description="From first conversation to project completion and property records."
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
        </div>
      </section>

      {/* ── 4. SERVICES BENTO GRID ──────────────────────── */}
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
                delay={i * 0.05}
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

      {/* ── 5. BOQ AUDIT PROOF SECTION ──────────────────── */}
      <section className="fullBleedSection" style={{ padding: '100px 0', background: 'white' }}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="BOQ Audit & Contractor Quote Review"
              title="Stop paying for hidden surprises."
              description="Our engineers review contractor quotes line-by-line to find missing items, vague specifications, and exclusions before you sign the dotted line."
            />
          </AnimatedSection>

          <div className={styles.proofDashboard}>
            <div className={styles.proofHeader}>Common Hidden-Cost Checks We Perform:</div>
            <div className={styles.proofGrid}>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Excavation & soil carting exclusions</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Foundation depth assumptions</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Steel grade mismatch</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Electrical point undercount</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Compound wall omission</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Septic tank / STP omission</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Finishing material ambiguity (e.g. "Basic tiles")</div>
              <div className={styles.proofItem}><span className={styles.proofCheck}>✓</span> Door/Window wood quality specifications</div>
            </div>
            <div className="text-center" style={{ marginTop: '32px' }}>
              <Link href="/boq-audit" className="btn btn-primary btn-lg">Review My Contractor Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MATERIAL QUOTE SECTION ───────────────────── */}
      <section className={`fullBleedSection ${styles.altSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Material Quote Support"
              title="Clarity on material brands and rates."
              description="Get transparent quotes and comparative dashboards for cement, TMT steel, sand, blocks, tiles, and electricals directly from our verified supplier network."
            />
          </AnimatedSection>

          <div className={styles.materialDashboard}>
            <div className={styles.matDashHeader}>
              <div className={styles.matDashTitle}>TMT Steel Price Comparison</div>
              <div className={styles.matDashBadge}>Live Rates</div>
            </div>
            
            <div className={styles.matRow}>
              <div className={styles.matCol}><strong>Supplier</strong></div>
              <div className={styles.matCol}><strong>Brand</strong></div>
              <div className={styles.matCol}><strong>Quantity</strong></div>
              <div className={styles.matCol}><strong>Rate/MT</strong></div>
              <div className={styles.matCol}><strong>Delivery</strong></div>
            </div>
            
            <div className={styles.matRowItem}>
              <div className={styles.matCol}>Sri Ram Steels (Verified)</div>
              <div className={styles.matCol}>JSW 500D</div>
              <div className={styles.matCol}>5 MT</div>
              <div className={styles.matCol} style={{ color: 'var(--primary)', fontWeight: 700 }}>₹68,500</div>
              <div className={styles.matCol}>Next Day</div>
            </div>
            <div className={styles.matRowItem}>
              <div className={styles.matCol}>Chennai Trade Links</div>
              <div className={styles.matCol}>Tata Tiscon</div>
              <div className={styles.matCol}>5 MT</div>
              <div className={styles.matCol} style={{ color: 'var(--primary)', fontWeight: 700 }}>₹71,200</div>
              <div className={styles.matCol}>2 Days</div>
            </div>
            <div className={styles.matRowItem}>
              <div className={styles.matCol}>BuildMart India</div>
              <div className={styles.matCol}>ARSS 500</div>
              <div className={styles.matCol}>5 MT</div>
              <div className={styles.matCol} style={{ color: 'var(--primary)', fontWeight: 700 }}>₹64,000</div>
              <div className={styles.matCol}>Same Day</div>
            </div>

            <div className="text-center" style={{ marginTop: '24px' }}>
              <Link href="/materials" className="btn btn-primary">Compare Material Rates</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. VERIFIED PARTNER NETWORK ─────────────────── */}
      <section className="fullBleedSection" style={{ padding: '100px 0', background: 'white' }}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Trusted Professionals"
              title="Verified Partner Network."
              description="Find engineers, contractors, architects, and suppliers who have been vetted for quality, reliability, and past project records."
            />
          </AnimatedSection>

          <div className={styles.partnerCatsGrid}>
            {PARTNER_CATEGORIES.map(cat => (
              <Link key={cat} href={`/partners/directory?category=${cat}`} className={styles.partnerCatCard}>
                <div className={styles.partnerCatTitle}>{cat}</div>
                <div className={styles.partnerCatArrow}>→</div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link href="/partners/directory" className="btn btn-primary btn-lg">Explore Verified Partners</Link>
          </div>
        </div>
      </section>

      {/* ── 8. SITE PROGRESS TRACKING ───────────────────── */}
      <section className={`fullBleedSection ${styles.altSection}`}>
        <div className="sectionInner">
          <div className={styles.twoColSection}>
            <AnimatedSection className={styles.twoColText}>
              <span className={styles.eyebrow}>Site OS</span>
              <h2 className={styles.sectionH2}>Site Progress Tracking</h2>
              <p className={styles.sectionP}>
                Ditch the chaotic WhatsApp groups. Our dashboard provides a centralized timeline of your project’s execution.
              </p>
              <ul className={styles.featureList}>
                <li><strong>Milestone Timeline:</strong> See what's happening when.</li>
                <li><strong>Site Photos:</strong> Verifiable photographic proof of work.</li>
                <li><strong>Quality Checklists:</strong> Engineer-backed quality sign-offs.</li>
                <li><strong>Material Delivery:</strong> Records of what arrived on site.</li>
                <li><strong>Invoice Status:</strong> Track payments against progress.</li>
                <li><strong>Issue Log:</strong> Document and resolve site blockers.</li>
              </ul>
            </AnimatedSection>
            <AnimatedSection className={styles.twoColVisual} delay={0.2}>
              <div className={styles.uiMockup}>
                <div className={styles.uiMockupHeader}>Project Timeline: Villa Anna Nagar</div>
                <div className={styles.uiMockupBody}>
                  <div className={styles.timelineMiniItem}>
                    <div className={styles.timelineMiniDot}></div>
                    <div className={styles.timelineMiniContent}>
                      <strong>Roof Slab Concrete Check</strong>
                      <span>Passed by Er. Karthik • 2 days ago</span>
                    </div>
                  </div>
                  <div className={styles.timelineMiniItem}>
                    <div className={styles.timelineMiniDot} style={{ background: '#3B82F6' }}></div>
                    <div className={styles.timelineMiniContent}>
                      <strong>Invoice #4 Raised</strong>
                      <span>₹2,50,000 for Brickwork Stage • 5 days ago</span>
                    </div>
                  </div>
                  <div className={styles.timelineMiniItem}>
                    <div className={styles.timelineMiniDot} style={{ background: '#10B981' }}></div>
                    <div className={styles.timelineMiniContent}>
                      <strong>Material Delivery: Sand</strong>
                      <span>2 Units River Sand Delivered • 1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 9. PROPERTY PASSPORT ────────────────────────── */}
      <section className="fullBleedSection" style={{ padding: '100px 0', background: 'white' }}>
        <div className="sectionInner">
          <div className={styles.twoColSectionReverse}>
            <AnimatedSection className={styles.twoColText}>
              <span className={styles.eyebrow}>Digital Records</span>
              <h2 className={styles.sectionH2}>The Property Passport</h2>
              <p className={styles.sectionP}>
                A home is a lifetime investment. Stop losing critical project documents after the contractor hands over the keys. 
                The Property Passport acts as a permanent digital record for your building.
              </p>
              <ul className={styles.featureList}>
                <li>Architectural & Structural Drawings</li>
                <li>Final BOQ and Invoices</li>
                <li>Material brands and grades used</li>
                <li>Vendor and contractor details</li>
                <li>Warranty certificates and manuals</li>
                <li>Maintenance logs and resale readiness</li>
              </ul>
              <div style={{ marginTop: '24px' }}>
                <Link href="/property-passport" className="btn btn-primary">Learn about Property Passport</Link>
              </div>
            </AnimatedSection>
            <AnimatedSection className={styles.twoColVisual} delay={0.2}>
              <div className={styles.passportMockup}>
                <div className={styles.passportMockIcon}>🏠</div>
                <h3 className={styles.passportMockTitle}>My Villa - OMR</h3>
                <div className={styles.passportMockTags}>
                  <span>2024 Built</span>
                  <span>4 BHK</span>
                  <span>Verified</span>
                </div>
                <div className={styles.passportMockStats}>
                  <div><strong>12</strong> Drawings</div>
                  <div><strong>45</strong> Invoices</div>
                  <div><strong>8</strong> Warranties</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 10. AI TOOLS ────────────────────────────────── */}
      <section className={`fullBleedSection ${styles.altSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Construction Intelligence"
              title="Smart AI Tools for Planning."
              description="Explore conceptual possibilities before engaging professionals. Note: AI outputs are advisory and require professional review."
            />
          </AnimatedSection>
          
          <div className={styles.aiToolsGrid}>
            <div className={styles.aiToolCard}>
              <div className={styles.aiToolIcon}>🤖</div>
              <h4>AI Floor Plan Creator</h4>
              <p>Generate conceptual layouts based on plot dimensions.</p>
              <Link href="/ai-floor-plan-creator" className={styles.aiToolLink}>Try Generator →</Link>
            </div>
            <div className={styles.aiToolCard}>
              <div className={styles.aiToolIcon}>📊</div>
              <h4>Cost Estimator</h4>
              <p>Calculate rough preliminary construction budgets.</p>
              <Link href="/cost-estimator" className={styles.aiToolLink}>Estimate Costs →</Link>
            </div>
            <div className={styles.aiToolCard}>
              <div className={styles.aiToolIcon}>📝</div>
              <h4>BOQ Draft Assistant</h4>
              <p>Generate a baseline BOQ structure for your project.</p>
              <span className={styles.comingSoon}>Coming Soon</span>
            </div>
            <div className={styles.aiToolCard}>
              <div className={styles.aiToolIcon}>🔍</div>
              <h4>Plan Review Assistant</h4>
              <p>Automated checks for Vastu and spatial flow.</p>
              <span className={styles.comingSoon}>Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. CHENNAI LOCAL SECTION ───────────────────── */}
      <section className="fullBleedSection" style={{ padding: '80px 0', background: 'white' }}>
        <div className="sectionInner text-center">
          <AnimatedSection>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--secondary)', marginBottom: '24px' }}>Proudly supporting construction across Tamil Nadu</h3>
            <div className={styles.locationTags}>
              {CHENNAI_LOCATIONS.map(loc => (
                <span key={loc} className={styles.locTag}>{loc}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 12. PARTNER CTA SECTION ─────────────────────── */}
      <section className={`fullBleedSection ${styles.partnerCtaSection}`}>
        <div className="sectionInner">
          <AnimatedSection className={styles.partnerCtaBox}>
            <h2 className={styles.partnerCtaH2}>Are you a builder, contractor, architect, or supplier?</h2>
            <p className={styles.partnerCtaP}>Join the Buildogram network to connect with property owners looking for verified professionals and quality materials.</p>
            <Link href="/partners/register" className="btn btn-primary btn-lg" style={{ background: '#0F172A', color: 'white', border: 'none' }}>Become a Buildogram Partner</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 13. FINAL CTA ───────────────────────────────── */}
      <section className={styles.finalCta}>
        <div className="sectionInner">
          <AnimatedSection className={styles.ctaBox}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <h2 className={styles.ctaH2}>Start with clarity. Build with confidence.</h2>
            <p className={styles.ctaP}>Get the right engineering guidance, verified partners, materials, and property records from day one.</p>
            <div className={styles.ctaActions}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
              <Link href="/boq-audit" className={`btn btn-lg ${styles.ctaOutline}`}>Review My Quote</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
