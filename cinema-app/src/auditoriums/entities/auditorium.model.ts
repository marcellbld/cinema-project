import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Screening } from '../../screenings/entities/screening.model';

@Entity()
export class Auditorium {
  @PrimaryKey()
  id!: number;

  @Property()
  rows!: number;

  @Property()
  columns!: number;

  @OneToMany(() => Screening, (screening) => screening.auditorium)
  screenings = new Collection<Screening>(this);
}
