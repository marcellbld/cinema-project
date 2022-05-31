import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Auditorium } from '../../auditoriums/entities/auditorium.model';
import { Movie } from '../../movies/entities/movie.model';
import { Ticket } from '../../tickets/entities/ticket.model';

@Entity()
export class Screening {
  @PrimaryKey()
  id!: number;

  @Property()
  startTime!: Date;

  @ManyToOne(() => Movie)
  movie!: Movie;

  @ManyToOne(() => Auditorium)
  auditorium!: Auditorium;

  @OneToMany(() => Ticket, (ticket) => ticket.screening)
  tickets = new Collection<Ticket>(this);
}
