'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const DEMO_RFQS = [
  { id: 'RFQ001', project: 'Rajesh Kumar Villa', material: 'UltraTech Cement OPC 53', qty: 200, unit: 'Bags', requiredDate: '2026-06-10', urgency: 'High', status: 'New', location: 'Velachery, Chennai', partnerName: 'Sri Rajan Builders' },
  { id: 'RFQ002', project: 'ECR Villa – Santhosh', material: 'Tata Tiscon TMT 16mm', qty: 3, unit: 'MT', requiredDate: '2026-06-15', urgency: 'High', status: 'Quoted', location: 'ECR, Chennai', partnerName: 'GreenBuild Contractors' },
  { id: 'RFQ003', project: 'Arun Renovation – Porur', material: 'Jaquar Wall Mixer Set', qty: 6, unit: 'Nos', requiredDate: '2026-06-20', urgency: 'Medium', status: 'New', location: 'Porur, Chennai', partnerName: 'Arjun Interiors' },
];

const DEMO_QUOTATIONS = [
  { id: 'Q001', rfqId: 'RFQ002', material: 'Tata Tiscon TMT 16mm', qty: 3, unit: 'MT', rate: 68000, tax: 18, deliveryCharge: 2500, deliveryDays: 3, validUntil: '2026-06-20', status: 'Submitted', notes: 'Ex-warehouse Ambattur. Free delivery above 5MT.' },
];

function fmt(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

const URGENCY_COLORS = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };
const STATUS_COLORS  = { New: '#3B82F6', Quoted: '#8B5CF6', 'Under Review': '#F59E0B', Accepted: '#10B981', Rejected: '#EF4444' };

export default function SupplierDashboard() {
  const [user, setUser] = useState(null);
  const newRFQs = DEMO_RFQS.filter(r => r.status === 'New').length;

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => { if (d.user) setUser(d.user); });
  }, []);

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: '28px', background: 'linear-gradient(135deg, #0F172A 0%, #064E3B 100%)', padding: '36px', borderRadius: '20px', color: 'white' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Supplier'} 👋
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px' }}>Here's your Buildogram Supplier Portal overview.</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { icon: '📋', label: 'New RFQs',        value: newRFQs,                color: '#3B82F6' },
          { icon: '💬', label: 'Active Quotes',   value: DEMO_QUOTATIONS.length, color: '#8B5CF6' },
          { icon: '📦', label: 'Active Orders',   value: 1,                      color: '#10B981' },
          { icon: '⭐', label: 'Rating',           value: '4.8 / 5',             color: '#F59E0B' },
        ].map(c => (
          <div key={c.label} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontSize: '24px', background: c.color + '15', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: c.color }}>{c.value}</div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <Link href="/supplier/requests" style={{ background: '#3B82F6', color: 'white', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>📋 View New RFQs</Link>
        <Link href="/supplier/quotations" style={{ background: '#8B5CF6', color: 'white', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>💬 My Quotations</Link>
      </div>

      {/* Pending RFQs */}
      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>Pending RFQs</h2>
          <Link href="/supplier/requests" style={{ fontSize: '13px', color: '#10B981', fontWeight: 700 }}>View all →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {DEMO_RFQS.filter(r => r.status === 'New').map(rfq => (
            <div key={rfq.id} style={{ padding: '14px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{rfq.material}</div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>{rfq.qty} {rfq.unit} · {rfq.location} · Due: {rfq.requiredDate}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ background: (URGENCY_COLORS[rfq.urgency] || '#64748B') + '18', color: URGENCY_COLORS[rfq.urgency] || '#64748B', border: `1px solid ${URGENCY_COLORS[rfq.urgency] || '#64748B'}44`, padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{rfq.urgency}</span>
                <Link href="/supplier/requests" style={{ background: '#10B981', color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textDecoration: 'none' }}>Submit Quote</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Plan Notice */}
      <div style={{ background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', border: '1px solid #86EFAC', borderRadius: '14px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '15px', color: '#15803D', marginBottom: '4px' }}>✅ Buildogram Verified Supplier</div>
          <div style={{ fontSize: '13px', color: '#16A34A' }}>You are on the Free Supplier Plan. Receive up to 20 RFQs/month. Upgrade coming soon.</div>
        </div>
        <button style={{ background: '#15803D', color: 'white', padding: '10px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>Upgrade Coming Soon</button>
      </div>
    </div>
  );
}
