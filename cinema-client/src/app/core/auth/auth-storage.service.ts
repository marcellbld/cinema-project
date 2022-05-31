import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from '../models/user/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private static TOKEN_KEY = 'token';
  private static USER_KEY = 'user';

  constructor(private jwtHelperService: JwtHelperService) {}

  saveUser(loginResponse: LoginResponse | null) {
    if (!loginResponse) {
      localStorage.removeItem(AuthStorageService.TOKEN_KEY);
      localStorage.removeItem(AuthStorageService.USER_KEY);
      return;
    }

    localStorage.setItem(
      AuthStorageService.TOKEN_KEY,
      loginResponse.access_token
    );
    localStorage.setItem(
      AuthStorageService.USER_KEY,
      JSON.stringify(loginResponse.user)
    );
  }

  loadUser(): LoginResponse | null {
    const token = localStorage.getItem(AuthStorageService.TOKEN_KEY);
    const userJSON = localStorage.getItem(AuthStorageService.USER_KEY);

    if (!(token && userJSON)) {
      return null;
    }
    return {
      access_token: token,
      user: JSON.parse(userJSON),
    };
  }
}
