import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Screening } from '../../screenings/entities/screening.model';
import { User } from '../../users/entities/user.model';

@Entity()
export class Ticket {
  @PrimaryKey()
  id!: number;

  @Property()
  row!: number;

  @Property()
  column!: number;

  @ManyToOne(() => Screening)
  screening!: Screening;

  @ManyToOne(() => User)
  user!: User;
}
