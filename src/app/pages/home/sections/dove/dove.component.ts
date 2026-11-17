import { Component } from '@angular/core';
import { STUDIO } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';

@Component({
  selector: 'app-dove',
  imports: [RevealDirective],
  templateUrl: './dove.component.html',
  styleUrl: './dove.component.scss',
})
export class DoveComponent {
  protected readonly studio = STUDIO;
}
