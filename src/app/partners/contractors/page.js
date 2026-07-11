import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Verified Contractors in Chennai | Licensed Civil & MEP Contractors | Buildogram',
  description: 'Find verified civil, MEP, and finishing contractors in Chennai. Buildogram checks labour licenses, ESI/PF compliance, safety records and contract practices before listing.',
  path: '/partners/contractors',
});

const CRITERIA = [
  { icon: '📜', title: 'Labour License & ESI/PF', desc: 'Valid Contract Labour Regulation & Abolition Act (CLRA) licence. ESI and PF registration for all deployed workers — verified through EPFO records.' },
  { icon: '🏗️', title: 'Minimum Project Experience', desc: 'At least 3 completed projects of similar scope reviewed by our team. We contact past clients, inspect completed work where possible.' },
  { icon: '⛑️', title: 'Site Safety Record', desc: 'No major OSHA violations on record. Proper PPE (hard hats, harness, safety shoes) enforced on site. Scaffolding erected per IS 3696 standards.' },
  { icon: '📋', title: 'Milestone Contract Practice', desc: 'Willing to sign milestone-based payment contracts with an itemized BOQ. No lump-sum-only contractors listed — transparency is mandatory.' },
];

const TYPES = [
  { name: 'Civil Structural Contractors', desc: 'Foundation, columns, slabs, beams — structural RCC work per IS 456 and IS 13920', icon: '🏗️' },
  { name: 'Brick & Masonry Contractors', desc: 'Wire-cut brick, AAC block, stone masonry. Mortar mixing ratios and line levels per spec.', icon: '🧱' },
  { name: 'MEP Contractors', desc: 'Mechanical (HVAC), Electrical (panels, wiring), Plumbing (CPVC, PPR, sanitary).', icon: '⚡' },
  { name: 'Waterproofing Contractors', desc: 'Terrace, bathroom, basement waterproofing. Brand-authorized applicators only.', icon: '💧' },
  { name: 'Painting & Finishing Contractors', desc: 'Primer, putty, emulsion, texture paint. Surface prep and mil thickness verified.', icon: '🎨' },
  { name: 'Formwork Contractors', desc: 'Conventional timber, modular steel, table forms. Safety loading calculations verified.', icon: '🪵' },
];

const STEPS = [
  { step: '1', title: 'Get Your BOQ First', desc: 'Before approaching any contractor, have an itemized BOQ prepared. This lets you compare apples-to-apples instead of lump-sum guesses.' },
  { step: '2', title: 'Compare Contractor Quotes', desc: 'Get 3 quotes from verified contractors. Compare by item — not total. Look for who provides the most detailed scope breakdown.' },
  { step: '3', title: 'Sign a Milestone Contract', desc: 'Never pay more than 20% upfront. Structure payments around milestones: foundation, slab, roof, finishing. Each milestone verified by our engineer.' },
];

export default function ContractorsPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partner Directory</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Contractors in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>Licensed civil, MEP, and finishing contractors vetted by our engineering team — compliance-checked, BOQ-ready, and accountable.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/join-as-partner" className="btn btn-primary btn-lg">Join as a Contractor</Link>
            <Link href="/contact?type=partner-match" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Find a Contractor</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>
        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Our Contractor Verification Criteria</h2>
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

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Types of Contractors in Our Network</h2>
          <div className="grid-3" style={{ gap: '16px' }}>
            {TYPES.map(t => (
              <div key={t.name} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{t.icon}</div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{t.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '32px' }}>How to Hire a Contractor Through Buildogram</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {STEPS.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Find a Contractor</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Tell us your project type, location, and scope — we match you with 2–3 verified contractors.</p>
            <Link href="/contact?type=partner-match" className="btn btn-primary">Find My Contractor</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>👷</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Are You a Contractor?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Apply to join our verified partner network and get quality project leads from Buildogram clients.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Contractors', path: '/partners/contractors' }]} />
    </>
  );
}
