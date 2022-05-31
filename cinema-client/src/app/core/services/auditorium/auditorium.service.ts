import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auditorium } from '../../models/auditorium/auditorium';

@Injectable({
  providedIn: 'root',
})
export class AuditoriumService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Auditorium[]> {
    return this.http.get(`${environment.apiUrl}/auditoriums`) as Observable<
      Auditorium[]
    >;
  }
}
