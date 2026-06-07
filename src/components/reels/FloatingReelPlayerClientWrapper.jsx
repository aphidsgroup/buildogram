'use client';
import dynamic from 'next/dynamic';

const FloatingReelPlayer = dynamic(() => import('./FloatingReelPlayer'), { ssr: false });

export default function FloatingReelPlayerClientWrapper() {
  return <FloatingReelPlayer />;
}
