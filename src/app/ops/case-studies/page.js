'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OpsCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch('/api/case-studies');
      const data = await res.json();
      if (data.success) {
        setCaseStudies(data.caseStudies);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
    try {
      const res = await fetch(`/api/case-studies/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchCaseStudies();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A' }}>Case Studies</h1>
        <button className="btn btn-primary" onClick={() => alert('Add form to be implemented via modal')}>
          + New Case Study
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>Loading...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                <th style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Title</th>
                <th style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Category</th>
                <th style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Location</th>
                <th style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Status</th>
                <th style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map(cs => (
                <tr key={cs.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '16px', fontSize: '15px', color: '#0F172A', fontWeight: 500 }}>
                    {cs.title}
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{cs.slug}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#475569' }}>{cs.category}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#475569' }}>{cs.location_area}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '12px', 
                      fontWeight: 600,
                      background: cs.status === 'published' ? '#D1FAE5' : '#F1F5F9',
                      color: cs.status === 'published' ? '#065F46' : '#475569'
                    }}>
                      {cs.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => toggleStatus(cs.id, cs.status)}
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: '6px', 
                        border: '1px solid #E2E8F0', 
                        background: 'white', 
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#0F172A',
                        fontWeight: 500
                      }}
                    >
                      {cs.status === 'draft' ? 'Publish' : 'Unpublish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
