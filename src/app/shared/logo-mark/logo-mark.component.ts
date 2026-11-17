import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { onceInView } from '../in-view';

let nextId = 0;

/**
 * Simbolo dello studio (la "m" formata da due archi) con animazione di disegno.
 * - autoplay = true: l'animazione parte al caricamento, solo CSS (funziona anche senza JavaScript).
 * - autoplay = false: parte quando il logo entra nello schermo; fino ad allora è mostrato completo.
 * Gli stili sono globali (styles.scss, sezione "Logo animato").
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
        <linearGradient [attr.id]="ids.gold" x1="13" y1="18" x2="51" y2="47" gradientUnits="userSpaceOnUse">
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
      <g fill="none" [attr.stroke]="url(ids.gold)">
        <path class="mark__arches" pathLength="1" stroke-width="4.6"
          d="M17 41.5V27a7.5 7.5 0 0 1 15 0a7.5 7.5 0 0 1 15 0v14.5" />
        <path class="mark__column" pathLength="1" stroke-width="4.6" d="M32 27v14.5" />
        <path class="mark__base" stroke-width="2.6" stroke-linecap="round" d="M12.5 46.5h39" />
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
