import { Component } from '@angular/core';
import { NAV_LINKS, STUDIO } from '../../core/studio.data';
import { scrollToSection } from '../../shared/scroll';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly links = NAV_LINKS;
  protected readonly studio = STUDIO;
  protected readonly year = new Date().getFullYear();
  protected readonly go = scrollToSection;
}
