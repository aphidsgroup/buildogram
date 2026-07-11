import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Renovation Contractors in Chennai | Structural-Safe Home Renovation | Buildogram',
  description: 'Planning a home renovation in Chennai? Get engineer-verified renovation support — load-bearing wall checks, waterproofing, transparent BOQ, and verified contractors.',
  path: '/renovation-contractors-chennai',
});

const PROCESS = [
  { step: '01', title: 'Old Structure Assessment', desc: 'Before any demolition, our engineers assess the existing structure. We use Rebound Hammer tests to check concrete strength, and inspect columns and beams for corrosion or cracking damage.' },
  { step: '02', title: 'Load-Bearing Wall Identification', desc: 'We identify which walls are load-bearing using structural drawings and on-site GPR scanning. Demolishing a load-bearing wall without proper transfer beams can collapse a floor — we prevent this.' },
  { step: '03', title: 'Renovation BOQ', desc: 'We itemize every element of the renovation — demolition waste, new brickwork, waterproofing membranes, plumbing retrofits, and finishes — into a transparent, capped BOQ before work begins.' },
  { step: '04', title: 'Phased Execution', desc: 'Renovation work is broken into logical phases to minimize disruption. Each phase is supervised and signed off before the next begins — ensuring no phase is rushed to cover a shoddy earlier one.' },
  { step: '05', title: 'Waterproofing & Leak Tests', desc: 'All wet areas (bathrooms, terraces, balconies) undergo 48-hour pond tests after waterproofing application to confirm zero dampness. We do not close walls until plumbing pressure tests pass.' },
];

const WARNINGS = [
  { icon: '⚠️', title: 'Never Demolish Without a Structural Check', desc: 'Many renovation accidents occur because a "simple wall" was load-bearing. Our engineers identify safe demolition zones before any work starts.' },
  { icon: '🔍', title: 'Old Waterproofing Always Fails', desc: 'Existing waterproofing membranes in 15+ year old buildings degrade. Renovation is the best time to redo all wet area waterproofing — skipping it causes repeat dampness within 2 years.' },
  { icon: '🚰', title: 'Concealed Plumbing Hides Corrosion', desc: 'GI pipes used before 2000 corrode internally. Renovation is the time to replace them entirely with CPVC — not just repair leaks from outside.' },
  { icon: '🧪', title: 'Asbestos in Pre-2005 Roofs', desc: 'Pre-2005 asbestos cement roofing sheets are hazardous. We check for this during our initial assessment and recommend safe disposal procedures if found.' },
];

const FAQS = [
  { question: 'How do I know if a wall is load-bearing before demolishing it?', answer: 'The safest method is to review original structural drawings and use GPR (Ground Penetrating Radar) scanning to locate rebar and beams. Our engineers do this assessment before any demolition begins. Walls running perpendicular to floor beams and above columns are almost always load-bearing.' },
  { question: 'Can I add a floor to my existing house in Chennai?', answer: 'Only if the existing foundation and columns can carry the additional load. Our structural engineers will conduct a core test on existing columns and check the foundation design. If the structure cannot take the load, we provide retrofitting designs (column jacketing, additional footings) before the new floor is added.' },
  { question: 'How much does a home renovation cost in Chennai?', answer: 'Basic renovation (bathroom re-tiling, painting, minor plumbing) costs ₹400–700/sqft. Full interior renovation with kitchen, wardrobes, flooring, and bathroom upgrades costs ₹900–1,500/sqft. Structural renovation with wall demolition, floor additions, or waterproofing costs ₹1,500–2,500/sqft depending on extent.' },
  { question: 'How long does a house renovation take?', answer: 'A bathroom renovation takes 3–4 weeks. A full interior renovation of a 1,000 sqft home takes 8–12 weeks. Structural renovations (adding floors, underpinning foundations) take 4–8 months. Timelines depend heavily on whether structural issues are discovered mid-work.' },
  { question: 'What is the biggest hidden cost in home renovation?', answer: 'Water damage behind walls and beneath floors is the most common hidden cost in older Chennai homes. When tiles or plaster is removed, we often find 5–10 years of seepage damage to the underlying concrete. Our initial assessment tries to identify these risk zones before work begins.' },
  { question: 'Do you handle partial renovations (just bathroom or kitchen)?', answer: 'Yes. We provide BOQ reviews and supervision for any scope — whether it is a single bathroom renovation, a complete kitchen remodel, or a full-house upgrade. The process remains the same: engineer assessment, itemized BOQ, supervised execution, and quality sign-off.' },
  { question: 'How do you prevent budget overruns in renovation?', answer: 'The main cause of renovation overruns is discovering hidden damage after demolition. We minimize this by doing a thorough pre-renovation structural assessment. We also prepare contingency allowances in the BOQ for likely discoveries, so the budget is not a complete shock if extra work is needed.' },
];

export default function RenovationContractorsChennai() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Renovation</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Structurally Safe Home Renovation in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Renovation without an engineer is a gamble. Our team inspects existing structures, identifies load-bearing walls, prepares transparent renovation BOQs, and supervises work — so your renovation doesn't become a structural repair emergency.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=renovation" className="btn btn-primary btn-lg">Get Renovation Assessment</Link>
            <Link href="/structural-audit-chennai" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Structural Audit First</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Warning Cards */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Renovation Risks</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Why Renovation Without Engineering Fails</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '15px' }}>These are the four most dangerous renovation mistakes we encounter — and prevent — on every project.</p>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {WARNINGS.map(w => (
              <div key={w.title} className="card" style={{ borderLeft: '4px solid var(--warning)', display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '26px', flexShrink: 0 }}>{w.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{w.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '56px 40px', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Our Renovation Support Process</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PROCESS.map(p => (
              <div key={p.step} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'white' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(252,110,32,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>{p.step}</div>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQBlock title="Renovation FAQs" faqs={FAQS} />

        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: 'var(--radius)', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '12px', fontSize: '14px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[['Structural Audit', '/structural-audit-chennai'], ['Building Crack Inspection', '/building-crack-inspection-chennai'], ['Waterproofing Partners', '/partners/waterproofing'], ['Home Construction', '/home-construction-chennai']].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '7px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>{label}</Link>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Planning a Renovation?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '540px', margin: '0 auto 28px' }}>Start with an engineer's assessment — not a contractor's quote. We identify structural risks, estimate realistic costs, and help you get the right team for the job.</p>
          <Link href="/contact?type=renovation" className="btn btn-primary btn-lg">Book Free Renovation Assessment</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Renovation Contractors in Chennai', path: '/renovation-contractors-chennai' }]} />
    </>
  );
}
