import { API_KEY, BASE_URL } from './../utils/constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getDataByCity(city: String): Observable<any> {
    return this.httpClient.get(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=no&days=3`);
  }

  getDataByLocation(lng: any, lat: any): Observable<any> {
    return this.httpClient.get(
      `${BASE_URL}?key=${API_KEY}&q=${lat},${lng}&aqi=no&days=3`
    );
  }


}
