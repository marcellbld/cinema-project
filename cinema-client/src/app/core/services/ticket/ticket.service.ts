import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      `/api/tickets/${this.authService.loggedInUser()?.id}/${screeningId}`
    ) as Observable<Ticket[]>;
  }

  getAllSelfTickets(): Observable<Ticket[]> {
    return this.http.get(
      `/api/tickets/${this.authService.loggedInUser()?.id}`
    ) as Observable<Ticket[]>;
  }

  create(selectedSeats: Ticket[], screening: Screening): Observable<Ticket[]> {
    return this.http.post(`/api/tickets`, {
      ticketDtos: selectedSeats,
      screening,
    }) as Observable<Ticket[]>;
  }
}
