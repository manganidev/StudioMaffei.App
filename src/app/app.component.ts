import { ViewportScroller } from '@angular/common';
import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    // Quando il router scorre a un'ancora (es. /#contatti) lascia spazio per la navbar fissa.
    const doc = inject(DOCUMENT);
    inject(ViewportScroller).setOffset(() => {
      const nav = doc.querySelector('.nav');
      return [0, (nav?.getBoundingClientRect().height ?? 76) + 12];
    });
  }
}
