import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Verified Architects in Chennai | COA-Registered Design Partners | Buildogram',
  description: 'Find COA-registered architects in Chennai with CMDA plan approval experience. Buildogram verifies Council of Architecture registration, portfolio, and structural collaboration.',
  path: '/partners/architects',
});

const CRITERIA = [
  { icon: '🏛️', title: 'COA Registration', desc: 'Valid Council of Architecture India (COA) registration number. Only registered architects may prepare and submit CMDA plans under the Architects Act, 1972.' },
  { icon: '📋', title: 'CMDA/DTCP Experience', desc: 'Proven track record of submitting and obtaining CMDA plan approvals in Chennai. We verify copies of past approval orders from clients.' },
  { icon: '🖼️', title: 'Portfolio Review', desc: 'Minimum 5 completed residential or commercial projects reviewed by our team. We assess spatial quality, compliance accuracy, and client satisfaction.' },
  { icon: '🤝', title: 'Structural Engineer Collaboration', desc: 'Must have an established working relationship with a licensed structural engineer. Architectural plans submitted for CMDA require structural engineer sign-off on load-bearing elements.' },
];

const APPROVAL_STEPS = [
  { step: '1', title: 'Submit Drawings to CMDA/DTCP', desc: 'Architect submits site plan, floor plans, elevations, and sections with land title documents' },
  { step: '2', title: 'DPC Scrutiny', desc: 'Development Planning Cell verifies FSI, setbacks, parking, and zonal compliance' },
  { step: '3', title: 'Technical Scrutiny', desc: 'Structural and service compliance checked; structural engineer sign-off required for G+1 and above' },
  { step: '4', title: 'Approval Order Issued', desc: 'Once cleared, CMDA issues an approval order with specific conditions; construction may begin' },
];

const FEE_GUIDE = [
  { package: 'Basic', range: '2–3% of project cost', scope: 'Floor plans + elevation drawings only' },
  { package: 'Standard', range: '4–6% of project cost', scope: 'Full architectural set + CMDA submission + 3D views' },
  { package: 'Full Service', range: '6–8% of project cost', scope: 'All above + site supervision + as-built drawings' },
];

export default function ArchitectsPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Directory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Architects in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>COA-registered architects with CMDA plan approval experience and structural engineer collaboration — vetted by our engineering team.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/join-as-partner" className="btn btn-primary btn-lg">Join as an Architect</Link>
            <Link href="/contact?type=partner-match" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Find an Architect</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Architect Verification Criteria</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {CRITERIA.map(c => (
              <div key={c.title} className="card" style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '32px' }}>The CMDA Approval Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {APPROVAL_STEPS.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingBottom: i < APPROVAL_STEPS.length - 1 ? '24px' : 0, borderLeft: i < APPROVAL_STEPS.length - 1 ? '2px solid rgba(252,110,32,0.3)' : '2px solid transparent', marginLeft: '18px', paddingLeft: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-12px', top: 0, width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(252,110,32,0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(252,110,32,0.15)' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}><strong style={{ color: 'var(--primary)' }}>Timeline:</strong> CMDA approvals in Chennai typically take 3–6 months from submission. Incomplete drawings or zonal violations are the most common causes of rejection and delay.</p>
          </div>
        </section>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Architect Fee Guide (Indicative)</h2>
          <div className="grid-3" style={{ gap: '16px' }}>
            {FEE_GUIDE.map(f => (
              <div key={f.package} className="card" style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '8px' }}>{f.package}</h3>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px' }}>{f.range}</div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.scope}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', fontStyle: 'italic' }}>* Fees are indicative and vary by project size, location, and complexity. Always get a written fee agreement before starting work.</p>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Find an Architect</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>We match you with a COA-registered, CMDA-experienced architect for your project type.</p>
            <Link href="/contact?type=partner-match" className="btn btn-primary">Find My Architect</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🏛️</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Are You an Architect?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Join our partner network and receive qualified project leads from Buildogram clients.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Architects', path: '/partners/architects' }]} />
    </>
  );
}
