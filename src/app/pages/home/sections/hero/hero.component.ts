import { Component } from '@angular/core';
import { STUDIO } from '../../../../core/studio.data';
import { RevealDirective } from '../../../../shared/reveal.directive';
import { scrollToSection } from '../../../../shared/scroll';

@Component({
  selector: 'app-hero',
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  protected readonly studio = STUDIO;
  protected readonly go = scrollToSection;
}
