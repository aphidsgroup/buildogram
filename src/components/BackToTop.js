'use client';
import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 300);
      setScrollPct(docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress
  const radius = 18;
  const circ = 2 * Math.PI * radius;
  const dash = circ - (scrollPct / 100) * circ;

  return (
    <>
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.18)',
          background: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(252,110,32,0.15) inset',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(252,110,32,0.22)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(252,110,32,0.25), 0 0 0 1px rgba(252,110,32,0.35) inset';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.06)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(15, 23, 42, 0.55)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(252,110,32,0.15) inset';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      >
        {/* Circular progress ring */}
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx="26" cy="26" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
          {/* Progress */}
          <circle
            cx="26" cy="26" r={radius}
            fill="none"
            stroke="rgba(252,110,32,0.85)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            style={{ transition: 'stroke-dashoffset 0.2s ease' }}
          />
        </svg>

        {/* Arrow icon */}
        <svg
          width="16" height="16" viewBox="0 0 16 16"
          fill="none"
          style={{ position: 'relative', zIndex: 1 }}
        >
          <path
            d="M8 12V4M4 8l4-4 4 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
