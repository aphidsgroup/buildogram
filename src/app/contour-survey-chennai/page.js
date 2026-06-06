import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Contour Survey in Chennai | Sloped Land Measurement',
  description: 'Accurate contour surveys for sloped and uneven terrains in Chennai. We map elevation differences to optimize earthwork, drainage, and foundation design.',
  path: '/contour-survey-chennai',
});

const STEPS = [
  { title: '1. Benchmark Establishment', desc: 'We establish a Temporary Bench Mark (TBM) tied to Mean Sea Level (MSL) or a local fixed reference point (like an adjacent road).' },
  { title: '2. Grid Spot Heights', desc: 'Our surveyors take dense elevation readings at regular grid intervals using a Total Station or DGPS.' },
  { title: '3. Breakline Mapping', desc: 'We specifically map abrupt changes in elevation—such as ditches, embankments, retaining walls, and natural drains.' },
  { title: '4. Contour Generation', desc: 'The 3D point cloud data is processed in Civil 3D software to generate smooth contour lines at specified intervals (e.g., every 0.5 meters).' },
  { title: '5. Earthwork Estimation', desc: 'If required, we calculate the exact volume of soil that needs to be cut or filled to level the plot.' },
];

const DELIVERABLES = [
  'AutoCAD Contour Map (.dwg)',
  '3D Digital Elevation Model (DEM)',
  'Earthwork Cut & Fill Volume Report',
  'Drainage Flow Direction Map',
  'Cross-Sectional Profiles'
];

const FAQS = [
  { question: 'What is a Contour Line?', answer: 'A contour line is an imaginary line on a map that connects points of equal elevation. If contour lines are close together, the land is steep. If they are far apart, the land is relatively flat.' },
  { question: 'Why do I need a contour survey if my plot looks flat?', answer: 'To the naked eye, a large plot may look flat, but it could have a subtle 1-meter drop from front to back. If your architect doesn\'t know this, rainwater might drain towards your house instead of towards the street.' },
  { question: 'Can you calculate how many trucks of soil I need to fill my plot?', answer: 'Yes. Based on the contour survey, we can generate a Cut/Fill report that tells you exactly how many cubic meters of gravel or soil you need to buy to raise your plot to the desired road level.' },
  { question: 'Do you do contour surveys for large hilly terrains?', answer: 'Yes, for large agricultural lands, industrial parks, or hilly terrains (like near Pallavaram or St. Thomas Mount), we use DGPS and Drone photogrammetry to map massive areas quickly.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Contour Survey</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Contour Survey in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Master the slope of your land. From analyzing drainage patterns on large industrial plots in Oragadam to leveling residential sites in ECR, our precise contour surveys map the exact elevation differences across your property.
        </p>

        <AnswerBlock
          question="How does a Contour Survey save you money on Earthwork?"
          answer="Earthwork (cutting and filling soil) is incredibly expensive. If you blindly order truckloads of soil to level a plot, you will overspend. A contour survey creates a 3D model of your land and calculates the exact volume of soil needed to be moved. Often, the 'cut' from the high areas can be used to 'fill' the low areas, saving you lakhs in material transport costs."
        />
        
        <ProcessSteps title="Our Contour Mapping Process" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Solving Chennai's Drainage Issues</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            Chennai\'s flat coastal terrain makes natural water runoff difficult. If your factory or apartment complex is built without studying the natural contours, it will flood during the monsoon. Our surveys map the macro-drainage paths, allowing engineers to design effective stormwater drains that naturally guide water away from your structures.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Contour Survey in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Survey Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['Topographic Survey', '/topographic-survey-chennai'],
              ['Drone Survey', '/drone-survey-chennai'],
              ['Land Survey', '/land-survey-chennai'],
              ['Soil Testing', '/soil-testing-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a Contour Survey</Link>
        </div>
      </div>
    </main>
  );
}
