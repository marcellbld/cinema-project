import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loggedInUser: User | null = null;

  get loggedInUser() {
    return this._loggedInUser;
  }

  setLoggedInUser(user: User | null) {
    this._loggedInUser = user;
  }

  constructor(private http: HttpClient) {}

  findById(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`/api/users`, user).pipe(
      tap({
        next: (user: User) => {
          console.log('User successfully created', user);
        },
        error: (e) => {
          console.log(e);

          return throwError(() => e);
        },
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`/api/users`, user).pipe(
      tap({
        next: (user: User) => {
          console.log('User successfully edited', user);
        },
        error: (e) => {
          return throwError(() => e);
        },
      })
    );
  }
}
