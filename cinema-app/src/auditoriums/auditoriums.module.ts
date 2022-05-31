import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AuditoriumsController } from './auditoriums.controller';
import { Auditorium } from './entities/auditorium.model';
import { AuditoriumsService } from './auditoriums.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Auditorium] })],
  controllers: [AuditoriumsController],
  providers: [AuditoriumsService],
  exports: [AuditoriumsService],
})
export class AuditoriumsModule {}
