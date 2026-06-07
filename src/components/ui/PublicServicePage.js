import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';
import PremiumCard from './PremiumCard';
import styles from './PublicServicePage.module.css';

export default function PublicServicePage({
  heroEyebrow,
  heroTitle,
  heroSub,
  heroPrimaryCta = { label: 'Talk to an Engineer', href: '/contact?type=construction' },
  heroSecondaryCta = { label: 'Review My Quote', href: '/boq-audit' },
  problems = [],
  processSteps = [],
  serviceDetails = [],
  proofData = null,
  faqs = [],
  finalCtaTitle = 'Start with clarity. Build with confidence.',
}) {
  return (
    <main className={styles.page}>
      
      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className="sectionInner text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <AnimatedSection>
            {heroEyebrow && <span className={styles.eyebrow}>{heroEyebrow}</span>}
            <h1 className={styles.heroH1}>{heroTitle}</h1>
            <p className={styles.heroSub}>{heroSub}</p>
            <div className={styles.heroCtas}>
              <Link href={heroPrimaryCta.href} className="btn btn-primary btn-lg">{heroPrimaryCta.label}</Link>
              <Link href={heroSecondaryCta.href} className={`btn btn-lg ${styles.heroOutline}`}>{heroSecondaryCta.label}</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      {problems.length > 0 && (
        <section className="fullBleedSection" style={{ padding: '80px 0', background: 'white' }}>
          <div className="sectionInner">
            <AnimatedSection>
              <SectionHeader
                eyebrow="The Challenge"
                title="Common issues owners face."
                description="Without engineering guidance, these are the typical risks encountered."
              />
            </AnimatedSection>
            <div className={styles.problemGrid}>
              {problems.map((p, i) => (
                <PremiumCard key={i} animated={true} delay={i * 0.05} className={styles.problemCard}>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--secondary)', marginBottom: '8px' }}>{p.title}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. PROCESS */}
      {processSteps.length > 0 && (
        <section className={`fullBleedSection ${styles.altSection}`}>
          <div className="sectionInner">
            <AnimatedSection>
              <SectionHeader
                eyebrow="Our Approach"
                title="The Buildogram Process"
                description="A structured, systematic way to execute correctly."
              />
            </AnimatedSection>
            <div className={styles.timelineWrap}>
              {processSteps.map((step, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className={styles.timelineStep}>
                  <div className={styles.timelineMarker}>
                    <div className={styles.timelineNum}>{step.step}</div>
                    {i < processSteps.length - 1 && <div className={styles.timelineConnector} />}
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
      )}

      {/* 4. SERVICE DETAILS */}
      {serviceDetails.length > 0 && (
        <section className="fullBleedSection" style={{ padding: '80px 0', background: 'white' }}>
          <div className="sectionInner">
            <AnimatedSection>
              <SectionHeader
                eyebrow="What's Included"
                title="Detailed Scope of Service"
                description="Everything covered under this service module."
              />
            </AnimatedSection>
            <div className={styles.bentoGrid}>
              {serviceDetails.map((s, i) => (
                <PremiumCard key={i} className={styles.bentoCell} animated={true} delay={i * 0.05}>
                  <h3 className={styles.bentoTitle}>{s.title}</h3>
                  <p className={styles.bentoDesc}>{s.desc}</p>
                </PremiumCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. PROOF/RECORD SECTION */}
      {proofData && (
        <section className={`fullBleedSection ${styles.altSection}`}>
          <div className="sectionInner">
            <AnimatedSection>
              <SectionHeader
                eyebrow="Proof & Records"
                title={proofData.title || "See the Difference"}
                description={proofData.desc || "Engineering rigor applied to real project data."}
              />
            </AnimatedSection>
            <div className={styles.proofDashboard}>
              <div className={styles.proofHeader}>{proofData.dashboardTitle}</div>
              <div className={styles.proofGrid}>
                {proofData.items.map((item, i) => (
                  <div key={i} className={styles.proofItem}>
                    <span className={styles.proofCheck}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ */}
      {faqs.length > 0 && (
        <section className="fullBleedSection" style={{ padding: '80px 0', background: 'white' }}>
          <div className="sectionInner">
            <AnimatedSection>
              <SectionHeader
                eyebrow="FAQ"
                title="Frequently Asked Questions"
              />
            </AnimatedSection>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div key={i} className={styles.faqItem}>
                  <h4 className={styles.faqQ}>{faq.q}</h4>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. CTA */}
      <section className={styles.finalCta}>
        <div className="sectionInner">
          <AnimatedSection className={styles.ctaBox}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <h2 className={styles.ctaH2}>{finalCtaTitle}</h2>
            <div className={styles.ctaActions}>
              <Link href={heroPrimaryCta.href} className="btn btn-primary btn-lg">{heroPrimaryCta.label}</Link>
              <Link href={heroSecondaryCta.href} className={`btn btn-lg ${styles.ctaOutline}`}>{heroSecondaryCta.label}</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
