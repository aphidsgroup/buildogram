'use client';
import { useEffect, useState, useRef } from 'react';

/**
 * BackToTopButton -- the scroll-ring button, decoupled from fixed positioning.
 * Fixed position is now owned by FloatingActionStack.
 * Visibility logic and scroll-ring SVG preserved exactly.
 */
export default function BackToTopButton({ style = {} }) {
  const [visible, setVisible]     = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const btnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH    = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > 300);
      setScrollPct(docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  /*
   * GEOMETRY -- single source of truth (unchanged)
   * Button: 52  52 px
   * Ring center: cx = cy = 26
   * Ring radius : r = 23.75
   */
  const SIZE   = 52;
  const CX     = SIZE / 2;
  const CY     = SIZE / 2;
  const SW     = 2.5;
  const R      = CX - SW / 2 - 1;
  const CIRC   = 2 * Math.PI * R;
  const offset = CIRC - (scrollPct / 100) * CIRC;

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      onMouseEnter={() => {
        if (!btnRef.current) return;
        btnRef.current.style.background  = 'rgba(252,110,32,0.20)';
        btnRef.current.style.boxShadow   = '0 12px 40px rgba(252,110,32,0.30)';
        btnRef.current.style.transform   = visible ? 'translateY(-2px) scale(1.07)' : 'translateY(8px) scale(0.85)';
      }}
      onMouseLeave={() => {
        if (!btnRef.current) return;
        btnRef.current.style.background  = 'rgba(12, 20, 40, 0.60)';
        btnRef.current.style.boxShadow   = '0 8px 32px rgba(0,0,0,0.40)';
        btnRef.current.style.transform   = visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.85)';
      }}
      style={{
        /* size */
        width       : `${SIZE}px`,
        height      : `${SIZE}px`,
        padding     : 0,
        flexShrink  : 0,

        /* glass */
        borderRadius    : '50%',
        border          : 'none',
        background      : 'rgba(12, 20, 40, 0.60)',
        backdropFilter  : 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow       : '0 8px 32px rgba(0,0,0,0.40)',

        /* center the arrow */
        display         : 'flex',
        alignItems      : 'center',
        justifyContent  : 'center',
        cursor          : 'pointer',
        position        : 'relative',

        /* show / hide -- visibility logic preserved exactly */
        opacity         : visible ? 1 : 0,
        transform       : visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.85)',
        pointerEvents   : visible ? 'auto' : 'none',
        transition      : [
          'opacity 0.35s cubic-bezier(.4,0,.2,1)',
          'transform 0.35s cubic-bezier(.4,0,.2,1)',
          'background 0.25s ease',
          'box-shadow 0.25s ease',
        ].join(', '),
        ...style,
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        style={{
          position      : 'absolute',
          inset         : 0,
          pointerEvents : 'none',
          transform     : 'rotate(-90deg)',
        }}
      >
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={SW} />
        <circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(252,110,32,0.90)"
          strokeWidth={SW}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.25s ease' }}
        />
      </svg>

      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
        style={{ position: 'relative', zIndex: 1, display: 'block' }}>
        <path d="M7 11V3M3 7l4-4 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
