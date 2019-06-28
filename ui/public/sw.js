const cacheName = 'bandfollow-v1';
const cacheList = ['/index.html', '/static/js/bundle.js'];

self.addEventListener('install', (e) => {
    console.log('[serviceworker] fetch');
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
                if(k !== cacheName) return caches.delete(k);
            }))
        })
    )
})

self.addEventListener('fetch', (e) => {
    console.log(e.request);
    e.respondWith(
        caches.match(e.request).then((res) => {
            console.log('[serviceworker] fetch'+ res);
            return res || fetch(e.request);
        })
    )
})