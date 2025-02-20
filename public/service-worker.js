self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installed');
    event.waitUntil(
      caches.open('static-v1').then((cache) => {
        return cache.addAll(['/']);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activated');
  });
  