const openDatabase = function () {
  const request = self.indexedDB.open('cr-database', 2)

  request.onupgradeneeded = function (event) {
    const db = event.target.result
    if (!db.objectStoreNames.contains('deck')) {
      db.createObjectStore('deck', { autoIncrement: true })
    }
  }

  request.onerror = function (event) {
    console.log('Database error', event.target.error)
  }

  return request
}

const openObjectStore = function (storeName, callback, transactionMode) {
  const db = openDatabase()
  db.onsuccess = function (event) {
    const db = event.target.result
    const objectStore = db
      .transaction(storeName, transactionMode)
      .objectStore(storeName)
    callback(objectStore)
  }
  return true
}

const addToObjectStore = function (storeName, object) {
  return new Promise((resolve) => {
    openObjectStore(storeName, function (store) {
      store.add(object)
      resolve()
    }, 'readwrite')
  })
}

const getFromObjectStore = function (storeName, objects) {
  return new Promise((resolve) => {
    openObjectStore(storeName, function (store) {
      store.openCursor().onsuccess = function (event) {
        let cursor = event.target.result
        if (cursor) {
          cursor.value.key = cursor.key
          objects.push(cursor.value)
          cursor.continue()
        } else {
          resolve()
        }
      }
    })
  })
}

const deleteFromObjectStore = function (storeName, object) {
  openObjectStore(storeName, function (store) {
    store.delete(object)
  }, 'readwrite')
}

if (typeof module !== 'undefined') {
  module.exports = {
    addToObjectStore,
    getFromObjectStore,
    deleteFromObjectStore
  }
}
