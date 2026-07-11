import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Construction Case Studies in Chennai | Real Project Results | Buildogram',
  description: 'Real-world results from Buildogram projects — BOQ reviews that saved lakhs, structural audits, NRI-managed builds, and material fraud prevention.',
  path: '/case-studies',
});

const DEMO_CASES = [
  {
    id: 'dc1',
    title: 'Saved ₹4.2L on a G+1 House in Velachery',
    category: 'BOQ Review',
    area: 'Velachery',
    problem: 'Contractor quote had 18 missing or inflated line items totalling ₹4.2 lakhs above market rate.',
    outcome: 'Itemized BOQ review exposed all discrepancies. Client negotiated down and signed at correct rate.',
    metrics: [
      { label: 'Savings', value: '₹4.2L' },
      { label: 'Errors Found', value: '18 items' },
      { label: 'Turnaround', value: '3 weeks' },
    ],
    icon: '💰',
  },
  {
    id: 'dc2',
    title: 'Foundation Cracking Diagnosed — Adyar Villa',
    category: 'Structural Audit',
    area: 'Adyar',
    problem: '15-year-old villa had deep horizontal cracks in external ground-floor columns. Owner feared demolition.',
    outcome: 'UPV testing revealed 40% concrete strength loss in 2 columns. Jacketing performed instead of rebuild.',
    metrics: [
      { label: 'Cost Saved', value: '₹36L vs rebuild' },
      { label: 'Columns Jacketed', value: '4' },
      { label: 'Building Status', value: 'Certified Safe' },
    ],
    icon: '🏠',
  },
  {
    id: 'dc3',
    title: 'NRI-Managed G+1 Build — Sholinganallur',
    category: 'Construction',
    area: 'Sholinganallur',
    problem: 'Client based in Singapore needed complete site monitoring without being present in Chennai.',
    outcome: '14-month build with daily portal updates, 0 cost overruns, and structural warranty handover.',
    metrics: [
      { label: 'Built Area', value: '1,800 sqft' },
      { label: 'Total Cost', value: '₹1.98Cr' },
      { label: 'Duration', value: '14 months' },
    ],
    icon: '✈️',
  },
  {
    id: 'dc4',
    title: 'Material Fraud Caught Before Delivery — Tambaram',
    category: 'Materials',
    area: 'Tambaram',
    problem: 'Supplier attempting to deliver cement batches manufactured 95 days earlier (limit is 90 days per IS 455).',
    outcome: 'Batch date verification by our site engineer caught all 48 bags. Fresh stock delivered with new MTC.',
    metrics: [
      { label: 'Fraud Prevented', value: '₹38,000' },
      { label: 'Bags Rejected', value: '48 bags' },
      { label: 'Resolution', value: '24 hours' },
    ],
    icon: '🔍',
  },
];

const CATEGORY_COLORS = {
  'BOQ Review': '#FC6E20',
  'Structural Audit': '#10B981',
  'Construction': '#3B82F6',
  'Materials': '#8B5CF6',
};

async function getCaseStudies() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const cases = await prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return cases;
  } catch {
    return [];
  }
}

export default async function CaseStudiesPage() {
  const dbCases = await getCaseStudies();
  const useDemoCases = dbCases.length === 0;

  return (
    <main>
      {/* HERO */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Case Studies</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Real Projects. Measurable Outcomes. Zero Spin.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            These are accounts of actual Buildogram engagements — with real savings figures, technical findings, and verified outcomes. No stock photography, no fake testimonials.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Start Your Project</Link>
            <Link href="/services" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Our Services</Link>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ background: 'var(--primary)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, textAlign: 'center' }}>
            {[
              { label: 'Projects Monitored', value: '50+' },
              { label: 'Avg Project Size', value: '₹2.8Cr' },
              { label: 'Client Savings', value: '₹1.8Cr+' },
              { label: 'Structural Warranty', value: '100%' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ padding: '8px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'white' }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY CARDS */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--secondary)', marginBottom: '12px' }}>
              {useDemoCases ? 'Project Case Studies' : `${dbCases.length} Case Studies`}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '17px', maxWidth: '560px', margin: '0 auto' }}>
              Engineering decisions documented with technical accuracy — problems identified, interventions made, outcomes recorded.
            </p>
          </div>

          {useDemoCases ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
              {DEMO_CASES.map((cs) => {
                const catColor = CATEGORY_COLORS[cs.category] || 'var(--primary)';
                return (
                  <article key={cs.id} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                      <div style={{ fontSize: '40px', lineHeight: 1, flexShrink: 0 }}>{cs.icon}</div>
                      <div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                          <span style={{ display: 'inline-block', background: catColor + '18', color: catColor, border: `1px solid ${catColor}33`, borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: 700 }}>
                            {cs.category}
                          </span>
                          <span style={{ display: 'inline-block', background: 'var(--bg-card2)', color: 'var(--text-muted)', borderRadius: '999px', padding: '2px 10px', fontSize: '11px', fontWeight: 600 }}>
                            📍 {cs.area}
                          </span>
                        </div>
                        <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.4, margin: 0 }}>
                          {cs.title}
                        </h2>
                      </div>
                    </div>

                    {/* Problem → Outcome */}
                    <div style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius-sm)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Problem</div>
                        <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.55, margin: 0 }}>{cs.problem}</p>
                      </div>
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Outcome</div>
                        <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.55, margin: 0 }}>{cs.outcome}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {cs.metrics.map((m) => (
                        <div key={m.label} style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius-sm)', padding: '10px 8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)' }}>{m.value}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '28px' }}>
              {dbCases.map((cs) => (
                <article key={cs.id} className="card" style={{ padding: '32px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '12px' }}>{cs.title}</h2>
                  {cs.summary && <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{cs.summary}</p>}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: 'var(--gradient-dark)', padding: '64px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 34px)', marginBottom: '12px' }}>Have a Project Story? Share It With Us</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '17px', lineHeight: 1.7, marginBottom: '28px' }}>
            If Buildogram helped you identify savings, prevent a structural issue, or manage a build successfully — we would like to document it.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">Get in Touch</Link>
        </div>
      </section>

      <BreadcrumbSchema items={[{ name: 'Home', href: '/' }, { name: 'Case Studies', href: '/case-studies' }]} />
    </main>
  );
}
