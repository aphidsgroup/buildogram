'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchApprovedPartners } from '@/lib/partnerApi';


const FILTERS = [
  { id: 'all', label: '🌐 All Partners' },
  { id: 'Builder', label: '🏗️ Builders' },
  { id: 'Architect', label: '📐 Architects' },
  { id: 'Interior Designer', label: '🎨 Interior Designers' },
  { id: 'Material Supplier', label: '🧱 Material Suppliers' },
  { id: 'Home Automation', label: '🏠 Home Automation' },
  { id: 'Solar', label: '☀️ Solar' },
  { id: 'Elevators', label: '🔼 Elevators' },
  { id: 'Waterproofing', label: '💧 Waterproofing' },
];

const CATEGORY_COLORS = {
  'Builder': '#2563EB',
  'Architect': '#7C3AED',
  'Interior Designer': '#DB2777',
  'Material Supplier': '#D97706',
  'Home Automation': '#0891B2',
  'Solar': '#F59E0B',
  'Elevators': '#64748B',
  'Waterproofing': '#0EA5E9',
};

function PartnerCard({ partner }) {
  const catColor = CATEGORY_COLORS[partner.category] || '#FC6E20';
  const services = Array.isArray(partner.services) ? partner.services : (partner.services || '').split(',').map(s => s.trim());

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid #E2E8F0',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      transition: 'all 0.25s',
      display: 'flex',
      flexDirection: 'column',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
    >
      {/* Cover */}
      <div style={{ height: '120px', background: partner.coverUrl ? `url(${partner.coverUrl}) center/cover` : `linear-gradient(135deg, ${catColor}22, ${catColor}44)`, position: 'relative', flexShrink: 0 }}>
        {partner.isFeatured && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Logo */}
      <div style={{ paddingInline: '20px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: partner.logoUrl ? `url(${partner.logoUrl}) center/cover` : catColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, color: 'white', marginTop: '-30px', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {!partner.logoUrl && (partner.companyName?.[0] || 'B')}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ background: `${catColor}15`, color: catColor, padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>{partner.category}</span>
            <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700 }}>✅ Verified</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px', color: '#1E293B', lineHeight: 1.3 }}>{partner.companyName}</h3>
          <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📍</span> {partner.location} {partner.yearsExperience && `· ${partner.yearsExperience}yr exp`}
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
          {partner.shortDescription?.slice(0, 90)}{partner.shortDescription?.length > 90 ? '…' : ''}
        </p>

        {services.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {services.slice(0, 3).map((s, i) => (
              <span key={i} style={{ background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600 }}>{s}</span>
            ))}
            {services.length > 3 && <span style={{ background: '#F1F5F9', color: '#94A3B8', padding: '3px 10px', borderRadius: '8px', fontSize: '11px' }}>+{services.length - 3} more</span>}
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
          <Link
            href={`/partners/${partner.slug}`}
            style={{
              display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#FFB347,#FC6E20)',
              color: 'white', padding: '10px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 700,
              textDecoration: 'none', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DirectoryClient({ initialPartners = [] }) {
  const [allPartners, setAllPartners] = useState(initialPartners);
  const [filter, setFilter] = useState('all');
  const loading = false;
  const error = '';

  const visible = filter === 'all' ? allPartners : allPartners.filter(p => p.category === filter);



  return (
    <div>
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '32px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #E2E8F0', height: '360px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '120px', background: '#F1F5F9', animation: 'pulse 1.5s infinite' }} />
              <div style={{ paddingInline: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '14px', background: '#E2E8F0', marginTop: '-30px', border: '3px solid white', animation: 'pulse 1.5s infinite' }} />
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ height: '16px', width: '40%', background: '#F1F5F9', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '24px', width: '70%', background: '#E2E8F0', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '12px', width: '30%', background: '#F1F5F9', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
                <div style={{ height: '40px', width: '100%', background: '#F1F5F9', borderRadius: '12px', marginTop: 'auto', animation: 'pulse 1.5s infinite' }} />
              </div>
            </div>
          ))}
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
        </div>
      )}
      {error && !loading && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FFF7ED', borderRadius: '10px', border: '1px solid #FDBA74', fontSize: '13px', color: '#92400E' }}>
          ⚠️ {error}
        </div>
      )}
      {!loading && (
        <>
        {/* Filter Pills */}
        <div className="scroll-x-mobile" style={{ marginBottom: '32px' }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '8px 18px', borderRadius: '999px', border: '1.5px solid',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
                background: filter === f.id ? 'linear-gradient(135deg,#FFB347,#FC6E20)' : 'white',
                color: filter === f.id ? 'white' : '#64748B',
                borderColor: filter === f.id ? '#FC6E20' : '#E2E8F0',
                boxShadow: filter === f.id ? '0 2px 10px rgba(252,110,32,0.3)' : 'none',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1E293B', marginBottom: '8px' }}>Verified Partner Listings</h2>
          <p style={{ fontSize: '15px', color: '#64748B' }}>
            Showing <strong style={{ color: '#1E293B' }}>{visible.length}</strong> verified partner{visible.length !== 1 ? 's' : ''}
            {filter !== 'all' && ` in ${filter}`}
          </p>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '24px',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', maxWidth: '600px', margin: '0 auto'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1E293B', marginBottom: '12px' }}>Verified Partners Are Being Onboarded</h3>
            <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
              We are currently reviewing and onboarding trusted builders, architects, and suppliers in this category. Quality takes time, and we only list partners who meet our engineering standards.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setFilter('all')} style={{ padding: '12px 24px', background: 'linear-gradient(135deg,#FFB347,#FC6E20)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
                View All Categories
              </button>
              <Link href="/partners/register" style={{ padding: '12px 24px', background: 'transparent', color: '#FC6E20', border: '1.5px solid #FC6E20', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                Apply as a Partner
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {visible.map(p => <PartnerCard key={p.id} partner={p} />)}
          </div>
        )}
        </>
      )}

    </div>
  );
}
