import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { STUDIO } from '../../../../core/studio.data';
import { TiltDirective } from '../../../../shared/tilt.directive';
import { scrollToSection } from '../../../../shared/scroll';
import { HeroBackdropComponent } from './hero-backdrop/hero-backdrop.component';

@Component({
  selector: 'app-hero',
  imports: [IconComponent, HeroBackdropComponent, TiltDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  protected readonly studio = STUDIO;
  protected readonly go = scrollToSection;
}
