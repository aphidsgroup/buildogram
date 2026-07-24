'use client';
import { useState } from 'react';

export default function EngineerReviewCTA({ projectId, selectedVersionId, disabled }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleRequestReview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ai-floor-plans/projects/${projectId}/request-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedVersionId })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to request review');
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', marginTop: '20px' }}>
        <strong>Review Requested!</strong> Our engineers will contact you shortly.
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px', padding: '16px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fcd34d' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Ready for Construction?</h4>
      <p style={{ fontSize: '13px', color: '#b45309', marginBottom: '12px' }}>
        AI concepts need structural validation before building. Send this to our engineers for a quote on formal blueprints.
      </p>
      
      {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}
      
      <button 
        onClick={handleRequestReview} 
        className="btn btn-primary" 
        style={{ width: '100%', background: '#d97706', borderColor: '#d97706' }}
        disabled={loading || disabled}
      >
        {loading ? 'Requesting...' : 'Request Engineer Review'}
      </button>
    </div>
  );
}
