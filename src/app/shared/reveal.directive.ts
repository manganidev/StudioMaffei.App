import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { onceInView } from './in-view';

export type RevealMode = 'up' | 'clip';

/**
 * Fa comparire l'elemento con un'animazione quando entra nello schermo.
 * Uso: <div appReveal>, <div appReveal="120"> (ritardo in ms),
 *      <img appReveal revealMode="clip"> (immagine che si svela dal basso).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal--clip]': "revealMode() === 'clip'",
    '[style.animation-delay.ms]': 'delay()',
  },
})
export class RevealDirective {
  readonly delay = input<number, unknown>(0, {
    alias: 'appReveal',
    transform: (value: unknown) => numberAttribute(value, 0),
  });
  readonly revealMode = input<RevealMode>('up');

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const stop = onceInView(el, () => el.classList.add('is-visible'));
      destroyRef.onDestroy(stop);
    });
  }
}
