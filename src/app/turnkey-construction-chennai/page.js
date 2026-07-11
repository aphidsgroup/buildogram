import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Turnkey Construction in Chennai | Design to Handover | Buildogram',
  description: 'Get a complete turnkey home construction package in Chennai. Design, BOQ, material sourcing, supervised construction and handover — managed by structural engineers.',
  path: '/turnkey-construction-chennai',
});

const INCLUDED = [
  { icon: '🔬', item: 'Soil Bearing Capacity (SBC) Test', detail: 'Determines foundation type before design' },
  { icon: '📐', item: 'Architectural Design (2D + 3D)', detail: 'CMDA/DTCP compliant floor plans and elevations' },
  { icon: '🏗️', item: 'Structural Engineering Design', detail: 'IS-code compliant beams, columns, slabs' },
  { icon: '📋', item: 'Capped BOQ Contract', detail: 'Every material itemized, locked at signing' },
  { icon: '🧱', item: 'Material Sourcing', detail: 'Wholesale-rate cement, steel, sand and bricks' },
  { icon: '👷', item: 'Construction Execution', detail: 'Managed by our partner contractor network' },
  { icon: '🔍', item: '500+ Quality Checks', detail: 'Concrete tests, rebar inspections, milestone sign-offs' },
  { icon: '🔑', item: 'Handover Documentation', detail: 'Structural warranty, lab receipts, as-built drawings' },
];

const PACKAGES = [
  {
    name: 'Basic',
    price: '₹1,650 / sqft',
    color: 'var(--border)',
    features: ['M20 grade concrete', 'Standard TMT steel', 'Flush door frames', 'Basic flooring tiles', 'Standard sanitary fixtures', 'Asian Paints Tractor Emulsion'],
    cta: 'Get Basic Quote',
  },
  {
    name: 'Standard',
    price: '₹1,950 / sqft',
    color: 'var(--primary)',
    features: ['M25 grade concrete', 'Fe500D TMT (CRS for coastal)', 'Teak-finish door frames', 'Kajaria/Somany tiles', 'Jaguar / Hindware fixtures', 'Asian Paints Royale'],
    cta: 'Get Standard Quote',
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹2,400 / sqft',
    color: 'var(--secondary)',
    features: ['M30 grade concrete', 'Corrosion-resistant steel, full CRS', 'Teak hardwood doors', 'Italian/Vitrified large tiles', 'Grohe / American Standard', 'Asian Paints Apex + Texture'],
    cta: 'Get Premium Quote',
  },
];

const VS_TABLE = [
  { aspect: 'Single Point of Contact', turnkey: '✅ Yes — one team', contractor: '❌ No — multiple vendors' },
  { aspect: 'Design Included', turnkey: '✅ Architecture + Structure', contractor: '❌ Usually separate cost' },
  { aspect: 'Material Sourcing', turnkey: '✅ Wholesale rates, MTC-verified', contractor: '⚠️ Contractor-chosen, markup hidden' },
  { aspect: 'Quality Supervision', turnkey: '✅ Independent engineer checks', contractor: '❌ Contractor checks own work' },
  { aspect: 'BOQ Transparency', turnkey: '✅ Every line item specified', contractor: '❌ Lump sum per sqft' },
  { aspect: 'Cost Overrun Risk', turnkey: '✅ Capped, contractor bears overrun', contractor: '❌ Owner bears all overruns' },
  { aspect: 'Structural Warranty', turnkey: '✅ 10-year legal warranty', contractor: '⚠️ Verbal 1–2 year promise' },
];

const FAQS = [
  { question: 'What exactly is included in a turnkey package?', answer: 'Our turnkey package includes everything from soil SBC testing and architectural design to construction execution, material sourcing, site supervision, quality testing, and formal handover — including structural warranty documents and all lab test certificates.' },
  { question: 'Are the per-sqft rates inclusive of all materials?', answer: 'The per-sqft rates cover the structural work, brickwork, plastering, waterproofing, basic flooring, electrical wiring (excluding fixtures), and plumbing roughing. Premium items like designer tiles, modular kitchens, wardrobes, and false ceilings are additional and quoted separately.' },
  { question: 'What is the difference between turnkey and a contractor-managed build?', answer: 'In a contractor build, you hire the contractor, source materials yourself (or trust the contractor to source them), and have no independent verification of work quality. In our turnkey model, we manage everything under a transparent, capped contract with independent engineering oversight throughout.' },
  { question: 'Can I customise materials in a turnkey package?', answer: 'Yes. The packages are a starting baseline. You can upgrade specific elements (e.g., use premium tiles but standard fittings) or downgrade others. All customisations are reflected in the final BOQ before contract signing.' },
  { question: 'How long does a turnkey G+1 construction take?', answer: 'A standard G+1 turnkey project (2,000 sqft) takes 14–18 months from soil test to handover — including design (2 months), approval (1–2 months), and construction (10–12 months).' },
  { question: 'Do you manage CMDA approval in a turnkey package?', answer: 'Yes. Our empanelled architects handle the full CMDA/DTCP drawing submission and approval process. The approval timeline depends on the authority\'s processing speed — typically 3–6 months.' },
  { question: 'What if the project costs more than the BOQ?', answer: 'If scope overruns happen due to contractor errors or material waste, those costs are borne by the contractor — not by you. The BOQ you sign is a capped contract. If you request design changes mid-construction, we issue a formal amendment BOQ before any additional work begins.' },
];

export default function TurnkeyConstructionChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Turnkey Construction</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Complete Turnkey Construction in Chennai — Design to Handover
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            One team, one contract, one price — from soil test and architectural design to supervised construction and formal handover with a 10-year structural warranty. No hidden costs, no contractor excuses.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=turnkey" className="btn btn-primary btn-lg">Get Turnkey Quote</Link>
            <Link href="/how-it-works" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>How It Works</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* What's Included */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Everything Included</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>What's Inside a Buildogram Turnkey Package</h2>
          </div>
          <div className="grid-2" style={{ gap: '16px' }}>
            {INCLUDED.map(item => (
              <div key={item.item} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)' }}>{item.item}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.detail}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--success)', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>✓</span>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Pricing Packages</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Indicative Package Rates</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '12px auto 0', fontSize: '14px' }}>Rates are indicative and vary by location, plot size, and design complexity. Final pricing is fixed in a signed BOQ.</p>
          </div>
          <div className="grid-3" style={{ gap: '20px', alignItems: 'stretch' }}>
            {PACKAGES.map(pkg => (
              <div key={pkg.name} className="card" style={{ position: 'relative', border: pkg.popular ? `2px solid var(--primary)` : undefined, padding: '32px 24px' }}>
                {pkg.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '3px 14px', borderRadius: '999px', whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '6px' }}>{pkg.name}</h3>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginBottom: '20px' }}>{pkg.price}</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text)', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact?type=turnkey" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>{pkg.cta}</Link>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Turnkey vs Traditional Contractor</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Aspect</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Buildogram Turnkey</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Traditional Contractor</th>
                </tr>
              </thead>
              <tbody>
                {VS_TABLE.map((row, i) => (
                  <tr key={row.aspect} style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card2)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text)', fontWeight: 600 }}>{row.aspect}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--success)', fontWeight: 500 }}>{row.turnkey}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{row.contractor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <FAQBlock title="Turnkey Construction FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Ready for a Stress-Free Build?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>Talk to our team to understand which package fits your project and get a preliminary cost estimate within 24 hours.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=turnkey" className="btn btn-primary btn-lg">Get My Turnkey Quote</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Calculate BOQ First</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Turnkey Construction in Chennai', path: '/turnkey-construction-chennai' }]} />
    </>
  );
}
