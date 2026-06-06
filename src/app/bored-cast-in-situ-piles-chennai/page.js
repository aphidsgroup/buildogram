import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Bored Cast-In-Situ Piles Chennai | Heavy Rotary Rig Piling',
  description: 'Fast, high-capacity Bored Cast-in-Situ piling for commercial buildings and apartments in Chennai. Executed using hydraulic rotary rigs under expert supervision.',
  path: '/bored-cast-in-situ-piles-chennai',
});

const STEPS = [
  { title: '1. Rotary Drilling', desc: 'A heavy truck or crawler-mounted hydraulic rotary rig uses an auger or drilling bucket to rapidly cut through the soil and rock to the designed depth.' },
  { title: '2. Temporary Casing', desc: 'In loose sandy soils (like ECR/OMR), a temporary steel casing is driven into the top layer of the borehole to prevent the walls from caving in.' },
  { title: '3. Borehole Cleaning', desc: 'Once the hard strata is reached, the bottom of the pile is thoroughly cleaned to remove loose muck that could compromise the bearing capacity.' },
  { title: '4. Steel Cage Installation', desc: 'A heavy-duty reinforcement cage is lowered using a crane into the clean borehole.' },
  { title: '5. High-Volume Concreting', desc: 'Ready Mix Concrete (RMC) is pumped rapidly via a tremie pipe. As the concrete fills the hole, the temporary steel casing is slowly extracted.' },
];

const DELIVERABLES = [
  'Rotary Drilling Depth Logs',
  'Strata Verification Report',
  'Concrete Slump & Compressive Strength Data',
  'Pile Integrity Test (PIT) Report',
  'Pile Load Capacity Certification'
];

const FAQS = [
  { question: 'What is the main advantage of Rotary Bored Cast-in-Situ piling?', answer: 'Speed and capacity. A rotary rig can bore through hard rock rapidly and create large diameter piles (up to 1200mm+) that can support massive multi-story commercial buildings or apartments.' },
  { question: 'Why can\'t I use this for my independent house?', answer: 'You can, provided you have a wide access road (at least 30-40 feet wide) and no low-hanging electrical wires. The equipment is massive and requires significant clearance to operate, making it unsuitable for tight Chennai streets.' },
  { question: 'How is the soil collapse prevented without Bentonite?', answer: 'While bentonite is sometimes used, rotary rigs often rely on driving a temporary steel casing (a large steel pipe) into the ground. The drilling happens inside this pipe, completely preventing the surrounding soil from collapsing in.' },
  { question: 'Is the concrete poured manually?', answer: 'No. Due to the massive volume required, Bored Cast-in-Situ piles are always filled using continuous pumping from Ready Mix Concrete (RMC) transit mixers via a tremie pipe.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/pile-foundation-contractors-chennai" style={{ color: '#FC6E20' }}>Pile Foundation</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Bored Cast-In-Situ Piling</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Bored Cast-In-Situ Piling in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Build massive structures on challenging soil. For large-scale apartments in Pallikaranai, IT Parks in OMR, or commercial complexes requiring deep, high-capacity foundations, our verified contractors deploy heavy hydraulic rotary rigs for rapid, precision bored piling.
        </p>

        <AnswerBlock
          question="Why is Borehole Cleaning critical before concreting?"
          answer="When a rotary rig drills, loose soil and rock fragments (muck) fall to the bottom of the hole. If concrete is poured over this muck, the pile will sit on a spongy layer of mud instead of hard rock, severely reducing its 'End Bearing' capacity. Our engineers ensure the pile bottom is thoroughly flushed and cleaned before the rebar cage is lowered."
        />
        
        <ProcessSteps title="Rotary Piling Execution" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Managing High Water Tables</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            In coastal areas of Chennai, the water table can be as high as 1 meter below ground level. Rotary bored piling with temporary steel casings is highly effective here. The casing seals off the groundwater from rushing into the hole, allowing the tremie concrete to be poured without being diluted or washed away by underwater currents.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Bored Cast-In-Situ Piles in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Piling Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Pile Foundation Contractors', '/pile-foundation-contractors-chennai'],
              ['DMC Piling', '/dmc-piling-contractors-chennai'],
              ['Dynamic Pile Load Test', '/dynamic-pile-load-test-chennai'],
              ['Pile Integrity Test', '/pile-integrity-test-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=piling" className="btn btn-primary btn-lg">Get a Rotary Piling Quote</Link>
        </div>
      </div>
    </main>
  );
}
