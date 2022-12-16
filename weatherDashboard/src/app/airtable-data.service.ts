import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './weather-data.service';

export interface Root {
  records: Record[];
}

export interface Record {
  id: string;
  fields: Fields;
}

export interface Fields {
  city: string;
  temperature: number;
  description: string;
  time: string;
  iconText: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirtableDataService {
  constructor(private http: HttpClient) {}
  public loadDataFromTable(): Observable<Root> {
    return this.http.get<Root>(
      `https://api.airtable.com/v0/app5jvVBBLNcWUL3M/WeatherData`
    );
  }

  public updateWeatherRecord(id: string, fields: Fields): Observable<unknown> {
    const body = {
      fields: fields,
    };
    return this.http.patch(
      `https://api.airtable.com/v0/app5jvVBBLNcWUL3M/WeatherData/${id}`,
      body
    );
  }
}
