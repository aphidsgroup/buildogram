'use client';
import Link from 'next/link';

export default function WhyVsAggregators() {
  const comparisonList = [
    {
      title: 'Primary Business Model',
      aggregator: '❌ Lead-Generation Engine: Matches you with a builder, takes a heavy commission (10%-15%) from the contractor, forcing them to cut material and labor corners to survive.',
      buildogram: '✅ Independent PMC & Mediator: We charge a transparent, flat engineering management fee. We do not take contractor kickbacks, aligning our interests with you.'
    },
    {
      title: 'Structural & Contractual Liability',
      aggregator: '❌ Direct client-to-contractor contract. Aggregator terms of service disclaim structural liability if the builder goes bankrupt or executes poor work.',
      buildogram: '✅ Legally-binding Tripartite Agreement signed by You, the Contractor, and Buildogram. We take single-point responsibility for delivery and structural compliance.'
    },
    {
      title: 'Pricing & Sourcing Transparency',
      aggregator: '❌ Vague packaged pricing per-sqft. Material markup rates are hidden, and you cannot audit concrete cubes or steel delivery reconciliations.',
      buildogram: '✅ Granular, itemized Bill of Quantities (BOQ). Sourced raw materials have open-book pricing matching Mannady/Broadway wholesale rates. Zero material markups.'
    },
    {
      title: 'Quality Inspections & Expertise',
      aggregator: '❌ Site visits conducted by general coordinators using basic templates. They do not monitor local Chennai risks like groundwater salinity or soil strata changes.',
      buildogram: '✅ Onsite engineering audits managed by structural specialists. Mandatory concrete cover spacing checks, concrete slump testing, and curing water TDS audits.'
    },
    {
      title: 'Payment Security',
      aggregator: '❌ Client pays contractors via the aggregator platform in large advances. Disputed stages are difficult to recover once advances are disbursed.',
      buildogram: '✅ Secure Milestone-Linked Escrow system. Funds are released to the builder only after independent site engineer verification and client digital sign-off.'
    }
  ];

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(255,218,1,0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,218,1,0.12)', border: '1px solid rgba(255,218,1,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ color: '#FFDA01', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Market Comparison</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Buildogram vs. Corporate Aggregators — The Accountability Gap</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>We are not a passive lead directory. We are your legally accountable construction mediator — with a Tripartite Agreement, milestone escrow, and open-book materials pricing.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg">Consult Our Engineers</a>
            <a href="/how-it-works" className="btn btn-lg" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', background: 'transparent' }}>How Escrow Works</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

          {/* HIGHLIGHT BLOCK: THE CONTRACT GAP */}
          <div className="card mb-8 animate-fade-in" style={{ background: 'var(--bg-card2)', borderLeft: '6px solid var(--accent)' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: '32px' }}>
              <div>
                <span className="badge badge-orange mb-3">Critical Risk Education</span>
                <h2 style={{ fontSize: '26px', color: 'var(--primary-dark)', marginBottom: '16px' }}>The Structural Liability Gap</h2>
                <p className="text-muted text-sm mb-4" style={{ lineHeight: '1.7' }}>
                  If you read the fine print in a standard corporate aggregator contract, they protect themselves by stating they are merely "technology platforms matches." The legal construction contract is signed directly between you and the subcontractor.
                </p>
                <p className="text-muted text-sm mb-4" style={{ lineHeight: '1.7' }}>
                  If the foundation settles, walls crack, or the builder stops work due to thin margins (caused by the aggregator's heavy commissions), the aggregator is not legally liable to finish your home.
                </p>
                <strong style={{ color: 'var(--primary-dark)', fontSize: '14px' }}>
                  Buildogram signs the Tripartite Agreement as a co-signatory. We accept liability for structural design and QC approvals, guaranteeing project completion.
                </strong>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: 'var(--shadow)' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--primary-dark)', marginBottom: '12px' }}>Buildogram Mediation Model</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <span className="badge badge-blue">✓ Legally Accountable Mediator</span>
                    <span className="badge badge-green">✓ Milestone Escrow System</span>
                    <span className="badge badge-green">✓ Open-Book Wholesale Materials</span>
                    <span className="badge badge-blue">✓ Dedicated Structural Engineers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DENSE COMPARISON TABLE */}
          <div className="card mb-8 animate-fade-in" style={{ padding: '36px' }}>
            <h2 className="mb-6" style={{ fontSize: '24px', color: 'var(--primary-dark)', textAlign: 'center' }}>Tripartite Mediation vs. Lead Aggregators</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {comparisonList.map(item => (
                <div key={item.title} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary-dark)', marginBottom: '12px', fontWeight: '700' }}>{item.title}</h3>
                  <div className="grid-2" style={{ gap: '20px' }}>
                    <div style={{ padding: '12px', background: 'rgba(249, 115, 22, 0.02)', borderRadius: '6px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text)' }}>
                      <strong>Corporate Aggregators:</strong><br />
                      {item.aggregator}
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(15, 118, 110, 0.02)', borderRadius: '6px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text)' }}>
                      <strong>Buildogram Mediator:</strong><br />
                      {item.buildogram}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CALL TO ACTION */}
          <div className="card text-center mb-8 animate-fade-in" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
            <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Review Our Legal Framework</h3>
            <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
              Want to see our legal terms? Read our sample Tripartite Escrow Agreement and see how your investment is fully protected.
            </p>
            <div className="flex-center gap-4">
              <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>
                Consult with our Founders
              </Link>
              <Link href="/how-it-works" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>
                How Escrow Works
              </Link>
            </div>
          </div>
      </div>
    </>
  );
}
