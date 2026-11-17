import { Component, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { STUDIO } from '../../../../core/studio.data';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { RevealDirective } from '../../../../shared/reveal.directive';

const MAP_EMBED =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent('Via Duccio di Buoninsegna 13, Firenze') +
  '&z=16&hl=it&output=embed';

@Component({
  selector: 'app-dove',
  imports: [IconComponent, RevealDirective, RouterLink],
  templateUrl: './dove.component.html',
  styleUrl: './dove.component.scss',
})
export class DoveComponent {
  protected readonly studio = STUDIO;

  /** La mappa Google si carica solo dopo il consenso esplicito (clic su "Mostra la mappa"). */
  protected readonly mapLoaded = signal(false);

  // URL fisso e fidato, scritto nel codice: sicuro da marcare come risorsa attendibile.
  protected readonly mapEmbedUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(MAP_EMBED);
}
