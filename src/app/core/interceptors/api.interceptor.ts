import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { ProgressBarService } from '@shared/progress-bar.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private progressBarService: ProgressBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.progressBarService.isLoading = true;
    const API_TOKEN = '1e958a46-7f30-4a5b-b157-e4dfbb01ec8c';

    return next
      .handle(request.clone({ setHeaders: { 'api-token': API_TOKEN } }))
      .pipe(
        filter((event) => event instanceof HttpResponse),
        tap((ev) => (this.progressBarService.isLoading = false))
      );
  }
}
