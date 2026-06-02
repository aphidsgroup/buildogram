'use client';
import { useState } from 'react';

export default function PilotGuides() {
  const [active, setActive] = useState('partner');

  const tabs = [
    { id: 'partner', label: 'Partner Guide' },
    { id: 'supplier', label: 'Supplier Guide' },
    { id: 'ops', label: 'Ops Guide' },
    { id: 'customer', label: 'Customer Guide' }
  ];

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{ flex: 1, padding: '14px', border: 'none', background: active === t.id ? 'white' : 'transparent', fontWeight: active === t.id ? 700 : 500, color: active === t.id ? '#0F172A' : '#64748B', borderBottom: active === t.id ? '2px solid #FC6E20' : '2px solid transparent', cursor: 'pointer' }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '24px', fontSize: '14px', lineHeight: '1.6', color: '#334155' }}>
        {active === 'partner' && (
          <div>
            <h3 style={{ marginTop: 0, color: '#0F172A' }}>Partner Quick-Start</h3>
            <p><strong>1. Project Updates:</strong> Go to <em>Projects &rarr; Select Project &rarr; Site Updates</em>. Add photos and notes. Toggle "Customer Visible" to control if the client sees it.</p>
            <p><strong>2. Requesting Materials:</strong> Go to <em>Materials &rarr; Add Request</em>. Fill in the item, quantity, and required date. This alerts Ops to find suppliers.</p>
            <p><strong>3. Milestones:</strong> Mark stages as complete to trigger automated updates to the customer.</p>
          </div>
        )}
        {active === 'supplier' && (
          <div>
            <h3 style={{ marginTop: 0, color: '#0F172A' }}>Supplier Quick-Start</h3>
            <p><strong>1. Receiving RFQs:</strong> You will get notified when Buildogram assigns an RFQ to you.</p>
            <p><strong>2. Submitting a Quote:</strong> Go to <em>Requests</em>, enter your best rate, total amount, and estimated delivery date. Click Submit.</p>
            <p><strong>3. Approval:</strong> Once Ops approves your quote, you will receive a confirmation to dispatch the materials.</p>
          </div>
        )}
        {active === 'ops' && (
          <div>
            <h3 style={{ marginTop: 0, color: '#0F172A' }}>Ops/Admin Quick-Start</h3>
            <p><strong>1. Lead Assignment:</strong> Go to <em>Leads</em>. Review new inquiries and assign them to approved Partners.</p>
            <p><strong>2. Material RFQs:</strong> When a Partner requests material, review it in <em>Material Requests</em>. Assign it to 1 or more Suppliers to get quotes.</p>
            <p><strong>3. Quote Approval:</strong> Compare incoming supplier quotes. Approve the best one. This notifies the Partner and Supplier.</p>
          </div>
        )}
        {active === 'customer' && (
          <div>
            <h3 style={{ marginTop: 0, color: '#0F172A' }}>Customer View Guide</h3>
            <p><strong>1. Tracking Progress:</strong> The Customer sees a safe, sanitized view of their project. Internal notes are hidden.</p>
            <p><strong>2. Timeline & Updates:</strong> Customers can see completed milestones and photos published by the Partner.</p>
            <p><strong>3. Trust & Transparency:</strong> The goal is to reduce "What is happening on site?" phone calls by providing a 24/7 digital logbook.</p>
          </div>
        )}
      </div>
    </div>
  );
}
