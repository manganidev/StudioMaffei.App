import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { hasFinePointer } from './in-view';

/**
 * Alone di luce che segue il mouse sulla card (solo su dispositivi con mouse).
 * Il colore si regola con la variabile CSS --spot.
 */
@Directive({
  selector: '[appSpotlight]',
  host: { class: 'spotlight' },
})
export class SpotlightDirective {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!hasFinePointer()) return;

      // Listener nativo: non avvia il change detection di Angular a ogni movimento.
      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      };

      el.addEventListener('pointermove', move, { passive: true });
      destroyRef.onDestroy(() => el.removeEventListener('pointermove', move));
    });
  }
}
