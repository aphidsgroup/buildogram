'use client';
import { useState, useEffect } from 'react';
import styles from '../studio/studio.module.css';

export default function CreditBadge() {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch('/api/ai-floor-plans/credits');
        const data = await res.json();
        if (data.balance !== undefined) {
          setCredits(data.balance);
        }
      } catch (err) {
        console.error('Failed to fetch credits:', err);
      } finally {
        setLoading(false);
      }
    }
    
    // Initial fetch
    fetchCredits();
    
    // In a real app we'd use a context or SWR, but polling every 10s for MVP
    const interval = setInterval(fetchCredits, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading || credits === null) return null;

  return (
    <div className={\`\${styles.badge} \${credits < 2 ? styles.low : ''}\`}>
      💎 {credits} Credits
    </div>
  );
}
