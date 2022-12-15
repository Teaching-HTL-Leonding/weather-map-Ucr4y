import { Component } from '@angular/core';
import { Result, WeatherDataService } from './weather-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public location: string;
  public geoData?: Result;

  constructor(public service: WeatherDataService) {
    this.location = '';
  }

  public loadGeoData() {
    this.service
      .loadGeoData(this.location)
      .subscribe((data) => (this.geoData = data.results[0]));
  }
}
