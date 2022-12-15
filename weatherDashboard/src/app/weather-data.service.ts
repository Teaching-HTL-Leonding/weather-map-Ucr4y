import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Result {
  lat: number;
  lon: number;
}

export interface Results {
  results: Result[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  public loadGeoData(location: string): Observable<Results> {
    return this.http.get<Results>(
      `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=7a3839bb1c554274a2e3527db778f9ad`
    );
  }
}
