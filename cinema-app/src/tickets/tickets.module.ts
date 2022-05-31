import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ScreeningsModule } from 'src/screenings/screenings.module';
import { UsersModule } from 'src/users/users.module';
import { Ticket } from './entities/ticket.model';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Ticket] }),
    UsersModule,
    ScreeningsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
