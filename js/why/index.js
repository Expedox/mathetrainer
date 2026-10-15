// "Warum ist das so?": why a rule works, one text per skill, behind a fold-out button.

import vs from './vs.js';
import us from './us.js';
import os from './os.js';
import moreVs from './more-vs.js';
import moreUs from './more-us.js';
import moreOs from './more-os.js';
import { canSpeak } from '../speech.js';

const WHY = { ...vs, ...us, ...os, ...moreVs, ...moreUs, ...moreOs };

export const whyFor = (skillId) => WHY[skillId] ?? null;

export function whyHtml(skillId, { speak = false, title = '🤔 Warum ist das so?' } = {}) {
  const text = whyFor(skillId);
  if (!text) return '';
  const say = speak && canSpeak() ? `<button class="speak" type="button" data-say="${encodeURIComponent(text)}" aria-label="Vorlesen">🔊</button>` : '';
  return `<details class="why-more"><summary>${title}</summary><div class="why-text">${say}${text}</div></details>`;
}
