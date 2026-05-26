import { useState, useEffect } from 'react';

export default function BoqReviewTab({ lead }) {
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetch(`/api/boq-reviews?leadId=${lead.id}`).then(res => res.json()).then(data => {
      if (data.data && data.data.length > 0) setReview(data.data[0]);
    });
  }, [lead.id]);

  const createReview = async () => {
    const res = await fetch('/api/boq-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: lead.id, reviewStatus: 'under_review' })
    });
    const result = await res.json();
    setReview(result.data);
  };

  if (!review) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: 'white', border: '1px dashed #CBD5E1', borderRadius: '8px' }}>
        <button className="btn btn-primary" onClick={createReview}>Start Engineer BOQ/Scope Review</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ background: 'white', padding: '24px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>Engineer Review Cockpit</h3>
        <span className="badge badge-yellow" style={{ textTransform: 'capitalize' }}>{review.reviewStatus.replace('_', ' ')}</span>
      </div>

      <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Missing Items Identified</label>
          <textarea className="input" rows="3" placeholder="List missing items in client BOQ..."></textarea>
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Risk Items / Red Flags</label>
          <textarea className="input" rows="3" placeholder="List structurally or financially risky items..."></textarea>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '6px' }}>Engineer Final Summary</label>
        <textarea className="input" rows="4" placeholder="Overall observation of the plan/quote..."></textarea>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn btn-outline btn-sm">Request More Docs</button>
        <button className="btn btn-primary btn-sm">Complete Review</button>
      </div>
    </div>
  );
}
