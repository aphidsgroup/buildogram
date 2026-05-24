import Link from 'next/link';
import { faqCategories } from '@/data/seo/faqs';

export const metadata = {
  title: 'Frequently Asked Questions | Buildogram',
  description: 'Answers to common questions about home construction, BOQ, contractor selection, quality inspection, property listings, Property Passport, and more.',
};

export default function FaqsHub() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '60px 0 72px' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255, 163, 100, 0.18), rgba(252, 110, 32, 0.14))', border: '1px solid rgba(252, 110, 32, 0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Help & FAQs</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', maxWidth: '560px', lineHeight: 1.7 }}>
            Clear, honest answers from our structural engineers and property experts.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 24px' }}>
        <div className="grid-3" style={{ gap: '20px' }}>
          {faqCategories.map((cat) => (
            <Link key={cat.slug} href={`/faqs/${cat.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-hover">
                <h2 style={{ fontSize: '18px', color: 'var(--secondary)', marginBottom: '10px' }}>{cat.title}</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>{cat.intro}</p>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>{cat.faqs.length} questions →</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="card" style={{ background: 'var(--secondary)', border: 'none', textAlign: 'center', padding: '48px', marginTop: '48px' }}>
          <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '12px' }}>Still have questions?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Book a free consultation with our structural engineers.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
        </div>
      </div>
    </>
  );
}
