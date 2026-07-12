import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import MaterialEstimatorClient from './MaterialEstimatorClient';

export const metadata = generateSEOMetadata({
  title: 'AI Material Requirement Estimator Chennai | Cement, Steel, Bricks | Buildogram',
  description:
    'Calculate exact material quantities for your Chennai construction project. AI-estimated cement bags, TMT steel MT, brick count and more. Based on IS codes. Updated July 2026.',
  path: '/ai-material-estimator',
});

const EXAMPLES = [
  {
    title: 'Ground Floor Individual House',
    area: '1,200 sqft',
    spec: 'Standard',
    specColor: '#16A34A',
    materials: [
      { name: 'M20 Cement', qty: '380 bags', icon: '🧱' },
      { name: 'Fe500D TMT Steel', qty: '3.2 MT', icon: '⚙️' },
      { name: 'Fly-ash Brick', qty: '14,200 Nos', icon: '🟫' },
      { name: 'River Sand', qty: '620 cft', icon: '⏳' },
      { name: 'M-Sand', qty: '480 cft', icon: '🪨' },
    ],
  },
  {
    title: 'G+1 Duplex — Foundation Only',
    area: '2,400 sqft (foundation)',
    spec: 'Standard',
    specColor: '#16A34A',
    materials: [
      { name: 'M20 Cement', qty: '68 bags', icon: '🧱' },
      { name: 'Fe500D TMT', qty: '0.9 MT', icon: '⚙️' },
      { name: 'PCC Concrete', qty: '42 cft', icon: '🔲' },
      { name: 'Back-fill Soil', qty: '480 cft', icon: '🪨' },
      { name: 'Anti-Termite', qty: '1,148 sqft', icon: '🛡️' },
    ],
  },
  {
    title: 'G+1 Duplex — Full Build',
    area: '2,400 sqft',
    spec: 'Standard',
    specColor: '#16A34A',
    materials: [
      { name: 'M20/M25 Cement', qty: '820 bags', icon: '🧱' },
      { name: 'Fe500D TMT Steel', qty: '7.4 MT', icon: '⚙️' },
      { name: 'Fly-ash Brick', qty: '32,000 Nos', icon: '🟫' },
      { name: 'Flooring Tiles', qty: '2,580 sqft', icon: '🔲' },
      { name: 'UPVC Windows', qty: '420 sqft', icon: '🪟' },
    ],
  },
  {
    title: 'Compound Wall (100 RM, 5ft height)',
    area: '100 running metres',
    spec: 'Basic',
    specColor: '#D97706',
    materials: [
      { name: 'Cement', qty: '42 bags', icon: '🧱' },
      { name: 'Fly-ash Brick', qty: '8,400 Nos', icon: '🟫' },
      { name: 'TMT Steel', qty: '180 kg', icon: '⚙️' },
      { name: 'PCC Base', qty: '28 cft', icon: '🔲' },
      { name: 'Plaster Sand', qty: '60 cft', icon: '⏳' },
    ],
  },
  {
    title: 'Bathroom Waterproofing (3 nos, 40 sqft each)',
    area: '120 sqft total',
    spec: 'Waterproofing',
    specColor: '#2563EB',
    materials: [
      { name: 'DR Fixit Primer', qty: '6 kg', icon: '🪣' },
      { name: 'Waterproofing Compound', qty: '18 kg', icon: '💧' },
      { name: 'Cement', qty: '4 bags', icon: '🧱' },
      { name: 'Fibre Mesh', qty: '120 sqft', icon: '🕸️' },
      { name: 'Tile Grout', qty: '3 kg', icon: '🔲' },
    ],
  },
];

const CATEGORIES = [
  { icon: '🧱', name: 'Cement & Concrete', desc: 'UltraTech, ACC, Dalmia, Ramco — OPC 53, PPC, PSC grades' },
  { icon: '⚙️', name: 'TMT Steel', desc: 'Fe415, Fe500D — Tata Tiscon, JSW, SAIL, Kamdhenu' },
  { icon: '🪨', name: 'Sand & Aggregates', desc: 'M-Sand, P-Sand, River Sand, 20mm & 40mm jelly' },
  { icon: '🟫', name: 'Bricks & Blocks', desc: 'Fly-ash brick, red brick, AAC blocks, hollow blocks' },
  { icon: '💧', name: 'Waterproofing', desc: 'Crystalline, membrane, polyurea, terrace surkhi' },
  { icon: '🔲', name: 'Flooring & Tiling', desc: 'Vitrified tiles, ceramic tiles, granite, kota stone' },
  { icon: '🪟', name: 'Doors & Windows', desc: 'Teak frames, UPVC windows, aluminium, PVC doors' },
  { icon: '⚡', name: 'MEP Materials', desc: 'Electrical conduits, wiring, CPVC/UPVC plumbing pipes' },
  { icon: '🎨', name: 'Finishing', desc: 'Paint, putty, primer — Asian Paints, Berger, Nerolac' },
];

const FAQS = [
  {
    q: 'How does the AI calculate material quantities?',
    a: 'The AI uses IS code-compliant mix design formulas (IS 456 for concrete, IS 2212 for brickwork) calibrated against Buildogram\'s database of completed Chennai projects. For concrete items, it uses M20/M25 mix designs with standard water-cement ratios. For masonry, it applies standard fly-ash brick sizes (230×115×75mm) with mortar wastage factors.',
  },
  {
    q: 'Are these procurement quantities or BOQ quantities?',
    a: 'These are procurement quantities — inclusive of standard wastage factors: 5–10% for cement, 3–5% for steel, 8–12% for bricks, and 10% for tiles. Always useful for planning material orders before approaching suppliers.',
  },
  {
    q: 'Can I use this to plan material purchases from vendors?',
    a: 'Yes. After getting your estimate, you can use Buildogram\'s material procurement service to source cement (Ultratech, ACC, Ramco), steel (Kamdhenu, JSPL, SAIL), and other items at negotiated wholesale rates with MTC-verified delivery.',
  },
  {
    q: 'Does it account for different IS grades of concrete and steel?',
    a: 'Yes. Select M20 or M25 concrete grade and Fe415/Fe500D steel grade to get grade-appropriate quantity estimates. For higher grade concrete (M30+) used in commercial buildings, our engineers can provide custom estimates.',
  },
  {
    q: 'How accurate are these estimates?',
    a: 'Typical accuracy is ±10–15% for standard residential builds in Chennai. Accuracy improves when you provide exact floor areas, specification level, and foundation type. For procurement planning, always allow a 10% buffer above the estimate.',
  },
];

export default function Page() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--secondary)',
          padding: '80px 0 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(252,110,32,0.12) 0%, transparent 65%)',
          }}
        />
        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link href="/ai-tools" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>AI Tools</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'white' }}>AI Material Estimator</span>
          </nav>

          <span
            style={{
              display: 'inline-block',
              background: 'rgba(252,110,32,0.15)',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 18px',
              borderRadius: '100px',
              border: '1px solid rgba(252,110,32,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '20px',
            }}
          >
            AI-Engineered Workflow · Updated July 2026
          </span>

          <h1
            style={{
              color: 'white',
              fontSize: 'clamp(30px, 4.5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '20px',
              maxWidth: '720px',
            }}
          >
            AI Material{' '}
            <span style={{ color: 'var(--primary)' }}>Requirement Estimator</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '18px',
              lineHeight: 1.75,
              maxWidth: '620px',
              marginBottom: '32px',
            }}
          >
            How many bags of cement do you need? How many MT of steel? Stop depending on your
            contractor for material quantities. Get an independent AI estimate — so you know
            exactly what to order and at what price.
          </p>

          {/* Stat badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { icon: '📦', text: '85+ material types' },
              { icon: '📈', text: 'IS code-calibrated formulas' },
              { icon: '💰', text: 'Current Chennai market rates (July 2026)' },
            ].map((s) => (
              <span
                key={s.text}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '100px',
                  padding: '8px 18px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                }}
              >
                {s.icon} {s.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOL ── */}
      <section style={{ background: '#F8FAFC', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '10px' }}>
              Estimate Your Material Requirements
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}>
              Enter your project details below and get a procurement-ready material estimate for your Chennai build.
            </p>
          </div>

          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '10px',
              padding: '14px 20px',
              marginBottom: '28px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              maxWidth: '760px',
              margin: '0 auto 28px',
            }}
          >
            <span style={{ fontSize: '16px' }}>⚠️</span>
            <p style={{ margin: 0, fontSize: '13px', color: '#78350F', lineHeight: 1.6 }}>
              Quantities include standard wastage factors. Always verify with your structural engineer and get supplier quotes before final procurement.
            </p>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              border: '1px solid #E2E8F0',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <MaterialEstimatorClient />
          </div>
        </div>
      </section>

      {/* ── EXAMPLES ── */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#FFF7ED',
                color: 'var(--primary)',
                fontSize: '12px',
                fontWeight: 700,
                padding: '5px 16px',
                borderRadius: '100px',
                marginBottom: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Sample Estimates
            </span>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: 'var(--secondary)' }}>
              Sample Material Estimates (AI-Generated, July 2026)
            </h2>
            <p style={{ color: '#64748B', maxWidth: '520px', margin: '12px auto 0', lineHeight: 1.7 }}>
              Reference estimates for common Chennai construction scenarios — inclusive of standard wastage factors.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {EXAMPLES.map((ex, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    background: 'var(--secondary)',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ color: 'white', fontSize: '15px', fontWeight: 700, margin: 0 }}>{ex.title}</h3>
                    <span
                      style={{
                        background: ex.specColor,
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '100px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {ex.spec}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', margin: 0 }}>{ex.area}</p>
                </div>
                <div style={{ padding: '20px' }}>
                  {ex.materials.map((m) => (
                    <div
                      key={m.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #F1F5F9',
                      }}
                    >
                      <span style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{m.icon}</span> {m.name}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>{m.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIAL CATEGORIES ── */}
      <section style={{ background: '#F8FAFC', padding: '72px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '12px', textAlign: 'center' }}>
            Material Categories We Cover
          </h2>
          <p style={{ color: '#64748B', textAlign: 'center', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Our estimator covers 85+ construction material types across all phases of a Chennai residential build.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                style={{
                  background: 'white',
                  borderRadius: '14px',
                  padding: '20px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontSize: '24px',
                    width: '44px',
                    height: '44px',
                    background: '#FFF7ED',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {cat.icon}
                </span>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{cat.name}</h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.5 }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ background: 'white', padding: '72px 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: 'var(--secondary)', marginBottom: '36px', textAlign: 'center' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '24px',
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid var(--primary)',
                }}
              >
                <p style={{ fontWeight: 700, color: 'var(--secondary)', margin: '0 0 10px', fontSize: '15px' }}>
                  Q: {faq.q}
                </p>
                <p style={{ color: '#374151', lineHeight: 1.75, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'var(--secondary)',
          padding: '64px 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 70% 50%, rgba(252,110,32,0.1) 0%, transparent 60%)',
          }}
        />
        <div className="container" style={{ position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Need Bulk Materials at Best Rates?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.7 }}>
            Use Buildogram's material procurement service to source verified cement, steel, sand, and bricks at wholesale rates with MTC documentation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/materials"
              style={{
                display: 'inline-block',
                background: 'var(--primary)',
                color: 'white',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '15px',
              }}
            >
              Browse Construction Materials →
            </Link>
            <Link
              href="/contact?type=materials"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: 700,
                padding: '14px 28px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '15px',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Request Material Quote
            </Link>
          </div>
        </div>
      </section>

      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'AI Tools', path: '/ai-tools' },
          { name: 'AI Material Requirement Estimator', path: '/ai-material-estimator' },
        ]}
      />
    </>
  );
}
