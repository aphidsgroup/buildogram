import Link from 'next/link';
import PlanReviewForm from './PlanReviewForm';

export const metadata = {
  title: 'Architectural Plan & Structural Review — Buildogram Chennai',
  description: 'Get your floor plan and architectural drawings reviewed by structural engineers before construction. Identify structural risks, optimise column placement and ensure CMDA code compliance.',
};

const WHAT_WE_REVIEW = [
  { icon: '🏗️', title: 'Structural Safety Check', desc: 'Column grid, beam sizing, slab span — we check if your structure is over or under-designed for the soil type and load.' },
  { icon: '🪨', title: 'Foundation Type Validation', desc: 'Isolated footing vs raft vs pile — we recommend the right foundation based on your plot\'s SBC (soil bearing capacity).' },
  { icon: '📐', title: 'Column Placement Optimisation', desc: 'Columns placed wrong are expensive to fix. We verify your architect\'s column grid against structural norms.' },
  { icon: '🚿', title: 'Service Shaft Planning', desc: 'Plumbing, electrical, AC, and ventilation shafts reviewed for practical execution and maintainability.' },
  { icon: '🪟', title: 'Opening Sizes & Lintels', desc: 'Window and door opening widths, lintel spans and beam continuity — all checked against IS code standards.' },
  { icon: '🌊', title: 'Waterproofing Risk Points', desc: 'We identify architectural features that create water accumulation risk — flat roofs, parapets, sunken slabs.' },
  { icon: '📏', title: 'CMDA / GCC Compliance', desc: 'Setbacks, FSI, height restrictions, approved plan verification — we ensure your design is municipality-compliant.' },
  { icon: '🧭', title: 'Vastu Orientation (Optional)', desc: 'Optional Vastu review of room placement, entry orientation, kitchen/pooja positions if needed.' },
];

const DELIVERABLES = [
  { icon: '📄', title: 'Structural Review Report', desc: 'Written report with every finding, risk level (low/medium/high) and recommended fix.' },
  { icon: '✏️', title: 'Marked-Up Drawing', desc: 'Your floor plan returned with annotations highlighting specific issues and corrections.' },
  { icon: '📞', title: 'Engineer Consultation Call', desc: '30-minute call with the reviewing engineer to walk through findings and answer questions.' },
  { icon: '📊', title: 'BOQ Impact Estimate', desc: 'Where structural changes affect cost, we give you an estimate so you can plan your budget.' },
];

const PROCESS = [
  { step: '01', title: 'Submit Your Plans', desc: 'Share your architectural drawings (PDF, DWG or even photos). We accept work-in-progress plans too.' },
  { step: '02', title: 'Structural Engineer Review', desc: 'Our engineers analyse the plan against IS codes, Chennai soil conditions and structural best practices.' },
  { step: '03', title: 'Annotated Report', desc: 'You receive a marked-up drawing and written report within 3 working days.' },
  { step: '04', title: 'Revision Support', desc: 'We coordinate with your architect for revisions, or recommend corrections for self-implementation.' },
];

export default function PlanReviewPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(255,218,1,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/build" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Build</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: '#FFDA01', fontSize: '14px' }}>Plan Review</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.1)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '28px' }}>
                <span style={{ color: '#FFDA01', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Expert Structural Review</span>
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(30px, 4.5vw, 54px)', lineHeight: 1.1, marginBottom: '24px' }}>
                Review Your Plans<br />
                <span style={{ color: '#FFDA01' }}>Before You Break Ground.</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '18px', lineHeight: 1.75, marginBottom: '36px' }}>
                A structural mistake caught on paper costs ₹0. The same mistake caught on site costs ₹5–50 lakhs. Our engineers review your floor plan and flag every risk before construction starts.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="#review-form" className="btn btn-primary btn-lg">Request Plan Review</Link>
                <Link href="/boq-audit" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>BOQ Audit Instead?</Link>
              </div>
            </div>
            {/* Right: deliverables preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {DELIVERABLES.map(d => (
                <div key={d.title} style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px 20px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '26px', flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{d.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.5 }}>{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: '#FFDA01', padding: '26px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[['8+', 'Review categories'], ['3 days', 'Report turnaround'], ['IS Code', 'Compliant review'], ['₹0', 'Mistake on paper costs']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 800, color: '#292929' }}>{n}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#292929', opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What we review ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">Scope of Review</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px' }}>8 things we check in your plan</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '16px auto 0', fontSize: '17px' }}>
              Our engineers go beyond aesthetics. Every review is structural-first.
            </p>
          </div>
          <div className="grid-2" style={{ gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {WHAT_WE_REVIEW.map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '18px', padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', background: 'white' }}>
                <div style={{ fontSize: '32px', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px', color: '#292929' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why review before construction ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <span className="tag">Why It Matters</span>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', marginTop: '16px', marginBottom: '20px' }}>
                Mistakes on paper are free. On site, they're not.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.75, marginBottom: '24px' }}>
                Most homeowners only realise a structural problem exists when the contractor asks for ₹3–10 lakhs extra to "fix the foundation" or "redo the column". By then, it's too late to negotiate.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.75 }}>
                A pre-construction plan review gives you the power to fix every issue on paper — before a single bag of cement is mixed.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { stage: 'On Paper', cost: '₹0', color: '#059669', bg: '#ecfdf5' },
                { stage: 'During Foundation', cost: '₹1–5 lakhs', color: '#d97706', bg: '#fffbeb' },
                { stage: 'After Slab Cast', cost: '₹5–20 lakhs', color: '#dc2626', bg: '#fef2f2' },
                { stage: 'After Completion', cost: '₹10–50 lakhs', color: '#7c3aed', bg: '#faf5ff' },
              ].map(r => (
                <div key={r.stage} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: r.bg, borderRadius: '12px', border: `1px solid ${r.color}22` }}>
                  <span style={{ fontWeight: 700, fontSize: '15px', color: r.color }}>Fixing at: {r.stage}</span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '18px', color: r.color }}>{r.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">The Process</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px' }}>How plan review works</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROCESS.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < PROCESS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary)', color: '#FFDA01', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>
                  {s.step}
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-sell bar ── */}
      <section style={{ background: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>Already have a contractor quote?</span>
          <Link href="/boq-audit" className="btn btn-outline">📊 Get BOQ Audit Instead →</Link>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>Ready to build?</span>
          <Link href="/build" className="btn btn-outline">🏗️ Start Construction →</Link>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="review-form" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '660px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
              Request Your Plan Review
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', lineHeight: 1.65 }}>
              Share your plot details and plan stage. We'll schedule a review with one of our structural engineers.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <PlanReviewForm />
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '16px' }}>
            Or call us directly: <a href="tel:+919000000000" style={{ color: 'rgba(255,255,255,0.6)' }}>+91 90000 00000</a>
          </p>
        </div>
      </section>
    </>
  );
}
