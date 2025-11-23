import { inject, Injectable } from '@angular/core';
import { CurrentWeatherType } from '../../model/weather-type';
import { HttpClient } from '@angular/common/http';
import { OPEN_WX_API_KEY, WEATHER_CURRENT_WEATHER_URL } from '../../api/API_IRL';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentWeatherService {
  lon: number | null = null;
  lat: number | null = null;
  http = inject(HttpClient);

  currentWeather: CurrentWeatherType | null = null;

  getCurrentWeather() {
    if (!this.lon || !this.lat) return EMPTY;

    return this.http.get<CurrentWeatherType>(
      WEATHER_CURRENT_WEATHER_URL(this.lat, this.lon, 'en' + OPEN_WX_API_KEY)
    );
  }
}
