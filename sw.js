// Offline cache. Bump VERSION on every release so devices fetch new files.
const VERSION = 'v8';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/style.css',
  'js/app.js',
  'js/db.js',
  'js/srs.js',
  'js/util.js',
  'js/profiles.js',
  'js/mistakes.js',
  'js/math.js',
  'js/skills.js',
  'js/learn.js',
  'js/exams.js',
  'js/child.js',
  'js/parents.js',
  'js/io.js',
  'js/speech.js',
  'js/lessons/index.js',
  'js/lessons/vs.js',
  'js/lessons/us.js',
  'js/lessons/os.js',
  'js/why/index.js',
  'js/why/vs.js',
  'js/why/us.js',
  'js/why/os.js',
  'js/kit.js',
  'js/curriculum/vs.js',
  'js/curriculum/us.js',
  'js/curriculum/os.js',
  'js/lessons/more-vs.js',
  'js/lessons/more-us.js',
  'js/lessons/more-os.js',
  'js/why/more-vs.js',
  'js/why/more-us.js',
  'js/why/more-os.js',
  'icons/icon.svg',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Network first so updates arrive when online; cache when offline.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    // no-cache: revalidate with the server so a new release shows up on the next start.
    fetch(e.request, { cache: 'no-cache' })
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })),
  );
});
