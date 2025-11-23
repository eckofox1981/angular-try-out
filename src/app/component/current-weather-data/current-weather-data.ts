import { Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CurrentWeatherType } from '../../../model/weather-type';
import { DatePipe } from '@angular/common';
import { CityType } from '../../../model/city-type';
import { kelvinToCelsius } from '../../utility/temp-converter';
import { CloudCover } from '../cloud-cover/cloud-cover';
import { WindRose } from '../wind-rose/wind-rose';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-current-weather-data',
  imports: [DatePipe, CloudCover, WindRose, RouterLink],
  template: `
    @if(!weather()) {
    <p>no weather to display</p>
    } @else {
    <article class="weather">
      <div class="city-title">
        <h4>{{ cityTitle() }}</h4>
      </div>
      <div class="icon-and-temp">
        <img src="https://openweathermap.org/img/wn/{{ icon() }}@4x.png" alt="weather icon" />
        <h4>{{ mainTemp() }}°C</h4>
        <app-cloud-cover [cloudCover]="clouds()" />
        <app-wind-rose [windDirection]="windDir()" [windSpeed]="windSpeed()" />
      </div>
      <h5>{{ description() }}</h5>
      <summary>
        More details
        <details>
          <ul class="details-list">
            <li>Feels like: {{ feelsLike() }}°C</li>
            <li>Max: {{ maxTemp() }}°C</li>
            <li>Min: {{ minTemp() }}°C</li>
            <li>Wind: {{ windSpeed() }}m/s from {{ windDir() }}°</li>
            <li>Gusting: {{ windGust() }}m/s</li>
            <li>Pressure SL: {{ pressureSL() }}Hpa</li>
            <li>Cloud coverage: {{ clouds() }}%</li>
            <li>
              <i>Time of data: {{ timeOfData() | date : 'yyyy-MM-dd hh:mm' }}</i>
            </li>
          </ul>
        </details>
      </summary>
      <button [routerLink]="['/forecast']" [queryParams]="{ lat: city()?.lat, lon: city()?.lon }">
        See forecast for {{ city()?.name ?? 'this location' }}
      </button>
    </article>
    }
  `,
  styles: `
  .weather {
    display:flex;
    flex-direction: column;
    align-items: center;
    background-color: #afafafff;
    border-radius: 1rem;
    padding: 1rem
  }

  .weather h5 {
    text-transform: capitalize;
  }

  .weather summary{
    width: 100%
  }

  .weather button {
    width: fit-content;
  }

  .details-list {
    list-style: none;
  }

  .city-title {
    text-align: center;
  }

  .icon-and-temp {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .icon-and-temp img{
    max-height: 100px;
    margin: -1rem;
  }
  `,
})
export class CurrentWeatherData implements OnChanges {
  weather = input<CurrentWeatherType | null>(null);
  city = input<CityType | null>(null);

  cityTitle = signal<string>('');

  mainTemp = signal<number>(0);
  icon = signal<string>('');
  description = signal<string>('');
  feelsLike = signal<number>(0);
  maxTemp = signal<number>(0);
  minTemp = signal<number>(0);
  windSpeed = signal<number>(0);
  windDir = signal<number>(0);
  windGust = signal<number>(0);
  pressureSL = signal<number>(0);
  clouds = signal<number>(0);
  timeOfData = signal<Date>(new Date());

  ngOnChanges(): void {
    const weather = this.weather();
    if (weather !== null) {
      this.mainTemp.set(kelvinToCelsius(weather.main.temp));
      this.icon.set(weather.weather[0].icon);
      this.description.set(weather.weather[0].description);
      this.feelsLike.set(kelvinToCelsius(weather.main.feels_like));
      this.maxTemp.set(kelvinToCelsius(weather.main.temp_max));
      this.minTemp.set(kelvinToCelsius(weather.main.temp_min));
      this.windSpeed.set(weather.wind.speed);
      this.windDir.set(weather.wind.deg);
      this.windGust.set(weather.wind?.gust | 0);
      this.pressureSL.set(weather.main.pressure);
      this.clouds.set(weather.clouds?.all ?? 0);
      this.timeOfData.set(new Date(weather.dt * 1000));
    }
    this.setCityTitle();
  }

  setCityTitle() {
    const newCity = this.city();
    if (!newCity) {
      return;
    }
    if (newCity.state === null || newCity.state === undefined) {
      this.cityTitle.set(newCity.name + ', ' + newCity.country);
    } else {
      this.cityTitle.set(newCity.name + ', ' + newCity.state + ', ' + newCity.country);
    }
  }
}
