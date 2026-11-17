import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { setPageSeo } from '../../core/seo';
import { STUDIO } from '../../core/studio.data';
import { IconComponent } from '../../shared/icon/icon.component';

/**
 * Informativa privacy e cookie (art. 13 GDPR, Linee guida cookie del Garante 10/06/2021).
 * BOZZA basata sul funzionamento reale del sito: da far verificare a chi segue la privacy
 * dello studio. Se si aggiungono moduli, statistiche o servizi esterni va aggiornata.
 */
@Component({
  selector: 'app-privacy',
  imports: [RouterLink, IconComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent {
  protected readonly studio = STUDIO;

  constructor() {
    setPageSeo({
      path: 'privacy',
      description: `Informativa privacy e cookie del sito di ${STUDIO.name}, ${STUDIO.role} a Firenze.`,
      index: false,
    });
  }
}
