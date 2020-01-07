'use strict';

//set up cache name and files to add to it
const CACHE_NAME = 'site-v1';
const CACHE_URLS = ['/index.html',
//   '/Education/',
//   '/Portfolio/',
//   '/Contact/',
  // CSS
  '/assets/css/style.css',
  '/assets/css/portfolio.css',
//   '/assets/css/contact.css',
  // FONT
  '/assets/fonts/roboto-mono-regular.eot',
  '/assets/fonts/roboto-mono-regular.svg',
  '/assets/fonts/roboto-mono-regular.ttf',
  '/assets/fonts/roboto-mono-regular.woff',
  '/assets/fonts/roboto-mono-regular.woff2',
  // IMG
  '/assets/images/CloseUpOfMe.webp',
  '/assets/images/CloseUpOfMe.jpg',
  '/assets/images/react-logo.svg',
  '/assets/images/angular-logo.svg',
  '/assets/images/vue-logo.svg',
  '/assets/images/logo/Logo_White.png',
  '/assets/images/logo/Logo_Black.png',
  '/assets/images/logo/Logo_White-Black.jpg',
  '/assets/images/social/github.svg',
  '/assets/images/social/linkedin-brands.svg',
  '/assets/images/social/envelope.svg',
  '/assets/images/cert/sdf.png',
  '/assets/images/cert/df.png',
  '/assets/images/skills/html5_css3_js.png',
  // JS
  '/assets/scripts/global.js',
  '/assets/scripts/modernizr.js',
//   '/assets/scripts/contact.js',
  '/manifest.json'
];

//add all URLs to cache when installed
self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    //create and open cache
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        //add all URLs to cache
        return cache.addAll(CACHE_URLS);
      })
  );
});
//On activate update the cache with the new version and clean out old
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      //check whether asset is in cache
      if (response) {
        //asset in cache, so return it
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      //asset not in cache so fetch asset from network
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});