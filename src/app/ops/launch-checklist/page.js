'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CHECKLIST_ITEMS = [
  { id: 'env_vars', title: 'Environment Variables Secure', category: 'Security' },
  { id: 'db_connected', title: 'Production DB Connected', category: 'Infrastructure' },
  { id: 'payment_gateway', title: 'Razorpay Live Keys Configured', category: 'Integrations' },
  { id: 'whatsapp_api', title: 'WhatsApp Cloud API Connected', category: 'Integrations' },
  { id: 'seo_metadata', title: 'SEO Metadata & Sitemap Generated', category: 'Content' },
  { id: 'legal_pages', title: 'Privacy Policy & Terms Active', category: 'Content' },
  { id: 'demo_data_removed', title: 'Demo Data Hard Deleted', category: 'Data' },
  { id: 'ops_accounts', title: 'Core Ops Accounts Provisioned', category: 'Access' },
];

export default function LaunchChecklist() {
  const [checkedItems, setCheckedItems] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('buildogram_launch_qa');
      if (saved) setCheckedItems(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const toggle = (id) => {
    const next = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(next);
    localStorage.setItem('buildogram_launch_qa', JSON.stringify(next));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100) || 0;

  if (!mounted) return null;

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Launch QA Tracker</h1>
          <p style={{ color: '#64748b' }}>Final verification steps before public release.</p>
        </div>
        <Link href="/ops" className="btn btn-outline">Back to Ops</Link>
      </div>

      <div className="card" style={{ marginBottom: '32px', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontWeight: 600, color: '#334155' }}>Readiness Score</span>
          <span style={{ fontWeight: 700, color: progress === 100 ? '#10b981' : '#f59e0b' }}>{progress}%</span>
        </div>
        <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: progress === 100 ? '#10b981' : '#3b82f6', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {CHECKLIST_ITEMS.map(item => (
          <div key={item.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', padding: '16px 20px', borderLeft: checkedItems[item.id] ? '4px solid #10b981' : '4px solid #cbd5e1' }}>
            <input 
              type="checkbox" 
              checked={!!checkedItems[item.id]} 
              onChange={() => toggle(item.id)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: checkedItems[item.id] ? '#64748b' : '#1e293b', textDecoration: checkedItems[item.id] ? 'line-through' : 'none' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div style={{ marginTop: '32px', padding: '24px', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
          <h2 style={{ fontSize: '20px', color: '#065f46', marginBottom: '8px' }}>All Systems Go</h2>
          <p style={{ color: '#047857', fontSize: '15px' }}>The platform has passed the final QA checks and is ready for production traffic.</p>
        </div>
      )}
    </div>
  );
}
