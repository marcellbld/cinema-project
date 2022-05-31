import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuditoriumsModule } from 'src/auditoriums/auditoriums.module';
import { MoviesModule } from 'src/movies/movies.module';
import { Screening } from './entities/screening.model';
import { ScreeningsController } from './screenings.controller';
import { ScreeningsService } from './screenings.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Screening] }),
    MoviesModule,
    AuditoriumsModule,
  ],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  exports: [ScreeningsService],
})
export class ScreeningsModule {}
