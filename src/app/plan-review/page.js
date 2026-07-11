import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Architectural Plan Review in Chennai | Structural Safety Check | Buildogram',
  description: 'Get your floor plans reviewed by certified structural engineers in Chennai. Spatial flow, vastu, ventilation, IS code compliance and structural grid analysis.',
  path: '/plan-review',
});

const REVIEW_ITEMS = [
  {
    icon: '📐',
    title: 'Structural Grid Logic',
    desc: 'We evaluate column placement relative to load paths, beam spans against IS 456 span-to-depth ratios, shear wall positioning for lateral stability, and cantilever extents. A misplaced column on an architectural drawing can require expensive mid-construction corrections.',
  },
  {
    icon: '📏',
    title: 'FSI & CMDA Compliance',
    desc: 'Floor Area Ratio calculations, built-up area tallies, setback compliance across all four sides, height restriction checks against zone classification, and parking provision per CMDA norms. Violations discovered post-approval result in demolition orders.',
  },
  {
    icon: '🚪',
    title: 'Spatial Flow & Furniture Fit',
    desc: 'Dead-end corridors, furniture clearance checks (IS 962 recommends minimum 750mm circulation), door swing conflicts with adjacent fixtures, passage width adequacy for accessibility, and bedroom furniture fit simulations to ensure rooms are actually liveable.',
  },
  {
    icon: '🌬️',
    title: 'Ventilation & Natural Light',
    desc: 'Window-to-floor area ratio checks (NBC recommends minimum 1:10), cross-ventilation path analysis, solar orientation assessment to minimize western glare, kitchen exhaust feasibility, and internal toilet ventilation via duct or window.',
  },
  {
    icon: '🏛️',
    title: 'Vastu Basics',
    desc: 'We flag major vastu conflicts that also have functional implications — east-facing entrances for morning light, kitchen placement relative to plumbing risers, pooja room positioning, master bedroom orientation. We do not impose vastu but flag deviations clients typically care about.',
  },
  {
    icon: '🔧',
    title: 'MEP Routing Feasibility',
    desc: 'Plumbing riser coordination against structural columns, soil pipe slope feasibility (minimum 1:40 for 100mm dia), electrical distribution panel placement relative to load centres, AC ledge viability vs. beam positions, and underground sump routing.',
  },
];

const COMMON_ERRORS = [
  'Missing structural columns below transfer beams or at beam intersections',
  'Inadequate toilet duct height preventing sloped pipe runs to the riser',
  'Staircase headroom below 2.0m at mid-flight — a common NBC violation',
  'Door swing conflicts with adjacent sanitary fixtures or walls',
  'Bedrooms or kitchens with no direct external window — ventilation deficiency',
  'Kitchen located without an accessible exhaust route to the exterior',
  'Cantilever slabs exceeding 1.5m without accounting for deflection or counterweight',
  'Ground floor plinth height below flood zone minimums for the area',
];

const STEPS = [
  {
    step: '01',
    title: 'Upload Your Plans',
    desc: 'Share your architectural drawings as PDFs or DWG files via our secure upload portal or WhatsApp. Preliminary sketches are also acceptable — we flag issues at any stage.',
  },
  {
    step: '02',
    title: 'Engineer Analysis (3–5 Days)',
    desc: 'A senior structural engineer and an architectural reviewer independently assess the plans across all six review dimensions. Conflicts are logged with drawing reference coordinates.',
  },
  {
    step: '03',
    title: 'Marked-up Report Delivered',
    desc: 'You receive an annotated PDF with every issue marked on the drawing, plus a written report listing severity (critical / advisory / suggestion) and recommended corrections.',
  },
  {
    step: '04',
    title: 'Optional Review Call',
    desc: 'A 30-minute call with the reviewing engineer to walk through findings, answer questions, and clarify how to implement corrections with your architect.',
  },
];

const FAQS = [
  {
    question: 'Can you review plans that were already approved by CMDA?',
    answer: 'Yes. CMDA approval confirms layout compliance but does not include structural grid analysis, MEP routing, or spatial quality review. We frequently review CMDA-approved drawings and find issues that will surface only during construction — such as missing columns, inadequate staircase headroom, or impractical toilet configurations.',
  },
  {
    question: 'What file formats do you accept for plan review?',
    answer: 'We accept PDF (preferred), AutoCAD DWG/DXF, and high-resolution scanned drawings (minimum 150 DPI). For hand-sketched plans, we will advise on minimum information required before review can begin. All files are handled with strict confidentiality.',
  },
  {
    question: 'Do you coordinate with my architect after the review?',
    answer: 'Yes, on request. We can share findings directly with your architect or structural consultant. Many clients find a three-way call between the homeowner, architect, and our reviewing engineer is the most efficient way to resolve complex issues like structural grid conflicts or MEP routing problems.',
  },
  {
    question: 'How is this different from a structural engineer certifying the plan?',
    answer: 'A structural engineer certifies that the structural design meets IS 456 requirements — this is a code-compliance stamp. Our plan review is a quality and practicality check: do the spaces work, are there spatial or ventilation errors, are MEP routes feasible? Both are important, and our review often precedes structural certification as an early catch mechanism.',
  },
  {
    question: 'What happens if critical errors are found in my plan?',
    answer: 'We classify errors as Critical (must be corrected before construction), Advisory (should be corrected, risk of functional issue if not), and Suggestion (quality improvement). Critical items are highlighted with drawing mark-ups and a written explanation. We do not stop your project — we equip you to make an informed decision with full technical context.',
  },
];

export default function PlanReviewPage() {
  return (
    <main>
      {/* HERO */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Plan Review</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Get Your Floor Plans Reviewed by Structural Engineers
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Most architectural errors are invisible until construction is halfway done. Our engineers catch spatial, structural, and compliance issues before a single brick is laid.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=plan-review" className="btn btn-primary btn-lg">Submit Plans for Review</Link>
            <a href="#what-we-review" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>What We Check</a>
          </div>
        </div>
      </section>

      {/* WHAT WE REVIEW */}
      <section id="what-we-review" className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--secondary)', marginBottom: '12px' }}>What We Review</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '560px', margin: '0 auto' }}>
              Six parallel review tracks, each assessing a different dimension of plan quality — structural, regulatory, spatial, environmental, cultural, and technical.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {REVIEW_ITEMS.map((item) => (
              <div key={item.title} className="card" style={{ padding: '28px' }}>
                <div style={{ fontSize: '32px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON ERRORS */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'white', marginBottom: '16px' }}>Common Errors We Find</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px' }}>
                These are recurring issues identified across Buildogram plan reviews. Most architects miss them — not from incompetence, but because they are reviewing for aesthetics, not construction practicality.
              </p>
              <Link href="/contact?type=plan-review" className="btn btn-primary">Submit Your Plans</Link>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {COMMON_ERRORS.map((err, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', padding: '14px 16px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '16px', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>⚠</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.55 }}>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="section" style={{ background: 'var(--bg-card2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--secondary)', marginBottom: '12px' }}>What You Receive</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '520px', margin: '0 auto' }}>
              A complete, actionable deliverable — not a generic checklist.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { icon: '📄', title: 'Annotated Drawing PDF', desc: 'Every issue marked directly on your floor plan with numbered callouts linked to the written report.' },
              { icon: '📝', title: 'Written Findings Report', desc: 'Issues classified as Critical, Advisory, or Suggestion — with IS code or NBC reference where applicable.' },
              { icon: '🔄', title: 'Revision Recommendations', desc: 'Specific corrective guidance for each issue — not just "fix this" but "move this column 450mm south and add a beam at grid D".' },
            ].map((item) => (
              <div key={item.title} className="card" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--secondary)', marginBottom: '12px' }}>Review Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', position: 'relative' }}>
            {STEPS.map((s, i) => (
              <div key={s.step} style={{ position: 'relative', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ width: '56px', height: '56px', background: 'var(--gradient-orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '18px', fontWeight: 800, color: 'white' }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: 'var(--bg-card2)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)', marginBottom: '32px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <FAQBlock faqs={FAQS} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'var(--gradient-orange)', padding: '56px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 36px)', marginBottom: '12px' }}>Upload Your Plans Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', maxWidth: '520px', margin: '0 auto 28px' }}>
            A plan review costs a fraction of fixing a structural error mid-construction. Catch problems on paper, not on site.
          </p>
          <Link href="/contact?type=plan-review" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>
            Submit Plans for Review
          </Link>
        </div>
      </section>

      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Plan Review', href: '/plan-review' }]} />
    </main>
  );
}
