import Link from 'next/link';
import BOQAuditForm from './BOQAuditForm';

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
    <>
      {/* ── Hero ── */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '40px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 20%, rgba(204,255,0,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/build" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Build</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: '#CCFF00', fontSize: '14px' }}>BOQ Audit</span>
          </div>
          <div style={{ maxWidth: '720px' }}>
            {/* Alert pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.35)', borderRadius: '999px', padding: '6px 18px', marginBottom: '28px' }}>
              <span style={{ fontSize: '14px' }}>⚠️</span>
              <span style={{ color: '#fca5a5', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>MOST CONTRACTOR QUOTES HIDE ₹5–20 LAKHS IN EXTRAS</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 58px)', lineHeight: 1.08, marginBottom: '24px' }}>
              Get Your Contractor<br />
              <span style={{ color: '#CCFF00' }}>Quote Audited.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '18px', lineHeight: 1.75, marginBottom: '40px' }}>
              Before you sign anything — let Buildogram engineers check every line item, rate and spec in your contractor's quote. We expose what's inflated, what's missing, and what's non-negotiable.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="#audit-form" className="btn btn-primary btn-lg">Get Free BOQ Audit</Link>
              <Link href="/cost-estimator" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>Calculate True Cost</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: '#CCFF00', padding: '26px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[['₹5–20L', 'Avg hidden charges found'], ['8+', 'Audit categories'], ['48hrs', 'Report turnaround'], ['Free', 'Initial audit consult']].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 800, color: '#292929' }}>{n}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#292929', opacity: 0.7 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hidden costs table ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="tag">The Real Problem</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px', marginBottom: '16px' }}>
              Where contractors hide your money
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '560px', margin: '0 auto' }}>
              These are the most common "extras" that appear after you sign a per-sq.ft contract.
            </p>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#292929' }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hidden Cost Item</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right', color: '#CCFF00', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Typical Impact</th>
                </tr>
              </thead>
              <tbody>
                {HIDDEN_COSTS.map((row, i) => (
                  <tr key={row.item} style={{ borderBottom: i < HIDDEN_COSTS.length - 1 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                    <td style={{ padding: '14px 20px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#dc2626', fontWeight: 800 }}>×</span> {row.item}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 800, color: '#dc2626', fontSize: '15px', fontFamily: 'Space Grotesk, sans-serif' }}>{row.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px', marginTop: '16px' }}>
            * Based on Buildogram's analysis of 100+ contractor quotes in Chennai & Tamil Nadu
          </p>
        </div>
      </section>

      {/* ── What we audit ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">What We Check</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px' }}>8 critical areas we audit in your quote</h2>
          </div>
          <div className="grid-2" style={{ gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {WHAT_WE_CHECK.map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '18px', padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', background: '#f9f9f9' }}>
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

      {/* ── Process ── */}
      <section className="section" style={{ background: '#F9F9F9' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="tag">How It Works</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginTop: '16px' }}>4-step BOQ Audit process</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PROCESS.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < PROCESS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--secondary)', color: '#CCFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>
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

      {/* ── Proof pill ── */}
      <section style={{ background: 'var(--secondary)', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '🏗️', text: 'If we find <₹1L in savings — audit is free' },
              { icon: '📊', text: 'Detailed line-by-line audit report' },
              { icon: '🤝', text: 'Optional negotiation support included' },
              { icon: '⚡', text: '48-hour turnaround on first review' },
            ].map(p => (
              <div key={p.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>{p.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: 600 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Form ── */}
      <section id="audit-form" className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ maxWidth: '660px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
              Request Your Free BOQ Audit
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', lineHeight: 1.65 }}>
              Share your contractor quote (even a verbal one). Our engineers will review it and identify every discrepancy before you sign.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '40px' }}>
            <BOQAuditForm />
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '16px' }}>
            Or call us directly: <a href="tel:+919000000000" style={{ color: 'rgba(255,255,255,0.6)' }}>+91 90000 00000</a>
          </p>
          <div style={{ marginTop: '24px', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: 1.5 }}>
            <strong>Disclaimer:</strong> This BOQ review is advisory and based on provided documents. It is not engineering, legal, contractual, or construction certification.
          </div>
        </div>
      </section>
    </>
  );
}
