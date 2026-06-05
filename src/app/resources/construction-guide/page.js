import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: 'Construction Guide | Buildogram Resources',
  description: 'Educational guide for home construction process, approvals, budgeting, and execution.',,
  path: '/resources/construction-guide',
});

export default function ConstructionGuidePage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Guide</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>The Ultimate Home Construction Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>A complete step-by-step educational guide to planning, approving, budgeting, and executing your home construction project.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <div className="card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontSize: '17px', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>1. Planning and Budgeting</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Before laying the first brick, it is critical to outline your budget. Use a Cost Estimator to get a rough idea, but always demand a detailed Bill of Quantities (BOQ) from your contractor to prevent hidden costs.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>2. Approvals and Legalities</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Ensure you have all necessary local body approvals (CMDA, DTCP, etc.) before commencing work. Building without approval can lead to severe penalties or demolition.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>3. Hiring the Right Team</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Choose between a Turnkey Contractor or a Project Management Consultant (PMC). Always verify past projects, check engineering credentials, and sign a clear contract locking in material brands.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>4. Execution and Quality Checks</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Construction happens in phases: Foundation, Framing (Superstructure), Masonry, MEP (Mechanical, Electrical, Plumbing), and Finishing. Ensure 500+ quality checks are performed across these stages.</p>

            <div style={{ padding: '24px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '12px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Ready to start building?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Let Buildogram handle the engineering and execution for you.</p>
              <Link href="/contact" className="btn btn-primary">Talk to an Engineer</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
