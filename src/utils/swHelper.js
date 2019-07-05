let updateCache = {}

function handleRequest (url, timeout, cacheName) {
  if (usingCache && updateCache[typeof url === 'string' ? url : url.url]) {
    return cacheOnly(url)
  } else {
    return netWorkFirst(url, timeout, cacheName)
  }
}

function netWorkFirst (url, timeout, cacheName) {
  return caches.open(cacheName).then(async (cache) => {
    const req = new Promise((resolve, reject) => {
      fetch(url).then(res => {
        if (res.status === 200) {
          cache.put(url, res.clone())
          updateCache[typeof url === 'string' ? url : url.url] = true
          notify('update:'+ (typeof url === 'string' ? url : url.url))
          resolve(res)
        } else {
          reject()
        }
      }).catch(() => {
        reject()
      })
    })
    const timer = new Promise((resolve, reject) => {
      setTimeout(()=>{
        reject()
      }, timeout)
    })
    const res = Promise.race([req, timer])
    return res.then(res => res).catch(() => {
      return caches.match(url).then((response) => {
        notify('stale:' + (typeof url === 'string' ? url : url.url))
        return response
      })
    })
  })
}

function cacheOnly (url) {
  delete updateCache[typeof url === 'string' ? url : url.url]
  if (Object.keys(updateCache) === 0) {
    usingCache = false
  }
  return caches.match(url)
}

function notify (msg) {
  setTimeout(() => {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(msg)
      })
    })
  }, 3000);
}
