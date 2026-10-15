// Reading aloud with the device's built-in German voice (works offline on iOS/Android).

let voice;

function pickVoice() {
  const voices = speechSynthesis.getVoices();
  return voices.find((v) => v.lang === 'de-AT') ?? voices.find((v) => v.lang?.startsWith('de')) ?? null;
}

export const canSpeak = () => 'speechSynthesis' in window;

// Math in words: "7 + ▢ = 10" → "7 plus wie viel ist 10".
export function spoken(html) {
  return String(html)
    .replace(/<span class="frac"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g, ' $1 durch $2 ')
    .replace(/<sup>(.*?)<\/sup>/g, ' hoch $1 ').replace(/<br>/g, '. ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s*\+\s*/g, ' plus ').replace(/\s*[−-]\s+/g, ' minus ').replace(/\s·\s/g, ' mal ')
    .replace(/(\d)\s*:\s*(\d)/g, '$1 geteilt durch $2').replace(/\s=\s/g, ' ist ')
    .replace(/▢/g, ' wie viel ').replace(/²/g, ' hoch 2 ').replace(/³/g, ' hoch 3 ')
    .replace(/&[a-z]+;/g, ' ').replace(/[🐰-🫶]|[☀-➿]|️/gu, ' ')
    .replace(/\s+/g, ' ').trim();
}

export function speak(html) {
  if (!canSpeak()) return;
  speechSynthesis.cancel();
  voice ??= pickVoice();
  const u = new SpeechSynthesisUtterance(spoken(html));
  u.lang = voice?.lang ?? 'de-DE';
  if (voice) u.voice = voice;
  u.rate = 0.9;
  speechSynthesis.speak(u);
}

export const stop = () => canSpeak() && speechSynthesis.cancel();

if (canSpeak()) speechSynthesis.onvoiceschanged = () => { voice = pickVoice(); };
