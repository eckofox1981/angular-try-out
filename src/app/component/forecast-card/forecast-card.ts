import { Component, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { kelvinToCelsius } from '../../utility/temp-converter';
import { DatePipe } from '@angular/common';
import { WindRose } from '../wind-rose/wind-rose';
import { CloudCover } from '../cloud-cover/cloud-cover';

@Component({
  selector: 'app-forecast-card',
  imports: [DatePipe, WindRose, CloudCover],
  template: `
    <article class="forecast-card">
      <div class="shown-data">
        <div>
          <img src="https://openweathermap.org/img/wn/{{ dIcon() }}@2x.png" alt="weather icon" />
          <h4>{{ dTemp() }}°C</h4>
        </div>
        <div>
          <i>{{ dTime() | date : 'short' }}</i
          ><br /><br />
          <b>{{ dDescription() }}</b>
          <p>Temperature feels like: {{ dFeelsLike() }}°C</p>
        </div>
        <button class="show-details" (click)="handleShowDetails()">Show details</button>
      </div>
      <div class="hidden-data {{ showDetails() }}">
        <ul class="flex">
          <li>
            <app-wind-rose [windSpeed]="dWindSpeed()" [windDirection]="dWindDeg()" />
          </li>
          <li>
            <app-cloud-cover [cloudCover]="dClouds()" />
          </li>
        </ul>
        <ul>
          <li>Max temp: {{ dTempMax() }}°C</li>
          <li>Minimum temp: {{ dTempMin() }}°C</li>
          <li>Pressure: {{ dPressure() }} Hpa</li>
          <li>Visibility: {{ dVisibility() }}m</li>
        </ul>
      </div>
    </article>
  `,
  styles: `
    .forecast-card {
      border: 1px  solid darkGrey;
      margin: 0.5rem auto;
      background-color: lightBlue;
    }

    .shown-data {
      display: flex;
      flex-align: center;
      border-bottom: 1px solid darkGrey;
    }

    .shown-data > div{
      margin: auto;
      text-align: center;
    }

    .shown-data > div > img {
      margin: -1rem -1.5rem -2rem -1.5rem;
    }

    .shown-data > button {
      margin: auto 0.25rem 0.25rem auto;
      width: fit-content;
    }

    .hidden-data {
      
    }

    .hidden-data > ul{
      list-style: none;
      margin: 1rem auto;
      width: fit-content;
    }

    .flex {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .hidden {
      display: none;
    }


  `,
})
export class ForecastCard implements OnChanges {
  time = input<number | null>();
  temp = input<number | null>();
  feelsLike = input<number | null>();
  description = input<string | null>();
  icon = input<string | null>();
  windSpeed = input<number | null>();
  windDeg = input<number | null>();
  windGust = input<number | null>();
  clouds = input<number | null>();
  visibility = input<number | null>();
  tempMax = input<number | null>();
  tempMin = input<number | null>();
  pressure = input<number>();

  //d for diplayed / rendered
  dTime = signal<number>(0);
  dTemp = signal<number>(0);
  dFeelsLike = signal<number>(0);
  dDescription = signal<string>('');
  dIcon = signal<string>('');
  dWindSpeed = signal<number>(0);
  dWindDeg = signal<number>(0);
  dWindGust = signal<number>(0);
  dClouds = signal<number>(0);
  dVisibility = signal<number>(0);
  dTempMax = signal<number>(0);
  dTempMin = signal<number>(0);
  dPressure = signal<number>(0);

  showDetails = signal<string>('hidden');

  ngOnChanges(changes: SimpleChanges): void {
    this.dTime.set(this.time() ?? 0);
    this.dTemp.set(kelvinToCelsius(this.temp() ?? 100));
    this.dFeelsLike.set(kelvinToCelsius(this.feelsLike() ?? 100));
    this.dDescription.set(this.description() ?? 'No description.');
    this.dIcon.set(this.icon() ?? '04d');
    this.dWindSpeed.set(this.windSpeed() ?? 0);
    this.dWindDeg.set(this.windDeg() ?? 0);
    this.dWindGust.set(this.windGust() ?? 0);
    this.dClouds.set(this.clouds() ?? 0);
    this.dVisibility.set(this.visibility() ?? 0);
    this.dTempMax.set(kelvinToCelsius(this.tempMax() ?? 100));
    this.dTempMin.set(kelvinToCelsius(this.tempMin() ?? 100));
    this.dPressure.set(this.pressure() ?? 0);
  }

  handleShowDetails() {
    if (this.showDetails() === 'hidden') {
      this.showDetails.set('');
    } else {
      this.showDetails.set('hidden');
    }
  }
}
