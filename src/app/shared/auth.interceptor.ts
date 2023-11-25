import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    console.log('interceptor:');
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        params: request.params.set('auth', this.auth.token || ''),
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('interceptor error: ', error);
        this.auth.logout();

        this.router.navigate(['/admin', 'login'], {
          queryParams: {
            loginAgain: true,
          },
        });

        return throwError(error);
      }),
    );
  }
}
