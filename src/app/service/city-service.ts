import { inject, Injectable, input } from '@angular/core';
import { CityType } from '../../model/city-type';
import { HttpClient } from '@angular/common/http';
import { CITY_GEOCODING_URL, OPEN_WX_API_KEY } from '../../api/API_IRL';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  citySearched: string = '';
  http = inject(HttpClient);

  getCitiesFromAPI() {
    return this.http.get<Array<CityType>>(CITY_GEOCODING_URL(this.citySearched) + OPEN_WX_API_KEY);
  }
}
