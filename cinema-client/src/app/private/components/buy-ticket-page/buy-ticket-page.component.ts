import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { Movie } from 'src/app/core/models/movie/movie';
import { Screening } from 'src/app/core/models/screening/screening';
import { Ticket } from 'src/app/core/models/ticket/ticket';
import { ScreeningService } from 'src/app/core/services/screening/screening.service';
import { TicketService } from 'src/app/core/services/ticket/ticket.service';

@Component({
  selector: 'app-buy-ticket-page',
  templateUrl: './buy-ticket-page.component.html',
  styleUrls: ['./buy-ticket-page.component.scss'],
})
export class BuyTicketPageComponent implements OnInit, OnDestroy {
  screening$: Observable<Screening> = EMPTY;
  selfTickets$: Observable<Ticket[]> = EMPTY;

  private selfTickets: Ticket[] = [];
  private _tickets: Ticket[] = [];
  private _screening: Screening | undefined;

  selectedSeats: Ticket[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private screeningService: ScreeningService
  ) {}

  ngOnDestroy(): void {
    this.selectedSeats = [];
    this.selfTickets = [];
    this._tickets = [];
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const selectedId = Number(params.get('id'));

          return this.screeningService.getScreening(selectedId);
        }),
        catchError(() => {
          this.router.navigate(['/']);
          return [];
        })
      )
      .subscribe((val) => {
        this.screening$ = of(val);
        this._screening = val;
        if (val.tickets) {
          this._tickets = val.tickets;
        }
        this.ticketService
          .getSelfTickets(this._screening.id!)
          .subscribe((val) => {
            this.selfTickets = val;
            this.selfTickets$ = of(val);
          });
      });
  }

  back(): void {
    this.screening$.subscribe((val) =>
      this.router.navigate(['/movies', val.movie?.id])
    );
  }
  selectSeat(row: number, column: number): void {
    if (!this.canSelect(row, column)) return;

    const foundItemId = this.selectedSeats.findIndex(
      ({ row: r, column: c }) => r === row && c === column
    );
    if (foundItemId > -1) {
      this.selectedSeats.splice(foundItemId, 1);
    } else {
      this.selectedSeats.push({ row, column });
    }
  }

  buyTickets() {
    if (this._screening) {
      this.ticketService
        .create(this.selectedSeats, this._screening)
        .subscribe((val) => {
          console.log(val);

          this._tickets.push(...val);
          this.selfTickets.push(...val);
          this.selfTickets$ = of(this.selfTickets);
          this.selectedSeats = [];
        });
    }
  }

  canSelect(row: number, column: number): boolean {
    return (
      !this.selfTickets.some(
        ({ row: r, column: c }) => r === row && c === column
      ) &&
      !this._tickets.some(({ row: r, column: c }) => r === row && c === column)
    );
  }

  isSelfReserved(row: number, column: number): boolean {
    return (
      this.selectedSeats.some(
        ({ row: r, column: c }) => r === row && c === column
      ) ||
      this.selfTickets.some(
        ({ row: r, column: c }) => r === row && c === column
      )
    );
  }

  isReserved(row: number, column: number): boolean {
    return this._tickets.some(
      ({ row: r, column: c }) => r === row && c === column
    );
  }
}
