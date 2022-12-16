import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIRTABLE_PAT } from './app.module';

@Injectable()
export class AirtableAuthInterceptor implements HttpInterceptor {
  constructor(@Inject(AIRTABLE_PAT) private airtablePat: string) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('https://api.airtable.com')) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.airtablePat}`,
        },
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
