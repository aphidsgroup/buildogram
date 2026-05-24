'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DirectoryClient() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchPartners = (type) => {
    setLoading(true);
    fetch(`/api/public/partners?type=${type}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setPartners(d.partners);
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
    { id: 'material', label: 'Material Suppliers' }
  ];

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
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
            return (
              <Link href={`/partners/${p.id}`} key={p.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {meta.services_offered && Array.isArray(meta.services_offered) 
                      ? meta.services_offered.slice(0, 3).map(s => <span key={s} className="tag" style={{ fontSize: '10px', padding: '4px 10px' }}>{s}</span>)
                      : <span className="tag" style={{ fontSize: '10px' }}>Multiple Services</span>
                    }
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
