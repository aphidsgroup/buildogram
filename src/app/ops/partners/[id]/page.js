'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditPartnerProfilePage({ params }) {
  const router = useRouter();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const CATEGORIES = [
    'Builder', 'Architect', 'Interior Designer', 'Material Supplier', 
    'Home Automation', 'Solar', 'Elevators', 'Waterproofing'
  ];

  useEffect(() => {
    fetch(`/api/leads/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.lead) {
          setPartner(data.lead);
          const meta = data.lead.metadata || {};
          setFormData({
            name: meta.business_name || meta.name || data.lead.name || '',
            slug: meta.slug || '',
            category: meta.category || 'Builder',
            logoUrl: meta.logoUrl || '',
            coverImageUrl: meta.coverImageUrl || '',
            shortDescription: meta.shortDescription || meta.message || '',
            fullDescription: meta.fullDescription || '',
            location: meta.location || data.lead.city || '',
            yearsExperience: meta.yearsExperience || '',
            phone: meta.phone || data.lead.phone || '',
            email: meta.email || data.lead.email || '',
            website: meta.website || '',
            whatsapp: meta.whatsapp || '',
            services: meta.services_offered ? meta.services_offered.join(', ') : '',
            specializations: meta.specializations ? meta.specializations.join(', ') : '',
            certifications: meta.certifications ? meta.certifications.join(', ') : '',
            brandsHandled: meta.brandsHandled ? meta.brandsHandled.join(', ') : '',
            projectTypes: meta.projectTypes ? meta.projectTypes.join(', ') : '',
            galleryImages: meta.galleryImages || [],
            videoGallery: meta.videoGallery || [],
            projects: meta.projects || [],
            public_status: meta.public_status || 'draft',
            featured: meta.featured || false,
          });
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleArrayTextChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const addGalleryImage = () => {
    setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, { url: '', alt: '' }] }));
  };

  const updateGalleryImage = (index, field, value) => {
    const updated = [...formData.galleryImages];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, galleryImages: updated }));
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({ ...prev, galleryImages: prev.galleryImages.filter((_, i) => i !== index) }));
  };

  const addVideo = () => {
    setFormData(prev => ({ ...prev, videoGallery: [...prev.videoGallery, { title: '', url: '', type: 'youtube' }] }));
  };

  const updateVideo = (index, field, value) => {
    const updated = [...formData.videoGallery];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, videoGallery: updated }));
  };

  const removeVideo = (index) => {
    setFormData(prev => ({ ...prev, videoGallery: prev.videoGallery.filter((_, i) => i !== index) }));
  };

  const addProject = () => {
    setFormData(prev => ({ ...prev, projects: [...prev.projects, { title: '', location: '', description: '', imageUrl: '', videoUrl: '', completionYear: '' }] }));
  };

  const updateProject = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, projects: updated }));
  };

  const removeProject = (index) => {
    setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Parse comma separated strings into arrays
    const parseArray = (str) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : [];

    const updatedMetadata = {
      ...partner.metadata,
      business_name: formData.name,
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: formData.category,
      logoUrl: formData.logoUrl,
      coverImageUrl: formData.coverImageUrl,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      location: formData.location,
      yearsExperience: formData.yearsExperience,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      whatsapp: formData.whatsapp,
      services_offered: parseArray(formData.services),
      specializations: parseArray(formData.specializations),
      certifications: parseArray(formData.certifications),
      brandsHandled: parseArray(formData.brandsHandled),
      projectTypes: parseArray(formData.projectTypes),
      galleryImages: formData.galleryImages,
      videoGallery: formData.videoGallery,
      projects: formData.projects,
      public_status: formData.public_status,
      featured: formData.featured,
    };

    try {
      const res = await fetch(`/api/leads/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metadata: updatedMetadata, name: formData.name, phone: formData.phone, email: formData.email, city: formData.location })
      });
      if (res.ok) {
        alert('Partner Profile Updated successfully!');
        router.push('/ops/partners');
      } else {
        alert('Failed to update.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating.');
    }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Link href="/ops/partners" className="btn btn-ghost btn-sm" style={{ marginBottom: '8px', display: 'inline-block' }}>← Back to Partners Dashboard</Link>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Edit Partner Profile</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href={`/partners/${formData.slug || partner.id}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Preview Public Profile</a>
          <button onClick={handleSubmit} disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Save Profile'}</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Basic Details */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>1. Basic Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label className="label">Company Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="input" required />
            </div>
            <div>
              <label className="label">Slug (URL endpoint)</label>
              <input name="slug" value={formData.slug} onChange={handleChange} className="input" placeholder="e.g. buildogram-builders" />
            </div>
            <div>
              <label className="label">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Location / City</label>
              <input name="location" value={formData.location} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Logo URL</label>
              <input name="logoUrl" value={formData.logoUrl} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Cover Image URL</label>
              <input name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} className="input" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label">Short Description</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="input" style={{ height: '80px' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label">Full Description</label>
              <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} className="input" style={{ height: '150px' }} />
            </div>
          </div>
        </div>

        {/* Status & Contact */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>2. Status & Private Contact (Not public)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label className="label">Publish Status</label>
              <select name="public_status" value={formData.public_status} onChange={handleChange} className="input">
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Visible)</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '28px' }}>
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} id="featured" />
              <label htmlFor="featured" style={{ fontWeight: 600, cursor: 'pointer' }}>Featured Partner</label>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input name="email" value={formData.email} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Website</label>
              <input name="website" value={formData.website} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">WhatsApp Number</label>
              <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="input" />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>3. Business Attributes (Comma separated)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <div>
              <label className="label">Years of Experience</label>
              <input name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} className="input" style={{ maxWidth: '200px' }} />
            </div>
            <div>
              <label className="label">Services Offered</label>
              <input value={formData.services} onChange={e => handleArrayTextChange(e, 'services')} className="input" placeholder="e.g. Architecture, Interior Design, Landscaping" />
            </div>
            <div>
              <label className="label">Specializations</label>
              <input value={formData.specializations} onChange={e => handleArrayTextChange(e, 'specializations')} className="input" placeholder="e.g. Modern Minimalist, Traditional" />
            </div>
            <div>
              <label className="label">Certifications</label>
              <input value={formData.certifications} onChange={e => handleArrayTextChange(e, 'certifications')} className="input" placeholder="e.g. ISO 9001, IGBC Green Homes" />
            </div>
            <div>
              <label className="label">Brands Handled</label>
              <input value={formData.brandsHandled} onChange={e => handleArrayTextChange(e, 'brandsHandled')} className="input" placeholder="e.g. Kohler, Jaquar, Asian Paints" />
            </div>
            <div>
              <label className="label">Project Types</label>
              <input value={formData.projectTypes} onChange={e => handleArrayTextChange(e, 'projectTypes')} className="input" placeholder="e.g. Residential, Commercial, Villas" />
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>4. Image Gallery</h2>
            <button type="button" onClick={addGalleryImage} className="btn btn-sm btn-outline">+ Add Image</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {formData.galleryImages.map((img, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', background: '#f8fafc', padding: '16px', borderRadius: '8px' }}>
                <div style={{ flex: 1 }}>
                  <label className="label" style={{ fontSize: '11px' }}>Image URL</label>
                  <input value={img.url} onChange={e => updateGalleryImage(i, 'url', e.target.value)} className="input" style={{ margin: 0 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="label" style={{ fontSize: '11px' }}>Alt Text (Optional)</label>
                  <input value={img.alt} onChange={e => updateGalleryImage(i, 'alt', e.target.value)} className="input" style={{ margin: 0 }} />
                </div>
                <button type="button" onClick={() => removeGalleryImage(i)} className="btn btn-sm" style={{ background: '#fee2e2', color: '#b91c1c' }}>Remove</button>
              </div>
            ))}
            {formData.galleryImages.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No images added.</p>}
          </div>
        </div>

        {/* Video Gallery */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>5. Video Gallery</h2>
            <button type="button" onClick={addVideo} className="btn btn-sm btn-outline">+ Add Video</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {formData.videoGallery.map((vid, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', background: '#f8fafc', padding: '16px', borderRadius: '8px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label className="label" style={{ fontSize: '11px' }}>Video Title</label>
                  <input value={vid.title} onChange={e => updateVideo(i, 'title', e.target.value)} className="input" style={{ margin: 0 }} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label className="label" style={{ fontSize: '11px' }}>URL (e.g. YouTube embed link)</label>
                  <input value={vid.url} onChange={e => updateVideo(i, 'url', e.target.value)} className="input" style={{ margin: 0 }} />
                </div>
                <div style={{ width: '120px' }}>
                  <label className="label" style={{ fontSize: '11px' }}>Type</label>
                  <select value={vid.type} onChange={e => updateVideo(i, 'type', e.target.value)} className="input" style={{ margin: 0 }}>
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button type="button" onClick={() => removeVideo(i)} className="btn btn-sm" style={{ background: '#fee2e2', color: '#b91c1c' }}>Remove</button>
              </div>
            ))}
            {formData.videoGallery.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No videos added.</p>}
          </div>
        </div>

        {/* Projects */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>6. Past Projects (Portfolio)</h2>
            <button type="button" onClick={addProject} className="btn btn-sm btn-outline">+ Add Project</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {formData.projects.map((proj, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '15px' }}>Project #{i+1}</h4>
                  <button type="button" onClick={() => removeProject(i)} className="btn btn-sm" style={{ background: '#fee2e2', color: '#b91c1c' }}>Remove Project</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="label" style={{ fontSize: '11px' }}>Project Title</label>
                    <input value={proj.title} onChange={e => updateProject(i, 'title', e.target.value)} className="input" style={{ margin: 0 }} />
                  </div>
                  <div>
                    <label className="label" style={{ fontSize: '11px' }}>Location</label>
                    <input value={proj.location} onChange={e => updateProject(i, 'location', e.target.value)} className="input" style={{ margin: 0 }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="label" style={{ fontSize: '11px' }}>Description</label>
                    <textarea value={proj.description} onChange={e => updateProject(i, 'description', e.target.value)} className="input" style={{ margin: 0, height: '60px' }} />
                  </div>
                  <div>
                    <label className="label" style={{ fontSize: '11px' }}>Primary Image URL</label>
                    <input value={proj.imageUrl} onChange={e => updateProject(i, 'imageUrl', e.target.value)} className="input" style={{ margin: 0 }} />
                  </div>
                  <div>
                    <label className="label" style={{ fontSize: '11px' }}>Video URL (Optional)</label>
                    <input value={proj.videoUrl} onChange={e => updateProject(i, 'videoUrl', e.target.value)} className="input" style={{ margin: 0 }} />
                  </div>
                  <div>
                    <label className="label" style={{ fontSize: '11px' }}>Completion Year</label>
                    <input value={proj.completionYear} onChange={e => updateProject(i, 'completionYear', e.target.value)} className="input" style={{ margin: 0 }} />
                  </div>
                </div>
              </div>
            ))}
            {formData.projects.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No projects added.</p>}
          </div>
        </div>

        <div style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '16px' }}>
            {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </div>

      </form>
    </div>
  );
}
