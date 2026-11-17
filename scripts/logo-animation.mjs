// Esporta il logo animato (stessa sequenza del sito) come WebP e GIF animati,
// da usare su social, WhatsApp, firme email, presentazioni.   Uso:  npm run logo:animato
//
// Output in design/brand/export/:
//   logo-animato.webp      720x720, alta qualità (social, sito, WhatsApp)
//   logo-animato.gif       480x480, massima compatibilità (email, vecchie app)

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'design/brand/export');

const FPS = 30;
const DURATION = 2.8; // secondi di animazione
const HOLD_MS = 1800; // pausa sul logo completo prima di ripartire
const SIZE = 720;

// Geometria del monogramma (identica a public/brand/logo-mark.svg e al componente app-logo-mark)
const FRAME = 'M17.5 7.5h29a10 10 0 0 1 10 10v29a10 10 0 0 1-10 10h-29a10 10 0 0 1-10-10v-29a10 10 0 0 1 10-10z';
const FRAME_LEN = 4 * 29 + 2 * Math.PI * 10;
const SERIFS = 'M16.6 44.2h7.6v1.2h-7.6zM38.4 44.2h9.8v1.2h-9.8zM16.6 19h5v1.2h-5zM43 19h5.2v1.2h-5.2z';
// Aste della M nell'ordine "di penna": sottile in salita, spessa in discesa, sottile in salita, spessa in discesa
const STROKES = [
  { d: 'M19.6 19.6h1.5v25.4h-1.5z', dir: 'up', from: 0.5, x: 18, w: 5, top: 19.6, bottom: 45 },
  { d: 'M19.4 19H24.6L33.4 45H30.4z', dir: 'down', from: 0.72, x: 18, w: 17, top: 19, bottom: 45 },
  { d: 'M30.6 45H32.2L44.6 19H43z', dir: 'up', from: 0.98, x: 29, w: 17, top: 19, bottom: 45 },
  { d: 'M40.9 19h4.6v26h-4.6z', dir: 'down', from: 1.2, x: 39, w: 8, top: 19, bottom: 45 },
];
const STROKE_TIME = 0.42;

const clamp01 = (n) => Math.max(0, Math.min(1, n));
const range = (t, from, to) => clamp01((t - from) / (to - from));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutBack = (x) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);

function frame(t) {
  const pop = easeOutBack(range(t, 0, 0.6));
  const opacity = range(t, 0, 0.25);
  const frameDraw = easeInOut(range(t, 0.2, 1.5));
  const serifs = easeOut(range(t, 1.5, 2));
  const shine = easeInOut(range(t, 1.8, 2.6));
  const text = easeOut(range(t, 2, 2.7));
  const scale = (300 / 64) * (0.6 + 0.4 * pop);

  // Ogni asta viene "svelata" da un rettangolo di ritaglio che cresce dall'alto o dal basso
  const clips = STROKES.map((s, i) => {
    const p = easeInOut(range(t, s.from, s.from + STROKE_TIME));
    const h = (s.bottom - s.top) * p;
    const y = s.dir === 'up' ? s.bottom - h : s.top;
    return `<clipPath id="s${i}"><rect x="${s.x}" y="${y}" width="${s.w}" height="${h}"/></clipPath>`;
  }).join('');
  const strokes = STROKES.map((s, i) => `<path d="${s.d}" clip-path="url(#s${i})"/>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 720 720">
  <defs>
    <radialGradient id="glow" cx="560" cy="120" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1f5fb8" stop-opacity=".45"/><stop offset="1" stop-color="#1f5fb8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1a4580"/><stop offset="1" stop-color="#0a1c36"/>
    </linearGradient>
    <linearGradient id="gold" x1="16" y1="18" x2="48" y2="46" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3d9a4"/><stop offset="1" stop-color="#c58f3b"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="clip"><rect width="64" height="64" rx="15"/></clipPath>
    ${clips}
  </defs>
  <rect width="720" height="720" fill="#071427"/>
  <rect width="720" height="720" fill="url(#glow)"/>
  <g opacity="${opacity}" transform="translate(360 290) scale(${scale}) translate(-32 -32)">
    <rect width="64" height="64" rx="15" fill="url(#bg)" stroke="#f3d9a4" stroke-opacity=".3" stroke-width=".35"/>
    <path d="${FRAME}" fill="none" stroke="#f3d9a4" stroke-opacity=".5" stroke-width="1"
      stroke-dasharray="${FRAME_LEN} ${FRAME_LEN}" stroke-dashoffset="${FRAME_LEN * (1 - frameDraw)}"/>
    <g fill="url(#gold)">
      ${strokes}
      <path d="${SERIFS}" opacity="${serifs}"/>
    </g>
    <g clip-path="url(#clip)"><g transform="rotate(20 32 32)">
      <rect x="${-44 + 120 * shine}" y="-16" width="26" height="96" fill="url(#shine)"/>
    </g></g>
  </g>
  <g opacity="${text}" transform="translate(0 ${18 * (1 - text)})">
    <text x="360" y="545" text-anchor="middle" fill="#ffffff" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="700">Studio Maffei</text>
    <text x="363" y="592" text-anchor="middle" fill="#d6a756" font-family="'Segoe UI', Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="6">CONSULENTE DEL LAVORO</text>
  </g>
</svg>`;
}

await mkdir(outDir, { recursive: true });

const count = Math.round(DURATION * FPS) + 1;
const frames = [];
for (let i = 0; i < count; i++) {
  frames.push(await sharp(Buffer.from(frame(i / FPS))).png().toBuffer());
}
const delays = frames.map((_, i) => (i === frames.length - 1 ? HOLD_MS : Math.round(1000 / FPS)));

const webp = await sharp(frames, { join: { animated: true } })
  .webp({ quality: 88, effort: 6, loop: 0, delay: delays })
  .toFile(join(outDir, 'logo-animato.webp'));

const small = await Promise.all(frames.map((f) => sharp(f).resize(480).png().toBuffer()));
const gif = await sharp(small, { join: { animated: true } })
  .gif({ loop: 0, delay: delays, effort: 8, dither: 0.6 })
  .toFile(join(outDir, 'logo-animato.gif'));

// Fotogramma finale statico, utile come anteprima/poster
await sharp(frames.at(-1)).toFile(join(outDir, 'logo-animato-poster.png'));

console.log(`✔ logo animato: ${count} fotogrammi`);
console.log(`  webp ${(webp.size / 1024).toFixed(0)}KB · gif ${(gif.size / 1024).toFixed(0)}KB → design/brand/export/`);
