import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Category } from '../../categories/entities/category.model';
import { Screening } from '../../screenings/entities/screening.model';

@Entity()
export class Movie {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  year!: number;

  @Property({ nullable: true })
  length?: number;

  @Property({ nullable: true })
  imageUrl?: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @ManyToMany(() => Category, (category) => category.movies)
  categories = new Collection<Category>(this);

  @OneToMany(() => Screening, (screening) => screening.movie)
  screenings = new Collection<Screening>(this);
}
