import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastWeatherService } from '../../service/forecast-weather-service';
import { ForecastWeatherType } from '../../../model/weather-type';
import { catchError } from 'rxjs';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { ForecastCard } from '../../component/forecast-card/forecast-card';

@Component({
  selector: 'app-forecasts',
  imports: [DatePipe, ForecastCard],
  template: `
    @if (lat === null || lon === null || !forecast) {
    <p>Something went wrong, please select a city on <a href="/">the home page</a>.</p>
    } @else {
    <section>
      <div class="city-div">
        <h2>{{ forecast()?.city?.name }}</h2>
        <p>{{ forecast()?.city?.country }}</p>
        <div class="city-info">
          <ul class="city-admin">
            <li>UTC: {{ forecast()?.city?.timezone | date : 'HH:mm' }}</li>
            <li>Population: {{ forecast()?.city?.population }}</li>
          </ul>
          <ul class="city-admin">
            <li>
              <i>Sunrise: {{ forecast()?.city?.sunrise | date : 'short' }}</i>
            </li>
            <li>
              <i>Sunset: {{ forecast()?.city?.sunset | date : 'short' }}</i>
            </li>
          </ul>
        </div>
      </div>
      <div class="forecast-feed">
        @for(listItem of forecast()?.list; track $index) {
        <app-forecast-card
          [time]="listItem.dt"
          [temp]="listItem.main.temp"
          [feelsLike]="listItem.main.feels_like"
          [description]="listItem.weather[0].description"
          [icon]="listItem.weather[0].icon"
          [windSpeed]="listItem.wind.speed"
          [windDeg]="listItem.wind.deg"
          [windGust]="listItem.wind.gust"
          [clouds]="listItem.clouds.all"
          [visibility]="listItem.visibility"
          [tempMax]="listItem.main.temp_max"
          [tempMin]="listItem.main.temp_min"
          [pressure]="listItem.main.pressure"
        />
        }
      </div>
    </section>
    }
  `,
  styles: `
    section {
      margin: 4rem auto;
    }

    .city-div {
      display: flex;
      flex-direction: column;
      gap: 0;
      align-items: center;
      text-align: center;
      width: 90%;
      border: 1px solid black;
      background-color: lightgray;
      margin: 0 auto;
    }

    .city-div > h2, p {
      margin: 0
    }

    .city-info {
      display: flex;
    }

    .city-admin {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      list-style: none;
    }

    .forecast-feed {
      margin: 0 auto;
      width: 90%;
    }
  `,
})
export class Forecasts implements OnInit {
  lat: string | null = null;
  lon: string | null = null;
  constructor(private route: ActivatedRoute) {}
  forecastService = inject(ForecastWeatherService);
  forecast = signal<ForecastWeatherType | null>(null);

  ngOnInit(): void {
    this.lat = this.route.snapshot.queryParamMap.get('lat');
    this.lon = this.route.snapshot.queryParamMap.get('lon');

    this.setForecast();
  }

  setForecast() {
    if (!this.lat && !this.lon) {
      this.forecast.set(null);
      return;
    }

    this.forecastService.lat = Number.parseFloat(this.lat ?? '0');
    this.forecastService.lon = Number.parseFloat(this.lon ?? '0');
    this.forecastService
      .getForecastWeather()
      .pipe(
        catchError((error) => {
          console.log('Error getting forecaast: ' + error);
          throw error;
        })
      )
      .subscribe((forecast) => {
        if (!forecast) {
          this.forecast.set(null);
          return;
        }
        this.forecast.set(forecast);
      });
  }
}
