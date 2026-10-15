export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

// Adults can later pick any class to refresh what they missed; the content is the same.
export const STAGES = [
  { id: 'vs', name: 'Volksschule', short: 'VS', grades: [1, 2, 3, 4], theme: 'kids' },
  { id: 'us', name: 'Unterstufe', short: 'MS/AHS', grades: [5, 6, 7, 8], theme: 'teen' },
  { id: 'os', name: 'Oberstufe', short: 'AHS', grades: [9, 10, 11, 12], theme: 'adult' },
];

export const THEMES = [
  { id: 'auto', name: 'Automatisch', hint: 'passt sich der Klasse an' },
  { id: 'kids', name: 'Kindlich', hint: 'bunt und verspielt' },
  { id: 'teen', name: 'Jugendlich', hint: 'frisch, ohne Kinderkram' },
  { id: 'adult', name: 'Erwachsen', hint: 'ruhig und schlicht' },
];

export const stageOf = (grade) => STAGES.find((s) => s.grades.includes(grade)) ?? STAGES[0];
export const gradesBelow = (grade) => Array.from({ length: grade - 1 }, (_, i) => i + 1);

// Grade 1–4 count as Volksschule classes 1–4, 5–8 as class 1–4 Unterstufe,
// 9–12 as class 5–8 AHS. Kids know their class, not the Schulstufe.
export function classLabel(grade) {
  if (grade <= 4) return `${grade}. Klasse VS`;
  if (grade <= 8) return `${grade - 4}. Klasse`;
  return `${grade - 4}. Klasse AHS`;
}

// Task content (from skills.js) is our own HTML; strip it for plain-text reports.
export const plainText = (html) => String(html)
  .replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, '$1/$2')
  .replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<sub>(.*?)<\/sub>/g, '$1').replace(/<br>/g, ' / ')
  .replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
