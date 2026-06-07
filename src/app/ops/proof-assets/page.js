'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProofAssetsPage() {
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ops/proof-assets')
      .then(res => res.json())
      .then(data => {
        setProofs(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Proof Assets</h1>
        <Link href="/ops/proof-assets/editor" className="btn btn-primary">
          + Add Proof Asset
        </Link>
      </div>

      {loading ? (
        <p>Loading proof assets...</p>
      ) : proofs.length === 0 ? (
        <div style={{ background: 'white', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <p style={{ color: '#64748B' }}>No proof assets found. Create one to build local trust.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: '13px' }}>Title</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: '13px' }}>Category</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: '13px' }}>Area</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: '13px' }}>Approvals</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#475569', fontSize: '13px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proofs.map(proof => (
                <tr key={proof.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 500 }}>{proof.title}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748B' }}>{proof.category}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748B' }}>{proof.area}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', background: proof.approved_for_website ? '#DCFCE7' : '#F1F5F9', color: proof.approved_for_website ? '#166534' : '#94A3B8' }}>Web</span>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', background: proof.approved_for_gbp ? '#DBEAFE' : '#F1F5F9', color: proof.approved_for_gbp ? '#1E40AF' : '#94A3B8' }}>GBP</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px' }}>
                    <Link href={`/ops/proof-assets/editor?id=${proof.id}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                      Edit / Generate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
