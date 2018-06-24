var staticCacheName = 'rest-review-v5';

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       //'/skeleton',
       '/',
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
       '/img/1-mission-chinese-food-small.jpg',
       '/img/1-mission-chinese-food.jpg',
       '/img/2-emily.jpg',
       '/img/2-emily-small.jpg',
       '/img/3-kang-ho-dong-baekjeong-small.jpg',
       '/img/3-kang-ho-dong-baekjeong.jpg',
       '/img/4-katzs-delicatessen-small.jpg',
       '/img/4-katzs-delicatessen.jpg',
       '/img/5-robertas-pizza-small.jpg',
       '/img/5-robertas-pizza.jpg',
       '/img/6-hometown-bbq-small.jpg',
       '/img/6-hometown-bbq.jpg',
       '/img/7-superiority-burger-small.jpg',
       '/img/7-superiority-burger.jpg',
       '/img/8-the-dutch-small.jpg',
       '/img/8-the-dutch.jpg',
       '/img/9-mu-ramen-small.jpg',
       '/img/9-mu-ramen.jpg',
       '/img/10-casa-enrique-small.jpg',
       '/img/10-casa-enrique.jpg'
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

    /*var requestUrl = new URL(event.request.url);
    
    if(requestUrl.origin === location.origin) {
      if(requestUrl.pathame ==='/') {
        event.respondWith(caches.match('/skeleton'));
        return;
      }
    } */

    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});

/* importScripts('/cache-polyfill.js'); -- (it's for other browsers)*/
