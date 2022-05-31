import { ScreeningDto } from 'src/screenings/dto/screening.dto';
import { Ticket } from '../entities/ticket.model';

export class TicketDto {
  id?: number;
  row?: number;
  column?: number;
  screening?: ScreeningDto;

  constructor(ticket: Ticket) {
    this.id = ticket.id;
    this.row = ticket.row;
    this.column = ticket.column;
    if (ticket.screening) {
      this.screening = new ScreeningDto(ticket.screening);
    }
  }
}
