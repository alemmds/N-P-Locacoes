// Nome do cache
const CACHE_NAME = 'n-pontes-locacoes-cache-v1';
// Arquivos para cachear
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png', // Se houver ícones de PWA
    '/icons/icon-512x512.png'
];

// Evento de instalação do Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de busca
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Se o recurso estiver em cache, usa-o
                if (response) {
                    return response;
                }
                // Caso contrário, faz a requisição à rede
                return fetch(event.request);
            })
    );
});

// Evento de ativação e atualização de cache
self.addEventListener('activate', function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
