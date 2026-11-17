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
const DURATION = 2.7; // secondi di animazione
const HOLD_MS = 1800; // pausa sul logo completo prima di ripartire
const SIZE = 720;

const ARCHES = 'M17 41.5V27a7.5 7.5 0 0 1 15 0a7.5 7.5 0 0 1 15 0v14.5';
const COLUMN = 'M32 27v14.5';
const BASE = 'M12.5 46.5h39';
const ARCHES_LEN = 2 * 14.5 + 2 * Math.PI * 7.5;
const COLUMN_LEN = 14.5;

const clamp01 = (n) => Math.max(0, Math.min(1, n));
const range = (t, from, to) => clamp01((t - from) / (to - from));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutBack = (x) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2);

function frame(t) {
  const pop = easeOutBack(range(t, 0, 0.6));
  const opacity = range(t, 0, 0.25);
  const base = easeOut(range(t, 0.3, 0.85));
  const arches = easeInOut(range(t, 0.45, 1.5));
  const column = easeOut(range(t, 1.35, 1.8));
  const shine = easeInOut(range(t, 1.8, 2.5));
  const text = easeOut(range(t, 1.9, 2.6));
  const scale = (300 / 64) * (0.6 + 0.4 * pop);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 720 720">
  <defs>
    <radialGradient id="glow" cx="560" cy="120" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1f5fb8" stop-opacity=".45"/><stop offset="1" stop-color="#1f5fb8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1a4580"/><stop offset="1" stop-color="#0a1c36"/>
    </linearGradient>
    <linearGradient id="gold" x1="13" y1="18" x2="51" y2="47" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3d9a4"/><stop offset="1" stop-color="#c58f3b"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="clip"><rect width="64" height="64" rx="15"/></clipPath>
  </defs>
  <rect width="720" height="720" fill="#071427"/>
  <rect width="720" height="720" fill="url(#glow)"/>
  <g opacity="${opacity}" transform="translate(360 290) scale(${scale}) translate(-32 -32)">
    <rect width="64" height="64" rx="15" fill="url(#bg)" stroke="#f3d9a4" stroke-opacity=".3" stroke-width=".35"/>
    <g fill="none" stroke="url(#gold)">
      <path d="${ARCHES}" stroke-width="4.6" stroke-dasharray="${ARCHES_LEN} ${ARCHES_LEN}" stroke-dashoffset="${ARCHES_LEN * (1 - arches)}"/>
      <path d="${COLUMN}" stroke-width="4.6" stroke-dasharray="${COLUMN_LEN} ${COLUMN_LEN}" stroke-dashoffset="${COLUMN_LEN * (1 - column)}"/>
      <path d="${BASE}" stroke-width="2.6" stroke-linecap="round" opacity="${base > 0 ? 1 : 0}"
        transform="translate(32 0) scale(${Math.max(base, 0.001)} 1) translate(-32 0)"/>
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
