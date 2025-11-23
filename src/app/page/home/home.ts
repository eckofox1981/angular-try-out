import { Component } from '@angular/core';
import { PageTitle } from '../../component/page-title/page-title';
import { WeatherSection } from '../../component/weather-section/weather-section';

@Component({
  selector: 'app-home',
  imports: [PageTitle, WeatherSection],
  template: `<section class="page">
    <app-page-title title="Welcome" />
    <app-weather-section />
  </section>`,
  styles: `
  p {
    background-color: red;
    height: 10rem;
  }
  `,
})
export class Home {}
