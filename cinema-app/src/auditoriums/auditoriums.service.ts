import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Auditorium } from './entities/auditorium.model';

@Injectable()
export class AuditoriumsService {
  constructor(
    @InjectRepository(Auditorium)
    private auditoriumsRepository: EntityRepository<Auditorium>,
  ) {}

  findOne(id: number): Promise<Auditorium> {
    return this.auditoriumsRepository.findOne(id);
  }

  findAll(): Promise<Auditorium[]> {
    return this.auditoriumsRepository.findAll();
  }
}
