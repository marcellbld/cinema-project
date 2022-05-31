import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Ticket } from '../../tickets/entities/ticket.model';
import { UserRole } from '../user-role';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  username!: string;

  @Property()
  password!: string;

  @Property()
  fullName!: string;

  @Property()
  phone!: string;

  @Property({ default: UserRole.User })
  role!: UserRole;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets = new Collection<Ticket>(this);
}
