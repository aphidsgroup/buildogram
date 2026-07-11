// src/app/[serviceSlug]/page.js
// Dynamic catch-all route for new service hub pages
// Renders rich service hub pages for structural audit, steel construction, plan review, etc.

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceHubs, serviceHubMap } from '@/data/seo/serviceHubs';
import {
  Building2, ClipboardList, ShoppingCart, Eye, FileCheck, Search,
  HardHat, Ruler, Shield, Home, Users, Award, Zap, Package, Truck,
  Activity, Shovel, Compass, FlaskConical, Camera, Map, Waves,
  BrickWall, Gauge, Landmark, LayoutDashboard, Scale, Thermometer,
  Workflow, PenTool, FileText, CheckCircle, Wrench, Hammer, Star,
  Layers, MapPin, Mountain, Lightbulb, Factory, Warehouse, BookOpen,
  Receipt, Timer, BarChart2, Scan, Network, Drill,
} from 'lucide-react';

const ICON_MAP = {
  'design': PenTool,
  'boq': ClipboardList,
  'material': Package,
  'supervision': Eye,
  'audit': Shield,
  'handover': FileCheck,
  'building': Building2,
  'home': Home,
  'search': Search,
  'hard-hat': HardHat,
  'ruler': Ruler,
  'users': Users,
  'award': Award,
  'zap': Zap,
  'truck': Truck,
  'activity': Activity,
  'shovel': Shovel,
  'compass': Compass,
  'flask': FlaskConical,
  'camera': Camera,
  'map': Map,
  'waves': Waves,
  'brick': BrickWall,
  'gauge': Gauge,
  'landmark': Landmark,
  'dashboard': LayoutDashboard,
  'scale': Scale,
  'thermometer': Thermometer,
  'workflow': Workflow,
  'file': FileText,
  'check': CheckCircle,
  'wrench': Wrench,
  'hammer': Hammer,
  'star': Star,
  'layers': Layers,
  'pin': MapPin,
  'mountain': Mountain,
  'lightbulb': Lightbulb,
  'factory': Factory,
  'warehouse': Warehouse,
  'book': BookOpen,
  'receipt': Receipt,
  'timer': Timer,
  'chart': BarChart2,
  'scan': Scan,
  'network': Network,
  'drill': Drill,
  'cart': ShoppingCart,
};

function ServiceIcon({ name, color }) {
  const LucideIcon = (name && ICON_MAP[name]) || Building2;
  return (
    <div style={{
      width: '52px', height: '52px', borderRadius: '14px',
      background: color ? `${color}18` : 'rgba(252,110,32,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '16px', flexShrink: 0,
    }}>
      <LucideIcon size={26} color={color || '#FC6E20'} />
    </div>
  );
}

// Generate static params for all hub slugs
export async function generateStaticParams() {
  return serviceHubs.map((h) => ({ serviceSlug: h.slug }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { serviceSlug } = await params;
  const hub = serviceHubMap[serviceSlug];
  if (!hub) return {};
  return {
    title: hub.metaTitle,
    description: hub.metaDesc,
    alternates: { canonical: `https://www.buildogram.in${hub.canonicalPath}` },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDesc,
      url: `https://www.buildogram.in${hub.canonicalPath}`,
      siteName: 'Buildogram',
      type: 'website',
    },
  };
}

// JSON-LD Schema
function ServiceHubSchema({ hub }) {
  const baseUrl = 'https://www.buildogram.in';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}${hub.canonicalPath}`,
        url: `${baseUrl}${hub.canonicalPath}`,
        name: hub.metaTitle,
        description: hub.metaDesc,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${baseUrl}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: hub.breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: `${baseUrl}${b.item}`,
          })),
        },
      },
      {
        '@type': 'Service',
        name: hub.title,
        description: hub.metaDesc,
        provider: {
          '@type': 'Organization',
          name: 'Buildogram',
          url: baseUrl,
        },
        areaServed: {
          '@type': 'City',
          name: 'Chennai',
          '@id': 'https://www.wikidata.org/wiki/Q1352',
        },
        serviceType: hub.title,
        url: `${baseUrl}${hub.canonicalPath}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: hub.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const PILLAR_COLORS = {
  'construction-support': { accent: '#FC6E20', bg: 'rgba(252,110,32,0.08)', border: 'rgba(252,110,32,0.2)' },
  'structural-audit':    { accent: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)' },
  'steel-construction':  { accent: '#3B82F6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)' },
  'plan-review':         { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)' },
  'boq-review':          { accent: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)' },
};

export default async function ServiceHubPage({ params }) {
  const { serviceSlug } = await params;
  const hub = serviceHubMap[serviceSlug];
  if (!hub) return notFound();

  const colors = PILLAR_COLORS[hub.pillar] || PILLAR_COLORS['construction-support'];

  return (
    <>
      <ServiceHubSchema hub={hub} />
      <main style={{ fontFamily: 'var(--font-body, Inter, system-ui, sans-serif)', background: '#FAFAFA' }}>

        {/* ── HERO ────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          padding: '100px 0 80px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(252,110,32,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)',
          }} />
          <div className="sectionInner" style={{ position: 'relative', zIndex: 1 }}>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
              <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
                {hub.breadcrumbs.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {i < hub.breadcrumbs.length - 1 ? (
                      <>
                        <Link href={b.item} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none' }}>{b.name}</Link>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>/</span>
                      </>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600 }}>{b.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div style={{
              display: 'inline-block',
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 700,
              color: colors.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '20px',
            }}>
              {hub.eyebrow}
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.15,
              marginBottom: '20px',
              maxWidth: '720px',
            }}>
              {hub.h1}
            </h1>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '40px',
            }}>
              {hub.tagline}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">
                Talk to an Engineer
              </Link>
              <Link href="/boq-audit" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '15px',
                color: 'white', border: '1.5px solid rgba(255,255,255,0.2)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}>
                BOQ Audit Tool →
              </Link>
            </div>
          </div>
        </section>

        {/* ── INTRO ────────────────────────────────────────── */}
        <section style={{ padding: '80px 0', background: 'white' }}>
          <div className="sectionInner">
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <p style={{ fontSize: '18px', lineHeight: 1.85, color: '#374151' }}>
                {hub.intro}
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO GRID ──────────────────────────────── */}
        {hub.whatWeDo && hub.whatWeDo.length > 0 && (
          <section style={{ padding: '80px 0', background: '#F8FAFC' }}>
            <div className="sectionInner">
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <span style={{
                  display: 'inline-block', background: colors.bg, border: `1px solid ${colors.border}`,
                  borderRadius: '100px', padding: '6px 16px', fontSize: '12px', fontWeight: 700,
                  color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px',
                }}>
                  What Buildogram Does
                </span>
                <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                  How We Support You
                </h2>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}>
                {hub.whatWeDo.map((item, i) => (
                  <div key={i} style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}>
                    <ServiceIcon name={item.icon} color={colors.accent} />
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.7, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section style={{ padding: '80px 0', background: 'white' }}>
          <div className="sectionInner">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, color: '#0F172A' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {hub.faqs.map((faq, i) => (
                <div key={i} style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '24px 28px',
                  border: '1px solid #E2E8F0',
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '12px', margin: '0 0 12px 0' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.75, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED LINKS + CTA ──────────────────────────── */}
        <section style={{ padding: '80px 0', background: '#0F172A' }}>
          <div className="sectionInner" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, color: 'white', marginBottom: '16px' }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>
              Talk to a Buildogram engineer today. No obligation, no sales call — just engineering clarity.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
              <Link href="/contact?type=construction" className="btn btn-primary btn-lg">
                Talk to an Engineer
              </Link>
              <Link href="/locations/chennai" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '15px',
                color: 'white', border: '1.5px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
              }}>
                View Chennai Service Areas →
              </Link>
            </div>

            {hub.relatedLinks && hub.relatedLinks.length > 0 && (
              <div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
                  Related Services
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {hub.relatedLinks.map((link, i) => (
                    <Link key={i} href={link.href} style={{
                      display: 'inline-block',
                      padding: '8px 18px',
                      borderRadius: '100px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: '14px',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </main>
    </>
  );
}
