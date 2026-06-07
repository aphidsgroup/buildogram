'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GbpGenerator from '../GbpGenerator';

function EditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'construction',
    area: '',
    description: '',
    before_after_notes: '',
    methods_used: '',
    materials_used: '',
    privacy_status: 'public',
    approved_for_website: false,
    approved_for_gbp: false,
    approved_for_social: false,
    linked_service_url: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/ops/proof-assets/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) setFormData(data);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/ops/proof-assets/${id}` : '/api/ops/proof-assets';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    router.push('/ops/proof-assets');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', padding: '24px', alignItems: 'start' }}>
      
      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>{id ? 'Edit Proof Asset' : 'Add Proof Asset'}</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Short Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" placeholder="e.g. Roof Slab Concreting" style={{ width: '100%', padding: '8px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>URL Slug</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="form-control" placeholder="roof-slab-velachery" style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '8px' }}>
                <option value="construction">Construction</option>
                <option value="materials">Materials</option>
                <option value="structural_audit">Structural Audit</option>
                <option value="land_survey">Land Survey</option>
                <option value="soil_testing">Soil Testing</option>
                <option value="piling">Piling</option>
                <option value="partner_project">Partner Project</option>
                <option value="property_passport">Property Passport</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Area / Locality</label>
              <input type="text" name="area" value={formData.area} onChange={handleChange} className="form-control" placeholder="Velachery" style={{ width: '100%', padding: '8px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Public-Safe Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows={4} style={{ width: '100%', padding: '8px' }} placeholder="What was the problem? What did we do?" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Methods / Equipment Used</label>
              <textarea name="methods_used" value={formData.methods_used} onChange={handleChange} className="form-control" rows={3} style={{ width: '100%', padding: '8px' }} placeholder="e.g. Total Station, Rebound Hammer" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Materials Used</label>
              <textarea name="materials_used" value={formData.materials_used} onChange={handleChange} className="form-control" rows={3} style={{ width: '100%', padding: '8px' }} placeholder="e.g. UltraTech 53 Grade, Tata Tiscon" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Linked Service URL</label>
            <input type="text" name="linked_service_url" value={formData.linked_service_url} onChange={handleChange} className="form-control" placeholder="/structural-audit-chennai" style={{ width: '100%', padding: '8px' }} />
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '8px 0' }} />
          
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Privacy & Distribution</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Privacy Status</label>
              <select name="privacy_status" value={formData.privacy_status} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '8px' }}>
                <option value="public">Public (Safe to share)</option>
                <option value="redacted">Redacted (Blur sensitive parts)</option>
                <option value="private">Private (Internal only)</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" name="approved_for_website" checked={formData.approved_for_website} onChange={handleChange} />
                Approved for Website (/proof)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" name="approved_for_gbp" checked={formData.approved_for_gbp} onChange={handleChange} />
                Approved for GBP
              </label>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <button onClick={handleSave} className="btn btn-primary" style={{ width: '100%' }}>Save Proof Asset</button>
          </div>
        </div>
      </div>

      <div>
        <GbpGenerator assetData={formData} />
      </div>

    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <EditorForm />
    </Suspense>
  );
}
