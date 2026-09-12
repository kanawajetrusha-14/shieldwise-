const CACHE_NAME = "shieldwise-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./login.html",
    "./signup.html",

    "./pages/about.html",
    "./pages/dashboard.html",
    "./pages/detection.html",
    "./pages/scams.html",
    "./pages/quiz.html",
    "./pages/checklist.html",
    "./pages/progress.html",
    "./pages/resources.html",
    "./pages/help.html",
    "./pages/contact.html",

    "./css/style.css",

    "./js/app.js",
    "./js/auth.js",
    "./js/theme.js",

    "./manifest.json"
];


// INSTALL
self.addEventListener("install", event => {

    console.log("ShieldWise Service Worker installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


// ACTIVATE
self.addEventListener("activate", event => {

    console.log("ShieldWise Service Worker activated.");

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cacheName => {

                    if (cacheName !== CACHE_NAME) {

                        return caches.delete(cacheName);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


// FETCH
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }

                return fetch(event.request)
                    .then(networkResponse => {

                        return networkResponse;

                    })
                    .catch(() => {

                        return caches.match("./index.html");

                    });

            })

    );

});