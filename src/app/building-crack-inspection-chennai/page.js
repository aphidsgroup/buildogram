import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Building Crack Inspection in Chennai | Structural Engineers',
  description: 'Certified engineers for building crack inspection in Chennai. We analyze wall and column cracks, identify the root cause (settlement, thermal, corrosion), and provide repair solutions.',
  path: '/building-crack-inspection-chennai',
});

const STEPS = [
  { title: '1. Crack Mapping', desc: 'Our structural engineer visually maps out the pattern, width, and depth of all cracks, differentiating between harmless plaster cracks and dangerous structural shear cracks.' },
  { title: '2. Telltale Glass Monitoring', desc: 'For active cracks, we install glass telltales or digital crack monitors across the gap to track if the crack is actively widening over time.' },
  { title: '3. Root Cause Analysis', desc: 'We investigate the source: foundation settlement, thermal expansion, steel corrosion, or poor concrete shrinkage.' },
  { title: '4. NDT Verification', desc: 'If needed, we use UPV (Ultrasonic Pulse Velocity) or Rebar Scanning to check internal damage behind the visible crack.' },
  { title: '5. Repair Methodology Report', desc: 'You receive a detailed report with specific repair instructions, such as epoxy injection, micro-concreting, or foundation underpinning.' },
];

const DELIVERABLES = [
  'Detailed Crack Mapping Diagram',
  'Root Cause Identification Report',
  'Structural Danger Assessment (Active vs Dormant)',
  'Recommended Repair Methodology (BOQ)',
  'NDT Results (if applicable)'
];

const FAQS = [
  { question: 'When should I be worried about a wall crack?', answer: 'Hairline cracks in the plaster (web-like patterns) are usually harmless shrinkage cracks. However, diagonal "staircase" cracks, horizontal cracks near beams, or any crack wider than a coin edge indicates severe structural stress.' },
  { question: 'Why do so many buildings in Chennai have diagonal cracks?', answer: 'Diagonal cracks usually indicate differential foundation settlement. Due to Chennai\'s varied soil (especially in marshy areas like Velachery or Pallikaranai), one side of the foundation often sinks faster than the other, tearing the walls diagonally.' },
  { question: 'Can cracks be permanently fixed with putty?', answer: 'No. Putty or exterior crack-fillers only hide the symptom. If the crack is structural, the underlying movement will simply tear the new putty open within months. The root cause must be addressed.' },
  { question: 'What is epoxy injection?', answer: 'For deep structural cracks in columns or beams, we inject high-strength epoxy resin under high pressure. The resin penetrates deep into the concrete and cures stronger than the concrete itself, sealing and bonding the crack.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/structural-audit-chennai" style={{ color: '#FC6E20' }}>Structural Audit & NDT</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Crack Inspection</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Building Crack Inspection in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Not all cracks are dangerous, but ignoring the wrong one can be catastrophic. Have a certified structural engineer analyze the cracks in your Chennai property to determine if they are superficial plaster defects or critical foundation settlement warnings.
        </p>

        <AnswerBlock
          question="Is it safe to live in a house with a cracked roof slab?"
          answer="A cracked roof slab is highly dangerous in Chennai. During the monsoon, rainwater seeps into the crack, reaching the steel reinforcement mesh. The steel rusts, expands, and pushes the concrete away (spalling). If left unchecked, large chunks of the concrete roof will eventually collapse inward."
        />
        
        <ProcessSteps title="Our Crack Inspection Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Thermal Expansion Cracks in Chennai</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Chennai experiences intense summer heat. Concrete slabs expand significantly during the day and contract at night. Without proper weathering course tiles or expansion joints, this constant movement creates horizontal cracks at the junction where the roof slab meets the brick wall. We provide targeted thermal mitigation solutions alongside structural repair.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Building Crack Inspection in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Audit Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Structural Audit', '/structural-audit-chennai'],
              ['Old Building Audit', '/old-building-structural-audit-chennai'],
              ['UPV Test', '/upv-test-chennai'],
              ['Rebar Scanning', '/rebar-scanning-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=audit" className="btn btn-primary btn-lg">Book an Engineer Inspection</Link>
        </div>
      </div>
    </main>
  );
}
