import { Component } from '@angular/core';
import {
  Result,
  WeatherDataService,
  WeatherResponse,
} from './weather-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public location: string;
  public weatherData?: WeatherResponse;

  constructor(public service: WeatherDataService) {
    this.location = '';
  }

  public loadGeoData() {
    this.service.loadGeoData(this.location).subscribe((data) => {
      if (data.results.length > 0) {
        this.service
          .loadTemperature(data.results[0].lon, data.results[0].lat)
          .subscribe((data) => (this.weatherData = data));
      }
    });
  }
}
