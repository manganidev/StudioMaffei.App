import { Component } from '@angular/core';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { scrollToSection } from '../../../../shared/scroll';

@Component({
  selector: 'app-studio',
  imports: [RevealDirective],
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  protected readonly go = scrollToSection;

  protected readonly punti = [
    { title: 'Assistenza completa', text: 'Dagli adempimenti quotidiani alle scelte più importanti per la tua attività.' },
    { title: 'Referenti dedicati', text: 'Servizio paghe e servizio contabilità con interlocutori diretti.' },
    { title: 'Aziende e privati', text: 'Un supporto su misura, qualunque sia la tua esigenza.' },
  ];
}
