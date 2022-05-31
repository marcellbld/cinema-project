import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Movie } from '../../movies/entities/movie.model';

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @ManyToMany(() => Movie)
  movies = new Collection<Movie>(this);
}
