const runtimeCacheName = 'cr-cache'

workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: runtimeCacheName,
  runtime: runtimeCacheName
})

workbox.precaching.precache(['/'].concat(self.__precacheManifest.map(precache => ({ url: precache.url }))))

workbox.routing.registerRoute(
  '/',
  new workbox.strategies.NetworkFirst()
)

workbox.routing.registerRoute(
  /\.(js|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: runtimeCacheName
  })
)

workbox.routing.registerRoute(
  /\.(png|jpg|webp)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)

workbox.routing.registerRoute(
  /^https:\/\/api\.royaleapi\.com/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache'
  })
)

workbox.routing.setDefaultHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.open(runtimeCacheName).then((cache) => cache.match('/'))
  }
})

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})
