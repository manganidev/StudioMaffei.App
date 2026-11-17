import { Component } from '@angular/core';
import { STUDIO, TEAM } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';

@Component({
  selector: 'app-contatti',
  imports: [RevealDirective],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.scss',
})
export class ContattiComponent {
  protected readonly studio = STUDIO;
  protected readonly team = TEAM;
}
