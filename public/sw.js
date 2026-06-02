const CACHE_NAME = 'buildogram-static-v2';

const STATIC_ASSETS = [
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline',
  '/globals.css'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Ignore non-GET requests entirely
  if (request.method !== 'GET') return;

  // 2. Ignore /api/ completely (NEVER CACHE)
  if (url.pathname.startsWith('/api/')) return;

  // 3. Ignore auth or upload endpoints just in case
  if (url.pathname.includes('/auth/') || url.pathname.includes('/upload')) return;

  // 4. Static Assets (Cache First)
  if (
    url.pathname.startsWith('/icons/') || 
    url.pathname.startsWith('/_next/static/') || 
    url.pathname.includes('.svg') || 
    url.pathname.includes('.png') ||
    url.pathname.includes('.jpg')
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          if (response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 5. Dashboard Pages (Network First, NO CACHING, Offline Fallback)
  // NEVER cache sensitive HTML or JSON data for dashboards
  const isDashboard = 
    url.pathname.startsWith('/partner/') ||
    url.pathname.startsWith('/supplier/') ||
    url.pathname.startsWith('/client/') ||
    url.pathname.startsWith('/ops/') ||
    url.pathname.startsWith('/admin/');

  if (isDashboard) {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline'))
    );
    return;
  }

  // 6. Public Pages (Network First, Cache Fallback for speed if possible)
  // For safety, we just use Network First -> Offline Fallback for everything else.
  event.respondWith(
    fetch(request).then(response => {
      // Optional: Could cache public pages here, but keeping it simple/safe.
      return response;
    }).catch(() => {
      if (request.headers.get('accept').includes('text/html')) {
        return caches.match('/offline');
      }
    })
  );
});
