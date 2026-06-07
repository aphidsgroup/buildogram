'use client';

import { useState } from 'react';
import styles from './PartnerApplicationForm.module.css';

const CATEGORIES = [
  'Builder', 'Contractor', 'Architect', 'Structural Engineer', 'Surveyor',
  'Soil Testing Lab', 'NDT Testing Lab', 'Piling Contractor', 'Material Supplier',
  'Steel Fabricator', 'PEB Contractor', 'Interior Designer', 'Waterproofing Vendor',
  'Solar Vendor', 'Maintenance Vendor'
];

export default function PartnerApplicationForm() {
  const [formData, setFormData] = useState({
    business_name: '',
    contact_person: '',
    phone: '',
    email: '',
    category: '',
    service_areas: '',
    years_experience: '',
    services_offered: '',
    project_types: '',
    website: '',
    gst_number: '',
    registration_number: '',
    license_number: '',
    portfolio_links: '',
    profile_summary: '',
    consent_given: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent_given) {
      setError('You must agree to the terms and consent to verification.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        service_areas: formData.service_areas.split(',').map(s => s.trim()).filter(Boolean),
        services_offered: formData.services_offered.split(',').map(s => s.trim()).filter(Boolean),
        project_types: formData.project_types.split(',').map(s => s.trim()).filter(Boolean),
        portfolio_links: formData.portfolio_links.split(',').map(s => s.trim()).filter(Boolean),
      };

      const res = await fetch('/api/partner/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      setError('An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <h3>Application Received!</h3>
        <p>Thank you for applying to join the Buildogram Partner Ecosystem. Our operations team will review your application and initiate the verification process shortly.</p>
      </div>
    );
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Partner Application</h3>
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Business Name *</label>
          <input required type="text" name="business_name" value={formData.business_name} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Contact Person *</label>
          <input required type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Phone Number *</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Email Address *</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Partner Category *</label>
          <select required name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label>Years of Experience *</label>
          <input required type="number" name="years_experience" value={formData.years_experience} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.field}>
        <label>Service Areas (comma-separated, e.g. Adyar, Velachery) *</label>
        <input required type="text" name="service_areas" value={formData.service_areas} onChange={handleChange} />
      </div>

      <div className={styles.field}>
        <label>Services Offered (comma-separated)</label>
        <input type="text" name="services_offered" value={formData.services_offered} onChange={handleChange} placeholder="e.g. Residential Construction, Interiors, Renovation" />
      </div>

      <div className={styles.field}>
        <label>Project Types (comma-separated)</label>
        <input type="text" name="project_types" value={formData.project_types} onChange={handleChange} placeholder="e.g. Villas, Apartments, Commercial" />
      </div>

      <div className={styles.field}>
        <label>Short Profile Summary</label>
        <textarea name="profile_summary" value={formData.profile_summary} onChange={handleChange} rows={3} placeholder="Describe your business and expertise briefly."></textarea>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Website / Social Link</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>GST Number (Optional)</label>
          <input type="text" name="gst_number" value={formData.gst_number} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Company Registration No (Optional)</label>
          <input type="text" name="registration_number" value={formData.registration_number} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>License / Certification No (Optional)</label>
          <input type="text" name="license_number" value={formData.license_number} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.field}>
        <label>Portfolio / Proof Assets Links (comma-separated, e.g. Google Drive, Website)</label>
        <input type="text" name="portfolio_links" value={formData.portfolio_links} onChange={handleChange} />
      </div>

      <div className={styles.checkboxField}>
        <input type="checkbox" id="consent_given" name="consent_given" checked={formData.consent_given} onChange={handleChange} />
        <label htmlFor="consent_given">I agree to the Terms of Service and consent to Buildogram verifying my credentials and project history.</label>
      </div>

      <button type="submit" disabled={loading} className={styles.submitBtn}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
