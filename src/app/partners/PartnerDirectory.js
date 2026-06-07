'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function PartnerDirectory({ partners }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');

  // Extract unique types and areas for filters
  const types = ['All', ...new Set(partners.map(p => p.partner_type).filter(Boolean))];
  const areas = ['All', ...new Set(partners.flatMap(p => p.service_areas || []).filter(Boolean))];

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
      const matchSearch = p.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.services?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchType = selectedType === 'All' || p.partner_type === selectedType;
      const matchArea = selectedArea === 'All' || p.service_areas?.includes(selectedArea);
      return matchSearch && matchType && matchArea;
    });
  }, [partners, searchTerm, selectedType, selectedArea]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <input 
          type="text"
          placeholder="Search by name or service..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ flex: '1 1 250px' }}
        />
        <select 
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          className="form-input"
          style={{ flex: '1 1 200px' }}
        >
          {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
        </select>
        <select 
          value={selectedArea}
          onChange={e => setSelectedArea(e.target.value)}
          className="form-input"
          style={{ flex: '1 1 200px' }}
        >
          {areas.map(a => <option key={a} value={a}>{a === 'All' ? 'All Areas' : a}</option>)}
        </select>
      </div>

      <div className="grid-3">
        {filteredPartners.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: '#F9F9F9', borderRadius: '12px' }}>
            <p style={{ color: 'var(--text-muted)' }}>No partners found matching your filters.</p>
          </div>
        ) : (
          filteredPartners.map(p => (
            <Link href={`/partners/${p.slug}`} key={p.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ 
                  width: '60px', height: '60px', borderRadius: '12px', background: 'var(--border)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative'
                }}>
                  {p.logo_url ? <Image src={p.logo_url} alt={p.company_name} fill style={{ objectFit: 'cover' }} /> : <span style={{ fontSize: '24px' }}>🏢</span>}
                </div>
                {p.verification_status === 'verified' && (
                  <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Verified
                  </div>
                )}
              </div>
              
              <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{p.company_name}</h3>
              <p style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 500, marginBottom: '12px', textTransform: 'capitalize' }}>
                {p.partner_type?.replace(/_/g, ' ')}
              </p>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                {p.short_description || `Professional ${p.partner_type?.replace(/_/g, ' ')} serving Chennai.`}
              </p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                {p.years_experience > 0 && (
                  <div><strong>{p.years_experience}+</strong> Years Exp</div>
                )}
                {p.project_count > 0 && (
                  <div><strong>{p.project_count}+</strong> Projects</div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
