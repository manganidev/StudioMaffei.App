import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Studio Maffei Marialuisa - Consulente del Lavoro' },
  { path: '**', redirectTo: '' }
];
