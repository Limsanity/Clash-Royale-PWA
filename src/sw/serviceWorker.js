importScripts('/workbox/workbox-sw.js')
importScripts('/indexDB.js')
importScripts('/swHelper.js')

let token
let usingCache = false

workbox.setConfig({
  modulePathPrefix: '/workbox/'
})

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

self.addEventListener('fetch', async (event) => {
  if (event.request.destination === 'document') {
    if (event.request.url.includes('cache')) {
      usingCache = true
    }
    event.respondWith(
      handleRequest('/', 5000, runtimeCacheName)
    )
  } else if (event.request.url.includes('api')) {
    event.respondWith(
      handleRequest(event.request, 5000, 'api-cache')
    )
  }
})

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

self.addEventListener('message', (event) => {
  token = event.data
})

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})
