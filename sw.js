const CACHE_NAME = 'wte-ielts-speaking-v1';
const ASSETS = [
  './',
  './index.html',
  './hobbies-free-time.html',
  './travel-holidays.html',
  './work-studies.html',
  './food-cooking.html',
  './technology-social-media.html',
  './health-fitness.html',
  './environment-nature.html',
  './friends-family.html',
  './music-entertainment.html',
  './daily-routine.html',
  './manifest.json',
  './fonts/Inter-Regular.woff2',
  './fonts/Inter-Medium.woff2',
  './fonts/Inter-SemiBold.woff2',
  './fonts/Inter-Bold.woff2',
  './fonts/Montserrat-Bold.woff2',
  './fonts/Montserrat-Black.woff2',
  './fonts/Oswald-Medium.woff2',
  './fonts/Oswald-SemiBold.woff2'
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match('./index.html'))
  );
});
