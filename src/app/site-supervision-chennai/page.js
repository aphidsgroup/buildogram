import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Site Supervision Services in Chennai | Engineer-Led Construction Monitoring | Buildogram',
  description: 'Hire experienced site supervisors in Chennai. Daily construction monitoring, concrete tests, rebar inspections, QC checks and client portal updates for your project.',
  path: '/site-supervision-chennai',
});

const WHAT_WE_CHECK = [
  { icon: '🧪', title: 'Concrete Slump Tests', desc: 'Every concrete pour is tested for workability using slump cone tests. A slump above 150mm indicates excess water, which weakens the final concrete strength by up to 30%.' },
  { icon: '🔩', title: 'Rebar Spacing & Cover', desc: 'Before slab casting, our engineers physically measure rebar spacing and cover block placement. Under-covered rebar corrodes in Chennai\'s chloride-heavy coastal air within 10 years.' },
  { icon: '📦', title: 'Material Delivery Verification', desc: 'We check brand markings, batch dates, weighbridge slips, and MTC certificates for every cement and steel delivery. Expired cement batches and underweight steel are caught at the gate.' },
  { icon: '📸', title: 'Daily Photo Documentation', desc: 'Site engineers capture timestamped progress photos, uploaded to your Client Portal daily. You can verify progress from anywhere — essential for NRI owners building remotely.' },
  { icon: '💧', title: 'Plumbing Pressure Tests', desc: 'All concealed plumbing lines undergo hydrostatic pressure tests at 1.5x operating pressure before walls are plastered. Leaks caught now cost ₹500 to fix — leaks after plaster cost ₹15,000+.' },
  { icon: '📋', title: 'Milestone Sign-Offs', desc: 'Each construction milestone (foundation, plinth, G slab, G+1 slab, terrace) requires our engineer\'s sign-off before payment is released. This prevents paying for incomplete or substandard work.' },
];

const WHO_NEEDS = [
  { title: 'NRI Home Builders', desc: 'Building in Chennai while living abroad? Our site engineers are your eyes and ears on the ground. Daily portal updates and milestone reports keep you in full control from Singapore, Dubai, or the US.', icon: '✈️' },
  { title: 'Busy Professionals', desc: 'Cannot visit the site weekly? We handle all technical checks, material verification, and contractor coordination. You only need to review our weekly summary reports.', icon: '💼' },
  { title: 'First-Time Builders', desc: 'Unfamiliar with construction quality standards? Our engineers know what good work looks like — and more importantly, what cutting corners looks like. We protect your interests.', icon: '🏠' },
  { title: 'Investors Building Rental Property', desc: 'When your goal is return on investment, quality matters. Our supervision ensures the structure is built to last — reducing maintenance costs and protecting your property value.', icon: '📈' },
];

const FAQS = [
  { question: 'What is the difference between site supervision and a structural audit?', answer: 'Site supervision is an ongoing monitoring service during active construction — ensuring quality in real-time. A structural audit is a retrospective assessment of an already-built structure to check its current health and safety. You need supervision during construction and an audit for existing older buildings.' },
  { question: 'How often does the site engineer visit?', answer: 'For active construction phases (foundation, slab casting, plaster), our engineers visit daily. During slower phases (interior finishing, painting), visits are 3 times per week. You can always request additional visits for specific activities like concrete pours.' },
  { question: 'What does the Client Portal show?', answer: 'The Client Portal shows daily site photos with timestamps, material delivery records, concrete test results (slump and cube strength), worker attendance, weather conditions, and milestone completion status. You can access it on any device, 24/7.' },
  { question: 'Can you supervise a contractor I\'ve already hired?', answer: 'Yes. Most clients hire us after they\'ve already selected a contractor. We step in as the independent third-party quality supervisor — which actually improves contractor behaviour, as they know their work is being professionally checked.' },
  { question: 'What happens if the contractor does something wrong?', answer: 'We document the issue, raise it with the contractor immediately, and require rectification before the next payment milestone is released. If the contractor refuses to fix the issue, we document everything and advise you on next steps — including dispute resolution.' },
  { question: 'Do you supervise renovation projects too?', answer: 'Yes. We supervise renovations of all scales — from bathroom remodelling to full-house upgrades. Renovation supervision is especially important when demolishing walls, replacing concealed pipes, or applying waterproofing membranes.' },
  { question: 'How much does site supervision cost in Chennai?', answer: 'Supervision fees depend on project size and duration. A typical G+1 project (14–16 months) costs ₹60,000–1,20,000 for the full supervision period. This fee is almost always recovered through materials saved from contractor fraud and quality issues caught early.' },
];

export default function SiteSupervisionChennai() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Site Supervision</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>
            Engineer-Led Site Supervision in Chennai
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>
            Your contractor works better when an engineer is watching. Our site supervisors conduct daily QC checks, verify every material delivery, and update your Client Portal — so you know exactly what is happening on your site, every day.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=supervision" className="btn btn-primary btn-lg">Hire a Site Supervisor</Link>
            <Link href="/quality-system" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Our Quality System</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* What We Check */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="tag" style={{ marginBottom: '12px' }}>Daily Checks</div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>What Our Site Engineers Check Every Day</h2>
          </div>
          <div className="grid-3" style={{ gap: '20px' }}>
            {WHAT_WE_CHECK.map(item => (
              <div key={item.title} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
                <h3 style={{ fontSize: '15px', color: 'var(--secondary)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who Needs This */}
        <section style={{ background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '56px 40px', marginBottom: '64px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--secondary)' }}>Who Benefits Most from Site Supervision?</h2>
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            {WHO_NEEDS.map(item => (
              <div key={item.title} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'white' }}>
                <span style={{ fontSize: '32px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Portal Highlight */}
        <section style={{ marginBottom: '64px', padding: '36px', background: 'rgba(252,110,32,0.04)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(252,110,32,0.12)' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '16px' }}>📱 Your Project, Live on the Client Portal</h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.7, marginBottom: '20px', fontSize: '15px' }}>
            Every material delivery, concrete test result, and daily photo is uploaded to your secure Client Portal within hours of the event. You can access it from your phone, tablet, or laptop — from anywhere in the world.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['Daily site photos', 'Concrete slump & cube test results', 'Material delivery logs', 'Milestone completion status', 'Worker attendance', 'Weather-adjusted schedule'].map(item => (
              <span key={item} style={{ fontSize: '13px', color: 'var(--primary)', background: 'rgba(252,110,32,0.08)', border: '1px solid rgba(252,110,32,0.15)', borderRadius: '999px', padding: '5px 14px' }}>{item}</span>
            ))}
          </div>
        </section>

        <FAQBlock title="Site Supervision FAQs" faqs={FAQS} />

        <div className="card" style={{ marginTop: '48px', background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '48px' }}>
          <h3 style={{ color: 'white', fontSize: '26px', marginBottom: '12px' }}>Don't Build Without Eyes on the Ground</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px' }}>An independent site engineer is your best protection against contractor fraud, material substitution, and quality shortcuts. Book a consultation today.</p>
          <Link href="/contact?type=supervision" className="btn btn-primary btn-lg">Book Site Supervision</Link>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Site Supervision in Chennai', path: '/site-supervision-chennai' }]} />
    </>
  );
}
