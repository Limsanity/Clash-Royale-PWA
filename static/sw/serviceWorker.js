const CACHE_NAME = 'cr-cache-v2'
const CACHED_URLS = [
  '/'
]

self.addEventListener('install', (event) => {
  console.log('install')
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHED_URLS)
    })
  )
})

self.addEventListener('activate', (event) => {
  clients.claim()
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (CACHE_NAME !== key) {
          return caches.delete(key);
        }
      })
    ))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return fetch(event.request)
              .then(networkResponse => {
                if (event.request.method === 'GET') {
                  cache.put(event.request, networkResponse.clone()).catch(err => console.log(err))
                }
                return networkResponse
              })
              .catch(() => {
                return caches.match(event.request).then((response) => {
                  if (response) {
                    return response
                  } else if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/')
                  }
                })
              })
    })
  )
})
