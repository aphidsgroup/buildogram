import { generateSEOMetadata } from '@/components/seo/generateSEOMetadata';
import AnswerBlock from '@/components/seo/AnswerBlock';
import EntitySummary from '@/components/seo/EntitySummary';
import ProcessSteps from '@/components/seo/ProcessSteps';
import FAQBlock from '@/components/seo/FAQBlock';
import LocalIntentBlock from '@/components/seo/LocalIntentBlock';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
  title: 'Drone Survey in Chennai | Aerial Photogrammetry Mapping',
  description: 'Fast, high-resolution Drone Surveys in Chennai. Perfect for large layouts, mining, and industrial plots. We deliver orthomosaic maps and 3D terrain models.',
  path: '/drone-survey-chennai',
});

const STEPS = [
  { title: '1. Flight Planning & Permissions', desc: 'We plot the automated flight path in our drone software and ensure all necessary civil aviation (DGCA) permissions are clear for the Chennai location.' },
  { title: '2. Ground Control Points (GCP)', desc: 'Before flying, we physically place marked GCP targets on the ground and record their exact coordinates using DGPS to ensure centimeter-level global accuracy.' },
  { title: '3. Automated Drone Flight', desc: 'The UAV flies over the property in a grid pattern, capturing hundreds of high-resolution overlapping photographs from a set altitude.' },
  { title: '4. Photogrammetry Processing', desc: 'Using advanced software, the overlapping images are stitched together into a massive, highly detailed 3D map (Orthomosaic).' },
  { title: '5. Digital Delivery', desc: 'We deliver ultra-HD orthomosaic maps, 3D Digital Elevation Models (DEM), and contour maps for engineering use.' },
];

const DELIVERABLES = [
  'High-Resolution Orthomosaic Map (Geo-referenced)',
  '3D Digital Elevation Model (DEM)',
  'Contour Map (.dwg format)',
  'Volumetric Analysis (Cut & Fill)',
  'High-Definition Aerial Video/Photos'
];

const FAQS = [
  { question: 'When should I choose a Drone Survey over a Total Station?', answer: 'Drone surveys are incredibly fast and cost-effective for very large areas (10 acres to 500+ acres). If you need to survey a massive plot in Oragadam or a large quarry, a drone can do in hours what would take weeks for a ground crew.' },
  { question: 'Is the data accurate enough for construction?', answer: 'Yes, provided we use Ground Control Points (GCPs). By anchoring the drone\'s images to highly accurate DGPS ground markers, we achieve centimeter-level accuracy, suitable for layout planning and earthwork calculations.' },
  { question: 'Can drones see through trees?', answer: 'No. Standard drone cameras (photogrammetry) cannot see the ground through dense tree canopies. For heavily forested land, we use LiDAR-equipped drones which shoot lasers through the leaves to map the terrain below.' },
  { question: 'Do I need police permission to fly?', answer: 'Drone flights in certain "Red Zones" in Chennai (near the airport, military bases, or port) are strictly restricted. Our certified pilots manage the Digital Sky portal clearances before flying.' },
];

export default function Page() {
  return (
    <main className="page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="sectionInner">
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#64748B' }}>
          <Link href="/" style={{ color: '#FC6E20' }}>Home</Link> / <Link href="/land-survey-chennai" style={{ color: '#FC6E20' }}>Survey & Piling</Link> / <span style={{ color: '#0F172A', fontWeight: 600 }}>Drone Survey</span>
        </div>
        
        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', marginBottom: '24px' }}>Drone Survey & Photogrammetry in Chennai</h1>
        <p style={{ fontSize: '18px', color: '#374151', lineHeight: 1.6, marginBottom: '32px' }}>
          Map hundreds of acres in a single day. For large real estate layouts, industrial mega-sites, and volumetric analysis of stockpiles, our commercial Drone Surveys provide stunning visual orthomosaics backed by centimeter-accurate engineering data.
        </p>

        <AnswerBlock
          question="Why use a Drone for Volumetric Calculation (Earthwork)?"
          answer="If you are excavating a massive basement or filling a large swampy plot in Chennai, you pay the earth-mover based on the volume of soil moved (cubic meters). A drone creates a perfect 3D digital replica of your site before and after the work. Software calculates the exact difference in volume, ensuring the contractor bills you accurately, down to the last truckload."
        />
        
        <ProcessSteps title="How Aerial Mapping Works" steps={STEPS} />
        
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
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Perfect for Real Estate Developers</h3>
          <p style={{ color: '#374151', lineHeight: 1.6 }}>
            If you are launching a new plot layout near Tambaram or OMR, an orthomosaic map is a powerful sales tool. It provides a real, high-resolution Google-Earth-style top-down view of your property, allowing buyers to see the exact plot boundaries, nearby roads, and current development progress from their screen.
          </p>
        </div>

        <FAQBlock title="Frequently Asked Questions" faqs={FAQS} />
        
        <EntitySummary serviceName="Drone Survey in Chennai" />
        <LocalIntentBlock />
        
        <div style={{ marginTop: '40px', padding: '24px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FED7AA' }}>
          <p style={{ fontWeight: 700, color: '#FC6E20', marginBottom: '12px' }}>Related Survey Services</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {[
              ['DGPS Survey', '/dgps-survey-chennai'],
              ['Contour Survey', '/contour-survey-chennai'],
              ['Topographic Survey', '/topographic-survey-chennai'],
              ['Land Survey', '/land-survey-chennai'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ padding: '8px 16px', background: 'white', border: '1px solid #FED7AA', borderRadius: '100px', color: '#374151', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href="/contact?type=survey" className="btn btn-primary btn-lg">Book a Drone Survey</Link>
        </div>
      </div>
    </main>
  );
}
