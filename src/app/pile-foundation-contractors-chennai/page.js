import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Pile Foundation Contractors in Chennai | Bored, DMC & Micro Piling',
  description: 'Verified pile foundation contractors in Chennai. We execute Bored Cast-in-Situ, DMC piling, and Micro-piling with strict engineer supervision and load testing.',
  path: '/pile-foundation-contractors-chennai',
});

const STEPS = [
  { title: '1. Geotechnical Analysis', desc: 'Our structural engineers review your soil test report (SBC) to determine the exact pile diameter, depth to hard strata, and pile grid layout.' },
  { title: '2. Method Selection', desc: 'Depending on site access and soil type (clay vs sandy), we select the right rig—DMC tripod for tight spaces or rotary rigs for large commercial plots.' },
  { title: '3. Boring & Bentonite Slurry', desc: 'Drilling commences. For collapsible soil (common in Chennai coastal areas), we pump bentonite slurry to stabilize the borehole walls.' },
  { title: '4. Rebar & Concreting', desc: 'The customized Fe500D rebar cage is lowered. Concrete is pumped through a tremie pipe from bottom to top, displacing the bentonite.' },
  { title: '5. Pile Load & Integrity Testing', desc: 'After curing, we conduct Pile Integrity Tests (PIT) or Static Load Tests to physically prove the load-bearing capacity before superstructure work begins.' },
];

const DELIVERABLES = [
  'Engineer-Verified Pile Layout Execution',
  'Daily Boring Depth Logs',
  'Concrete Slump & Cube Test Reports',
  'Pile Integrity Test (PIT) Certificate',
  'Static / Dynamic Load Test Report'
];

const FAQS = [
  { question: 'When is a pile foundation required in Chennai?', answer: 'Piling is required when the soil\'s Safe Bearing Capacity (SBC) is extremely low near the surface. This is very common in marshy areas like Velachery, Pallikaranai, Madipakkam, and sandy coastal belts like ECR/OMR.' },
  { question: 'What is the difference between DMC and Rotary Piling?', answer: 'DMC (Direct Mud Circulation) uses a tripod rig that takes up very little space, perfect for narrow residential streets in Chennai. Rotary piling uses a heavy truck-mounted rig which is much faster but requires large site access.' },
  { question: 'How do I know the contractor drilled to the correct depth?', answer: 'In unmonitored sites, contractors often pour concrete before hitting hard rock to save time. Buildogram assigns a site engineer to personally verify the depth of the borehole and the nature of the rock strata before authorizing the concrete pour.' },
  { question: 'What is the average cost of piling in Chennai?', answer: 'Cost varies by diameter (e.g., 400mm, 600mm) and depth (e.g., 15m, 20m). Generally, DMC piling starts around ₹1,000 - ₹1,500 per running meter excluding steel and concrete. We provide transparent, itemized BOQs for exact costings.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/pile-foundation-contractors-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Pile Foundation</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Engineer-Supervised Pile Foundation in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Poor piling execution guarantees building settlement. Buildogram provides verified pile foundation contractors in Chennai backed by strict engineering supervision. Whether you need DMC tripod piling for a narrow residential plot or heavy rotary bored cast-in-situ piles for an apartment complex, we ensure every pile rests on solid rock.
        </p>

        <AnswerBlock
          question="Why does piling require strict engineer supervision?"
          answer="Piling happens completely underground. Once concrete is poured, you cannot see if the rebar cage shifted, if the borehole collapsed, or if the contractor stopped drilling 5 meters short of the hard rock layer. A Buildogram engineer verifies the bore depth, the bentonite density, and the tremie concrete pour to ensure zero defects."
        />
        
        <ProcessSteps title="Our Piling Execution Methodology" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Piling Types for Chennai's Geology</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            <strong>1. DMC (Direct Mud Circulation):</strong> The most common choice for Chennai's independent houses. It requires minimal space and can easily operate in congested areas like T-Nagar or Triplicane.<br/><br/>
            <strong>2. Bored Cast-in-Situ (Rotary):</strong> Best for OMR/ECR commercial projects or apartments where speed is critical and the site is spacious.<br/><br/>
            <strong>3. Micro-piling:</strong> Used when reinforcing existing foundations or in areas with severe height restrictions where a standard rig cannot stand.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Pile Foundation Contractors in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Soil Investigation', '/soil-investigation-chennai'],
              ['Pile Integrity Testing', '/pile-integrity-test-chennai'],
              ['Dynamic Pile Load Test', '/dynamic-pile-load-test-chennai'],
              ['Bored Cast-In-Situ', '/bored-cast-in-situ-piles-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=piling" className="btn btn-primary btn-lg">Request a Piling Quote</Link>
        </div>
      </div>
    </main>
  );
}
