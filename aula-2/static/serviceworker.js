var cacheName = 'v1'; // se mudar a versão tratar o activate event
var cachedFiles =['./styles.css']

self.addEventListener('install', function(e){
    console.log('-serviceworker install event, called one time per cache version');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log(' --serviceworker caching cached files');
            return cache.addAll(cachedFiles)
        })
    );
})

self.addEventListener('activate', function(e){
    console.log('-serviceworker activate event, occurs when old service worker is unregistered');
    e.waitUntil(

		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				if (thisCacheName !== cacheName) {

					console.log(' --serviceworker removing files from cache:', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);
})

self.addEventListener('fetch', function(event){
   
    event.respondWith(
        //se tem no cache retorna resposta, caso contrário faz a requisição colocando sua resposta no cache
        caches.open(cacheName).then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );    

   
})

 // e.respondWith(
    //     caches.match(e.request).then(function(response){
    //         if(response){
    //             console.log(' --serviceworker found cached', e.request.url);
    //             return response
    //         }

    //         var requestClone = e.request.clone();
    //         return fetch(requestClone)
    //         .then(function(response){
    //             if(!response){
    //                 console.log('  ---serviceworker no response from fetch')
    //                 return response
    //             }

    //             var responseClone = response.clone();
    //             caches.open(cacheName).then(function(cache){
    //             cache.put(e.request, responseClone)
    //             console.log('  --- serviceworker new data cached', e.request.url);
    //             return response
    //             })
    //         }).catch(function(e){
    //             console.log('  ---serviceworker error from response')
    //         })
    //     })
        
    // )