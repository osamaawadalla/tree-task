import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home-routes') },
  { path: 'about', loadChildren: () => import('./pages/about/about-routes') }
];
