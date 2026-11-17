import { Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { ServiziComponent } from './sections/servizi/servizi.component';
import { StudioComponent } from './sections/studio/studio.component';
import { ContattiComponent } from './sections/contatti/contatti.component';
import { DoveComponent } from './sections/dove/dove.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ServiziComponent, StudioComponent, ContattiComponent, DoveComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
