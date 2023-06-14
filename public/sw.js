const APP_CACHE = 'app-cache-v1'

self.addEventListener('install', (e) => {
  const createAppCache = caches.open(APP_CACHE)
  e.waitUntil(createAppCache)
})

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/api') && e.request.clone().method !== 'GET') {
    return e.respondWith(fetch(e.request))
  }

  e.respondWith(
    fetch(e.request.clone())
      .then((response) => {
        if (response.ok) {
          return caches.open(APP_CACHE).then((appCache) => {
            appCache.put(e.request, response.clone())
            return response.clone()
          })
        }
        return response
      })
      .catch(() => {
        return caches.match(e.request).then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse
          }
          return fetch(e.request)
        })
      })
  )
})
