import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { hasFinePointer, prefersReducedMotion } from './in-view';

/**
 * Leggera inclinazione 3D che segue il mouse nella sezione che contiene l'elemento.
 * Uso: <div appTilt> oppure <div appTilt="8"> per l'inclinazione massima in gradi.
 */
@Directive({
  selector: '[appTilt]',
  host: { class: 'tilt' },
})
export class TiltDirective {
  readonly maxDeg = input<number, unknown>(6, {
    alias: 'appTilt',
    transform: (value: unknown) => numberAttribute(value, 6),
  });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!hasFinePointer() || prefersReducedMotion()) return;

      const area = el.closest('section') ?? el;
      const clamp = (n: number) => Math.max(-1, Math.min(1, n));
      let frame = 0;

      const move = (event: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = clamp((event.clientX - (rect.left + rect.width / 2)) / rect.width);
          const y = clamp((event.clientY - (rect.top + rect.height / 2)) / rect.height);
          el.style.setProperty('--tilt-x', `${(x * this.maxDeg()).toFixed(2)}deg`);
          el.style.setProperty('--tilt-y', `${(-y * this.maxDeg()).toFixed(2)}deg`);
        });
      };

      const leave = () => {
        cancelAnimationFrame(frame);
        el.style.setProperty('--tilt-x', '0deg');
        el.style.setProperty('--tilt-y', '0deg');
      };

      area.addEventListener('pointermove', move as EventListener, { passive: true });
      area.addEventListener('pointerleave', leave);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        area.removeEventListener('pointermove', move as EventListener);
        area.removeEventListener('pointerleave', leave);
      });
    });
  }
}
