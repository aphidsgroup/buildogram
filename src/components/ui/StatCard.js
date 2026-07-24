'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './StatCard.module.css';

function useCountUp(target, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || typeof target !== 'number') return;
    const start = performance.now();
    const raf = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

export default function StatCard({ icon, label, value, description, trend, trendUp, color = 'orange', className = '' }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const numericValue = typeof value === 'number' ? value : null;
  const count = useCountUp(numericValue, 1200, inView);
  const displayValue = numericValue !== null ? count.toLocaleString() : value;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.card} ${styles[color]} ${className}`}>
      <div className={styles.top}>
        {icon && <div className={styles.iconWrap}>{icon}</div>}
        {trend && (
          <span className={`${styles.trend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
        )}
      </div>
      <div className={styles.value}>{displayValue}</div>
      <div className={styles.label}>{label}</div>
      {description && <div className={styles.desc}>{description}</div>}
    </div>
  );
}
