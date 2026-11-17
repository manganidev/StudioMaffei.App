// Genera gli asset ottimizzati del sito.  Uso:  npm run assets
//
//  - Marchio: favicon (.ico + .svg), icone app/PWA, logo PNG, immagine Open Graph
//    a partire dagli SVG in public/brand e design/brand.
//  - Foto: ogni immagine in design/images viene convertita in WebP in più larghezze
//    (src/assets/img/<nome>-<larghezza>.webp) da usare con srcset.
//    Il nome del file sorgente diventa il nome pubblico: usare nomi descrittivi
//    in minuscolo con trattini (es. "sede-studio-firenze.jpg"), utili anche per la SEO.

import sharp from 'sharp';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const p = (...parts) => join(root, ...parts);

const PHOTO_WIDTHS = [480, 800, 1200];
const PHOTO_QUALITY = 78;

/** Rasterizza un SVG alla larghezza indicata senza perdere nitidezza. */
async function renderSvg(svgPath, width, height = width) {
  const svg = await readFile(svgPath);
  const meta = await sharp(svg).metadata();
  const density = Math.ceil((72 * width) / meta.width);
  return sharp(svg, { density }).resize(width, height).png({ compressionLevel: 9 });
}

/** Crea un file .ico che contiene direttamente le immagini PNG (supportato da tutti i browser moderni). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const directory = Buffer.alloc(16 * images.length);
  let offset = header.length + directory.length;

  images.forEach(({ size, data }, i) => {
    const o = i * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, o);
    directory.writeUInt8(size >= 256 ? 0 : size, o + 1);
    directory.writeUInt16LE(1, o + 4);
    directory.writeUInt16LE(32, o + 6);
    directory.writeUInt32LE(data.length, o + 8);
    directory.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });

  return Buffer.concat([header, directory, ...images.map((img) => img.data)]);
}

async function brand() {
  const mark = p('public/brand/logo-mark.svg');
  const appIcon = p('design/brand/app-icon.svg');
  await mkdir(p('public/icons'), { recursive: true });

  await copyFile(mark, p('public/favicon.svg'));

  const icoImages = [];
  for (const size of [16, 32, 48]) {
    icoImages.push({ size, data: await (await renderSvg(mark, size)).toBuffer() });
  }
  await writeFile(p('public/favicon.ico'), buildIco(icoImages));

  await (await renderSvg(appIcon, 180)).toFile(p('public/apple-touch-icon.png'));
  await (await renderSvg(appIcon, 192)).toFile(p('public/icons/icon-192.png'));
  await (await renderSvg(appIcon, 512)).toFile(p('public/icons/icon-512.png'));
  await (await renderSvg(mark, 512)).toFile(p('public/brand/logo-512.png'));
  await (await renderSvg(p('public/brand/logo.svg'), 1168, 256)).toFile(p('public/brand/logo.png'));
  await (await renderSvg(p('design/brand/og-image.svg'), 1200, 630)).toFile(p('public/og-image.png'));

  console.log('✔ marchio: favicon, icone, logo e og-image generati');
}

async function photos() {
  const inputDir = p('design/images');
  const outputDir = p('src/assets/img');
  await mkdir(outputDir, { recursive: true });

  const files = (await readdir(inputDir)).filter((f) => /\.(png|jpe?g|webp|tiff?)$/i.test(f));

  for (const file of files) {
    const source = join(inputDir, file);
    const { name } = parse(file);
    const { width: sourceWidth } = await sharp(source).metadata();
    const written = [];

    for (const target of PHOTO_WIDTHS) {
      const width = Math.min(target, sourceWidth);
      const out = join(outputDir, `${name}-${width}.webp`);
      const info = await sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: PHOTO_QUALITY, effort: 6 })
        .toFile(out);
      written.push(`${width}w ${(info.size / 1024).toFixed(0)}KB`);
      if (width === sourceWidth) break;
    }

    console.log(`✔ ${file.replace(extname(file), '')}: ${written.join(', ')}`);
  }
}

await brand();
await photos();
