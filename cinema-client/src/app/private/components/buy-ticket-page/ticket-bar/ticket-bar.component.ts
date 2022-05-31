import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket/ticket';

@Component({
  selector: 'app-ticket-bar',
  templateUrl: './ticket-bar.component.html',
  styleUrls: ['./ticket-bar.component.scss'],
})
export class TicketBarComponent implements OnInit {
  @Input() ticket: Ticket | undefined;
  @Input() purchased: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
