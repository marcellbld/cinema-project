import { IDatabaseDriver, Options } from '@mikro-orm/core';
import { Auditorium } from './src/auditoriums/entities/auditorium.model';
import { Category } from './src/categories/entities/category.model';
import { Movie } from './src/movies/entities/movie.model';
import { Screening } from './src/screenings/entities/screening.model';
import { Ticket } from './src/tickets/entities/ticket.model';
import { User } from './src/users/entities/user.model';

export default {
  entities: [User, Movie, Category, Auditorium, Screening, Ticket],
  dbName: (process.env.seed ? './dist/' : '') + 'cinema-db.sqlite3',
  type: 'sqlite',
  migrations: {
    path: 'migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
  },
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
} as Options<IDatabaseDriver>;
