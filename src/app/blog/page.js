import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQBlock from '@/components/seo/FAQBlock';

export const metadata = generateSEOMetadata({
  title: 'Construction Blog | Expert Insights & Articles | Buildogram',
  description: 'Expert articles on home construction, BOQ, material quality, structural audits and property investment in Chennai — written by Buildogram structural engineers.',
  path: '/blog',
});

const DEMO_POSTS = [
  {
    id: 'demo-1',
    title: 'How Much Does It Cost to Build a House in Chennai in 2025?',
    slug: 'cost-build-house-chennai-2025',
    category: 'Construction',
    categoryColor: '#FC6E20',
    date: 'June 2025',
    readTime: '8 min read',
    excerpt: 'A detailed breakdown of Chennai home construction costs per sqft — covering basic, standard, and premium quality builds. Plus 12 hidden cost factors most contractors don\'t mention in their initial quote.',
    tags: ['BOQ', 'Chennai', 'Cost'],
  },
  {
    id: 'demo-2',
    title: 'M-Sand vs River Sand — What Chennai Builders Need to Know',
    slug: 'msand-vs-river-sand-chennai',
    category: 'Materials',
    categoryColor: '#3B82F6',
    date: 'May 2025',
    readTime: '6 min read',
    excerpt: 'As river sand becomes scarce and expensive, M-sand is the recommended alternative. But quality varies significantly by quarry and crusher. Here is what to check before accepting a delivery on your site.',
    tags: ['M-Sand', 'Materials', 'Quality'],
  },
  {
    id: 'demo-3',
    title: '7 Warning Signs Your Building Needs a Structural Audit Now',
    slug: 'structural-audit-warning-signs',
    category: 'Structural',
    categoryColor: '#10B981',
    date: 'April 2025',
    readTime: '5 min read',
    excerpt: 'From hairline cracks to exposed rusting rebar and floor vibrations — these are the seven signs our structural engineers say you should never ignore. Catching them early can save 10× the repair cost.',
    tags: ['Structural Audit', 'Safety', 'NDT'],
  },
  {
    id: 'demo-4',
    title: 'Understanding BOQ: Why Your Contractor Quote Is Probably Wrong',
    slug: 'understanding-boq-contractor-quote',
    category: 'BOQ',
    categoryColor: '#8B5CF6',
    date: 'March 2025',
    readTime: '7 min read',
    excerpt: 'Most contractor quotes omit 8–12 critical line items including wastage, formwork, and waterproofing. Learn how an itemized Bill of Quantities (BOQ) protects you from cost overruns and material substitution.',
    tags: ['BOQ', 'Contractor', 'Cost Control'],
  },
];

export default function BlogPage() {
  // In future: fetch from DB here
  const posts = DEMO_POSTS;

  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Engineering Insights</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '720px' }}>
            Construction & Property Blog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.7 }}>
            Expert articles on home construction, BOQ auditing, structural safety, and property investment in Chennai — written by our engineering team.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {['All', 'Construction', 'Materials', 'Structural', 'BOQ', 'Legal', 'Finance'].map(cat => (
            <span key={cat} style={{ padding: '6px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, background: cat === 'All' ? 'var(--primary)' : 'var(--bg-card2)', color: cat === 'All' ? 'white' : 'var(--text-muted)', border: '1px solid var(--border)', cursor: 'pointer' }}>{cat}</span>
          ))}
        </div>

        {/* Blog Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {posts.map(post => (
            <article key={post.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Category & Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: `${post.categoryColor}18`, color: post.categoryColor }}>
                  {post.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.date} · {post.readTime}</span>
              </div>
              {/* Title */}
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.4, marginBottom: '12px' }}>{post.title}</h2>
              {/* Excerpt */}
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>{post.excerpt}</p>
              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: 'var(--bg-card2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{tag}</span>
                ))}
              </div>
              {/* CTA */}
              <Link href="/guides" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Read Article →
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="card" style={{ background: 'var(--gradient-dark)', border: 'none', textAlign: 'center', padding: '56px 40px' }}>
          <span style={{ fontSize: '32px', display: 'block', marginBottom: '16px' }}>📬</span>
          <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Get Engineering Insights in Your Inbox</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '440px', margin: '0 auto 28px', lineHeight: 1.6 }}>New articles on BOQ, materials, structural audits and Chennai construction trends — direct from our engineering team.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=newsletter" className="btn btn-primary">Notify Me</Link>
            <Link href="https://wa.me/919999999999?text=Subscribe%20Buildogram%20Blog" target="_blank" rel="noopener" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>📱 WhatsApp Updates</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]} />
    </>
  );
}
