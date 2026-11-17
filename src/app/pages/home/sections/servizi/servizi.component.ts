import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { SERVIZI } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { SpotlightDirective } from '../../../../shared/spotlight.directive';

@Component({
  selector: 'app-servizi',
  imports: [IconComponent, RevealDirective, SpotlightDirective],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss',
})
export class ServiziComponent {
  protected readonly servizi = SERVIZI;
}
