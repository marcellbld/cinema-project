import { User } from '../entities/user.model';
import { UserRole } from '../user-role';

export class UserDto {
  id?: number;
  username?: string;
  fullName?: string;
  phone?: string;
  role?: UserRole;
  password?: string;

  constructor(user: User) {
    this.id = user.id || this.id;
    this.username = user.username || this.username;
    this.fullName = user.fullName || this.fullName;
    this.phone = user.phone || this.phone;
    this.role = user.role || this.role;
  }
}
