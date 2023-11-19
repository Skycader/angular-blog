import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';
import { FbAuthResponse } from 'src/environments/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  public get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '');
    if (new Date() > expDate) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token') || null;
    }
  }
  constructor(private http: HttpClient) { }
  public handleError(error: HttpErrorResponse) {
    this.error$.next('Введены неверные данные пользователя');
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );

      return of(false);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
  public login(user: IUser): Observable<any> {
    //default user: admin@google.com, 123456
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user,
      )
      .pipe(catchError(this.handleError.bind(this)))
      .pipe(tap((x: any) => this.setToken(x)));
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (!response) {
      localStorage.clear();
      return;
    }
    const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-exp', expDate.toString());
  }
}
