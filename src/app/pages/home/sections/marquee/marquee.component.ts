import { Component } from '@angular/core';

/** Nastro scorrevole con le aree di attività dello studio, sotto la hero. */
@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  protected readonly items = [
    'Consulenza del lavoro',
    'Elaborazione paghe',
    'Consulenza fiscale',
    'Consulenza tributaria',
    'Contabilità',
    'Consulenza societaria',
    'Aziende e privati',
    'Firenze',
  ];

  // Due copie identiche per uno scorrimento continuo; la seconda è nascosta agli screen reader.
  protected readonly copies = [0, 1];
}
