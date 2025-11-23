import { Routes } from '@angular/router';
import { Forecasts } from './page/forecasts/forecasts';
import { Home } from './page/home/home';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
  {
    path: 'forecast',
    component: Forecasts,
  },
];
