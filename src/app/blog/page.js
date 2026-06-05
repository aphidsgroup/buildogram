import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import sql from '@/lib/db';

export const metadata = generateSEOMetadata({
title: 'Construction Blog | Buildogram',
  description: 'Expert insights, cost guides, and structural engineering tips for home builders.',,
  path: '/blog',
});

// Next.js config to ensure the public blog page is dynamically rendered or revalidated
export const revalidate = 60; // revalidate every minute

export default async function Blog() {
  let posts = [];
  try {
    posts = await sql`SELECT * FROM blog_posts WHERE is_published=true ORDER BY created_at DESC`;
  } catch (err) {
    console.error('Failed to fetch blog posts:', err);
  }

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252, 110, 32, 0.07) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Buildogram Blog</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '760px' }}>Construction & Property Insights — Written by Engineers</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '640px', lineHeight: 1.7 }}>Expert articles on home construction, BOQ, material quality, property investment, and maintenance — written by our structural engineering team.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '56px 24px' }}>

        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No posts yet</h3>
            <p>Our engineers are busy writing new content. Check back soon!</p>
          </div>
        ) : (
          <div className="grid-3 mb-8">
            {posts.map(p => (
              <div key={p.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', background: 'var(--bg-card2)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                  🏗️
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="text-muted text-xs mb-2">{new Date(p.created_at).toLocaleDateString('en-IN')}</div>
                  <h3 style={{ fontSize: '18px', color: 'var(--primary-dark)', marginBottom: '12px' }}>{p.title}</h3>
                  <p className="text-muted text-sm mb-4" style={{ flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                  </p>
                  <Link href={`/blog/${p.slug}`} className="text-primary font-semibold text-sm">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
