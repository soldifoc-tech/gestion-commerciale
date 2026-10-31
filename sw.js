/**
 * Service Worker - Gestion Commerciale (Offline-First)
 * Cache l'application shell pour fonctionnement hors-ligne.
 * Version: 1.0.0
 */

const CACHE_NAME = 'gestion-com-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  'https://cdn.tailwindcss.com'
];

// Installation : pré-cache des assets essentiels
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Stratégie : Cache First pour les assets, Network First pour le reste
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // On ignore les requêtes non-GET (POST API etc.)
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Ne cache que les réponses valides
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Fallback offline : retourne index.html pour les navigations
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Hors ligne', { status: 503, statusText: 'Offline' });
        });
    })
  );
});
