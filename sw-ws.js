const CACHE = 'oil-change-v1';
const ASSETS = ['./', './oil-change.html', './manifest-ws.json', './sw-ws.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));