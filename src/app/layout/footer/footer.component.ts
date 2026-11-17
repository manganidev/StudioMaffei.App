import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { NAV_LINKS, STUDIO } from '../../core/studio.data';
import { LogoMarkComponent } from '../../shared/logo-mark/logo-mark.component';
import { scrollToSection } from '../../shared/scroll';

@Component({
  selector: 'app-footer',
  imports: [IconComponent, LogoMarkComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly links = NAV_LINKS;
  protected readonly studio = STUDIO;
  protected readonly year = new Date().getFullYear();
  protected readonly go = scrollToSection;
}
