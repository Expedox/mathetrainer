// IndexedDB wrapper. All data stays on the device.
//
// Stores
//   profiles { id, name, avatar, grade, theme, dailyGoal, tasks: [topicId], exams, created }
//   progress { key: "<profileId>|<skillId>", profileId, vocabId: skillId, box, due, right, wrong, seen }
//   sessions { id, profileId, topicId, mode, start, end, answers, right, wrong, words: [skillId] }
//   mistakes { id, profileId, skill, topicId, task, given, why, at, tries, fixed, fixedAt }
//   meta     { key, value }

const DB_NAME = 'mathetrainer';
const DB_VERSION = 1;

export const STORES = ['profiles', 'progress', 'sessions', 'mistakes', 'meta'];

let dbPromise;

function open() {
  dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      db.createObjectStore('profiles', { keyPath: 'id' });
      db.createObjectStore('progress', { keyPath: 'key' }).createIndex('profileId', 'profileId');
      db.createObjectStore('sessions', { keyPath: 'id' }).createIndex('profileId', 'profileId');
      db.createObjectStore('mistakes', { keyPath: 'id' }).createIndex('profileId', 'profileId');
      db.createObjectStore('meta', { keyPath: 'key' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

const done = (req) => new Promise((resolve, reject) => {
  req.onsuccess = () => resolve(req.result);
  req.onerror = () => reject(req.error);
});

async function store(name, mode = 'readonly') {
  return (await open()).transaction(name, mode).objectStore(name);
}

export async function get(name, key) {
  return done((await store(name)).get(key));
}

export async function all(name, index, query) {
  const s = await store(name);
  return done(index ? s.index(index).getAll(query) : s.getAll());
}

export async function put(name, value) {
  return done((await store(name, 'readwrite')).put(value));
}

export async function del(name, key) {
  return done((await store(name, 'readwrite')).delete(key));
}

export async function clear(name) {
  return done((await store(name, 'readwrite')).clear());
}

export async function putMany(name, values) {
  const tx = (await open()).transaction(name, 'readwrite');
  const s = tx.objectStore(name);
  for (const v of values) s.put(v);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getMeta(key, fallback) {
  const row = await get('meta', key);
  return row ? row.value : fallback;
}

export function setMeta(key, value) {
  return put('meta', { key, value });
}

// Ask the browser not to evict our data under storage pressure.
export async function persist() {
  try { return await navigator.storage?.persist?.(); } catch { return false; }
}
