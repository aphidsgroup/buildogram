'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DirectoryClient() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const DEMO_PARTNERS = [
    { id: 'demo-1', metadata: { business_name: 'Premium Builders Co.', category: 'Builder', slug: 'demo-builder', location: 'Chennai', services_offered: ['Residential Construction', 'Turnkey Solutions'] } },
    { id: 'demo-2', metadata: { business_name: 'Visionary Architects', category: 'Architect', slug: 'demo-architect', location: 'Chennai', services_offered: ['Architectural Design', 'Floor Planning'] } },
    { id: 'demo-3', metadata: { business_name: 'Elegant Interiors', category: 'Interior Designer', slug: 'demo-interior-designer', location: 'Chennai', services_offered: ['Interior Design', 'Modular Kitchens'] } },
    { id: 'demo-4', metadata: { business_name: 'Prime Materials', category: 'Material Supplier', slug: 'demo-material-supplier', location: 'Chennai', services_offered: ['Cement', 'Steel', 'Bricks'] } },
    { id: 'demo-5', metadata: { business_name: 'Smart Home Solutions', category: 'Home Automation', slug: 'demo-home-automation', location: 'Chennai', services_offered: ['Lighting Automation', 'Security Systems'] } },
    { id: 'demo-6', metadata: { business_name: 'SunPower Solar', category: 'Solar', slug: 'demo-solar', location: 'Chennai', services_offered: ['Solar Panels', 'Inverters'] } },
    { id: 'demo-7', metadata: { business_name: 'LiftTech Elevators', category: 'Elevators', slug: 'demo-elevator', location: 'Chennai', services_offered: ['Home Elevators', 'Commercial Lifts'] } },
    { id: 'demo-8', metadata: { business_name: 'AquaSeal Experts', category: 'Waterproofing', slug: 'demo-waterproofing', location: 'Chennai', services_offered: ['Terrace Waterproofing', 'Basement Waterproofing'] } }
  ];

  const fetchPartners = (type) => {
    setLoading(true);
    fetch(`/api/public/partners?type=${type}`)
      .then(r => r.json())
      .then(d => {
        if (d.success && d.partners && d.partners.length > 0) {
          setPartners(d.partners);
        } else {
          // Fallback to demo data if API returns empty
          setPartners(type === 'all' ? DEMO_PARTNERS : DEMO_PARTNERS.filter(p => p.metadata.category.toLowerCase().includes(type.toLowerCase()) || p.metadata.slug.includes(type)));
        }
        setLoading(false);
      })
      .catch(() => {
        setPartners(type === 'all' ? DEMO_PARTNERS : DEMO_PARTNERS.filter(p => p.metadata.category.toLowerCase().includes(type.toLowerCase()) || p.metadata.slug.includes(type)));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPartners(filter);
  }, [filter]);

  const filters = [
    { id: 'all', label: 'All Partners' },
    { id: 'builder', label: 'Builders' },
    { id: 'architect', label: 'Architects' },
    { id: 'interior', label: 'Interior Designers' },
    { id: 'material', label: 'Material Suppliers' },
    { id: 'automation', label: 'Home Automation' },
    { id: 'solar', label: 'Solar' },
    { id: 'elevator', label: 'Elevators' },
    { id: 'waterproofing', label: 'Waterproofing' }
  ];

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', overflowX: 'auto', paddingBottom: '8px' }}>
        {filters.map(f => (
          <button 
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`btn btn-sm ${filter === f.id ? 'btn-primary' : 'btn-outline'}`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center p-8"><div className="spinner mx-auto"></div></div>
      ) : partners.length === 0 ? (
        <div className="card text-center p-8">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤝</div>
          <h3>No partners found</h3>
          <p className="text-muted">We don't have any published partners in this category right now.</p>
        </div>
      ) : (
        <div className="grid-3" style={{ gap: '24px' }}>
          {partners.map(p => {
            const meta = p.metadata || {};
            const slug = meta.slug || p.id; // fallback to id if no slug
            return (
              <div key={p.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700 }}>
                    {meta.business_name ? meta.business_name[0] : 'B'}
                  </div>
                  <span className="badge badge-green">Verified</span>
                </div>
                
                <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{meta.business_name || 'Partner'}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>📍</span> {p.city || meta.service_areas || 'Chennai'}
                </p>
                
                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Services</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {meta.services_offered && Array.isArray(meta.services_offered) 
                      ? meta.services_offered.slice(0, 3).map(s => <span key={s} className="tag" style={{ fontSize: '10px', padding: '4px 10px' }}>{s}</span>)
                      : <span className="tag" style={{ fontSize: '10px' }}>Multiple Services</span>
                    }
                  </div>
                  <Link href={`/partners/${slug}`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
