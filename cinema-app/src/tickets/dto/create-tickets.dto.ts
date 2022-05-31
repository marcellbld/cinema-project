import { ScreeningDto } from 'src/screenings/dto/screening.dto';
import { TicketDto } from './ticket.dto';

export class CreateTicketsDto {
  ticketDtos: TicketDto[];
  screening: ScreeningDto;
}
