import Link from 'next/link';
import BOQAuditForm from './BOQAuditForm';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import PremiumCard from '@/components/ui/PremiumCard';
import styles from './boq.module.css';

export const metadata = {
  title: 'BOQ Review and Contractor Quote Audit | Buildogram',
  description: 'Before you finalize a contractor, understand what is included, what is unclear, and what questions to ask. BOQ clarity service inside the Buildogram marketplace. Chennai & Tamil Nadu.',
};

const WHAT_WE_CHECK = [
  { icon: '⚙️', title: 'Steel Quantity & Grade', desc: 'Verify the exact tonnage, dia and grade of steel matches your structural drawing. Most contractors under-specify by 15–25%.' },
  { icon: '🏭', title: 'Cement Bags & Grade', desc: 'Confirm the correct OPC/PPC grade and bag count per cubic metre of concrete. Grade substitution is the oldest trick.' },
  { icon: '🪨', title: 'Excavation & Foundation', desc: 'Check if foundation depth, footing size, and PCC thickness match the soil report. Underpriced excavation blows up later.' },
  { icon: '🚿', title: 'Plumbing Spec', desc: 'CPVC vs PVC vs GI — brands, wall thickness, and fitting counts that dramatically affect durability and cost.' },
  { icon: '🔌', title: 'Electrical & Wiring', desc: 'Wire gauge, number of points, switch brand, DB box specification — cheap contractors cut all of these silently.' },
  { icon: '🎨', title: 'Plastering & Painting', desc: 'M-sand vs river sand, plaster thickness, number of coats, and primer layers — each one affects finish quality.' },
  { icon: '💰', title: 'Rate Inflation Check', desc: 'We cross-check every line item rate against current market rates for Chennai. Overpricing of 10–30% is common.' },
  { icon: '🚫', title: 'Missing Scope Items', desc: 'Compound wall, septic tank, rainwater harvesting, grills — contractors leave these out then demand extras mid-project.' },
];

const HIDDEN_COSTS = [
  { item: 'Excavation depth variance', typical: '₹1–4 lakhs' },
  { item: 'Foundation upgrade (clay soil)', typical: '₹2–5 lakhs' },
  { item: 'Steel grade substitution', typical: '₹1–3 lakhs' },
  { item: 'Compound wall (omitted)', typical: '₹3–8 lakhs' },
  { item: 'Septic tank + STP (omitted)', typical: '₹1–3 lakhs' },
  { item: 'Electrical points undercount', typical: '₹50K–2 lakhs' },
  { item: 'Painting primer layers', typical: '₹30K–1 lakh' },
  { item: 'Rate inflation across items', typical: '5–20% of total' },
];

const PROCESS = [
  { step: '01', title: 'Share Your Quote', desc: 'Submit the contractor BOQ or quote (even a verbal estimate). Share drawings if available.' },
  { step: '02', title: 'Engineer Review', desc: 'Our structural engineers analyse every line item against Chennai market rates and standard specs.' },
  { step: '03', title: 'Audit Report', desc: 'You receive a detailed report: what\'s fair, what\'s inflated, what\'s missing, and what to negotiate.' },
  { step: '04', title: 'Negotiation Support', desc: 'Optional: We help you negotiate with the contractor or prepare a proper counter-BOQ.' },
];

export default function BOQAuditPage() {
  return (
    <div className="engineerLedPage">
      {/* ── Hero ── */}
      <section className={`fullBleedSection ${styles.hero}`}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="sectionInnerWide">
          
          <AnimatedSection className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.breadcrumbLink}>Build</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>BOQ Audit</span>
            </div>
            
            <div className={styles.alertPill}>
              <span className={styles.alertPillIcon}>⚠️</span>
              <span className={styles.alertPillText}>MOST CONTRACTOR QUOTES HIDE ₹5–20 LAKHS IN EXTRAS</span>
            </div>
            
            <h1 className={styles.heroH1}>
              Get Your Contractor<br />
              <span>Quote Audited.</span>
            </h1>
            <p className={styles.heroSub}>
              Before you sign anything — let Buildogram engineers check every line item, rate and spec in your contractor's quote. We expose what's inflated, what's missing, and what's non-negotiable.
            </p>
            <div className={styles.heroCtas}>
              <Link href="#audit-form" className="btn btn-primary btn-lg">Get Free BOQ Audit</Link>
              <Link href="/cost-estimator" className={`btn btn-lg ${styles.heroOutline}`}>Calculate True Cost</Link>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className={`fullBleedSection ${styles.statsBar}`}>
        <div className="sectionInnerWide">
          <AnimatedSection className={styles.statsGrid}>
            {[['₹5–20L', 'Avg hidden charges found'], ['8+', 'Audit categories'], ['48hrs', 'Report turnaround'], ['Free', 'Initial audit consult']].map(([n, l], i) => (
              <div key={l} className={styles.statItem}>
                <div className={styles.statNum}>{n}</div>
                <div className={styles.statLabel}>{l}</div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Hidden costs table ── */}
      <section className={`fullBleedSection ${styles.tableSection}`}>
        <div className="sectionInner" style={{ maxWidth: '820px' }}>
          <AnimatedSection>
            <SectionHeader
              eyebrow="The Real Problem"
              title="Where contractors hide your money"
              description="These are the most common &quot;extras&quot; that appear after you sign a per-sq.ft contract."
            />
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className={styles.tableWrap}>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Hidden Cost Item</th>
                    <th>Typical Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {HIDDEN_COSTS.map((row) => (
                    <tr key={row.item}>
                      <td>
                        <span>×</span> {row.item}
                      </td>
                      <td>{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <p className={styles.tableNote}>* Based on Buildogram's analysis of 100+ contractor quotes in Chennai & Tamil Nadu</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── What we audit ── */}
      <section className={`fullBleedSection ${styles.auditSection}`}>
        <div className="sectionInnerWide">
          <AnimatedSection>
            <SectionHeader
              eyebrow="What We Check"
              title="8 critical areas we audit in your quote"
            />
          </AnimatedSection>
          
          <div className={styles.auditGrid}>
            {WHAT_WE_CHECK.map((item, i) => (
              <PremiumCard key={item.title} animated={true} delay={i * 0.05} hoverEffect={true}>
                <div className={styles.auditCard}>
                  <div className={styles.auditIcon}>{item.icon}</div>
                  <div>
                    <h3 className={styles.auditTitle}>{item.title}</h3>
                    <p className={styles.auditDesc}>{item.desc}</p>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className={`fullBleedSection ${styles.processSection}`}>
        <div className="sectionInner">
          <AnimatedSection>
            <SectionHeader
              eyebrow="How It Works"
              title="4-step BOQ Audit process"
            />
          </AnimatedSection>
          
          <div className={styles.processList}>
            {PROCESS.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.1} className={styles.processItem}>
                <div className={styles.processNum}>{s.step}</div>
                <div className={styles.processBody}>
                  <h3 className={styles.processTitle}>{s.title}</h3>
                  <p className={styles.processDesc}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof pill ── */}
      <section className={`fullBleedSection ${styles.proofBar}`}>
        <div className="sectionInnerWide">
          <AnimatedSection className={styles.proofGrid}>
            {[
              { icon: '🏗️', text: 'If we find <₹1L in savings — audit is free' },
              { icon: '📊', text: 'Detailed line-by-line audit report' },
              { icon: '🤝', text: 'Optional negotiation support included' },
              { icon: '⚡', text: '48-hour turnaround on first review' },
            ].map((p, i) => (
              <div key={p.text} className={styles.proofItem}>
                <span className={styles.proofIcon}>{p.icon}</span>
                <span className={styles.proofText}>{p.text}</span>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="audit-form" className={`fullBleedSection ${styles.formSection}`}>
        <div className={`sectionInner ${styles.formWrap}`}>
          <AnimatedSection>
            <SectionHeader
              title="Request Your Free BOQ Audit"
              description="Share your contractor quote (even a verbal one). Our engineers will review it and identify every discrepancy before you sign."
              titleColor="white"
              descColor="rgba(255, 255, 255, 0.7)"
            />
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className={styles.formCard}>
            <BOQAuditForm />
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '15px', marginTop: '24px' }}>
              Or call us directly: <a href="tel:+919000000000" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' }}>+91 90000 00000</a>
            </p>
            <div className={styles.disclaimer}>
              <strong>Disclaimer:</strong> This BOQ review is advisory and based on provided documents. It is not engineering, legal, contractual, or construction certification.
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
