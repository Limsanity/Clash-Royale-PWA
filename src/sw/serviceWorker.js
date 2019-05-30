workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: 'cr-cache',
  runtime: 'cr-cache'
})

workbox.precaching.precache(['/'].concat(self.__precacheManifest.map(precache => ({ url: precache.url }))))

workbox.routing.registerRoute(
  '/',
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [
      new workbox.broadcastUpdate.Plugin({
        channelName: 'index-update'
      }),
    ]
  })
)

// workbox.routing.registerRoute(
//   '/',
//   new workbox.strategies.NetworkFirst()
// )

workbox.routing.registerRoute(
  /\.(js|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'cr-cache'
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

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})
