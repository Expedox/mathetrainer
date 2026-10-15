// All explanation pages, by topic id, and how they are shown.

import vs from './vs.js';
import us from './us.js';
import os from './os.js';
import moreVs from './more-vs.js';
import moreUs from './more-us.js';
import moreOs from './more-os.js';
import { canSpeak } from '../speech.js';

const LESSONS = { ...vs, ...us, ...os, ...moreVs, ...moreUs, ...moreOs };

export const lessonFor = (topicId) => LESSONS[topicId] ?? null;

const exampleHtml = (ex) => `
  <div class="worked">
    <p class="worked-task">${ex.task}</p>
    <ol class="steps">${ex.lines.map((l) => `<li>${l}</li>`).join('')}</ol>
  </div>`;

// Each section can be read aloud (younger kids) with its own button.
const say = (html, on) => (on && canSpeak() ? `<button class="speak" type="button" data-say="${encodeURIComponent(html)}" aria-label="Vorlesen">🔊</button>` : '');

export function lessonHtml(l, { speakAll = false } = {}) {
  return `
    <section class="card lesson-part"><h2>💡 Die Idee ${say(l.idea, true)}</h2><div class="lesson-text">${l.idea}</div>${l.picture ? `<div class="lesson-pic">${l.picture}</div>` : ''}</section>
    ${l.story ? `<section class="card lesson-part"><h2>🌍 Aus dem Alltag ${say(l.story, true)}</h2><div class="lesson-text">${l.story}</div></section>` : ''}
    <section class="card lesson-part"><h2>✏️ So rechnest du ${say(`${l.example.task}. ${l.example.lines.join('. ')}`, speakAll)}</h2>
      ${exampleHtml(l.example)}
      ${(l.more ?? []).map(exampleHtml).join('')}
    </section>
    ${l.watch?.length ? `<section class="card lesson-part watch"><h2>⚠️ Pass auf! ${say(l.watch.join('. '), speakAll)}</h2><ul>${l.watch.map((w) => `<li>${w}</li>`).join('')}</ul></section>` : ''}
    ${l.parents ? `<details class="card lesson-part parents-tip"><summary><h2>👪 Tipp für Eltern</h2></summary><div class="lesson-text">${l.parents}</div></details>` : ''}`;
}
