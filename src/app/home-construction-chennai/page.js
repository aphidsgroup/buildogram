import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Home Construction Support in Chennai | Engineer-Led Building | Buildogram',
  description: 'Get expert home construction support in Chennai. BOQ reviews, material sourcing, site supervision and contractor management by structural engineers. Save 15–20% on your build.',
  path: '/home-construction-chennai',
});

const PROCESS = [
  { step: '01', title: 'Soil & Site Assessment', desc: 'We mandate a Soil Bearing Capacity (SBC) test on your plot before design begins. This determines foundation type — conventional footing, raft, or piles — protecting your structure for decades.' },
  { step: '02', title: 'Architectural & Structural Design', desc: 'Our team produces CMDA/DTCP-compliant 2D drawings and 3D elevations. Structural design covers beam sizes, column spacing, and rebar layouts — all per IS codes.' },
  { step: '03', title: 'Capped BOQ Contract', desc: 'We generate an itemized Bill of Quantities specifying every bag of cement, every metre of TMT steel and every pipe fitting. This is signed into a legally capped fixed-price contract — no hidden surprises.' },
  { step: '04', title: 'Supervised Construction', desc: 'Our site engineers conduct daily on-ground checks. Concrete slump tests, rebar spacing inspections, and material delivery verification are logged and visible on your Client Portal.' },
  { step: '05', title: 'Quality Handover', desc: 'We conduct 48-hour waterproofing pond tests, electrical insulation checks, and plumbing pressure tests before handing over keys — along with all lab receipts, structural warranty, and as-built drawings.' },
];

const PROBLEMS = [
  { icon: '💸', title: 'Contractor Overquoting', desc: 'Generic per-sqft contracts hide inflated material costs and labour margins. Our itemized BOQ exposes every line item.' },
  { icon: '🧱', title: 'Material Substitution', desc: 'Contractors replace specified cement brands with cheaper alternatives after signing. Our site engineers verify every delivery batch.' },
  { icon: '👁️', title: 'No Progress Visibility', desc: 'You lose weeks of site time without updates. Our Client Portal delivers daily photos, slump test reports, and milestone alerts.' },
  { icon: '📐', title: 'Structural Design Gaps', desc: 'Plans drawn without proper soil data lead to cracked slabs and settling foundations. We mandate SBC tests before design.' },
];

const FAQS = [
  { question: 'Do you directly build homes or manage contractors?', answer: 'Buildogram is an engineer-led support platform. We review BOQs, verify materials, provide site supervision, and connect you with verified contractors — but the construction contract is between you and the builder.' },
  { question: 'How much does a home cost to build in Chennai?', answer: 'A basic quality build costs ₹1,600–1,900/sqft, standard quality ₹2,000–2,400/sqft, and premium ₹2,500–3,200/sqft. These include structure, brick, plaster, waterproofing, and basic finishes. Tiles, electrical, and plumbing are additional.' },
  { question: 'Is a soil test really necessary before construction?', answer: 'Absolutely. Velachery, Adyar, and coastal OMR areas have soft clay or expansive soil that can cause foundation settlement and slab cracking if not accounted for in the design. IS 1904 requires soil data before foundation design.' },
  { question: 'How do you prevent material fraud by contractors?', answer: 'Our site engineers physically verify material delivery batches — checking brand markings, weighbridge slips, and Manufacturer Test Certificates (MTCs) for cement, TMT steel, and RMC concrete deliveries.' },
  { question: 'What is a capped BOQ contract?', answer: 'A capped BOQ contract locks the total cost at signing based on an itemized Bill of Quantities. Unlike a per-sqft contract, every material is specified by brand, grade, and quantity. Cost overruns beyond the BOQ are covered by the contractor — not you.' },
  { question: 'Can I monitor construction remotely (NRI)?', answer: 'Yes. Our Client Portal provides daily site photos, concrete test reports, worker attendance, and milestone completion certificates. Many NRI clients successfully manage their Chennai home construction entirely from abroad.' },
  { question: 'How long does home construction take in Chennai?', answer: 'A typical G+1 house (1,000–1,500 sqft) takes 12–16 months from soil test to handover. G+2 homes take 18–24 months. Timelines depend on monsoon seasons, design complexity, and contractor capacity.' },
];

export default function HomeConstructionChennai() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chennai Construction</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Expert Home Construction Support in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Stop guessing with contractor quotes. Get engineer-verified BOQ contracts, authenticated material sourcing, and real-time site supervision — backed by structural engineers who know Chennai's soil, climate, and CMDA rules.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Free BOQ Calculator</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '20px 24px', display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['500+', 'Projects Supported'], ['₹2.8Cr', 'Average Project Value'], ['18%', 'Average Client Savings'], ['10-Year', 'Structural Warranty']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>{val}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Problems Section */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Common Problems</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>What Chennai Homeowners Face Without Engineering Support</h2>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {PROBLEMS.map(p => (
              <div key={p.title} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '56px 40px', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Our 5-Phase Process</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>How We Support Your Home Build</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PROCESS.map(p => (
              <div key={p.step} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'white' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0, fontFamily: 'var(--font-space)' }}>{p.step}</div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chennai Context */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '8px' }}>🏛️ CMDA & DTCP Compliance</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>We verify setback distances, FSI limits, and floor-area calculations for your specific zone before design begins — preventing costly rework or demolition orders.</p>
            </div>
            <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '8px' }}>🌊 Coastal Corrosion Protection</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>ECR, OMR, and Adyar sites require CRS (Corrosion Resistant Steel) and anti-chloride concrete admixtures. We specify these in the BOQ — many contractors skip them to cut costs.</p>
            </div>
            <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '8px' }}>🌧️ Monsoon & Flood Planning</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>We set plinth heights based on local flood level data — critical in Velachery, Madipakkam, and Pallikaranai areas. Proper plinth height prevents ground-floor waterlogging.</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FAQBlock title="Home Construction FAQs" faqs={FAQS} />

        {/* Related Links */}
        <div style={{ marginTop: '48px', padding: '24px', background: '#FFF7ED', borderRadius: 'var(--radius)', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '12px', fontSize: '14px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[['Turnkey Construction', '/turnkey-construction-chennai'], ['Site Supervision', '/site-supervision-chennai'], ['BOQ Calculator', '/boq-calculator'], ['Soil Testing', '/soil-testing-chennai'], ['Structural Audit', '/structural-audit-chennai']].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '7px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>{label}</Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Ready to build your home the right way?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '540px', margin: '0 auto 28px' }}>Talk to our structural engineers for a free consultation on your project scope, budget, and Chennai-specific requirements.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=construction" className="btn btn-primary btn-lg">Book Free Consultation</Link>
            <Link href="/boq-calculator" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Calculate My BOQ</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Home Construction in Chennai', path: '/home-construction-chennai' }]} />
    </>
  );
}
