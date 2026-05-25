'use client';
import { useState, useEffect } from 'react';
import { SectionHeader, FormField, StatusBadge } from '../_shared/components';
import { DEMO_PROFILE } from '../_shared/demoData';

const CATEGORIES = ['Builder', 'Architect', 'Interior Designer', 'Material Supplier', 'Home Automation', 'Solar', 'Elevators', 'Waterproofing'];

function calcCompletion(profile) {
  const fields = ['companyName', 'category', 'description', 'services', 'serviceAreas', 'contactPerson', 'phone', 'email', 'whatsapp', 'website', 'logoUrl', 'certifications'];
  const filled = fields.filter(k => profile[k] && String(profile[k]).trim() !== '').length;
  return Math.round((filled / fields.length) * 100);
}

export default function PartnerProfile() {
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem('bos_profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const f = (k) => (e) => setProfile(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    localStorage.setItem('bos_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const completion = calcCompletion(profile);

  return (
    <div>
      {saved && (
        <div style={{ position: 'fixed', top: '80px', right: '24px', zIndex: 2000, background: '#10B981', color: 'white', padding: '14px 20px', borderRadius: '12px', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          ✅ Profile saved successfully!
        </div>
      )}

      <SectionHeader icon="🏢" title="Public Profile & Portfolio" desc="Manage your public Buildogram partner profile visible to potential clients" />

      {/* COMPLETION BAR */}
      <div className="card" style={{ padding: '20px 24px', borderRadius: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 700, fontSize: '15px' }}>Profile Completion</span>
          <span style={{ fontWeight: 800, fontSize: '20px', color: completion >= 80 ? '#10B981' : completion >= 50 ? '#F59E0B' : '#EF4444' }}>{completion}%</span>
        </div>
        <div style={{ background: '#E2E8F0', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${completion}%`, height: '100%', background: completion >= 80 ? 'linear-gradient(90deg,#34D399,#10B981)' : 'linear-gradient(90deg,#FFB347,#FC6E20)', borderRadius: '8px', transition: 'width 0.4s' }} />
        </div>
        {completion < 100 && <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Fill in all sections to maximize your visibility on the partner directory.</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>

        {/* LEFT: FORM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* SECTION 1 */}
          <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>🏢 Company Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <FormField label="Company Name" required><input className="input" value={profile.companyName} onChange={f('companyName')} placeholder="Your company or firm name" /></FormField>
              <FormField label="Category">
                <select className="input" value={profile.category} onChange={f('category')}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </FormField>
              <FormField label="Logo URL"><input className="input" value={profile.logoUrl} onChange={f('logoUrl')} placeholder="https://..." /></FormField>
              <FormField label="Cover Image URL"><input className="input" value={profile.coverUrl} onChange={f('coverUrl')} placeholder="https://..." /></FormField>
            </div>
            <FormField label="Company Description">
              <textarea className="input" rows={3} value={profile.description} onChange={f('description')} placeholder="Describe your company, expertise, and what makes you stand out..." style={{ resize: 'vertical' }} />
            </FormField>
          </div>

          {/* SECTION 2 */}
          <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>🛠️ Services & Areas</h2>
            <FormField label="Services Offered">
              <textarea className="input" rows={2} value={profile.services} onChange={f('services')} placeholder="e.g. Home Construction, Villa Construction, Renovation, Interior Design" style={{ resize: 'vertical' }} />
            </FormField>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <FormField label="Service Areas"><input className="input" value={profile.serviceAreas} onChange={f('serviceAreas')} placeholder="e.g. Chennai, Coimbatore, Madurai" /></FormField>
              <FormField label="Brands Handled"><input className="input" value={profile.brands} onChange={f('brands')} placeholder="e.g. Tata Steel, UltraTech, Jaquar" /></FormField>
            </div>
            <FormField label="Certifications & Awards">
              <textarea className="input" rows={2} value={profile.certifications} onChange={f('certifications')} placeholder="e.g. ISO 9001, RERA Registered, CREDAI Member" style={{ resize: 'vertical' }} />
            </FormField>
          </div>

          {/* SECTION 3 */}
          <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>📞 Contact Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <FormField label="Contact Person Name"><input className="input" value={profile.contactPerson} onChange={f('contactPerson')} placeholder="Primary contact name" /></FormField>
              <FormField label="Phone Number"><input className="input" type="tel" value={profile.phone} onChange={f('phone')} placeholder="10-digit mobile number" /></FormField>
              <FormField label="Email Address"><input className="input" type="email" value={profile.email} onChange={f('email')} placeholder="business@email.com" /></FormField>
              <FormField label="WhatsApp Number"><input className="input" value={profile.whatsapp} onChange={f('whatsapp')} placeholder="With country code: +91..." /></FormField>
              <div style={{ gridColumn: '1/-1' }}>
                <FormField label="Website URL"><input className="input" value={profile.website} onChange={f('website')} placeholder="https://yourwebsite.com" /></FormField>
              </div>
            </div>
          </div>

          {/* SECTION 4 */}
          <div className="card" style={{ padding: '24px', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>🖼️ Portfolio & Gallery</h2>
            <FormField label="Gallery Image URLs (one per line)">
              <textarea className="input" rows={3} value={profile.galleryUrls} onChange={f('galleryUrls')} placeholder="https://drive.google.com/image1&#10;https://drive.google.com/image2" style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }} />
            </FormField>
            <FormField label="Video Links (one per line)">
              <textarea className="input" rows={2} value={profile.videoUrls} onChange={f('videoUrls')} placeholder="https://youtube.com/watch?v=..." style={{ resize: 'vertical', fontFamily: 'monospace', fontSize: '13px' }} />
            </FormField>
            <div style={{ padding: '14px 16px', background: 'rgba(252,110,32,0.05)', borderRadius: '10px', border: '1px solid rgba(252,110,32,0.15)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              📢 Your profile will appear on the public <strong>Buildogram Partner Directory</strong> after verification by the Buildogram team.
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={handleSave} style={{ alignSelf: 'flex-start', minWidth: '200px' }}>
            💾 Save Profile
          </button>
        </div>

        {/* RIGHT: PREVIEW CARD */}
        <div style={{ position: 'sticky', top: '80px' }}>
          <div className="card" style={{ padding: '24px', borderRadius: '20px', overflow: 'hidden' }}>
            {/* cover */}
            <div style={{ height: '100px', borderRadius: '12px', background: profile.coverUrl ? `url(${profile.coverUrl}) center/cover` : 'linear-gradient(135deg,#FFB347,#FC6E20,#E85D04)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
              {!profile.coverUrl && '🏗️'}
            </div>

            {/* logo */}
            <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: profile.logoUrl ? `url(${profile.logoUrl}) center/cover` : 'var(--secondary)', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginTop: '-40px', marginBottom: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              {!profile.logoUrl && '🏢'}
            </div>

            <div style={{ fontWeight: 800, fontSize: '17px', marginBottom: '6px' }}>{profile.companyName || 'Your Company Name'}</div>
            <div style={{ marginBottom: '12px' }}><StatusBadge status={profile.category || 'Builder'} /></div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
              {profile.description ? profile.description.slice(0, 120) + (profile.description.length > 120 ? '...' : '') : 'Add a description to tell clients about your expertise.'}
            </div>

            {profile.serviceAreas && (
              <div style={{ fontSize: '13px', marginBottom: '8px' }}>📍 {profile.serviceAreas}</div>
            )}
            {profile.phone && (
              <div style={{ fontSize: '13px', marginBottom: '8px' }}>📞 {profile.phone}</div>
            )}
            {profile.website && (
              <div style={{ fontSize: '13px', color: '#FC6E20', marginBottom: '8px' }}>🌐 {profile.website}</div>
            )}

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Profile Preview</span>
              <span style={{ color: completion >= 80 ? '#10B981' : '#F59E0B', fontWeight: 600 }}>{completion}% complete</span>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html:`@media(max-width:900px){.profile-grid{grid-template-columns:1fr!important}}`}} />
    </div>
  );
}
