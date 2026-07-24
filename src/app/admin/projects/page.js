'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function AdminProjects() {
  const router = useRouter();
  useEffect(() => { router.replace('/ops/projects'); }, []);
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: 'Inter,sans-serif', color: '#64748b' }}>Redirecting to Projects…</div>;
}
