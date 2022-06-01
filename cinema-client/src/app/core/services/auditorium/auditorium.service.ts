import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditorium } from '../../models/auditorium/auditorium';

@Injectable({
  providedIn: 'root',
})
export class AuditoriumService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Auditorium[]> {
    return this.http.get(`/api/auditoriums`) as Observable<Auditorium[]>;
  }
}
