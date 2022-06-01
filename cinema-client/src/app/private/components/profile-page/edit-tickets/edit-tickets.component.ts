import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Ticket } from 'src/app/core/models/ticket/ticket';
import { User } from 'src/app/core/models/user/user';
import { TicketService } from 'src/app/core/services/ticket/ticket.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-tickets',
  templateUrl: './edit-tickets.component.html',
  styleUrls: ['./edit-tickets.component.scss'],
})
export class EditTicketsComponent implements OnInit {
  tickets$: Observable<Ticket[]> | undefined;

  form = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(10),
    ]),
  });

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketService
      .getAllSelfTickets()
      .subscribe((val) => (this.tickets$ = of(val)));
  }

  delete(id: number): void {
    this.ticketService.delete(id).subscribe((success) => {
      if (success) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile']);
      }
    });
  }
}
