import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { onceInView } from '../in-view';

let nextId = 0;

/**
 * Simbolo dello studio: monogramma "M" in stile Didone dentro una cornice, con animazione.
 * La cornice si disegna, le aste della M si tracciano come colpi di penna, poi grazie e riflesso.
 * - autoplay = true: l'animazione parte al caricamento, solo CSS (funziona anche senza JavaScript).
 * - autoplay = false: parte quando il logo entra nello schermo; fino ad allora è mostrato completo.
 * Gli stili sono globali (styles.scss, sezione "Logo animato").
 * La stessa geometria è in public/brand/logo-mark.svg e negli script di generazione degli asset.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg class="mark" [class.play]="playing()" viewBox="0 0 64 64"
      [attr.width]="size()" [attr.height]="size()" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient [attr.id]="ids.bg" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#123563" />
          <stop offset="1" stop-color="#071427" />
        </linearGradient>
        <linearGradient [attr.id]="ids.gold" x1="16" y1="18" x2="48" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#f3d9a4" />
          <stop offset="1" stop-color="#c58f3b" />
        </linearGradient>
        <linearGradient [attr.id]="ids.shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset=".5" stop-color="#fff" stop-opacity=".45" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </linearGradient>
        <clipPath [attr.id]="ids.clip">
          <rect width="64" height="64" rx="15" />
        </clipPath>
      </defs>

      <rect width="64" height="64" rx="15" [attr.fill]="url(ids.bg)" />
      <path class="mark__frame" pathLength="1" fill="none" stroke="#f3d9a4" stroke-opacity=".5" stroke-width="1"
        d="M17.5 7.5h29a10 10 0 0 1 10 10v29a10 10 0 0 1-10 10h-29a10 10 0 0 1-10-10v-29a10 10 0 0 1 10-10z" />

      <g [attr.fill]="url(ids.gold)">
        <path class="mark__stroke" style="--d: .5s" d="M19.6 19.6h1.5v25.4h-1.5z" />
        <path class="mark__stroke mark__stroke--down" style="--d: .72s" d="M19.4 19H24.6L33.4 45H30.4z" />
        <path class="mark__stroke" style="--d: .98s" d="M30.6 45H32.2L44.6 19H43z" />
        <path class="mark__stroke mark__stroke--down" style="--d: 1.2s" d="M40.9 19h4.6v26h-4.6z" />
        <path class="mark__serifs" d="M16.6 44.2h7.6v1.2h-7.6zM38.4 44.2h9.8v1.2h-9.8zM16.6 19h5v1.2h-5zM43 19h5.2v1.2h-5.2z" />
      </g>

      <g [attr.clip-path]="url(ids.clip)">
        <g transform="rotate(20 32 32)">
          <rect class="mark__shine" x="-44" y="-16" width="26" height="96" [attr.fill]="url(ids.shine)" />
        </g>
      </g>
    </svg>
  `,
  host: { class: 'logo-mark' },
})
export class LogoMarkComponent {
  readonly size = input(44);
  readonly autoplay = input(true);

  private readonly inView = signal(false);
  protected readonly playing = computed(() => this.autoplay() || this.inView());

  // Id univoci per ogni istanza: navbar e footer mostrano il logo nella stessa pagina.
  private readonly uid = `sm-mark-${nextId++}`;
  protected readonly ids = {
    bg: `${this.uid}-bg`,
    gold: `${this.uid}-gold`,
    shine: `${this.uid}-shine`,
    clip: `${this.uid}-clip`,
  };

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (this.autoplay()) return;
      const stop = onceInView(host, () => this.inView.set(true), { threshold: 0.6 });
      destroyRef.onDestroy(stop);
    });
  }

  protected url(id: string): string {
    return `url(#${id})`;
  }
}
