self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('n-pontes-locacoes').then(cache => {
            return cache.addAll([
                '/index.html',
                '/html.css',
                '/script.js',
                '/manifest.json',
                '/assets/logo.png' // Se você tiver um logo, adicione aqui
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});