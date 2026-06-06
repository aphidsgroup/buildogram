import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Plumbing Materials & Pipes in Chennai | CPVC, UPVC, SWR',
  description: 'Verified plumbing pipes and fittings in Chennai. We supply lead-free CPVC for hot water, UPVC for cold water, and heavy-duty SWR pipes for drainage.',
  path: '/materials/plumbing',
});

const STEPS = [
  { title: '1. System Design', desc: 'We segregate the plumbing logic into three systems: CPVC (Chlorinated PVC) for high-temperature hot water, UPVC (Unplasticized PVC) for cold water, and SWR for drainage.' },
  { title: '2. Pressure Rating Verification', desc: 'Pipes are rated by pressure (e.g., SDR 11, Schedule 40). If you plan to install a pressure booster pump for strong showers, we ensure the pipes are thick enough to handle the stress without bursting.' },
  { title: '3. Fitting Selection', desc: 'Leaks rarely happen in the middle of a pipe; they happen at the joints (elbows, tees). We supply high-grade molded fittings and solvent cements that chemically weld the plastic together permanently.' },
  { title: '4. Pressure Testing (Hydrotest)', desc: 'Before the pipes are concealed inside the brick wall with cement, we cap the ends and pump water into them at high pressure (e.g., 6 kg/cm²) and hold it for 24 hours to prove there are absolutely no leaks.' },
];

const DELIVERABLES = [
  'Plumbing Layout BOQ Estimation',
  'CPVC & UPVC Pipes Supply (Ashirvad, Supreme, etc.)',
  'SWR Drainage Pipes & Fittings',
  'Water Tanks & Pressure Pumps',
  'Hydro-Testing Verification'
];

const FAQS = [
  { question: 'Why can\'t I use UPVC pipes for hot water?', answer: 'UPVC (white pipes) will melt, warp, and eventually burst if exposed to boiling water from a geyser. CPVC (yellow/off-white pipes) contains extra chlorine, allowing it to easily handle temperatures up to 93°C.' },
  { question: 'What does SWR mean?', answer: 'SWR stands for Soil, Waste, and Rainwater. These are the thick grey or black pipes used for toilets, sinks, and roof drainage. They are designed to carry solid waste without clogging and use rubber ring joints to prevent bad odors from escaping.' },
  { question: 'Why do my bathroom walls have peeling paint near the floor?', answer: 'This is usually caused by a poorly sealed floor trap (the drain hole). Water seeps under the tiles, travels through the concrete, and climbs up the wall via capillary action. Using proper waterproofing and P-traps solves this.' },
  { question: 'Should I use GI (metal) pipes instead of plastic?', answer: 'No. Galvanized Iron (GI) pipes were used decades ago, but they rust and scale heavily, especially in Chennai\'s hard water, eventually blocking water flow and turning water brown. CPVC/UPVC pipes never rust and inhibit bacterial growth.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Plumbing</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Plumbing Pipes & Materials in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          A leak behind a tiled wall is a homeowner's worst nightmare. We supply 100% genuine, pressure-rated CPVC and UPVC pipes that are guaranteed to withstand high-pressure booster pumps and scorching hot water without ever bursting or leaking.
        </p>

        <AnswerBlock
          question="The Pressure Pump Trap"
          answer="Everyone wants a luxurious, high-pressure 'rain shower'. So they buy a strong pressure booster pump. But if the contractor used cheap, thin-walled pipes (low SDR rating) to save money, the sudden spike in pressure will blow the joints apart inside the wall, flooding your entire house. If you want high water pressure, you MUST upgrade to heavy-duty pipes."
        />
        
        <ProcessSteps title="Plumbing Procurement & Testing" steps={STEPS} />
        
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', margin: '40px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>What You Receive</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {DELIVERABLES.map(d => (
              <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '15px', color: '#374151', lineHeight: 1.5 }}>
                <span style={{ color: '#10B981', fontWeight: 700, marginTop: '2px' }}>✓</span> {d}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: '40px 0', padding: '32px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '16px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Hard Water & Scaling in Chennai</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Groundwater in Chennai is notoriously hard (high in calcium and magnesium). This creates white scale buildup inside pipes and ruins expensive showerheads. We can supply integrated inline water softeners that protect your entire plumbing system and extend the life of your appliances.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Plumbing Materials in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Electrical Materials', '/materials/electrical'],
              ['Waterproofing', '/materials/waterproofing'],
              ['Cement', '/materials/cement'],
              ['TMT Steel', '/materials/tmt-steel'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get Plumbing Material Quote</Link>
        </div>
      </div>
    </main>
  );
}
