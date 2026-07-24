'use client';

import { useState, useEffect } from 'react';

export default function PWAInstallPrompt({ message = "Install Buildogram for a faster experience." }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if user dismissed previously
    const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
    
    // Detect if already installed (standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    if (isDismissed || isStandalone) return;

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div style={{
      background: '#F8FAFC',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 200px' }}>
        <div style={{ width: '40px', height: '40px', background: '#FC6E20', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>
          B
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '15px', color: '#0F172A', fontWeight: 600 }}>Get the App</h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{message}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleDismiss} style={{ padding: '10px 16px', border: 'none', background: 'transparent', color: '#64748B', fontWeight: 600, fontSize: '14px', cursor: 'pointer', minHeight: '44px' }}>
          Later
        </button>
        <button onClick={handleInstall} style={{ padding: '10px 20px', border: 'none', background: '#FC6E20', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', minHeight: '44px' }}>
          Install
        </button>
      </div>
    </div>
  );
}
