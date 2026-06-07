'use client';
import { useState, useEffect } from 'react';

const TEMPLATES = {
  construction: "Project Update from {area}: Our engineering team just completed a major milestone for this home construction project. {description} We utilized {methods_used} to ensure structural integrity and quality standards. Buildogram protects property owners with transparent BOQ-driven execution and strict site supervision. Building in Chennai? Let our engineers manage it.",
  materials: "Material Delivery in {area}: Quality construction starts with genuine materials. We just verified and delivered {materials_used} for a site in {area}. {description} Buildogram sources direct from manufacturers to prevent adulteration and overpricing. Get reliable cement, steel, and aggregates delivered to your site in Chennai.",
  structural_audit: "Structural Audit Completed in {area}: Safety first. Our structural engineering team just finished an assessment in {area}. {description} Using advanced NDT methods like {methods_used}, we provided the owner with a detailed safety report. Worried about cracks or old building strength in Chennai? Book an engineer-led audit today.",
  land_survey: "Land Survey & Marking in {area}: Precision matters before you build. Our survey team completed a boundary layout in {area} using {methods_used}. {description} Don't risk encroachments or design errors. Get an accurate digital survey and FMB matching from Buildogram's verified surveyors in Chennai.",
  soil_testing: "Soil Investigation in {area}: Every strong foundation needs exact soil data. We just completed a geotechnical soil test in {area}. {description} Using {methods_used}, we determined the safe bearing capacity for the upcoming foundation design. Planning to build in Chennai? Start with an accurate soil test.",
  piling: "Pile Foundation Work in {area}: Deep foundation progress update! Our team executed pile foundation work in {area} using {methods_used}. {description} Buildogram ensures structural safety from the ground up with engineered pile design and execution. Need piling contractors in Chennai? Contact our engineers.",
  partner_project: "Verified Partner Project in {area}: Check out this excellent execution by one of Buildogram's verified partners in {area}. {description} We vet contractors, builders, and architects so you don't have to. Want to build with confidence in Chennai? Hire a verified professional backed by our engineering oversight.",
  property_passport: "Property Passport Digitized in {area}: Another property owner secured! We just digitized the handover and maintenance records for a property in {area}. {description} No more lost plumbing lines or warranty cards. Protect your real estate asset with Buildogram's Property Passport in Chennai."
};

export default function GbpGenerator({ assetData }) {
  const [postText, setPostText] = useState('');
  
  useEffect(() => {
    if (!assetData.category || !assetData.area) return;
    
    let text = TEMPLATES[assetData.category] || TEMPLATES.construction;
    
    text = text.replace(/{area}/g, assetData.area || '[Area]');
    text = text.replace(/{description}/g, assetData.description || '');
    text = text.replace(/{methods_used}/g, assetData.methods_used || 'standard procedures');
    text = text.replace(/{materials_used}/g, assetData.materials_used || 'premium materials');
    
    // Clean up empty spaces and limit to ~700 chars if necessary, though template keeps it short
    text = text.replace(/\s+/g, ' ').trim();
    
    setPostText(text.substring(0, 1500)); // GBP allows 1500, but 700 is sweet spot
  }, [assetData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postText);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ position: 'sticky', top: '24px' }}>
      <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📢</span> GBP Post Generator
        </h2>
        <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px', lineHeight: 1.5 }}>
          Auto-generates a privacy-safe update for Google Business Profile to boost local entity trust.
        </p>
        
        <div style={{ background: 'white', padding: '16px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px', minHeight: '150px' }}>
          {postText || 'Fill out the category, area, and description to generate a post.'}
        </div>
        
        <button 
          onClick={copyToClipboard}
          disabled={!postText}
          style={{ width: '100%', padding: '8px', background: 'white', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: postText ? 'pointer' : 'not-allowed', fontWeight: 600, color: '#0F172A' }}
        >
          Copy GBP Text
        </button>
      </div>

      <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px' }}>GBP Publishing Checklist</h3>
        <ul style={{ fontSize: '13px', color: '#475569', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
          <li>Log into Google Business Profile</li>
          <li>Click "Add Update"</li>
          <li>Paste the copied text</li>
          <li>Upload 1-3 unblurred, safe photos</li>
          <li>Select "Learn More" button</li>
          <li>Link to: <strong>https://buildogram.in{assetData.linked_service_url || `/proof/${assetData.slug}`}</strong></li>
        </ul>
      </div>
    </div>
  );
}
