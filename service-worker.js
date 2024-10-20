const CACHE_NAME = 'n-pontes-locacoes-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/images/icons/icon-192x192.png', // Inclua os ícones e outros recursos importantes
    '/images/icons/icon-512x512.png'
];

// Instalação do Service Worker e armazenamento no cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Arquivos armazenados em cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Interceptação de solicitações para servir os arquivos em cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Atualização do cache quando uma nova versão é ativada
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});