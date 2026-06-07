import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Waterproofing Materials & Chemicals in Chennai | Roof & Basement',
  description: 'Top-grade waterproofing chemicals, membranes, and coatings in Chennai. Stop terrace leaks, basement seepage, and bathroom dampness permanently.',
  path: '/materials/waterproofing',
});

const STEPS = [
  { title: '1. Surface Diagnosis', desc: 'Waterproofing is not one-size-fits-all. We analyze whether the leak is caused by capillary action (damp walls), hydrostatic pressure (basements), or thermal cracks (roofs).' },
  { title: '2. Material Selection', desc: 'Based on the diagnosis, we supply the right material: Liquid Applied Polyurethane (PU) for exposed roofs, Crystalline Admixtures for basements, or Polymer Modified Cementitious coatings for bathrooms.' },
  { title: '3. Surface Preparation', desc: 'No chemical works on a dirty surface. We ensure the concrete is wire-brushed, cleaned, and free of laitance or old peeling paint before application.' },
  { title: '4. Multi-Coat Application', desc: 'Waterproofing is always applied in multiple perpendicular coats (primer + base + top coat) to ensure a seamless, pinhole-free membrane.' },
];

const DELIVERABLES = [
  'Leak Root-Cause Diagnosis',
  'Waterproofing Material Supply (PU, Cementitious, Acrylic)',
  'Application Methodology Guidelines',
  'Post-Application Ponding Test',
  'Warranty Certificates (from Manufacturer)'
];

const FAQS = [
  { question: 'Why does my roof leak every monsoon in Chennai?', answer: 'Chennai\'s extreme summer heat causes the roof slab to expand, creating micro-cracks. When the intense North-East monsoon hits, water pools on the flat roof and seeps through these cracks. Standard cement plaster cannot stop this; you need an elastomeric (stretchy) waterproofing membrane.' },
  { question: 'What is a Ponding Test?', answer: 'After the waterproofing chemical has cured, we block the drain pipes and flood the bathroom or roof with 2 inches of water for 48 hours. If the ceiling below remains dry, the waterproofing has passed the test.' },
  { question: 'Can I just paint over a damp wall?', answer: 'No. Dampness (efflorescence) is caused by water pushing out from inside the brick. Paint will just bubble and peel off within weeks. You must treat the negative-side water pressure using crystalline waterproofing chemicals before painting.' },
  { question: 'Are APP membranes (tar sheets) good for roofs?', answer: 'APP bitumen membranes are cheap but they often fail at the overlaps (joints) as they age and bake in the Chennai sun. Liquid-applied PU membranes are highly superior because they form a seamless, joint-free rubber-like sheet over the entire roof.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/materials" style={{ color: '#FC6E20' }}>Materials</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Waterproofing</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Waterproofing Materials & Chemicals in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Stop water before it destroys your steel. From high-tech crystalline admixtures for deep basements to UV-resistant polyurethane coatings for sun-baked terraces, we supply the exact chemistry needed to keep your Chennai property bone-dry.
        </p>

        <AnswerBlock
          question="The Danger of 'Waterproof Paint'"
          answer="Many homeowners are tricked into buying expensive 'waterproof exterior paint' to fix severe roof leaks. Paint is decorative; it is too thin to bridge structural cracks. True waterproofing requires high-build elastomeric chemicals (like PU or acrylic polymers) that stretch up to 200% when the building moves, keeping the cracks permanently sealed."
        />
        
        <ProcessSteps title="Waterproofing Solutions" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Sunken Bathrooms: The Silent Destroyer</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            In apartments, bathrooms are often built 'sunken' to hide the plumbing pipes, then filled with cinder or soil. If the sunken slab isn't aggressively waterproofed with cementitious slurry, water from the shower leaks into this soil, rots the building, and drips onto your downstairs neighbor's ceiling. This is the #1 cause of neighbor disputes in Chennai.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Waterproofing Materials in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Building Materials</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Cement', '/materials/cement'],
              ['RMC', '/materials/rmc'],
              ['Plumbing Materials', '/materials/plumbing'],
              ['TMT Steel', '/materials/tmt-steel'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=materials" className="btn btn-primary btn-lg">Get Waterproofing Advice</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Materials","path":"/materials"},{"name":"Waterproofing Materials & Chemicals in Chennai","path":"/materials/waterproofing"}]} />
    </>
  );
}
