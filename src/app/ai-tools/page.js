import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'AI-Engineered Construction Tools | AI BOQ Checker, Cost Estimator & More | Buildogram',
  description: 'Buildogram AI-engineered tools help you estimate construction costs, check BOQs, analyze contractor quotes, plan materials, and prepare audit intakes — all powered by AI-driven workflows.',
  path: '/ai-tools',
});

const AI_TOOLS = [
  {
    icon: '💰',
    title: 'AI Construction Cost Estimator',
    desc: 'Get an AI-engineered preliminary construction cost estimate based on your plot size, floors, location, and specification level.',
    href: '/ai-construction-cost-estimator',
    badge: 'Live',
  },
  {
    icon: '📋',
    title: 'AI BOQ Checker',
    desc: 'Upload or describe your BOQ and let our AI-engineered checker identify missing items, vague specifications, and rate anomalies.',
    href: '/ai-boq-checker',
    badge: 'Live',
  },
  {
    icon: '🔍',
    title: 'AI Contractor Quote Analyzer',
    desc: 'Paste your contractor quote and get an AI-driven breakdown of hidden costs, exclusions, and red flags before you sign.',
    href: '/ai-contractor-quote-analyzer',
    badge: 'Live',
  },
  {
    icon: '🧱',
    title: 'AI Material Requirement Estimator',
    desc: 'Estimate cement, steel, sand, brick, and other material quantities for your project using AI-engineered calculation workflows.',
    href: '/ai-material-estimator',
    badge: 'Live',
  },
  {
    icon: '🏛️',
    title: 'AI Structural Audit Intake',
    desc: 'Describe your building and concerns — our AI-engineered intake prepares a structured brief for your engineer-led structural audit.',
    href: '/ai-structural-audit-intake',
    badge: 'Live',
  },
  {
    icon: '📐',
    title: 'AI Survey Requirement Builder',
    desc: 'Answer a few questions about your plot and project to get an AI-engineered survey scope — land survey type, deliverables, and equipment.',
    href: '/ai-survey-requirement-builder',
    badge: 'Live',
  },
  {
    icon: '🔩',
    title: 'AI Soil Test Requirement Builder',
    desc: 'Describe your site and building type to get an AI-engineered soil investigation scope — test types, borehole count, and report requirements.',
    href: '/ai-soil-test-requirement-builder',
    badge: 'Live',
  },
  {
    icon: '🏗️',
    title: 'AI Pile Foundation BOQ Checker',
    desc: 'Check pile foundation BOQs for completeness — pile type, depth, load capacity, and mobilisation costs — using AI-engineered review.',
    href: '/ai-pile-foundation-boq-checker',
    badge: 'Live',
  },
  {
    icon: '🏠',
    title: 'AI Property Passport Assistant',
    desc: 'Prepare your property documentation checklist using our AI-engineered assistant — drawings, warranties, material records, and maintenance logs.',
    href: '/ai-property-passport-assistant',
    badge: 'Live',
  },
  {
    icon: '🧮',
    title: 'AI BOQ Calculator',
    desc: 'Generate a full engineer-checked Bill of Quantities for your residential or commercial project — 44 line items, COCENA Dec 2025 rates, per-floor breakdown, and margin analysis.',
    href: '/boq-calculator',
    badge: 'Coming Soon',
  },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <a href="/" style={{ color: '#FC6E20' }}>Home</a> / <span style={{ color: '#0F172A', fontWeight: 600 }}>AI Tools</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ display: 'inline-block', background: '#FFF7ED', color: '#FC6E20', fontSize: '12px', fontWeight: 700, padding: '6px 16px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            AI-Engineered Workflows
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#0F172A', marginBottom: '16px' }}>
            AI-Engineered Construction Tools
          </h1>
          <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            AI-driven planning tools designed for property owners, builders, contractors, and engineers in Chennai. Each tool is built on evidence-backed construction frameworks — not generic AI responses.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {AI_TOOLS.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '36px' }}>{tool.icon}</span>
                {tool.badge && (
                  <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '10px', lineHeight: 1.4 }}>{tool.title}</h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>{tool.desc}</p>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#FC6E20' }}>Use Tool →</span>
            </Link>
          ))}
        </div>

        <div style={{ background: '#0F172A', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Need Engineer-Led Review?</h2>
          <p style={{ color: '#94A3B8', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
            AI tools give you direction. Our engineers give you certainty. Connect with a Buildogram engineer for project-specific advice.
          </p>
          <Link href="/contact?type=ai" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"AI-Engineered Construction Tools","path":"/ai-tools"}]} />
    </>
  );
}
