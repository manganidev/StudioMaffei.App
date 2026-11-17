import { Component } from '@angular/core';
import { SERVIZI } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';

@Component({
  selector: 'app-servizi',
  imports: [RevealDirective],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss',
})
export class ServiziComponent {
  protected readonly servizi = SERVIZI;
}
