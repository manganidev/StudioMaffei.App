import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { onceInView, prefersReducedMotion } from './in-view';

/**
 * Anima un numero da 0 al valore scritto nell'elemento quando diventa visibile.
 * Esempio: <strong appCountUp>10+</strong>. L'HTML prerenderizzato contiene già il valore
 * finale, quindi motori di ricerca e utenti senza JavaScript vedono sempre "10+".
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const match = el.textContent?.trim().match(/^(\d+)(.*)$/);
      if (!match || prefersReducedMotion()) return;

      const target = Number(match[1]);
      const suffix = match[2];
      let frame = 0;
      el.textContent = `0${suffix}`;

      const stop = onceInView(
        el,
        () => {
          const start = performance.now();
          const duration = 1600;
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        },
        { threshold: 0.6 },
      );

      destroyRef.onDestroy(() => {
        stop();
        cancelAnimationFrame(frame);
      });
    });
  }
}
