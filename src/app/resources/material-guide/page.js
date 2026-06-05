import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';

export const metadata = generateSEOMetadata({
title: 'Material Guide | Buildogram Resources',
  description: 'A comprehensive guide on cement, steel, sand, bricks, and finishing materials.',
  path: '/resources/material-guide',
});

export default function MaterialGuidePage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Guide</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Construction Material Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7, marginBottom: '32px' }}>Understand the different grades of cement, steel, sand, and finishing materials to ensure maximum structural integrity.</p>
        </div>
      </section>

      <section className="section" style={{ background: '#F8FAFC', minHeight: '60vh' }}>
        <div className="container">
          <div className="card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontSize: '17px', lineHeight: 1.8 }}>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>1. Cement & Steel (Primary Structures)</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Always insist on OPC 53 grade cement for structural elements (columns, slabs) and PPC for plastering. Use Fe500D or Fe550D TMT bars from primary manufacturers for optimal earthquake resistance.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>2. Bricks and Blocks</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Choose between traditional red clay bricks, fly ash bricks, or AAC blocks. AAC blocks provide excellent thermal insulation and are lightweight, reducing the dead load on the structure.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>3. Sand & Aggregates</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>M-Sand (Manufactured Sand) is the industry standard for concreting. Ensure it is double-washed to remove silt. P-Sand should be used strictly for plastering to achieve a smooth finish.</p>

            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>4. Finishing Materials</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Electrical wires should be FRLS (Fire Retardant Low Smoke). Plumbing pipes should be CPVC for hot water and UPVC for cold water lines to prevent scaling and pressure loss.</p>

            <div style={{ padding: '24px', background: 'rgba(252, 110, 32, 0.05)', borderRadius: '12px', border: '1px solid rgba(252, 110, 32, 0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Need material specifications for your home?</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>View our transparent material specification packages.</p>
              <Link href="/specifications" className="btn btn-primary">View Packages</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
