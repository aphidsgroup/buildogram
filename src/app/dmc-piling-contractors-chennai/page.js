import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'DMC Piling Contractors in Chennai | Tripod Piling for Small Plots',
  description: 'Verified DMC (Direct Mud Circulation) piling contractors in Chennai. Ideal for narrow streets and independent residential houses. Safe, engineer-supervised execution.',
  path: '/dmc-piling-contractors-chennai',
});

const STEPS = [
  { title: '1. Tripod Erection', desc: 'A vertical tripod rig is manually erected over the surveyed pile center point. Its compact size allows it to operate even in extremely narrow plots.' },
  { title: '2. Drilling & Mud Circulation', desc: 'A heavy chisel is dropped repeatedly to break the soil. Simultaneously, bentonite slurry is pumped down to flush out the debris and prevent the borehole walls from collapsing.' },
  { title: '3. Hard Strata Verification', desc: 'The chisel hits hard rock. A Buildogram engineer physically inspects the extracted rock samples to confirm it meets the structural engineer\'s depth requirement.' },
  { title: '4. Rebar Cage Lowering', desc: 'A pre-fabricated circular TMT steel cage (with concrete cover blocks attached) is carefully lowered into the borehole.' },
  { title: '5. Tremie Concreting', desc: 'A tremie pipe is lowered to the bottom. Concrete is poured through the pipe, displacing the lighter bentonite slurry upwards, ensuring a solid, void-free concrete pile.' },
];

const DELIVERABLES = [
  'Engineer-Verified Pile Depth Log',
  'Bentonite Density Check Records',
  'Slump Test & Concrete Cube Results',
  'Photographic Evidence of Rebar Lowering',
  'Post-Curing Pile Integrity Test (PIT)'
];

const FAQS = [
  { question: 'Why is DMC piling so common for houses in Chennai?', answer: 'Many residential plots in Chennai (like in T-Nagar, Triplicane, or Mylapore) are situated on narrow 20-foot streets where heavy truck-mounted rotary rigs simply cannot enter. A DMC tripod rig can be dismantled, carried inside manually, and assembled in very tight spaces.' },
  { question: 'Is DMC piling slower than Rotary piling?', answer: 'Yes. DMC piling is a manual, percussion-based method. It usually completes 1 to 1.5 piles a day. Rotary piling can complete 4 to 5 piles a day, but requires massive space and access roads.' },
  { question: 'What is the biggest risk with DMC piling?', answer: 'Borehole collapse and soil mixing. If the bentonite slurry isn\'t mixed at the correct density, the wet soil walls collapse into the hole while pouring concrete, resulting in a structurally weak "mixed" pile. Our engineers constantly monitor the bentonite density to prevent this.' },
  { question: 'How much does DMC piling cost in Chennai?', answer: 'Rates vary based on the pile diameter (e.g., 400mm or 600mm) and soil strata. The drilling labor usually costs ₹1,000 to ₹1,500 per meter, while steel and RMC concrete are billed as per actual consumption.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/pile-foundation-contractors-chennai" style={{ color: '#FC6E20' }}>Pile Foundation</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>DMC Piling</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>DMC Piling Contractors in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Building a house in a narrow Chennai street with poor soil? Direct Mud Circulation (DMC) piling is the solution. Our verified contractors use compact tripod rigs that fit anywhere, while our on-site engineers ensure the concrete is poured flawlessly without soil contamination.
        </p>

        <AnswerBlock
          question="Why do you need an Engineer supervising your DMC piling contractor?"
          answer="DMC contractors are paid per meter of drilling. A common malpractice is to stop drilling the moment they hit the first hard layer (to save labor time), even if it's just an isolated boulder and not the actual bedrock. A Buildogram engineer stays on site to verify the strata and ensure the drilling reaches the required depth mandated by the structural design."
        />
        
        <ProcessSteps title="The DMC Piling Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>The Tremie Pipe Rule</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Never let a contractor pour concrete directly into a flooded pile hole from the top. The concrete will separate, and the cement will wash away, leaving only loose stones at the bottom. Our engineers mandate the strict use of a <strong>Tremie Pipe</strong>—a funnel system that deposits concrete at the very bottom of the hole, pushing water and bentonite up and out, ensuring a solid structural column.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="DMC Piling in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Piling Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Pile Foundation Contractors', '/pile-foundation-contractors-chennai'],
              ['Bored Cast-In-Situ', '/bored-cast-in-situ-piles-chennai'],
              ['Micro Piling', '/micro-piling-contractors-chennai'],
              ['Pile Integrity Test', '/pile-integrity-test-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=piling" className="btn btn-primary btn-lg">Get a DMC Piling Quote</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"DMC Piling Contractors in Chennai","path":"/dmc-piling-contractors-chennai"}]} />
    </>
  );
}
