import Link from 'next/link';
import sql from '@/lib/db';

export const metadata = {
  title: 'Construction Blog | Buildogram',
  description: 'Expert insights, cost guides, and structural engineering tips for home builders.',
};

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
            <div className="page" style={{ paddingTop: '40px', minHeight: '100vh' }}>
      <div className="container">
        <div className="page-header text-center" style={{ border: 'none', marginBottom: '60px' }}>
          <div className="tag mb-4">Insights & Guides</div>
          <h1 style={{ fontSize: '48px', color: 'var(--primary-dark)' }}>Buildogram Blog</h1>
          <p className="text-muted mt-4" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>
            Expert advice on home construction, material costs, and structural engineering.
          </p>
        </div>

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
    </div>
    </>
  );
}
