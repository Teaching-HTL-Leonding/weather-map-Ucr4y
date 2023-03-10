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

export interface Weather {
  icon: string;
  description: string;
}

export interface WeatherMain {
  temp: number;
}

export interface WeatherResponse {
  weather: Weather[];
  main: WeatherMain;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  public loadGeoData(location: string): Observable<Results> {
    return this.http.get<Results>(
      `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=API-TOKEN`
    );
  }

  public loadTemperature(
    lon: number,
    lat: number
  ): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=de&units=metric&appid=API-TOKEN
      `
    );
  }
}
