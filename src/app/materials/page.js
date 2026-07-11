import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Construction Materials in Chennai | Wholesale Cement, Steel, Sand | Buildogram',
  description: 'Source authentic construction materials at wholesale rates in Chennai. MTC-verified cement, Fe500D TMT steel, M-sand, AAC blocks, RMC and more from authenticated suppliers.',
  path: '/materials',
});

const CATEGORIES = [
  { icon: '🏗️', name: 'Cement', desc: 'UltraTech, Dalmia, Ramco, India Cements. OPC 53, PPC, PSC grades.', link: '/materials/cement', brands: 'UltraTech · Dalmia · Ramco' },
  { icon: '⚙️', name: 'TMT Steel', desc: 'Fe500D, CRS (Coastal Corrosion-Resistant). Tata Tiscon, JSW, SAIL, RINL.', link: '/materials/tmt-steel', brands: 'Tata Tiscon · JSW · SAIL' },
  { icon: '🏖️', name: 'M-Sand & P-Sand', desc: 'Manufactured sand from approved quarries. Conforms to IS 383 particle size limits.', link: '/materials/msand-psand', brands: 'IS 383 Grade II & III' },
  { icon: '🧱', name: 'Bricks & AAC Blocks', desc: 'Wire-cut clay bricks and lightweight AAC autoclaved aerated concrete blocks.', link: '/materials/bricks-aac-blocks', brands: 'Nuvoco · SIPOREX · Local MTC' },
  { icon: '🪨', name: 'Ready Mix Concrete (RMC)', desc: 'M20, M25, M30 RMC from batching plants within 90-minute haul distance.', link: '/materials/rmc', brands: 'Ultratech RMC · ACC · Prism' },
  { icon: '💧', name: 'Waterproofing', desc: 'Crystalline, elastomeric membrane, polyurea coating systems. Brand-authorized.', link: '/materials/waterproofing', brands: 'Dr. Fixit · Fosroc · Sika' },
  { icon: '⚡', name: 'Electrical Materials', desc: 'Wires, conduits, MCBs, switches, panels. ISI-marked and BIS-certified.', link: '/materials/electrical', brands: 'Havells · Finolex · Legrand' },
  { icon: '🔧', name: 'Plumbing Materials', desc: 'CPVC, uPVC, PPR pipes and fittings. ISI-marked sanitary ware and faucets.', link: '/materials/plumbing', brands: 'Ashirvad · Supreme · Jaquar' },
  { icon: '🏭', name: 'Fabrication & Structural Steel', desc: 'MS sections, hollow sections, angles, channels for columns and frames.', link: '/materials/fabrication-steel', brands: 'SAIL · JSPL · Vizag Steel' },
  { icon: '🔩', name: 'Piling Materials', desc: 'Precast concrete piles, bentonite slurry, casing pipes for bored piles.', link: '/materials/piling-foundation-materials', brands: 'IS 2911 grade materials' },
  { icon: '🎨', name: 'Finishing Materials', desc: 'Tiles, floorings, paints, hardware from premium brands with dealer authentication.', link: '/materials/finishing-materials', brands: 'Kajaria · Berger · Greenply' },
];

const HOW_IT_WORKS = [
  { step: '1', icon: '📋', title: 'BOQ Extraction', desc: 'We extract your material quantities from your approved BOQ. Every line item — bags, bars, loads — is identified.' },
  { step: '2', icon: '📞', title: 'Live Supplier Quotes', desc: 'We obtain same-day quotes from our verified supplier network at Broadway and Mannady wholesale pricing.' },
  { step: '3', icon: '🚛', title: 'Authenticated Delivery', desc: 'Delivery trucks weighed at certified weighbridges. MTC documents verified before unloading on your site.' },
];

const TRUST_ITEMS = [
  { icon: '📄', title: 'Manufacturer Test Certificates (MTC)', desc: 'Every structural material — cement, steel, concrete — must come with an MTC from the manufacturer batch.' },
  { icon: '⚖️', title: 'Weighbridge Slip Verification', desc: 'Truck weights verified at a NABL-certified weighbridge. You pay for what is actually delivered, not what\'s billed.' },
  { icon: '📅', title: 'Batch Date Freshness', desc: 'Cement older than 90 days (per IS 455) is rejected. Batch date on bags checked against MTC before unloading.' },
  { icon: '✅', title: 'Brand Authenticity Marks', desc: 'Hologram, batch QR codes, and manufacturer embossing verified. No counterfeit or downgraded materials accepted.' },
];

const FAQS = [
  { question: 'Does Buildogram sell materials directly to me?', answer: 'We connect you with our verified supplier network and facilitate procurement — either by placing orders on your behalf or by providing supplier contacts for direct purchase. Our role is to verify material quality and ensure fair pricing, not to be a retailer.' },
  { question: 'How do Buildogram\'s material prices compare to market rates?', answer: 'Our network operates at Broadway and Mannady wholesale rates — typically 8–15% below retail prices. The savings come from bulk ordering, direct manufacturer relationships, and eliminating intermediary markups.' },
  { question: 'Can I visit the supplier before placing an order?', answer: 'Yes. We can arrange site visits to our verified supplier warehouses in Chennai. This is especially useful before your first order to build trust with the supplier.' },
  { question: 'What are Manufacturer Test Certificates (MTCs) and why do they matter?', answer: 'An MTC is a quality certification issued by the manufacturer confirming the batch of material meets the specified grade (e.g., Fe500D for TMT steel, OPC 53 for cement). It includes test data on tensile strength, yield strength, chemical composition, and more. Without MTC verification, you cannot be sure you received what you paid for.' },
  { question: 'How long does material delivery take after ordering?', answer: 'Cement and M-sand: same day or next day in Chennai. TMT steel: 1–3 days depending on quantity. RMC: scheduled delivery window. Tiles and finishing materials: 3–7 days depending on stock.' },
];

export default function MaterialsPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Materials</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Source Authentic Construction Materials at Wholesale Rates
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Skip the retail markup. Access Broadway-level wholesale pricing on cement, TMT steel, M-sand, and more — delivered to your site with Manufacturer Test Certificates (MTC).
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=material-quote" className="btn btn-primary btn-lg">Request Material Quote</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Calculate Your BOQ First</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ background: 'var(--bg-card2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '24px' }}>
          {[
            { value: '11+', label: 'Material Categories' },
            { value: '150+', label: 'Verified Suppliers' },
            { value: 'Broadway', label: 'Wholesale Pricing' },
            { value: '100%', label: 'MTC-Verified Delivery' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '12px' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Categories */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>11 Categories</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Browse Construction Materials</h2>
          </div>
          <div className="grid-3" style={{ gap: '16px' }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.name} href={cat.link} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontSize: '26px' }}>{cat.icon}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>{cat.name}</h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '10px' }}>{cat.desc}</p>
                  <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>{cat.brands}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ marginBottom: '64px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '48px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--secondary)' }}>How Material Sourcing Works</h2>
          </div>
          <div className="grid-3" style={{ gap: '24px' }}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>{step.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>Step {step.step}: {step.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '26px', color: 'var(--secondary)' }}>Why Material Verification Matters</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '12px auto 0', fontSize: '14px' }}>Material fraud costs Chennai homeowners crores every year. Our verification protocol prevents the four most common types of material fraud.</p>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {TRUST_ITEMS.map(item => (
              <div key={item.title} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '26px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQBlock title="Material Sourcing FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Ready to Source Materials at Wholesale Rates?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>Share your BOQ and we'll get you same-day quotes from verified Chennai suppliers.</p>
          <Link href="/contact?type=material-quote" className="btn btn-primary btn-lg">Request Material Quote</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Construction Materials', path: '/materials' }]} />
    </>
  );
}
