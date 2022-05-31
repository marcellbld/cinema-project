import { Auditorium } from '../auditorium/auditorium';
import { Movie } from '../movie/movie';
import { Ticket } from '../ticket/ticket';

export interface Screening {
  id?: number;
  startTime?: Date;
  movie?: Movie;
  auditorium?: Auditorium;
  tickets?: Ticket[];
}
