import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Total Station Survey in Chennai | Millimeter Accurate Land Measurement',
  description: 'Precision Total Station surveying in Chennai. Ideal for urban plots, boundary disputes, and architect layout marking. We deliver accurate CAD drawings matched to FMB.',
  path: '/total-station-survey-chennai',
});

const STEPS = [
  { title: '1. Instrument Setup', desc: 'The Total Station is set up on a tripod over a known reference point. The instrument is perfectly leveled using built-in electronic bubbles.' },
  { title: '2. Prism Targeting', desc: 'An assistant holds a reflector prism on the boundary corners, plot edges, or building columns that need to be measured.' },
  { title: '3. Laser Measurement', desc: 'The Total Station shoots a laser to the prism. It calculates the exact distance and angle (horizontal and vertical) with millimeter precision.' },
  { title: '4. Internal Data Logging', desc: 'All points are saved instantly in the instrument\'s memory, eliminating human error from writing down measurements manually.' },
  { title: '5. CAD Drafting', desc: 'The digital point cloud is downloaded to our computers and connected to create a perfect, scaled AutoCAD drawing of your plot.' },
];

const DELIVERABLES = [
  'AutoCAD Plot Drawing (.dwg)',
  'Precise Area Calculation (Sq.ft & Cents)',
  'Diagonal Measurements for Architects',
  'Boundary Encroachment Report',
  'FMB Sketch Superimposition'
];

const FAQS = [
  { question: 'Why use a Total Station instead of a standard measuring tape?', answer: 'Measuring tape stretches, sags, and cannot measure angles. If your plot is shaped like a rhombus but you assume it\'s a rectangle based on tape measurements, your area calculation will be completely wrong. A Total Station uses lasers to measure the exact angles and diagonals, ensuring mathematical perfection.' },
  { question: 'Can it be used in crowded Chennai streets?', answer: 'Yes. Total Station is the preferred tool for dense urban areas like T-Nagar, Mylapore, or Anna Nagar. Unlike DGPS, it doesn\'t need to see the sky—it only needs a clear line of sight to the prism.' },
  { question: 'How do you check if my neighbor encroached on my land?', answer: 'We measure your physical boundary using the Total Station and import it into AutoCAD. We then digitally overlay the government FMB sketch on top of our drawing. Any mismatch instantly highlights the exact square footage of encroachment.' },
  { question: 'Do you provide boundary stones?', point: 'Yes, after establishing the true boundary corners, we can permanently fix concrete boundary stones so the points are not lost during construction.' },
];

export default function Page() {
  return ( <>
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Total Station Survey</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Total Station Surveying in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Get the ultimate mathematical truth about your land. The Total Station is the industry standard for urban land surveying. Whether you are dividing an ancestral property, fighting a boundary dispute, or preparing land for an apartment complex in Chennai, we provide millimeter-accurate measurements.
        </p>

        <AnswerBlock
          question="Why do Architects demand Total Station drawings?"
          answer="An architect cannot design a 4-story building on a piece of paper that says 'approx 30x40 feet'. If the land is skewed by even 2 degrees, the columns they design will fall into the neighbor's property or the setbacks won't meet CMDA rules. A Total Station drawing gives the architect the exact, to-scale digital canvas they need to design safely and legally."
        />
        
        <ProcessSteps title="How We Survey Your Plot" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Construction Layout Marking</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            The Total Station isn't just for measuring; it's also used for 'setting out'. Once your architect finalizes the building plan, we bring the Total Station back to the site. We digitally upload the AutoCAD file into the instrument, and it uses lasers to mark the exact center point of every column and footing on the physical ground, ensuring the building is erected flawlessly.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Total Station Survey in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Survey Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Construction Layout Marking', '/construction-layout-marking-chennai'],
              ['Land Survey', '/land-survey-chennai'],
              ['Topographic Survey', '/topographic-survey-chennai'],
              ['DGPS Survey', '/dgps-survey-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a Total Station Survey</Link>
        </div>
      </div>
    </main>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Total Station Survey in Chennai","path":"/total-station-survey-chennai"}]} />
    </>
  );
}
