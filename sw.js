/* importScripts('/cache-polyfill.js'); -- I don't have it, maybe I can take from the project (it's necessary for other browsers)*/
var staticCacheName = 'rest-review-v2';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/skeleton',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/restaurant.html',
       '/css/styles.css',
       '/css/responsive.css',
       '/data/restaurants.json',
       '/js/main.js',
       '/js/dbhelper.js',
       '/js/restaurant_info.js',
       '/img',
       '/img/1-mission-chinese-food-small.jpg',
       '/img/1-mission-chinese-food.jpg'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('rest-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    var requestUrl = new URL(event.request.url);
    
    if(requestUrl.origin === location.origin) {
      if(requestUrl.pathame ==='/') {
        event.respondWith(caches.match('/skeleton'));
        return;
      }
    }

    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});