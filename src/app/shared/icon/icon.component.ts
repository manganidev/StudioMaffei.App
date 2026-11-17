import { Component, computed, input } from '@angular/core';
import { ICONS, IconName } from './icons';

/**
 * Icona SVG inclusa nel sito (nessuna CDN o webfont esterno).
 * Uso: <i appIcon="phone"></i>  –  eredita colore (currentColor) e dimensione (1em) dal contesto.
 * Le icone disponibili sono in icons.ts (generato con: npm run icons).
 */
@Component({
  selector: 'i[appIcon]',
  template: `
    <svg class="ico" [attr.viewBox]="viewBox()" [style.width.em]="icon().w / icon().h"
      aria-hidden="true" focusable="false"><path [attr.d]="icon().d" /></svg>
  `,
  host: { 'aria-hidden': 'true' },
})
export class IconComponent {
  readonly name = input.required<IconName>({ alias: 'appIcon' });

  protected readonly icon = computed(() => ICONS[this.name()]);
  protected readonly viewBox = computed(() => `0 0 ${this.icon().w} ${this.icon().h}`);
}
