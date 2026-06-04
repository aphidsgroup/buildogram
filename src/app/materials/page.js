import Link from 'next/link';
import MaterialLeadForm from './MaterialLeadForm';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionHeader from '@/components/ui/SectionHeader';
import PremiumCard from '@/components/ui/PremiumCard';
import styles from './materials.module.css';

export const metadata = {
  title: 'Construction Material Sourcing Support in Chennai | Buildogram',
  description: 'Compare construction material quotes, coordinate deliveries, track invoices, and store material records with Buildogram\'s transparent material sourcing support.',
};

const categories = [
  { icon: '🏭', name: 'Cement', brands: 'UltraTech, Ramco, Dalmia, Chettinad', href: '/materials/cement' },
  { icon: '⚙️', name: 'Steel (TMT)', brands: 'Tata Tiscon, SAIL, Vizag, JSW', href: '/materials/steel' },
  { icon: '🪨', name: 'Sand & M-Sand', brands: 'River sand, M-Sand, P-Sand', href: '/materials/sand' },
  { icon: '🧱', name: 'Blocks & Bricks', brands: 'Solid blocks, Hollow blocks, Red brick', href: '/materials/blocks' },
  { icon: '🔌', name: 'Electrical', brands: 'Havells, Legrand, Finolex, Polycab', href: '/materials/electrical' },
  { icon: '🚿', name: 'Plumbing', brands: 'Ashirvad, Supreme, Finolex pipes', href: '/materials/plumbing' },
  { icon: '🏠', name: 'Tiles & Flooring', brands: 'Asian, Kajaria, Johnson, Orient', href: '/materials/tiles' },
  { icon: '🎨', name: 'Paint', brands: 'Asian Paints, Berger, Nerolac, Dulux', href: '/materials/paint' },
];

const whyBuildogram = [
  { icon: '💰', title: 'Competitive Quote Routing', desc: 'Submit one request and we route it to our supplier network to help you find competitive quotes.' },
  { icon: '📦', title: 'Delivery Record Where Available', desc: 'Delivery records where submitted — brand, quantity and batch noted when provided by supplier.' },
  { icon: '📄', title: 'Test Certificates', desc: 'Request test certificates for steel, cement and key structural materials where available.' },
  { icon: '🛂', title: 'Passport Entry', desc: 'Materials can be logged in your Property Passport for project records.' },
  { icon: '🔄', title: 'Supplier Comparison', desc: 'Compare quotes from multiple suppliers in our network before committing.' },
  { icon: '📋', title: 'One Request, Many Quotes', desc: 'One material request form — we handle supplier coordination and quote collection for you.' },
];

export default function MaterialsPage() {
  return (
    <div className="engineerLedPage">
      {/* ── Hero ── */}
      <section className={`fullBleedSection ${styles.hero}`}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className="sectionInnerWide" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <span className={styles.eyebrow}>Transparent Material Sourcing</span>
            <h1 className={styles.heroH1}>
              Source Construction Materials<br />
              <span>With Rate Clarity &amp; Delivery Records.</span>
            </h1>
            <p className={styles.heroSub}>
              Buildogram helps owners and construction partners compare supplier quotes, coordinate deliveries, track invoices, and store material records inside the Property Passport.
            </p>
            <div className={styles.heroCtas}>
              <Link href="#quote" className="btn btn-primary btn-lg">Request Material Support</Link>
              <Link href="/contact" className={`btn btn-lg ${styles.heroOutline}`}>Talk to Buildogram</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Material Categories ── */}
      <section className={`fullBleedSection ${styles.categoriesSection}`}>
        <div className="sectionInnerWide">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Material Quote Support"
              title="All construction materials. One supplier network."
            />
          </AnimatedSection>
          
          <div className={styles.catGrid}>
            {categories.map((c, i) => (
              <AnimatedSection key={c.name} delay={i * 0.05}>
                <Link href={c.href} className={styles.catCard}>
                  <PremiumCard hoverEffect={true} className={styles.catCardInner}>
                    <div className={styles.catIcon}>{c.icon}</div>
                    <h3 className={styles.catTitle}>{c.name}</h3>
                    <p className={styles.catDesc}>{c.brands}</p>
                  </PremiumCard>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Buildogram ── */}
      <section className={`fullBleedSection ${styles.whySection}`}>
        <div className="sectionInnerWide">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Why Material Sourcing Matters"
              title="Transparent sourcing. Better accountability."
            />
          </AnimatedSection>
          
          <div className={styles.whyGrid}>
            {whyBuildogram.map((w, i) => (
              <PremiumCard key={w.title} animated={true} delay={i * 0.05} hoverEffect={true}>
                <div className={styles.whyCard}>
                  <div className={styles.whyIcon}>{w.icon}</div>
                  <div>
                    <h3 className={styles.whyTitle}>{w.title}</h3>
                    <p className={styles.whyDesc}>{w.desc}</p>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="quote" className={`fullBleedSection ${styles.formSection}`}>
        <div className={`sectionInnerWide ${styles.formWrapper}`}>
          <AnimatedSection className={styles.formHeader}>
            <h2 className={styles.formH2}>Request Material Support</h2>
            <p className={styles.formP}>Tell us what materials you need. We will route your request to our supplier network and share competitive market-aligned quotes.</p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className={styles.formCard}>
              <MaterialLeadForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
