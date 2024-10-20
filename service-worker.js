const cacheName = 'npontes-v1';
const assets = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/script.js',
    '/images/icon-192.png',
    '/images/icon-512.png'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
