import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Verified Builders in Chennai | Engineer-Approved Construction Partners | Buildogram',
  description: 'Find RERA-registered, engineer-approved builders in Chennai. Buildogram verifies past projects, structural compliance, and warranty documentation before listing any builder.',
  path: '/partners/builders',
});

const CRITERIA = [
  { icon: '📜', title: 'RERA Registration', desc: 'Every builder we list must be registered under TNRERA (Tamil Nadu Real Estate Regulatory Authority). This protects you from unregistered fly-by-night operators.' },
  { icon: '🏗️', title: 'Minimum 3 Completed Projects', desc: 'We inspect at least 3 completed projects — checking structural quality, material brands used, and client satisfaction before approving a builder.' },
  { icon: '👷', title: 'Structural Engineer Tie-Up', desc: 'Builders must have a licensed structural engineer on their team or as a retained consultant. We verify credentials and check that design drawings are stamped by a registered engineer.' },
  { icon: '🔒', title: 'Warranty Documentation', desc: 'We require builders to confirm their workmanship and structural warranty terms in writing. Warranty obligations are governed by the signed contract between the property owner and the appointed builder — Buildogram verifies and records this documentation.' },
];

const WHEN_TO_HIRE = [
  { scenario: 'Building a new G+1 or G+2 residential house', builder: true, contractor: false },
  { scenario: 'Complete design + construction responsibility needed', builder: true, contractor: false },
  { scenario: 'Need a single point of accountability', builder: true, contractor: false },
  { scenario: 'Civil execution only (design ready)', builder: false, contractor: true },
  { scenario: 'MEP works (electrical, plumbing, HVAC)', builder: false, contractor: true },
  { scenario: 'Renovation or partial works', builder: false, contractor: true },
];

const QUESTIONS = [
  'Is your company TNRERA registered? What is your registration number?',
  'Can you show me 3 completed projects I can visit or talk to past clients about?',
  'Who is your structural engineer? Can you share their CoE registration?',
  'Will you provide an itemized BOQ or only a per-sqft quote?',
  'What is your concrete grade specification for columns and slabs?',
  'What structural and workmanship warranties do you offer in writing?',
];

export default function BuildersPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Directory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Builders in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>
            Every builder in our network is RERA-registered and has been vetted by our engineers. No unverified listings, no fake reviews — just builders who have proven their quality.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/join-as-partner" className="btn btn-primary btn-lg">Join as a Builder</Link>
            <Link href="/contact?type=partner-match" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Find a Builder for My Project</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Verification Criteria */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Our Vetting Process</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>What Makes a Buildogram-Verified Builder?</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '15px' }}>We check every builder against 4 non-negotiable criteria before they can appear in our directory.</p>
          </div>
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

        {/* Builder vs Contractor */}
        <section style={{ marginBottom: '64px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Builder vs Contractor — Which Do You Need?</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Scenario</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Hire a Builder</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Hire a Contractor</th>
                </tr>
              </thead>
              <tbody>
                {WHEN_TO_HIRE.map((row, i) => (
                  <tr key={row.scenario} style={{ background: i % 2 === 0 ? 'white' : 'var(--bg-card2)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{row.scenario}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: row.builder ? 'var(--success)' : 'var(--border-solid)', fontSize: '18px' }}>{row.builder ? '✓' : '—'}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: row.contractor ? 'var(--success)' : 'var(--border-solid)', fontSize: '18px' }}>{row.contractor ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Questions to Ask */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '20px' }}>6 Questions to Ask Every Builder Before Signing</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {QUESTIONS.map((q, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 20px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>{i + 1}</span>
                <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dual CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ background: 'rgba(252,110,32,0.04)', border: '1px solid rgba(252,110,32,0.15)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Find a Builder</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Tell us your project requirements and we'll match you with 2–3 vetted builders.</p>
            <Link href="/contact?type=partner-match" className="btn btn-primary">Find My Builder</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', border: 'none', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🏗️</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Are You a Builder?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Apply to join the Buildogram verified partner network and get quality project leads.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      {/* Partner disclaimer — DECISION-1 & DECISION-5 approved copy */}
      <div style={{ background: 'var(--bg-card2)', borderTop: '1px solid var(--border)', padding: '24px' }}>
        <div className="container">
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <strong>Partner Verification Notice:</strong> Partner verification confirms that selected credentials and project information were reviewed using Buildogram&apos;s verification process. It is not a guarantee of future performance. The execution agreement, warranty obligations, pricing and construction responsibilities remain governed by the signed contract between the property owner and the appointed execution partner.
          </p>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Verified Builders in Chennai', path: '/partners/builders' }]} />
    </>
  );
}
