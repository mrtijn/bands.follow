export default {
    register(){
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
              }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
              });
            });
          }
    }
    // register(){
    //     const cacheName = 'bandfollow-v1';
    //     const cacheList = ['/concerts/all'];

    //     window.addEventListener('install', (e) => {
    //         console.log('test');
    //         e.waitUntill(
    //             caches.open(cacheName).then((c) => {
    //                 return c.addAll(cacheList);
    //             })
    //         )
    //     })

    // }
}