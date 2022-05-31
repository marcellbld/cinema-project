import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Screening } from '../../models/screening/screening';
import { Ticket } from '../../models/ticket/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getSelfTickets(screeningId: number): Observable<Ticket[]> {
    return this.http.get(
      `${environment.apiUrl}/tickets/${
        this.authService.loggedInUser()?.id
      }/${screeningId}`
    ) as Observable<Ticket[]>;
  }

  getAllSelfTickets(): Observable<Ticket[]> {
    return this.http.get(
      `${environment.apiUrl}/tickets/${this.authService.loggedInUser()?.id}`
    ) as Observable<Ticket[]>;
  }

  create(selectedSeats: Ticket[], screening: Screening): Observable<Ticket[]> {
    return this.http.post(`${environment.apiUrl}/tickets`, {
      ticketDtos: selectedSeats,
      screening,
    }) as Observable<Ticket[]>;
  }
}
