// The mistake book: every wrongly solved task is kept with the given answer
// and why it was wrong, so it can be looked at and solved again later.

import * as db from './db.js';

const newId = () => `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export async function add(profileId, task, given, why) {
  const row = { id: newId(), profileId, skill: task.skill, topicId: task.topicId, task, given, why: why || '', at: Date.now(), tries: 1, fixed: false, fixedAt: null };
  await db.put('mistakes', row);
  return row;
}

// Retried: right → fixed, wrong again → one more try with the new answer.
export async function retried(id, ok, given, why) {
  const row = await db.get('mistakes', id);
  if (!row) return;
  if (ok) Object.assign(row, { fixed: true, fixedAt: Date.now() });
  else Object.assign(row, { tries: row.tries + 1, given, why: why || row.why, at: Date.now() });
  await db.put('mistakes', row);
}

export async function list(profileId, { open } = {}) {
  const rows = (await db.all('mistakes', 'profileId', profileId)).sort((a, b) => b.at - a.at);
  return open === undefined ? rows : rows.filter((r) => r.fixed !== open);
}

export const remove = (id) => db.del('mistakes', id);

export async function removeAll(profileId) {
  for (const r of await db.all('mistakes', 'profileId', profileId)) await db.del('mistakes', r.id);
}
