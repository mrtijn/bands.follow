// export default {
//     register(config){
//       // const self = this;
//       const swUrl = '/sw.js';
//       console.log('register');
//       if ('serviceWorker' in navigator) {
//               window.addEventListener('load', function() {
//                 registerValidSW(swUrl, config);
//                 // navigator.serviceWorker.register('/sw.js').then(function(registration) {
//                 //   // Registration was successful
//                 //   console.log('ServiceWorker registration successful with scope: ', registration.scope);

//                 //   registerValidSW(swUrl, config);
//                 // }, function(err) {
//                 //   // registration failed :(
//                 //   console.log('ServiceWorker registration failed: ', err);
//                 // });
//               });
//       }
//     },
// }

register({
  async onUpdate(newWorker){
      console.log('[SW] On update');
      // reg.addEventListener('message', () => {
      //     console.log('go');
      //     return 'test';
      // })
      let renew = await window.confirm('[SW] Update available');
      if(renew){
          newWorker.postMessage({action: 'renew'});
      }
  },
  onSuccess(reg){
     alert('[SW] Registered serviceworker succesfully');
  }
});

function  register(config){
  console.log("REGISTER NOW!");
  // const self = this;
  const swUrl = '/sw.js';
  if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            registerValidSW(swUrl, config);
            // navigator.serviceWorker.register('/sw.js').then(function(registration) {
            //   // Registration was successful
            //   console.log('ServiceWorker registration successful with scope: ', registration.scope);

            //   registerValidSW(swUrl, config);
            // }, function(err) {
            //   // registration failed :(
            //   console.log('ServiceWorker registration failed: ', err);
            // });
          });
  }
}

let newWorker;
function registerValidSW(swUrl, config) {

  navigator.serviceWorker
    .register(swUrl)
    .then(reg => {
      console.log('registered');


      reg.addEventListener('updatefound', () => {
        newWorker = reg.installing;

        newWorker.addEventListener('statechange', () => {
          if(newWorker.state === 'installed'){
            config.onUpdate(newWorker);
          }
        })
      });




      // registration.onupdatefound = () => {
      //   console.log('updateFound');
      //   const installingWorker = registration.installing;
      //   if (installingWorker == null) {
      //     return;
      //   }
      //   installingWorker.onstatechange = () => {
      //     if (installingWorker.state === 'installed') {
      //       console.log('[SW] installed');
      //       if (navigator.serviceWorker.controller) {
      //         // At this point, the updated precached content has been fetched,
      //         // but the previous service worker will still serve the older
      //         // content until all client tabs are closed.
      //         console.log(
      //           'New content is available and will be used when all ' +
      //             'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
      //         );

      //         // Execute callback
      //         if (config && config.onUpdate) {
      //           config.onUpdate(registration);
      //         }
      //       } else {
      //         // At this point, everything has been precached.
      //         // It's the perfect time to display a
      //         // "Content is cached for offline use." message.
      //         console.log('Content is cached for offline use.');

      //         // Execute callback
      //         if (config && config.onSuccess) {
      //           config.onSuccess(registration);
      //         }
      //       }
      //     }
      //   };
      // };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });


    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Controller changes');
      if(refreshing) return;
      window.location.reload();
      refreshing = true;
    })
}


