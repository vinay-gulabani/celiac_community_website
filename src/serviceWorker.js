/* serviceWorker.js */
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("celiac-app-cache").then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/favicon.ico",
          "/icons/icon-192x192.png",
          "/icons/icon-512x512.png"
        ]);
      })
    );
    self.skipWaiting();
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  