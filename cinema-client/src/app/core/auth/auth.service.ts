import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/user/login-response';
import { User, UserRole } from '../models/user/user';
import { UserAuth } from '../models/user/user-auth';
import { UserService } from '../services/user/user.service';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string | null = null;
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private userService: UserService,
    private authStorageService: AuthStorageService
  ) {
    const result = this.authStorageService.loadUser();
    if (result) {
      this.setLoginResponse(result);
    }
  }

  get token(): string | null {
    return this._token;
  }

  isLoggedIn(): boolean {
    return this._token !== null;
  }
  loggedInUser(): User | null {
    return this.userService.loggedInUser;
  }

  isAdmin(): boolean {
    return (
      this.isLoggedIn() &&
      this.loggedInUser() !== undefined &&
      this.loggedInUser()?.role === UserRole.Admin
    );
  }

  logout() {
    this.authStorageService.saveUser(null);

    this.setLoginResponse(null);
  }

  login(user: UserAuth): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/api/users/login`, user).pipe(
      tap({
        next: (res: LoginResponse) => {
          const decodedUser = this.jwtHelperService.decodeToken(
            res.access_token
          );

          const result = {
            access_token: res.access_token,
            user: decodedUser,
          };

          this.authStorageService.saveUser(result);
          this.setLoginResponse(result);
          console.log('Login successful');
        },
        error: (error) => {
          console.log('Login failed');

          return throwError(() => new Error(error));
        },
      })
    );
  }

  register(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/api/users`, user).pipe(
      tap({
        next: (res: LoginResponse) => {
          console.log('Registration successful');
        },
        error: (error) => {
          console.log('Registration failed');

          return throwError(() => new Error(error));
        },
      })
    );
  }

  private setLoginResponse(result: LoginResponse | null) {
    if (!result) {
      this._token = null;
      this.userService.setLoggedInUser(null);
      return;
    }
    this._token = result.access_token;
    this.userService.setLoggedInUser(result.user);
  }
}
