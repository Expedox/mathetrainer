// Saving files and the full backup (all children, progress, mistakes, PIN).

import * as db from './db.js';

export function newId(prefix) {
  const rnd = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${rnd}`;
}

// iPhone/iPad: share sheet ("In Dateien sichern", AirDrop, Mail); elsewhere a download.
export async function saveFile(name, text, type) {
  const file = new File([text], name, { type });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: name }); return; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  const url = URL.createObjectURL(file);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function makeBackup() {
  const out = { format: 'mathetrainer-backup', version: 1, created: new Date().toISOString() };
  for (const name of db.STORES) out[name] = await db.all(name);
  return out;
}

export async function restoreBackup(text) {
  const data = JSON.parse(text.replace(/^﻿/, ''));
  if (data.format !== 'mathetrainer-backup') throw new Error('Das ist keine Sicherungsdatei des Mathe Trainers.');
  for (const name of db.STORES) {
    if (!Array.isArray(data[name])) continue;
    await db.clear(name);
    await db.putMany(name, data[name]);
  }
  return { profiles: data.profiles?.length ?? 0, mistakes: data.mistakes?.length ?? 0 };
}
