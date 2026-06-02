'use client';

import { useEffect } from 'react';

export default function PWARegister() {
  useEffect(() => {
    // Only register if explicitly enabled or in production by default (assumed true if window exists and navigator exists)
    const pwaEnabled = process.env.NEXT_PUBLIC_ENABLE_PWA !== 'false';
    
    if (pwaEnabled && 'serviceWorker' in navigator && window.isSecureContext) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW Registered:', registration.scope);
            }
            
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('New PWA update available.');
                  }
                });
              }
            });
          },
          (err) => {
            if (process.env.NODE_ENV === 'development') {
              console.error('SW Registration failed:', err);
            }
          }
        );
      });
    }
  }, []);

  return null;
}
