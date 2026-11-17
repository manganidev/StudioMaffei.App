import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { STUDIO, TEAM } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { SpotlightDirective } from '../../../../shared/spotlight.directive';

@Component({
  selector: 'app-contatti',
  imports: [IconComponent, RevealDirective, SpotlightDirective],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.scss',
})
export class ContattiComponent {
  protected readonly studio = STUDIO;
  protected readonly team = TEAM;
}
