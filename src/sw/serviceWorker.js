importScripts('/workbox/workbox-sw.js')
importScripts('/indexDB.js')

workbox.setConfig({
  modulePathPrefix: '/workbox/'
})

const runtimeCacheName = 'cr-cache'
const offlineHTML = 'index.html'
// workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox.core.setCacheNameDetails({
  prefix: '',
  suffix: '',
  precache: runtimeCacheName,
  runtime: runtimeCacheName
})

workbox.precaching.precache(self.__precacheManifest)

workbox.routing.registerRoute(
  ({ event }) => event.request.destination === 'document',
  async () => {
    const cache = await caches.open(runtimeCacheName)
    const requests = await cache.keys()
    let resp
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].url.includes(offlineHTML)) {
        resp = await caches.match(requests[i].url)
        break
      }
    }
    return resp
  }
)

workbox.routing.registerRoute(
  /\.(js|css)$/,
  new workbox.strategies.CacheFirst({
    cacheName: runtimeCacheName
  })
)

workbox.routing.registerRoute(
  /fonts/,
  new workbox.strategies.CacheFirst({
    cacheName: runtimeCacheName
  })
)

workbox.routing.registerRoute(
  /\.(png|jpg|jpeg|webp)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)

self.addEventListener("message", event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  } else {
    token = event.data
  }
})

// some new tech

function sendDeck (deck) {
  return fetch('/api/deck', {
    body: JSON.stringify(deck.deck),
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST'
  }).then(res => res.json())
}

function getToken () {
  return fetch('/auth/login', { method: 'POST' }).then(res => res.json())
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'test') {
    console.log(usingCache)
  }
  if (event.tag === 'send-deck') {
    const decks = []
    getFromObjectStore('deck', decks).then(() => {
      decks.forEach(deck => {
        sendDeck(deck).then(res => {
          if (res.success) {
            deleteFromObjectStore('deck', deck.key)
          } else {
            getToken()
              .then(res => {
                token = res.data.token
                sendDeck(deck).then(res => {
                  if (res.success) {
                    deleteFromObjectStore('deck', deck.key)
                  }
                })
              })
          }
        })
      })
    })
  }
})

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})
