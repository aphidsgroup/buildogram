'use client';

import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Link from 'next/link';

export default function WhyVsMason() {
  const comparisonItems = [
    {
      title: 'Structural Design & Soil Audit',
      mason: '❌ No Soil SBC testing. Foundation size and depth are based on guesswork or visual estimate of neighboring plots. High risk of wall cracks and settling in clay soil.',
      buildogram: '✅ Mandatory Borehole Geotechnical Testing to determine soil Load-Bearing Capacity (SBC). Structural design customized for clay (under-reamed piles) or sand (raft foundation).'
    },
    {
      title: 'Reinforcement & Concrete Quality',
      mason: '❌ Steel rebar spacing and diameter sized by instinct. Stirrups tied incorrectly in key joints. Concrete poured and cured with saline groundwater, corroding steel in 3-5 years.',
      buildogram: '✅ Steel and concrete structural designs calculated by licensed structural engineers. Salinity checks block curing water TDS > 500 ppm, importing water if needed to protect rebar.'
    },
    {
      title: 'Pricing & Packages Capping',
      mason: '❌ Vague one-page per-sqft quote. Once construction kicks off, extra charges are demanded for basic components like excavations, sumps, and compound walls.',
      buildogram: '✅ Capped contract based on a line-item Bill of Quantities (BOQ). Every cement bag, brick, and tile size is detailed with a locked unit rate. Zero hidden price escalations.'
    },
    {
      title: 'Payment Terms & Escrow Shield',
      mason: '❌ Advanced payments demanded upfront before work is done. Client loses leverage if the mason slows down or leaves the project.',
      buildogram: '✅ Milestone-linked Escrow model. Client deposits phase funds into escrow, released to the contractor only after our independent QC engineers verify the work is snag-free.'
    },
    {
      title: 'Quality Inspections & Snagging',
      mason: '❌ Inspections are visual and non-technical. Finishing snags, plaster lines, and plumbing pressures are unchecked.',
      buildogram: '✅ 18-point checks at every milestone by independent site inspectors. Snags are pinned to digital layouts on the app and resolved before stage clearance.'
    },
    {
      title: 'Long-Term Structural Warranties',
      mason: '❌ No structural warranty. Mason is unreachable if a leak occurs or plaster cracks years after handover.',
      buildogram: '✅ 10-Year Stamp-bound Structural Warranty, 1-year full-property leakage warranty, and direct manufacturer brand warranties.'
    }
  ];

  return ( <>
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Risk Education</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Buildogram vs. Local Masons — Why Engineering Oversight Saves Your Home</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Building without independent structural oversight is a financial and structural gamble. Compare the risks of direct-labour builds against Buildogram's mediated, engineer-verified protection model.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="/contact" className="btn btn-primary btn-lg">Get Free Plan Audit</a>
            <a href="/how-it-works" className="btn btn-lg btn-outline-light">How We Mediate</a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

          {/* DENSE RISK HIGHLIGHT CARDS */}
          <div className="grid-3 mb-8 animate-fade-in">
            <div className="card" style={{ background: 'rgba(220, 38, 38, 0.02)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>☠️</div>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>Saline Water Curing Damage</h3>
              <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>
                Unchecked masonry teams in Chennai routinely cure structural concrete columns using saline borewell water. The salts eat away at the internal steel rebar, causing it to rust, expand, and spall concrete within 3 to 5 years.
              </p>
            </div>
            <div className="card" style={{ background: 'rgba(220, 38, 38, 0.02)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>📉</div>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>Foundation Settling Cracks</h3>
              <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>
                Clayey black cotton soils in Velachery or Madipakkam swell and contract drastically. Masons who build shallow strip footings without conducting soil load tests risk foundation displacement, causing major cracks.
              </p>
            </div>
            <div className="card" style={{ background: 'rgba(220, 38, 38, 0.02)', borderColor: 'rgba(220, 38, 38, 0.15)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>💸</div>
              <h3 style={{ fontSize: '18px', color: '#b91c1c', marginBottom: '10px' }}>The "Per-Sq.Ft" Advance Trap</h3>
              <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>
                Local contractors bid low flat-sqft rates to win projects. Once they secure a large advance payment, work slows down, and they demand extra funds to complete basic structural slabs, leaving you with little leverage.
              </p>
            </div>
          </div>

          {/* DENSE COMPARISON TABLE */}
          <div className="card mb-8 animate-fade-in" style={{ padding: '36px' }}>
            <h2 className="mb-6" style={{ fontSize: '24px', color: 'var(--primary-dark)', textAlign: 'center' }}>Comparison: Local Masons vs. Buildogram</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {comparisonItems.map(item => (
                <div key={item.title} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', color: 'var(--primary-dark)', marginBottom: '12px', fontWeight: '700' }}>{item.title}</h3>
                  <div className="grid-2" style={{ gap: '20px' }}>
                    <div style={{ padding: '12px', background: 'rgba(220, 38, 38, 0.02)', borderRadius: '6px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text)' }}>
                      {item.mason}
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(15, 118, 110, 0.02)', borderRadius: '6px', fontSize: '13px', lineHeight: '1.6', color: 'var(--text)' }}>
                      {item.buildogram}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRANSIT CALL TO ACTION */}
          <div className="card text-center mb-8 animate-fade-in" style={{ padding: '40px', background: 'var(--gradient-dark)', color: 'white', border: 'none' }}>
            <h3 style={{ fontSize: '28px', color: 'white', marginBottom: '12px' }}>Already have a plan or quote from a local builder?</h3>
            <p className="text-muted mb-6" style={{ color: 'rgba(255,255,255,0.7) !important', maxWidth: '600px', margin: '12px auto' }}>
              Upload your plans, and our engineering team will provide a free preliminary structural risk and FSI setback audit.
            </p>
            <div className="flex-center gap-4">
              <Link href="/contact" className="btn btn-primary" style={{ background: 'var(--accent)' }}>
                Request Free Plan Audit
              </Link>
              <Link href="/how-it-works" className="btn btn-outline" style={{ color: 'white !important', borderColor: 'white !important' }}>
                See How We Mediate
              </Link>
            </div>
          </div>
      </div>
    </>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Structural Design & Soil Audit","path":"/why-vs-mason"}]} />
    </>
  );
}
