import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  public get token(): string {
    return '';
  }
  constructor(private http: HttpClient) { }

  public login(user: IUser): Observable<any> {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user,
    );
  }

  public logout() { }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken() { }
}
