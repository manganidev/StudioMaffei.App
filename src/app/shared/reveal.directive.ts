import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';

/**
 * Fa comparire l'elemento con una leggera animazione quando entra nello schermo.
 * Uso: <div appReveal> oppure <div appReveal="120"> per un ritardo in millisecondi.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.animation-delay.ms]': 'delay()',
  },
})
export class RevealDirective {
  readonly delay = input<number, unknown>(0, {
    alias: 'appReveal',
    transform: (value: unknown) => numberAttribute(value, 0),
  });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );

      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
