'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PropertyMarketplaceClient({ initialListingType }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterType, setFilterType] = useState('all');
  const [filterBudget, setFilterBudget] = useState(0);

  const fetchProperties = () => {
    setLoading(true);
    let url = `/api/public/properties?listing_type=${initialListingType}&type=${filterType}`;
    if (filterBudget > 0) url += `&budget_max=${filterBudget}`;
    
    fetch(url)
      .then(r => r.json())
      .then(d => {
        if (d.success) setProperties(d.properties);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, [filterType, filterBudget, initialListingType]);

  const fmt = n => n ? '₹' + Number(n).toLocaleString('en-IN') : '—';

  return (
    <div>
      {/* Filter Bar */}
      <div className="card mb-6" style={{ padding: '16px 24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="text-sm font-semibold mb-2 block">Property Type</label>
          <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa / Independent House</option>
            <option value="plot">Plot / Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="text-sm font-semibold mb-2 block">Max Budget</label>
          <select className="input" value={filterBudget} onChange={e => setFilterBudget(Number(e.target.value))}>
            <option value={0}>Any Budget</option>
            {initialListingType === 'rent' ? (
              <>
                <option value={20000}>Up to ₹20,000</option>
                <option value={50000}>Up to ₹50,000</option>
                <option value={100000}>Up to ₹1L</option>
              </>
            ) : (
              <>
                <option value={5000000}>Up to ₹50L</option>
                <option value={10000000}>Up to ₹1Cr</option>
                <option value={30000000}>Up to ₹3Cr</option>
              </>
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-8"><div className="spinner mx-auto"></div></div>
      ) : properties.length === 0 ? (
        <div className="card text-center" style={{ padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏡</div>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>No Properties Available</h2>
          <p className="text-muted">Try adjusting your filters to see more results.</p>
        </div>
      ) : (
        <div className="grid-3" style={{ gap: '24px' }}>
          {properties.map(l => (
            <Link key={l.id} href={`/properties/listing/${l.id}`} className="card" style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            >
              {/* Cover */}
              <div style={{ height: '220px', background: '#1e293b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '40px', zIndex: 1 }}>📸</span>
                {l.metadata.tour_status === 'available' && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: 'white' }}>
                    👓 360° Tour
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
                    {initialListingType === 'rent' ? 'Monthly Rent' : 'Asking Price'}
                  </div>
                  <div style={{ color: 'white', fontSize: '24px', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }}>
                    {initialListingType === 'rent' ? fmt(l.metadata.expected_rent) : fmt(l.metadata.expected_price)}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: '20px' }}>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>📍</span> {l.locality ? `${l.locality}, ` : ''}{l.city}
                </p>
                <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Type</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{l.metadata.property_type || '—'}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Size</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{l.metadata.property_size_sqft ? `${l.metadata.property_size_sqft} sqft` : '—'}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Furnishing</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', textTransform: 'capitalize' }}>{l.metadata.furnishing_status || '—'}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
