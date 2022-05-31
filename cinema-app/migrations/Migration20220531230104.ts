import { Migration } from '@mikro-orm/migrations';

export class Migration20220531230104 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `auditorium` (`id` integer not null primary key autoincrement, `rows` integer not null, `columns` integer not null);');

    this.addSql('create table `category` (`id` integer not null primary key autoincrement, `name` varchar not null);');
    this.addSql('create unique index `category_name_unique` on `category` (`name`);');

    this.addSql('create table `movie` (`id` integer not null primary key autoincrement, `title` varchar not null, `description` varchar null, `year` integer not null, `length` integer null, `image_url` varchar null, `created_at` datetime not null);');

    this.addSql('create table `screening` (`id` integer not null primary key autoincrement, `start_time` datetime not null);');

    this.addSql('create table `category_movies` (`category_id` integer not null, `movie_id` integer not null, primary key (`category_id`, `movie_id`));');
    this.addSql('create index `category_movies_category_id_index` on `category_movies` (`category_id`);');
    this.addSql('create index `category_movies_movie_id_index` on `category_movies` (`movie_id`);');

    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `username` varchar not null, `password` varchar not null, `full_name` varchar not null, `phone` varchar not null, `role` text not null default \'USER\');');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');

    this.addSql('create table `ticket` (`id` integer not null primary key autoincrement, `row` integer not null, `column` integer not null);');

    this.addSql('alter table `screening` add column `movie_id` integer null;');
    this.addSql('alter table `screening` add column `auditorium_id` integer null;');
    this.addSql('create index `screening_movie_id_index` on `screening` (`movie_id`);');
    this.addSql('create index `screening_auditorium_id_index` on `screening` (`auditorium_id`);');

    this.addSql('alter table `ticket` add column `screening_id` integer null;');
    this.addSql('alter table `ticket` add column `user_id` integer null;');
    this.addSql('create index `ticket_screening_id_index` on `ticket` (`screening_id`);');
    this.addSql('create index `ticket_user_id_index` on `ticket` (`user_id`);');
  }

}
