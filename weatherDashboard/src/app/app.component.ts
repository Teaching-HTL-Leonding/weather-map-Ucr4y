import { Component, OnInit } from '@angular/core';
import { AirtableDataService, Root } from './airtable-data.service';
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
export class AppComponent implements OnInit {
  public location: string;
  public weatherData?: WeatherResponse;
  public airtableData?: Root;

  constructor(
    public airtableService: AirtableDataService,
    public weatherDataService: WeatherDataService
  ) {
    this.location = '';
  }

  ngOnInit(): void {
    this.airtableService.loadDataFromTable().subscribe((data) => {
      for (const record of data.records) {
        if (this.isOlderThan30Mins(record.fields.time)) {
          this.weatherDataService
            .loadGeoData(record.fields.city)
            .subscribe((data) => {
              if (data.results.length > 0) {
                this.weatherDataService
                  .loadTemperature(data.results[0].lon, data.results[0].lat)
                  .subscribe((data) => {
                    record.fields.description = data.weather[0].description;
                    record.fields.iconText = data.weather[0].icon;
                    record.fields.temperature = data.main.temp;
                    record.fields.time = new Date().toISOString();

                    this.airtableService
                      .updateWeatherRecord(record.id, record.fields)
                      .subscribe();
                  });
              }
            });
        }
      }

      this.airtableData = data;
    });
  }

  public loadGeoData(location: string) {
    this.weatherDataService.loadGeoData(location).subscribe((data) => {
      if (data.results.length > 0) {
        this.weatherDataService
          .loadTemperature(data.results[0].lon, data.results[0].lat)
          .subscribe((data) => (this.weatherData = data));
      }
    });
  }

  public isOlderThan30Mins(time: string): boolean {
    let oldDate = new Date(time);
    let now = new Date();

    if ((now.getTime() - oldDate.getTime()) / 60000 > 30) {
      return true;
    }

    return false;
  }
}
