import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Auditorium } from 'src/auditoriums/entities/auditorium.model';
import { Movie } from 'src/movies/entities/movie.model';
import { ScreeningDto } from './dto/screening.dto';
import { Screening } from './entities/screening.model';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectRepository(Screening)
    private screeningsRepository: EntityRepository<Screening>,
  ) {}

  findAll(): Promise<Screening[]> {
    return this.screeningsRepository.findAll();
  }

  async findOne(id: number): Promise<Screening> {
    return this.screeningsRepository.findOne(id, {
      populate: ['movie', 'auditorium', 'tickets'],
    });
  }

  async create(
    startTime: Date,
    auditorium: Auditorium,
    movie: Movie,
  ): Promise<Screening> {
    const screening = this.screeningsRepository.create({
      startTime,
      auditorium,
      movie,
    });

    await this.screeningsRepository.persistAndFlush(screening);

    return screening;
  }
}
