import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateScreeningDto } from '../../models/screening/create-screening.dto';
import { Screening } from '../../models/screening/screening';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(private httpClient: HttpClient) {}

  getScreening(id: number): Observable<Screening> {
    return this.httpClient.get(
      `${environment.apiUrl}/screenings/${id}`
    ) as Observable<Screening>;
  }

  create(createScreeningDto: CreateScreeningDto) {
    return this.httpClient.post(
      `${environment.apiUrl}/screenings`,
      createScreeningDto
    ) as Observable<Screening>;
  }
}
