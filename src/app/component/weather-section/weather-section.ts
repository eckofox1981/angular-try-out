import { Component, signal } from '@angular/core';
import { WeatherDisplay } from '../weather-display/weather-display';

@Component({
  selector: 'app-weather-section',
  imports: [WeatherDisplay],
  template: `
    <input type="text" placeholder="Enter city" (change)="handleChange($event)" />
    <button (click)="handleSearch()">Search</button>
    <app-weather-display [city]="city()" />
  `,
  styles: `
    input {
      height: 2rem;
      border-radius: 0.5rem;
      margin-right: 0.5rem;
    }
  `,
})
export class WeatherSection {
  query = signal('');
  city = signal('');

  handleChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.query.set(inputValue);
    console.log(import.meta.env.NG_APP_OPEN_WX_KEY);
  }

  handleSearch() {
    this.city.set(this.query());
  }
}
