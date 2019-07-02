const cacheName = 'bandfollow-v6';
const cacheList = [
    '/',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js'
];

self.addEventListener('install', (e) => {
    console.log('[serviceworker] install');
    e.waitUntil(
        caches.open(cacheName).then((c) => {
            return c.addAll(cacheList);
        })
        .catch((e) => {
            console.error(e);
        })
    )
})


self.addEventListener('activate', (e) => {
    console.log('[serviceworker] Activate');
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((k) => {
                if(k !== cacheName) console.log('delete cache', k);
                if(k !== cacheName) return caches.delete(k);
            }))
        })
    )
})

self.addEventListener('fetch', (e) => {
    console.log('[serviceworker] fetch');
    e.respondWith(
        caches.match(e.request).then(async (res) => {
            // console.log('[serviceworker] fetch');
            // console.log(e.request);
            // console.log(e.res);
            return res || fetch(e.request);
        })
    )
})

self.addEventListener('message', (e) => {
    console.log('got message to renew');
    console.log(e)
    if(e.data.action === 'renew') {
        console.log('renew');
        self.skipWaiting();
    }

})