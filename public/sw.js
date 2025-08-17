// Service Worker for Advanced Caching - Phase 3 Optimization
const CACHE_NAME = 'remelife-v1.0.0';
const STATIC_CACHE = 'remelife-static-v1.0.0';
const DYNAMIC_CACHE = 'remelife-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/remelife-logo.webp',
  '/activity-library-icon.webp',
  '/digitalcareecosystem.webp',
  '/forums-icon.webp',
  '/games-apps-icon.webp'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📋 Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response
            const responseToCache = networkResponse.clone();
            
            // Determine which cache to use
            const cacheName = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
            
            // Cache the response
            caches.open(cacheName)
              .then((cache) => {
                console.log('💾 Caching:', request.url);
                cache.put(request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('🌐 Network request failed:', error);
            
            // Return offline fallback for HTML pages
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
            
            throw error;
          });
      })
  );
});

// Helper function to determine if asset should be statically cached
function isStaticAsset(url) {
  return url.includes('/_next/static/') || 
         url.includes('.webp') || 
         url.includes('.svg') || 
         url.includes('.woff2') ||
         url.includes('favicon');
}

// Background sync for offline actions (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
      event.waitUntil(
        // Handle any offline actions here
        Promise.resolve()
      );
    }
  });
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    console.log('📬 Push notification received:', data);
    
    const options = {
      body: data.body,
      icon: '/remelife-logo.webp',
      badge: '/favicon.ico',
      vibrate: [100, 50, 100],
      data: data.data || {}
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

console.log('🎯 ReMeLife Service Worker loaded successfully');
