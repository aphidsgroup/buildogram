import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { comparisons } from '@/data/seo/comparisons';

export const metadata = generateSEOMetadata({
title: 'Compare | Buildogram',
  description: 'Compare Buildogram services, approaches, and tools side-by-side. Make informed decisions for your home construction and property journey.',,
  path: '/compare',
});

export default function CompareHub() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>
            Compare Construction & Property Approaches
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '540px', lineHeight: 1.7 }}>
            Side-by-side comparisons to help you make better-informed decisions about your home construction and property journey.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="grid-2" style={{ gap: '20px' }}>
          {comparisons.map((comp) => (
            <Link key={comp.slug} href={`/compare/${comp.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-hover">
                <h2 style={{ fontSize: '17px', color: 'var(--secondary)', marginBottom: '10px', lineHeight: 1.4 }}>{comp.title}</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{comp.intro.slice(0, 120)}…</p>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>View comparison →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
