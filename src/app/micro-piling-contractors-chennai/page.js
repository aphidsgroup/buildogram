import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Micro Piling Contractors in Chennai | Foundation Retrofitting',
  description: 'Specialized micro piling in Chennai for underpinning existing buildings, tight-space foundations, and strengthening weak columns. Small rigs, massive load capacity.',
  path: '/micro-piling-contractors-chennai',
});

const STEPS = [
  { title: '1. Access & Rig Setup', desc: 'A very small, electric or hydraulic rotary drill rig is moved into the tight space—sometimes even inside an existing basement or living room.' },
  { title: '2. Casing Drilling', desc: 'A high-strength steel casing (typically 100mm to 300mm diameter) is drilled down through the soil and into the bedrock.' },
  { title: '3. Reinforcement Insertion', desc: 'Instead of a traditional rebar cage, a high-strength central steel rod (threaded bar) or a small cage is lowered into the center of the casing.' },
  { title: '4. Pressure Grouting', desc: 'Neat cement grout is pumped into the casing under high pressure. The grout permeates the surrounding soil, creating a high-friction bond between the pile and the earth.' },
  { title: '5. Load Transfer', desc: 'For underpinning, the new micro-pile is structurally connected to the existing building\'s footing or column using a steel bracket or reinforced concrete cap.' },
];

const DELIVERABLES = [
  'Micro Pile Layout Plan',
  'Grout Density & Pressure Logs',
  'Underpinning Bracket Installation',
  'Structural Strengthening Certification',
  'Load Test Verification'
];

const FAQS = [
  { question: 'What is Underpinning?', answer: 'Underpinning is the process of strengthening the foundation of an existing building. If your old house in Chennai is sinking or cracking because the original foundation was too weak, we install micro-piles next to the old footings to transfer the building\'s weight deep into the hard rock.' },
  { question: 'Why use Micro Piles instead of DMC piles?', answer: 'DMC tripods require at least 15 feet of vertical headroom to operate. Micro-piling rigs are extremely compact and can drill piles even in areas with only 8 feet of headroom—like inside an existing basement or underneath a staircase.' },
  { question: 'Can micro-piles support heavy loads?', answer: 'Yes. Despite their small diameter (often just 6 inches), micro-piles achieve massive load-bearing capacity by transferring weight through skin friction (from the high-pressure grout) rather than just resting on the bottom.' },
  { question: 'Is micro-piling expensive?', answer: 'Because it involves specialized high-strength steel, pressure grouting equipment, and operates in constrained spaces, micro-piling is generally more expensive per meter than standard DMC or rotary piling.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/pile-foundation-contractors-chennai" style={{ color: '#FC6E20' }}>Pile Foundation</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Micro Piling</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Micro Piling Contractors in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Save sinking buildings and build in impossible spaces. When you need to strengthen the foundation of an existing 30-year-old house, or build an elevator shaft where no heavy machinery can reach, our verified contractors execute high-strength micro-piling with surgical precision.
        </p>

        <AnswerBlock
          question="Can I add a floor to an old building if the foundation is weak?"
          answer="Yes, but only if you retrofit the foundation first. If a structural audit reveals that your old independent house's foundation cannot handle a second floor, you don't necessarily have to demolish it. We can drill micro-piles right next to your existing columns—even inside the house—and structurally bind them to the old foundation, increasing its load capacity."
        />
        
        <ProcessSteps title="Micro-Piling Execution" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Vibration-Free Installation</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            If you are doing construction right next to an old, fragile heritage building in Chennai, traditional percussion piling (dropping heavy weights) can cause seismic vibrations that crack the neighbor's walls. Micro-piling uses smooth rotary drilling, causing virtually zero vibration and keeping adjacent structures completely safe.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Micro Piling Contractors in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Foundation Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Old Building Audit', '/old-building-structural-audit-chennai'],
              ['Building Crack Inspection', '/building-crack-inspection-chennai'],
              ['Pile Foundation Contractors', '/pile-foundation-contractors-chennai'],
              ['DMC Piling', '/dmc-piling-contractors-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=piling" className="btn btn-primary btn-lg">Consult a Micro-Piling Expert</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Micro Piling Contractors in Chennai","path":"/micro-piling-contractors-chennai"}]} />
    </>
  );
}
