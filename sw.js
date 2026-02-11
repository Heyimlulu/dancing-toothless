const CACHE_NAME = "toothless-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/css/mobile.css",
  "/js/main.js",
  "/assets/og-image.jpg",
  "/icons/favicon.ico",
  "/icons/favicon-96x96.png",
  "/icons/web-app-manifest-192x192.png",
  "/icons/site.webmanifest",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  "https://cdn.tailwindcss.com"
];

// Install event - cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
