import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Screening } from 'src/screenings/entities/screening.model';
import { User } from 'src/users/entities/user.model';
import { CreateTicketsDto } from './dto/create-tickets.dto';
import { Ticket } from './entities/ticket.model';

@Injectable()
export class TicketsService {
  findAllByUser(user: User) {
    return this.ticketsRepository.find(
      { user },
      { populate: ['screening', 'screening.movie'] },
    );
  }
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: EntityRepository<Ticket>,
  ) {}

  async findAllByUserAndScreening(
    user: User,
    screening: Screening,
  ): Promise<Ticket[]> {
    return this.ticketsRepository.find({ user, screening });
  }

  async create(
    createTicketsDto: CreateTicketsDto,
    user: User,
    screening: Screening,
  ): Promise<Ticket[]> {
    const tickets = createTicketsDto.ticketDtos.map((ticketDto) =>
      this.ticketsRepository.create({
        ...ticketDto,
        user,
        screening,
      }),
    );

    await this.ticketsRepository.persistAndFlush(tickets);

    console.log(tickets);

    return tickets;
  }
}
