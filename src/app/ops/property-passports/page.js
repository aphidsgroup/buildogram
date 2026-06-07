'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PropertyPassportsDashboard() {
  const [passports, setPassports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    property_name: '',
    owner_name: '',
    owner_phone: '',
    property_area: '',
    property_type: 'Residential',
  });

  useEffect(() => {
    fetchPassports();
  }, []);

  const fetchPassports = async (searchQuery = '') => {
    setLoading(true);
    try {
      const url = searchQuery ? `/api/ops/property-passports?search=${encodeURIComponent(searchQuery)}` : '/api/ops/property-passports';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setPassports(data.passports || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPassports(search);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/ops/property-passports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setFormData({ property_name: '', owner_name: '', owner_phone: '', property_area: '', property_type: 'Residential' });
        fetchPassports();
      } else {
        alert(data.error);
      }
    } catch (e) {
      alert('Failed to create passport');
    }
  };

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Property Passport OS</h1>
          <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0' }}>Manage digital records and handover documents for properties.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ background: '#FC6E20', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
          + New Passport
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Search by Passport Number, Owner, or Phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '400px', padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
          />
          <button type="submit" style={{ background: '#0F172A', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            Search
          </button>
          {search && (
            <button type="button" onClick={() => { setSearch(''); fetchPassports(''); }} style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              Clear
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748B' }}>Loading...</div>
      ) : (
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px' }}>Passport ID</th>
                <th style={{ padding: '16px' }}>Property / Owner</th>
                <th style={{ padding: '16px' }}>Area / Type</th>
                <th style={{ padding: '16px' }}>Records</th>
                <th style={{ padding: '16px' }}>Status</th>
                <th style={{ padding: '16px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {passports.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>No passports found.</td></tr>
              ) : passports.map(passport => (
                <tr key={passport.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: '#FC6E20' }}>{passport.passport_number}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{new Date(passport.created_at).toLocaleDateString()}</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{passport.property_name || 'Untitled Property'}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{passport.owner_name} • {passport.owner_phone}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>
                    <div>{passport.property_area || '—'}</div>
                    <div style={{ fontSize: '13px' }}>{passport.property_type || '—'}</div>
                  </td>
                  <td style={{ padding: '16px', color: '#475569' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{passport._count?.records || 0} Files</div>
                    <div style={{ fontSize: '12px' }}>{passport._count?.checklists || 0} Tasks</div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px',
                      background: passport.status === 'active' ? '#D1FAE5' : passport.status === 'handover_ready' ? '#FEF3C7' : '#F1F5F9',
                      color: passport.status === 'active' ? '#065F46' : passport.status === 'handover_ready' ? '#92400E' : '#475569'
                    }}>
                      {passport.status || 'draft'}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Link href={`/ops/property-passports/${passport.id}`}>
                      <button style={{ background: '#F1F5F9', color: '#0F172A', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        Manage
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', maxWidth: '90%' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', color: '#0F172A' }}>Create New Passport</h2>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Property Name</label>
                <input required value={formData.property_name} onChange={e => setFormData({...formData, property_name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="e.g. Skyline Villa" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Owner Name</label>
                <input required value={formData.owner_name} onChange={e => setFormData({...formData, owner_name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Owner Phone</label>
                <input required value={formData.owner_phone} onChange={e => setFormData({...formData, owner_phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="e.g. 9876543210" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Locality / Area</label>
                <input required value={formData.property_area} onChange={e => setFormData({...formData, property_area: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }} placeholder="e.g. Velachery" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#475569' }}>Property Type</label>
                <select value={formData.property_type} onChange={e => setFormData({...formData, property_type: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#FC6E20', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Create Passport</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
