import { Component, afterNextRender, signal } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { NAV_LINKS, STUDIO } from '../../core/studio.data';
import { LogoMarkComponent } from '../../shared/logo-mark/logo-mark.component';
import { scrollToSection } from '../../shared/scroll';

@Component({
  selector: 'app-navbar',
  imports: [IconComponent, LogoMarkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'open.set(false)',
  },
})
export class NavbarComponent {
  protected readonly links = NAV_LINKS;
  protected readonly studio = STUDIO;
  protected readonly solid = signal(false);
  protected readonly open = signal(false);

  constructor() {
    afterNextRender(() => this.onScroll());
  }

  protected onScroll(): void {
    this.solid.set(window.scrollY > 24);
  }

  protected go(event: Event, id: string): void {
    this.open.set(false);
    scrollToSection(event, id);
  }
}
