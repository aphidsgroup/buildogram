import Link from 'next/link';
import DirectoryClient from './DirectoryClient';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import PremiumCard from '@/components/ui/PremiumCard';
import styles from './directory.module.css';

export const metadata = {
  title: 'Verified Builders, Contractors, Architects & Suppliers | Buildogram',
  description: 'Explore verified construction partners connected through Buildogram\'s engineer-led ecosystem, including builders, contractors, architects, consultants, and material suppliers.',
};

const CATEGORIES = [
  { icon: '🏗️', label: 'Builders', desc: 'Residential, villa and turnkey construction', filter: 'Builder' },
  { icon: '🔧', label: 'Contractors', desc: 'RCC, MEP, finishing and civil work specialists', filter: 'Builder' },
  { icon: '📐', label: 'Architects', desc: 'Design, planning and structural coordination', filter: 'Architect' },
  { icon: '🎨', label: 'Interior Designers', desc: 'Residential and commercial interior fit-outs', filter: 'Interior Designer' },
  { icon: '🧱', label: 'Material Suppliers', desc: 'Cement, steel, sand, tiles and construction materials', filter: 'Material Supplier' },
  { icon: '☀️', label: 'Solar Installers', desc: 'Rooftop solar, net metering and AMC', filter: 'Solar' },
  { icon: '🔼', label: 'Elevator Companies', desc: 'Home lifts, hydraulic and MRL elevators', filter: 'Elevators' },
  { icon: '💧', label: 'Waterproofing', desc: 'Terrace, basement and bathroom waterproofing', filter: 'Waterproofing' },
];

const LOCATIONS = ['Chennai', 'OMR', 'ECR', 'Adyar', 'Anna Nagar', 'Tambaram', 'Velachery', 'Porur', 'Ambattur', 'Guindy', 'Nungambakkam'];

const HOW_IT_WORKS = [
  { step: '01', title: 'Browse Partner Profiles', desc: 'Explore professionals who have submitted credentials, project records, and service details to Buildogram.' },
  { step: '02', title: 'Review Credentials', desc: 'Check submitted certifications, portfolio images, and past project write-ups. Contact Buildogram for further verification.' },
  { step: '03', title: 'Request via Buildogram', desc: 'All enquiries are routed through Buildogram — ensuring transparency and proper coordination before any engagement.' },
];

export default function PartnerDirectoryPage() {
  return (
    <div className="engineerLedPage">

      {/* ── Hero ── */}
      <section className={`fullBleedSection ${styles.hero}`}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="sectionInnerWide" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <span className={styles.eyebrow}>Verified Construction Partner Network</span>
            <h1 className={styles.heroH1}>
              Work With Verified Construction Partners
            </h1>
            <p className={styles.heroSub}>
              Explore builders, contractors, architects, consultants, suppliers, and service providers connected through Buildogram’s engineer-led construction ecosystem. All enquiries are routed through Buildogram for transparency.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/partners/register" className="btn btn-primary btn-lg">Become a Buildogram Partner</Link>
              <Link href="/contact" className={`btn btn-lg ${styles.heroOutline}`}>Talk to Buildogram</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Category Grid ── */}
      <section className={`fullBleedSection ${styles.catSection}`}>
        <div className="sectionInnerWide">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Browse by Category"
              title="All construction services. One platform."
            />
          </AnimatedSection>
          
          <div className={styles.catGrid}>
            {CATEGORIES.map((cat, i) => (
              <AnimatedSection key={cat.label} delay={i * 0.05}>
                <Link href={`/partners/directory?cat=${encodeURIComponent(cat.filter)}`} className={styles.catCard}>
                  <PremiumCard hoverEffect={true} className={styles.catCardInner}>
                    <div className={styles.catIcon}>{cat.icon}</div>
                    <h3 className={styles.catLabel}>{cat.label}</h3>
                    <p className={styles.catDesc}>{cat.desc}</p>
                  </PremiumCard>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location Chips ── */}
      <section className={`fullBleedSection ${styles.locSection}`}>
        <div className="sectionInnerWide">
          <div className={styles.locWrap}>
            <span className={styles.locLabel}>📍 Browse by location:</span>
            {LOCATIONS.map(loc => (
              <Link key={loc} href={`/partners/directory?loc=${encodeURIComponent(loc)}`} className={styles.locChip}>
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Partner Grid ── */}
      <section className={`fullBleedSection ${styles.dirSection}`}>
        <div className="sectionInnerWide">
          <DirectoryClient />
        </div>
      </section>

      {/* ── How Partner Review Works ── */}
      <section className={`fullBleedSection ${styles.processSection}`}>
        <div className="sectionInnerWide">
          <AnimatedSection>
            <SectionHeader
              eyebrow="How It Works"
              title="How partner review and enquiry works"
              description="Buildogram acts as a coordination layer — not a blind directory. All enquiries are mediated to ensure quality and transparency."
            />
          </AnimatedSection>
          
          <div className={styles.processGrid}>
            {HOW_IT_WORKS.map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.1} className={styles.processItem}>
                <div className={styles.processNum}>{step.step}</div>
                <div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not Just Listed ── */}
      <section className={`fullBleedSection ${styles.valueSection}`}>
        <div className="sectionInnerWide" style={{ maxWidth: '1000px' }}>
          <AnimatedSection>
            <SectionHeader
              eyebrow="Not Just Listed"
              title="Not Just Listed — Reviewed for Construction Relevance"
              description="Buildogram focuses on building a trusted partner ecosystem where professionals are showcased based on work relevance, project proof, service category, and ability to support property owners with clarity."
            />
          </AnimatedSection>
          
          <div className={styles.valueGrid}>
            {[
              { icon: '📋', title: 'Credential Submission', desc: 'Partners submit certifications, licences, and proof of trade experience.' }, 
              { icon: '🏗️', title: 'Project Proof', desc: 'Completed project records, photos, and client references submitted for review.' }, 
              { icon: '🗂️', title: 'Service Category', desc: 'Categorised by specialisation — builder, architect, contractor, supplier, and more.' }, 
              { icon: '🤝', title: 'Buildogram Coordination', desc: 'All owner enquiries are routed through Buildogram for transparency.' }
            ].map((item, i) => (
              <PremiumCard key={i} animated={true} delay={i * 0.05} hoverEffect={true}>
                <div className={styles.valueIcon}>{item.icon}</div>
                <h3 className={styles.valueTitle}>{item.title}</h3>
                <p className={styles.valueDesc}>{item.desc}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className={`fullBleedSection ${styles.joinCta}`}>
        <div className={`sectionInnerWide ${styles.joinWrap}`}>
          <AnimatedSection>
            <h2 className={styles.joinH2}>Are you a construction professional?</h2>
            <p className={styles.joinP}>Builders, architects, interior designers, suppliers, solar installers, waterproofing specialists and contractors can apply to join Buildogram’s verified construction ecosystem.</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/partners/register" className="btn btn-primary btn-lg" style={{ whiteSpace: 'nowrap' }}>Become a Partner</Link>
            <Link href="/contact" className={`btn btn-lg ${styles.heroOutline}`} style={{ whiteSpace: 'nowrap' }}>Talk to Buildogram</Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
