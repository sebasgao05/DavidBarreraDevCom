// Enhanced Service Worker for PWA and Performance
const CACHE_NAME = 'david-portfolio-v2.0';
const STATIC_CACHE = 'static-v2.0';
const DYNAMIC_CACHE = 'dynamic-v2.0';
const FONT_CACHE = 'fonts-v2.0';
const IMAGE_CACHE = 'images-v2.0';

// Critical resources for immediate cache
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Font resources
const FONT_URLS = [
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
];

// Critical images to preload
const CRITICAL_IMAGES = [
  '/images/profile/profile-david.webp',
  '/icons/icon-192x192.png'
];

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];
const MAX_CACHE_SIZE = 50;
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(FONT_CACHE).then(cache => {
        console.log('🔤 Caching fonts');
        return cache.addAll(FONT_URLS);
      }),
      caches.open(IMAGE_CACHE).then(cache => {
        console.log('🖼️ Caching critical images');
        return cache.addAll(CRITICAL_IMAGES);
      })
    ]).then(() => {
      console.log('✅ SW installation complete');
      return self.skipWaiting();
    }).catch(error => {
      console.error('❌ SW installation failed:', error);
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, FONT_CACHE, IMAGE_CACHE];
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!validCaches.includes(cacheName)) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🔄 SW activated');
      return self.clients.claim();
    }).catch(error => {
      console.error('❌ SW activation failed:', error);
    })
  );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  if (isFontRequest(url)) {
    return handleFontRequest(request);
  } else if (isImageRequest(url.pathname)) {
    return handleImageRequest(request);
  } else if (isStaticAsset(url.pathname)) {
    return handleStaticAsset(request);
  } else {
    return handlePageRequest(request);
  }
}

// Cache-first for fonts
async function handleFontRequest(request) {
  const cache = await caches.open(FONT_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      await limitCacheSize(FONT_CACHE, MAX_CACHE_SIZE);
    }
    return networkResponse;
  } catch (error) {
    console.log('🔤 Font fetch failed');
    return new Response('Font not available', { status: 404 });
  }
}

// Cache-first para imágenes
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isExpired(cachedResponse)) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-timestamp', Date.now().toString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers
      });
      
      await cache.put(request, modifiedResponse);
      await limitCacheSize(IMAGE_CACHE, MAX_CACHE_SIZE);
    }
    return networkResponse;
  } catch (error) {
    console.log('🖼️ Image fetch failed, serving from cache');
    return cachedResponse || createOfflineImageResponse();
  }
}

// Network-first para assets estaticos
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('SW static asset fetch failed, using cache');
  }

  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  return new Response('Offline', { status: 503 });
}

// Stale-while-revalidate para páginas
async function handlePageRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE);
    }
    return networkResponse;
  }).catch(() => null);
  
  if (cachedResponse) {
    fetchPromise;
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetchPromise;
    if (networkResponse) return networkResponse;
  } catch (error) {
    console.log('📄 Page fetch failed');
  }
  
  if (request.mode === 'navigate') {
    const fallback = await cache.match('/');
    if (fallback) return fallback;
  }
  
  return createOfflinePageResponse();
}

// Utility functions
function isFontRequest(url) {
  return url.hostname === 'fonts.gstatic.com' || 
         url.pathname.includes('.woff') || 
         url.pathname.includes('.woff2');
}

function isImageRequest(pathname) {
  return IMAGE_EXTENSIONS.some(ext => pathname.includes(ext));
}

function isStaticAsset(pathname) {
  return pathname.includes('/static/') || 
         pathname.includes('.js') || 
         pathname.includes('.css') ||
         pathname.includes('/manifest.json');
}

function isExpired(response) {
  const timestamp = response.headers.get('sw-cache-timestamp');
  if (!timestamp) return false;
  return Date.now() - parseInt(timestamp) > CACHE_EXPIRY;
}

async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const keysToDelete = keys.slice(0, keys.length - maxSize);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

function createOfflineImageResponse() {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280">
        Imagen no disponible offline
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    }
  });
}

function createOfflinePageResponse() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Offline - David Barrera</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
                 text-align: center; padding: 2rem; background: #f9fafb; }
          .container { max-width: 400px; margin: 0 auto; }
          h1 { color: #374151; margin-bottom: 1rem; }
          p { color: #6b7280; line-height: 1.6; }
          .retry { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; 
                   border: none; border-radius: 0.5rem; cursor: pointer; margin-top: 1rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sin conexión</h1>
          <p>No hay conexión a internet. Algunas funciones pueden no estar disponibles.</p>
          <button class="retry" onclick="window.location.reload()">Reintentar</button>
        </div>
      </body>
    </html>
  `;
  
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'
    }
  });
}

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(clearAllCaches());
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('🗑️ All caches cleared');
}
