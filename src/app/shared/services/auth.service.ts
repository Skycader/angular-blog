import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';

@Injectable()
export class AuthService {
  public get token(): string {
    return '';
  }
  constructor(private http: HttpClient) { }

  public login(user: IUser): Observable<any> {
    return this.http.post('', user);
  }

  public logout() { }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken() { }
}
