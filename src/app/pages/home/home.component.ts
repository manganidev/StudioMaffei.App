import { Component, DOCUMENT, inject } from '@angular/core';
import { setPageSeo } from '../../core/seo';
import { buildStructuredData, setJsonLd } from '../../core/structured-data';
import { HeroComponent } from './sections/hero/hero.component';
import { MarqueeComponent } from './sections/marquee/marquee.component';
import { ServiziComponent } from './sections/servizi/servizi.component';
import { StudioComponent } from './sections/studio/studio.component';
import { FaqComponent } from './sections/faq/faq.component';
import { ContattiComponent } from './sections/contatti/contatti.component';
import { DoveComponent } from './sections/dove/dove.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    MarqueeComponent,
    ServiziComponent,
    StudioComponent,
    FaqComponent,
    ContattiComponent,
    DoveComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor() {
    setPageSeo({
      path: '',
      description:
        'Studio Maffei Marialuisa, Consulente del Lavoro a Firenze: paghe, consulenza del lavoro, ' +
        'fiscale, tributaria e societaria per aziende e privati.',
    });
    setJsonLd(inject(DOCUMENT), 'ld-studio', buildStructuredData());
  }
}
