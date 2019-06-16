importScripts('/workbox/workbox-sw.js')
importScripts('/indexDB.js')

let token;

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
      return fetch('/').catch(res => caches.open(runtimeCacheName).then((cache) => cache.match('/')))
  }
})

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
    console.log(token)
  }
  if (event.tag === 'send-deck') {
    const decks = []
    getFromObjectStore('deck', decks).then(() => {
      decks.forEach(deck => {
        sendDeck(deck)
          .then(res => {
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
