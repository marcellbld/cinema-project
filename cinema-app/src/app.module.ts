import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CategoriesModule } from './categories/categories.module';
import { AuditoriumsModule } from './auditoriums/auditoriums.module';
import { ScreeningsModule } from './screenings/screenings.module';
import { TicketsModule } from './tickets/tickets.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from 'mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UsersModule,
    MoviesModule,
    CategoriesModule,
    AuditoriumsModule,
    ScreeningsModule,
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
