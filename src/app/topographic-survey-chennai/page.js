import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Topographic Survey in Chennai | Precision Plot Measurement',
  description: 'Detailed topographic surveys in Chennai using Total Station and DGPS. We map boundaries, elevations, trees, and existing structures for accurate architectural planning.',
  path: '/topographic-survey-chennai',
});

const STEPS = [
  { title: '1. Reconnaissance & Planning', desc: 'Our surveyors inspect the site to locate government benchmarks (GCPs) and plan the optimal placement of Total Station equipment for maximum coverage.' },
  { title: '2. Boundary & Elevation Plotting', desc: 'We systematically measure the plot boundary, calculating the exact X, Y, and Z (elevation) coordinates for hundreds of points across the site.' },
  { title: '3. Feature Mapping', desc: 'Every physical feature—existing trees, borewells, TNEB poles, compound walls, and adjacent road levels—is mapped to the millimeter.' },
  { title: '4. Data Processing', desc: 'The raw coordinate data is imported into AutoCAD and Civil 3D to create accurate contours and surface models.' },
  { title: '5. Architect-Ready Delivery', desc: 'We deliver layered .dwg files directly to your architect, ensuring they have a perfect digital replica of your physical site.' },
];

const DELIVERABLES = [
  'AutoCAD (.dwg) Topographic Map',
  'Elevation & Contour Lines',
  'Existing Utility & Feature Map',
  'Road Level vs Plot Level Analysis',
  'Precise Area Calculation Report'
];

const FAQS = [
  { question: 'What is the difference between a boundary survey and a topographic survey?', answer: 'A boundary survey only marks the outer property lines. A topographic survey maps the entire inside of the plot, including the elevation (slope) of the land, trees, manholes, and the exact height of the adjacent road.' },
  { question: 'Why does my architect need a topographic survey?', answer: 'Architects need to know the plot\'s slope to design the foundation, drainage, and stilt parking ramps. They also need to know the exact road level to ensure your ground floor isn\'t flooded during Chennai monsoons.' },
  { question: 'Do you map underground utilities?', answer: 'A standard topographic survey maps visible surface features (manhole covers, electrical poles). For mapping buried pipelines or cables, we utilize specialized Ground Penetrating Radar (GPR).' },
  { question: 'How long does it take?', answer: 'Fieldwork for a standard 2-ground residential plot in Chennai takes about half a day. The processed AutoCAD drawing is typically delivered within 24 to 48 hours.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Topographic Survey</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Topographic Survey in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Give your architect the perfect blank canvas. Whether you are building a villa in ECR or a commercial complex in Guindy, our millimeter-accurate topographic surveys map out every contour, tree, and utility on your land, preventing costly redesigns later.
        </p>

        <AnswerBlock
          question="Why is measuring the Road Level critical in Chennai?"
          answer="During the 2015 and 2023 Chennai floods, thousands of homes flooded because their plinth (ground floor) level was lower than the street. Over time, the Chennai Corporation relays roads, constantly raising the street level. A topographic survey accurately measures the current road elevation so your architect can design your parking and ground floor high enough to prevent waterlogging."
        />
        
        <ProcessSteps title="Our Topo Survey Methodology" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Protecting Existing Trees</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Want to build your home around a beautiful 50-year-old mango tree? We map the exact trunk location and canopy spread of every significant tree on your plot. This allows your architect to design the building footprint to weave around nature, rather than cutting it down.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Topographic Survey in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Survey Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Land Survey', '/land-survey-chennai'],
              ['Contour Survey', '/contour-survey-chennai'],
              ['Total Station Survey', '/total-station-survey-chennai'],
              ['DGPS Survey', '/dgps-survey-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a Topo Survey</Link>
        </div>
      </div>
    </main>
  );
}
