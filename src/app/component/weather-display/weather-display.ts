import { Component, inject, input, OnChanges, OnInit, signal } from '@angular/core';
import { CityService } from '../../service/city-service';
import { CityType } from '../../../model/city-type';
import { KeyValuePipe } from '@angular/common';
import { catchError, EMPTY, firstValueFrom } from 'rxjs';
import { CurrentWeatherType } from '../../../model/weather-type';
import { CurrentWeatherService } from '../../service/current-weather-service';
import { CurrentWeatherData } from '../current-weather-data/current-weather-data';

@Component({
  selector: 'app-weather-display',
  imports: [KeyValuePipe, CurrentWeatherData],
  template: `
    <section class="city-and-wx">
      <section>
        <h2>City: {{ city() }}</h2>
        @for(city of cities(); track $index) {
        <div class="city-summary">
          <details>
            <summary>{{ city.name }}, {{ city.state }}, {{ city.country }}</summary>
            @if (city.local_names) {
            <i>Local names:</i>
            <ul class="scrollable">
              @for(name of city.local_names | keyvalue; track $index) {
              <li>{{ name.key }}: {{ name.value }}</li>
              }
            </ul>
            }
          </details>
          <button (click)="handleCityClick(city)">Choose</button>
        </div>
        }
      </section>
      <section class="current-weather">
        <app-current-weather-data [weather]="currentWeather()" [city]="selectedCity()" />
      </section>
    </section>
  `,

  styles: `
    .city-and-wx {
      display: flex;
      width: 100%;
      justify-content:space-between;
    }

    .city-summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: darkgrey;
      padding: 0.5rem;
      width: 20rem;
      margin: 0.5rem;
      border-radius: 0.5rem;
    }

    .city-summary summary {
      margin-bottom: 0.25rem;
    }

    .scrollable {
      max-height: 5rem;
      overflow-x: scroll;
      background-color: lightgrey;
      border: 1px solid black;
      border-radius: 5px;
      margin-top: 0;
    }
  `,
})
export class WeatherDisplay implements OnChanges {
  city = input('');

  cityService = inject(CityService);
  cities = signal<Array<CityType>>([]);
  selectedCity = signal<CityType | null>(null);

  weatherService = inject(CurrentWeatherService);
  currentWeather = signal<CurrentWeatherType | null>(null);

  ngOnChanges(): void {
    if (this.city() === '') {
      return;
    }

    this.cityService.citySearched = this.city();
    this.cityService
      .getCitiesFromAPI()
      .pipe(
        catchError((err) => {
          console.log('Error fetching cities: ' + err);
          throw err;
        })
      )
      .subscribe((cit) => {
        this.cities.set(cit);
      });
  }

  setCurrentWeather(lat: number, lon: number) {
    console.log(JSON.stringify(this.selectedCity));

    this.weatherService.lat = lat;
    this.weatherService.lon = lon;
    this.weatherService
      .getCurrentWeather()
      .pipe(
        catchError((error) => {
          console.log('Error fetching weather: ' + error);
          throw error;
        })
      )
      .subscribe((weather) => {
        if (!weather) {
          this.currentWeather.set(null);
          return;
        }
        console.log('weather: ' + weather);

        this.currentWeather.set(weather);
      });
  }

  async handleCityClick(city: CityType) {
    this.selectedCity.set(city);
    this.weatherService.lat = city.lat;
    this.weatherService.lon = city.lon;

    try {
      const weather = await firstValueFrom(this.weatherService.getCurrentWeather());
      this.currentWeather.set(weather);
      console.log('Weather dt:', this.currentWeather()?.dt);
    } catch (error) {
      console.log('Error fetching weather:', error);
    }
  }
}
