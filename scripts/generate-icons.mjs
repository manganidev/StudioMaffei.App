// Genera src/app/shared/icon/icons.ts con le sole icone usate dal sito, prese dai pacchetti
// Font Awesome Free installati in locale.  Uso:  npm run icons
//
// Per aggiungere un'icona: inserirla nella mappa qui sotto (nome → icona Font Awesome),
// rilanciare lo script e usarla nei template con <i appIcon="nome"></i>.
// Catalogo: https://fontawesome.com/search?ic=free

import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const ICONS = {
  'arrow-down': solid.faArrowDown,
  'arrow-left': solid.faArrowLeft,
  'arrow-right': solid.faArrowRight,
  'arrow-up': solid.faArrowUp,
  award: solid.faAward,
  briefcase: solid.faBriefcase,
  building: solid.faBuilding,
  'chart-pie': solid.faChartPie,
  check: solid.faCheck,
  clock: regular.faClock,
  'diamond-turn-right': solid.faDiamondTurnRight,
  envelope: regular.faEnvelope,
  'file-invoice-dollar': solid.faFileInvoiceDollar,
  'location-dot': solid.faLocationDot,
  'map-location-dot': solid.faMapLocationDot,
  phone: solid.faPhone,
  'scale-balanced': solid.faScaleBalanced,
  'shield-halved': solid.faShieldHalved,
};

const pkg = JSON.parse(await readFile(join(root, 'node_modules/@fortawesome/free-solid-svg-icons/package.json'), 'utf8'));

const entries = Object.entries(ICONS).map(([name, def]) => {
  if (!def) throw new Error(`Icona non trovata: ${name}`);
  const [w, h, , , path] = def.icon;
  const d = Array.isArray(path) ? path.join(' ') : path;
  return `  '${name}': { w: ${w}, h: ${h}, d: '${d}' },`;
});

const out = `// Generato da scripts/generate-icons.mjs (npm run icons): non modificare a mano.
// Font Awesome Free ${pkg.version} by @fontawesome – https://fontawesome.com
// License – https://fontawesome.com/license/free (Icons: CC BY 4.0)

export const ICONS = {
${entries.join('\n')}
} as const;

export type IconName = keyof typeof ICONS;
`;

await writeFile(join(root, 'src/app/shared/icon/icons.ts'), out);
console.log(`✔ ${entries.length} icone scritte in src/app/shared/icon/icons.ts`);
