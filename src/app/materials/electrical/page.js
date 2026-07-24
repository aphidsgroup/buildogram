import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Electrical Materials & Wires in Chennai | FRLS Cables',
  description: 'Branded electrical wires, conduits, and switches in Chennai. Ensure fire safety with verified FRLS (Flame Retardant Low Smoke) cables and branded switchgear.',
  path: '/materials/electrical',
});

const STEPS = [
  { title: '1. Load Calculation', desc: 'We calculate the total power load of your house (ACs, geysers, EV chargers) to determine the exact gauge (sq.mm) of wire needed for each circuit.' },
  { title: '2. FRLS Wire Selection', desc: 'We strictly supply FRLS (Flame Retardant Low Smoke) wires. In case of a short circuit, these wires do not catch fire easily and emit very little toxic smoke.' },
  { title: '3. Conduit Sizing', desc: 'PVC pipes (conduits) buried in the slab must be heavy-gauge (usually 2mm thick) so they don\'t get crushed when laborers walk on them during concrete pouring.' },
  { title: '4. Switchgear (MCB/RCCB) Planning', desc: 'We supply highly sensitive RCCBs (Residual Current Circuit Breakers) that instantly cut power if a person gets shocked, saving lives.' },
];

const DELIVERABLES = [
  'Electrical Load Calculation BOQ',
  'FRLS Wire & Cable Supply (Polycab, Finolex, etc.)',
  'Heavy-Duty PVC Conduits & Accessories',
  'MCB, RCCB & Distribution Boards',
  'Modular Switches & Sockets'
];

const FAQS = [
  { question: 'Why do electricians ask for so many different wire sizes?', answer: 'Different appliances draw different amounts of current. A 1.0 sq.mm wire is fine for LED lights, but an AC requires a 4.0 sq.mm wire. If you use a thin wire for an AC, the wire will melt, causing a fire.' },
  { question: 'What is the difference between FR and FRLS wires?', answer: 'FR (Flame Retardant) wires resist catching fire. FRLS (Flame Retardant Low Smoke) wires also resist fire, but crucially, they emit very little toxic black smoke when burned. Most fire deaths are caused by smoke inhalation, making FRLS essential for safety.' },
  { question: 'Why is my house tripping whenever it rains?', answer: 'Water is likely seeping into an outdoor electrical point or a poorly sealed conduit. A sensitive RCCB detects this "leakage" current and trips to prevent an electrocution hazard.' },
  { question: 'Do I really need an earth wire?', answer: 'Absolutely. Earthing (the thick green wire) is non-negotiable. If a metal appliance (like a washing machine or fridge) has a fault, the earth wire safely channels the deadly current into the ground instead of into your body.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Electrical</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Electrical Wires & Materials in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Don't compromise on fire safety. Electrical short circuits are the leading cause of house fires. We provide 100% genuine, branded FRLS wires, heavy-duty conduits, and life-saving RCCB switchgear to ensure your home's nervous system is flawless.
        </p>

        <AnswerBlock
          question="The Fake Wire Market in Chennai"
          answer="The electrical market is flooded with counterfeit wires. They look identical to famous brands on the outside, but inside, they use cheap, impure copper mixed with aluminum. These wires heat up quickly, wasting electricity and eventually causing fires. Buildogram sources materials only directly from authorized brand distributors to guarantee 100% pure electrolytic copper."
        />
        
        <ProcessSteps title="Electrical Procurement Strategy" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Future-Proofing for EVs</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Electric Vehicles are becoming standard in Chennai. A fast EV charger draws a massive amount of power. If you don't lay a dedicated thick heavy-core cable from your main meter to your parking spot during construction, you will have to break your beautiful driveway tiles later to install it.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Electrical Materials in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Plumbing Materials', '/materials/plumbing'],
              ['Cement', '/materials/cement'],
              ['TMT Steel', '/materials/tmt-steel'],
              ['Waterproofing', '/materials/waterproofing'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get Electrical Material Quote</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Electrical Materials & Wires in Chennai","path":"/materials/electrical"}]} />
    </>
  );
}
