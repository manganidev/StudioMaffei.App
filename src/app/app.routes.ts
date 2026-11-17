import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Consulente del Lavoro a Firenze | Studio Maffei Marialuisa' },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
    title: 'Privacy e cookie | Studio Maffei Marialuisa',
  },
  { path: '**', redirectTo: '' },
];
