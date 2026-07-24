import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: 'Home Design Guide | Buildogram Resources',
  description: 'Floor planning, interior planning, elevation, vastu, lighting, and ventilation.',
  path: '/resources/home-design-guide',
});

export default function HomeDesignGuidePage() {
  return ( <>
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Guide</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Home Design & Planning Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Learn how to optimize space, lighting, and structural flow in your residential architecture projects.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <div className="card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontSize: '17px', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>1. Floor Planning & Space Optimization</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Good architecture starts with a sensible floor plan. Ensure minimal wasted space in corridors, adequate room dimensions, and strategic placement of wet areas (bathrooms and kitchens) to simplify plumbing lines.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>2. Lighting and Ventilation</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Maximize natural light and cross-ventilation. Proper placement of windows according to the sun path (North-South orientation) can drastically reduce your electricity bills and improve indoor air quality.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>3. Vastu Considerations</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>While not mandatory, Vastu Shastra principles are widely followed in Indian construction. Key considerations usually involve placing the entrance in the North or East, and the master bedroom in the South-West.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>4. Elevation & Interior Planning</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Modern elevations require careful selection of exterior finishes like HPL panels, louvers, or texture paint. Plan your interiors simultaneously with the structural design to ensure electrical points and AC ducts are placed correctly.</p>

            <div style={{ padding: '24px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '12px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Want a professional design review?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Let our experts review your floor plan for optimization.</p>
              <Link href="/plan-review" className="btn btn-primary">Request Plan Review</Link>
            </div>
          </div>
        </div>
      </section>
    </>
    <BreadcrumbSchema items={[{"name":"Home","path":"/"},{"name":"Resources","path":"/resources"},{"name":"Home Design Guide","path":"/resources/home-design-guide"}]} />
    </>
  );
}
