import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AirtableAuthInterceptor } from './airtable-auth.interceptor';

export const BASE_URL = new InjectionToken<string>('BaseUrl');
export const AIRTABLE_PAT = new InjectionToken<string>('AirtablePat');

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
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
