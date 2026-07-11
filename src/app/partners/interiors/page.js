import { generateSEOMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata = generateSEOMetadata({
  title: 'Interior Designers in Chennai | Verified Interior Partners | Buildogram',
  description: 'Find verified interior designers and turnkey interior contractors in Chennai. Modular kitchen, furniture, false ceiling, painting — transparent pricing with material specs.',
  path: '/partners/interiors',
});

const CRITERIA = [
  { icon: '📐', title: 'Structural-Safe Design', desc: 'Interiors must not compromise structural elements. We reject any interior contractor who drills into load-bearing beams, compromises slab depth, or obstructs drainage lines.' },
  { icon: '📋', title: 'Itemized Material Specification', desc: 'No surprise cost upgrades on site. All materials — ply grade, shutter finish, hardware brand — specified upfront in itemized quotes. BWR vs CWR ply grade difference explained clearly to clients.' },
  { icon: '🧱', title: 'Material Grade Transparency', desc: 'Branded vs non-branded furniture panels disclosed. Actual GSM of fabric, mm thickness of glass, grade of hardware — all specified in drawings and contracts.' },
  { icon: '🏅', title: 'Experienced Site Supervision', desc: 'Dedicated site foreman, not a roving supervisor across 10 sites. We verify their ongoing project load before referring them for new projects.' },
];

const CATEGORIES = [
  { icon: '🍳', name: 'Modular Kitchen', desc: 'Shutters (acrylic/laminate/PU), carcass (BWR ply), hardware (Hettich/Blum), countertop (granite/quartz)' },
  { icon: '🛏️', name: 'Bedroom Furniture', desc: 'Wardrobe, beds, side units. BWR plywood, CNC precision cuts. Space optimization for smaller rooms.' },
  { icon: '💡', name: 'False Ceiling & Lighting', desc: 'Gypsum board on GI frame. LED coves, spotlights, downlights. Acoustic panels for media rooms.' },
  { icon: '🎨', name: 'Wall Treatment & Painting', desc: 'Premium emulsion, texture, wallpaper, decorative panels. Putty and primer preparation included.' },
  { icon: '🪵', name: 'Flooring', desc: 'Tiles, vitrified, hardwood, laminate, epoxy — installation with proper levelling and grout specification.' },
  { icon: '🛁', name: 'Bathroom Fitting', desc: 'Sanitary ware, CP fittings, mirrors, vanity units. Brand-authorized installation for Jaquar, Grohe, Kohler.' },
];

const PROCESS = [
  { step: '1', title: 'Design Consultation', desc: 'Space planning, style board, material selection and 3D visualization before any commitment.' },
  { step: '2', title: 'Itemized Quote', desc: 'BOQ-style quote with every item specified — no lump-sum guesses. Compare quotes item by item.' },
  { step: '3', title: 'Structural Clearance', desc: 'Buildogram engineer reviews the design to confirm no structural elements are compromised.' },
  { step: '4', title: 'Execution & Handover', desc: 'Milestone payments. Progress photos. Final punch list walkthrough before balance payment.' },
];

export default function InteriorsPage() {
  return (
    <>
      <section style={{ background: 'var(--secondary)', color: 'white', padding: '72px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 20%, rgba(252,110,32,0.08) 0%, transparent 55%)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(255,163,100,0.18), rgba(252,110,32,0.14))', border: '1px solid rgba(252,110,32,0.28)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--gradient-orange-strong)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Interior Partners</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.15, marginBottom: '16px', maxWidth: '700px' }}>Verified Interior Designers in Chennai</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', maxWidth: '620px', lineHeight: 1.7, marginBottom: '32px' }}>Interior partners who are structurally aware, material-transparent, and contractually accountable — not just visually creative.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/contact?type=interior-quote" className="btn btn-primary btn-lg">Get Interior Quote</Link>
            <Link href="/join-as-partner" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Join as Interior Partner</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '64px 24px' }}>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>What Makes Our Interior Partners Different</h2>
          <div className="grid-2" style={{ gap: '20px' }}>
            {CRITERIA.map(c => (
              <div key={c.title} className="card" style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h3 style={{ fontSize: '16px', color: 'var(--secondary)', marginBottom: '6px' }}>{c.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--secondary)', marginBottom: '24px' }}>Interior Work Categories</h2>
          <div className="grid-3" style={{ gap: '16px' }}>
            {CATEGORIES.map(c => (
              <div key={c.name} className="card">
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{c.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '6px' }}>{c.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '56px', background: 'var(--bg-card2)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <h2 style={{ fontSize: '22px', color: 'var(--secondary)', marginBottom: '28px' }}>Our 4-Step Interior Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PROCESS.map(s => (
              <div key={s.step} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--secondary)', marginBottom: '4px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🏠</div>
            <h3 style={{ fontSize: '20px', color: 'var(--secondary)', marginBottom: '8px' }}>Get Interior Quote</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>Get matched with a verified interior partner based on your project type and budget.</p>
            <Link href="/contact?type=interior-quote" className="btn btn-primary">Get Quote</Link>
          </div>
          <div className="card" style={{ background: 'var(--secondary)', textAlign: 'center', padding: '36px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🎨</div>
            <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '8px' }}>Interior Professional?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>Join our verified network and get structurally-cleared, quality-conscious interior project leads.</p>
            <Link href="/join-as-partner" className="btn btn-primary">Apply to Join</Link>
          </div>
        </div>
      </div>

      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }, { name: 'Interior Designers', path: '/partners/interiors' }]} />
    </>
  );
}
