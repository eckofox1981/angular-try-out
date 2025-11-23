import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ForecastWeatherType } from '../../model/weather-type';
import { OPEN_WX_API_KEY, WEATHER_FORECAST_URL } from '../../api/API_IRL';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastWeatherService {
  lat: number | null = null;
  lon: number | null = null;
  http = inject(HttpClient);

  weatherForecast: ForecastWeatherType | null = null;

  getForecastWeather() {
    if (!this.lon || !this.lat) return EMPTY;

    return this.http.get<ForecastWeatherType>(
      WEATHER_FORECAST_URL(this.lat, this.lon, 'en') + OPEN_WX_API_KEY
    );
  }
}
