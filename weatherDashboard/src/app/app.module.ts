import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AirtableAuthInterceptor } from './airtable-auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

export const BASE_URL = new InjectionToken<string>('BaseUrl');
export const AIRTABLE_PAT = new InjectionToken<string>('AirtablePat');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: 'https://api.airtable.com/v0/app5jvVBBLNcWUL3M/WeatherData',
    },
    {
      provide: AIRTABLE_PAT,
      useValue: 'API-TOKEN',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AirtableAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
