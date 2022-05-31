import { AuditoriumDto } from 'src/auditoriums/dto/auditorium.dto';
import { MovieDto } from 'src/movies/dto/movie.dto';
import { TicketDto } from 'src/tickets/dto/ticket.dto';
import { Screening } from '../entities/screening.model';

export class ScreeningDto {
  id?: number;
  startTime?: Date;
  movie?: MovieDto;
  auditorium?: AuditoriumDto;
  tickets?: TicketDto[];

  constructor(screening: Screening) {
    this.id = screening.id;
    this.startTime = screening.startTime;
    if (screening.movie) {
      this.movie = new MovieDto({ ...screening.movie, screenings: null });
    }
    if (screening.auditorium) {
      this.auditorium = new AuditoriumDto(screening.auditorium);
    }
    if (screening.tickets && screening.tickets.isInitialized()) {
      this.tickets = screening.tickets
        .getItems()
        .map((ticket) => new TicketDto({ ...ticket, screening: null }));
    }
  }
}
