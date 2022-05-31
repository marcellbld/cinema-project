import type { EntityManager } from '@mikro-orm/core';
import { faker, Seeder } from '@mikro-orm/seeder';
import { Auditorium } from '../src/auditoriums/entities/auditorium.model';
import { Screening } from '../src/screenings/entities/screening.model';
import { Category } from '../src/categories/entities/category.model';
import { Movie } from '../src/movies/entities/movie.model';
import { User } from '../src/users/entities/user.model';
import { AuthHelperService } from '../src/auth/services/auth-helper/auth-helper.service';
import { Ticket } from '../src/tickets/entities/ticket.model';
import { UserRole } from '../src/users/user-role';

export class DatabaseSeeder extends Seeder {
  private authHelperService = new AuthHelperService();
  async run(em: EntityManager): Promise<void> {
    const admin = em.create(User, {
      username: 'admin',
      password: await this.authHelperService.hashPassword('admin'),
      fullName: 'Admin Admin',
      phone: 'adminphone',
      role: UserRole.Admin,
    });

    const users = [];
    for (let i = 0; i < 15; i++) {
      users.push(
        em.create(User, {
          username: `username${i + 1}`,
          password: await this.authHelperService.hashPassword('pass'),
          fullName: `fullName${i + 1}`,
          phone: `phone${i + 1}`,
          role: UserRole.User,
        }),
      );
    }
    const categories = [];
    categories.push(em.create(Category, { name: 'Horror' }));
    categories.push(em.create(Category, { name: 'Thriller' }));
    categories.push(em.create(Category, { name: 'Comedy' }));
    categories.push(em.create(Category, { name: 'Drama' }));
    categories.push(em.create(Category, { name: 'Documentary' }));
    categories.push(em.create(Category, { name: 'History' }));
    categories.push(em.create(Category, { name: 'Action' }));
    categories.push(em.create(Category, { name: 'Sci-fi' }));
    categories.push(em.create(Category, { name: 'Western' }));
    categories.push(em.create(Category, { name: 'Romance' }));

    const movies = [];
    for (let i = 0; i < 5; i++) {
      const title = faker.lorem.sentence(
        faker.datatype.number({ min: 1, max: 4 }),
      );
      movies.push(
        em.create(Movie, {
          title: title.substring(0, title.length - 1),
          description: faker.lorem.text(),
          year: faker.datatype.number({ min: 2000, max: 2022 }),
          length: faker.datatype.number({
            min: 60 * 60 * 1000,
            max: 60 * 60 * 1000 * 2,
          }),
          categories: faker.helpers.arrayElements(
            categories,
            faker.datatype.number({ min: 1, max: 5 }),
          ),
          imageUrl: `https://loremflickr.com/640/480/abstract?lock=${faker.datatype.number(
            {
              min: 0,
              max: 100,
            },
          )}`,
        }),
      );
    }

    const auditoriums = [];
    for (let i = 0; i < 6; i++) {
      auditoriums.push(
        em.create(Auditorium, {
          rows: faker.datatype.number({ min: 5, max: 10 }),
          columns: faker.helpers.arrayElement([8, 10, 12]),
        }),
      );
    }

    const screenings = [];
    for (let i = 0; i < 15; i++) {
      const randomAuditorium = faker.helpers.arrayElement(auditoriums);
      const tickets = [];

      const seats = [];
      for (let j = 0; j < faker.datatype.number({ min: 0, max: 12 }); j++) {
        const randomSeat = {
          r: faker.datatype.number({ min: 0, max: randomAuditorium.rows }),
          c: faker.datatype.number({ min: 0, max: randomAuditorium.columns }),
        };
        console.log('seats ', seats);

        console.log('rSeat ', randomSeat);
        if (!seats.find((s) => s.r === randomSeat.r && s.c === randomSeat.c)) {
          seats.push(randomSeat);
        }
      }
      console.log('seatsf ', seats);
      for (const seat of seats) {
        tickets.push(
          em.create(Ticket, {
            row: seat.r,
            column: seat.c,
            user: faker.helpers.arrayElement(users),
          }),
        );
      }
      screenings.push(
        em.create(Screening, {
          startTime: faker.datatype.datetime({
            min: new Date(2022, 5, 1, 0, 0, 0).getTime(),
            max: new Date(2022, 6, 1, 0, 0, 0).getTime(),
          }),
          movie: faker.helpers.arrayElement(movies),
          auditorium: randomAuditorium,
          tickets,
        }),
      );
    }
  }
}
