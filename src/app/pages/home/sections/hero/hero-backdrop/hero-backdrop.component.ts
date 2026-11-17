import { Component } from '@angular/core';

// Geometria della loggia (stile Spedale degli Innocenti): archi a tutto sesto su colonne,
// con tondi nei pennacchi. Richiama gli archi del logo.
const SPAN = 180;
const RADIUS = SPAN / 2;
const SPRING = 210; // quota d'imposta degli archi
const BASE = 380; // piano di calpestio
const ARCHES = 8;
const TONDO_Y = 146;
const TONDO_R = 13;

const xs = Array.from({ length: ARCHES + 1 }, (_, i) => i * SPAN);
const inner = xs.slice(1, -1);

/**
 * Sfondo animato della hero: luci che si muovono, griglia e loggia disegnata a linee
 * percorsa da una scia di luce. Tutto in CSS/SVG: pochi KB, nessun video da scaricare.
 */
@Component({
  selector: 'app-hero-backdrop',
  templateUrl: './hero-backdrop.component.html',
  styleUrl: './hero-backdrop.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class HeroBackdropComponent {
  protected readonly arches =
    `M0 ${BASE}V${SPRING}` + xs.slice(1).map((x) => `A${RADIUS} ${RADIUS} 0 0 1 ${x} ${SPRING}`).join('') + `V${BASE}`;
  protected readonly columns = inner.map((x) => `M${x} ${SPRING}V${BASE}`).join('');
  protected readonly tondi = inner
    .map((x) => `M${x - TONDO_R} ${TONDO_Y}a${TONDO_R} ${TONDO_R} 0 1 0 ${TONDO_R * 2} 0a${TONDO_R} ${TONDO_R} 0 1 0 ${-TONDO_R * 2} 0`)
    .join('');
  protected readonly lines = `M0 84H1440M0 96H1440M0 ${BASE}H1440M0 ${BASE + 12}H1440`;
}
